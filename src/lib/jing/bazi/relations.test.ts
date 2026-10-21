import { describe, expect, it } from 'vitest';
import { buildRelationNodes, detectGanZhiRelations } from './relations';

describe('Ganzhi relationship graph', () => {
  it('marks structural relations without attaching fortune scores', () => {
    const nodes = buildRelationNodes(
      { year: '甲子', month: '庚午', day: '己丑', hour: '乙未' },
      { daYun: '丙申', liuNian: '辛巳' },
    );
    const relations = detectGanZhiRelations(nodes);
    expect(relations.some((relation) => relation.kind === '天干相冲')).toBe(true);
    expect(relations.some((relation) => relation.kind === '地支六冲')).toBe(true);
    expect(relations.find((relation) => relation.kind === '天干五合')?.members).toEqual([
      'year',
      'day',
    ]);
    expect(
      relations.every((relation) =>
        relation.members.every((id) => nodes.some((node) => node.id === id)),
      ),
    ).toBe(true);
  });

  it('requires all three distinct branches for a three-union structure', () => {
    const full = detectGanZhiRelations(
      buildRelationNodes({ year: '甲申', month: '丙子', day: '戊辰', hour: '壬午' }),
    );
    expect(full.find((relation) => relation.kind === '地支三合')?.members).toEqual([
      'year',
      'month',
      'day',
    ]);
    const partial = detectGanZhiRelations(
      buildRelationNodes({ year: '甲申', month: '丙子', day: '戊戌', hour: '壬午' }),
    );
    expect(partial.some((relation) => relation.kind === '地支三合')).toBe(false);
  });
});
