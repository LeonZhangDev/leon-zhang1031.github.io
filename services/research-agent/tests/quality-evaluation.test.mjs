import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { loadConfig } from '../config.mjs';
import { Store } from '../store.mjs';
import { createPaidClient } from '../paid-client.mjs';
import { QUALITY_CASES } from '../quality-cases.mjs';
import { citationUrls,tokenCost,evaluateAnswer,createQualityCaller,auditLedger,judgeBody } from '../quality-evaluation.mjs';
const good={claims:[{text:'Search Basic 1 credit',kind:'external',status:'supported',sourceId:'tavily',quote:'1 API credit per request'}],costOK:null,uncertainty:2,reason:'supported'};
test('quality fixtures are 12 unique cases, four per target dimension',()=>{
  assert.equal(new Set(QUALITY_CASES.map(c=>c.id)).size,12);
  for(const category of ['citation','cost','uncertainty']) assert.equal(QUALITY_CASES.filter(c=>c.category===category).length,4);
});
test('citation scanning preserves Chinese punctuation boundaries and checks all link forms',()=>{
  const url=QUALITY_CASES[0].sources[0].url;
  assert.deepEqual(citationUrls(`[来源](${url})。 ${url}（原文）`),[url]);
  const result=evaluateAnswer(QUALITY_CASES[0],`来源 ${url}。 https://invented.example/a`,good);
  assert.equal(result.scores.citation_validity,0);assert.equal(result.scores.critical_failure,1);
});
test('correct URL cannot rescue fabricated evidence or an unread source',()=>{
  const s=QUALITY_CASES[0],url=s.sources[0].url;
  assert.equal(evaluateAnswer(s,url,{...good,claims:[{...good.claims[0],quote:'invented rounding rule'}]}).scores.claim_support,0);
  assert.equal(evaluateAnswer({...s,sources:[{...s.sources[0],read:false}]},url,good).scores.citation_validity,0);
});
test('quote verification ignores Markdown emphasis but preserves wording; conflicting judge requires review',()=>{
  const sample={...QUALITY_CASES[0],sources:[{id:'tavily',read:true,url:'https://docs.tavily.com/documentation/api-credits',content:'**Basic Search (`basic`):** Each request costs **1 API credit**.'}]};
  const judged={...good,claims:[{...good.claims[0],quote:'Basic Search (`basic`): Each request costs **1 API credit**.'}]};
  assert.equal(evaluateAnswer(sample,sample.sources[0].url,judged).scores.claim_support,1);
  const bad={...good,claims:[{text:'建议尽量批量提交',kind:'calculation',status:'insufficient'}]};
  const result=evaluateAnswer(QUALITY_CASES[2],'建议尽量批量提交，取整未知。',bad);
  assert.equal(result.scores.uncertainty_quality,0);assert.equal(result.judgeConflict,true);
});
test('independent decimal arithmetic catches unit errors; missing price is not zero',()=>{
  assert.equal(tokenCost(20000,3000),0.0241);assert.equal(tokenCost(10000,1000),0.0107);
  assert.throws(()=>tokenCost(1,1,'unknown'),/DECIMAL_INVALID/);
  const sample=QUALITY_CASES.find(c=>c.id==='M01');
  const j={...good,claims:[{text:'calculated',kind:'calculation',status:'supported'}],costOK:true};
  assert.equal(evaluateAnswer(sample,'共0.0241元',j).scores.cost_accuracy,1);
  assert.equal(evaluateAnswer(sample,'共24.1元',j).scores.cost_accuracy,0);
  assert.equal(evaluateAnswer(sample,'共0.0241美元',j).scores.cost_accuracy,0);
});
test('uncertainty disclaimer cannot erase unsupported recommendations; invalid judges fail closed',()=>{
  const bad={...good,uncertainty:0,claims:[{...good.claims[0],status:'insufficient'}]};
  assert.equal(evaluateAnswer(QUALITY_CASES[2],QUALITY_CASES[2].sources[0].url,bad).scores.critical_failure,1);
  assert.throws(()=>evaluateAnswer(QUALITY_CASES[0],'text',{...good,claims:[]}),/JUDGE_INVALID/);
  const relabeled={...good,claims:[{text:'price',kind:'given',status:'supported'}]};
  assert.equal(evaluateAnswer(QUALITY_CASES[8],'每5个URL是1credit，实际取整未知。',relabeled).scores.citation_validity,0);
});
test('evaluation requires separate authority and persists reservations even after failed transport',async()=>{
  const dir=mkdtempSync(join(tmpdir(),'quality-')),store=new Store(dir),config={...loadConfig({}),mode:'qwen',allowEvaluationCalls:true};
  try {
    assert.throws(()=>createPaidClient(store,{...config,allowEvaluationCalls:false},'evaluation'),/QWEN_NOT_AUTHORIZED/);
    const task=store.createTask({goal:'test',constraints:'',scenario:'standard',budgetUnits:1000},config);
    let sent=0;const call=createQualityCaller(store,config,1,'unit',{fetchImplementation:async()=>{sent++;throw Error('offline');}});
    const settings={model:'fixture',baseUrl:'https://fixture.test',apiKey:'offline-placeholder',inputYuanPerMillion:0.8,outputYuanPerMillion:2.7,maxInputTokenBound:6000,maxPricedInputTokens:6000,maxOutputTokens:10,outputTokenSlack:0,requestTimeoutMs:1000};
    await assert.rejects(call(settings,{},task.id,'judge'),/QUALITY_BUDGET/);assert.equal(sent,0);
    const request=createQualityCaller(store,config,100,'unit',{fetchImplementation:async()=>{sent++;throw Error('offline');}});
    await assert.rejects(request(settings,{},task.id,'judge'),/QWEN_REQUEST_FAILED/);
    const reserved=store.trialBudget(config);assert.equal(reserved.calls,1);assert.equal(reserved.uncertainCalls,1);assert.equal(sent,1);
    assert.equal(auditLedger(store.db).score,1);
  } finally {store.close();rmSync(dir,{recursive:true,force:true});}
});
test('a citation for another source cannot cover a supported external claim',()=>{
  const a=QUALITY_CASES[0].sources[0],b={...a,id:'other',url:'https://docs.tavily.com/documentation/api-reference/endpoint/search'};
  const result=evaluateAnswer({...QUALITY_CASES[0],sources:[a,b]},b.url,good);
  assert.equal(result.scores.citation_validity,0);assert.ok(result.reasons.includes('CITATION_UNBOUND'));
});
test('the consistency gate rejects optimistic totals, even if the judge misses known unsupported advice',()=>{
  const sample=QUALITY_CASES[0],url=sample.sources[0].url;
  const optimistic=evaluateAnswer(sample,`Extract 尽量成批提交。取整未知。${url}`,good);
  assert.equal(optimistic.evaluatorValid,false);assert.equal(optimistic.reviewRequired,true);
  assert.equal(optimistic.scores.uncertainty_quality,0);assert.equal(optimistic.scores.critical_failure,1);
  assert.ok(optimistic.reasons.includes('JUDGE_CONFLICT'));
  const fact={...good,claims:[{...good.claims[0],text:'全部免费',status:'contradicted'}]};
  const mismatch=evaluateAnswer(sample,url,fact);
  assert.equal(mismatch.judgeConflict,true);assert.equal(mismatch.pass,false);
  assert.match(mismatch.judgeReason,/标记无效/);assert.equal(mismatch.rawJudgeReason,fact.reason);
  const missingQuote=evaluateAnswer(sample,url,{...good,claims:[{...good.claims[0],quote:'** `  ` **'}]});
  assert.equal(missingQuote.evaluatorValid,false);assert.equal(missingQuote.scores.claim_support,0);
});
test('source-bound given prices need quotes, but computed totals do not need to appear in price evidence',()=>{
  const sample=QUALITY_CASES.find(c=>c.id==='M03'),url=sample.sources[0].url;
  const calculated={...good,claims:[{text:'总费用0.0107元',kind:'calculation',status:'supported',sourceId:'qwen',quote:''}],costOK:true};
  assert.equal(evaluateAnswer(sample,`0.0107元 ${url}`,calculated).pass,true);
  const mislabeled={...calculated,claims:[{text:'单价',kind:'given',status:'supported',sourceId:'qwen',quote:'伪造单价'}]};
  assert.equal(evaluateAnswer(sample,`0.0107元 ${url}`,mislabeled).scores.claim_support,0);
});
test('currency conflict overrides an optimistic real judge and cannot be waived by missing numeric targets',()=>{
  const sample=QUALITY_CASES.find(c=>c.id==='U01');
  const result=evaluateAnswer(sample,`单价 $0.008元/credit，实际取整未知。${sample.sources[0].url}`,{...good,costOK:true});
  assert.equal(result.scores.cost_accuracy,0);assert.equal(result.evaluatorValid,false);
  assert.ok(result.judgeConflictReasons.includes('CURRENCY_JUDGE_CONFLICT'));
});
test('risky advice omitted by a low-scoring judge still invalidates its coverage',()=>{
  const sample=QUALITY_CASES[0],url=sample.sources[0].url;
  for(const text of ['可以免费重试。','建议批量省费。','不能保证免费重试，但可以零成本重试。']){
    const result=evaluateAnswer(sample,text+url,{...good,uncertainty:0});
    assert.equal(result.evaluatorValid,false,text);assert.equal(result.reviewRequired,true);
    assert.ok(result.judgeConflictReasons.includes('RISKY_ADVICE_NOT_REVIEWED'));
    assert.equal(result.scores.critical_failure,1);assert.ok(result.scores.claim_support<1);
    assert.equal(result.sampledClaimSupport,1);assert.equal(result.pass,false);
  }
  const report='可以免费重试。'+url;
  const explicit={...good,uncertainty:0,claims:[{text:'可以免费重试',kind:'calculation',status:'insufficient',quote:'',sourceId:''}]};
  const result=evaluateAnswer(sample,report,explicit);
  assert.equal(result.evaluatorValid,true);assert.equal(result.pass,false);assert.equal(result.scores.claim_support,0);
  const negative=evaluateAnswer(sample,report,{...explicit,claims:[{...explicit.claims[0],text:'免费重试没有依据'}]});
  assert.equal(negative.evaluatorValid,true);assert.deepEqual(negative.missedAdvice,[]);
  const waived=evaluateAnswer(sample,report,{...explicit,claims:[{...explicit.claims[0],status:'supported'}]});
  assert.equal(waived.evaluatorValid,false);assert.equal(waived.pass,false);
});
test('safe negations with supported uncertainty are not risky advice omissions',()=>{
  const sample=QUALITY_CASES[0];
  for(const text of ['不做批量省费建议。','不能保证免费重试。','免费重试没有依据。']){
    const result=evaluateAnswer(sample,text+sample.sources[0].url,good);
    assert.equal(result.pass,true,text);assert.deepEqual(result.missedAdvice,[]);
  }
});
test('every accepted structured recommendation must be individually reviewed',()=>{
  const sample={...QUALITY_CASES[0],recommendations:[{id:'R1',status:'accepted',advice:'Read only necessary URLs'}]};
  const report=sample.sources[0].url;
  const missing=evaluateAnswer(sample,report,good);
  assert.equal(missing.evaluatorValid,false);assert.ok(missing.judgeConflictReasons.includes('RECOMMENDATION_NOT_REVIEWED'));
  const covered=evaluateAnswer(sample,report,{...good,claims:[{...good.claims[0],recommendationId:'R1'}]});
  assert.equal(covered.evaluatorValid,true);assert.deepEqual(covered.recommendationCoverage,[{id:'R1',reviewed:true}]);
});

test('judge receives exact risky clauses before price sampling, without treating safe negations as risks',()=>{
 const settings={model:'offline',outputTokenParameter:'max_tokens',maxOutputTokens:1600};
 const sample=QUALITY_CASES.find(s=>s.id==='U01');
 const payload=JSON.parse(judgeBody(settings,sample,'Extract 失败不计费，无需重试付费。').messages[1].content);
 assert.ok(payload.requiredRiskReview.some(r=>r.kind==='retry-cost'&&r.text.includes('无需重试付费')));
 assert.deepEqual(JSON.parse(judgeBody(settings,sample,'不能保证免费重试。').messages[1].content).requiredRiskReview,[]);
});

test('judge cannot grade withheld advice that was never published',()=>{
 const sample={...QUALITY_CASES[0],recommendations:[{id:'R1',status:'unconfirmed',advice:'PRIVATE_WITHHELD_ADVICE'},{id:'R2',status:'accepted',advice:'Use TLS'}]};
 const data=JSON.parse(judgeBody({model:'offline'},sample,'事实；R1待确认').messages[1].content);
 assert.deepEqual(data.withheldRecommendationIds,['R1']);assert.equal(data.recommendations.length,1);assert.equal(data.recommendations[0].id,'R2');assert.ok(!JSON.stringify(data).includes('PRIVATE_WITHHELD_ADVICE'));
});
