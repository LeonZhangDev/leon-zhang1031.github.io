import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { QUALITY_CASES } from './quality-cases.mjs';
import { evaluateAnswer } from './quality-evaluation.mjs';
import { finalizeReport } from './report-validation.mjs';

// Replay saved output, not the paid runner. No credentials, Store, model, web
// transport or LangSmith client is created. Original answers/judges stay intact.
export function replayQualitySamples(rows, { expectedBlocked = ['H01'] } = {}) {
  if (!Array.isArray(rows) || !rows.length || new Set(rows.map(row => row.caseId)).size !== rows.length) throw Error('REPLAY_INPUT_INVALID');
  if (expectedBlocked.some(id => !rows.some(row => row.caseId === id))) throw Error('REPLAY_EXPECTATION_MISSING');
  const results = rows.map(row => {
    if (!row.rawJudge) throw Error('REPLAY_JUDGE_REQUIRED');
    const fixture = QUALITY_CASES.find(sample => sample.id === row.caseId);
    const sample = fixture ? { ...fixture, sources: row.sources || fixture.sources, fixture: true }
      : { id: row.caseId, name: row.name, category: row.category, sources: row.sources, targets: [] };
    const originalScore = evaluateAnswer(sample, row.report, row.rawJudge);
    const base = { caseId: row.caseId, name: row.name, originalPass: row.pass, originalReasons: row.reasons,
      originalReportHash: createHash('sha256').update(row.report).digest('hex'), originalScore, cachedJudgeReused: true };
    try {
      const finalized = finalizeReport(row.report, sample.sources);
      const after = evaluateAnswer(sample, finalized.markdown, row.rawJudge);
      return { ...base, disposition: finalized.validation.corrections.length ? 'citation-repaired' : 'unchanged',
        report: finalized.markdown, validation: finalized.validation, after,
        regressionPass: !expectedBlocked.includes(row.caseId) && after.pass };
    } catch (error) {
      if (!['REPORT_UNSUPPORTED_ADVICE', 'INVALID_SOURCE', 'INVALID_REPORT'].includes(error.message)) throw error;
      return { ...base, disposition: 'blocked', blockedReason: error.message,
        regressionPass: expectedBlocked.includes(row.caseId) && error.message === 'REPORT_UNSUPPORTED_ADVICE'
          && originalScore.scores.critical_failure === 1 && originalScore.pass === false };
    }
  });
  return { mode: 'offline-cached-output-replay', newCalls: 0, newReservedYuan: 0, humanCalibrated: false,
    scope: 'Citation repair and deterministic guards; cached judges are not new semantic evaluations.',
    summary: { total: results.length, regressionPassed: results.filter(row => row.regressionPass).length,
      corrected: results.filter(row => row.disposition === 'citation-repaired').length,
      blocked: results.filter(row => row.disposition === 'blocked').length,
      acceptedAnswerPasses: results.filter(row => row.after?.pass).length }, results };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  globalThis.fetch = () => { throw Error('EXTERNAL_NETWORK_FORBIDDEN'); };
  const [input, output] = process.argv.slice(2);
  if (!input || !output || resolve(input) === resolve(output) || existsSync(output)) throw Error('REPLAY_REQUIRES_NEW_OUTPUT');
  const result = replayQualitySamples(JSON.parse(readFileSync(input, 'utf8')));
  mkdirSync(dirname(resolve(output)), { recursive: true });
  writeFileSync(output, JSON.stringify(result, null, 2), { flag: 'wx' });
  console.log(JSON.stringify(result.summary));
  if (result.summary.regressionPassed !== result.summary.total) process.exitCode = 1;
}
