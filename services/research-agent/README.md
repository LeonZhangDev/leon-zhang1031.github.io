# Local Research Agent

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
