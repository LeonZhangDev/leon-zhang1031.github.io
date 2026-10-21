export type StudyCategory = '五行' | '八字' | '周易' | '奇门' | '礼仪';

export interface StudySource {
  title: string;
  section: string;
}

export interface StudyKnowledgeEntry {
  id: string;
  term: string;
  aliases: string[];
  category: StudyCategory;
  fact: string;
  rule: string;
  caution: string;
  sources: StudySource[];
  href?: string;
}

export interface StudyAnswer {
  title: string;
  fact: string;
  rule: string;
  caution: string;
  sources: StudySource[];
  related: StudyKnowledgeEntry[];
  refused?: boolean;
}

export const STUDY_KNOWLEDGE: readonly StudyKnowledgeEntry[] = [
  {
    id: 'wuxing', term: '五行', aliases: ['金木水火土', '相生', '相克', '制化'], category: '五行',
    fact: '五行是一套观察变化、分类关系与制约平衡的传统模型，不是五种固定物质。',
    rule: '本站把关系拆成相生与相克两条链，并把方位、季节、颜色等对应作为可核对的研习资料。',
    caution: '传统对应不能替代医学、营养或其他专业判断。',
    sources: [{ title: '《尚书》', section: '洪范' }, { title: '《黄帝内经·素问》', section: '阴阳应象大论' }],
    href: '/jing/yixue/',
  },
  {
    id: 'wood', term: '木', aliases: ['木行', '东方', '春'], category: '五行',
    fact: '木在五行传统对应中常与生发、东方、春季相联。',
    rule: '生火、克土；在本站五行图中点击“木”可同时查看入向与出向关系。',
    caution: '这些是传统分类关系，不等于对个人性格或健康的确定判断。',
    sources: [{ title: '《尚书》', section: '洪范' }, { title: '《周易》', section: '说卦传' }], href: '/jing/yixue/?term=wood',
  },
  {
    id: 'fire', term: '火', aliases: ['火行', '南方', '夏'], category: '五行',
    fact: '火在五行传统对应中常与炎上、南方、夏季相联。',
    rule: '生土、克金；关系图只表达结构，不给出吉凶分数。',
    caution: '传统对应不构成现实决策依据。',
    sources: [{ title: '《尚书》', section: '洪范' }], href: '/jing/yixue/?term=fire',
  },
  {
    id: 'earth', term: '土', aliases: ['土行', '中央', '四季'], category: '五行',
    fact: '土在五行传统对应中常与承载、中央和四时之交相联。',
    rule: '生金、克水；需与其他四行一起理解其关系位置。',
    caution: '不要把单一元素直接等同于个人命运。',
    sources: [{ title: '《尚书》', section: '洪范' }], href: '/jing/yixue/?term=earth',
  },
  {
    id: 'metal', term: '金', aliases: ['金行', '西方', '秋'], category: '五行',
    fact: '金在五行传统对应中常与从革、西方、秋季相联。',
    rule: '生水、克木；本站以相生相克连线展示其结构位置。',
    caution: '传统象类只能用于文化研习。',
    sources: [{ title: '《尚书》', section: '洪范' }], href: '/jing/yixue/?term=metal',
  },
  {
    id: 'water', term: '水', aliases: ['水行', '北方', '冬'], category: '五行',
    fact: '水在五行传统对应中常与润下、北方、冬季相联。',
    rule: '生木、克火；应观察整条关系链而非孤立评价强弱。',
    caution: '传统象类不能替代专业意见。',
    sources: [{ title: '《尚书》', section: '洪范' }], href: '/jing/yixue/?term=water',
  },
  {
    id: 'four-pillars', term: '四柱', aliases: ['八字', '年柱', '月柱', '日柱', '时柱'], category: '八字',
    fact: '四柱以年、月、日、时各配一组干支，共八个字，故又称八字。',
    rule: '本站按立春换年、十二节换月，并把时间制度和晚子时规则明确列出。',
    caution: '盘面用于核对历法与名相，不作人生结果保证。',
    sources: [{ title: '《渊海子平》', section: '论干支与四柱' }, { title: '《三命通会》', section: '卷一' }], href: '/jing/bazi/',
  },
  {
    id: 'day-master', term: '日主', aliases: ['日元', '日干'], category: '八字',
    fact: '日主指日柱天干，是十神关系计算时的参照点。',
    rule: '其他天干与藏干相对日主的阴阳、五行生克关系，构成十神名称。',
    caution: '日主本身不是好坏标签，不能脱离完整盘面作确定结论。',
    sources: [{ title: '《三命通会》', section: '论十干' }], href: '/jing/bazi/',
  },
  {
    id: 'ten-gods', term: '十神', aliases: ['比肩', '劫财', '食神', '伤官', '正财', '偏财', '正官', '七杀', '正印', '偏印'], category: '八字',
    fact: '十神是其他干支相对日主的关系命名，用来压缩表达五行生克与阴阳同异。',
    rule: '同我、我生、我克、克我、生我五类关系，再按阴阳同异分为十项。',
    caution: '十神名称不是人格诊断，也不应直接用于职业、婚姻或健康决策。',
    sources: [{ title: '《渊海子平》', section: '论十神' }], href: '/jing/bazi/',
  },
  {
    id: 'hidden-stems', term: '藏干', aliases: ['地支藏干'], category: '八字',
    fact: '藏干是传统命理中为十二地支配置的一个或多个天干。',
    rule: '本站只展示固定表与其相对日主的十神关系，不额外赋予未经说明的权重。',
    caution: '不同流派可能对余气权重采用不同规则。',
    sources: [{ title: '《三命通会》', section: '论支中藏干' }], href: '/jing/bazi/',
  },
  {
    id: 'nayin', term: '纳音', aliases: ['纳音五行', '六十甲子纳音'], category: '八字',
    fact: '纳音把六十甲子两两配成三十组五行名目，是另一套传统分类层，不等同于四柱干支本气计数。',
    rule: '本站逐柱列出固定纳音表，只作名相对照，不把纳音加入五行数量。',
    caution: '纳音与本气五行采用不同口径，不宜混算后再作强弱结论。',
    sources: [{ title: '《三命通会》', section: '论纳音取象' }], href: '/jing/bazi/',
  },
  {
    id: 'xun-kong', term: '旬空', aliases: ['空亡', '六甲旬空'], category: '八字',
    fact: '六十甲子分为六旬，每旬十组干支，余下两支称为该旬的旬空。',
    rule: '本站按每柱自身所处甲子旬列出两支，仅展示可复核的周期结构。',
    caution: '旬空的具体用法流派差异较大，本站不据此直接下断语。',
    sources: [{ title: '《渊海子平》', section: '论空亡' }], href: '/jing/bazi/',
  },
  {
    id: 'dayun', term: '大运', aliases: ['起运', '顺排', '逆排'], category: '八字',
    fact: '大运是按出生时刻、性别与阴阳顺逆规则，从月柱起排的阶段干支序列。',
    rule: '本站明确显示顺逆、起运偏移、起运日期和采用的起运法；切换规则会重新计算。',
    caution: '大运时间轴只呈现历法结构，不给阶段打吉凶分数。',
    sources: [{ title: '《三命通会》', section: '论大运' }], href: '/jing/bazi/',
  },
  {
    id: 'liunian', term: '流年', aliases: ['岁运', '太岁干支'], category: '八字',
    fact: '流年是逐年的干支索引，本站将其放在所选大运之下便于结构对照。',
    rule: '点击某一流年，只把该年干支加入关系图，不改变本命四柱。',
    caution: '流年干支不是对现实事件的确定预测。',
    sources: [{ title: '《三命通会》', section: '岁运总论' }], href: '/jing/bazi/',
  },
  {
    id: 'ganzhi-relations', term: '干支关系', aliases: ['天干五合', '天干相冲', '地支六合', '六冲', '六害', '相刑', '相破'], category: '八字',
    fact: '干支关系图用于标记盘内及岁运之间的合、冲、刑、害、破等组合。',
    rule: '本站匹配两两关系及齐备的三合、三会，连线与列表一一对应；只标结构，不判断能否成化。',
    caution: '组合出现不等于吉凶结果，成化、旺衰等另有条件且流派口径不同。',
    sources: [{ title: '《三命通会》', section: '论天干地支合冲刑害' }], href: '/jing/bazi/',
  },
  {
    id: 'liuyue', term: '流月', aliases: ['节令月', '月运'], category: '八字',
    fact: '流月按节令月逐月排干支，月份边界以十二节划分，不取农历月初。',
    rule: '本站在所选流年下列十二个节令月；点击某月把该月干支加入关系图，选择全年则移除该层。',
    caution: '月份标签仅作结构对照，不代表该月必然发生某种事件。',
    sources: [{ title: '《三命通会》', section: '论年月日时' }], href: '/jing/bazi/',
  },
  {
    id: 'hexagram', term: '卦', aliases: ['六爻', '本卦', '之卦', '变卦'], category: '周易',
    fact: '六爻自下而上组成一卦；老阴、老阳为动爻，变化后得到之卦。',
    rule: '本站保留铜钱、蓍草、数字、时间与手动五种成卦方式，并公开每一步的取值。',
    caution: '卦象页面只列结构与名相，不替用户作现实决策。',
    sources: [{ title: '《周易》', section: '系辞传' }], href: '/jing/yijing/',
  },
  {
    id: 'moving-line', term: '动爻', aliases: ['老阴', '老阳', '变爻'], category: '周易',
    fact: '在本站的爻值模型中，六为老阴、九为老阳，两者会在之卦中发生阴阳变化。',
    rule: '铜钱法每次三枚钱的数值合计决定一爻，连续六次，自初爻向上爻生成。',
    caution: '动画只是把计算过程可视化，不改变随机结果。',
    sources: [{ title: '《周易》', section: '系辞传' }], href: '/jing/yijing/',
  },
  {
    id: 'bagua', term: '八卦', aliases: ['乾', '坤', '震', '巽', '坎', '离', '艮', '兑'], category: '周易',
    fact: '八卦由三爻组成，是六十四卦上下卦的基本单位。',
    rule: '卦画自下而上读；本站五行页提供八卦名、象与卦画基础对照。',
    caution: '不同注家解释层次丰富，本站只提供基础结构。',
    sources: [{ title: '《周易》', section: '说卦传' }], href: '/jing/yixue/#bagua-reference',
  },
  {
    id: 'qimen-board', term: '奇门九宫', aliases: ['九宫', '奇门', '洛书'], category: '奇门',
    fact: '奇门盘以洛书九宫为空间骨架，再分层安置天地盘、八门、九星与八神。',
    rule: '本站把五层逐层显示，并让拆补、置闰、茅山三派独立起局后同宫对照。',
    caution: '页面呈现的是规则差异，不作吉凶断言。',
    sources: [{ title: '《烟波钓叟歌》', section: '九宫与遁甲歌诀' }], href: '/jing/qimen/',
  },
  {
    id: 'qimen-schools', term: '奇门三派', aliases: ['拆补', '置闰', '茅山', '定局'], category: '奇门',
    fact: '拆补、置闰与茅山法在交节、三元和定局处理上存在规则差异。',
    rule: '本站不把三派结果混合；同一时刻分别计算，再显示同宫结构差异。',
    caution: '派别差异是研习对象，不应用“多数相同”替代规则核对。',
    sources: [{ title: '《遁甲演义》', section: '定局与超神接气' }], href: '/jing/qimen/',
  },
  {
    id: 'ritual', term: '礼敬', aliases: ['礼佛', '敬道', '合掌', '拱手', '跪拜'], category: '礼仪',
    fact: '本站的礼敬动作是传统礼仪的克制示意，重点在动作次序、停顿与回礼。',
    rule: '人物动作与神像分离；神像保持静态，前景人物由状态机切换分帧。',
    caution: '不同宫观、寺院与地区礼仪可能有别，现场应遵从所在场所规范。',
    sources: [{ title: '静心堂动作说明', section: '本地礼仪演示规则' }], href: '/jing/fo/',
  },
] as const;

const HIGH_STAKES = /(癌|疾病|手术|怀孕|死亡|灾祸|官司|犯罪|投资|股票|彩票|借贷|自杀|伤害|药物|停药)/i;

function normalize(value: string): string {
  return value.toLowerCase().replace(/[\s，。！？、：；“”‘’（）()]/g, '');
}

export function getKnowledgeEntry(id: string): StudyKnowledgeEntry | undefined {
  return STUDY_KNOWLEDGE.find((entry) => entry.id === id);
}

export function findKnowledge(query: string, limit = 4): StudyKnowledgeEntry[] {
  const normalized = normalize(query);
  if (!normalized) return [];
  return STUDY_KNOWLEDGE
    .map((entry) => {
      const terms = [entry.term, ...entry.aliases].map(normalize);
      const score = terms.reduce((total, term) => {
        if (normalized === term) return total + 12;
        if (normalized.includes(term)) return total + Math.min(8, term.length + 2);
        if (term.includes(normalized) && normalized.length >= 2) return total + 3;
        return total;
      }, 0);
      return { entry, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.entry);
}

export function answerStudyQuestion(question: string, contextTerms: string[] = []): StudyAnswer {
  if (HIGH_STAKES.test(question)) {
    return {
      title: '这类问题不能由传统术数代替专业判断',
      fact: '问典只解释本站展示的名相、计算规则和典籍线索，不预测疾病、灾祸、诉讼或财务结果。',
      rule: '你可以改问“这个名词是什么意思”“这个结果按哪条规则得出”或“不同流派差在哪里”。',
      caution: '涉及健康、法律、财务或人身安全，请联系相应专业人士；紧急情况请立即联系当地急救或可信任的人。',
      sources: [], related: [], refused: true,
    };
  }

  const matches = findKnowledge(`${question} ${contextTerms.join(' ')}`);
  const primary = matches[0] ?? STUDY_KNOWLEDGE.find((entry) => contextTerms.includes(entry.id));
  if (!primary) {
    return {
      title: '先从一个明确名相开始',
      fact: '问典目前只检索静心堂内置的五行、八字、周易、奇门与礼仪基础资料。',
      rule: '可以尝试询问“十神是什么”“为什么会有动爻”“奇门三派差在哪里”或点击页面中的点线词。',
      caution: '本地问典不联网、不读取手札，也不会替你作吉凶预测。',
      sources: [], related: STUDY_KNOWLEDGE.slice(0, 4),
    };
  }
  return {
    title: primary.term,
    fact: primary.fact,
    rule: primary.rule,
    caution: primary.caution,
    sources: primary.sources,
    related: matches.slice(1, 4),
  };
}
