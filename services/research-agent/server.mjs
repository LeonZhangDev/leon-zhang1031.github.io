import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { realpathSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { loadConfig, SCENARIOS } from './config.mjs';
import { loadLocalEnvironment } from './local-env.mjs';
import { Store } from './store.mjs';
import { AgentRunner } from './agent.mjs';
import { hashPassword, verifyPassword, tokenHash, newToken, readSession, sessionCookie, redact } from './security.mjs';

const securityHeaders = {
  'cache-control': 'private, no-store', 'x-content-type-options': 'nosniff',
  'referrer-policy': 'no-referrer', 'x-robots-tag': 'noindex, nofollow, noarchive',
  'content-security-policy': "default-src 'none'; script-src 'self'; style-src 'self'; connect-src 'self'; img-src 'self' data:; base-uri 'none'; frame-ancestors 'none'; form-action 'self'",
};
const HttpError = class extends Error { constructor(status, message) { super(message); this.status = status; } };
const assets = {
  'assets/app.js': new URL('./ui/app.js', import.meta.url),
  'assets/markdown.mjs': new URL('./ui/markdown.mjs', import.meta.url),
  'assets/style.css': new URL('./ui/style.css', import.meta.url),
  'assets/vendor/marked.js': new URL('./node_modules/marked/lib/marked.esm.js', import.meta.url),
  'assets/vendor/purify.js': new URL('./node_modules/dompurify/dist/purify.es.mjs', import.meta.url),
};

async function jsonBody(req) {
  if (!/^application\/json(?:;|$)/i.test(req.headers['content-type'] || '')) throw new HttpError(415, '只接受 JSON 请求。');
  let size = 0; const chunks = [];
  for await (const chunk of req) {
    size += chunk.length;
    if (size > 16_384) throw new HttpError(413, '请求过大。');
    chunks.push(chunk);
  }
  try {
    const body = JSON.parse(Buffer.concat(chunks).toString('utf8'));
    if (!body || Array.isArray(body) || typeof body !== 'object') throw new Error();
    return body;
  } catch { throw new HttpError(400, 'JSON 格式无效。'); }
}

export function createApplication(config = loadConfig(), options = {}) {
  const store = new Store(config.dataDir, options.clock);
  if (config.publicOrigin && (!store.getSetting('password')
    || Math.round(store.trialBudget(config).reservedYuan * 10_000) < config.trialSeedReservedUnits)) {
    store.close();
    throw new Error('Public deployment requires a pre-seeded password and the preserved trial-budget database.');
  }
  const runner = new AgentRunner(store, config, options.providers);
  const prefix = config.basePath;
  let origin = '';
  const respond = (res, status, body, headers = {}) => {
    res.writeHead(status, { ...securityHeaders, 'content-type': 'application/json; charset=utf-8', ...headers });
    res.end(typeof body === 'string' ? body : JSON.stringify(body));
  };
  const server = createServer(async (req, res) => {
    try {
      const port = server.address()?.port;
      const allowedHosts = [`127.0.0.1:${port}`, `localhost:${port}`];
      if (!allowedHosts.includes(req.headers.host)) throw new HttpError(403, 'Host 不被允许。');
      if (!['127.0.0.1', '::1', '::ffff:127.0.0.1'].includes(req.socket.remoteAddress)) throw new HttpError(403, '仅允许本机访问。');
      if (config.publicOrigin && (req.headers['x-forwarded-proto'] !== 'https'
        || req.headers['x-forwarded-host'] !== new URL(config.publicOrigin).host)) throw new HttpError(403, 'HTTPS 代理信息不匹配。');
      const url = new URL(req.url, origin);
      const path = url.pathname;
      if (req.method === 'POST') {
        if (req.headers.origin !== (config.publicOrigin || `http://${req.headers.host}`)) throw new HttpError(403, '拒绝跨站请求。');
        if (req.headers['sec-fetch-site'] && !['same-origin', 'none'].includes(req.headers['sec-fetch-site'])) throw new HttpError(403, '拒绝跨站请求。');
      }
      if (path === prefix.slice(0, -1) && req.method === 'GET') return respond(res, 303, '', { location: prefix });
      if (!path.startsWith(prefix)) throw new HttpError(404, 'Not found');
      const route = path.slice(prefix.length);
      if (req.method === 'GET' && Object.hasOwn(assets, route)) {
        return respond(res, 200, await readFile(assets[route], 'utf8'), { 'content-type': route.endsWith('.css') ? 'text/css; charset=utf-8' : 'text/javascript; charset=utf-8' });
      }
      const token = readSession(req.headers.cookie);
      const signedIn = token ? store.session(tokenHash(token), config) : false;
      if (req.method === 'GET' && route === '') {
        const file = signedIn ? 'workspace.html' : 'login.html';
        return respond(res, 200, await readFile(new URL(`./ui/${file}`, import.meta.url), 'utf8'), { 'content-type': 'text/html; charset=utf-8' });
      }
      if (req.method === 'GET' && route === 'api/auth/status') return respond(res, 200, { authenticated: signedIn, setupRequired: !store.getSetting('password'), mode: config.mode, traceMode: config.traceMode,
        accessScope: config.publicOrigin ? 'password-protected-https' : 'loopback-only' });
      if (req.method === 'POST' && ['api/auth/setup', 'api/auth/login'].includes(route)) {
        const clientKey = tokenHash(req.socket.remoteAddress);
        if (!store.loginAllowed(clientKey, config)) throw new HttpError(429, '登录失败次数过多，请在 15 分钟后重试。');
        const body = await jsonBody(req);
        if (typeof body.password !== 'string' || body.password.length > 256) throw new HttpError(400, '密码格式无效。');
        const stored = store.getSetting('password');
        if (route === 'api/auth/setup') {
          if (config.publicOrigin) throw new HttpError(403, '线上不开放密码初始化。');
          if (stored) throw new HttpError(409, '密码已经设置，请登录。');
          if (body.password.length < 6) throw new HttpError(400, '本地访问密码至少需要 6 个字符。');
          if (!store.createPassword(await hashPassword(body.password))) throw new HttpError(409, '密码已经设置，请登录。');
        } else if (!stored || !await verifyPassword(body.password, stored)) {
          store.failedLogin(clientKey, config); throw new HttpError(401, '密码不正确。');
        }
        store.clearAttempts(clientKey);
        if (token) store.deleteSession(tokenHash(token));
        const fresh = newToken(); store.createSession(tokenHash(fresh));
        return respond(res, 200, { ok: true }, { 'set-cookie': sessionCookie(fresh, prefix, 28_800, !!config.publicOrigin) });
      }
      if (!signedIn) throw new HttpError(401, '请先登录。');
      if (req.method === 'POST' && route === 'api/auth/logout') {
        store.deleteSession(tokenHash(token));
        return respond(res, 200, { ok: true }, { 'set-cookie': sessionCookie('', prefix, 0, !!config.publicOrigin) });
      }
      if (req.method === 'GET' && route === 'api/status') return respond(res, 200, { mode: config.mode, traceMode: config.traceMode,
        memoryMode: config.memoryMode, actualCostYuan: config.mode === 'mock' && config.memoryMode !== 'qwen' ? 0 : null, toolsSimulated: true,
        scenarios: config.mode === 'mock' ? SCENARIOS : ['standard'], budget: store.budget(config), trialBudget: store.trialBudget(config) });
      if (req.method === 'GET' && route === 'api/tasks') return respond(res, 200, { tasks: store.listTasks() });
      if (req.method === 'GET' && route === 'api/memories') return respond(res, 200, {
        enabled: runner.memory.enabled, mode: `mem0-oss-${config.memoryMode || 'offline'}`, semanticModelVerified: false,
        memories: await runner.memory.list(), candidates: (await runner.memory.list({ includeCandidates: true })).filter(item => item.metadata.candidate),
      });
      if (req.method === 'POST' && route === 'api/memories') {
        const body = await jsonBody(req);
        const controller = new AbortController();
        const disconnected = () => { if (!res.writableEnded) controller.abort(); };
        res.once('close', disconnected);
        const options = { signal: controller.signal };
        try {
          if (body.action === 'set-enabled' && typeof body.enabled === 'boolean') runner.memory.setEnabled(body.enabled);
          else if (body.action === 'add') await runner.memory.remember(body.text, { ...options, scope: body.scope });
          else if (body.action === 'extract') await runner.memory.propose(body.text, options);
          else if (['confirm', 'reject'].includes(body.action) && /^[0-9a-f-]{36}$/.test(body.id || '')) await runner.memory.review(body.id, body.action, options);
          else if (['update', 'forget', 'toggle'].includes(body.action) && /^[0-9a-f-]{36}$/.test(body.id || '')) await runner.memory.change(body.id, body.action, body.text, options);
          else throw new Error('MEMORY_ACTION_INVALID');
        } catch (error) {
          if (['MODEL_BUDGET', 'VALIDATION_BUDGET'].includes(error.message)) throw new HttpError(429, '已达到累计 5 元或本轮新增最多 0.5 元的保守预留上限。');
          if (error.message === 'MEMORY_EXTRACTION_NOT_AUTHORIZED') throw new HttpError(403, '当前为离线记忆模式，未授权模型抽取。');
          const known = ['MEMORY_TEXT_INVALID', 'MEMORY_SCOPE_INVALID', 'MEMORY_CAPACITY', 'MEMORY_DISABLED', 'MEMORY_NOT_FOUND', 'MEMORY_ACTION_INVALID'];
          if (!known.includes(error.message)) throw error;
          throw new HttpError(error.message === 'MEMORY_NOT_FOUND' ? 404 : 400,
            '记忆操作无效：请检查内容、范围及启用状态；内容限 500 字，不接受密钥，最多保存 200 条。');
        } finally { res.removeListener('close', disconnected); }
        return respond(res, 200, { ok: true });
      }
      if (req.method === 'POST' && route === 'api/tasks') {
        const body = await jsonBody(req);
        if (typeof body.goal !== 'string' || !body.goal.trim() || body.goal.length > 2000) throw new HttpError(400, '请填写 1～2000 字的调研目标。');
        if (body.constraints !== undefined && (typeof body.constraints !== 'string' || body.constraints.length > 2000)) throw new HttpError(400, '约束长度不得超过 2000 字。');
        if (!SCENARIOS.includes(body.scenario || 'standard')) throw new HttpError(400, '不支持的模拟场景。');
        if (config.mode === 'qwen' && (body.scenario || 'standard') !== 'standard') throw new HttpError(400, 'Qwen 首次验证仅支持标准模拟资料场景。');
        const budgetUnits = Math.round(Number(body.budgetYuan ?? 2) * 10_000);
        if (!Number.isFinite(budgetUnits) || budgetUnits < 100 || budgetUnits > 20_000) throw new HttpError(400, '单次模拟预算须在 0.01～2 元之间。');
        let task;
        try { task = store.createTask({ goal: redact(body.goal.trim()), constraints: redact(body.constraints || ''), scenario: body.scenario || 'standard', budgetUnits }, config); }
        catch (error) { throw new HttpError(error.message === 'BUSY' ? 409 : 429, error.message === 'BUSY' ? '已有任务运行中，请等待或取消。' : '已达到本地模拟日/月预算。'); }
        // Schedule after the HTTP acceptance response. Never fire an unhandled promise.
        setImmediate(() => { runner.start(task).catch(() => {
          task.status = 'failed'; task.message = '执行器异常，已保留任务并释放剩余模拟预算。'; store.saveTask(task);
        }); });
        return respond(res, 202, task);
      }
      const match = /^api\/tasks\/([0-9a-f-]{36})(?:\/(cancel|report|trace|feedback))?$/.exec(route);
      if (match) {
        const [, id, action] = match; const task = store.task(id);
        if (!task) throw new HttpError(404, '任务不存在。');
        if (req.method === 'GET' && !action) return respond(res, 200, { task, events: store.events(id) });
        if (req.method === 'GET' && action === 'trace') return respond(res, 200, { transport: task.traceMode || 'offline', cloudVerified: false, runs: store.traces(id), sdkRequests: store.wires(id) });
        if (req.method === 'GET' && action === 'report') {
          if (!task.report) throw new HttpError(409, '报告尚未生成。');
          return respond(res, 200, task.report, { 'content-type': 'text/markdown; charset=utf-8', 'content-disposition': `attachment; filename="research-${id}.md"` });
        }
        if (req.method === 'POST' && action === 'cancel') { runner.cancel(id); return respond(res, 200, { ok: true }); }
        if (req.method === 'POST' && action === 'feedback') {
          const body = await jsonBody(req);
          if (![0, 1].includes(body.score) || typeof body.note !== 'string' || body.note.length > 1000) throw new HttpError(400, '反馈格式无效。');
          store.feedback(id, body.score, redact(body.note)); return respond(res, 200, { ok: true });
        }
      }
      throw new HttpError(404, 'Not found');
    } catch (error) { respond(res, error.status || 500, { error: error.status ? error.message : '本地服务异常，请查看本地行动记录。' }); }
  });
  server.requestTimeout = 10_000; server.headersTimeout = 10_000;
  return {
    server, store, runner,
    async listen() {
      try { await new Promise((resolve, reject) => { server.once('error', reject); server.listen(config.port, config.host, resolve); }); }
      catch (error) { store.close(); throw error; }
      origin = `http://127.0.0.1:${server.address().port}`; return origin;
    },
    async close() { await runner.close(); await new Promise(resolve => server.close(resolve)); store.close(); },
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(realpathSync(process.argv[1])).href) {
  const args = process.argv.slice(2);
  if (args.some(arg => !['--allow-model-calls', '--allow-memory-model-calls', '--allow-cloud-traces', '--offline'].includes(arg))) throw new Error('Unknown startup argument');
  const env = loadLocalEnvironment();
  const config = loadConfig(args.includes('--offline') ? { ...env, AGENT_MODE: 'mock', AGENT_MEMORY_MODE: 'offline', AGENT_TRACE_MODE: 'offline' } : env, {
    allowModelCalls: args.includes('--allow-model-calls'), allowMemoryCalls: args.includes('--allow-memory-model-calls'), allowCloudTraces: args.includes('--allow-cloud-traces'),
  });
  const app = createApplication(config);
  const origin = await app.listen();
  console.log(`Local research agent: ${origin}${config.basePath}`);
  console.log(`Loopback listener${config.publicOrigin ? ' behind configured HTTPS proxy' : ' only'}. Model=${config.mode}; tracing=${config.traceMode}; search/pages=synthetic.`);
  for (const sig of ['SIGINT', 'SIGTERM']) process.once(sig, () => { app.close().then(() => process.exit(0)); });
}
