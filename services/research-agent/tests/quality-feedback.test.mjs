import test from 'node:test';
import assert from 'node:assert/strict';
import { publishQualityResult,stableFeedbackId } from '../quality-feedback.mjs';
const project={id:'project',name:'fixture',trace_tier:'shortlived'};
test('quality cloud feedback excludes all plaintext and explicitly disables retention extension',async()=>{
  const writes=[],client={createRun:async p=>writes.push(p),createFeedback:async p=>{writes.push(p);return{id:p.feedbackId};}};
  const result={caseId:'C01',taskId:'efabbc92-c17f-42fb-8d08-54c6c327f184',pass:true,report:'PRIVATE REPORT',question:'PRIVATE QUESTION',sources:['PRIVATE SOURCE'],judgeReason:'PRIVATE REASON',scores:{citation_validity:1,claim_support:1,cost_accuracy:null,uncertainty_quality:1,critical_failure:0},reasons:[]};
  const receipt=await publishQualityResult(client,project,result,{ledgerScore:1,commit:'fixture'});
  assert.equal(receipt.feedback.length,6);assert.ok(!JSON.stringify(writes).includes('PRIVATE'));
  for(const w of writes.filter(w=>w.key))assert.equal(w.extendTraceRetention,false);
  assert.equal(writes[0].trace_tier,'shortlived');assert.equal(stableFeedbackId(result.taskId,'citation_validity'),receipt.feedback[0].id);
});
test('historical results attach to original run; non-base project blocks every cloud write',async()=>{
  let runs=0,feedback=0;const client={createRun:async()=>runs++,createFeedback:async p=>{feedback++;return{id:p.feedbackId};}};
  const result={caseId:'H01',taskId:'new',targetRunId:'old',scores:null,reasons:['JUDGE_INVALID']};
  await publishQualityResult(client,project,result,{ledgerScore:1});assert.equal(runs,0);assert.equal(feedback,3);
  await assert.rejects(publishQualityResult(client,{...project,trace_tier:'longlived'},result),/QUALITY_RETENTION_NOT_BASE/);
  assert.equal(feedback,3);
});
test('conflicting judgments retain failing feedback and cannot advertise a valid evaluator',async()=>{
  const writes=[],client={createFeedback:async p=>{writes.push(p);return{id:p.feedbackId};}};
  await publishQualityResult(client,project,{caseId:'H01',targetRunId:'old',judgeConflict:true,evaluatorValid:false,
    scores:{critical_failure:1,uncertainty_quality:0},reasons:['JUDGE_CONFLICT']},{ledgerScore:1});
  assert.equal(writes.find(p=>p.key==='evaluator_valid').score,0);
  assert.equal(writes.find(p=>p.key==='critical_failure').score,1);
  assert.equal(writes.find(p=>p.key==='uncertainty_quality').score,0);
});
test('recheck feedback uses a new batch tag and IDs without overwriting original scores',async()=>{
  const writes=[],client={createRun:async p=>writes.push(p),createFeedback:async p=>{writes.push(p);return{id:p.feedbackId};}};
  const result={caseId:'H01',taskId:'new-recheck-run',pass:true,scores:{critical_failure:0},reasons:[]};
  await publishQualityResult(client,project,result,{batch:'quality-recheck-v1-20261023',ledgerScore:1});
  assert.ok(writes[0].tags.includes('quality-recheck-v1-20261023'));
  const feedback=writes.find(p=>p.key==='critical_failure');
  assert.notEqual(feedback.feedbackId,stableFeedbackId(result.taskId,'critical_failure'));
});
