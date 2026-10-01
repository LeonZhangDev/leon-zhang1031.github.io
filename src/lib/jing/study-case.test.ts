import { describe, expect, it } from 'vitest';
import { appendStudyCase, createStudyCase, parseStudyCases } from './study-case';

describe('encrypted notebook study-case markers', () => {
  it('round trips unicode case records inside ordinary note text', () => {
    const record = createStudyCase({
      kind: 'yijing', title: '周易 · 乾为天', ruleVersion: 'yijing-1.0.0',
      inputSummary: '铜钱法', resultSummary: '本卦乾为天，无动爻',
      derivation: ['六爻自下而上'], sourceRefs: ['《周易》'],
    });
    const notes = appendStudyCase('原有手札内容', record);
    const parsed = parseStudyCases(notes);
    expect(notes).toContain('原有手札内容');
    expect(parsed).toHaveLength(1);
    expect(parsed[0].title).toBe('周易 · 乾为天');
    expect(parsed[0].derivation).toEqual(['六爻自下而上']);
  });

  it('ignores damaged markers without losing valid cases', () => {
    const notes = `${appendStudyCase('', createStudyCase({
      kind: 'lot', title: '观音灵签', ruleVersion: 'lots-1', inputSummary: '',
      resultSummary: '第一签', derivation: [], sourceRefs: [],
    }))}\n<!-- jing-study-case:not-valid -->`;
    expect(parseStudyCases(notes)).toHaveLength(1);
  });

  it('keeps a whitelisted Bazi resume payload inside the encoded marker', () => {
    const record = createStudyCase({
      kind: 'bazi', title: '八字案卷', ruleVersion: 'bazi-2', inputSummary: '私密输入',
      resultSummary: '四柱摘要', derivation: [], sourceRefs: [],
      resume: { route: '/jing/bazi/', form: { year: 1986, month: 5, label: '旧案', secret: 'drop-me' } },
    });
    const notes = appendStudyCase('', record);
    expect(notes).not.toContain('drop-me');
    expect(parseStudyCases(notes)[0].resume?.form).toEqual({ year: 1986, month: 5, label: '旧案' });
  });
});
