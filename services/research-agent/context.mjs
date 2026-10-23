import { createHash } from 'node:crypto';

export const byteBound = value => Buffer.byteLength(JSON.stringify(value), 'utf8');
const digest = text => createHash('sha256').update(text).digest('hex').slice(0, 16);
export const sourceId = doc => `src-${digest(`${doc.url || ''}\n${doc.content || doc.text || ''}`)}`;
const numericFacts = text => [...new Set(text.split(/\n|(?<=[。；])/u).filter(line => /\d/.test(line)))];
const qualifications = text => [...new Set(text.split(/\n|(?<=[。；])/u)
  .filter(line => /冲突|未知|未确认|未核实|不支持|不能|限制|不得|失败|错误|unknown|conflict|error|deprecated/i.test(line)))];

export function readEvidence(evidence, args) {
  const doc = evidence.find(item => sourceId(item) === args.sourceId);
  const offset = args.offset ?? 0, length = args.length ?? 1200;
  if (!doc || !Number.isInteger(offset) || offset < 0 || !Number.isInteger(length) || length < 1 || length > 2000) throw new Error('INVALID_EVIDENCE_RANGE');
  const text = doc.content || doc.text || '';
  return { sourceId: sourceId(doc), url: doc.url, offset, totalLength: text.length, text: text.slice(offset, offset + length) };
}

// A model-independent view of persistent raw events. Never mutates execution state.
export class ContextManager {
  constructor({ limit = 24000, protocolReserve = 8000, onCompact = () => {} } = {}) {
    this.limit = limit; this.protocolReserve = protocolReserve; this.onCompact = onCompact;
    this.version = 0; this.covered = -1; this.lastSummary = null;
  }
  prepare(state) {
    const documents = [...new Map(state.evidence.map(doc => [sourceId(doc), doc])).values()];
    // Full real pages remain in raw events/state for read_evidence. Only the
    // bounded excerpt enters model context; it is explicitly marked as partial.
    const evidence = documents.map(doc => {
      const { excerpt, content, ...metadata } = doc;
      return { ...metadata, sourceId: sourceId(doc), content: excerpt ?? content,
        ...(excerpt !== undefined ? { cachedLength: content.length, truncated: excerpt.length < content.length, recoverWith: 'read_evidence' } : {}) };
    });
    // Page bodies already live in evidence; don't pay to send them twice.
    const observations = state.observations.map((item, index) => ({ eventIndex: index, ...item,
      output: item.tool === 'read_page' && !item.output.error
        ? { sourceId: sourceId(item.output), url: item.output.url, cached: true } : item.output }));
    const view = { goal: state.goal, constraints: state.constraints,
      allowedUrls: [...state.allowedUrls], readUrls: [...state.readUrls],
      searches: state.searches, pages: state.pages, calculation: state.calculation, reportSaved: !!state.report,
      memories: state.memories || [], availableSkills: state.availableSkills || [], skills: state.selectedSkills || [],
      evidence, observations };
    const initial = this.protocolReserve + byteBound(view);
    let strategy = 'deduplicate';
    if (initial >= this.limit * 0.7) {
      strategy = initial >= this.limit * 0.85 ? 'emergency-extractive' : 'extractive';
      const covered = Math.max(0, observations.length - 2);
      // Rebuild from originals rather than repeatedly summarizing an old summary.
      const summary = { version: this.version + 1, coveredEventCount: covered,
        facts: evidence.map(doc => ({ sourceId: doc.sourceId, url: doc.url, title: doc.title,
          hash: doc.contentHash || digest(doc.content || doc.text || ''), excerpt: (doc.content || doc.text || '').slice(0, 220),
          numericFacts: numericFacts(doc.content || doc.text || ''), qualifications: qualifications(doc.content || doc.text || '') })),
        actions: observations.slice(0, covered).map(item => ({ eventIndex: item.eventIndex, tool: item.tool, args: item.args,
          error: item.output?.error || null, result: item.tool === 'calculate' ? item.output : undefined })),
        unresolved: ['来源之间的冲突仍须逐一核对；未确认事项保持未知。'],
      };
      // Keep every numerical statement, including units and conflicting claims.
      // If these alone exceed the budget, fail closed instead of silently losing facts.
      if (covered !== this.covered || JSON.stringify(summary.facts) !== JSON.stringify(this.lastSummary?.facts)) {
        this.version++; this.covered = covered; this.lastSummary = summary;
        this.onCompact({ ...summary, strategy, beforeByteBound: initial });
      }
      view.summary = this.lastSummary;
      view.evidence = evidence.map(doc => ({ sourceId: doc.sourceId, title: doc.title, url: doc.url,
        cachedLength: (doc.content || doc.text || '').length, recoverWith: 'read_evidence' }));
      view.observations = observations.slice(covered);
    }
    const bound = this.protocolReserve + byteBound(view);
    this.metrics = { strategy, version: this.version, coveredEventCount: Math.max(0, this.covered), beforeByteBound: initial,
      afterByteBound: bound, limit: this.limit, accounting: 'utf8-bytes-upper-bound', semanticModelCalls: 0 };
    // Aim below 55% through deduplication/extraction; never discard hard constraints.
    // A small context may have a larger fixed protocol reserve. The hard cap wins.
    if (bound > this.limit) throw new Error('MODEL_CONTEXT_LIMIT');
    return view;
  }
}
