import type { FourPillars } from '../calendar/engine';

export type RelationScope = '本命' | '大运' | '流年' | '流月';
export interface RelationNode {
  id: string;
  label: string;
  ganZhi: string;
  scope: RelationScope;
}
export interface GanZhiRelation {
  kind: string;
  members: string[];
  description: string;
}

const PAIRS: Record<string, readonly string[]> = {
  天干五合: ['甲己', '乙庚', '丙辛', '丁壬', '戊癸'],
  天干相冲: ['甲庚', '乙辛', '丙壬', '丁癸'],
  地支六合: ['子丑', '寅亥', '卯戌', '辰酉', '巳申', '午未'],
  地支六冲: ['子午', '丑未', '寅申', '卯酉', '辰戌', '巳亥'],
  地支六害: ['子未', '丑午', '寅巳', '卯辰', '申亥', '酉戌'],
  地支相破: ['子酉', '丑辰', '寅亥', '卯午', '巳申', '未戌'],
  地支相刑: ['寅巳', '巳申', '申寅', '丑戌', '戌未', '未丑', '子卯'],
};

function isPair(value: string, options: readonly string[]): boolean {
  return options.some((pair) => pair === value || pair === `${value[1]}${value[0]}`);
}

export function buildRelationNodes(
  pillars: FourPillars,
  current?: { daYun?: string; liuNian?: string; liuYue?: string },
): RelationNode[] {
  const nodes: RelationNode[] = [
    { id: 'year', label: '年柱', ganZhi: pillars.year, scope: '本命' },
    { id: 'month', label: '月柱', ganZhi: pillars.month, scope: '本命' },
    { id: 'day', label: '日柱', ganZhi: pillars.day, scope: '本命' },
    { id: 'hour', label: '时柱', ganZhi: pillars.hour, scope: '本命' },
  ];
  if (current?.daYun)
    nodes.push({
      id: 'dayun',
      label: '所选大运',
      ganZhi: current.daYun,
      scope: '大运',
    });
  if (current?.liuNian)
    nodes.push({
      id: 'liunian',
      label: '所选流年',
      ganZhi: current.liuNian,
      scope: '流年',
    });
  if (current?.liuYue)
    nodes.push({
      id: 'liuyue',
      label: '所选流月',
      ganZhi: current.liuYue,
      scope: '流月',
    });
  return nodes;
}

export function detectGanZhiRelations(nodes: RelationNode[]): GanZhiRelation[] {
  const relations: GanZhiRelation[] = [];
  for (let left = 0; left < nodes.length; left += 1) {
    for (let right = left + 1; right < nodes.length; right += 1) {
      const a = nodes[left];
      const b = nodes[right];
      for (const [kind, pairs] of Object.entries(PAIRS)) {
        const chars = kind.startsWith('天干')
          ? `${a.ganZhi[0]}${b.ganZhi[0]}`
          : `${a.ganZhi[1]}${b.ganZhi[1]}`;
        if (isPair(chars, pairs))
          relations.push({
            kind,
            members: [a.id, b.id],
            description: `${a.label}${a.ganZhi}与${b.label}${b.ganZhi}见${kind.replace('天干', '').replace('地支', '')}；这里只标结构，不直接判断吉凶。`,
          });
      }
      if (a.ganZhi[1] === b.ganZhi[1] && ['辰', '午', '酉', '亥'].includes(a.ganZhi[1])) {
        relations.push({
          kind: '地支自刑',
          members: [a.id, b.id],
          description: `${a.label}与${b.label}同见${a.ganZhi[1]}，列作自刑结构；不据此单断。`,
        });
      }
    }
  }
  const groups = {
    地支三合: ['申子辰', '亥卯未', '寅午戌', '巳酉丑'],
    地支三会: ['寅卯辰', '巳午未', '申酉戌', '亥子丑'],
  };
  for (const [kind, sets] of Object.entries(groups)) {
    for (const set of sets) {
      const matches = Array.from(set).map((branch) =>
        nodes.filter((node) => node.ganZhi[1] === branch),
      );
      if (matches.every((items) => items.length > 0)) {
        const members = matches.flat();
        relations.push({
          kind,
          members: members.map((node) => node.id),
          description: `${members.map((node) => `${node.label}${node.ganZhi}`).join('、')}齐见${set}${kind.slice(2)}结构；是否成化须另核条件。`,
        });
      }
    }
  }
  return relations;
}
