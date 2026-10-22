import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { loadConfig, SCENARIOS } from './config.mjs';
import { Store } from './store.mjs';
import { AgentRunner } from './agent.mjs';
import { redact } from './security.mjs';

const root = resolve(loadConfig({}).dataDir, '..');
mkdirSync(root, { recursive: true });
const output = mkdtempSync(join(root, 'research-agent-eval-'));
const cases = [
  ...SCENARIOS.map(scenario => ({ name: scenario, scenario, status: scenario === 'loop' ? 'limited' : scenario === 'invalid-response' ? 'failed' : 'completed' })),
  { name: 'task-budget', budgetUnits: 100, status: 'limited' },
  { name: 'step-limit', config: { maxSteps: 2 }, status: 'limited' },
  { name: 'search-limit', scenario: 'empty-search', config: { maxSearches: 1 }, status: 'limited' },
  { name: 'page-limit', config: { maxPages: 1 }, status: 'limited' },
  { name: 'real-deadline', config: { taskTimeoutMs: 25 }, providers: { decide: () => new Promise(() => {}) }, status: 'limited' },
  { name: 'cancel-hung-provider', cancel: true, providers: { decide: () => new Promise(() => {}) }, status: 'cancelled' },
  { name: 'unobserved-url', providers: { decide: () => ({ tool: 'read_page', args: { url: 'http://127.0.0.1/private' } }) }, status: 'failed' },
  { name: 'unknown-tool', providers: { decide: () => ({ tool: 'send_email', args: {} }) }, status: 'failed' },
  { name: 'provider-error', providers: { decide: () => { throw new Error('synthetic error'); } }, status: 'failed' },
  { name: 'redaction', goal: '检查部署边界 token=private-fixture', status: 'completed' },
  { name: 'constraints', constraints: '预算低；只读；报告列明未确认事项。', status: 'completed' },
];
const results = []; const originalFetch = globalThis.fetch;
let externalCalls = 0;
globalThis.fetch = () => { externalCalls++; throw new Error('External fetch forbidden during offline evaluation'); };
try {
  for (const item of cases) {
    const config = { ...loadConfig({}), stepDelayMs: 0, dataDir: join(output, item.name), ...item.config };
    const store = new Store(config.dataDir); const runner = new AgentRunner(store, config, item.providers);
    const task = store.createTask({ goal: redact(item.goal || '个人网站交互后端：函数与常驻服务如何选型？'), constraints: item.constraints || '低成本；只读公开资料；给出依据与未确认事项。', scenario: item.scenario || 'standard', budgetUnits: item.budgetUnits || 20_000 }, config);
    const checks = {};
    try {
      const pending = runner.start(task); if (item.cancel) setTimeout(() => runner.cancel(task.id), 5);
      const result = await pending; const runs = store.traces(task.id), events = store.events(task.id), wire = store.wires(task.id);
      const verify = (name, operation) => { try { operation(); checks[name] = true; } catch { checks[name] = false; } };
      verify('expected-stop', () => assert.equal(result.status, item.status));
      verify('budget-and-call-limits', () => { assert.ok(result.estimatedCostUnits <= result.budgetUnits); assert.ok(result.stats.searches <= config.maxSearches); assert.ok(result.stats.pages <= config.maxPages); });
      verify('honest-mock-report', () => { assert.match(result.report, /合成响应/); assert.match(result.report, /未确认事项/); assert.ok(!result.report.includes('private-fixture')); });
      verify('observed-citations', () => {
        const observed = events.filter(event => event.tool === 'read_page' && event.output && !event.output.error).map(event => event.output.url);
        for (const match of result.report.matchAll(/\]\((https:\/\/[^)]+)\)/g)) assert.ok(observed.includes(match[1]));
        if (!observed.length) assert.match(result.report, /不生成虚构引用/);
      });
      verify('readonly-tool-boundary', () => assert.ok(events.every(event => !event.tool || ['search', 'read_page', 'calculate', 'save_report', 'finish'].includes(event.tool))));
      verify('trace-durable-sdk-contract', () => {
        assert.ok(runs.length); assert.equal(runs[0].id, task.id);
        if (item.scenario === 'trace-failure') assert.equal(result.traceStatus, 'failed-local-retained');
        else { assert.equal(result.traceStatus, 'sdk-offline-verified'); assert.equal(wire.filter(request => request.path === '/runs').length, runs.length); }
        assert.ok(!JSON.stringify({ runs, wire }).includes('private-fixture'));
      });
      verify('zero-real-cost-and-egress', () => { assert.equal(result.actualCostYuan, 0); assert.equal(externalCalls, 0); });
      if (item.scenario === 'empty-search' || item.scenario === 'conflicting-sources' || item.scenario === 'page-error') verify('uncertainty', () => assert.match(result.report, /暂不作确定/));
      results.push({ name: item.name, passed: Object.values(checks).every(Boolean), checks, taskId: task.id, status: result.status, stats: result.stats, estimatedMockYuan: result.estimatedCostUnits / 10_000, actualCostYuan: 0 });
    } catch (error) { results.push({ name: item.name, passed: false, checks, error: error.message }); }
    finally { await runner.close(); store.close(); }
  }
} finally { globalThis.fetch = originalFetch; }
const passed = results.filter(result => result.passed).length;
const summary = { completed: true, mode: 'mock', traceTransport: 'offline', cloudVerified: false, externalCalls, actualCostYuan: 0, passed, total: results.length, results };
writeFileSync(join(output, 'results.json'), JSON.stringify(summary, null, 2) + '\n', 'utf8');
writeFileSync(join(output, 'results.md'), `# Local mock evaluation\n\n${passed}/${results.length} passed. Actual cost: 0. Cloud LangSmith/model quality not evaluated.\n\n| Case | Result |\n| --- | --- |\n${results.map(item => `| ${item.name} | ${item.passed ? 'PASS' : 'FAIL'} |`).join('\n')}\n\nInjection checks exercise tool boundaries and synthetic decisions only; they do not establish real-model prompt-injection resistance.\n`, 'utf8');
console.log(`EVALUATION COMPLETE: ${passed}/${results.length} PASS; external calls=${externalCalls}; actual cost=0; evidence=${output}`);
if (passed !== results.length) { console.error(JSON.stringify(results.filter(result => !result.passed), null, 2)); process.exitCode = 1; }
