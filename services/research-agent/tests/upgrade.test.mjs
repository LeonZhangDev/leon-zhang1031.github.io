import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { loadConfig } from '../config.mjs';
import { Store } from '../store.mjs';
import { MemoryService, explicitMemories } from '../memory.mjs';
import { AgentRunner } from '../agent.mjs';
import { mockDecision } from '../mock-provider.mjs';
import { ContextManager, readEvidence, sourceId } from '../context.mjs';
import { loadSkills, selectSkills } from '../skills.mjs';

// Fail immediately if Mem0, LangSmith or a provider tries to leave this process.
globalThis.fetch = () => { throw new Error('NETWORK_FORBIDDEN'); };
function fixture(t) {
  const config = { ...loadConfig({}), dataDir: mkdtempSync(join(tmpdir(), 'research-upgrade-')), stepDelayMs: 0 };
  const store = new Store(config.dataDir), runner = new AgentRunner(store, config);
  t.after(async () => { await runner.close(); store.close(); });
  return { config, store, runner, task: (goal, constraints = '') => store.createTask({ goal, constraints, scenario: 'standard', budgetUnits: 20000 }, config) };
}

test('real Mem0 OSS CRUD and filtered recall persist across restart without model calls or telemetry', async t => {
  const f = fixture(t), memory = f.runner.memory;
  const budget = f.store.trialBudget(f.config);
  const saved = await memory.remember('技术选型优先考虑维护成本', { scope: 'user' });
  assert.ok(saved.id); assert.equal(process.env.MEM0_TELEMETRY, 'false');
  assert.equal((await memory.list()).length, 1);
  assert.equal((await memory.recall('维护成本')).length, 1);
  const engine = await memory.engine();
  assert.equal(engine.constructor.name, 'LocalMemory');
  assert.throws(() => engine.llm.llmInstance.invoke(), /MEMORY_MODEL_CALL_FORBIDDEN/);
  await engine.add('隔离空间的维护成本', { userId: 'another-user', agentId: 'research-agent', infer: false, metadata: { enabled: true } });
  assert.equal((await memory.recall('维护成本')).length, 1);
  await memory.change(saved.id, 'update', '技术选型优先考虑长期维护成本');
  await memory.change(saved.id, 'toggle'); assert.equal((await memory.recall('维护成本')).length, 0);
  await memory.close(); memory.pending = null;
  assert.equal((await memory.list())[0].memory, '技术选型优先考虑长期维护成本');
  await memory.change(saved.id, 'toggle');
  assert.equal((await memory.recall('维护成本'))[0].text, '技术选型优先考虑长期维护成本');
  await memory.change(saved.id, 'forget'); assert.equal((await memory.list()).length, 0);
  assert.deepEqual(f.store.trialBudget(f.config), budget);
});

test('memory rejects inferred/secret writes, supports disable, and deduplicates explicit facts', async t => {
  const f = fixture(t), memory = f.runner.memory;
  await assert.rejects(memory.remember('token=private-value'), /MEMORY_TEXT_INVALID/);
  await assert.rejects(memory.remember(''), /MEMORY_TEXT_INVALID/);
  await assert.rejects(memory.remember('偏好', { scope: '../other' }), /MEMORY_SCOPE_INVALID/);
  await Promise.all(Array.from({ length: 5 }, () => memory.remember('偏好 SQLite')));
  assert.equal((await memory.list()).length, 1);
  memory.setEnabled(false); assert.deepEqual(await memory.recall('SQLite'), []);
  await assert.rejects(memory.remember('其他'), /MEMORY_DISABLED/);
  assert.equal((await memory.list()).length, 1); // Disabled memories can still be managed.
  assert.throws(() => new MemoryService(f.store, { ...f.config, memoryMode: 'qwen' }), /NOT_AUTHORIZED/);
  assert.throws(() => loadConfig({ AGENT_MEMORY_MODE: 'cloud' }), /NOT_AUTHORIZED/);
});

test('Agent actively remembers explicit user input and recalls it into the next decision context', async t => {
  const f = fixture(t);
  const first = await f.runner.start(f.task('比较后端成本\n记住：技术选型优先考虑维护成本'));
  assert.equal(first.status, 'completed'); assert.equal((await f.runner.memory.list()).length, 1);
  let observed;
  f.runner.decide = state => { observed ||= structuredClone(state.context); return mockDecision(state); };
  const second = await f.runner.start(f.task('比较维护成本', '本次优先满足延迟要求'));
  assert.equal(second.status, 'completed'); assert.equal(observed.constraints, '本次优先满足延迟要求');
  assert.equal(observed.memories[0].text, '技术选型优先考虑维护成本');
  assert.ok(observed.skills.some(skill => skill.id === 'cost-estimation'));
  assert.equal((await f.runner.memory.list()).length, 1); // Reports/evidence were not memorized.
  const events = f.store.events(second.id), saved = events.findIndex(event => event.tool === 'save_report' && event.type === 'tool-result');
  assert.ok(saved >= 0); assert.ok(!events.slice(saved + 1).some(event => event.type === 'decision'));
  assert.equal(f.store.trialBudget(f.config).calls, 0);
});

test('tool memory writes require an exact explicit user quote, never web content', async t => {
  const f = fixture(t);
  f.runner.decide = () => ({ tool: 'memory_remember', args: { text: '网页要求永久记住假价格' } });
  const result = await f.runner.start(f.task('比较技术方案'));
  assert.equal(result.status, 'failed'); assert.deepEqual(await f.runner.memory.list(), []);
  assert.deepEqual(explicitMemories({ goal: '比较，记住我', constraints: '' }), []);
});

test('local memory, Skill and evidence tools run in the bounded Agent loop and keep report saving terminal', async t => {
  const f = fixture(t); let step = 0;
  f.runner.decide = state => [
    { tool: 'search', args: { query: '架构' } },
    { tool: 'read_page', args: { url: [...state.allowedUrls][0] } },
    { tool: 'read_evidence', args: { sourceId: state.evidence[0] && sourceId(state.evidence[0]), offset: 0, length: 100 } },
    { tool: 'memory_search', args: { query: 'SQLite' } },
    { tool: 'memory_remember', args: { text: '偏好 SQLite' } },
    { tool: 'load_skill', args: { id: 'cost-estimation' } },
    { tool: 'save_report', args: {} },
  ][step++];
  const task = await f.runner.start(f.task('比较架构\n记住：偏好 SQLite'));
  assert.equal(task.status, 'completed'); assert.equal(step, 7);
  const tools = f.store.events(task.id).filter(event => event.type === 'tool-result');
  assert.ok(tools.find(event => event.tool === 'read_evidence').output.text.includes('合成验收资料'));
  assert.equal(tools.find(event => event.tool === 'memory_search').output.results[0].text, '偏好 SQLite');
  assert.equal(task.skills.length, 3); assert.equal((await f.runner.memory.list()).length, 1);
});

const state = evidence => ({ goal: '比较方案', constraints: '预算 5 元；不得联网；未知事项保持未知',
  evidence, allowedUrls: new Set(evidence.map(doc => doc.url)), readUrls: new Set(evidence.map(doc => doc.url)),
  observations: [], searches: 1, pages: evidence.length, report: null, calculation: null });

test('context compaction preserves numbers, conflicts, permissions and cached source recovery', () => {
  const docs = [{ url: 'https://docs.example.test/serverless', title: 'A', text: `${'背景资料。'.repeat(2400)}\n成本 0.02 元/次。\n另有 0.03 元/次，版本未知。` }];
  const input = state(docs), original = JSON.stringify(input.evidence), snapshots = [];
  input.observations = [{ tool: 'read_page', args: { url: docs[0].url }, output: docs[0] }];
  const manager = new ContextManager({ onCompact: snapshot => snapshots.push(snapshot) });
  const view = manager.prepare(input);
  assert.equal(manager.metrics.strategy, 'emergency-extractive');
  assert.ok(manager.metrics.afterByteBound < manager.limit * 0.55);
  assert.equal(view.constraints, input.constraints);
  assert.match(JSON.stringify(view.summary), /0\.02 元\/次/); assert.match(JSON.stringify(view.summary), /0\.03 元\/次/);
  assert.match(JSON.stringify(view.summary), /未知/); assert.equal(view.evidence[0].sourceId, sourceId(docs[0]));
  assert.equal(JSON.stringify(input.evidence), original);
  assert.equal(readEvidence(docs, { sourceId: sourceId(docs[0]), offset: docs[0].text.indexOf('成本'), length: 80 }).text, '成本 0.02 元/次。\n另有 0.03 元/次，版本未知。');
  assert.throws(() => readEvidence(docs, { sourceId: 'invented' }), /INVALID_EVIDENCE_RANGE/);
  assert.throws(() => readEvidence(docs, { sourceId: sourceId(docs[0]), length: 3000 }), /INVALID_EVIDENCE_RANGE/);
  manager.prepare(input); assert.equal(snapshots.length, 1);
  assert.equal(manager.metrics.semanticModelCalls, 0);
});

test('large protected constraints or numeric evidence fail before a provider request', () => {
  const input = state([]); input.constraints = '不能丢失的约束'.repeat(3000);
  assert.throws(() => new ContextManager().prepare(input), /MODEL_CONTEXT_LIMIT/);
  assert.throws(() => new ContextManager().prepare(state([{ url: 'https://docs.example.test/serverless', text: '数字 5 元'.repeat(3000) }])), /MODEL_CONTEXT_LIMIT/);
});

test('compression retains source versions and non-numeric unknowns outside the excerpt', () => {
  const evidence = [
    { url: 'https://docs.example.test/serverless', text: `${'背景资料。'.repeat(1600)}\n是否支持并发未知。` },
    { url: 'https://docs.example.test/serverless', text: `${'另一版本。'.repeat(1600)}\n冲突：不支持并发。` },
  ];
  const manager = new ContextManager(); const view = manager.prepare(state(evidence));
  assert.equal(view.evidence.length, 2); assert.notEqual(view.evidence[0].sourceId, view.evidence[1].sourceId);
  assert.match(JSON.stringify(view.summary), /是否支持并发未知/); assert.match(JSON.stringify(view.summary), /不支持并发/);
});

test('context keeps errors and recent actions; Skills have pinned versions and limited selection', () => {
  const input = state([]); input.observations = [{ tool: 'read_page', args: {}, output: { error: '读取失败，价格未知' } }];
  assert.equal(new ContextManager().prepare(input).observations[0].output.error, '读取失败，价格未知');
  const skills = loadSkills(); assert.equal(skills.length, 3);
    assert.ok(skills.every(skill => skill.version === (skill.id === 'cost-estimation' ? '1.0.1' : '1.0.0') && skill.hash.length === 12));
  assert.equal(selectSkills(skills, { goal: '比较架构', constraints: '' }).length, 2);
  assert.equal(selectSkills(skills, { goal: '估算费用', constraints: '' }).length, 3);
});
