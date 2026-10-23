import test from 'node:test';
import assert from 'node:assert/strict';
import { finalizeReport, citationUrls, unsupportedAdvice } from '../report-validation.mjs';
import { replayQualitySamples } from '../quality-offline-replay.mjs';
import { QUALITY_CASES } from '../quality-cases.mjs';

globalThis.fetch = () => { throw Error('EXTERNAL_NETWORK_FORBIDDEN'); };
const sources = QUALITY_CASES[0].sources;
const url = sources[0].url;

test('missing and protocol-less citations are completed only from successfully read cached sources', () => {
  const original = '每次搜索1 credit，实际账单未知。';
  const result = finalizeReport(original, sources);
  assert.ok(result.markdown.startsWith(original));
  assert.deepEqual(citationUrls(result.markdown), [url]);
  assert.equal(result.validation.corrections[0].code, 'CITATION_APPENDED');
  assert.match(result.markdown, /不代表已核实/);
  const bare = finalizeReport(`来源：${url.slice(8)}（核查）`, sources);
  assert.equal(bare.validation.corrections[0].code, 'CITATION_PROTOCOL_COMPLETED');
  assert.ok(bare.markdown.includes(url));
  assert.deepEqual(finalizeReport(result.markdown, sources).validation.corrections, []);
});
test('citation repair cannot launder unread, failed or fabricated links, or modify similar domains', () => {
  for (const source of [{ ...sources[0], read: false }, { ...sources[0], error: 'EXTRACT_FAILED' }]) {
    assert.throws(() => finalizeReport(url, [source]), /INVALID_SOURCE/);
    assert.deepEqual(citationUrls(finalizeReport('资料不足', [source]).markdown), []);
  }
  for (const bad of [`${url}/invented`, `${url}?unobserved=1`, 'https://evil.invalid/']) {
    assert.throws(() => finalizeReport(`${bad} ${url}`, sources), /INVALID_SOURCE/);
  }
  const similar = `https://evil.invalid/${url.slice(8)}`;
  assert.throws(() => finalizeReport(similar, sources), /INVALID_SOURCE/);
  const empty = finalizeReport('未读取正文，不能确认报价。', []);
  assert.equal(empty.validation.corrections.length, 0);
});
test('unsupported batch recommendations are blocked even with an unknown disclaimer or a valid citation', () => {
  for (const text of ['Extract 尽量成批提交，取整规则未知。', 'Tavily 凑满5个更便宜。',
    '取整未知，但是建议批量提交。', '不应推断凑批省费；建议批量提交。',
    'Tavily: we recommend batching to save costs.', '可放心批量提交，但注意5个一批的取整规则。', '仅对入选URL调Extract basic，每次 ≤5 个对齐批次。', 'Extract失败不扣credits，可安全重试。', '利用失败不扣费机制，无需重试付费。']) {
    assert.throws(() => finalizeReport(`${text}\n${url}`, sources), /REPORT_UNSUPPORTED_ADVICE/, text);
  }
});
test('conflicting currency symbols and units fail even when the amount is arithmetically correct', () => {
  for (const report of ['$0.008元/credit', '$ 0.008 元', 'USD 0.008人民币', '¥0.008美元', 'CNY 0.008美元']) {
    assert.throws(() => finalizeReport(report, sources), /REPORT_CURRENCY_CONFLICT/);
  }
  for (const report of ['$0.008/credit', '0.008美元/credit', '$1=8元', 'USD 1 = CNY 8']) assert.doesNotThrow(() => finalizeReport(report, sources));
});
test('retry paraphrases, double negatives and renewed advice cannot bypass the guard', () => {
  for (const text of ['可以免费重试。', '重试无需付费。', '重试不会再扣费。', '零成本重试。',
    '不能保证可安全重试，但可以免费重试。', '不建议凑批省费，但是建议批量提交以降低成本。',
    '不能不建议批量省费。', '并非不能免费重试。', '不是不建议批量省费。', '无需担心成本，放心重试。', '若失败，则免费重试。',
    'Retries are free.', 'We recommend free retries.', '可以免费重试未说明风险。']) {
    assert.throws(() => finalizeReport(text + url, sources), /REPORT_UNSUPPORTED_ADVICE/, text);
  }
});
test('negated retry and batch claims remain useful uncertainty statements', () => {
  for (const text of ['不能保证免费重试。', '不建议免费重试。', '免费重试没有依据。',
    '免费重试的说法未经证实。', '“免费重试”只是未验证假设。', '重试不一定免费。',
    '重试并不免费。', '重试是否免费未知。', '重试是否免费未说明，不能推断。', '重试是否免费未规定。', '不做批量省费建议。', '批量省费没有依据。',
    '不能据此承诺重试无需付费。', '不能保证可安全重试，建议核实计费规则。',
    '若官方确认重试免费，才可能据此核算；目前未知。']) {
    assert.deepEqual(unsupportedAdvice(text, sources), [], text);
  }
});
test('negated, conditional and verification proposals are not mistaken for definitive batch advice', () => {
  for (const text of ['Extract 不应据此推断可凑满5个一批来省钱。', '不能据此建议凑批省费。',
    '若按请求向上取整，凑满再提交才可能省钱；若按比例计费则无差别。',
    '需要精确预算时，先以1–4个URL实测余额变化来验证；本轮不执行。',
    'Tavily: do not recommend batching to save costs.', '在官方明确取整规则前，不对单次少量提取的credit消耗做确定性估算或批量对齐建议。', '不能保证可安全重试。']) {
    assert.deepEqual(unsupportedAdvice(text, sources), [], text);
  }
  assert.deepEqual(unsupportedAdvice('建议批量写入本地日志。', []), []);
});
test('citation expansion respects the report size bound and never silently truncates evidence', () => {
  assert.throws(() => finalizeReport('字'.repeat(12_000), sources), /INVALID_REPORT/);
  assert.throws(() => finalizeReport(''), /INVALID_REPORT/);
});
test('offline replay keeps original answers/judges intact and separates repair from blocked output', () => {
  const judge = { claims: [{ text: 'Search Basic 1 credit', kind: 'external', status: 'supported', sourceId: 'tavily', quote: '1 API credit per request' }], costOK: null, uncertainty: 2 };
  const rows = [{ caseId: 'C01', report: '搜索每请求1 credit。', rawJudge: judge, pass: false },
    { caseId: 'H01', report: `Extract 尽量成批提交；取整未知。${url}`, sources,
      rawJudge: { ...judge, claims: [{ text: '建议成批提交', kind: 'calculation', status: 'insufficient' }] }, pass: false }];
  const copy = structuredClone(rows), result = replayQualitySamples(rows);
  assert.deepEqual(rows, copy);
  assert.deepEqual(result.summary, { total: 2, regressionPassed: 2, corrected: 1, blocked: 1, acceptedAnswerPasses: 1 });
  assert.equal(result.results[1].originalScore.evaluatorValid, false);
  assert.equal(result.results[1].report, undefined);
  assert.equal(result.newReservedYuan, 0);
  assert.throws(() => replayQualitySamples(rows.slice(0, 1)), /REPLAY_EXPECTATION_MISSING/);
});
test('a coherent negative judge is valid while the unsafe report remains blocked', () => {
  const row={caseId:'H01',report:`免费重试。${url}`,sources,pass:false,
    rawJudge:{claims:[{text:'免费重试没有依据',kind:'calculation',status:'insufficient'}],costOK:null,uncertainty:0}};
  const result=replayQualitySamples([row]);
  assert.equal(result.results[0].originalScore.evaluatorValid,true);
  assert.equal(result.results[0].disposition,'blocked');assert.equal(result.summary.regressionPassed,1);
  assert.equal(result.summary.acceptedAnswerPasses,0);
});
test('structured recommendations require explicit preconditions and matching read-source quotations', () => {
  const source={id:'policy',url:'https://example.test/policy',read:true,content:'Requests must use TLS. Failed URLs do not consume credits.'};
  const record={id:'R1',advice:'Use TLS for requests.',status:'supported',preconditions:['Requests must use TLS.'],evidence:[{sourceUrl:source.url,quote:'Requests must use TLS.'}]};
  const options={recommendations:[record],requireRecommendations:true};
  const result=finalizeReport('Policy facts only.',[source],options);
  assert.match(result.markdown,/R1.*Use TLS/);assert.equal(result.validation.recommendations[0].status,'accepted');
  assert.throws(()=>finalizeReport('Facts',[source],{requireRecommendations:true}),/REPORT_RECOMMENDATIONS_INVALID/);
  assert.throws(()=>finalizeReport('Facts',[source],{recommendations:[record,record]}),/REPORT_RECOMMENDATIONS_INVALID/);
  for(const change of [{evidence:[{sourceUrl:source.url,quote:'Retry requests are free.'}]},
    {evidence:[{sourceUrl:'https://unread.test/',quote:'Requests must use TLS.'}]}]) {
    assert.throws(()=>finalizeReport('Facts',[source],{recommendations:[{...record,...change}]}),/REPORT_RECOMMENDATION_EVIDENCE/);
  }
  for(const preconditions of [[],['Retry requests are free.']]) {
    const withheld=finalizeReport('Facts',[source],{recommendations:[{...record,preconditions}]});
    assert.equal(withheld.validation.recommendations[0].status,'unconfirmed');
    assert.equal(withheld.validation.recommendations[0].downgradeReason,'REPORT_RECOMMENDATION_EVIDENCE');
    assert.ok(!withheld.markdown.includes(record.advice));
  }
  assert.throws(()=>finalizeReport('Facts',[{...source,read:false}],options),/REPORT_RECOMMENDATION_EVIDENCE/);
});
test('pending recommendations cannot become published advice or launder a known fee inference',()=>{
  const record={id:'R1',advice:'Tavily 可以免费重试，批量提交能省费。',status:'unconfirmed',preconditions:['每次重试是否计费'],evidence:[]};
  const result=finalizeReport('计费取整未知。',sources,{recommendations:[record],requireRecommendations:true});
  assert.match(result.markdown,/R1 待确认/);assert.ok(!result.markdown.includes(record.advice));
  assert.equal(result.validation.recommendations[0].advice,record.advice);
  const quote=sources[0].content.slice(0,30);
  const withheld=finalizeReport('Facts',sources,{recommendations:[{...record,status:'supported',preconditions:[quote],evidence:[{sourceUrl:url,quote}]}]});
  assert.equal(withheld.validation.recommendations[0].downgradeReason,'REPORT_UNSUPPORTED_ADVICE');
  assert.ok(!withheld.markdown.includes(record.advice));
  assert.throws(()=>finalizeReport('Tavily 可以免费重试。',sources,{recommendations:[]}),/REPORT_UNSUPPORTED_ADVICE/);
});
