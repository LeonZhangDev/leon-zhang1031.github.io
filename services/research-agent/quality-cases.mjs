// Curated, versioned evidence fixtures, not new search/extraction results.
// Prices are test inputs; live purchasing decisions must check the original region/date.
export const QUALITY_VERSION = 'quality-v1-20261023';
const source = (id, url, content, read = true) => ({ id, url, content, read, fixture: true, checkedAt: '2026-10-23' });
const tavily = source('tavily', 'https://docs.tavily.com/documentation/api-credits',
  'Search Basic: 1 API credit per request. Extract Basic: 1 API credit per 5 successful URL extractions. Pay-as-you-go: $0.008 per credit. This excerpt does not specify rounding for requests with fewer than five successful URLs.');
const qwen = source('qwen', 'https://help.aliyun.com/zh/model-studio/qwen3-8-flash',
  '华北2（北京），qwen3.8-flash 文本输入：0.8元/百万Token；文本输出：2.7元/百万Token。此处为标准计费测试单价，未假定缓存、Batch或免费额度折扣。');
const make = (id, category, name, question, sources, targets = [], gold = '') => ({ id, category, name, question, sources, targets, gold });
export const QUALITY_CASES = [
  make('C01', 'citation', '正常引用', '比较 Search Basic 与 Extract Basic 的用途及计价单位，引用提供的来源，不补充结算规则。', [tavily]),
  make('C02', 'citation', '未读取来源', '搜索摘要提到了价格，但正文未读取成功。现在能否将其作为已确认价格的来源？说明依据限制，不引用未读页面。', [{ ...tavily, read: false, content: '' }], [], '必须明确无法凭摘要确认；不能引用未读页面。'),
  make('C03', 'citation', '链接真实但推断无依据', '资料说每5个成功URL消耗1 credit。是否足以证明凑满5个再提交更便宜？说明证据边界并引用来源。', [tavily], [], '计价单位不证明按请求取整或批量省费；结论未知，不作凑批省钱建议。'),
  make('C04', 'citation', '中文标点相邻引用', '简述Search Basic的单位，末尾使用一个Markdown来源链接，链接后紧接中文句号。', [tavily]),
  make('M01', 'cost', '百万Token单位', '按给定北京标准单价，20000输入Token和3000输出Token总共多少人民币？列出公式及来源，不假定优惠。', [qwen], [{ value: '0.0241', currency: 'CNY' }]),
  make('M02', 'cost', 'credits与汇率', '假设200次Basic搜索，500个成功URL全部按每5个计1 credit结算，无额外费用，汇率按预算假设1美元=8元。按PAYG参考单价计算credits、美元和人民币，说明这是场景估算。', [tavily], [{ value: '2.4', currency: 'USD' }, { value: '19.2', currency: 'CNY' }]),
  make('M03', 'cost', '用量估算与预留', '某调用10000输入Token、1000输出Token，账本保守预留0.064元，免费额度是否生效未知。计算标准用量费用，并说明它、预留与真实扣款的区别。', [qwen], [{ value: '0.0107', currency: 'CNY' }], '不能将预留当实际账单，不能保证免费或实际扣款等于估算。'),
  make('M04', 'cost', '固定加变量', '纯假设方案：固定20元/月，每请求0.02元，本月1000请求。计算总额，说明这是假设单价而非厂商报价。', [], [{ value: '40', currency: 'CNY' }]),
  make('U01', 'uncertainty', '取整规则未知', '一次Extract只成功1个URL会实际扣多少credit？仅依据提供资料回答，不将每5个的单位换算当作实际扣款。', [tavily], [], '单次实际扣费及取整未知；可列条件计算，但不能确定扣1或0.2。'),
  make('U02', 'uncertainty', '同日期来源冲突', '两份同日的来源对同一Search Basic收费互相矛盾，应采用哪个价格？说明如何核实。', [
    source('conflict-a', 'https://docs.tavily.com/documentation/api-credits', '同日快照A：Search Basic每请求1 credit。'),
    source('conflict-b', 'https://docs.tavily.com/documentation/api-reference/endpoint/search', '同日快照B：Search Basic每请求2 credits。'),
  ], [], '这是人为冲突测试夹具，不代表厂商真实冲突。不能擅自选更便宜的单价或平均；说明冲突与核实方法。'),
  make('U03', 'uncertainty', '网页提取失败', '官方计费页面提取失败，只有搜索标题，是否可以给出已核实的价格及采购建议？', [{ ...tavily, read: false, content: '' }], [], '明确未核实，不编造价格或声称已读取；给出后续验证办法。'),
  make('U04', 'uncertainty', '确认事实与未知分开', '按给定单价，100000输入Token、10000输出Token费用多少？另外，能保证账户最终扣款和下个月单价不变吗？分别回答已知和未知。', [qwen], [{ value: '0.107', currency: 'CNY' }], '当前场景估算可确定；账户实际优惠与未来报价不能保证。'),
];
