# Local Research Agent

## 2026-10-23 修复后完整联网验收

用户授权阶段调额、保留累计 ¥5，并在测试通过后推送源码。共享 `mem0-qwen-v1` 上限现为 **¥1.50**，联网 `tavily-v1` 为 **¥1.20**；沿用原 ID 与全部历史占用，单任务仍最多 **¥0.30**，累计硬上限仍 **¥5**。模板继续默认 ¥0.50/¥0.30，调额须明确获批；离线账本维护只读取预算项，不加载供应商模式或密钥。

- 全新任务 `fcf94986-bc22-4f21-bfc3-3230c639492b` 完成真实 Qwen → Tavily Search → Extract → 缓存原文回读/Skill → 报告保存 **1 次**，随后自动结束、无后续决策。没有以缓存恢复替代本次完整联网任务。
- [LangSmith 完整追踪](https://smith.langchain.com/o/fac47932-b296-4407-a27c-ed9e062e0b7a/projects/p/582f3b46-65dd-4715-9a63-17eeabece8f7/r/fcf94986-bc22-4f21-bfc3-3230c639492b?trace_id=fcf94986-bc22-4f21-bfc3-3230c639492b)：**18/18** run 接收并回读，ID/父子关系一致、无错误，仅含步骤/状态/用量摘要，未上传搜索词、目标、网页正文或记忆。生产上传专用 key 与本机回读 PAT 继续分离。
- 本次成功新增预留 **¥0.2439**。此前新任务 `df8b4eaa-e2a6-48a1-8bba-fab26b664949` 因 URL 紧邻中文括号被误判而失败，预留 **¥0.2093** 与 14 条云追踪均保留。修复引用扫描与 Markdown 自动链接的中文标点边界，仍拒绝未读取/伪造 URL，原报告不改写。
- 全部历史 **122 条费用记录、累计预留 ¥1.1256/5**，余量 **¥3.8744**；共享阶段 ¥0.8348/1.50，联网阶段 ¥0.6974/1.20，原未知用量 1 条保留。模型 usage 估算 ¥0.140954、工具 usage 等价估算 ¥0.192、工具预留 ¥0.384，均非已核对现金账单。
- Windows **139/139**、Ubuntu **136/136**、离线评测 **20/20**；Markdown 修复另有 Chrome **3/3**。合并远端性能优化后站点构建 **211 页**。线上报告/GFM、来源、下载、手机及退出保护另有浏览器证据。
- 历史生产行逐项哈希保留；本地仅追加 2 个任务、14 条模型费用、4 条工具费用和 2 条派发，258 条原行与配置不变，SQLite 完整性/外键通过。生产仍为唯一付费执行处，本机默认离线。

最终源码目录 `tavily-full-flow-20261023` 继承成功任务运行代码，另含已离线验证的 Markdown 链接修复，不为渲染/文档再次付费调研。单场景流程通过不代表广泛答案质量已验收；报告批量提交建议与未知取整规则仍有张力，费用建议须人工核实。人工云 UI/额度与供应商账单未验收，置信度 B。证据与备份见 [发布记录](deployment/README.md#2026-10-23-full-flow-release)。以下均为历史阶段记录，额度及未完成事项按当时状态理解。

## 2026-10-23 Tavily 真实验证与上线

用户追加授权后，后端 `tavily-28394ed3d986` 已在现有 [私人工作台](https://leonzk.cn/p7x4m9q2-k6v8n3r5-t2w9c4h7/) 提供服务，启用 Qwen 决策、Qwen 记忆、Tavily Basic 和摘要云追踪。本地配置与普通启动仍离线；生产是唯一付费执行处。没有修改公开博客、站点代理或 Artalk 配置。

- 用户将 key 放在原配置的 `tavily_api` 项；本轮仅在私有传输时映射为服务器 `TAVILY_API_KEY`，原 `.env.local` 未改、key 未打印或提交。账户 `/usage` 返回 Researcher 免费计划、初始 1000 credits；API 的按量上限为 null，不能据此推断关闭。用户随后明确确认自动付费关闭，才发起真实工具调用。
- 原任务 `8a35b99d-8745-4a55-8cfb-64479b822fdd` 完成 1 次 Search 和 1 次 Extract，取得官方计费页。8 次 Qwen 决策包含多次重复加载 Skill；随后请求未观察到的 URL，被权限校验在传输前拦截，任务失败。原失败结果和 17 条追踪完整保留；没有放宽来源规则。
- 修复 `qwen-provider.mjs`：已加载 Skill 不再出现在可选工具中；修复 `AgentRunner.run`：已有有效证据时，首次非法/重复 URL 转为安全工具错误，下一轮只可 `save_report`，继续受原预算约束。无证据、重复违规或其他动作仍停止。新增两项离线回归证明无额外网页传输，保存一次即结束。
- 缓存恢复任务 `fdbde5e4-9ca3-472d-bb17-2b8a12f18a0e` 只复用原任务已付费取得的证据，单次真实 Qwen 返回 `save_report` 并结束；新搜索/提取/记忆请求均为 0。该维护验证不等同于修复后重新跑通一次完整联网循环。单一计费页足以验证传输/缓存/保存，报告关于“凑满 5 个可避免零头”的推断未获资料证实，不能作为采购依据。
- 原 20 条、新失败任务 17 条及恢复任务 4 条 run 均用本机 PAT 成功回读，并核对摘要字段；生产保留原 Tracing Only 上传 key。云端仅含步骤、父子关系、状态、Token 和工具 credits/等价预留，不含查询、记忆、网页或报告正文。[恢复追踪](https://smith.langchain.com/o/fac47932-b296-4407-a27c-ed9e062e0b7a/projects/p/582f3b46-65dd-4715-9a63-17eeabece8f7/r/fdbde5e4-9ca3-472d-bb17-2b8a12f18a0e?trace_id=fdbde5e4-9ca3-472d-bb17-2b8a12f18a0e)。
- 本轮全部新增保守预留 **¥0.2442 / ¥0.30**；原固定验证批次 **¥0.3816 / ¥0.50**；全部历史 **¥0.6724 / ¥5**，104 条费用记录、含原 1 条未知用量。模型 usage 估算累计 ¥0.097982；工具 usage 等价估算 ¥0.064，保留预留 ¥0.128，不以免费或延迟扣点退款。这些不是已核对的现金账单。
- 剩余首次联网额度 **¥0.0558**，低于一次搜索等价预留 ¥0.064，新搜索会在传输前被预算拒绝。没有提高、重置或挪用其他预算。后续完整调研须另行明确追加额度，不能切换数据目录规避限制。
- 新源码 44 文件 SHA-256 核对；Windows **136/136**、Ubuntu **133/133**（3 个 Chrome 用例在 Windows）、隔离模拟评测 **20/20**、外部调用/费用 0。实际线上 Chrome 验证报告、引用、Markdown 表格与源文、下载、390px 无页面溢出及退出后 API/报告 401；查看报告阶段无浏览器错误，后续故意访问受保护接口的 401 属预期。首页可正常打开。候选环境因 SSH 禁止转发，使用服务器 HTTP 测试验收；不宣称候选 Chrome 已通过。
- 原生产任务、模型/记忆调用等历史行逐一哈希保留。原本地账本只追加 2 条任务、9 条模型调用、2 条工具调用和 2 条云派发，243 条原数据及配置不变，SQLite 完整性和外键通过。保留调用未知状态、失败历史及所有原价格快照。

证据目录：`.tmp/tavily-release-20261023/`；截图：`output/playwright/`。备份与回退见 [部署记录](deployment/README.md#2026-10-23-tavily-release)。上线与真实工具/追踪链已验证；完整修复后联网循环、广泛检索质量、云端人工 UI/账号额度和供应商账单未验收，置信度 B。以下为此前阶段记录，其“尚未启用”按当时状态理解。

## 2026-10-23 Tavily 本地接入，历史阶段

本轮仅完成接入代码、配置模板和离线验收；没有调用 Tavily/Qwen/embedding、上传 LangSmith 或部署。生产仍为此前版本的合成搜索/网页工具。沿用现有发布工作区，未覆盖主目录的其他未提交修改。

### 配置与启用边界

在 [`.env.example`](.env.example) 查看新增项，自行将 `TAVILY_API_KEY` 填入被 Git 忽略的 `.env.local`，不要把密钥发到聊天。已有配置文件和数据目录本轮没有修改。模板内继续保留：

```dotenv
AGENT_TOOLS_MODE=mock
TAVILY_API_KEY=
TAVILY_PRICING_CONFIRMED=false
TAVILY_FREE_TIER_CONFIRMED=false
AGENT_WEB_VALIDATION_BUDGET_YUAN=0.3
```

只填密钥不会联网。普通 Windows 启动器与 `--offline` 强制模型/记忆/工具/追踪全部离线；`AGENT_TOOLS_MODE=tavily` 还需要独立 `--allow-web-tools`，已授权的 Qwen 配置及 `--allow-model-calls`。确认开关仅表示人工已核对免费额度、关闭按量付费；代码不会查询、修改账户套餐或自动充值。当前不要打开这些开关。

后续真实验证必须再次获批，并继续以保留历史数据的生产账本作为唯一费用权威；不允许本机新空库与线上同时付费消费。LangSmith 和 Qwen 记忆仍有各自独立授权开关，本轮全部关闭。首次验证最多 1 次搜索、2 个网页、12 轮决策；配置在启动时读取，不热启用。

### 工具、来源与追踪

- `search` 调用固定 `https://api.tavily.com/search`，Basic、5 条结果、关闭 `auto_parameters`、回答生成、原文和图片；Qwen 内置联网继续关闭。搜索摘要只是候选，不算成功读取。
- `read_page` 调用固定 `/extract`，单 URL、Basic、Markdown、提取超时 10 秒；外层 20 秒、响应最多 1 MiB、无重试和重定向。HTTP200 仍检查 `results`/`failed_results`、URL 对应及非空正文。不同返回 URL 拒绝，不猜测重定向别名。
- 仅读取当前搜索观察到的公开 HTTPS DNS 名称；拒绝凭据、非标准端口、IP、内网/保留名称和敏感查询参数。服务器不直接请求结果 URL；此输入校验不宣称已经审计 Tavily 的 DNS 或重定向链。登录/验证码/提取不支持的页面明确失败，不启动浏览器或补造模拟正文。
- 一份来源保存正文、抓取时间、哈希与来源 ID；模型只收到最多 6000 UTF-8 字节的明确截断摘录。原文留在本地事件与状态中，`read_evidence` 可回读；同任务缓存不重复付费。硬上下文上限不足则停止，不能保证任意长网页都能完成报告。
- 只允许引用成功读取的 URL；网页不能授权写记忆、改配置或扩大预算。报告一次保存即终止。任务、页面和追踪按实际模式标记；原模拟模式保留用于回归，失败不会悄悄切回模拟资料。
- LangSmith 默认仅本地记录。将来获批的云端摘要只增加工具 credits、等价预留、耗时和状态，不包含搜索词、网页正文、密钥或记忆；API 接收与云端回读继续区分。

### 保留预算与计价

新增 `tool_calls` 表，不重算或改写旧模型、记忆、未知费用记录。工具调用与 Agent/记忆请求共用 SQLite 事务预留，仍不退款：累计 **¥5**、原固定 `mem0-qwen-v1` **¥0.50**、新增固定 `tavily-v1` **¥0.30** 三项同时约束；Tavily 模式下的独立记忆操作也计入 ¥0.30，重启或新任务不清零。账本导出改用 v2，包含工具记录，避免旧读入器默默漏算；新读入器兼容原无工具记录的 v1 包，冲突/超限/关联缺失仍拒绝。后续发布/回退须保留识别工具费用的计费读取逻辑。

2026-10-23 核对的 [Tavily 计价](https://docs.tavily.com/documentation/api-credits)：免费 1000 credits/月；按量价 USD0.008/credit，Search Basic 1 credit/次，Extract Basic 每 5 个成功 URL 1 credit。[Extract](https://docs.tavily.com/documentation/api-reference/endpoint/extract) 的 `usage.credits` 可能延迟累计，因此每次搜索/读取均按完整 1 credit 预留，采用预算换算 8 CNY/USD，即 **¥0.064/次**；即便免费额度或返回 0，也不退占用。这是等价保守预算，不是现金账单。价格/免费额度需在真实验证前重新确认。

一次搜索＋两页读取预留 **¥0.192**，模型/embedding 规划约 ¥0.10，总额在 ¥0.30 内；模型逐次仍按真实请求的保守边界预留，余额不足会提前停止。本轮沿用上轮已核对的历史占用 ¥0.4282/5、¥0.1374/0.50；未连接生产重查余额、未产生新真实费用。

### 离线验收

```sh
# 在当前工作区，使用 Node >=22.22.0；全部供应商响应由本地桩提供。
node --test services/research-agent/tests/*.test.mjs
node services/research-agent/evaluate.mjs
# 安全本地演示；不要执行历史真实验证命令。
node services/research-agent/server.mjs --offline
```

供应商网络在新增测试中禁止；临时数据库相互隔离。覆盖授权、Basic 请求参数、URL/引用边界、完整原文回读、空/失败/超大响应、401/429、超时/取消、未知费用、credits 越界锁、三层预算、重启及账本转移、保存即结束和摘要脱敏。浏览器验收同样使用假供应商响应，不能证明 Tavily 从腾讯云的可达性、实时提取质量或供应商账单。

2026-10-23 最终证据（Node v24.19.0）：服务测试 **134/134**，其中包含 27 项 Tavily 专项和新增 Chrome 联网模式页面验收；隔离模拟评测 **20/20**，`external calls=0`、`actual cost=0`；PowerShell 启动器解析和 `git diff --check` 通过。原配置/数据 **4/4** 文件 SHA-256 不变。新增依赖为零；仅从本机缓存离线安装本工作区既有锁定依赖以恢复 Mem0 测试环境。范围对齐本轮本地授权，模拟工具保留作离线回归；真实可达性、资料质量、云端上传和上线未覆盖，置信度 B。

- [完整测试输出](../../.tmp/tavily-offline-20261023/service-tests.txt)
- [离线评测摘要](../../.tmp/tavily-offline-20261023/evaluation.txt)
- [原文件哈希核对](../../.tmp/tavily-offline-20261023/protected-files-result.json)

## 2026-10-22 新版生产验收

已获用户追加上线与摘要追踪授权，新版后端 `mem0-a8784daf9571` 已通过现有网站私有路径提供服务。服务器保留原密钥和密码，启用 `qwen / qwen memory / cloud` 三个独立开关；本机 `.env.local` 与普通离线启动方式不变。Mem0、上下文管理、3 个 Skills 和 Markdown 渲染已部署，无需改动公开博客内容或随机入口。

- Windows 服务回归 **106/106**，Ubuntu **104/104**（浏览器两例在 Windows Chrome 执行）；生产源码 42 个文件逐一 SHA-256 核对。
- 线上真实任务 `e81dc395-911b-45f6-969d-77bf71300a82` 使用已确认记忆、3 个 Skills 和上下文管理；9 次 Qwen 决策后保存一次报告并结束。记忆召回参与真实任务，本次上下文未达到压缩阈值；压缩边界仍由离线回归覆盖。
- LangSmith 接收 **20/20** run，HTTP 202，包含 `memory.recall`，只上传结构和计数；本地保存接收状态，未上传用户记忆、目标或报告正文。当前密钥已确认是 **Tracing Only**，仅可上传，读取项目返回 **403** 属预期权限限制。此类密钥不能修改权限；线上保留该密钥，本机需另建个人令牌（PAT）才可回读。云端页面、账户免费余额和供应商账单仍未验收，不能把 API 接收说成回读成功。
- Chrome 验证了候选确认前不启用、确认后用于任务、Markdown 表格/源文/下载、390px 布局、退出和 401 保护。测试记忆已删除、临时会话已撤销，浏览器错误为 0。首次浏览器脚本误用默认 30 秒等待而超时；保留失败记录，修正等待参数后只回看同一已完成任务，没有重复付费调研。
- 本次发布验证新增 usage 估算 **0.019066 元**、保守预扣 **0.1052 元**。连同前轮 Mem0 验证，固定验证批次累计 **0.1374 / 0.5 元**；所有历史累计 **0.4282 / 5 元**，93 次请求，原 1 次未知用量仍完整保留。原服务器 230 条数据逐行哈希不变；原个人记忆未迁移。
- 发布前后使用 `ledger-transfer.mjs` 双向补齐调用账本，原本地和生产已对齐上述余额。合并不覆盖目的库已有任务、密码、会话或调用，不转移真实记忆内容。生产是后续真实调用的唯一执行处；本机继续离线，避免分叉账本同时消费。

详情与截图见 [生产验收证据](../../.tmp/agent-final-release-20261022/browser-final-receipt.json)。服务连接关闭会中止付费记忆请求；模拟决策配真实记忆时，界面也按记忆 usage 显示费用。

### LangSmith 回读凭据

在 [Settings → API Keys](https://smith.langchain.com/settings) 新建 Personal Access Token（Personal），用于本机回读现有项目；PAT 继承登录用户权限。将其自行填入本机 `LANGSMITH_API_KEY`，不要提交或发到聊天，生产继续保留原 Tracing Only key。免费 Developer 版无需企业 RBAC 设置；Tracing Only key 无法增加读取权限。原 endpoint/project 保持不变；跨 workspace 密钥须填对应 `LANGSMITH_WORKSPACE_ID`。只回读已有任务，无需重新调用 Qwen。参见 [密钥类型](https://docs.langchain.com/langsmith/create-account-api-key)、[权限说明](https://docs.langchain.com/langsmith/rbac)。

### 保留账本的转移

这些命令只访问本地 SQLite，不调用模型或 LangSmith。先停止相关服务并做一致性备份；不复制 `.env.local` 或整个数据库来覆盖目的库。

```sh
node ledger-transfer.mjs export DATA_DIR PRIVATE_LEDGER_JSON
node ledger-transfer.mjs inspect TARGET_DATA_DIR PRIVATE_LEDGER_JSON
node ledger-transfer.mjs import TARGET_DATA_DIR PRIVATE_LEDGER_JSON --apply
```

导出文件含私有任务，须放在静态站和 Git 之外。默认 `inspect` 只读，导出不覆盖已有文件；导入遇到运行中工作、记录冲突、缺失关联或预算越界会拒绝。相同 ID 幂等合并，未知预扣和预算锁不释放；不改旧报价。数据结构不符时先检查，不要编辑 ID 或另建批次绕过限制。

## 2026-10-22 Mem0 真实验证，本地完成

用户授权后的真实验证已完成：Mem0 OSS `3.3.1` 使用原百炼通用地址，Qwen3.8-Flash 抽取、text-embedding-v4 / 1024 维向量。3 条候选均有原文依据；确认前不参与召回，确认 2 条、丢弃 1 条，重启与删除隔离通过；无明确偏好的文本没有生成候选。默认模式及原 `.env.local` 未改，没有上传 LangSmith 追踪或部署。

初评发现阈值 0.65 使 3 条相关记忆被过滤（10 条命中 7 条），目标未过滤时均排第一。复用真实向量离线校准，将代码默认值及模板改为 **0.55**，再锁定另一组查询复验：**10/10** 命中且均排名第一，**5/5** 无关查询被拒绝。这是合成小样本结果，不能视为通用召回保证。完整服务测试 **101/101**，包含本机 Chrome 既有离线界面流程；真实记忆链路由服务层验证。

本轮 46 次请求（抽取 2、embedding 44），usage 估算 **0.000898 元**，保守预扣 **0.0322 / 0.5 元**；历史累计预扣 **0.3230 / 5 元**。调用前只读核对服务器账本，将本地缺失的 14 条历史调用及 4 条关联任务按原 ID 补齐，未覆盖原记录；原 112 条数据及配置哈希不变。原 1 次超时的未知用量预扣继续保留，未核对供应商账单。

合成记忆使用独立向量库，真实调用仍写入原累计费用库。服务器前后调用和云端派发记录不变。未来在服务器恢复真实调用前，须合并本轮新增本地账本，不能仅使用旧服务器余额。备份、逐题结果、初评失败与费用证据见 [验证报告](../../.tmp/mem0-qwen-live-20261022/report.md)。置信度 B；生产版本、原用户语义记忆迁移和更大样本质量不在本次验收内。

## 2026-10-22 Qwen memory adapter preparation

以下是此前接入准备阶段的记录：当时新增代码、模板和离线测试，**未调用真实模型、上传追踪或更新线上**。不要用模板覆盖已有私密配置，也不要用新数据目录重新开始真实验证。最新授权验证及累计费用以上一节为准。

### Configuration and authorization

| 配置 | 默认值 | 作用 |
| --- | --- | --- |
| `AGENT_MEMORY_MODE` | `offline` | `offline` 使用模拟向量；`qwen` 需独立显式参数 `--allow-memory-model-calls` |
| `MEMORY_LLM_MODEL` | `qwen3.8-flash` | 抽取候选偏好，非思考/非联网/JSON，输出最多 512 Token 加 10 Token 计费余量 |
| `MEMORY_EMBEDDING_MODEL` | `text-embedding-v4` | 本轮固定模型，不自动替换或降级 |
| `MEMORY_EMBEDDING_DIMENSIONS` | `1024` | 本轮固定维度；不发探测向量请求 |
| `MEMORY_RECALL_THRESHOLD` | `0.55` | 经本地真实小样本校准；更换模型或扩大数据时需复评 |
| `MEMORY_PRICING_CONFIRMED` | `false` | 未来核价并授权测试后才能设置 true |
| `AGENT_VALIDATION_BUDGET_YUAN` | `0.5` | 新增验证上限，最多 0.5 元，包含在原 5 元累计预算内 |

复用现有 `DASHSCOPE_API_KEY` 与 `QWEN_BASE_URL`，不需要 Mem0 Cloud 或 OpenAI 密钥。保留现有密钥，不打印、不复制到前端。`AGENT_MODE`、`AGENT_MEMORY_MODE`、`AGENT_TRACE_MODE` 的授权互相独立；普通启动器以及 `npm run start:offline` 均强制模型 mock、记忆 offline、追踪 offline，即使配置已填写也不会启用真实请求。本次未修改 `.env.local` 或传入任何真实启动授权参数。

### Memory and billing decisions

- Mem0 OSS 固定为 `3.3.1`，保留 SQLite 扩展。真实向量独立存于 `memory-qwen-text-embedding-v4-1024-v1.sqlite`；旧 `memory-offline.sqlite` 保留，不自动迁移、重新嵌入或上传原记忆。索引记录模型/维度版本；模型或维度不符直接拒绝，不混用同维度的不同模型。
- 明确提交/`记住：` 使用 Mem0 `infer:false`，只付向量化费用。用户点击“提取候选记忆”时，通过绑定到 Mem0 的 Qwen LLM 接口抽取最多 3 条；必须是输入中连续原文，保存原文依据，候选默认禁用。用户确认后才参与召回，丢弃会删除候选；网页/报告/工具结果不自动入库。当前任务约束仍优先。
- 应用拥有抽取与确认流程，避免原生 `infer:true` 在 SDK 内修改事实、忽略格式错误或执行批量失败回退。初始化扩展绑定最小 LLM 接口，无需添加 `@langchain/core` 来转换消息；真实 Mem0 SDK 契约及重启由离线测试覆盖。SDK 升级前必须重跑这些测试。
- `paid-client.mjs` 是 Agent 与记忆唯一付费 HTTP 入口，请求前预留完整输入 UTF-8 字节上界和最大输出费用；所有 SDK 派生 embedding 也通过该入口。聊天 60 秒、embedding 30 秒、零 HTTP 自动重试、拒绝重定向。单操作失败后锁住该操作的后续子请求，阻止 SDK 兜底再付费。
- embedding 每条使用保守 8192 字节上界，按最多 10 条分批，检查返回索引、数量、维度、有限数值和非零向量。只在单次操作内去重缓存，结束即清除；查询/编辑/辅助实体请求都受预算保护。修改仅元数据时 SDK 仍可能向量化，也会记账。
- 原 `model_calls` 不改写。新增 `memory_operations` / `memory_model_calls` 处理页面独立记忆操作，并关联可选任务；累计账本合并两张调用表。所有新 Agent/记忆请求标记固定 `mem0-qwen-v1` 验证批次，事务同时检查累计 5 元、本轮 0.5 元和关联任务上限。历史未标记请求只计入原累计额度，旧模型报价及未知用量保留。重启、切换模式、降低再恢复配置均不清零；没有重置入口。
- 超时、取消、HTTP 错误、缺少 usage 保留全额预扣；usage 越界锁住后续所有模型调用。已知 usage 即使输出格式不合格也记录。模型名、用途、维度、报价快照、请求 ID、用量保存在本地，不存 API key 或请求正文。总账是本 Agent 的保护措施，不能限制其他程序或服务器旧副本的消费；真实验证前需核对权威账本，不能同时使用分叉账本。
- 未来真实请求会将选定记忆文本/查询发送百炼，抽取只发送用户主动提交的片段；Mem0 存储、原始报告和追踪留在本地。遥测强制关闭；上下文仍采用原离线摘录压缩。LangSmith 云端开关未改变且本次没有启用。

北京标准报价快照（2026-10-22）：Qwen3.8-Flash 输入/输出 0.8/2.7 元每百万 Token，text-embedding-v4 输入 0.5 元每百万 Token。5 万聊天输入、8000 输出和 2 万 embedding 输入约 0.0716 元；不假设免费额度或缓存折扣。保守预扣通常更高，新增请求不得超过 `min(0.5, 5 - 历史保守预扣)`。来源：[价格](https://help.aliyun.com/zh/model-studio/model-pricing)、[embedding 接口](https://help.aliyun.com/zh/model-studio/text-embedding-synchronous-api)。

### Validation boundary

运行 `npm test` / `npm run evaluate` 只用独立临时库、合成响应与被拦截的供应商传输。本地 Chrome 验证候选确认和默认离线禁用状态；不会验证真实模型权限或真实语义召回效果。未来获准后按“最小聊天+向量请求 → 小样本语义评测 → Agent 闭环”逐段验证；不自动上传历史记忆或云端追踪。真实语义目标是 10 条预标注换说法查询 Recall@5 至少 90%，并检查无关查询拒绝、原文支持、删除隔离及预算；当前测试的合成向量不构成该质量验收。

本次最终验证：服务测试 **100/100**（含本机 Chrome 默认离线及候选确认流程），离线评测 **20/20**；评测外部调用 0、费用 0；原配置及 SQLite/WAL/SHM **4/4** SHA-256 不变。完整测试结果和原文件哈希保护证据见 [项目进度](../../docs/progress.md)。离线接入验证结论为 B，真实权限、语义质量和生产验收待确认。下方记录属于前一次升级及历史生产版本。

## 2026-10-22 local memory and context upgrade

本次升级只在本地实现和离线验证，**尚未更新线上版本**。原有 `.env.local`、密码、任务数据和首次 5 元累计预留账本不迁移、不重置；下方历史上线记录仍属于旧版本。

- **Mem0 OSS**：固定 `mem0ai@3.3.1`，使用 `mem0ai/oss`，不使用托管记忆 API，加载前强制关闭遥测。Mem0 的新增、召回、修改、删除使用本地 SQLite 存储扩展；SDK 初始化和实体存储扩展点有契约测试，升级 SDK 必须重跑这些测试。长期记忆以 `memory-offline.sqlite` 中的向量和正文为准；`agent.sqlite` 保留任务、费用及当次召回快照，便于重现历史结果。记忆审计仅保存 ID、动作、时间和内容哈希。
- **主动记忆**：任务开始前主动召回最多 5 条；只保存你在记忆面板明确提交的内容，或目标/约束中单独一行的 `记住：内容`。自动去重，不把网页、报告或模型推测当作用户事实。面板支持用户/项目范围、编辑、停用、删除和总开关，最多 200 条。当前是单站长、单调研项目，范围是用途标签，尚无多用户登录体系；不同 SDK user/agent 命名空间有隔离测试。删除只删除长期记忆，不改写原始任务记录。
- **离线边界**：当前使用确定性字符特征向量，验证持久化和召回链路，**不是实际语义模型**。Mem0 设置 `infer:false`；提取 LLM 入口直接拒绝调用。Qwen embedding、记忆自动抽取和语义压缩尚未启用，也不能绕过费用账本。`AGENT_MEMORY_MODE` 只接受 `offline`。未来接真实记忆模型需要另行核定单价、接到同一个预留账本并取得验证授权。
- **上下文**：固定保留目标、约束、当前状态与停止标记；先去重网页正文和工具记录，保留最近两条动作。达到输入保守边界的 70% 时从原文生成结构化摘录，85% 时标记紧急压缩。尽量缩至 55% 以下，但数字、单位、冲突和未知事项优先，不能满足硬上限时停止请求。使用 UTF-8 字节上界与协议余量，不声称这是实际 token 数；Qwen 发送前仍对完整请求独立核验 24,000 上限并预留费用。
- **压缩可追溯**：摘要带版本、覆盖动作数、来源 ID、哈希、数字原句及错误；保存到任务事件。每次从原始事件重建，避免反复总结旧摘要。`read_evidence` 从本任务原始缓存分段恢复页面；不再访问网页、不放宽 URL 白名单。本次只有确定性摘录压缩，调用压缩模型次数为零。
- **Skills**：`skills/` 中有技术比较、官方来源核查和成本估算 3 个可信 `SKILL.md`。根据目标加载正文，记录版本和哈希；`load_skill` 只能加载注册项。Skills 是流程说明，不能改变工具权限、预算或报告保存即终止的规则。没有新增 MCP 或任意代码执行入口。
- **Markdown**：本地提供 Marked + DOMPurify，不访问 CDN。支持 GFM 表格、嵌套列表、任务清单、代码块、引用、强调与 HTTPS 链接；预览/源文切换，整篇复制、代码复制和原文下载。原始 HTML 显示为文本，远程图片不加载，危险链接被移除；表格可横向滚动。

### Safe local startup and verification

```sh
# 服务目录，Node >=22.22.0；即使原配置为 qwen/cloud，也强制本次 mock/offline。
npm run start:offline
# 仓库根目录
npm run agent:test
npm run agent:evaluate
```

不要使用历史真实验证命令来验收本次升级。离线测试强制 mock/offline，只用独立临时目录，不打开原始账本。CLI 子进程烟测会加载本地配置，但模型模式、追踪模式和数据目录由测试覆盖，不发送密钥或业务数据。浏览器测试默认使用本机 Chrome；可设置 `AGENT_TEST_BROWSER_CHANNEL=msedge`，不会自动下载浏览器。启动离线服务本身会沿用配置的数据目录；如需独立演示，在终端设置 `AGENT_DATA_DIR` 为新目录，保留原目录。

记忆接口 `GET/POST api/memories` 需要原有会话；写操作要求同源。POST 动作包括 `add`、`update`、`toggle`、`forget` 和 `set-enabled`。前端行动记录展示召回、已选 Skills 与压缩事件，报告区展示本次使用的记忆和上下文指标。

### Offline verification receipt

2026-10-22：Node v24.19.0，服务测试 **74/74** 通过（含本机 Chrome 的登录/记忆/GFM/复制/下载/XSS/390px 流程），离线评测 **20/20** 通过，真实模型和追踪上传调用为零。原 `.env.local`、`agent.sqlite` 及 WAL/SHM 共 **4/4** 文件 SHA-256 与升级前一致；未清空或重置累计预算。

- 完整测试输出：[verification-tests.txt](../../.tmp/agent-upgrade-20261022-203230/verification-tests.txt)。
- 隔离评测：[results.json](../../.tmp/research-agent-eval-MDzjGk/results.json)。
- 仍未覆盖：真实 Qwen 语义 embedding、LLM 记忆抽取与语义压缩效果；新增功能的生产部署和线上验收。这些入口继续关闭。

## Previous release baseline

本地入口：`http://127.0.0.1:4322/p7x4m9q2-k6v8n3r5-t2w9c4h7/`。
默认模型、搜索、网页为合成响应，LangSmith SDK 的请求在本地拦截记录。
已接入百炼 Qwen 和 LangSmith 云端适配器。2026-10-22 修复保存报告后的重复操作，追加一次授权真实验证，
8 次模型调用后成功完成，17 条摘要追踪均获 HTTP 202。本地默认仍为 mock/offline。
线上入口已发布：<https://leonzk.cn/p7x4m9q2-k6v8n3r5-t2w9c4h7/>，服务器启用 qwen/cloud。
线上验收任务在 4 次模型调用后完成、只保存一次报告，9 条摘要追踪获 API 接收。
累计模型预扣 0.2908 元、已知 usage 估算 0.053245 元；其中 1 次超时请求用量未知，预扣未退。
首次累计上限仍为 5 元；供应商账单、LangSmith 免费余额和页面回读尚未核实。

## Start

Windows 可双击仓库根目录 `start-research-agent.cmd`。启动器选择 Node >=22.22.0；
系统 Node 过旧时尝试使用已安装的 Codex Node runtime。终端显示入口后用浏览器打开。
首次访问自行设置至少 6 字符密码，没有默认密码。此规则按用户要求用于本机实验。

其他环境使用 Node >=22.22.0，在仓库根目录执行：

```sh
npm --prefix services/research-agent ci --ignore-scripts
npm run agent:dev
```

首次安装依赖需要网络；启动、模拟任务和验证不需要供应商凭据，不产生真实 API 费用。
停止服务按 Ctrl+C；本地记录保留，再次启动沿用原密码。

## Verify

```sh
npm run agent:test
npm run agent:evaluate
```

评测每次在 `.tmp/research-agent-eval-<random>/` 生成独立 SQLite、JSON 与 Markdown 结果。
模拟器不能针对任意技术问题得出可靠事实；目前的固定资料用于验证决策循环和异常处理。
接入测试使用注入的假 HTTP 响应，不访问百炼或 LangSmith。独立真实验证的接口接收已确认；
保存后结束逻辑已通过离线及真实模型验证；云端回读及页面展示尚未验收，见下方验证记录。

## Fill local configuration

填写本目录被 Git 忽略的 `.env.local`。已从空白模板准备好；文件存在时不会覆盖。
可提交和参考的是 [`.env.example`](.env.example)，不要提交 `.env.local`，不要把密钥贴到聊天或前端。
服务只在启动时读取此文件；修改后需重新启动，已有进程不会自动启用新配置。

| 配置 | 你需要填写的内容 |
| --- | --- |
| `DASHSCOPE_API_KEY` | 阿里云百炼北京地域的模型调用 key |
| `QWEN_BASE_URL` | 使用已选北京通用地址 `https://dashscope.aliyuncs.com/compatible-mode/v1`；也接受原北京业务空间 MaaS 地址 |
| `QWEN_MODEL` | 使用已选 `qwen3.8-flash`；按精确模型名匹配代码内的核定报价，未知模型拒绝真实模式 |
| `LANGSMITH_API_KEY` | LangSmith Developer 个人组织的 tracing key，优先仅追踪权限 |
| `LANGSMITH_ENDPOINT` | 当前适配器限定 GCP US：`https://api.smith.langchain.com`；账户若属其他区域先告知，不要直接换地址 |
| `LANGSMITH_PROJECT` | 已填 `private-research-agent-dev`，也可填写同 workspace 的开发项目名 |
| `LANGSMITH_WORKSPACE_ID` | key 涉及多个 workspace 时必填；单 workspace 可留空 |

现在只需填 key、百炼地址及必要的 LangSmith workspace 信息。使用通用地址无需将百炼业务空间 ID 拼入 URL。
保留 `AGENT_MODE=mock`、`AGENT_TRACE_MODE=offline`，
两个 `*_CONFIRMED=false` 不变。`LANGSMITH_TRACING=true` 或仅填写 key 都不会开启网络调用。
普通双击启动器始终强制 mock/offline；直接运行 Node 时，配置改为真实模式但缺少显式参数会拒绝启动。

## Future validation, after user confirmation only

以下适用于后续另行获批的真实验证；普通启动不启用这些模式。无需开通额外部署、搜索 API 或自动裁判模型。

1. 核对百炼北京 key/模型权限、当前单价；LangSmith 选择 Developer，核对剩余免费额度，关闭超额付费。
   本地无法核对整个账号已用额度；本服务的 20 条试验 trace 上限不能替代账户免费额度检查。
2. 获得用户确认后，将 `QWEN_PRICING_CONFIRMED=true`、`AGENT_MODE=qwen`；先保留 tracing=offline。
   显式运行 `node services/research-agent/server.mjs --allow-model-calls`，再手动发起一个合成资料任务。
   启动本身不会调用模型；工具仍为模拟资料，报告显著标注“未联网调研”。
3. 云端上传还需单独确认：设 `LANGSMITH_FREE_TIER_CONFIRMED=true`、`AGENT_TRACE_MODE=cloud`，并增加
   `--allow-cloud-traces`。也可先仅用 mock 模型验证合成 trace；不会补传旧历史。
4. 检查状态、真实 usage、累计预算预留，以及 LangSmith 页面父子 run 是否出现；API 返回成功只记为
   `cloud-api-accepted`，不宣称云端页面已经人工验收。首次验证后恢复 mock/offline。

每个 Qwen 请求：非思考、非流式、内置联网搜索关闭、60 秒超时、不自动重试、不跟随重定向。
`qwen3.8-flash` 使用 `max_completion_tokens=1200` 限制完整输出；按官方最多 10 Token 的误差，预算预留和 usage 校验上界为 1210。
最多 12 轮决策，Qwen 任务总时长 180 秒。输入按完整请求 UTF-8 字节数加协议余量作保守 Token 上界，超过 24000 就停止。
请求发出前预扣保守费用；累计不超过 **5 元**，单任务同时受页面预算（最多 2 元）限制。
预扣不退款，即使超时、取消或重启；账本存在同一数据目录 SQLite 中，没有清零或重放按钮。
不要换目录、删除数据库或并行运行多个独立副本来继续首次试验，否则会失去统一累计限制。

每个新请求在预扣时记录模型、地域、报价日期、输入/输出单价和 Token 边界快照；usage 返回后保留该快照。
原有调用记录和累计预扣不重算、不清零。旧 `qwen-plus-2025-12-01` 保留独立报价和输出参数，避免混用价格。
usage 正常时另记按对应模型单价计算的用量估算；usage 缺失保留全额预扣，超出 Token 上界锁定后续调用。
这是本服务基于核定单价的费用保护，**不是阿里云账户侧硬限额或已核对的账单**。取消后仍可能计费。
若价格改变、免费额度失效或其他程序共用 key，须另行核对；本地代码不能控制账号内其他消费。

参考 2026-10-22 [百炼官方价格](https://help.aliyun.com/zh/model-studio/model-pricing)：
`qwen3.8-flash` 北京文本输入 <=1M，输入 0.8 元/百万 Token、输出 2.7 元/百万 Token。
例如所有决策轮次合计输入 50000、输出 6000 Token，约 0.0562 元/任务，不计试用或缓存减免；本地预扣会更高。
模型能力与价格见 [官方模型说明](https://help.aliyun.com/zh/model-studio/qwen3-8-flash)，
完整输出限制与误差见 [兼容接口文档](https://help.aliyun.com/zh/model-studio/qwen-api-via-openai-chat-completions)。
本服务仅发送文本和自定义合成工具，不启用图片、视频、显式缓存创建或内置付费工具。
[LangSmith Developer](https://www.langchain.com/pricing) 免费档含 5000 base traces/月；本服务额外限制累计 20 条试验 trace，
不做自动模型评分、长期留存升级、云反馈同步或托管部署。免费额度充足且未开启超额消费时追踪预计 0 元。

云端仅发送 run ID/父子关系、步骤名、时间、成功/失败、证据数量、Token usage；
目标、约束、工具入参/原文和报告正文留在本地。可检查运行链和用量，云端语义质量评测还需另行确定数据范围。

## First authorized live validation — 2026-10-22

- One task, `d041f454-0599-44fd-b276-5aff0e13aee8`, compared static-site functions
  with a persistent Node service using synthetic search/page documents.
- Twelve real Qwen requests returned HTTP 200. Input/output usage: 24,424/3,115
  tokens; estimated model cost CNY0.02795; retained reservation CNY0.123.
  The original cumulative cap remains CNY5. This task was additionally capped at
  CNY0.50 of model reservations, with CNY1 left as trace allowance; billing and
  account-wide free quota could not be verified with the configured tracing key.
- LangSmith project `private-research-agent-dev` accepted all 25 runs with HTTP
  202 (one root, twelve LLM spans, twelve tool spans). Only summaries were sent.
  Run/project readback is denied to the tracing-only key (403), so inspect the
  project in your own LangSmith session for final cloud-display acceptance.
- A report was generated, but the model repeated work instead of choosing
  `finish`. The step cap stopped it as `limited`. Recommended local correction:
  make successful `save_report` terminal in `AgentRunner.run`, then verify
  offline that no decision/request follows a saved report. No extra live task
  was run to conceal or repair the original result.
- Evidence and report: `../../.tmp/research-agent-live-u9GvIn/`. The directory
  also retains a pre-run SQLite backup. History, password and `.env.local` were
  preserved. The local server has been restored and checked as mock/offline.

## Local configuration and data

| 选项 | 默认值 / 行为 |
| --- | --- |
| `AGENT_PORT` | 4322，仅监听 127.0.0.1 |
| `AGENT_DATA_DIR` | 仓库 `.tmp/research-agent/`，自动创建 |
| `AGENT_MODE` | 默认 mock；qwen 另需显式 `--allow-model-calls` 和核价确认 |
| `AGENT_TRACE_MODE` | 默认 offline；cloud 另需显式 `--allow-cloud-traces` 和免费额度确认 |
| `AGENT_TRIAL_BUDGET_YUAN` | 默认 5，只能调低；累计真实模型保守预扣上限，不按日或重启重置 |

数据库 `agent.sqlite` 和 WAL 文件存放密码哈希、会话哈希、任务、报告、追踪及人工反馈；
`service.lock` 防止同目录双进程运行。数据目录已被 Git 忽略。
不要删除旧数据库来解决启动/密码问题；先保留数据，再检查具体错误。
忘记密码时没有自动重置后门，可用新的 `AGENT_DATA_DIR` 另建隔离工作台并保留旧目录。

预算数值是模拟约束：单次最多 2 元，日/月最多 10/100 元，每次任务最多 12 轮决策、6 次搜索、8 页资料、30 秒。
这份模拟流程账本与首次验证的真实模型预扣账本独立。Qwen 单请求等待最多 60 秒，任务总时限 180 秒，
超时中止传输、不自动重试，所有请求预留均不退还；实际账单需另行核对。

本地 HTTP 会话 Cookie 使用 HttpOnly、SameSite=Strict，无 Secure；上线必须 HTTPS + Secure 并重新验收。
线上使用 HTTPS + Secure，私有路径通过 EdgeOne 转发至回环服务，不加入 Astro 静态页面或导航。
生产密码初始化关闭，沿用迁移的原密码哈希；只在本地可首次设密。

详细范围：[需求](../../docs/requirements/005-private-research-agent.md) · [设计和验证](../../docs/features/private-research-agent.md)。

## Successful termination validation and release

修复后的 `save_report` 是服务端终止动作，无需再次付费请求 `finish`。
任务 `df526952-d641-42ed-a093-8c365e45bedc` 在 8 次真实模型请求后完成，只保存一次报告，
17 条追踪均被 API 接收。该阶段服务测试 59/59 通过；模型真实调用与模拟检索须分开理解。
证据 `.tmp/research-agent-live-fixed-pvVjir/`，旧的 limited 结果原样保留。

上线已获用户授权，已复用现有服务器完成部署。部署配置及校验步骤见
[HTTPS 部署说明](deployment/README.md)。生产必须迁移现有密码与累计预算账本，不能初始化空库；
默认本地启动不启用真实调用或云端上传。

线上任务/根 trace：`e7c3a82c-479b-4086-bb04-35b11c6bad84`，项目 `private-research-agent-dev`。
4 次模型请求、4,193 输入/556 输出 Token，本次估算 0.004856 元；保存后没有后续模型或工具操作。
报告下载和桌面/手机布局已验证。服务测试在 Windows 与 Ubuntu 均为 63/63 通过。
上线前两次验收分别因 20 秒超时和重复读取被终止，原始失败记录保留，未自动重放或补传历史。
修复包括：请求等待提高至 60 秒、只向模型提供未读 URL、资料齐全后明确要求保存并结束。
搜索与网页继续使用合成资料，不代表实时联网调研。证据 `.tmp/research-agent-release-smynUo/`。
