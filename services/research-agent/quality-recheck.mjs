import { mkdirSync, writeFileSync, appendFileSync } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { QUALITY_CASES } from './quality-cases.mjs';
import { generationBody, judgeBody, createQualityCaller, evaluateAnswer, auditLedger } from './quality-evaluation.mjs';
import { parseForcedReportArgs } from './quality-runner.mjs';
import { finalizeReport } from './report-validation.mjs';
import { exportLedger } from './ledger-transfer.mjs';

export const RECHECK_BATCH = 'quality-recheck-v1-20261023';
const CASE_IDS = ['M02', 'U01', 'U04', 'H01', 'N01'];
const units = budget => Math.round(budget.reservedYuan * 10_000);
const hash = text => createHash('sha256').update(text).digest('hex');
const failure = error => /^[A-Z][A-Z0-9_]{0,80}$/.test(error.message) ? error.message : 'QUALITY_RECHECK_FAILED';

// Must hold the production Store lock. This is an isolated report-stage check:
// cached read sources + real Qwen, never Tavily, memory calls, or cloud uploads.
export async function runQualityRecheck(store, baseConfig, { rows, outputDir, fetchImplementation, caseIds = CASE_IDS,
  baselineBudgetUnits, controlReport, batch = RECHECK_BATCH } = {}) {
  if (baseConfig.allowEvaluationCalls !== true || !Array.isArray(rows)
    || CASE_IDS.some(id => rows.filter(row => row.caseId === id).length !== 1)
    || !/^[a-z0-9-]{1,80}$/.test(batch)
    || !caseIds.length || new Set(caseIds).size !== caseIds.length || caseIds.some(id => !CASE_IDS.includes(id))) throw Error('RECHECK_NOT_AUTHORIZED');
  const before = store.trialBudget(baseConfig);
  const baseline = baselineBudgetUnits ?? units(before);
  if (!Number.isSafeInteger(baseline) || baseline < 0 || baseline > units(before)) throw Error('RECHECK_BASELINE_INVALID');
  const config = { ...baseConfig, trialBudgetUnits: Math.min(50_000, baseline + 5000),
    toolsMode: 'mock', allowWebTools: false, memoryMode: 'offline', allowMemoryCalls: false,
    traceMode: 'offline', allowCloudTraces: false };
  const generation = { ...config.qwen, maxOutputTokens: 1200, maxInputTokenBound: 24_000 };
  const judging = { ...config.qwen, maxOutputTokens: 1600, maxInputTokenBound: 24_000 };
  const maximum = settings => Math.ceil((settings.maxInputTokenBound * settings.inputYuanPerMillion
    + (settings.maxOutputTokens + settings.outputTokenSlack) * settings.outputYuanPerMillion) / 100);
  const plannedUpperUnits = caseIds.length * maximum(generation) + (caseIds.length + 1) * maximum(judging);
  const remaining = Math.min(5000 - (units(before) - baseline), config.trialBudgetUnits - units(before),
    config.validationBudgetUnits - units(before.validation));
  if (plannedUpperUnits > remaining) throw Error('RECHECK_BUDGET_PREFLIGHT');
  mkdirSync(outputDir, { recursive: true, mode: 0o700 });
  const save = (name, value) => writeFileSync(join(outputDir, name), JSON.stringify(value, null, 2), { mode: 0o600 });
  writeFileSync(join(outputDir, 'started.json'), JSON.stringify({ batch, before, plannedUpperUnits }), { flag: 'wx', mode: 0o600 });
  const call = createQualityCaller(store, config, 5000, batch, { fetchImplementation });
  const invoke = async (settings, body, taskId, label) => {
    const payload = await call(settings, body, taskId, label);
    appendFileSync(join(outputDir, 'responses.jsonl'), JSON.stringify({ taskId, label, payload }) + '\n', { mode: 0o600 });
    return payload;
  };
  const review = async (sample, report, taskId, label) => {
    const payload = await invoke(judging, judgeBody(judging, sample, report), taskId, label);
    if (payload.choices?.[0]?.finish_reason !== 'stop') throw Error('JUDGE_TRUNCATED');
    let rawJudge;
    try { rawJudge = JSON.parse(payload.choices[0].message.content); } catch { throw Error('JUDGE_JSON_INVALID'); }
    return { ...evaluateAnswer(sample, report, rawJudge), rawJudge, taskId, report, reportHash: hash(report), sources: sample.sources, question: sample.question };
  };
  const results = [], controls = [];
  for (const id of caseIds) {
    const old = rows.find(row => row.caseId === id), fixture = QUALITY_CASES.find(sample => sample.id === id);
    const sample = { ...fixture, id, name: old.name, category: fixture?.category || 'cached-network', question: old.question,
      sources: old.sources.filter(source => source.read).map(({ id, url, content }) => ({ id, url, content, read: true })),
      gold: fixture?.gold || '计价单位不能证明取整或批次省费；建议须遵守证据边界；引用完整已读URL。' };
    const task = store.createTask({ goal: sample.question, constraints: 'Five-case real Qwen recheck using cached read evidence; no new web task.',
      scenario: 'standard', budgetUnits: 900, evaluationVersion: batch, caseId: id }, config);
    task.status = 'running'; store.saveTask(task);
    let rawReport;
    try {
      const payload = await invoke(generation, generationBody(generation, sample), task.id, id + '-answer');
      const reportArgs = parseForcedReportArgs(payload); rawReport = reportArgs.markdown;
      let finalized, blockedReason;
      try { finalized = finalizeReport(rawReport, sample.sources, { recommendations: reportArgs.recommendations, requireRecommendations: true }); } catch (error) { blockedReason = failure(error); }
      const report = finalized?.markdown || rawReport;
      const result = { ...await review({ ...sample, recommendations: finalized?.validation.recommendations || [] }, report, task.id, id + '-judge'), rawReport, reportArgs,
        reportSaved: !!finalized, validation: finalized?.validation, blockedReason, originalReportHash: hash(old.report) };
      if (blockedReason) { result.pass = false; result.reasons.push(blockedReason); result.scores.critical_failure = 1; }
      if (id === 'H01') {
        try { finalizeReport(old.report, sample.sources); result.originalBadAdviceBlocked = false; }
        catch (error) { result.originalBadAdviceBlocked = error.message === 'REPORT_UNSUPPORTED_ADVICE'; }
        if (!result.originalBadAdviceBlocked) { result.pass = false; result.reasons.push('GUARD_REGRESSION'); result.scores.critical_failure = 1; }
      }
      results.push(result); task.report = finalized?.markdown || ''; task.status = result.pass ? 'completed' : 'evaluation-failed';
    } catch (error) {
      results.push({ caseId: id, name: sample.name, taskId: task.id, pass: false, reasons: [failure(error)], scores: null, rawReport });
      task.status = 'evaluation-failed';
    } finally { store.saveTask(task); save('results.json', results); }
  }
  // An additional judge-only control checks the former contradictory assessment.
  // Its expected answer is failure, not an artificially repaired historical pass.
  const old = rows.find(row => row.caseId === 'H01');
  const control = { id: 'H01-control', name: '历史无依据建议评分一致性对照', category: 'negative-control', question: old.question,
    sources: old.sources, gold: '核对建议是否依赖未经证实的取整规则。来源仅给计价单位；总评与逐条证据判断必须一致。' };
  const task = store.createTask({ goal: control.question, constraints: 'Judge-only negative control; original answer is not modified.',
    scenario: 'standard', budgetUnits: 500, evaluationVersion: batch, caseId: control.id }, config);
  try {
    const scored = await review(control, controlReport || old.report, task.id, control.id + '-judge');
    scored.controlPassed = !scored.pass && scored.scores.uncertainty_quality === 0 && scored.evaluatorValid
      && scored.reasons.includes('CLAIM_NOT_SUPPORTED');
    controls.push(scored); task.status = scored.controlPassed ? 'completed' : 'evaluation-failed';
  } catch (error) { controls.push({ caseId: control.id, taskId: task.id, pass: false, controlPassed: false, reasons: [failure(error)], scores: null }); task.status = 'evaluation-failed'; }
  finally { store.saveTask(task); save('controls.json', controls); }
  const after = store.trialBudget(baseConfig), delta = units(after) - units(before), audit = auditLedger(store.db);
  const totalBatchReservedYuan = (units(after) - baseline) / 10_000;
  const receipt = { batch, before, after, baselineBudgetYuan: baseline / 10_000, totalBatchReservedYuan, plannedUpperUnits, newReservedYuan: delta / 10_000,
    withinBudget: totalBatchReservedYuan <= 0.5 && units(after) <= 50_000, total: results.length, passed: results.filter(row => row.pass).length,
    controlsPassed: controls.filter(row => row.controlPassed).length, audit, model: config.qwen.model,
    newModelCalls: after.calls - before.calls, newWebCalls: 0, newMemoryCalls: 0, cloudUploads: 0, deployments: 0 };
  save('receipt.json', receipt); save('ledger.json', exportLedger(store.db));
  return receipt;
}
