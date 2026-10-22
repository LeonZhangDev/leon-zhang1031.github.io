import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { loadConfig } from '../config.mjs';
import { loadLocalEnvironment } from '../local-env.mjs';
import { Store } from '../store.mjs';
import { AgentRunner } from '../agent.mjs';
import { createQwenProviders } from '../qwen-provider.mjs';
import { TaskTrace } from '../tracing.mjs';
import { newToken } from '../security.mjs';
import { randomUUID } from 'node:crypto';

// Every vendor request in this file MUST use a stub. No DNS/socket fallback exists.
globalThis.fetch = () => { throw new Error('External network forbidden in integration tests'); };
const modelEnv = () => ({ AGENT_MODE: 'qwen', DASHSCOPE_API_KEY: newToken(),
  QWEN_MODEL: 'qwen3.8-flash', QWEN_BASE_URL: 'https://dashscope.aliyuncs.com/compatible-mode/v1', QWEN_PRICING_CONFIRMED: 'true' });
const cloudEnv = () => ({ AGENT_TRACE_MODE: 'cloud', LANGSMITH_API_KEY: newToken(), LANGSMITH_FREE_TIER_CONFIRMED: 'true' });
function fixture(t, env = modelEnv(), approval = { allowModelCalls: true }, extra = {}) {
  const config = { ...loadConfig(env, approval), stepDelayMs: 0, ...extra,
    dataDir: mkdtempSync(join(tmpdir(), 'research-adapter-')) };
  const store = new Store(config.dataDir);
  t.after(() => store.close());
  const task = store.createTask({ goal: '比较技术方案 private-goal-marker', constraints: '', scenario: 'standard', budgetUnits: 20_000 }, config);
  return { config, store, task };
}
const completion = (tool = 'search', args = { query: 'test' }, usage = { prompt_tokens: 100, completion_tokens: 20 }) => ({
  choices: [{ finish_reason: 'tool_calls', message: { role: 'assistant', tool_calls: [{ id: 'fixture-call', type: 'function', function: { name: tool, arguments: JSON.stringify(args) } }] } }], usage,
});
const jsonResponse = (body, status = 200) => new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });
const stateFor = task => ({ ...task, allowedUrls: new Set(), readUrls: new Set(), evidence: [], observations: [], searches: 0, pages: 0, report: null });
// Reproduce immutable pre-upgrade rows. Historical calls have no new campaign tag.
function seedHistorical(store, taskId, units, pricingSnapshot = {}) {
  const id = randomUUID();
  store.db.prepare('INSERT INTO model_calls VALUES (?,?,?,?,?)').run(id, taskId, units, 'uncertain', JSON.stringify({ pricingSnapshot }));
  return id;
}

test('keys alone never opt into paid calls or cloud upload, even with ambient LANGSMITH_TRACING', async t => {
  const previous = process.env.LANGSMITH_TRACING;
  process.env.LANGSMITH_TRACING = 'true';
  t.after(() => { if (previous === undefined) delete process.env.LANGSMITH_TRACING; else process.env.LANGSMITH_TRACING = previous; });
  const config = loadConfig({ ...modelEnv(), ...cloudEnv(), AGENT_MODE: 'mock', AGENT_TRACE_MODE: 'offline', LANGSMITH_TRACING: 'true' });
  assert.equal(config.allowModelCalls, false); assert.equal(config.allowCloudTraces, false);
  assert.throws(() => createQwenProviders({}, config), /NOT_AUTHORIZED/);
  assert.throws(() => loadConfig(modelEnv()), /allow-model-calls/);
  assert.throws(() => loadConfig(cloudEnv()), /allow-cloud-traces/);
  const f = fixture(t, { ...modelEnv(), ...cloudEnv(), AGENT_MODE: 'mock', AGENT_TRACE_MODE: 'offline' }, {});
  const runner = new AgentRunner(f.store, f.config);
  const result = await runner.start(f.task);
  assert.equal(result.status, 'completed'); assert.equal(result.traceStatus, 'sdk-offline-verified');
  assert.equal(f.store.trialBudget(f.config).calls, 0);
  assert.ok(!JSON.stringify(f.store.wires(f.task.id)).includes(f.config.qwen.apiKey));
});
test('configuration requires keys, approved Beijing endpoint, verified model prices and confirmed free tier', () => {
  const env = modelEnv();
  for (const change of [{ DASHSCOPE_API_KEY: '' }, { QWEN_BASE_URL: 'http://127.0.0.1/private' },
    { QWEN_BASE_URL: 'https://attacker.example/compatible-mode/v1' }, { QWEN_MODEL: 'qwen-max' }, { QWEN_PRICING_CONFIRMED: 'false' }]) {
    assert.throws(() => loadConfig({ ...env, ...change }, { allowModelCalls: true }));
  }
  assert.throws(() => loadConfig({ ...cloudEnv(), LANGSMITH_ENDPOINT: 'https://attacker.example' }, { allowCloudTraces: true }));
  assert.throws(() => loadConfig({ ...cloudEnv(), LANGSMITH_FREE_TIER_CONFIRMED: 'false' }, { allowCloudTraces: true }));
  for (const value of ['0', '5.01', 'NaN', '-1']) assert.throws(() => loadConfig({ AGENT_TRIAL_BUDGET_YUAN: value }));
  assert.equal(loadConfig({}).trialBudgetUnits, 50_000);
});
test('local env loader preserves existing settings and never returns or logs the file', () => {
  const dir = mkdtempSync(join(tmpdir(), 'research-env-')), file = join(dir, '.env.local');
  const key = newToken(); writeFileSync(file, `DASHSCOPE_API_KEY=${key}\nAGENT_MODE=qwen\n`, 'utf8');
  const env = loadLocalEnvironment({ AGENT_MODE: 'mock' }, file);
  assert.equal(env.AGENT_MODE, 'mock'); assert.equal(env.DASHSCOPE_API_KEY, key);
  assert.equal(loadConfig(env).allowModelCalls, false);
  assert.deepEqual(loadLocalEnvironment({}, join(dir, 'missing')), {});
});
test('Qwen compatible request is non-streaming, bounded, redirect-blocked and records measured usage', async t => {
  const f = fixture(t); let requests = 0;
  const provider = createQwenProviders(f.store, f.config, { fetchImplementation: async (url, init) => {
    requests++; const body = JSON.parse(init.body);
    assert.equal(url, `${f.config.qwen.baseUrl}/chat/completions`);
    assert.equal(init.headers.authorization, `Bearer ${f.config.qwen.apiKey}`);
    assert.equal(init.redirect, 'error'); assert.equal(body.enable_thinking, false); assert.equal(body.enable_search, false); assert.equal(body.stream, false);
    assert.equal(body.model, 'qwen3.8-flash'); assert.equal(body.parallel_tool_calls, false);
    assert.equal(body.max_completion_tokens, 1200); assert.equal(body.max_tokens, undefined);
    assert.ok(body.tools.some(tool => tool.function.name === 'save_report'));
    assert.ok(f.store.trialBudget(f.config).reservedYuan > 0, 'Reservation must precede request');
    return jsonResponse(completion());
  } });
  const result = await provider.decide(stateFor(f.task));
  assert.equal(requests, 1); assert.equal(result.tool, 'search'); assert.equal(result.usageMetadata.total_tokens, 120);
  const budget = f.store.trialBudget(f.config);
  assert.equal(budget.uncertainCalls, 0); assert.equal(budget.usageEstimateYuan, 0.000134);
  assert.ok(budget.reservedYuan > budget.usageEstimateYuan);
  const row = f.store.db.prepare('SELECT reserved_units,body FROM model_calls WHERE task_id=?').get(f.task.id);
  const snapshot = JSON.parse(row.body).pricingSnapshot;
  assert.equal(snapshot.model, 'qwen3.8-flash'); assert.equal(snapshot.inputYuanPerMillion, 0.8);
  assert.equal(snapshot.outputYuanPerMillion, 2.7); assert.equal(snapshot.outputTokenBound, 1210);
  assert.equal(row.reserved_units, Math.ceil((snapshot.inputTokenBound * 0.8 + 1210 * 2.7) / 100));
});

test('Beijing generic and workspace endpoints are accepted without allowing redirects or other regions', () => {
  const env = modelEnv(), approval = { allowModelCalls: true };
  for (const url of ['https://dashscope.aliyuncs.com/compatible-mode/v1', 'https://dashscope.aliyuncs.com/compatible-mode/v1/',
    'https://offline-workspace.cn-beijing.maas.aliyuncs.com/compatible-mode/v1']) {
    assert.equal(loadConfig({ ...env, QWEN_BASE_URL: url }, approval).qwen.baseUrl, url.replace(/\/$/, ''));
  }
  for (const url of ['http://dashscope.aliyuncs.com/compatible-mode/v1', 'https://dashscope.aliyuncs.com.attacker.example/compatible-mode/v1',
    'https://user:secret@dashscope.aliyuncs.com/compatible-mode/v1', 'https://dashscope.aliyuncs.com/compatible-mode/v1?debug=true',
    'https://dashscope-intl.aliyuncs.com/compatible-mode/v1', 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions',
    'https://other.ap-southeast-1.maas.aliyuncs.com/compatible-mode/v1']) {
    assert.throws(() => loadConfig({ ...env, QWEN_BASE_URL: url }, approval), /endpoint/);
  }
});

test('Qwen tool choices follow unread sources and terminate after a single report save', async t => {
  const f = fixture(t); let requests = 0;
  const urls = ['https://docs.example.test/serverless', 'https://docs.example.test/node-service'];
  const runner = new AgentRunner(f.store, f.config, { fetchImplementation: async (url, init) => {
    const body = JSON.parse(init.body), tools = body.tools.map(tool => tool.function.name);
    const read = body.tools.find(tool => tool.function.name === 'read_page');
    requests++;
    assert.ok(!tools.includes('finish'));
    if (requests === 1) { assert.equal(read, undefined); return jsonResponse(completion('search', { query: 'compare' })); }
    if (requests <= 3) {
      assert.deepEqual(read.function.parameters.properties.url.enum, urls.slice(requests - 2));
      return jsonResponse(completion('read_page', { url: urls[requests - 2] }));
    }
    assert.equal(read, undefined, 'Exhausted source reads must not be offered again');
    assert.equal(requests, 4, 'No decision is allowed after saving');
    return jsonResponse(completion('save_report', { markdown: '# 比较\n\n合成资料建议：[方案 A](' + urls[0] + ')；[方案 B](' + urls[1] + ')。' }));
  } });
  const task = await runner.start(f.task);
  assert.equal(task.status, 'completed'); assert.equal(task.stats.pages, 2); assert.equal(requests, 4);
  assert.equal(f.store.traces(task.id).filter(run => run.name === 'tool.save_report').length, 1);
});
test('model pricing profiles remain distinct and unsupported models cannot inherit a cheaper rate', () => {
  const env = modelEnv(), approval = { allowModelCalls: true };
  const flash = loadConfig(env, approval).qwen;
  const previous = loadConfig({ ...env, QWEN_MODEL: 'qwen-plus-2025-12-01' }, approval).qwen;
  assert.equal(flash.outputYuanPerMillion, 2.7); assert.equal(flash.maxPricedInputTokens, 1_000_000);
  assert.equal(previous.outputYuanPerMillion, 2); assert.equal(previous.outputTokenParameter, 'max_tokens');
  for (const model of ['qwen3.8-flash-latest', 'qwen-max', '__proto__']) assert.throws(() => loadConfig({ ...env, QWEN_MODEL: model }, approval), /price profile/);
});
test('legacy model keeps its own output parameter and recorded usage price', async t => {
  const f = fixture(t, { ...modelEnv(), QWEN_MODEL: 'qwen-plus-2025-12-01' });
  const provider = createQwenProviders(f.store, f.config, { fetchImplementation: async (url, init) => {
    const body = JSON.parse(init.body);
    assert.equal(body.max_tokens, 1200); assert.equal(body.max_completion_tokens, undefined);
    return jsonResponse(completion());
  } });
  await provider.decide(stateFor(f.task));
  assert.equal(f.store.trialBudget(f.config).usageEstimateYuan, 0.00012);
});
test('existing cumulative reservations still stop Flash requests before transport at the 5-yuan boundary', async t => {
  const f = fixture(t); let oldTask = f.task, requests = 0;
  for (const units of [20_000, 20_000, 9999]) {
    const id = seedHistorical(f.store, oldTask.id, units, { model: 'qwen-plus-2025-12-01', outputYuanPerMillion: 2 });
    f.store.recordModelUsage(id, { inputTokens: 1, outputTokens: 1, usageEstimateYuan: 0.0000028 });
    oldTask.status = 'completed'; f.store.saveTask(oldTask);
    oldTask = f.store.createTask({ goal: 'next', budgetUnits: 20_000 }, f.config);
  }
  const provider = createQwenProviders(f.store, f.config, { fetchImplementation: async () => { requests++; return jsonResponse(completion()); } });
  await assert.rejects(provider.decide(stateFor(oldTask)), /MODEL_BUDGET/);
  assert.equal(requests, 0); assert.equal(f.store.trialBudget(f.config).reservedYuan, 4.9999);
  assert.equal(f.store.trialBudget(f.config).calls, 3);
  const body = JSON.parse(f.store.db.prepare('SELECT body FROM model_calls ORDER BY rowid LIMIT 1').get().body);
  assert.equal(body.pricingSnapshot.model, 'qwen-plus-2025-12-01');
  assert.equal(body.pricingSnapshot.outputYuanPerMillion, 2);
});
for (const tokens of [1210, 1211]) test(`Flash completion-token allowance handles ${tokens} tokens with conservative reservation`, async t => {
  const f = fixture(t);
  const provider = createQwenProviders(f.store, f.config, { fetchImplementation: async () => jsonResponse(completion('search', { query: 'test' }, { prompt_tokens: 100, completion_tokens: tokens })) });
  if (tokens === 1210) {
    await provider.decide(stateFor(f.task));
    const budget = f.store.trialBudget(f.config);
    assert.equal(budget.locked, false); assert.equal(budget.uncertainCalls, 0);
    assert.ok(budget.reservedYuan >= budget.usageEstimateYuan);
  } else {
    await assert.rejects(provider.decide(stateFor(f.task)), /OUTSIDE_BOUND/);
    assert.equal(f.store.trialBudget(f.config).locked, true);
  }
});
for (const [name, response] of [
  ['HTTP auth error', () => jsonResponse({ error: 'not logged' }, 401)],
  ['malformed JSON', () => new Response('{')],
  ['missing usage', () => jsonResponse({ choices: [] })],
  ['invalid arguments', () => { const body = completion(); body.choices[0].message.tool_calls[0].function.arguments = '{'; return jsonResponse(body); }],
  ['multiple actions', () => { const body = completion(); body.choices[0].message.tool_calls.push(body.choices[0].message.tool_calls[0]); return jsonResponse(body); }],
  ['unknown action', () => jsonResponse(completion('execute_shell', {}))],
]) test(`Qwen ${name} stops without hidden retries and retains reservation`, async t => {
  const f = fixture(t); let requests = 0;
  const provider = createQwenProviders(f.store, f.config, { fetchImplementation: async () => { requests++; return response(); } });
  await assert.rejects(provider.decide(stateFor(f.task)));
  assert.equal(requests, 1); assert.ok(f.store.trialBudget(f.config).reservedYuan > 0);
});
test('input and cumulative/per-task budget checks happen before any vendor request', async t => {
  const f = fixture(t); let requests = 0;
  const provider = createQwenProviders(f.store, f.config, { fetchImplementation: async () => { requests++; return jsonResponse(completion()); } });
  const state = stateFor(f.task); state.observations.push('x'.repeat(30_000));
  await assert.rejects(provider.decide(state), /MODEL_CONTEXT_LIMIT/);
  f.task.budgetUnits = 100; f.store.saveTask(f.task);
  f.store.reserveModelCall(f.task.id, f.task.budgetUnits, f.config);
  await assert.rejects(provider.decide(stateFor(f.task)), /MODEL_BUDGET/);
  assert.equal(requests, 0);
});
test('first-validation 5-yuan ledger survives restart and never refunds uncertain calls', () => {
  const config = { ...loadConfig({}), dataDir: mkdtempSync(join(tmpdir(), 'research-budget-restart-')) };
  const first = new Store(config.dataDir);
  const task = first.createTask({ goal: 'budget', constraints: '', scenario: 'standard', budgetUnits: 50_000 }, config);
  seedHistorical(first, task.id, 49_999); first.close();
  const second = new Store(config.dataDir);
  try {
    assert.equal(second.task(task.id).status, 'interrupted');
    assert.equal(second.trialBudget(config).reservedYuan, 4.9999);
    assert.equal(second.trialBudget(config).uncertainCalls, 1);
    assert.throws(() => second.reserveModelCall(task.id, 2, config), /MODEL_BUDGET/);
    second.reserveModelCall(task.id, 1, config);
    assert.throws(() => second.reserveModelCall(task.id, 1, config), /MODEL_BUDGET/);
  } finally { second.close(); }
});
test('usage beyond reservation bound locks subsequent model calls', async t => {
  const f = fixture(t); let requests = 0;
  const provider = createQwenProviders(f.store, f.config, { fetchImplementation: async () => {
    requests++; return jsonResponse(completion('search', {}, { prompt_tokens: 999_999, completion_tokens: 1 }));
  } });
  await assert.rejects(provider.decide(stateFor(f.task)), /OUTSIDE_BOUND/);
  assert.equal(f.store.trialBudget(f.config).locked, true);
  await assert.rejects(provider.decide(stateFor(f.task)), /MODEL_BUDGET/); assert.equal(requests, 1);
});
test('task deadline aborts the underlying Qwen request and retains uncertain reservation', async t => {
  // Leave startup time under parallel browser/SDK load so this tests an in-flight
  // request abort, rather than a deadline reached before transport even starts.
  const f = fixture(t, modelEnv(), { allowModelCalls: true }, { taskTimeoutMs: 1000 }); let aborted = false;
  const runner = new AgentRunner(f.store, f.config, { fetchImplementation: (url, init) => new Promise((resolve, reject) => {
    init.signal.addEventListener('abort', () => { aborted = true; reject(new Error('stopped')); }, { once: true });
  }) });
  const result = await runner.start(f.task);
  assert.equal(result.status, 'limited'); assert.equal(aborted, true);
  assert.equal(result.modelBilling.uncertainCalls, 1); assert.equal(result.actualCostYuan, null);
});
for (const stop of ['request-timeout', 'user-cancel']) test(`Qwen ${stop} aborts transport with no automatic retry or refund`, async t => {
  const f = fixture(t);
  if (stop === 'request-timeout') f.config.qwen.requestTimeoutMs = 15;
  let requests = 0, aborted = false;
  const runner = new AgentRunner(f.store, f.config, { fetchImplementation: (url, init) => new Promise((resolve, reject) => {
    requests++;
    if (stop === 'user-cancel') setTimeout(() => runner.cancel(f.task.id), 10);
    init.signal.addEventListener('abort', () => { aborted = true; reject(new Error('stopped')); }, { once: true });
  }) });
  const result = await runner.start(f.task);
  assert.equal(result.status, stop === 'user-cancel' ? 'cancelled' : 'failed');
  assert.equal(requests, 1); assert.equal(aborted, true); assert.equal(result.modelBilling.uncertainCalls, 1);
});
test('stubbed Qwen completes the actual agent loop with model-written report and measured local trace', async t => {
  const f = fixture(t); let index = 0;
  const actions = [ ['search', { query: 'options' }], ['read_page', { url: 'https://docs.example.test/serverless' }],
    ['read_page', { url: 'https://docs.example.test/node-service' }], ['calculate', { fixed: 0, perRequest: 0.02, requests: 1000 }],
    ['save_report', { markdown: '# Qwen stub report\n\n## 未确认事项\n合成资料比较：[方案 A](https://docs.example.test/serverless)' }], ['finish', {}] ];
  const runner = new AgentRunner(f.store, f.config, { fetchImplementation: async () => jsonResponse(completion(...actions[index++])) });
  const result = await runner.start(f.task);
  assert.equal(result.status, 'completed'); assert.equal(index, 5);
  assert.equal(result.traceStatus, 'sdk-offline-verified'); assert.match(result.report, /Qwen stub report/);
  assert.match(result.report, /未联网调研/); assert.equal(result.simulated, false); assert.equal(result.toolsSimulated, true);
  assert.equal(result.modelBilling.calls, 5); assert.equal(result.modelBilling.uncertainCalls, 0);
  const llmRuns = f.store.traces(result.id).filter(run => run.run_type === 'llm');
  assert.equal(llmRuns.length, 5); assert.ok(llmRuns.every(run => run.outputs.usage_metadata.total_tokens === 120 && !run.extra.metadata.tokens_are_synthetic));
});
test('model-written reports cannot invent source URLs', async t => {
  const f = fixture(t), provider = createQwenProviders(f.store, f.config);
  await assert.rejects(provider.tool({ tool: 'save_report', args: { markdown: '[made up](https://attacker.example/source)' } }, stateFor(f.task)), /INVALID_SOURCE/);
});
test('LangSmith SDK cloud adapter sends counters only through an injected transport', async t => {
  const f = fixture(t, cloudEnv(), { allowCloudTraces: true }); const payloads = [];
  const trace = new TaskTrace(f.store, f.task.id, { config: f.config, fetchImplementation: async (url, init) => {
    assert.equal(String(url), 'https://api.smith.langchain.com/runs'); assert.equal(init.redirect, 'error');
    payloads.push(JSON.parse(new TextDecoder().decode(init.body))); return jsonResponse({});
  } });
  trace.root.inputs = { goal: 'private-goal-marker' };
  await trace.span('agent.decision', 'llm', { step: 1, evidenceCount: 2, raw: 'private-input-marker' }, () => ({ secretText: 'private-output-marker' }));
  assert.equal(await trace.finish({ status: 'completed', rawReport: 'private-report-marker' }), 'cloud-api-accepted');
  assert.equal(payloads.length, 2);
  assert.ok(f.store.wires(f.task.id).every(record => record.transport === 'cloud' && record.status === 200 && !record.payload));
  const serialized = JSON.stringify(payloads);
  assert.ok(!/private-(goal|input|output|report)-marker/.test(serialized));
  assert.ok(!serialized.includes(f.config.langsmith.apiKey));
  assert.ok(serialized.includes('evidenceCount')); assert.ok(serialized.includes('private-research-agent-dev'));
  assert.ok(JSON.stringify(f.store.traces(f.task.id)).includes('private-goal-marker'));
});
test('cloud transport failure retains all local spans and prevents SDK retries', async t => {
  const f = fixture(t, cloudEnv(), { allowCloudTraces: true }); let calls = 0;
  const trace = new TaskTrace(f.store, f.task.id, { config: f.config, fetchImplementation: async () => { calls++; throw new Error('private-network-error'); } });
  await trace.span('tool.search', 'tool', {}, () => ({ results: [] }));
  assert.equal(await trace.finish({ status: 'completed' }), 'failed-local-retained');
  assert.equal(calls, 1); assert.equal(f.store.traces(f.task.id).length, 2);
});
test('cloud trial cap and same-task replay guard block export before network', async t => {
  const f = fixture(t, cloudEnv(), { allowCloudTraces: true });
  f.store.claimCloudTrace(f.task.id, 20);
  const trace = new TaskTrace(f.store, f.task.id, { config: f.config });
  assert.equal(await trace.finish({ status: 'completed' }), 'cloud-limit-local-retained');
  f.task.status = 'completed'; f.store.saveTask(f.task);
  const next = f.store.createTask({ goal: 'next', budgetUnits: 20_000 }, f.config);
  assert.throws(() => f.store.claimCloudTrace(next.id, 1), /CLOUD_TRIAL_LIMIT/);
});
