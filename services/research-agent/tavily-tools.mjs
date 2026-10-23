import { createHash } from 'node:crypto';
import { isIP } from 'node:net';
import { redact } from './security.mjs';

// All outbound requests go to Tavily, never to a result URL from this server.
// Public DNS names only. This is an input boundary, not a DNS/redirect audit of Tavily.
export function publicSourceUrl(value) {
  if (typeof value !== 'string' || value.length > 2048) throw new Error('INVALID_SOURCE');
  let url;
  try { url = new URL(value); } catch { throw new Error('INVALID_SOURCE'); }
  const host = url.hostname.toLowerCase();
  if (url.protocol !== 'https:' || url.username || url.password || url.port || isIP(host) || host.includes(':')
    || !/^[a-z0-9-]+(?:\.[a-z0-9-]+)+$/.test(host)
    || /(?:^|\.)(?:localhost|local|internal|test|invalid|example|onion)$/.test(host)
    || host.endsWith('.example.com') || host === 'example.com'
    || [...url.searchParams.keys()].some(key => /^(?:token|api[_-]?key|password|secret|authorization)$/i.test(key))) throw new Error('INVALID_SOURCE');
  url.hash = '';
  return url.href;
}

const excerpt = (text, maxBytes) => {
  const bytes = Buffer.from(text, 'utf8');
  // TextDecoder's streaming mode omits a partial trailing UTF-8 sequence.
  return new TextDecoder().decode(bytes.subarray(0, maxBytes), { stream: true });
};
async function boundedJson(response, maxBytes) {
  if (!response.body) throw new Error('TAVILY_INVALID_RESPONSE');
  const reader = response.body.getReader(), chunks = [];
  let size = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maxBytes) throw new Error('TAVILY_RESPONSE_LIMIT');
      chunks.push(value);
    }
    return JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } finally { await reader.cancel().catch(() => {}); }
}

export function createTavilyTools(store, config, { fetchImplementation = (...args) => globalThis.fetch(...args) } = {}) {
  if (config.toolsMode !== 'tavily' || config.allowWebTools !== true) throw new Error('WEB_TOOLS_NOT_AUTHORIZED');
  const settings = config.tavily, caches = new WeakMap();
  if (settings.baseUrl !== 'https://api.tavily.com' || settings.creditUnits !== 640) throw new Error('TAVILY_CONFIG_INVALID');
  async function request(endpoint, body, state, signal) {
    if (signal?.aborted) throw new Error('CANCELLED');
    // One whole credit per call is deliberately conservative, including Extract's
    // delayed/zero credit reports. Free quota never refunds this CNY-equivalent floor.
    const reservation = store.reserveToolCall(state.id, settings.creditUnits, config, {
      provider: 'tavily', purpose: endpoint, depth: 'basic', creditBound: 1,
      usdPerCredit: settings.usdPerCredit, budgetYuanPerUsd: settings.budgetYuanPerUsd,
      pricingCheckedDate: settings.pricingCheckedDate, pricingSource: settings.pricingSource,
      accounting: 'credit-equivalent-not-cash-bill',
    });
    const timeout = AbortSignal.timeout(settings.requestTimeoutMs);
    const combined = signal ? AbortSignal.any([signal, timeout]) : timeout;
    const started = Date.now();
    let payload;
    try {
      const response = await fetchImplementation(`${settings.baseUrl}/${endpoint}`, {
        method: 'POST', redirect: 'error', signal: combined,
        headers: { authorization: `Bearer ${settings.apiKey}`, 'content-type': 'application/json' },
        body: JSON.stringify({ ...body, include_usage: true }),
      });
      if (!response.ok) {
        await response.body?.cancel();
        throw new Error(`TAVILY_HTTP_${response.status}`);
      }
      payload = await boundedJson(response, settings.maxResponseBytes);
    } catch (error) {
      if (combined.aborted) throw new Error('TAVILY_REQUEST_STOPPED');
      if (/^TAVILY_(?:HTTP_\d{3}|RESPONSE_LIMIT)$/.test(error.message)) throw error;
      throw new Error('TAVILY_REQUEST_FAILED');
    }
    const credits = payload?.usage?.credits;
    if (typeof credits !== 'number' || !Number.isFinite(credits) || credits < 0) throw new Error('TAVILY_USAGE_MISSING');
    if (credits > 1) { store.lockModelBudget(); throw new Error('TAVILY_USAGE_OUTSIDE_BOUND'); }
    const billing = { provider: 'tavily', credits, reservedYuan: settings.creditUnits / 10_000,
      toolUsageEstimateYuan: credits * settings.creditUnits / 10_000, elapsedMs: Date.now() - started,
      ...(typeof payload.request_id === 'string' && /^[\w-]{1,128}$/.test(payload.request_id) ? { requestId: payload.request_id } : {}) };
    store.recordToolUsage(reservation, billing);
    return { payload, billing };
  }
  return async (action, state, { signal } = {}) => {
    if (signal?.aborted) throw new Error('CANCELLED');
    if (action.tool === 'search') {
      if (typeof action.args.query !== 'string' || !action.args.query.trim() || action.args.query.length > 2000) throw new Error('INVALID_ACTION');
      const { payload, billing } = await request('search', {
        query: redact(action.args.query.trim()), search_depth: 'basic', topic: 'general', max_results: 5,
        auto_parameters: false, include_answer: false, include_raw_content: false,
        include_images: false, include_favicon: false,
      }, state, signal);
      if (!Array.isArray(payload.results)) throw new Error('TAVILY_INVALID_RESPONSE');
      const results = [], seen = new Set();
      for (const item of payload.results.slice(0, 5)) {
        let url;
        try { url = publicSourceUrl(item?.url); } catch { continue; }
        if (seen.has(url) || typeof item.title !== 'string' || typeof item.content !== 'string') continue;
        seen.add(url);
        results.push({ url, title: redact(item.title.slice(0, 300)), snippet: excerpt(redact(item.content), 1000) });
      }
      return { results, simulated: false, provider: 'tavily', fetchedAt: new Date().toISOString(), billing };
    }
    if (action.tool !== 'read_page') throw new Error('INVALID_ACTION');
    const url = publicSourceUrl(action.args.url);
    if (!state.allowedUrls.has(url)) throw new Error('INVALID_SOURCE');
    if (!caches.has(state)) caches.set(state, new Map());
    const cache = caches.get(state);
    if (cache.has(url)) return { ...cache.get(url), cached: true };
    const { payload, billing } = await request('extract', {
      urls: [url], extract_depth: 'basic', format: 'markdown', timeout: 10,
      include_images: false, include_favicon: false,
    }, state, signal);
    if (!Array.isArray(payload.results) || !Array.isArray(payload.failed_results)) throw new Error('TAVILY_INVALID_RESPONSE');
    // Single URL per call; never silently accept a different/redirected source.
    const result = payload.results.find(item => {
      try { return publicSourceUrl(item?.url) === url; } catch { return false; }
    });
    if (payload.results.some(item => item !== result)) throw new Error('INVALID_SOURCE');
    if (!result || typeof result.raw_content !== 'string' || !result.raw_content.trim()
      || payload.failed_results.some(item => item.url === url)) {
      return { url, error: '网页提取失败或正文为空；未生成替代资料。', simulated: false, provider: 'tavily', billing };
    }
    const content = redact(result.raw_content);
    const title = state.observations.flatMap(item => item.tool === 'search' ? item.output.results : []).find(item => item.url === url)?.title || url;
    const output = { url, title, content, excerpt: excerpt(content, settings.excerptBytes),
      contentHash: createHash('sha256').update(content).digest('hex'), fetchedAt: new Date().toISOString(),
      simulated: false, provider: 'tavily', billing };
    cache.set(url, output);
    return output;
  };
}
