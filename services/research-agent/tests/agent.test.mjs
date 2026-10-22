import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { request as httpRequest } from 'node:http';
import { loadConfig, BASE_PATH } from '../config.mjs';
import { Store } from '../store.mjs';
import { AgentRunner } from '../agent.mjs';
import { hashPassword, verifyPassword, tokenHash, newToken, readSession, redact } from '../security.mjs';
import { createApplication } from '../server.mjs';

function fixture(t, overrides = {}, providers) {
  const config = { ...loadConfig({}), stepDelayMs: 0, dataDir: mkdtempSync(join(tmpdir(), 'research-agent-test-')), ...overrides };
  const store = new Store(config.dataDir); const runner = new AgentRunner(store, config, providers);
  t.after(async () => { await runner.close(); store.close(); });
  return { config, store, runner, task: (scenario = 'standard', budgetUnits = 20_000) => store.createTask({ goal: '比较静态网站技术方案', constraints: '低成本', scenario, budgetUnits }, config) };
}

test('ordinary configuration blocks real models, cloud tracing and /lab prefix', () => {
  assert.equal(BASE_PATH, '/p7x4m9q2-k6v8n3r5-t2w9c4h7/');
  assert.equal(loadConfig({}).host, '127.0.0.1');
  assert.throws(() => loadConfig({ AGENT_MODE: 'live' }), /Only mock/);
  assert.throws(() => loadConfig({ AGENT_TRACE_MODE: 'cloud' }), /offline/);
});
test('password hashes are salted, and session tokens are validated and hashed', async () => {
  const password = newToken(); const one = await hashPassword(password), two = await hashPassword(password);
  assert.notEqual(one, two); assert.ok(!one.includes(password));
  assert.equal(await verifyPassword(password, one), true); assert.equal(await verifyPassword('incorrect', one), false);
  const token = newToken(); assert.equal(readSession(`x=1; research_session=${token}`), token);
  assert.equal(readSession('research_session=bad'), null); assert.notEqual(tokenHash(token), token);
});
test('redaction removes credentials recursively without removing usage metadata', () => {
  const result = JSON.stringify(redact({ password: newToken(), nested: 'token=private-value sk-123456789012', usage: { total_tokens: 42 } }));
  assert.ok(!result.includes('private-value')); assert.ok(!result.includes('sk-123456789012')); assert.ok(result.includes('42'));
});
test('session idle/absolute expiration and failed-login windows persist', (t) => {
  let now = Date.UTC(2026, 9, 22); const f = fixture(t); f.store.clock = () => now;
  const hash = tokenHash(newToken()); f.store.createSession(hash);
  now += f.config.idleMs - 1; assert.ok(f.store.session(hash, f.config));
  now += f.config.idleMs; assert.equal(f.store.session(hash, f.config), false);
  f.store.createSession(hash); now += f.config.sessionMs; assert.equal(f.store.session(hash, f.config), false);
  for (let i = 0; i < 5; i++) f.store.failedLogin('local', f.config);
  assert.equal(f.store.loginAllowed('local', f.config), false);
  now += f.config.loginWindowMs; assert.equal(f.store.loginAllowed('local', f.config), true);
});
test('budget reserves atomically, rejects concurrent work and releases only unused units', async (t) => {
  const f = fixture(t, { dayBudgetUnits: 20_000 }); const task = f.task();
  assert.equal(f.store.budget(f.config).dayUsedUnits, 20_000);
  assert.throws(() => f.task(), /BUSY/);
  const result = await f.runner.start(task);
  assert.equal(f.store.budget(f.config).dayUsedUnits, result.estimatedCostUnits);
  assert.throws(() => f.task(), /BUDGET_EXCEEDED/);
  assert.equal(result.actualCostYuan, 0);
});
test('monthly limits apply across days and restart preserves records while releasing reservations', () => {
  const config = { ...loadConfig({}), dataDir: mkdtempSync(join(tmpdir(), 'research-restart-')), monthBudgetUnits: 20_000 };
  let now = Date.UTC(2026, 9, 21); const clock = () => now;
  const one = new Store(config.dataDir, clock);
  const input = { goal: 'test', constraints: '', scenario: 'standard', budgetUnits: 20_000 };
  const task = one.createTask(input, config); task.estimatedCostUnits = 500; one.saveTask(task);
  assert.throws(() => new Store(config.dataDir), /running service/); one.close();
  now += 86_400_000; const two = new Store(config.dataDir, clock);
  try {
    assert.equal(two.task(task.id).status, 'interrupted'); assert.equal(two.budget(config).monthUsedUnits, 500);
    assert.equal(two.budget(config).dayUsedUnits, 0); assert.throws(() => two.createTask(input, config), /BUDGET_EXCEEDED/);
  } finally { two.close(); }
});
test('normal agent uses observed tools and real LangSmith SDK serialization without network', async (t) => {
  const f = fixture(t); const originalFetch = globalThis.fetch;
  const previousSampling = process.env.LANGSMITH_TRACING_SAMPLING_RATE;
  process.env.LANGSMITH_TRACING_SAMPLING_RATE = '0';
  t.after(() => { if (previousSampling === undefined) delete process.env.LANGSMITH_TRACING_SAMPLING_RATE; else process.env.LANGSMITH_TRACING_SAMPLING_RATE = previousSampling; });
  globalThis.fetch = () => { throw new Error('Unexpected outbound network'); };
  t.after(() => { globalThis.fetch = originalFetch; });
  const result = await f.runner.start(f.task());
  assert.equal(result.status, 'completed'); assert.equal(result.traceStatus, 'sdk-offline-verified');
  assert.match(result.report, /20 元\/月/); assert.match(result.report, /合成响应/);
  const runs = f.store.traces(result.id), wire = f.store.wires(result.id);
  assert.equal(wire.filter(item => item.path === '/runs').length, runs.length);
  assert.ok(wire.some(item => item.payload?.name === 'tool.search'));
  assert.equal(runs.filter(run => run.run_type === 'chain').length, 1);
  for (const run of runs.slice(1)) { assert.equal(run.parent_run_id, result.id); assert.equal(run.trace_id, result.id); assert.ok(run.end_time >= run.start_time); }
  assert.ok(runs.some(run => run.outputs.usage_metadata?.total_tokens > 0 && run.extra.metadata.tokens_are_synthetic));
  assert.ok(!JSON.stringify(wire).includes('offline-placeholder-not-a-credential'));
});
for (const [scenario, status, phrase] of [
  ['empty-search', 'completed', '不生成虚构引用'], ['page-error', 'completed', '暂不作确定'],
  ['conflicting-sources', 'completed', '尚未核实版本'], ['injection', 'completed', '不可信数据'],
  ['timeout', 'completed', '暂不作确定'], ['loop', 'limited', '部分结果'],
  ['invalid-response', 'failed', '部分结果'], ['trace-failure', 'completed', '合成响应'],
]) test(`scenario ${scenario} preserves honest results and stops safely`, async (t) => {
  const f = fixture(t); const result = await f.runner.start(f.task(scenario));
  assert.equal(result.status, status); assert.match(result.report, new RegExp(phrase));
  assert.ok(result.stats.searches <= f.config.maxSearches); assert.ok(result.stats.pages <= f.config.maxPages);
  assert.ok(result.estimatedCostUnits <= result.budgetUnits); assert.equal(result.actualCostYuan, 0);
  if (scenario === 'injection') assert.ok(!f.store.events(result.id).some(event => /password|shell|send/.test(event.tool || '')));
  if (scenario === 'trace-failure') { assert.equal(result.traceStatus, 'failed-local-retained'); assert.ok(f.store.traces(result.id).length); }
});
for (const maxSteps of [1, 12]) test(`saving a report is terminal even when the model would repeat it (${maxSteps} step limit)`, async t => {
  let decisions = 0, saves = 0;
  const f = fixture(t, { maxSteps }, {
    decide: () => { decisions++; return { tool: 'save_report', args: {} }; },
    tool: () => { saves++; return { markdown: '# Saved report\n\nSynthetic fixture.' }; },
  });
  const task = f.task();
  const result = await f.runner.start(task);
  assert.equal(result.status, 'completed'); assert.equal(decisions, 1); assert.equal(saves, 1);
  assert.equal(result.estimatedCostUnits, 50);
  assert.equal(f.store.task(task.id).report, '# Saved report\n\nSynthetic fixture.');
  assert.equal(f.store.task(task.id).status, 'completed');
  assert.equal(result.traceStatus, 'sdk-offline-verified');
  assert.equal(f.store.traces(task.id).length, 3);
  assert.equal(f.store.traces(task.id)[0].outputs.status, 'completed');
  assert.ok(!f.store.events(task.id).some(e => e.type === 'limit'));
  assert.equal(f.store.events(task.id).at(-1).status, 'completed');
});

for (const output of [{}, { markdown: '' }, { markdown: '  ' }, { markdown: '# Incomplete', error: 'save failed' }])
test('an unsuccessful report save cannot complete the task', async t => {
  let decisions = 0;
  const f = fixture(t, {}, {
    decide: () => { decisions++; return { tool: 'save_report', args: {} }; }, tool: () => output,
  });
  const result = await f.runner.start(f.task());
  assert.equal(result.status, 'failed'); assert.equal(decisions, 1);
  assert.equal(f.store.traces(result.id)[0].outputs.status, 'failed');
});

test('per-task budget stops the loop before overspend', async (t) => {
  const f = fixture(t); const result = await f.runner.start(f.task('standard', 100));
  assert.equal(result.status, 'limited'); assert.ok(result.estimatedCostUnits <= 100);
});
test('a hung provider hits the actual task deadline', async (t) => {
  const f = fixture(t, { taskTimeoutMs: 40 }, { decide: () => new Promise(() => {}) });
  const start = Date.now(); const result = await f.runner.start(f.task());
  assert.equal(result.status, 'limited'); assert.ok(Date.now() - start < 2000);
  assert.ok(f.store.events(result.id).some(event => event.reason === 'DEADLINE'));
});
test('cancellation interrupts a hung provider', async (t) => {
  const f = fixture(t, {}, { decide: () => new Promise(() => {}) }); const task = f.task();
  const pending = f.runner.start(task); setTimeout(() => f.runner.cancel(task.id), 10);
  assert.equal((await pending).status, 'cancelled');
});
test('unobserved URLs and arbitrary tool names never reach tools', async (t) => {
  let called = false;
  const f = fixture(t, {}, { decide: () => ({ tool: 'read_page', args: { url: 'http://127.0.0.1/private' } }), tool: () => { called = true; } });
  assert.equal((await f.runner.start(f.task())).status, 'failed'); assert.equal(called, false);
});

test('HTTP protects workspace, history, report, trace, setup and cookies', async (t) => {
  const config = { ...loadConfig({}), port: 0, stepDelayMs: 0, dataDir: mkdtempSync(join(tmpdir(), 'research-http-')) };
  const app = createApplication(config); const origin = await app.listen(); t.after(() => app.close());
  const base = origin + BASE_PATH; let cookie = '';
  const request = (path, body, extra = {}) => fetch(base + path, { method: body === undefined ? 'GET' : 'POST', headers: { ...(body === undefined ? {} : { origin, 'content-type': 'application/json' }), ...(cookie ? { cookie } : {}), ...extra }, ...(body === undefined ? {} : { body: JSON.stringify(body) }), redirect: 'manual' });
  assert.equal((await fetch(origin + '/')).status, 404);
  assert.equal((await fetch(origin + '/lab' + BASE_PATH)).status, 404);
  assert.equal((await fetch(base.slice(0, -1), { redirect: 'manual' })).status, 303);
  const landing = await request(''); assert.equal(landing.headers.get('x-robots-tag'), 'noindex, nofollow, noarchive');
  assert.match(await landing.text(), /auth-form/);
  for (const path of ['api/tasks', 'api/status', `api/tasks/${newToken()}/report`, `api/tasks/${newToken()}/trace`]) assert.equal((await request(path)).status, 401);
  const password = newToken().slice(0, 6);
  assert.equal((await request('api/auth/setup', { password }, { origin: 'https://evil.example' })).status, 403);
  const spoofedHostStatus = await new Promise((resolve, reject) => {
    const req = httpRequest(base + 'api/auth/setup', { method: 'POST', headers: { host: 'attacker.example', origin, 'content-type': 'application/json' } }, response => {
      response.resume(); response.on('end', () => resolve(response.statusCode));
    });
    req.on('error', reject); req.end(JSON.stringify({ password }));
  });
  assert.equal(spoofedHostStatus, 403);
  assert.equal((await request('api/auth/setup', { password: 'short' })).status, 400);
  const setup = await request('api/auth/setup', { password }); assert.equal(setup.status, 200);
  const header = setup.headers.get('set-cookie'); assert.match(header, /HttpOnly/); assert.match(header, /SameSite=Strict/); assert.match(header, new RegExp(`Path=${BASE_PATH}`));
  cookie = header.split(';')[0]; assert.ok(!app.store.getSetting('password').includes(password));
  assert.equal((await request('api/auth/setup', { password })).status, 409);
  assert.match(await (await request('')).text(), /task-form/);
  assert.equal((await request('api/tasks', { goal: '技术选型', budgetYuan: 0 })).status, 400);
  assert.equal((await request('api/tasks', { goal: '技术选型', scenario: 'live' })).status, 400);
  const accepted = await request('api/tasks', { goal: '测试目标 <script>alert(1)</script> token=private-data' });
  assert.equal(accepted.status, 202); const task = await accepted.json();
  for (let i = 0; i < 100 && ['queued', 'running'].includes(app.store.task(task.id).status); i++) await new Promise(resolve => setTimeout(resolve, 10));
  assert.equal(app.store.task(task.id).status, 'completed');
  const report = await request(`api/tasks/${task.id}/report`); assert.equal(report.status, 200); assert.match(report.headers.get('content-disposition'), /attachment/);
  assert.ok(!(await report.text()).includes('private-data'));
  const trace = await (await request(`api/tasks/${task.id}/trace`)).json(); assert.equal(trace.cloudVerified, false); assert.ok(trace.sdkRequests.length);
  assert.equal((await request(`api/tasks/${task.id}/feedback`, { score: 1, note: '证据可读' })).status, 200);
  assert.equal((await request('api/auth/logout', {})).status, 200); assert.equal((await request('api/tasks')).status, 401);
  assert.equal((await request('api/auth/login', { password })).status, 200);
  cookie = '';
  for (let i = 0; i < 5; i++) assert.equal((await request('api/auth/login', { password: newToken() })).status, 401);
  assert.equal((await request('api/auth/login', { password })).status, 429);
});
