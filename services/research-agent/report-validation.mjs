// Local, deterministic checks. A valid link is not proof of every report claim.
export const REPORT_VALIDATION_VERSION = 'report-guard-v6';
export const REPORT_PARAMETERS = { type: 'object', additionalProperties: false, required: ['markdown', 'recommendations'], properties: {
  markdown: { type: 'string', description: 'Facts, calculations and uncertainty only. Recommendations are rendered from the structured list.' },
  recommendations: { type: 'array', maxItems: 3, items: { type: 'object', additionalProperties: false,
    required: ['id','advice','status','preconditions','evidence'], properties: {
      id: { type: 'string', pattern: '^R[1-3]$' }, advice: { type: 'string' },
      status: { type: 'string', enum: ['supported','unconfirmed'] },
      preconditions: { type: 'array', maxItems: 3, items: { type: 'string' } },
      evidence: { type: 'array', maxItems: 3, items: { type: 'object', additionalProperties: false,
        required: ['sourceUrl','quote'], properties: { sourceUrl: { type: 'string' }, quote: { type: 'string' } } } },
    } } },
} };
const quoteText = text => text.replace(/[*`]/g, '').replace(/\s+/g, ' ').trim();

export function reviewRecommendations(items, sources) {
  if (!Array.isArray(items) || items.length > 3) throw Error('REPORT_RECOMMENDATIONS_INVALID');
  const ids = new Set();
  return items.map(item => {
    if (!item || !/^R[1-3]$/.test(item.id) || ids.has(item.id)
      || typeof item.advice !== 'string' || !item.advice.trim() || item.advice.length > 500
      || !['supported','unconfirmed'].includes(item.status)
      || !Array.isArray(item.preconditions) || item.preconditions.length > 3
      || item.preconditions.some(p => typeof p !== 'string' || p.trim().length < 4 || p.length > 300)
      || !Array.isArray(item.evidence) || item.evidence.length > 3) throw Error('REPORT_RECOMMENDATIONS_INVALID');
    ids.add(item.id);
    const evidence = item.evidence.map(ref => {
      const source = sources.find(s => s.url === ref?.sourceUrl);
      if (!source || typeof ref.quote !== 'string' || ref.quote.length > 1000 || quoteText(ref.quote).length < 4
        || !quoteText(source.content || '').includes(quoteText(ref.quote))) throw Error('REPORT_RECOMMENDATION_EVIDENCE');
      return { sourceUrl: ref.sourceUrl, quote: ref.quote };
    });
    const downgradeReason = item.status === 'supported' && unsupportedAdvice(item.advice, sources).length ? 'REPORT_UNSUPPORTED_ADVICE'
      : item.status === 'supported' && (!item.preconditions.length || !evidence.length
        || !item.preconditions.every(p => evidence.some(ref => quoteText(ref.quote).includes(quoteText(p))))) ? 'REPORT_RECOMMENDATION_EVIDENCE' : null;
    // Preserve useful facts, but never publish the original unproved advice.
    return { id: item.id, advice: item.advice, preconditions: [...item.preconditions], evidence,
      status: item.status === 'supported' && !downgradeReason ? 'accepted' : 'unconfirmed', ...(downgradeReason ? { downgradeReason } : {}) };
  });
}
export const citationUrls = text => [...new Set([...text.matchAll(/https?:\/\/[^\s)\]>"'，。；、！？（）【】《》]+/g)].map(match => match[0]))];
export const currencyConflicts = text => [...text.replace(/[*`]/g, '').matchAll(/(?:\$|USD\s*)\s*\d[\d,]*(?:\.\d+)?\s*(?:元|人民币)|(?:¥|￥|CNY\s*)\s*\d[\d,]*(?:\.\d+)?\s*美元/gi)].map(match => match[0]);
const readable = sources => sources.filter(source => source.read !== false && !source.error);

// The current Tavily evidence does not establish per-request rounding or batching
// savings. Reject this specific inference rather than pretending to do semantic
// verification of arbitrary recommendations. Negative and hypothetical examples
// remain useful explanations and are tested separately.
export function unsupportedAdvice(report, sources = [], { includeDenied = false } = {}) {
  const text = report.replace(/[*`]/g, '');
  const tavilyExtract = /(?:Tavily|Extract)/i.test(text)
    || sources.some(source => /docs\.tavily\.com/.test(source.url || ''));
  if (!tavilyExtract) return [];
  const issues = [];
  const negated = prefix => {
    const clause = prefix.split(/[，,；;：:]/).at(-1);
    if (/(?:不能|不应|不得|不要|无需|不必)\s*不|(?:并非|不是)\s*(?:不能|不应|不建议)/.test(clause)) return false;
    return /(?:不能|不应|不建议|不得|不要|无需|不必|避免|无法|不足以|不对|不做|不提供|并非|不能确定|不保证|cannot|should not|do not)[^，,；;]{0,24}$/i.test(clause);
  };
  const deniedAfter = suffix => /^[”"'」』）)\s]*(?:的(?:说法|建议|结论))?\s*(?:没有依据|无依据|缺乏依据|未经证实|未获证实|不成立|不可靠|不能保证|只是.{0,6}假设|属于.{0,6}假设|仍需验证|尚未确认|未知|未说明(?=$|[，,；;])|未规定(?=$|[，,；;])|尚不明确(?=$|[，,；;]))/.test(suffix);
  for (const sentence of text.split(/[。！？\n]|(?<=[.!?])\s+/)) {
    for (const part of sentence.split(/(?:但是|然而|不过|但|\bbut\b|\bhowever\b)/i)) {
      const conditional = /(?:^|[，,；;：:])\s*(?:若|如果|假设|仅在|if\b)/i.test(part)
        && /才可能|可能省|则|would|could/i.test(part)
        && !/建议|推荐|尽量|务必|recommend|should/i.test(part);
      for (const retry of part.matchAll(/可安全重试|放心重试|无限重试|(?:免费|零成本|不花钱|不扣费)\s*重试|(?:重试|再次请求|重新请求)[^，,；;]{0,8}(?:不(?:会)?(?:再)?(?:收费|扣费)|无需(?:额外)?(?:付费|支付|费用)|免费|零成本|不花钱)|无需[^，,；;]{0,6}重试[^，,；;]{0,6}付费|\bretr(?:y|ies)\s+(?:is\s+|are\s+)?free\b|\bfree\s+retr(?:y|ies)\b/gi)) {
        const conditionalEvidence = conditional && /(?:若|如果|仅在).{0,12}(?:官方|文档).{0,10}(?:确认|明确)/.test(part) && /才可能/.test(part);
        const internallyDenied = /不一定|并不|并非|不保证|不能保证|不意味着|不代表/.test(retry[0]);
        if (includeDenied || (!negated(part.slice(0, retry.index)) && !internallyDenied && !deniedAfter(part.slice(retry.index + retry[0].length)) && !conditionalEvidence)) {
          issues.push({ code: 'REPORT_UNSUPPORTED_ADVICE', kind: 'retry-cost', text: part.trim() });
        }
      }
      for (const batch of part.matchAll(/凑(?:满|齐|批|单)|成批|批量|一批|批次|\bbatch(?:ing)?\b/gi)) {
        const prefix = part.slice(0, batch.index);
        const clause = part.slice(batch.index).split(/[，,；;]/)[0];
        if (!includeDenied && (negated(prefix) || /(?:省钱|省费|更便宜|降低.{0,5}(?:成本|费用))\s*(?:的说法)?(?:没有依据|无依据|未经证实|不成立)/.test(clause))) continue;
        if (!includeDenied && conditional) continue;
        if (/建议|尽量|应当|应该|推荐|最好|优先|务必|必须|需要|放心|对齐|每次\s*[≤<]|\bshould\b|recommend|省钱|省费|更便宜|降低.{0,5}(?:成本|费用)|性价比最高|save.{0,10}(?:money|cost)/i.test(part)) {
          issues.push({ code: 'REPORT_UNSUPPORTED_ADVICE', kind: 'batch-savings', text: part.trim() });
          break;
        }
      }
    }
  }
  return issues;
}

export function finalizeReport(markdown, evidence = [], { recommendations, requireRecommendations = false } = {}) {
  if (typeof markdown !== 'string' || !markdown.trim() || markdown.length > 12_000) throw new Error('INVALID_REPORT');
  const sources = readable(evidence);
  if (requireRecommendations && recommendations === undefined) throw Error('REPORT_RECOMMENDATIONS_INVALID');
  const reviewed = recommendations === undefined ? null : reviewRecommendations(recommendations, sources);
  // Check the original before adding citations: a valid footer cannot launder a
  // fabricated URL or turn a search snippet / failed extraction into evidence.
  if (citationUrls(markdown).some(url => !sources.some(source => source.url === url))) throw new Error('INVALID_SOURCE');
  if (currencyConflicts(markdown).length) throw new Error('REPORT_CURRENCY_CONFLICT');
  if (unsupportedAdvice(markdown, sources).length) throw new Error('REPORT_UNSUPPORTED_ADVICE');
  const corrections = [];
  let result = markdown;
  for (const source of sources) {
    if (!source.content?.trim() || !/^https:\/\//.test(source.url) || citationUrls(result).includes(source.url)) continue;
    const bare = source.url.slice('https://'.length);
    const escaped = bare.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = new RegExp(`(?<![\\w:/.-])${escaped}(?=$|[\\s)\\]>"'，。；、！？（）【】《》])`, 'g');
    if (pattern.test(result)) {
      result = result.replace(pattern, source.url);
      corrections.push({ code: 'CITATION_PROTOCOL_COMPLETED', url: source.url });
    }
  }
  if (!citationUrls(result).length) {
    const missing = sources.filter(source => source.content?.trim() && /^https:\/\//.test(source.url));
    if (missing.length) {
      result += '\n\n## 已读取来源（系统补全）\n\n以下链接来自本任务成功读取的资料；补全链接不代表已核实报告的全部结论。\n'
        + missing.map((source, index) => `- [来源 ${index + 1}](${source.url})`).join('\n');
      corrections.push(...missing.map(source => ({ code: 'CITATION_APPENDED', url: source.url })));
    }
  }
  if (reviewed?.length) {
    result += '\n\n## 建议及证据边界\n\n' + reviewed.map(item => item.status === 'accepted'
      ? `- **${item.id}**：${item.advice}\n  前提：${item.preconditions.join('；')}。${item.evidence.map(ref => `[依据](${ref.sourceUrl})`).join(' ')}`
      : `- **${item.id} 待确认**：前提尚未获得直接证据，暂不形成执行建议。`).join('\n');
    if (currencyConflicts(result).length) throw Error('REPORT_CURRENCY_CONFLICT');
    if (citationUrls(result).some(url => !sources.some(source => source.url === url))) throw Error('INVALID_SOURCE');
    if (unsupportedAdvice(result, sources).length) throw Error('REPORT_UNSUPPORTED_ADVICE');
  }
  if (result.length > 12_000) throw new Error('INVALID_REPORT');
  return { markdown: result, validation: { version: REPORT_VALIDATION_VERSION, corrections, semanticVerification: false,
    ...(reviewed ? { recommendations: reviewed, recommendationEvidenceChecked: true } : {}) } };
}
