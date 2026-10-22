// EdgeOne Pages handler: fixed backend and private path only. No provider keys
// or Node-only imports belong in the public-site edge bundle.
export const PRIVATE_PATH = '/p7x4m9q2-k6v8n3r5-t2w9c4h7/';
const BACKEND_ORIGIN = 'https://comments.leonzk.cn';
const SITE_ORIGINS = new Set(['https://leonzk.cn', 'https://www.leonzk.cn']);
const privateHeaders = {
  'x-research-proxy-version': 'utf8-stream-v2',
  'cache-control': 'private, no-store', 'x-robots-tag': 'noindex, nofollow, noarchive',
  'x-content-type-options': 'nosniff', 'referrer-policy': 'no-referrer',
};
const reject = (status, message) => new Response(message, { status, headers: privateHeaders });

export async function proxySiteRequest(request, fetchImplementation = globalThis.fetch) {
  const url = new URL(request.url);
  if (!SITE_ORIGINS.has(url.origin) || (url.pathname !== PRIVATE_PATH.slice(0, -1) && !url.pathname.startsWith(PRIVATE_PATH))) return reject(404, 'Not found');
  if (!['GET', 'HEAD', 'POST'].includes(request.method)) return reject(405, 'Method not allowed');
  if (request.method === 'POST' && (request.headers.get('origin') !== url.origin
    || !['same-origin', 'none', null].includes(request.headers.get('sec-fetch-site')))) return reject(403, 'Origin rejected');
  const headers = new Headers({ 'accept-encoding': 'identity' });
  for (const key of ['accept', 'content-type', 'sec-fetch-site']) if (request.headers.has(key)) headers.set(key, request.headers.get(key));
  const session = (request.headers.get('cookie') || '').split(';').map(s => s.trim()).find(s => /^research_session=[A-Za-z0-9_-]{43}$/.test(s));
  if (session) headers.set('cookie', session);
  let body;
  if (request.method === 'POST') {
    if (Number(request.headers.get('content-length') || 0) > 16_384) return reject(413, 'Request too large');
    const reader = request.body?.getReader(), chunks = []; let size = 0;
    if (reader) {
      try {
        for (;;) {
          const chunk = await reader.read(); if (chunk.done) break;
          // EdgeOne readers may return ArrayBuffer, views or strings. Normalize
          // before copying; Uint8Array.set(ArrayBuffer) silently copies no bytes.
          const value = chunk.value;
          const bytes = typeof value === 'string' ? new TextEncoder().encode(value)
            : ArrayBuffer.isView(value) ? new Uint8Array(value.buffer, value.byteOffset, value.byteLength)
            : value instanceof ArrayBuffer ? new Uint8Array(value) : null;
          if (!bytes) return reject(400, 'Invalid request stream');
          size += bytes.byteLength;
          if (size > 16_384) { await reader.cancel(); return reject(413, 'Request too large'); }
          chunks.push(bytes);
        }
      } finally { reader.releaseLock(); }
    }
    body = new Uint8Array(size); let offset = 0;
    for (const chunk of chunks) { body.set(chunk, offset); offset += chunk.byteLength; }
    // Agent POST endpoints accept UTF-8 JSON only; forward a decoded string body.
    try { body = new TextDecoder('utf-8', { fatal: true }).decode(body); }
    catch { return reject(400, 'Invalid UTF-8 request'); }
    headers.set('origin', BACKEND_ORIGIN);
  }
  const upstream = new URL(url.pathname + url.search, BACKEND_ORIGIN);
  const controller = new AbortController(); const timer = setTimeout(() => controller.abort(), 10_000);
  try {
    const response = await fetchImplementation(upstream, { method: request.method, headers, body, redirect: 'manual', signal: controller.signal });
    const location = response.headers.get('location');
    if (location && !location.startsWith(PRIVATE_PATH)) { await response.body?.cancel(); return reject(502, 'Unexpected upstream redirect'); }
    const outputHeaders = new Headers(response.headers);
    for (const [key, value] of Object.entries(privateHeaders)) outputHeaders.set(key, value);
    outputHeaders.delete('content-length'); outputHeaders.delete('access-control-allow-origin');
    return new Response(response.body, { status: response.status, headers: outputHeaders });
  } catch { return reject(502, 'Private agent backend unavailable'); }
  finally { clearTimeout(timer); }
}

export default function onRequest({ request }) { return proxySiteRequest(request); }
