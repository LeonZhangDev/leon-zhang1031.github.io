import { createHash } from 'node:crypto';
import { QUALITY_VERSION } from './quality-cases.mjs';
export const QUALITY_SCORE_KEYS=['citation_validity','claim_support','cost_accuracy','ledger_consistency','uncertainty_quality','critical_failure','evaluator_valid'];
export function stableFeedbackId(runId,key,batch=QUALITY_VERSION) {
  const bytes=createHash('sha256').update(`${batch}:${runId}:${key}`).digest().subarray(0,16);
  bytes[6]=(bytes[6]&15)|80;bytes[8]=(bytes[8]&63)|128;
  const h=bytes.toString('hex');return `${h.slice(0,8)}-${h.slice(8,12)}-${h.slice(12,16)}-${h.slice(16,20)}-${h.slice(20)}`;
}
// Explicit projection: report, question, source contents and judge quotations never enter cloud payloads.
export async function publishQualityResult(client,project,result,{ledgerScore,commit,batch=QUALITY_VERSION,onWrite=()=>{}}={}) {
  if(!/^[a-z0-9-]{1,80}$/.test(batch))throw Error('QUALITY_BATCH_INVALID');
  if(project.trace_tier!=='shortlived')throw Error('QUALITY_RETENTION_NOT_BASE');
  const runId=result.targetRunId || result.taskId;
  if(!result.targetRunId) {
    const now=Date.now(),stamp=new Date(now).toISOString().replace(/[-:.]/g,'').replace('Z','000Z');
    await client.createRun({id:runId,trace_id:runId,name:`quality.${result.caseId}`,run_type:'chain',session_name:project.name,
      start_time:now,end_time:now+1,dotted_order:stamp+runId,trace_tier:'shortlived',
      inputs:{case_id:result.caseId,category:result.category || 'quality'},outputs:{status:result.pass?'quality-pass':'quality-review'},
      tags:[batch,'quality-summary-only',result.category || 'quality'],
      extra:{metadata:{quality_version:batch,rubric_revision:result.rubricRevision,source_commit:commit,report_hash:result.reportHash,human_calibrated:false,quality_payload:'scores-only'}}});
    await onWrite({type:'run',id:runId,caseId:result.caseId});
  }
  const scores={...(result.scores || {critical_failure:1}),ledger_consistency:ledgerScore,evaluator_valid:Number(!!result.scores&&!result.judgeConflict&&result.evaluatorValid!==false)};
  const feedback=[];
  for(const key of QUALITY_SCORE_KEYS) {
    const score=scores[key];if(score===null||score===undefined)continue;
    if(!Number.isFinite(score)||score<0||score>1)throw Error('QUALITY_SCORE_INVALID');
    const payload={runId,sessionId:project.id,key,score,feedbackId:stableFeedbackId(runId,key,batch),extendTraceRetention:false,
      feedbackSourceType:'api',comment:`${batch}; ${result.caseId}; ${(result.reasons || []).join(',') || 'PASS'}; human-calibration-pending`,
      sourceInfo:{quality_version:batch,case_id:result.caseId,report_hash:result.reportHash,source_commit:commit}};
    const created=await client.createFeedback(payload);
    const item={id:created.id,key,score,runId,caseId:result.caseId};feedback.push(item);await onWrite({type:'feedback',...item});
  }
  return{runId,caseId:result.caseId,feedback};
}
