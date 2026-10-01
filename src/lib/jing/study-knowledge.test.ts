import { describe, expect, it } from 'vitest';
import { answerStudyQuestion, findKnowledge } from './study-knowledge';

describe('local study knowledge', () => {
  it('finds aliases and returns cited layered explanations', () => {
    expect(findKnowledge('白话解释十神')[0]?.id).toBe('ten-gods');
    const answer = answerStudyQuestion('为什么会有变爻');
    expect(answer.sources.length).toBeGreaterThan(0);
    expect(answer.rule).toContain('铜钱');
  });

  it('refuses high-stakes fortune questions', () => {
    const answer = answerStudyQuestion('这卦能判断股票会不会涨吗');
    expect(answer.refused).toBe(true);
    expect(answer.caution).toContain('专业');
  });
});
