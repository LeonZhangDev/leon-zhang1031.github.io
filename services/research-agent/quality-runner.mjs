import { mkdirSync,writeFileSync,appendFileSync,readFileSync } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { QUALITY_CASES,QUALITY_VERSION } from './quality-cases.mjs';
import { generationBody,judgeBody,createQualityCaller,evaluateAnswer,auditLedger } from './quality-evaluation.mjs';
import { AgentRunner } from './agent.mjs';
import { exportLedger } from './ledger-transfer.mjs';
const units = budget => Math.round(budget.reservedYuan*10000);
const hash = text => createHash('sha256').update(text).digest('hex');
const failure = error => /^[A-Z][A-Z0-9_]{0,80}$/.test(error.message) ? error.message : 'QUALITY_OPERATION_FAILED';
export function parseForcedReportArgs(payload) {
  const choice=payload.choices?.[0],tools=choice?.message?.tool_calls;
  // Bailian forced function choice returns stop with valid tool_calls; auto choice uses tool_calls.
  if(!['stop','tool_calls'].includes(choice?.finish_reason)||tools?.length!==1||tools[0].function?.name!=='save_report')throw Error('ANSWER_INVALID');
  let args;try{args=JSON.parse(tools[0].function.arguments);}catch{throw Error('ANSWER_JSON_INVALID');}
  const markdown=args?.markdown;
  if(typeof markdown!=='string'||!markdown.trim())throw Error('ANSWER_INVALID');
  return args;
}
export const parseForcedReport = payload => parseForcedReportArgs(payload).markdown;

// Call only under the existing service's exclusive data-directory lock.
// This runner does not start a server, change deployment/configuration or upload feedback.
export async function runQualityEvaluation(store, baseConfig, { outputDir, historical, allowNetwork = false } = {}) {
  if(baseConfig.allowEvaluationCalls!==true)throw Error('QUALITY_NOT_AUTHORIZED');
  mkdirSync(outputDir,{recursive:true,mode:0o700});
  const save=(name,value)=>writeFileSync(join(outputDir,name),typeof value==='string'?value:JSON.stringify(value,null,2),{mode:0o600});
  const before=store.trialBudget(baseConfig), ceiling=Math.min(50000,units(before)+5000);
  writeFileSync(join(outputDir,'started.json'),JSON.stringify({version:QUALITY_VERSION,before,ceiling}),{flag:'wx',mode:0o600});
  const config={...baseConfig,trialBudgetUnits:ceiling,toolsMode:'mock',allowWebTools:false,traceMode:'offline',allowCloudTraces:false,memoryMode:'offline',allowMemoryCalls:false};
  const call=createQualityCaller(store,config,2000);
  const genSettings={...config.qwen,maxOutputTokens:700,maxInputTokenBound:7000};
  const judgeSettings={...config.qwen,maxOutputTokens:900,maxInputTokenBound:22000};
  const results=[];
  const record=item=>{results.push(item);save('results.json',results);console.log(JSON.stringify({caseId:item.caseId,pass:item.pass,reasons:item.reasons,taskId:item.taskId}));};
  const invoke=async(settings,body,taskId,label)=>{
    const payload=await call(settings,body,taskId,label);
    appendFileSync(join(outputDir,'responses.jsonl'),JSON.stringify({taskId,label,payload})+'\n',{mode:0o600});
    return payload;
  };
  const review=async(sample,report,taskId)=>{
    const payload=await invoke(judgeSettings,judgeBody(judgeSettings,sample,report),taskId,sample.id+'-judge');
    if(payload.choices?.[0]?.finish_reason!=='stop')throw Error('JUDGE_TRUNCATED');
    let verdict;try{verdict=JSON.parse(payload.choices[0].message.content);}catch{throw Error('JUDGE_JSON_INVALID');}
    const evaluated=evaluateAnswer(sample,report,verdict);
    return {...evaluated,taskId,report,reportHash:hash(report),sources:sample.sources,question:sample.question};
  };
  for(const sample of QUALITY_CASES) {
    const task=store.createTask({goal:sample.question,constraints:'Fixed-evidence quality evaluation; not a new web research task.',scenario:'standard',budgetUnits:400,evaluationVersion:QUALITY_VERSION,caseId:sample.id},config);
    task.status='running';store.saveTask(task);
    try{
      const payload=await invoke(genSettings,generationBody(genSettings,sample),task.id,sample.id+'-answer');
      const markdown=parseForcedReport(payload);
      task.report=markdown;task.status='completed';
      record(await review({...sample,fixture:true},markdown,task.id));
    }catch(error){task.status='evaluation-failed';record({caseId:sample.id,name:sample.name,category:sample.category,taskId:task.id,pass:false,reasons:[failure(error)],report:task.report,scores:null});}
    finally{store.saveTask(task);}
  }
  const makeReviewTask=sample=>store.createTask({goal:sample.question,constraints:'Read-only evaluation of an existing report.',scenario:'standard',budgetUnits:700,evaluationVersion:QUALITY_VERSION,caseId:sample.id},config);
  if(historical?.task?.report) {
    const sample={id:'H01',name:'历史完整联网报告',category:'historical',question:historical.task.goal,
      sources:historical.evidence.map((e,i)=>({...e,id:'historical-'+i,read:true})),gold:'检查每5个计费是否支持批量省费建议；正文声明取整未知并不能抵消前文建议。'};
    const task=makeReviewTask(sample);
    try{record({...await review(sample,historical.task.report,task.id),targetRunId:historical.task.id});task.status='completed';}
    catch(e){record({caseId:sample.id,name:sample.name,taskId:task.id,targetRunId:historical.task.id,pass:false,reasons:[failure(e)],scores:null});task.status='evaluation-failed';}
    finally{store.saveTask(task);}
  }
  if(allowNetwork) {
    writeFileSync(join(outputDir,'network-started.json'),JSON.stringify({at:new Date().toISOString()}),{flag:'wx',mode:0o600});
    const liveConfig={...baseConfig,trialBudgetUnits:ceiling,stepDelayMs:0,memoryMode:'offline',allowMemoryCalls:false};
    if(liveConfig.toolsMode!=='tavily'||!liveConfig.allowWebTools)throw Error('WEB_TOOLS_NOT_AUTHORIZED');
    const task=store.createTask({goal:'依据Tavily官方文档，比较Search Basic和Extract Basic的用途与计费单位，并说明不足5个URL时实际扣费是否已确认。',
      constraints:'只搜索一次，只读取一个搜索结果中的官方计费文档页面，URL原样使用。正文足够回答后立即保存150字左右中文Markdown报告，不再搜索/读取。不要长期记忆或召回，不重复加载Skill。引用仅用成功读取来源。不要根据计价单位推断单请求取整或凑批能省钱，未明确证实的规则保持未知。',scenario:'standard',budgetUnits:3000,evaluationVersion:QUALITY_VERSION,caseId:'N01'},liveConfig);
    save('network-task.json',{taskId:task.id});
    const runner=new AgentRunner(store,liveConfig,{memory:{enabled:false,recall:async()=>[],close:async()=>{},remember:async()=>{throw Error('MEMORY_DISABLED');}}});
    const networkBefore=store.trialBudget(config);
    try{
      const result=await runner.start(task),events=store.events(task.id);
      const sources=events.filter(e=>e.type==='tool-result'&&e.tool==='read_page'&&!e.output?.error).map((e,i)=>({...e.output,id:'live-'+i,read:true}));
      const delta=units(store.trialBudget(config))-units(networkBefore);
      const network={taskId:task.id,status:result.status,traceStatus:result.traceStatus,stats:result.stats,newReservedYuan:delta/10000,
        decisions:events.filter(e=>e.type==='decision').map(e=>e.tool),saveCount:events.filter(e=>e.type==='tool-result'&&e.tool==='save_report').length,
        sources,report:result.report,stopReasons:events.filter(e=>e.type==='stopped').map(e=>e.reason)};
      save('network-result.json',network);save('network-report.md',result.report || '');
      const sample={id:'N01',name:'一次完整联网验证',category:'network',question:task.goal,sources,gold:'必须真正搜索、读取、保存一次并结束；未知取整不能变成确定建议。'};
      // The judge is charged to a separate evaluation task, within the same 0.20 allowance.
      const reviewTask=makeReviewTask(sample);
      try{
        const scored=await review(sample,result.report,reviewTask.id);
        if(result.status!=='completed'||network.saveCount!==1||result.stats.searches!==1||result.stats.pages!==1||delta>3000){scored.pass=false;scored.reasons.push('NETWORK_FLOW_INCOMPLETE');scored.scores.critical_failure=1;}
        record({...scored,targetRunId:task.id,network});reviewTask.status='completed';
      }catch(e){record({caseId:'N01',name:sample.name,taskId:reviewTask.id,targetRunId:task.id,pass:false,reasons:[failure(e)],scores:null,network});reviewTask.status='evaluation-failed';}
      finally{store.saveTask(reviewTask);}
    } finally{await runner.close();}
  }
  const after=store.trialBudget(baseConfig),delta=units(after)-units(before),audit=auditLedger(store.db);
  save('ledger.json',exportLedger(store.db));
  const receipt={version:QUALITY_VERSION,before,after,newReservedYuan:delta/10000,withinBudget:delta<=5000&&units(after)<=50000,
    cases:results.length,passed:results.filter(r=>r.pass).length,failed:results.filter(r=>!r.pass).map(r=>r.caseId),audit,
    model:config.qwen.model,networkAttempts:allowNetwork?1:0,humanCalibrated:false,deployments:0};
  save('receipt.json',receipt);console.log(JSON.stringify({finished:true,...receipt}));return receipt;
}

// Resume *scoring only* from durable valid answers, preserving the first harness failure.
// Never repeat answer generation, historical judges or the single network attempt.
export async function scoreCachedQualityAnswers(store,baseConfig,{originalOutputDir,outputDir}) {
  mkdirSync(outputDir,{recursive:true,mode:0o700});
  writeFileSync(join(outputDir,'started.json'),JSON.stringify({version:QUALITY_VERSION}),{flag:'wx',mode:0o600});
  const originalReceipt=JSON.parse(readFileSync(join(originalOutputDir,'receipt.json'),'utf8'));
  const originalResults=JSON.parse(readFileSync(join(originalOutputDir,'results.json'),'utf8'));
  const responses=readFileSync(join(originalOutputDir,'responses.jsonl'),'utf8').trim().split('\n').map(JSON.parse);
  const config={...baseConfig,trialBudgetUnits:Math.min(50000,units(originalReceipt.before)+5000),toolsMode:'mock',allowWebTools:false,traceMode:'offline',allowCloudTraces:false,memoryMode:'offline',allowMemoryCalls:false};
  const call=createQualityCaller(store,config,2000),settings={...config.qwen,maxOutputTokens:900,maxInputTokenBound:22000};
  const results=[];
  for(const sample of QUALITY_CASES) {
    const existing=originalResults.find(r=>r.caseId===sample.id),answer=responses.find(r=>r.label===sample.id+'-answer');
    if(existing?.scores){results.push(existing);continue;}
    if(existing?.reasons?.[0]!=='ANSWER_INVALID'||!answer)throw Error('SCORING_RESUME_NOT_APPLICABLE');
    const report=parseForcedReport(answer.payload);
    const task=store.createTask({goal:sample.question,constraints:'Score existing paid answer; no generation or web retry.',scenario:'standard',budgetUnits:500,evaluationVersion:QUALITY_VERSION,caseId:sample.id},config);
    try{
      const payload=await call(settings,judgeBody(settings,sample,report),task.id,sample.id+'-cached-judge');
      appendFileSync(join(outputDir,'responses.jsonl'),JSON.stringify({taskId:task.id,label:sample.id+'-cached-judge',payload})+'\n',{mode:0o600});
      if(payload.choices?.[0]?.finish_reason!=='stop')throw Error('JUDGE_TRUNCATED');
      let verdict;try{verdict=JSON.parse(payload.choices[0].message.content);}catch{throw Error('JUDGE_JSON_INVALID');}
      const result={...evaluateAnswer({...sample,fixture:true},report,verdict),taskId:task.id,answerTaskId:answer.taskId,report,reportHash:hash(report),question:sample.question,sources:sample.sources,harnessCorrection:'forced-choice-stop-with-tool-calls'};
      results.push(result);task.report=report;task.status='completed';
      console.log(JSON.stringify({caseId:sample.id,pass:result.pass,reasons:result.reasons}));
    }catch(e){results.push({caseId:sample.id,name:sample.name,category:sample.category,taskId:task.id,answerTaskId:answer.taskId,report,pass:false,reasons:[failure(e)],scores:null});task.status='evaluation-failed';}
    finally{store.saveTask(task);writeFileSync(join(outputDir,'results.json'),JSON.stringify(results,null,2),{mode:0o600});}
  }
  results.push(...originalResults.filter(r=>!QUALITY_CASES.some(s=>s.id===r.caseId)));
  writeFileSync(join(outputDir,'results.json'),JSON.stringify(results,null,2),{mode:0o600});
  const after=store.trialBudget(baseConfig),delta=units(after)-units(originalReceipt.before);
  const receipt={...originalReceipt,after,newReservedYuan:delta/10000,withinBudget:delta<=5000&&units(after)<=50000,passed:results.filter(r=>r.pass).length,failed:results.filter(r=>!r.pass).map(r=>r.caseId),audit:auditLedger(store.db),harnessCorrection:'Reused all 12 original answers; no generation or network repeated.'};
  writeFileSync(join(outputDir,'receipt.json'),JSON.stringify(receipt,null,2),{mode:0o600});
  writeFileSync(join(outputDir,'ledger.json'),JSON.stringify(exportLedger(store.db)),{mode:0o600});
  console.log(JSON.stringify({scoringFinished:true,...receipt}));return receipt;
}
