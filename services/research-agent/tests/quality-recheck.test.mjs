import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { Store } from '../store.mjs';
import { loadConfig } from '../config.mjs';
import { QUALITY_CASES } from '../quality-cases.mjs';
import { runQualityRecheck } from '../quality-recheck.mjs';
globalThis.fetch = () => { throw Error('EXTERNAL_NETWORK_FORBIDDEN'); };

const makeRows = () => ['M02', 'U01', 'U04', 'H01', 'N01'].map(caseId => {
  const fixture = QUALITY_CASES.find(sample => sample.id === caseId) || QUALITY_CASES[0];
  return { ...fixture, caseId, report: caseId === 'H01' ? 'Extract 尽量成批提交；不足5个取整未知。' : 'Old answer' };
});
test('five-case recheck uses eleven intercepted calls, preserves unknown fees and refuses a duplicate batch', async () => {
  const dir = mkdtempSync(join(tmpdir(), 'quality-recheck-')), store = new Store(dir);
  const config = { ...loadConfig({ AGENT_MODE: 'qwen', DASHSCOPE_API_KEY: 'offline-fixture', QWEN_PRICING_CONFIRMED: 'true',
    AGENT_VALIDATION_BUDGET_YUAN: '1.5' }, { allowModelCalls: true }), allowEvaluationCalls: true };
  try {
    const old = store.createTask({ goal: 'historical', constraints: '', scenario: 'standard', budgetUnits: 500 }, config);
    store.reserveModelCall(old.id, 20, config, { model: 'fixture', purpose: 'old-unknown' });
    old.status = 'completed'; store.saveTask(old);
    const original = store.db.prepare('SELECT * FROM model_calls').all(); let calls = 0;
    const fetchImplementation = async (url, init) => {
      calls++; const body = JSON.parse(init.body), input = JSON.parse(body.messages[1].content);
      let message;
      if (body.tools) {
        const link = input.evidence[0].url;
        message = { tool_calls: [{ type: 'function', function: { name: 'save_report', arguments: JSON.stringify({ markdown: `场景估算：2.4美元、19.2元或0.107元；实际扣费未知。\n${link}`, recommendations: [] }) } }] };
      } else {
        const negative = input.report.includes('尽量成批');
        message = { content: JSON.stringify({ claims: [{ text: negative ? '建议成批提交' : '条件计算与未知', kind: 'calculation',
          status: negative ? 'insufficient' : 'supported', sourceId: '', quote: '' }], costOK: true, uncertainty: negative ? 0 : 2, reason: negative ? '建议缺乏结算依据' : '条件与未知清楚' }) };
      }
      return new Response(JSON.stringify({ usage: { prompt_tokens: 100, completion_tokens: 20 }, choices: [{ finish_reason: 'stop', message }] }));
    };
    const rows = makeRows(), untouched = structuredClone(rows), outputDir = join(dir, 'batch');
    const receipt = await runQualityRecheck(store, config, { rows, outputDir, fetchImplementation });
    assert.equal(calls, 11); assert.equal(receipt.passed, 5); assert.equal(receipt.controlsPassed, 1);
    assert.equal(receipt.withinBudget, true); assert.equal(receipt.newWebCalls, 0);
    assert.deepEqual(rows, untouched); assert.equal(store.trialBudget(config).uncertainCalls, 1);
    assert.deepEqual(store.db.prepare('SELECT * FROM model_calls WHERE id=?').get(original[0].id), original[0]);
    await assert.rejects(runQualityRecheck(store, config, { rows, outputDir, fetchImplementation }), /EEXIST/);
    assert.equal(calls, 11);
    const resumed = await runQualityRecheck(store, config, { rows, caseIds: ['U01', 'H01'], baselineBudgetUnits: 20,
      outputDir: join(dir, 'targeted'), fetchImplementation });
    assert.equal(calls, 16); assert.equal(resumed.total, 2); assert.equal(resumed.passed, 2);
    assert.equal(Math.round(resumed.totalBatchReservedYuan * 10_000),
      Math.round((receipt.newReservedYuan + resumed.newReservedYuan) * 10_000));
    assert.equal(resumed.baselineBudgetYuan, 0.002); assert.equal(store.trialBudget(config).uncertainCalls, 1);
  } finally { store.close(); rmSync(dir, { recursive: true, force: true }); }
});

test('the full worst-case allowance is checked before any real transport can run', async () => {
  const dir = mkdtempSync(join(tmpdir(), 'quality-cap-')), store = new Store(dir);
  const config = { ...loadConfig({}), mode: 'qwen', allowEvaluationCalls: true, validationBudgetUnits: 1 };
  try {
    await assert.rejects(runQualityRecheck(store, config, { rows: makeRows(), outputDir: join(dir, 'batch'),
      fetchImplementation: () => { throw Error('MUST_NOT_TRANSPORT'); } }), /RECHECK_BUDGET_PREFLIGHT/);
    assert.equal(store.trialBudget(config).calls, 0);
  } finally { store.close(); rmSync(dir, { recursive: true, force: true }); }
});
