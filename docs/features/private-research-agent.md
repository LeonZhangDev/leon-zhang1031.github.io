# Private Research Agent

## overview

本地私人技术调研工作台，入口固定为
`http://127.0.0.1:4322/p7x4m9q2-k6v8n3r5-t2w9c4h7/`。
需求见 [005](../requirements/005-private-research-agent.md)，操作见 [服务说明](../../services/research-agent/README.md)。

本阶段包含密码访问、结构化工具循环、可检查报告、历史对比、人工反馈和 LangSmith SDK 追踪。
已接入百炼 Qwen 与 LangSmith 云端适配器，默认仍为 mock/offline。授权真实调用和云端接收已验证；
保存报告后自动结束已修复。上线已获授权，正在准备服务器连接与部署；没有博客 RAG。
当前按用户选择使用 `qwen3.8-flash` + 北京通用 DashScope 地址；最新计费和验证见文末。

## design decisions

1. **保留现有静态站。** 仓库使用 Astro 静态输出，新增独立 Node 服务，私有 HTML 位于
   `services/research-agent/ui/`，不放入 `src/pages` 或 `public`。
   将来上线需要动态服务和路由方案；本地版本没有把入口装进公开网站。
2. **随机路径降低偶然发现，密码提供访问控制。** 路径不作为凭据；前端资源没有密钥。
   后端独立保护所有数据接口，绑定 loopback，并校验 Host 与 POST Origin。
3. **首次设密。** 不生成、打印或保存明文默认密码；SQLite 只存 scrypt 哈希和会话令牌哈希。
   无密码恢复后门；如忘记密码，先保护旧数据，再另行设计显式重置操作。
4. **观察驱动循环。** 模拟决策接口接受已有观察，选择搜索、读取、补查、计算、整理或停止；
   实际执行由白名单及预算/次数/时长检查控制。真实模型适配器尚未启用。
5. **持久化预算。** 以整数单位记账（10000 单位=1 元），创建任务时事务预留，
   完成释放剩余预留，单任务并发；进程锁防止第二个服务误中断运行中的任务。
6. **明确零费用边界。** 页面和记录区分模拟估算与实际费用；本地模拟费用使用固定验收数值，
   不是任何供应商报价。当前实际模型、搜索与 LangSmith 用量费用为 0。
7. **真实 SDK、离线传输。** 固定 LangSmith `0.11.0`，使用 `Client.createRun`，默认拦截传输并记录
   SDK 的序列化请求。默认不访问云端，也不需要真实 API key；云端适配器需另行确认后启用。
   本地导出明确 `cloudVerified: false`。云端项目、实验、反馈同步与线上质量评分均未验收。
8. **合成 Token。** LLM 子 run 的 usage_metadata 按文本长度近似生成并标记
   `tokens_are_synthetic=true`；它们只验证展示结构，不能用于供应商计费核算。Qwen 模式改用供应商返回的真实 usage，仍不等同于已核对账单。
9. **故障可见。** SDK 传输失败仍保留本地 run；网页故障补查一次；挂起决策有硬超时；
   取消/超限保存部分报告。网页指令不增加工具权限。

## implementation notes

| 文件 | 职责 |
| --- | --- |
| `config.mjs` | 固定路径、双重授权开关、固定模型价格与执行限制 |
| `server.mjs` | HTTP 路由、认证、输入与同源校验 |
| `security.mjs` | scrypt、令牌、Cookie、尽力脱敏 |
| `store.mjs` | SQLite、进程锁、预算、历史与重启恢复 |
| `agent.mjs` | 决策/工具循环、调用限制、硬超时与取消 |
| `mock-provider.mjs` | 合成资料、模拟模型和只读工具 |
| `qwen-provider.mjs` | 百炼兼容接口、工具动作、usage 校验与模型生成报告 |
| `local-env.mjs` | 读取服务专用被忽略的本地环境文件 |
| `tracing.mjs` | LangSmith run 树、SDK 离线请求记录 |
| `evaluate.mjs` | 20 个本地评测案例与独立证据目录 |
| `ui/` | 密码页、工作台、安全 DOM 报告渲染 |

SDK 的 run 请求体是 Uint8Array，需要 TextDecoder 后 JSON.parse；已用真实 SDK 序列化测试确认。
当前 SDK 的普通 caller 会将 maxRetries 固定为 4，因此模拟追踪故障使用不可重试的 HTTP 400 响应，
防止失败验收被重试等待拖慢。业务工具本身不做隐式重试。

服务仅在 CLI 启动时读取 `services/research-agent/.env.local`，不读取根目录或历史配置。
配置选择 `qwen` / `cloud` 仍需对应显式启动参数；未传参数即拒绝启用。普通 Windows 启动器强制 mock/offline。
脱敏只能移除常见模式，不能识别所有私人内容；不要输入真实敏感信息。

### Validation — 2026-10-22

- 20/20 Node 服务测试通过。
- 20/20 离线评测通过，7 类通用检查；外部 fetch 次数 0，实际费用 0。
  本次证据：`.tmp/research-agent-eval-GcTZEz/results.json`；重跑始终生成新目录。
- 真实 Chrome 走通首次设密、退出、错误密码拒绝及再次登录；使用隔离数据库与随机测试密码，
  不占用默认用户数据目录，不导出密码或登录态。
- 浏览器完成正常调研、12 个 run/12 个 SDK 请求、Markdown 下载、反馈、配置复用、空搜索、
  历史对比、取消和历史回看；页面异常 0，外部请求 0；390px 无横向溢出。
- 现有 210/210 Vitest 测试通过；Astro check：0 errors、0 warnings、10 条原有扩展工具 hints。
- 公开静态站构建 186 页成功，前置 6 项资源契约测试通过；使用隔离输出
  `.tmp/research-agent-site-build-20261022/`，未覆盖 `dist/`；未发现私有路径或资源进入静态输出。

离线评测只验证程序与合成响应的约定，不是实时研究质量评分。尤其恶意网页案例不能代替真实模型抗注入测试。
公网认证、云端 LangSmith 收到追踪、真实供应商账单与生产部署均未验证。

### Local password update — 2026-10-22

按用户要求将本地最小密码长度调整为 6，并设置用户指定的访问密码。
具体密码没有写入代码或文档，SQLite 仍只保存加盐 scrypt 哈希。
更新密码时失效旧会话并清除登录失败窗口，保留任务、报告、反馈和模拟预算记录。
20 项服务测试通过，包括随机六字符密码的设密/登录；另通过本机 HTTP 登录和退出验证。

### Qwen and LangSmith adapter preparation — 2026-10-22

本节保留最初适配及报价快照记录；当前模型和地址已按文末的用户选择更新。

用户已选择百炼 Qwen + LangSmith Developer 免费档，首次真实验证累计预算 5 元。
本次仅实现接入代码、空白配置与离线测试，不使用真实模型、不向 LangSmith 上传数据、不部署。
此前 DeepSeek/Tavily 的建议已由本节取代；真实搜索供应商未接入。

- 新增 `qwen-provider.mjs`，使用原生 fetch 调用百炼兼容接口，无新增依赖；固定北京
  `qwen-plus-2025-12-01`、非思考、非流式，输出最多 1200 Token、请求超时 20 秒、无自动重试。
  通过 function tools 返回结构化动作；拒绝多动作/非法 JSON/未知工具。模型生成报告的链接必须来自已读取的合成证据。
- `local-env.mjs` 只读取服务专用 `.env.local`；已有进程环境优先。用户自行填 key，模板字段均留空；
  仅 `.env.example` 加入 Git 忽略例外，`.env.local` 仍被忽略。未覆盖已有本地文件或用户数据库。
- `AGENT_MODE=qwen` 还需 `--allow-model-calls` 与核价确认；`AGENT_TRACE_MODE=cloud` 还需
  `--allow-cloud-traces` 与免费额度确认。普通 Windows 启动器无显式开关时强制 mock/offline。
  单独填 key 或设置 SDK 自动追踪变量不会启用付费调用或上传。没有网页开关可绕过这些条件。
- 新表 `model_calls` 在请求前事务预扣费用，使用完整请求 UTF-8 字节上界加协议余量估算输入，
  保守输入上限 24000 Token；计入最大输出。5 元是跨任务、跨日期、跨重启累计限额，同时受单任务预算约束。
  预扣不退款；取消、超时、失败或进程退出都保留。已返回的 usage 另记估算，不宣称已核对供应商账单。
  超出预留 Token 边界时锁定后续请求；没有清零接口。不可更换/删除数据目录来继续同一首次验证。
- 搜索、网页和计算继续使用原有合成工具；Qwen 模式不再使用固定模板冒充模型报告。
  本地未完成报告明确标为部分结果；界面区分模拟流程费用、模型 usage 估算与累计预扣。
  Qwen 任务时长上限调整为 180 秒，任务截止/取消会终止底层 fetch，避免后台继续请求。
- LangSmith 云端适配器通过现有 SDK 发送仅含运行结构、步骤、时间、状态、证据数量、Token usage 的摘要。
  目标、约束、原文、工具入参和报告正文留在本地；所有本地 run 先持久化，再尝试云端传输。
  目前限定官方 GCP US 接口；其他区域须另行适配。`cloud_dispatch` 限制累计 20 条试验 trace，阻止重放与历史补传。
  云端失败不重试、保留本地；成功仅标 `cloud-api-accepted`，导出仍为 `cloudVerified=false`。

操作与用户需要填写的字段见 [服务说明](../../services/research-agent/README.md#fill-local-configuration)。
所有未来真实验证命令仅写入说明，本次没有执行；现有默认数据、密码和运行中的本地模拟进程保留。

价格快照来自 [百炼官方价格](https://help.aliyun.com/zh/model-studio/model-pricing)：固定北京模型、输入 <=128K、
非思考输入 0.8 元/百万 Token，输出 2 元/百万 Token。全部轮次合计 50000 输入 + 6000 输出约 0.052 元/任务；
本地保守预扣更高。该保护基于启用前人工核价，不是阿里云账户硬限额，不能控制其他程序消费。
[LangSmith 官方价格](https://www.langchain.com/pricing) Developer 含 5000 base traces/月；
只有剩余免费额度充足且未开超额消费时预计 0 元。此服务不查询账户，不开自动模型评分、付费留存或托管部署。
百炼地址与工具调用格式依据 [首次调用文档](https://help.aliyun.com/zh/model-studio/first-api-call-to-qwen)
和 [Function Calling 文档](https://help.aliyun.com/zh/model-studio/qwen-function-calling)；
追踪权限依据 [LangSmith API key 文档](https://docs.langchain.com/langsmith/create-account-api-key)。

离线检查覆盖填 key 后仍不出站、配置拒绝、请求格式、usage、鉴权失败、非法响应、超时、取消、底层中止、
5 元累计与重启、usage 越界锁定、模型生成报告、伪造引用拦截、SDK 云端摘要序列化、上传失败不重试、追踪上限。
测试使用临时 SQLite 和注入传输，全局真实 fetch 被阻止。真实模型调用、云端接收与供应商账单仍未验收。

### Selected Flash model and generic endpoint — 2026-10-22

用户确认沿用自己配置的 `qwen3.8-flash` 与 `https://dashscope.aliyuncs.com/compatible-mode/v1`。
本次调整代码、计费配置、模板和离线测试，没有改动含密钥的 `.env.local`，没有重启默认服务、调用真实模型、上传追踪或上线。

- `config.mjs` 默认模型改为 `qwen3.8-flash`，默认地址改为北京通用地址；仍接受原北京业务空间地址。
  地址按明确允许列表校验，拒绝 HTTP、其他地域、仿冒主机、URL 凭据、查询参数与重复 completions 路径。
- 按精确模型名选择报价：Flash 输入 0.8 元/百万 Token、输出 2.7 元/百万 Token，适用北京文本输入 <=1M。
  原 `qwen-plus-2025-12-01` 保留独立报价（输入 0.8、输出 2），未知模型在真实模式被拒绝，不能继承旧的低价。
  按标准价计算，不假定缓存命中、活动优惠或试用减免；未启用显式缓存创建或多模态请求。
- `qwen-provider.mjs` 对 Flash 使用 `max_completion_tokens=1200`，显式关闭思考与内置联网搜索。
  按官方兼容接口文档允许的最多 10 Token 误差，最大输出预扣与 usage 校验均采用 1210；超过即锁定后续模型请求。
  旧模型仍使用自己的 `max_tokens` 参数，不同时发送两种输出上限。
- `store.mjs` 每次预扣保存模型、地域、报价日期/来源、输入输出单价、Token 边界；usage 返回后合并记录，保留报价快照。
  不修改既有账本金额，不重算旧模型用量，也不清零累计预扣；总预算仍为 5 元，取消/超时/失败不退款、不重试。
- `.env.example` 和服务说明改为当前模型及通用地址；用户私密配置、安全开关、密码与默认数据库保持原样。
  真实调用和云端上传仍各需独立显式启动参数及配置确认，当前继续 mock/offline。

价格及能力来源：[Flash 模型说明](https://help.aliyun.com/zh/model-studio/qwen3-8-flash)、
[价格总表](https://help.aliyun.com/zh/model-studio/model-pricing)；
通用地址来源：[API key 与接入地址](https://help.aliyun.com/zh/model-studio/get-api-key)；
输出参数与误差来源：[兼容接口文档](https://help.aliyun.com/zh/model-studio/qwen-api-via-openai-chat-completions)。
核对日期为 2026-10-22，未来真实验证前仍需复核价格、权限及账户额度。

本次离线验证：47/47 服务测试、20/20 模拟评测通过；评测外部请求 0、实际费用 0。
证据目录 `.tmp/research-agent-eval-Wg6mFx/`，未覆盖历史结果。
新增检查覆盖通用地址/仿冒地址、模型价格隔离、完整输出参数、1210/1211 Token 边界，以及旧预扣在切换模型后仍阻止 5 元超额请求。
这些离线结果不代表模型权限、真实响应质量、云端接收或供应商账单已经验证。

### First authorized real task and cloud ingest — 2026-10-22

用户另行授权一次真实 Qwen 调研和 LangSmith 上传，累计费用预算仍为 5 元，禁止上线。
使用默认数据目录和已有账本运行一个任务，不另建空账本。运行前备份 SQLite，确认没有活动任务及历史真实调用。
仅在一次性进程内启用真实模式和云端模式，未修改 `.env.local`，未更改账户计划或付费设置。
本次单任务模型预扣上限为 0.50 元，总预算中另留 1 元追踪费用余量。

- 任务/根 trace：`d041f454-0599-44fd-b276-5aff0e13aee8`；项目：`private-research-agent-dev`。
- 主题为个人网站交互后端选型。真实模型、合成检索/网页，共 12 次 Qwen HTTP 200，输入 24,424 Token、输出 3,115 Token。
  按核定标准价估算模型费用 0.02795 元，累计保守预扣 0.123 元，无 usage 不确定请求；供应商账单尚未核对。
- LangSmith 共接收 25 条 run（1 根、12 LLM、12 tool），全部 HTTP 202；仅上传父子关系、步骤、状态及真实 usage 摘要。
  消耗 1 次本地云端 dispatch 名额，无历史补传。当前 key 为仅追踪权限，项目、run 回读和账户用量均返回 403。
  因此确认范围是接口接收，不包含云端页面展示、最终聚合、免费额度余额和追踪实际账单。
- 报告已保存，但任务状态为 `limited`：第 8 步首次保存后，模型重复保存、检索，没有调用 `finish`，最终触发 12 轮上限。
  建议修复 `agent.mjs` 的 `AgentRunner.run`：成功保存报告后由服务端直接完成任务，避免再次付费决策；
  增加离线测试，断言保存后不再调用模型或工具。本次保持原始验证证据，未追加真实调用或重传追踪。
- 既有任务、密码和私密配置保持原样；恢复本地服务并确认 `mock/offline`，新报告在本地历史可见。
  运行前 47/47 服务测试通过。未上线、部署或推送；默认模式恢复后没有新增真实请求。

证据目录：`.tmp/research-agent-live-u9GvIn/`（`result.json`、`report.md`、`trace-summary.json`、
单次执行脚本、运行前数据库备份及恢复服务日志），整体被 Git 忽略。

### Terminal report and authorized release preparation — 2026-10-22

用户追加授权：修复结束逻辑并验证成功，再执行真实调用、摘要上传和上线。
此前记录是历史状态，不能用于推断当前授权或将旧 `limited` 任务改为成功。

- `AgentRunner.run` 在有效 `save_report` 工具结果产生后，服务端直接设为 `completed` 并退出循环。
  不再依赖下一次付费 `finish`；空白或错误报告仍失败。回归断言只保存一次、之后无模型/工具调用，
  并覆盖保存恰好用尽步骤上限的情况。
- 真实修复验证任务/根 trace：`df526952-d641-42ed-a093-8c365e45bedc`。
  8 次模型请求全部 HTTP200，10,848 输入/1,055 输出 Token，首次保存即成功结束。
  本次模型估算 0.011527 元，累计估算 0.039477 元、保守预扣 0.1881 元，无未知费用请求；总预算仍 5 元。
- LangSmith 接收 17 条 run（1 根、8 LLM、8 tool），全部 HTTP202。仅摘要上传，未补传历史。
  当前 key 无回读/账单权限，不能确认云端页面展示、剩余免费额度或最终实际账单。
- 新证据 `.tmp/research-agent-live-fixed-pvVjir/`；默认服务恢复 mock/offline，私密配置、密码、旧任务均保留。
  搜索/网页仍是合成资料，真实模型成功不表示已经验证联网调研质量。
- 生产准备保留回环监听，新增精确 HTTPS origin/代理头验证、Secure Cookie、关闭线上密码初始化。
  生产启动须有预置密码、显式持久数据目录和累计预算下限；空库或账本少于迁移下限会直接拒绝启动。
  网站侧代理只接受本站私有路径，固定后端，限制方法/大小，过滤其他 Cookie/凭据并拒绝跨站 POST。
  不把 API key、私有报告或 SQLite 放入静态构建。登录页根据真实运行模式显示状态。
- 独立发布目录 59/59 服务测试、20/20 离线评测通过；Astro 检查 0 错误/0 警告，静态构建 211 页通过。
  模板和操作顺序见
  [部署说明](../../services/research-agent/deployment/README.md)。线上路由和 Caddy 尚待实际验证。
- 复用现有腾讯云服务器，保留 Artalk 和原配置备份；不新购资源。独立 release worktree 基于 `origin/main`
  的 `8cd9c55`，保留新发布的 25 篇 Agent 博客。后端验证通过后才发布网站代理路由。
