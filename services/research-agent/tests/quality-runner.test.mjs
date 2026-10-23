import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync,rmSync,readFileSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { Store } from '../store.mjs';
import { loadConfig } from '../config.mjs';
import { runQualityEvaluation,parseForcedReport } from '../quality-runner.mjs';
test('Bailian forced function stop accepts valid arguments but length/incomplete output remains rejected',()=>{
  const payload={choices:[{finish_reason:'stop',message:{tool_calls:[{function:{name:'save_report',arguments:'{"markdown":"valid"}'}}]}}]};
  assert.equal(parseForcedReport(payload),'valid');
  assert.throws(()=>parseForcedReport({choices:[{...payload.choices[0],finish_reason:'length'}]}),/ANSWER_INVALID/);
});
test('whole fixed-evidence runner uses 24 intercepted calls, appends original ledger and refuses replay',async()=>{
  const dir=mkdtempSync(join(tmpdir(),'quality-runner-')),store=new Store(join(dir,'data'));
  const config={...loadConfig({}),mode:'qwen',allowEvaluationCalls:true,validationBudgetUnits:15000,
    qwen:{...loadConfig({}).qwen,apiKey:'offline-test-not-a-key'}};
  const originalFetch=globalThis.fetch;let requests=0;
  const seed=store.createTask({goal:'old',constraints:'',scenario:'standard',budgetUnits:1000},config);
  const old=store.reserveModelCall(seed.id,20,config,{purpose:'old-unknown'});seed.status='completed';store.saveTask(seed);
  const oldRow=store.db.prepare('SELECT * FROM model_calls WHERE id=?').get(old);
  globalThis.fetch=async(url,init)=>{
    assert.match(url,/\/chat\/completions$/);requests++;const body=JSON.parse(init.body);
    const choice=body.tools?{finish_reason:'tool_calls',message:{tool_calls:[{function:{name:'save_report',arguments:JSON.stringify({markdown:'资料不足，无法确认价格。'})}}]}}
      :{finish_reason:'stop',message:{content:JSON.stringify({claims:[{text:'unknown',kind:'given',status:'supported'}],costOK:null,uncertainty:2,reason:'not confirmed'})}};
    return new Response(JSON.stringify({choices:[choice],usage:{prompt_tokens:10,completion_tokens:10}}),{status:200});
  };
  try{
    const outputDir=join(dir,'output'),receipt=await runQualityEvaluation(store,config,{outputDir});
    assert.equal(receipt.cases,12);assert.equal(requests,24);assert.equal(receipt.networkAttempts,0);assert.equal(receipt.withinBudget,true);
    assert.equal(receipt.after.uncertainCalls,1);assert.deepEqual(store.db.prepare('SELECT * FROM model_calls WHERE id=?').get(old),oldRow);
    assert.equal(JSON.parse(readFileSync(join(outputDir,'ledger.json'),'utf8')).records.model_calls.length,25);
    await assert.rejects(runQualityEvaluation(store,config,{outputDir}),/EEXIST/);assert.equal(requests,24);
  }finally{globalThis.fetch=originalFetch;store.close();rmSync(dir,{recursive:true,force:true});}
});
