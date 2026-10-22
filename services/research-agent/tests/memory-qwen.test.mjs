import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { randomUUID } from 'node:crypto';
import { loadConfig } from '../config.mjs';
import { Store } from '../store.mjs';
import { MemoryService } from '../memory.mjs';
import { createMemoryProviders } from '../memory-qwen.mjs';
import { createQwenProviders } from '../qwen-provider.mjs';
import { AgentRunner } from '../agent.mjs';

// This suite has no real transport. Keys and model payloads are synthetic.
globalThis.fetch = () => { throw new Error('NETWORK_FORBIDDEN'); };
const envFor = () => ({ AGENT_MEMORY_MODE: 'qwen', MEMORY_PRICING_CONFIRMED: 'true', DASHSCOPE_API_KEY: randomUUID() });
const response = (body, status = 200) => new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', 'x-request-id': 'offline-fixture' } });
const vector = (axis = 0) => Array.from({ length: 1024 }, (_, i) => Number(i === axis));
const embeddingPayload = input => ({ data: input.map((text, index) => ({ index, embedding: vector(/天气|无关/.test(text) ? 1 : 0) })), usage: { prompt_tokens: 20, total_tokens: 20 } });
const extractionPayload = memories => ({ choices: [{ finish_reason: 'stop', message: { role: 'assistant', content: JSON.stringify({ memories }) } }], usage: { prompt_tokens: 100, completion_tokens: 40 } });
function fixture(t, { env = {}, transport } = {}) {
  const config = { ...loadConfig({ ...envFor(), ...env }, { allowMemoryCalls: true, allowModelCalls: true }),
    dataDir: mkdtempSync(join(tmpdir(), 'research-memory-qwen-')), stepDelayMs: 0 };
  const store = new Store(config.dataDir), calls = [];
  const fetchImplementation = async (url, init) => {
    assert.equal(init.redirect, 'error'); assert.ok(init.signal);
    assert.ok(store.trialBudget(config).reservedYuan > 0, 'Reserve before every request');
    const body = JSON.parse(init.body); calls.push({ url, body });
    if (transport) return transport(url, init, body, calls);
    if (url.endsWith('/embeddings')) return response(embeddingPayload(body.input));
    const text = body.messages.at(-1).content;
    return response(extractionPayload([{ text, sourceQuote: text, scope: 'user' }]));
  };
  const memory = new MemoryService(store, config, { fetchImplementation });
  t.after(async () => { await memory.close(); store.close(); });
  return { config, store, memory, calls, fetchImplementation };
}

test('memory keys/config alone cannot authorize calls; independent flags and exact price profiles are required', () => {
  assert.throws(() => loadConfig(envFor()), /allow-memory-model-calls/);
  assert.throws(() => loadConfig(envFor(), { allowModelCalls: true }), /NOT_AUTHORIZED/);
  for (const change of [{ DASHSCOPE_API_KEY: '' }, { MEMORY_PRICING_CONFIRMED: 'false' },
    { MEMORY_LLM_MODEL: 'unpriced-model' }, { MEMORY_EMBEDDING_MODEL: 'text-embedding-v3' },
    { MEMORY_EMBEDDING_DIMENSIONS: '128' }, { QWEN_BASE_URL: 'https://attacker.example/compatible-mode/v1' },
    { MEMORY_RECALL_THRESHOLD: 'NaN' }, { MEMORY_RECALL_THRESHOLD: '1.1' }]) {
    assert.throws(() => loadConfig({ ...envFor(), ...change }, { allowMemoryCalls: true }));
  }
  for (const value of ['0', '0.5001', '5', 'NaN', '-1']) assert.throws(() => loadConfig({ AGENT_VALIDATION_BUDGET_YUAN: value }));
  const config = loadConfig({ ...envFor(), AGENT_MEMORY_MODE: 'offline' });
  assert.equal(config.allowMemoryCalls, false); assert.equal(config.validationBudgetUnits, 5000);
  assert.equal(config.memory.llm.maxOutputTokens, 512); assert.equal(config.memory.embedding.dimensions, 1024);
});

test('Mem0 uses compatible embeddings, finite 1024D vectors and priced memory-operation records', async t => {
  const f = fixture(t);
  const saved = await f.memory.remember('偏好低维护成本', { scope: 'user' });
  assert.ok(saved.id); assert.equal(f.calls.length, 1);
  const { url, body } = f.calls[0];
  assert.equal(url, 'https://dashscope.aliyuncs.com/compatible-mode/v1/embeddings');
  assert.equal(body.model, 'text-embedding-v4'); assert.equal(body.dimensions, 1024); assert.equal(body.encoding_format, 'float');
  assert.deepEqual(body.input, ['偏好低维护成本']);
  const snapshot = JSON.parse(f.store.db.prepare('SELECT body FROM memory_model_calls').get().body);
  assert.equal(snapshot.pricingSnapshot.inputYuanPerMillion, 0.5);
  assert.equal(snapshot.pricingSnapshot.outputYuanPerMillion, 0); assert.equal(snapshot.pricingSnapshot.dimensions, 1024);
  assert.equal(snapshot.pricingSnapshot.purpose, 'memory-embedding'); assert.equal(snapshot.requestId, 'offline-fixture');
  assert.equal(snapshot.usageEstimateYuan, 0.00001); assert.ok(!JSON.stringify(snapshot).includes(f.config.qwen.apiKey));
  assert.equal(f.store.trialBudget(f.config).uncertainCalls, 0);
  assert.equal(f.store.trialBudget(f.config).validation.calls, 1);
  assert.equal((await f.memory.recall('维护成本'))[0].id, saved.id);
  assert.deepEqual(await f.memory.recall('无关天气'), []);
  const before = f.calls.length;
  assert.equal((await f.memory.remember('偏好低维护成本', { scope: 'user' })).id, saved.id);
  await f.memory.list(); assert.equal(f.calls.length, before, 'Dedup/list do not call providers');
  f.memory.setEnabled(false); assert.deepEqual(await f.memory.recall('维护成本'), []);
  assert.equal(f.calls.length, before);
});

test('calibrated recall keeps moderately similar paraphrases and rejects unrelated vectors', async t => {
  const f = fixture(t, { transport: (_url, _init, body) => response({
    data: body.input.map((text, index) => {
      const embedding = vector(/无关/.test(text) ? 1 : 0);
      if (text === '后续运维负担') { embedding[0] = 0.6; embedding[1] = 0.8; }
      return { index, embedding };
    }), usage: { prompt_tokens: 20, total_tokens: 20 },
  }) });
  const saved = await f.memory.remember('优先降低日常维护工作量');
  const matches = await f.memory.recall('后续运维负担');
  assert.equal(matches[0]?.id, saved.id); assert.ok(Math.abs(matches[0].score - 0.6) < 1e-9);
  assert.deepEqual(await f.memory.recall('无关天气'), []);
});

test('real index stays separate from the original offline memory and survives restart without network initialization', async t => {
  const f = fixture(t), offline = new MemoryService(f.store, { ...f.config, memoryMode: 'offline', allowMemoryCalls: false });
  await offline.remember('原始模拟记忆'); await offline.close();
  const path = join(f.config.dataDir, 'memory-offline.sqlite'), original = readFileSync(path);
  await f.memory.remember('真实索引合成测试记忆');
  assert.ok(existsSync(join(f.config.dataDir, 'memory-qwen-text-embedding-v4-1024-v1.sqlite')));
  assert.equal((await f.memory.list())[0].memory, '真实索引合成测试记忆');
  await f.memory.close(); f.memory.pending = null;
  const requests = f.calls.length;
  assert.equal((await f.memory.list()).length, 1); assert.equal(f.calls.length, requests);
  assert.deepEqual(readFileSync(path), original);
});

test('Qwen extraction through Mem0 produces inactive quoted candidates until explicit confirmation', async t => {
  const f = fixture(t), text = '技术选型优先考虑维护成本';
  const saved = await f.memory.propose(text);
  assert.equal(saved.length, 1); assert.equal(f.calls[0].body.model, 'qwen3.8-flash');
  assert.equal(f.calls[0].body.enable_thinking, false); assert.equal(f.calls[0].body.enable_search, false);
  assert.equal(f.calls[0].body.max_completion_tokens, 512); assert.equal(f.calls[0].body.max_tokens, undefined);
  assert.deepEqual(f.calls[0].body.response_format, { type: 'json_object' });
  assert.equal(f.calls.filter(call => call.url.endsWith('/chat/completions')).length, 1);
  assert.deepEqual(await f.memory.list(), []);
  const pending = await f.memory.list({ includeCandidates: true });
  assert.equal(pending[0].metadata.sourceQuote, text); assert.equal(pending[0].metadata.enabled, false);
  const count = f.calls.length; assert.deepEqual(await f.memory.recall('维护成本'), []); assert.equal(f.calls.length, count);
  await assert.rejects(f.memory.change(saved[0].id, 'toggle'), /NOT_FOUND/);
  await f.memory.review(saved[0].id, 'confirm');
  assert.equal((await f.memory.list())[0].metadata.source, 'confirmed-user');
  assert.equal((await f.memory.recall('维护成本'))[0].text, text);
  const more = await f.memory.propose('我偏好简洁中文报告');
  await f.memory.review(more[0].id, 'reject');
  assert.equal((await f.memory.list({ includeCandidates: true })).length, 1);
  assert.equal(f.store.db.prepare('SELECT COUNT(*) n FROM cloud_dispatch').get().n, 0);
});

test('index model/dimension mismatches fail before a request and a failed initializer closes safely', async t => {
  const f = fixture(t); await f.memory.remember('索引保护');
  const engine = await f.memory.engine();
  assert.equal(engine.constructor.name, 'LocalMemory');
  await assert.rejects(engine.llm.generateResponse([{ role: 'user', content: '无操作上下文' }]), /OPERATION_REQUIRED/);
  await assert.rejects(engine.vectorStore.update(randomUUID(), [1, 2], { data: '错误向量' }), /VECTOR_INVALID/);
  engine.vectorStore.db.prepare("UPDATE vector_profile SET model='different-model' WHERE collection='memories'").run();
  await f.memory.close();
  await assert.rejects(f.memory.list(), /MEMORY_INIT_FAILED/); assert.equal(f.calls.length, 1);
  await f.memory.close();
});

test('memory input secrets and disabled extraction are rejected before any paid request', async t => {
  const f = fixture(t);
  await assert.rejects(f.memory.propose('token=private-fixture'), /TEXT_INVALID/);
  await assert.rejects(f.memory.remember('token=private-fixture'), /TEXT_INVALID/);
  f.memory.setEnabled(false);
  await assert.rejects(f.memory.propose('偏好中文'), /MEMORY_DISABLED/);
  assert.equal(f.calls.length, 0); assert.equal(f.store.trialBudget(f.config).calls, 0);
});

test('a populated unversioned real index is never silently adopted as the configured embedding model', async t => {
  const f = fixture(t); await f.memory.remember('保留原向量来源');
  const engine = await f.memory.engine(); engine.vectorStore.db.prepare('DELETE FROM vector_profile').run();
  await f.memory.close();
  await assert.rejects(f.memory.list(), /MEMORY_INIT_FAILED/); assert.equal(f.calls.length, 1);
});

for (const name of ['invented-quote', 'paraphrase', 'too-many', 'truncated']) test(`extraction rejects ${name} before persisting candidates`, async t => {
  const f = fixture(t, { transport: () => {
    let memories = [{ text: '用户没有说过的偏好', sourceQuote: '用户没有说过的偏好', scope: 'user' }];
    if (name === 'paraphrase') memories = [{ text: '另一种意思', sourceQuote: '偏好中文', scope: 'user' }];
    if (name === 'too-many') memories = Array(4).fill({ text: '偏好中文', sourceQuote: '偏好中文', scope: 'user' });
    const payload = extractionPayload(memories);
    if (name === 'truncated') payload.choices[0].finish_reason = 'length';
    return response(payload);
  } });
  await assert.rejects(f.memory.propose('偏好中文'), /EXTRACTION_INVALID/);
  assert.deepEqual(await f.memory.list({ includeCandidates: true }), []); assert.equal(f.calls.length, 1);
  assert.equal(f.store.trialBudget(f.config).uncertainCalls, 0, 'Known usage retained even when content is rejected');
});

for (const fault of ['wrong-dimension', 'non-finite', 'duplicate-index', 'missing-row', 'missing-usage', 'http', 'usage-overflow']) {
  test(`embedding ${fault} fails closed with no retry or silent fixture fallback`, async t => {
    const f = fixture(t, { transport: (url, init, body) => {
      const payload = embeddingPayload(body.input);
      if (fault === 'wrong-dimension') payload.data[0].embedding = [1, 0];
      if (fault === 'non-finite') payload.data[0].embedding[1] = null;
      if (fault === 'duplicate-index') payload.data[0].index = 99;
      if (fault === 'missing-row') payload.data = [];
      if (fault === 'missing-usage') delete payload.usage;
      if (fault === 'usage-overflow') payload.usage.prompt_tokens = 999_999;
      return response(payload, fault === 'http' ? 401 : 200);
    } });
    await assert.rejects(f.memory.remember('测试偏好'));
    assert.equal(f.calls.length, 1); assert.deepEqual(await f.memory.list(), []);
    const budget = f.store.trialBudget(f.config); assert.ok(budget.reservedYuan > 0);
    assert.equal(budget.locked, fault === 'usage-overflow');
    assert.equal(budget.uncertainCalls, ['missing-usage', 'http', 'usage-overflow'].includes(fault) ? 1 : 0);
  });
}

test('batching validates all input before requests, reorders indices and deduplicates only within an operation', async t => {
  const f = fixture(t, { transport: (url, init, body) => {
    const payload = embeddingPayload(body.input); payload.data.reverse(); return response(payload);
  } });
  const providers = createMemoryProviders(f.store, f.config, { fetchImplementation: f.fetchImplementation });
  await assert.rejects(providers.embeddings.embedQuery('偏好'), /OPERATION_REQUIRED/);
  await providers.withOperation('batch-test', {}, async () => {
    const texts = Array.from({ length: 21 }, (_, i) => `偏好${i}`);
    const vectors = await providers.embeddings.embedDocuments(texts);
    assert.equal(vectors.length, 21); assert.ok(vectors.every(v => v.length === 1024));
    await providers.embeddings.embedQuery('偏好0');
  });
  assert.deepEqual(f.calls.map(call => call.body.input.length), [10, 10, 1]);
  await providers.withOperation('new-operation', {}, () => providers.embeddings.embedQuery('偏好0'));
  assert.equal(f.calls.length, 4, 'No persistent cache retains forgotten memory vectors');
  await assert.rejects(providers.withOperation('invalid-batch', {}, () => providers.embeddings.embedDocuments(['合法', 'x'.repeat(8193)])), /INPUT_INVALID/);
  assert.equal(f.calls.length, 4);
});

test('SDK fallback after a failed batch cannot trigger another paid request in the same operation', async t => {
  const f = fixture(t, { transport: () => response({}, 503) });
  const providers = createMemoryProviders(f.store, f.config, { fetchImplementation: f.fetchImplementation });
  await assert.rejects(providers.withOperation('sdk-fallback', {}, async () => {
    try { await providers.embeddings.embedDocuments(['偏好']); } catch { /* SDK-style catch */ }
    return providers.embeddings.embedQuery('偏好');
  }), /REQUEST_FAILED/);
  assert.equal(f.calls.length, 1); assert.equal(f.store.trialBudget(f.config).uncertainCalls, 1);
});

for (const reason of ['timeout', 'cancel']) test(`memory ${reason} aborts transport and retains its reservation`, async t => {
  let aborted = false;
  const f = fixture(t, { transport: (url, init) => new Promise((resolve, reject) => {
    init.signal.addEventListener('abort', () => { aborted = true; reject(new Error('stopped')); }, { once: true });
  }) });
  f.config.memory.embedding.requestTimeoutMs = 20;
  const controller = new AbortController();
  if (reason === 'cancel') setTimeout(() => controller.abort(), 10);
  // Keep the event loop alive while AbortSignal.timeout uses an unref'ed timer.
  const keepAlive = setTimeout(() => {}, 2000);
  try { await assert.rejects(f.memory.remember('测试中止', { signal: controller.signal }), /REQUEST_STOPPED/); }
  finally { clearTimeout(keepAlive); }
  assert.equal(aborted, true); assert.equal(f.calls.length, 1);
  assert.equal(f.store.trialBudget(f.config).uncertainCalls, 1);
});

test('additional 0.5-yuan cap includes Agent and memory calls and persists across restarts/mode changes', async t => {
  const f = fixture(t, { env: { AGENT_MODE: 'qwen', QWEN_PRICING_CONFIRMED: 'true' } });
  const task = f.store.createTask({ goal: '预算测试', constraints: '', scenario: 'standard', budgetUnits: 20_000 }, f.config);
  const historicalId = randomUUID(), historicalBody = JSON.stringify({ pricingSnapshot: { model: 'historical' } });
  f.store.db.prepare('INSERT INTO model_calls VALUES (?,?,?,?,?)').run(historicalId, task.id, 2908, 'uncertain', historicalBody);
  await f.memory.remember('合成偏好');
  const before = f.store.trialBudget(f.config);
  assert.equal(before.validation.calls, 1); assert.ok(before.reservedYuan > before.validation.reservedYuan);
  f.store.reserveModelCall(task.id, 5000 - Math.round(before.validation.reservedYuan * 10_000), f.config);
  let requests = 0;
  const provider = createQwenProviders(f.store, f.config, { fetchImplementation: async () => { requests++; throw new Error('must not run'); } });
  await assert.rejects(provider.decide({ ...task, allowedUrls: new Set(), readUrls: new Set(), observations: [] }), /VALIDATION_BUDGET/);
  await assert.rejects(f.memory.remember('第二条合成偏好'), /VALIDATION_BUDGET/);
  assert.equal(requests, 0); assert.equal(f.calls.length, 1);
  assert.equal(f.store.trialBudget(f.config).validation.reservedYuan, 0.5);
  assert.equal(f.store.db.prepare('SELECT body FROM model_calls WHERE id=?').get(historicalId).body, historicalBody);
  await f.memory.close(); f.memory.pending = null; f.store.close();
  const reopened = new Store(f.config.dataDir);
  f.store.close = () => {}; // fixture teardown no longer owns the old handle
  try {
    const config = { ...f.config, memoryMode: 'offline', allowMemoryCalls: false };
    assert.equal(reopened.trialBudget(config).validation.reservedYuan, 0.5);
    assert.equal(reopened.trialBudget(config).uncertainCalls, 2);
    assert.throws(() => reopened.reserveModelCall(task.id, 1, config), /VALIDATION_BUDGET/);
  } finally { reopened.close(); }
});

test('historical reservations and task limits block memory before transport; simultaneous reservations stay atomic', async t => {
  const f = fixture(t);
  const task = f.store.createTask({ goal: 'legacy', scenario: 'standard', budgetUnits: 50_000 }, f.config);
  f.store.db.prepare('INSERT INTO model_calls VALUES (?,?,?,?,?)').run(randomUUID(), task.id, 49_999, 'uncertain', '{}');
  await assert.rejects(f.memory.remember('不能超出5元'), /MODEL_BUDGET/); assert.equal(f.calls.length, 0);
  assert.equal(f.store.trialBudget(f.config).reservedYuan, 4.9999);
  const dir = mkdtempSync(join(tmpdir(), 'research-cap-atomic-')), store = new Store(dir);
  try {
    const ids = [store.createMemoryOperation('a'), store.createMemoryOperation('b')];
    const results = await Promise.allSettled(ids.map(id => Promise.resolve().then(() => store.reserveModelCall(null, 3000, f.config, {}, id))));
    assert.equal(results.filter(result => result.status === 'fulfilled').length, 1);
    assert.equal(store.trialBudget(f.config).validation.reservedYuan, 0.3);
    const task = store.createTask({ goal: 'tiny', scenario: 'standard', budgetUnits: 1 }, f.config);
    const operationId = store.createMemoryOperation('tiny', task.id);
    assert.throws(() => store.reserveModelCall(task.id, 2, f.config, {}, operationId), /MODEL_BUDGET/);
  } finally { store.close(); }
});

test('actual Agent loop uses budgeted memory callbacks and cancellation, with one terminal report save', async t => {
  const f = fixture(t), runner = new AgentRunner(f.store, f.config, { memory: f.memory });
  const task = f.store.createTask({ goal: '比较后端\n记住：优先维护成本', constraints: '本次先满足延迟', scenario: 'standard', budgetUnits: 20_000 }, f.config);
  const result = await runner.start(task);
  assert.equal(result.status, 'completed'); assert.equal(result.memoryUsed[0].text, '优先维护成本');
  assert.ok(result.modelBilling.calls >= 2); assert.equal(result.actualCostYuan, null);
  assert.equal(result.traceStatus, 'sdk-offline-verified'); assert.equal(f.store.trialBudget(f.config).calls, result.modelBilling.calls);
  const events = f.store.events(task.id), saved = events.findIndex(event => event.tool === 'save_report' && event.type === 'tool-result');
  assert.ok(f.store.traces(task.id).some(run => run.name === 'memory.recall'));
  assert.ok(f.store.traces(task.id).some(run => run.name === 'memory.remember'));
  assert.equal(events.slice(saved + 1).filter(event => event.type === 'decision').length, 0);
  assert.equal(f.store.db.prepare('SELECT COUNT(*) n FROM cloud_dispatch').get().n, 0);
});
