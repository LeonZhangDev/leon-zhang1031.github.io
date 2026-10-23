# Project Progress

## 2026-10-23 — 修复后完整联网验收

- 用户授权阶段调额与通过后推送 GitHub。共享/联网上限 ¥1.50/¥1.20，原 ID/占用保留；单任务 ¥0.30、总累计硬上限 ¥5 不变。模板仍默认 ¥0.50/¥0.30；离线导入支持显式阶段额度，不启用传输。
- 全新任务 `fcf94986-bc22-4f21-bfc3-3230c639492b` 完成真实 Qwen → Search → Extract → 回读/Skill → 保存一次并结束，18/18 条 LangSmith 摘要回读、ID/父子关系/隐私检查通过。
- 修复 URL 紧邻中文标点的引用误判与 Markdown 错链。失败任务 `df8b4eaa-e2a6-48a1-8bba-fab26b664949`、14 条追踪及 ¥0.2093 保留；成功任务新增 ¥0.2439。历史 **122 条、¥1.1256/5**，共享 ¥0.8348/1.50、联网 ¥0.6974/1.20，原未知 1 条；非现金账单。
- Windows 139/139、Ubuntu 136/136、Chrome 修复回归 3/3、离线评测 20/20，合并远端性能更新后站点构建 211 页。原生产行哈希保留；本地只追加同步，258 原行/配置不变，完整性/外键通过。详见 [当前记录](../services/research-agent/README.md#2026-10-23-修复后完整联网验收)。
- 单场景流程通过；报告批量建议须核实，广泛答案质量、人工云 UI/余额、供应商账单未验收，置信度 B。以下此前额度/阻塞是历史状态。

## 2026-10-23 — Tavily 真实验证、修复与新版上线

- 用户追加授权并确认关闭自动付费后，在既有生产账本上完成真实 Tavily Search/Extract、Qwen 决策和 LangSmith 摘要上传。原任务因模型选择未观察 URL 失败，保留失败和 17 条追踪；工具未执行非法 URL。
- 修复已加载 Skill 重复提供，以及已有证据后非法 URL 直接丢失完整报告的问题：只允许一次受预算控制的报告保存决策，来源白名单保持。缓存恢复任务 `fdbde5e4-9ca3-472d-bb17-2b8a12f18a0e` 单次真实模型保存后结束，未新增搜索/提取/记忆。没有把缓存恢复当作重新跑通完整联网任务；报告含未证实的批量取整建议，质量尚需改进。
- LangSmith 原 Mem0 20 条、首次 Tavily 17 条和恢复 4 条 run 均成功回读及检查摘要字段。生产保留上传专用 key，本机 PAT 不上传服务器。
- 新版 `tavily-28394ed3d986` 已通过原私有入口上线，44 源码哈希验证。Windows 136/136、Ubuntu 133/133、离线评测 20/20（外部调用/费用 0）。线上 Chrome 验证报告/GFM/源文/下载/390px/登出 401，首页正常；未发起额外付费任务。候选 Chrome 因 SSH 转发受限未覆盖，服务器 HTTP 模拟任务通过。
- 本轮新增预留 **¥0.2442/0.30**，全部历史 **¥0.6724/5**，固定原验证 **¥0.3816/0.50**，104 条费用记录、原未知 1 条。余量 ¥0.0558 不够一次新搜索，预算不放宽。非供应商现金账单。
- 原生产行逐一哈希保留，本地账本追加同步后原 243 行和配置不变，完整性/外键检查通过。原站点/评论及公开博客内容未改；候选服务已停。失败尝试、备份、追踪和证据均保留于 `.tmp/tavily-release-20261023/`，[发布及回退](../services/research-agent/deployment/README.md#2026-10-23-tavily-release)。完整修复后新联网循环、广泛答案质量、人工云 UI/账号余额及账单仍未覆盖，置信度 B。

## 2026-10-23 — Tavily 本地接入与离线验证

- 在现有干净发布工作区接入 Tavily Search/Extract Basic，无新增依赖；固定端点、独立授权、无自动高级模式/重试/模拟降级。默认和普通启动仍为 mock/offline，本轮不调用真实供应商、不上传追踪、不部署或推送。
- 新增工具调用账本，与模型/记忆共用事务预留；保留累计 ¥5 和原 ¥0.50，新增固定 `tavily-v1` ¥0.30，含该模式的独立记忆请求。新任务/重启不能重置；延迟或免费 credits 不退等价占用，未知旧费用保持。
- 搜索结果与成功读取证据分开；公开 HTTPS 校验、原文哈希/时间、模型有界摘录与缓存回读、真实模式提示和摘要追踪。原模拟模式保留用于回归。配置模板和服务/需求/功能说明已同步。
- 最终验收：Node v24.19.0，服务测试 **134/134**（含 27 项 Tavily 专项和 Chrome 新模式 UI），离线评测 **20/20**、外部调用/费用 0；启动器语法和差异检查通过。原配置/数据 SHA-256 **4/4** 不变，证据 `.tmp/tavily-offline-20261023/`。此前生产余额为 ¥0.4282/5、原验证 ¥0.1374/0.50，本轮未连接生产检查或改动余额。真实连通性、提取质量、追踪和上线待另行确认，置信度 B。
## 2026-10-23 — Woodfish production accepted

- Published application `e3e92f7` through the existing main deployment pipeline.
  Fresh canonical-site browser checks confirm the new assets. Five live cold
  mobile visits meet 2.5 s: median **7,392→2,032 ms**, sample P75 **7,432→2,072 ms**,
  final maximum **2,092 ms**. Same 5 Mbps / 60 ms / 4× CPU configuration; empty
  HTTP caches. This is Chrome simulation over real CDN, not field-user P75.
- Live source checks verify optimized/original atlas and selected props. Seven
  routes, touch/keyboard/pause/reset, Agent course sidebar, math and the real
  deferred comment editor pass with zero page errors; no comment/data write.
- Fresh production offline installation verifies 147 public files, ten first-use
  rooms, encrypted saving and audio ranges. Actual worker `6ba85d8450becd43a036`
  matches committed source and the Git-normalized graph; text-only Windows/Linux
  line-ending differences are accounted for. Private plaintext/query caches zero.
- Local fifteen pairs/device remain 3,324→1,564 ms mobile / 3,288→1,324 ms desktop.
  Visual style, all six frames, effects, sound and features remain. Evidence:
  `final-production-receipt.json` and accompanying raw/visual/offline records in
  the isolated release checkout's `.tmp/muyu-mobile-release/`.
  [Full comparison and release receipt](features/jingxin-hall.md#production-atlas-follow-up--2026-10-23).


## 2026-10-23 — Woodfish atlas production follow-up

- First publication `c4382f4` passed the local target but real-network mobile
  median remained 2,824 ms. Continued instead of declaring production completion.
- Added a 593,902-byte near-lossless WebP atlas (-39.8%): same six frames,
  resolution, animation, effects and functions. Original PNG/lossless WebP remain;
  composited RGB error ≤4/255, alpha error ≤2/255. No codec/loader branch added.
- Final fifteen alternating pairs/device: mobile LCP median 3,324→1,564 ms,
  P75 1,568 ms and max 1,580 ms; desktop 3,288→1,324 ms. Mobile transfer -57.5%,
  load 3,277→1,518 ms, final CLS/page errors zero. Every after sample meets 2.5 s.
- Final build 211 pages; 29 Node and 98 Jing E2E checks pass. All 24 frame/theme/
  device visual pairs pass; differences above RGB delta 8 stay in prop regions.
  Final desktop/mobile offline first-use tests pass with 147 files / 12,476,617 B,
  local worker `e2be968311540ee3064c`. Earlier 212 unit/25 blog-security checks
  remain valid for modules unchanged in this follow-up. Production acceptance
  is recorded after publication, separate from local emulation.
- [Detailed final comparison](features/jingxin-hall.md#production-atlas-follow-up--2026-10-23).
  Previous props-only/production cohorts and failed probes remain in evidence.


## 2026-10-23 — Woodfish mobile cold-load release candidate

- User authorized production publication after reaching mobile LCP below 2.5 s.
  Retained current remote main `584eea9` and all fifteen newer commits; integrated
  only website performance work from the original dirty checkout.
- Added seven responsive lossless-after-resize prop WebPs, native srcset/sizes,
  and a room-specific atlas preload. The six-frame atlas, style, effects, sound,
  timing, interaction code, original PNGs and full-size fallback WebPs remain.
  The existing offline producer follows all candidate widths: 147 public files,
  12,869,915 bytes, version `aa9bfa2f9d7129dac133`.
- Fifteen alternating cold pairs per device: mobile median LCP 3,324→2,180 ms,
  P75 3,356→2,184 ms, maximum after 2,228 ms; all fifteen after visits pass.
  Desktop median 3,292→1,940 ms. Mobile load 3,276→2,127 ms; transfer drops
  37.5%. CLS/script errors remain zero, and the final LCP is still the woodfish.
- Passed 211-page build, Astro check (zero errors/warnings, 26 existing hints),
  212 unit tests, 29 Node checks and 123 existing browser cases. Twenty-four
  frame/theme/device visual pairs preserve content, geometry and computed styles;
  differences stay inside resized prop regions. Desktop/mobile first-use offline
  room, private encrypted saving, audio-range and shortcut checks pass.
- The separate five-visit live before cohort has median LCP 7,392 ms on the old
  production PNG version. Controlled local results do not imply field P75 or all
  physical phones. Actual production after verification follows publication.
  [Details](features/jingxin-hall.md#woodfish-mobile-cold-load-release--2026-10-23).
  Evidence is in the isolated release checkout's `.tmp/muyu-mobile-release/`.

## 2026-10-23 — Jing hall mobile cold-load styles, local only

- Split Jing layout styles by route using the installed processed CSS URL
  pipeline: shared hall/shell, room scenes and continuity tools. The hall no
  longer blocks on unrelated room rules. Preserved fonts, textures, images,
  motion and functions, with no new dependency or client loader.
- Visual checks caught a global eyebrow override hidden inside room styles.
  Restored its shared ownership without changing its declarations; the first
  split/build/results are retained as rejected evidence. All other CSS bytes
  and ordering, eleven pages' non-stylesheet HTML, and 473 runtime assets remain
  unchanged. Hall decoded styles fall 89,116→32,307 B (-63.7%).
- Final 15 alternating cold pairs per device (60 visits): mobile emulation LCP
  680→624 ms (-8.2%), desktop 656→616 ms (-6.1%); both improve in 14/15 pairs.
  Mobile/desktop FCP is 564→508 / 552→504 ms. Initial transfer falls 7.5%;
  CLS and script errors remain zero. These are within-run local comparisons,
  not comparisons against earlier rounds or production-phone acceptance.
- Final 186-page build, Astro check (0 errors/warnings, 26 unrelated hints),
  210 unit tests, 29 Node checks and 98 existing Jing E2E cases pass. Thirty-two visual
  pairs pass geometry, content, computed-style and settled-pixel checks; two
  early captures are retained alongside settled recaptures. Desktop/mobile
  restored-scroll checks pass. Both fresh worker profiles cache 140 files and
  support first-use room interactions offline, including encrypted saving,
  audio ranges and hall shortcuts; no query URLs/private plaintext are cached.
- The complete room stylesheet path and first hall→room transition are measured
  separately: small cold-room samples regress by 8–56 ms, and first hall→Qimen
  navigation without an installed worker adds 11,327 B CSS and 56 ms LCP. This
  tradeoff is recorded explicitly, not a claim of site-wide acceleration.
  Worker version: `60c9b0d783216f9238ef`.
- [Full comparison, tradeoffs and validation](features/jingxin-hall.md#hall-mobile-cold-load-styles--2026-10-22-local-only).
  Evidence: `.tmp/jing-hall-mobile/`; older rounds and failed probes preserved.
  No deployment, push, commit, real model call or third-party write by this batch.


## 2026-10-22 — Jing hall cold-load diagnosis, local only

- Repaired parser-time back-to-top initialization in `JingLayout.astro`: read
  initial/restored scroll on `pageshow` instead. Tracing identifies 76.551 ms of
  forced layout in that call; layout CPU work remains, but the measured script
  long task is avoided. Retained passive scrolling, click behavior and all visuals.
- Ten alternating cold pairs per device (40 visits): desktop LCP 724→718 ms;
  mobile emulation 726→736 ms. **No stable LCP improvement**. Long Tasks API
  blocking medians fall 44/47.5→0 ms; FCP is 580→580 / 590→598 ms. Prior cache
  improvements apply to installed-worker revisits; hall assets remained unchanged.
  Final LCP belongs to the portal paper texture and retains the entry animation.
- Rejected full-CSS inlining after it delayed desktop FCP. No styles, motion,
  images, browser bundles, worker algorithm, dependencies or production settings
  changed. Compared 495 files: only eleven HTML files and the generated cache
  version differ. New cache version: `d004a7a7da4210b43473`, still 138 URLs.
- Passed 186-page build, Astro check (0 errors/warnings, 26 unrelated hints),
  210 unit tests, 29 Node checks, all 98 existing Jing E2E cases (83+15 corrected
  local-origin reruns), restored-scroll checks, desktop/mobile offline interaction
  checks over ten rooms and 20 visual pairs (zero pixels above the RGB threshold).
- [Full diagnosis, paired medians and verification boundaries](features/jingxin-hall.md#hall-cold-load-diagnosis--2026-10-22-local-only).
  Evidence: `.tmp/jing-hall-cold/`; previous artifacts and initial failures kept.
  No deployment, push, commit, real model call or third-party write by this batch.


## 2026-10-22 — Woodfish props and Jing offline cache, local only

- Preserved visual style, original PNGs and dimensions, transparency, motion,
  sound, all three lot collections, chart rules and encrypted notebook format.
  Added three lossless prop WebPs: 1,349,916 -> 940,066 B (-30.36%); all 52
  current runtime derivatives pass visible-pixel/alpha/dimension checks.
- Forty alternating paired cold visits: desktop woodfish LCP 3996 -> 3380 ms
  (-15.4%); mobile emulation 3988 -> 3420 ms (-14.2%). Initial woodfish transfer
  2,373,634 -> 1,963,810 B (-17.3%). Hall cold LCP did not improve (+32/+16 ms);
  no general acceleration claim. All samples have CLS=0 and no page errors.
- Replaced HTML-only/network-first offline caching with a build-derived public
  allowlist: 138 files / 12,478,056 uncompressed B, exact content hashes and
  versioned caches. Downloads complete and verify before installation succeeds;
  failed updates retain the active version. Existing tabs retain old dependencies
  until they close. Cached audio supports ranges. No personal inputs/notes are
  cached; known static timer/topic queries read public HTML without storing URLs.
- Real Chrome desktop/mobile offline runs clear normal HTTP caches first and
  exercise ten previously unvisited rooms, first chart calculations, all three
  lot draws, Ask Classics, encrypted case saving, audio ranges and ten query
  shortcuts. Worker update tests preserve old-tab lazy calculation, unrelated
  storage and the active cache after a deliberate revision mismatch.
- Twenty installed-cache revisits with an injected 800 ms HTML delay: hall LCP
  916 -> 152 ms desktop and 964 -> 156 ms mobile emulation; TTFB becomes 3.8/3.3 ms.
  This verifies cache-first navigation under a controlled delay, not live CDN speed.
- Passed final 186-page build, Astro check (0 errors/warnings, 26 unrelated
  hints), 210 Vitest tests, 29 Node checks and all 98 Jing E2E scenarios (54+44).
  Twenty visual pairs retain layout/content; 19 pairs are pixel-identical at the
  recorded threshold and one has 0.15% localized citation rasterization differences.
  Woodfish images/screenshots retain their visible pixels. No frame-rate claim.
- One complete cache stores 11.90 MiB before compression; installation/update
  incurs a background download and updates may temporarily retain two versions.
  The exact local worker revalidation header is configured but not deployed.
- [Full cold/cached measurements, offline/update checks and boundaries](features/jingxin-hall.md#woodfish-assets-and-offline-cache--2026-10-22-local-only).
  Evidence: `.tmp/jing-offline/`; previous `.tmp/jing-performance/` preserved.
  No commit, push, deployment, real model call or third-party write by this batch.


## 2026-10-22 — First website performance batch, local only

- Removed the fixed navigation wait while retaining the existing fade and
  restoring visibility on browser back/forward. Kept particles, cards, themes,
  QR controls, article copy/zoom and mobile navigation.
- Moved shared interactions into Astro-built scripts, made article title/body
  immediately visible, and deferred Artalk JS/CSS/API until near the comments.
  Reading progress uses transform; pointer spotlight updates once per frame.
- Final local five-pair comparison: navigation initiation 177.9ms to 7.2ms;
  article cold first-window transfer 304.5KiB to 248.9KiB (-18.3%); initial
  inline/external script source 200.5KiB to 11.5KiB (-94.3%).
- LCP is mixed: desktop article cold 1872ms to 2076ms; mobile emulation 1848ms
  to 1760ms. Do not claim universal first-paint acceleration or production gains.
- Passed 210 unit tests, 20 Node checks, 126 Chrome E2E tests, 29 focused browser
  checks, a stylesheet-failure/retry check, 186-page build and Astro check
  (0 errors/warnings, 10 existing hints). Eight visual comparisons match after
  excluding random particles; sampled layout/content also match.
- No push, deployment, real comment writes, dependency or backend changes by
  this batch. Preserved concurrent private research-agent work.
- See [scope, full comparison and local evidence](features/site-performance-first-batch.md).



## 2026-10-22 — Agent 新版上线与真实闭环验收

- 用户追加授权后，部署后端 `mem0-a8784daf9571`，沿用现有随机路径/密码和服务器，不变更公开博客及 Caddy/Artalk 配置。Mem0 真实 Qwen/embedding、上下文管理、3 个 Skills、安全 GFM 已上线；源码 42 文件哈希核对，Windows 106/106、Ubuntu 104/104 测试通过。
- 隔离发布工作区静态站构建 211 页、6 项游戏加载回归通过；公开站文件未加入本次提交。
- 补齐生产记忆配置模板与独立启动开关；付费记忆 HTTP 连接断开后中止实际传输。Agent 初始记忆召回加入追踪，云端接收状态本地留证；模拟决策使用真实记忆时费用不再错误显示为零。
- 新增 `ledger-transfer.mjs`：只读导出/预览及显式事务导入，按 ID 幂等，冲突/活动任务/缺失关联/双预算越界拒绝；不覆盖旧任务或移交密码和会话。发布前补入 46 条本地记忆调用，验收后回同步全部新增预算及云端派发记录。原服务器 230 条数据逐行哈希不变，SQLite 完整性/外键检查通过，原未知用量保留。
- 线上真实任务 `e81dc395-911b-45f6-969d-77bf71300a82` 使用已确认记忆和 3 个 Skills，经 9 次 Qwen 决策保存一次报告即结束。20/20 run（含 memory.recall）HTTP202；只发摘要，不发记忆、目标、报告。浏览器实际验证候选确认、召回使用、Markdown 表格/源文/下载、390px 无溢出、登出及 401；浏览器错误 0，合成测试记忆/临时会话已清理。
- 首次浏览器脚本误用 30 秒等待超时，应用任务正常完成；保留原失败记录并修正等待参数，只回看同一任务，没有重跑付费调研。本轮新增 usage 估算 0.019066 元、保守预扣 0.1052 元；固定新增验证累计 0.1374/0.5 元，全历史累计 0.4282/5 元，93 请求、原未知用量 1 次。本机配置与离线默认不变，生产作为后续真实调用唯一执行处。
- 尚受权限限制：现有 LangSmith 密钥已确认是 Tracing Only，仅上传密钥读取项目 HTTP403 属预期行为，权限不可修改。线上保留该密钥，本机另建 PAT 才能回读；不能确认云端回读、账户余额和最终供应商账单。真实压缩阈值未在本次短任务触发，压缩由离线回归覆盖；搜索/网页工具仍按既定合成模式。置信度 B。证据：`.tmp/agent-final-release-20261022/`；[部署和回退边界](../services/research-agent/deployment/README.md#2026-10-22-mem0-release)。

## 2026-10-22 — Mem0 真实 Qwen/embedding 验证，本地完成

- 经用户授权，使用原百炼通用地址完成 2 次 Qwen3.8-Flash 抽取和 44 次 text-embedding-v4/1024D 请求。3/3 候选有原文依据，确认前不召回；确认 2 条、丢弃 1 条、删除隔离及重启正确。无明确偏好的文本不生成候选。未上传 LangSmith 追踪、上线或发送原个人记忆。
- 默认阈值 0.65 的初评命中 7/10；三个漏召回目标未过滤时均排第一。保留失败证据，复用已有向量离线校准，默认与模板改为 0.55。另一组预先锁定的复验查询 10/10 命中且均排第一，5/5 无关查询拒绝。新增一项边界回归；完整服务测试 101/101（含既有本机 Chrome 离线流程）。小样本结论，置信度 B，不外推为通用质量保证。
- 新增 usage 估算 CNY0.000898，保守预扣 CNY0.0322/0.50；所有历史累计预扣 CNY0.3230/5.00，历史 1 次未知用量仍保留。先备份并只读核对服务器，再向原本地账本补齐缺失 14 条调用和 4 条关联任务；原 112 条数据逐行哈希与原配置文件哈希不变，SQLite 完整性/外键检查通过。合成记忆另库存放，累计费用不另起账本。
- 服务器前后 34 条调用、任务和 5 条云端派发记录不变；默认记忆/追踪模式及 `.env.local` 不变。后续在服务器发起真实调用前必须合并本轮新增本地预算记录。详细报告、逐题结果、备份与全部请求费用见 [.tmp/mem0-qwen-live-20261022/report.md](../.tmp/mem0-qwen-live-20261022/report.md)。

## 2026-10-22 — Mem0 Qwen/embedding adapters, offline validation only

- Implemented Qwen3.8-Flash candidate extraction and text-embedding-v4/1024D callbacks for pinned Mem0 OSS, using the existing Bailian key/Beijing endpoint and Node-SQLite storage. Added exact model/dimension index profiles and an independent real-vector filename; preserved the offline index and did not migrate historical memory. Explicit user memory skips LLM extraction; quoted candidates remain inactive until confirmed.
- Consolidated Agent and memory HTTP calls in `paid-client.mjs`. Memory operation IDs cover UI requests outside research tasks; all SDK-derived requests are charged through the same local accounting authority. New `mem0-qwen-v1` reservations persist across restarts/mode changes and stop at CNY0.50 inside the original cumulative CNY5 cap. Historical model rows/price snapshots and unknown-usage reservations are not rewritten. Added tables initialize on the next startup; this work did not open the original database.
- Default configuration, ordinary Windows launcher and `--offline` keep memory offline; memory requires its own future CLI authorization and price confirmation, separately from Agent and LangSmith switches. No new dependencies. The application owns extraction/confirmation and binds a minimal Mem0 LLM callback, avoiding the optional LangChain message-conversion dependency and native infer:true retry/mutation paths.
- Final evidence: **100/100 service tests passed** under Node v24.19.0, including real local Chrome for default offline behavior and stubbed-Qwen candidate confirmation; **20/20 offline evaluation cases passed**, external calls=0, actual cost=0. Tests cover paid request formats, vector validation/batching, inactive candidates, unknown-index refusal, redaction, namespace/restart compatibility, timeout/cancel/no-retry, SDK fallback latching and both persistent caps.
- Original `.env.local`, `agent.sqlite` and its WAL/SHM matched their initial SHA-256 snapshots: **4/4 unchanged**. Tests used isolated temporary data and synthetic credentials/responses; no real model/embedding request, cloud trace upload, service restart against user data, push or deployment occurred. Related root-site dirty changes remain untouched.
- Evidence: [service-tests-final.txt](../.tmp/mem0-qwen-offline-1792674264058/service-tests-final.txt), [protected-after.json](../.tmp/mem0-qwen-offline-1792674264058/protected-after.json), evaluation [results.json](../.tmp/research-agent-eval-O201RH/results.json). Confidence **B**: transport/accounting and local UI are verified offline; real model permissions, semantic Recall@5/fact selection, threshold calibration, vendor bills and production rollout remain unverified. Next check, only after user confirmation: one synthetic-text chat/embedding smoke against the preserved authoritative ledger, with cloud tracing still off.
- Complexity review: one shared paid gateway plus a Mem0 operation adapter; additive memory-operation/call tables avoid migrating the old task-bound ledger. Offline fixture vectors are retained for safe local testing and rollback, isolated by filename/profile; their retirement requires separately authorized data migration. SDK internal initialization/LLM binding is pinned and covered by contract tests, and must be rechecked before upgrading Mem0.

## 2026-10-22 — Local Agent memory/context/Skills/Markdown upgrade

- Added pinned Mem0 OSS with local Node-SQLite vectors, telemetry off, inference disabled and deterministic offline embedding fixtures. Explicit user memory supports active recall, edit, disable and forget; research pages/reports are not automatically memorized. User/agent namespaces are isolated; this UI remains a single-owner, single-project workspace.
- Added context deduplication, structured extractive compression at 70%/85%, versioned raw-source references, preserved numerical claims and errors, cached `read_evidence` recovery and a hard input bound. No semantic-summary model was called. Added three versioned research Skills and bounded local memory/Skill tools; report saving remains terminal.
- Replaced the report subset renderer with locally served Marked/DOMPurify, GFM, preview/source views, code copy and responsive tables. Raw HTML, dangerous URLs and remote images are blocked.
- Validation uses isolated temporary data and stubbed providers. Existing configuration, password, historic tasks and cumulative CNY5 reservations remain protected; no real model request, cloud export, push or deployment is part of this upgrade. Full validation receipts are in the service README; prior production evidence below belongs to the previous release.
- Final offline evidence: 74/74 service tests including local Chrome; 20/20 evaluation cases with external calls=0 and actual cost=0. SHA-256 matches for the original local configuration and SQLite/WAL/SHM files (4/4). Real semantic memory/summary quality and production rollout remain unverified.

## 2026-10-22 — Private Agent deployed and production task completed

- Verified the user-supplied ED25519 SSH fingerprint and connected as `ubuntu` to
  the existing Tencent server. Installed private Node v24.22.1, an unprivileged
  systemd service and persistent SQLite; retained the password hash, two historic
  real tasks, all model reservations and dispatch records. Local defaults remain
  mock/offline; production explicitly enables qwen/cloud. No new paid resources.
- Validated/reloaded Caddy with a private route and unchanged Artalk fallback;
  comment configuration API remains HTTP200. Website private route is published
  from GitHub main, preserving the 25 newly published Agent course articles and
  excluding unrelated dirty performance edits.
- Fixed release-symlink startup, SQLite sidecar ownership and EdgeOne ArrayBuffer
  stream forwarding. Online mock task completed with one report. Added explicit
  private-path response headers to protect them from site-wide header overrides.
- Production real task/root trace `e7c3a82c-479b-4086-bb04-35b11c6bad84` completed:
  four model requests, 4,193 input/556 output tokens, one report save, nine cloud
  records accepted. No model/tool operation follows saving. Markdown download,
  desktop and 390px mobile rendering passed. Search/page tools remain synthetic.
- Two earlier production trials remain failed in history: one 20-second model
  timeout, one duplicate source read rejected by the guard. Request timeout is
  now 60 seconds inside the 180-second task deadline; model tools list unread
  sources only. No automatic retry or historical trace replay was introduced.
- Cumulative known model estimate CNY0.053245; conservative reservation CNY0.2908
  against the original CNY5 cap, 34 requests including one unknown-usage timeout.
  That timeout's reservation remains retained. LangSmith UI/readback, remaining
  free quota and actual vendor bills remain unverified.
- Backend release `a3d4031`: 63/63 service tests passed on Windows and Ubuntu.
  Six game-cache tests passed with private no-store rules excluded from cacheable
  assets. Full Astro build: 211 pages; check: 0 errors/0 warnings/18 hints.
  Blog chapter 15 and its comment editor loaded. Logout returned to the login
  page; unauthenticated task/report requests returned 401. Apex and WWW private
  responses enforce no-store, noindex, no-referrer and the strict private CSP.
  Credential scan found no configured keys in 1,811 tracked text files or 1,650
  built text files; the static output contains no private-path content.
  Evidence: `.tmp/research-agent-release-smynUo/`; deployment/rollback
  details: [service deployment](../services/research-agent/deployment/README.md).

## 2026-10-22 — Terminal-report fix, successful real validation, HTTPS preparation

- User authorized fixing the loop, one further real validation/upload, and release.
  `save_report` now completes the task as soon as it returns valid nonempty
  Markdown. It cannot trigger another paid decision or duplicate tool action.
  Invalid reports still fail; cancellation, deadline and premature-finish guards remain.
- 59/59 service tests passed, including duplicate-save regression and HTTPS
  configuration, seeded-ledger startup, Secure Cookie, disabled public setup,
  origin checks and fixed-target Pages proxy checks. Offline evaluation passed
  20/20 again in the release checkout; no external calls or evaluation charges.
  Astro check: 0 errors, 0 warnings, 15 hints; static build: 211 pages and six
  game-loading tests passed. Private HTML/data are absent from the static output.
- New real task `df526952-d641-42ed-a093-8c365e45bedc` completed after eight HTTP200
  Qwen decisions and exactly one report save. Input/output: 10,848/1,055 tokens.
  This task's model estimate CNY0.011527; original cumulative ledger now estimates
  CNY0.039477, conservatively reserved CNY0.1881 against the unchanged CNY5 cap.
  All 17 cloud run writes returned HTTP202 (one root, eight LLM, eight tool).
  Cloud UI/readback, remaining free quota and final vendor bills remain unverified.
- Search/page tools remain synthetic. Original history, password and ignored
  credential file were preserved; default service restored to mock/offline.
  Evidence: `.tmp/research-agent-live-fixed-pvVjir/`. The older limited task and
  its evidence remain unchanged below.
- Prepared persistent Node/systemd/Caddy templates and a private-path EdgeOne
  proxy; no credentials in frontend or source. Startup refuses an empty/reset
  production database. Production setup is disabled and cookies require HTTPS.
  See [deployment notes](../services/research-agent/deployment/README.md).
- Release checkout `codex/private-research-agent-release` starts from latest
  `origin/main` (`8cd9c55`), retaining the recently published 25-post Agent course
  and keeping unrelated dirty performance changes out of this release.
  Browser verified the live first course chapter at `leonzk.cn`.
- User selected the existing Tencent server and interactive console login.
  Server deployment, Caddy validation, public private-route acceptance and Git
  push have not occurred. The public proxy must wait until backend health passes.

## 2026-10-22 — One authorized real-model task and LangSmith upload

- Ran exactly one user-authorized Qwen task with `qwen3.8-flash` through the
  Beijing generic endpoint. Search/page tools remained synthetic; the report
  explicitly identifies this limitation. No deployment or push occurred.
- All 12 model requests returned HTTP 200 with measured usage: 24,424 input and
  3,115 output tokens; estimated model cost CNY0.02795. Cumulative conservative
  model reservation is CNY0.123 against the original CNY5 cap; no uncertain calls.
  One-task model reservation cap was CNY0.50, leaving a separate CNY1 trace
  allowance inside the overall trial envelope. Provider bills remain unverified.
- LangSmith accepted all 25 run records (one root, 12 LLM, 12 tool) with HTTP 202,
  using one cloud-dispatch claim. Only summaries and token usage were uploaded.
  The tracing-only key cannot read projects, runs or billing usage (HTTP 403), so
  cloud readback, account free quota and final trace charges remain unverified.
- The model saved a report but did not call `finish`: it repeated searches and
  report saves until the 12-step cap stopped the task as `limited`. This is a
  termination defect, not a fully completed agent-loop acceptance. Do not rerun
  automatically; fix locally by making successful `save_report` terminal in
  `AgentRunner.run`, then cover duplicate-save prevention with an offline test.
- Backed up the original database; original history, password and credential
  file were preserved. Restored the loopback service to mock/offline and checked
  its auth-status endpoint. The real run/report remain in local history.
- Re-ran 47 service tests: all passed before the real task. Evidence, report,
  one-shot script and database backup: `.tmp/research-agent-live-u9GvIn/`.
  Trace/task ID: `d041f454-0599-44fd-b276-5aff0e13aee8`;
  project: `private-research-agent-dev`. No further real call is authorized by
  this validation record.

## 2026-10-22 — User-selected Flash model and generic endpoint, offline only

- Adapted the service to the user's configured `qwen3.8-flash` and Beijing generic
  DashScope endpoint. Added exact model price profiles: Flash CNY0.8/M input and
  CNY2.7/M output; unsupported models cannot reuse another model's rate.
- Flash uses `max_completion_tokens=1200`, reserves the documented 10-token
  allowance, and explicitly disables thinking and built-in search. Each model
  reservation retains its price snapshot, including after usage recording.
- Kept the cumulative 5-yuan cap, existing accounting, no-refund/no-retry rules,
  user credential file, password and default database unchanged. Default remains
  mock/offline; no real model call, trace upload, server restart, release or push.
- Passed 47 service tests and 20 offline evaluation cases (external calls=0,
  actual cost=0). Evidence: `.tmp/research-agent-eval-Wg6mFx/results.json`.
- See [updated setup and accounting](../services/research-agent/README.md) and
  [selected-model changes](features/private-research-agent.md#selected-flash-model-and-generic-endpoint--2026-10-22).

## 2026-10-22 — Qwen and LangSmith adapters prepared, offline only

- Selected Beijing Bailian `qwen-plus-2025-12-01` and LangSmith Developer free tier.
  Prepared native-fetch tool-calling adapter and ignored blank `.env.local` with
  a tracked `.env.example`; keys remain user-supplied and default modes mock/offline.
- Both real-model and cloud tracing require independent explicit CLI flags and
  configuration confirmations. No real API call, cloud upload, deployment or push.
- Added a persistent cumulative 5-yuan trial reservation ledger, no refunds or
  retries, bounded input/output, cancellation/deadline aborts and usage checks.
  Retained the existing password, default database/history and unrelated work.
- Added summary-only LangSmith transport with durable local-first traces,
  a 20-trace trial cap and no historical replay. Search/page tools remain synthetic.
- Passed 41 service tests with stubbed vendor transports, 20 offline evaluation
  cases (external calls=0, cost=0), and 210 existing unit tests. The latest evaluation
  evidence is `.tmp/research-agent-eval-BiOxN0/results.json`. No live-model/cloud QA.
- Configuration, later approval steps, pricing assumptions and accounting limits:
  [service instructions](../services/research-agent/README.md),
  [feature](features/private-research-agent.md), [requirements](requirements/005-private-research-agent.md).

## 2026-10-22 — Private research agent, local mock version

- Follow-up: applied the user's six-character local password preference without
  storing plaintext in code/docs, invalidated old sessions, and preserved task data.
  All 20 service tests and local login/logout verification pass. Documented required
  model/LangSmith/search settings, staged validation and current official price
  estimates in the feature document; no real API, cloud trace or deployment enabled.

- Added an isolated loopback Node service at `/p7x4m9q2-k6v8n3r5-t2w9c4h7/`,
  with first-use password setup, server-side session checks, local SQLite history,
  reports, feedback, comparison, cancellation and persistent simulated budgets.
- Added observation-driven mock research decisions, readonly tool allowlists,
  nine failure/normal scenarios, source records and hard task deadlines.
- Integrated LangSmith 0.11.0 through an intercepted offline transport; local
  run trees and actual SDK request payloads are retained. No cloud verification.
- Passed 20 service tests, 20 offline evaluation cases, Chrome login/research
  flows, 390px layout, existing 210 unit tests and Astro check (0 errors/warnings,
  10 existing hints). Isolated 186-page static build passed with no private route
  or resources; its six resource-contract tests also passed.
- Real model/search calls, cloud trace uploads and production deployment remain
  disabled pending explicit user confirmation. Mock costs and token counts are
  synthetic; actual external API cost is zero. Existing unrelated work preserved.
- See [requirements](requirements/005-private-research-agent.md),
  [feature and evidence](features/private-research-agent.md), and
  [startup instructions](../services/research-agent/README.md).


## 2026-10-22 — Agent learning course publication

- Added the reviewed learning overview and 24 public chapters, 531 local images and shared reading order: overview → chapters 01–24.
- Desktop widths from 1200 px use left chapter navigation, central article and right section navigation. Smaller screens offer two independent expandable directories above the article. Existing non-course article navigation remains intact.
- Preserved the reviewed article bodies and image bytes; only publication frontmatter changes from the local editorial copy. Technical references, GitHub and teaching-video links remain. Source document/proxy and workshop promotion links are absent from course pages.
- Validation: 212 Vitest checks, 4 site identity checks and 6 game resource checks passed. Astro check reports zero errors/warnings and 10 existing hints; the normal build generates 211 pages with all 25 course pages present in the sitemap. Static validation checks 11,757 links and 640 image references with no broken local links or duplicate IDs.
- Headless browser checks passed at 1440, 1280, 1200, 1024 and 390 px, including directory placement, expansion and section anchors. Sampled case/interview images decode; the original deep-learning article TOC and ordered course feed work. External services were blocked during local browser checks; technical examples were not rerun.
- Prepared in a clean worktree based on `origin/main` (`fc7196d`); unrelated unpublished site changes are excluded. See [course feature](features/agent-learning-course.md).
- Live verification found a pre-existing Vercel Hugo preset publishing the wrong output directory despite a successful Astro build. Added explicit repository configuration for Astro / `npm run build` / `dist`; preserved the exact cache header rules and existing Worker configuration. Online acceptance is checked after that corrective deployment completes.

## 2026-10-22 — Second free game-loading batch

- Added three exact critical-resource preload hints only to the survival HTML:
  engine, settings and main script. Matched SystemJS/XHR/Cocos request modes;
  local probe confirms one request per selected URL and no credential warnings.
- No game/audio/texture/config bytes, execution order, save key, IndexedDB
  version, cache headers or origin changes. Retained the 2-second splash:
  source Creator project/build settings are absent from this website repository.
- Primed three-pair loopback menu medians: cold 5.100s to 4.682s; warm 2.131s
  to 2.133s (unchanged). Transfer bytes unchanged. Live BEFORE cold/warm menu
  medians: 15.295s / 3.978s. Do not mix these with prior scene-frame metrics.
- Synthetic new game/autosave/revisit/Continue restored an identical slot.
- Fast-forwarded three unrelated remote commits without overwriting their
  extension release and project synchronization work; preserved `.workbuddy/`.
- Passed 20 root Node checks, 210 Vitest tests and all 126 Chrome E2E tests
  with two workers. Astro check: zero errors/warnings, ten unrelated extension
  hints. An initial high-concurrency animation timeout passed isolated/full reruns.
- Published code `55abe8e`; apex/WWW serve the three hints with security/cache
  headers intact. Three live pairs: cold menu median 15.295s to 9.580s; warm
  3.978s to 3.898s, bytes unchanged. WAN variability limits generalization.
  One main-script early-preload/late-use advisory, no duplicate fetch or page
  errors. The marker is menu visible, not all assets or save reading complete.
- Live smoke passed all four game scenes, apex/WWW 390px game archive layout,
  comment form visibility and browser-origin API read (200). No data writes.
- Full checks and production acceptance are tracked in the
  [game-loading feature](features/game-loading-optimization.md).

## 2026-10-21 — First free game-loading batch

- Reused the existing 46,381-byte site icon instead of the survival game's
  1,021,548-byte ICO; retained the original file for rollback.
- Added eight literal versioned engine/WASM cache rules across four games and
  a build-time SHA256/reference guard. HTML, configs, game logic, storage keys,
  origin, paid services and comment data are unchanged.
- Passed 210 unit tests, 126 Chrome E2E tests, 18 root Node checks and Astro
  check (zero errors/warnings, two pre-existing clipboard hints). Four games
  rendered cold/warm without page errors; synthetic IndexedDB save/revisit and
  Continue restored an identical slot through the actual UI.
- Three-pair loopback medians: cold 6.029s to 5.097s; warm 2.182s to 2.171s
  (effectively unchanged). Resource transfer 1,789KiB to 837KiB at the scene
  frame marker, not full gameplay readiness. Live BEFORE: 10.928s / 4.342s.
- Live code `c2c916f`, deployment `dpavtdlysn4a`: successful, 186 pages. Initial
  cloud guard failure was confirmed as CRLF/LF checkout differences and fixed
  without changing game scripts. All eight exact cache headers are live on
  apex and WWW, with original security headers and revalidating HTML preserved.
- Three-pair live BEFORE/AFTER medians: cold 10.928s to 10.802s; warm 4.342s
  to 3.713s. Cold startup resource transfer 1,979KiB to 1,026KiB (rounded).
  WAN variance overlaps; these are samples, not a guaranteed speedup percentage.
- Post-deployment smoke: four live game scenes pass, warm engine uses browser
  cache (zero transferred bytes), apex/WWW mobile archives have four cards and
  no overflow, and comment UI/API read pass with no page errors or writes.
  See [scope and measurement method](features/game-loading-optimization.md).

## 2026-10-21 — Free security and traffic-spike hardening

- Inspected live Pages protection, cloud firewall, Artalk configuration,
  Caddy, SSH, listeners, sandbox, disk, backup timer and read-only SQLite state.
  Existing Pages DDoS/adaptive controls remain enabled; no paid resources,
  blanket challenges, cache overrides, credential or firewall changes.
- Added minimal compatible static response headers and dedicated comment-proxy
  size/time/concurrency bounds. Excess proxy work gets 503 and recovers as
  in-flight requests finish. This does not promise unlimited bandwidth protection.
- Validated the installed Caddy 2.6.2 against an isolated fake backend before
  changing production. The first candidate exposed a legacy max_fails default
  problem; explicit max_fails=1 fixed it before live reload. Oversize bodies
  reject with 502 on this legacy streaming implementation, not 413. Normal and
  POST access, overload rejection, recovery and subsequent access all pass.
- Ran consistent SQLite backup, retained the exact original proxy config and
  gracefully reloaded Caddy. Artalk was not restarted. DB integrity stays ok,
  comments/users/sites remain 1/2/1. Apex/WWW API reads return comment 2, foreign
  origins get no CORS allowance, anonymous site management returns 403 and the
  signed-in sidebar still shows approved status and management actions.
- Local acceptance: 210 unit tests, 14 focused Node checks, 125 existing Chrome
  E2E tests plus the new candidate-header browser regression, 186-page build,
  163-post audit with no failures and npm audit zero vulnerabilities. Astro check
  has zero errors/warnings and the same two intentional clipboard API hints.
  No extension code/download bytes changed. Vendor header rollout is verified
  separately after normal push; local preview is not production evidence.
- Code `836279b` deployed successfully as `dpicwbgtmmof`. Fresh apex/WWW GETs
  return all three configured headers, with HTML cache policy still
  public,max-age=0,must-revalidate. Both fresh 390px browser contexts show the
  editor and approved validation record without overflow or uncaught errors.
- Post-deployment production smoke passed 12 pages at 13:39:46 UTC. The engine
  menu renders at 1280x720 without observed page/CSP/MIME errors; its WASM returns
  200/application/wasm. No gameplay save or remote comment was created.
- A supplemental type check caught two missing annotations in the newly added
  test after its first runtime pass. Added explicit header-field types; fresh
  Astro check now has zero errors/warnings and the same two legacy hints, and
  the new browser regression passed again. This follow-up changes test types
  and acceptance notes only, not website or server behavior.
- Caddy's running admin configuration confirms actual limits (not just the
  on-disk template). Final DB integrity remains ok with 1/2/1 records; the new
  consistent local backup is 0600 and the prior proxy config is retained.
- Details, sources, rollback and deferred SSH/proxy-upgrade/off-host-backup
  work: [free security hardening](features/free-security-hardening.md).

## 2026-10-21 — Non-security diagnostic cleanup and production acceptance

- Removed ten informational hints through unused-code cleanup and explicit QR
  events; left two copy-API deprecation hints visible to preserve extension
  behavior when async clipboard is denied. Type check: zero errors/warnings,
  two hints. No broad suppression or dependency change.
- Fixed the unsupported Hugo fence language without changing its snippet;
  refreshed the one editorial-ledger language entry. Build: 186 pages, no
  unsupported-language fallback. Content audit: 163 posts, no failures.
- Verification: 210 unit tests, 30 focused Node checks (including two new
  regressions), 125/125 Chrome E2E at two workers, 50 extension browser checks,
  full npm audit zero findings. The missing pinned Chromium was resolved by
  using the existing CLI runtime/browser pair; no browser download. An initial
  local npm PATH error was corrected before the successful complete E2E run.
- Real QR checks pass for desktop open, card keeping open, close button,
  Escape, backdrop and the mobile navigation entry. An initial hidden desktop
  selector timed out at mobile width; selecting actual mobile navigation
  confirms the behavior without a product change.
- Repacked 2.3.0 for the callback-name-only cleanup and refreshed the published
  SHA256. Artalk documentation now distinguishes historic Waline retirement
  and current public imgUpload=false from untested backend upload rejection.
- Security research recommends existing-control verification and incremental
  hardening rather than another framework. No security settings, DB contents,
  paid resources or live comment records changed. Details and primary sources
  are in [build dependency security](features/build-dependency-security.md).
- Normally pushed code `024c537`; EdgeOne deployment `dp5hr9fxfvek` succeeded
  at 21:08:44 China time with 186 built pages. Initial rollout still served old
  content; subsequent fresh contexts confirmed both apex/WWW new QR handler,
  removed old inline handler and the updated download digest.
- Both live ZIP bodies hash to
  `7431779ff49ee6cdaffc24b156be07609742a533c04e1ef73b9938258efed608`
  (18422 bytes), exactly matching the local/source-checked package. Both live
  roadmap pages render the editor and approved comment 2 at 390px without
  overflow; mobile QR open/card/close and Hugo HTML highlighting pass, with no
  observed uncaught page errors. Public roadmap read returns 200/count 1.
- Post-deployment 12-page read-only production smoke passed at 13:10:19 UTC,
  including figures/results artifacts and comment API availability. Its final
  K-Means path has count 0; this is not the roadmap's count. No new comment was
  submitted. Fresh post-commit type check still has only the two legacy hints.
- Unrelated `.workbuddy/` remains excluded. This records tested behavior,
  not exhaustive third-party/old-browser acceptance or a security guarantee.

## 2026-10-21 — Patched build production acceptance

- Normally pushed `c1e3e5e` to the verified GitHub main branch. EdgeOne production deployment `dpjiok1bwp9t` reports success; its Linux build generated 186 pages and completed publication at 20:47:37 China time.
- Initial warm-browser requests still returned old asset names during rollout. A new unauthenticated browser context subsequently loaded both apex and WWW roadmap URLs without cache-busting: HTTP 200, all three CSS asset names exactly match the new local build, Artalk editor/approved test comment visible, document width 390px. This supersedes the earlier in-progress result, not just the platform Ready indicator.
- Post-deployment read-only production smoke completed at 12:49:26 UTC: 12 article/route pages and their figures/results artifacts passed, comment read returned 200. Additional real-browser checks: homepage/games/projects HTTP 200 and 390px width; the actual Transformer course route returned 200 with 29 rendered formulae, zero math errors and loaded local KaTeX font. An exploratory non-existent attention shorthand returned 404; the real course URL is unchanged and passes.
- Old Waline formal and sampled deployment-specific API endpoints return 503; live table counts were independently verified zero. Current Artalk approved record 2 remains publicly readable. No new comments were written, no Artalk data/config was changed, and no paid resource was created.
- Residual non-security diagnostics: 12 informational type-check hints and an unsupported `go-html-template` code-highlighting language fallback to plaintext on a clean content sync. These do not fail build or dependency audit. SMTP delivery, off-host backup, all historical deployment artifacts and older-browser compatibility are not newly certified. Neon-managed history may retain deleted Waline data temporarily; no physical vendor-backup purge is claimed.
- ADR/backfill review used the existing feature/baseline records to document compatibility and retirement decisions; missing packaged ADR reference documents did not become completion evidence. This follow-up changes documentation only; the accepted production code remains `c1e3e5e`.

## 2026-10-21 — Build security repair and authorized Waline retirement

- Upgraded the vulnerable build chain to Astro 7.4.1 / Tailwind 4.3.3 / Sharp 0.35.5, migrated Content Layer APIs without changing article URLs, retained unified math rendering, and removed unused legacy adapters. Clean Node 24/npm 11 install and fresh root audit both report zero vulnerabilities (460 packages), superseding earlier audit counts below.
- EdgeOne build runtime was 22.11.0, insufficient for the upgraded Astro; saved the offered 24.18.0 runtime and read back the setting. No paid resources were added.
- Owner explicitly confirmed clearing only the three old Waline tables, including old accounts, without an export. Neon main/neondb before-counts were comments 3, counters 0, users 2; after-counts independently return 0/0/0. Tables/project/integration remain; Neon-managed history is not physically erased by this operation.
- Paused Vercel lz1031-waline production. A direct formal API probe returns HTTP 503 with DEPLOYMENT_PAUSED. Removed old service source/lockfile/test and unused modal/CSS; no vulnerable dormant Waline package manifest remains. Preview artifacts are not deleted by pause.
- Artalk conf and comment reads still return 200, with the roadmap public count still 1. No Artalk configuration/database mutation was performed.
- Verification before publication: 210 unit tests, 125/125 Chrome E2E (2 workers), 10/10 Node safety tests; content audit 163 posts/32 illustrated/40 image references with no failures. After retiring obsolete files: build 186 pages, type check zero errors/warnings and 12 informational hints, production-only audit zero findings, and 27/27 focused browser tests pass. Fresh 390px homepage screenshot inspected; real local article renders the Artalk editor and approved test comment 2 with document width 390px. Formal and sampled deployment-specific Waline endpoints return 503. Production checks remain gated after the normal push.
- Decisions/baseline updates: [build dependency security](features/build-dependency-security.md). Unrelated `.workbuddy/` remains excluded. Audit zero is not proof that every integration or historical Git artifact is secure; SMTP/off-host backup remain outside this repair.

## 2026-10-21 — Artalk production cutover verified

- Normally pushed `4433f0e` to the verified `LeonZhangDev/leon-zhang1031.github.io` main branch. GitHub reports the existing Vercel build successful. EdgeOne's initial rollout still served the old widget; subsequent fresh real browser navigations confirmed the new Artalk client on both apex and WWW. No manual paid deployment or domain rebinding was needed.
- Verified `https://leonzk.cn/posts/ai-learning-roadmap/` and the equivalent WWW URL without cache-busting parameters: HTTP 200, Artalk editor visible, no active Waline widget, approved comment 2 visible, maintenance message hidden, comment API HTTP 200, no observed uncaught page errors. At 390px both document widths are 390px; both canonical URLs remain apex. Footer management points to the HTTPS Artalk backend. Production mobile screenshot was visually inspected outside the repository.
- Approved-origin API checks return the matching apex/WWW allow-origin header and public comment ID 2; an untrusted origin receives no allow-origin header. A fresh unauthenticated management request returns 403. The original Waline service/database were not modified during cutover.
- Fresh post-commit repeat: 210 unit tests pass, production build succeeds with 186 pages; the existing Artalk Rollup annotation warning is non-fatal. Eight focused Node safety checks pass. Complete browser suite passed 125/125 before publication. These checks are not a comprehensive security audit or a guarantee about every external integration.
- Remaining boundaries: SMTP notifications and off-host backups are not configured; dependency findings described below remain. Authorized test comment 2 is intentionally retained. Unrelated `.workbuddy/` files remain untracked and were not published.

## 2026-10-21 — Artalk pre-publication acceptance passed

- In a fresh persistent Edge profile, the owner signed in directly. Authenticated status reports administrator/login true and survives reload; management requests return 200. No password or authentication token was read or recorded.
- Owner confirmed deleting the earlier test comment and explicitly authorized a replacement. Submitted exactly one replacement through the actual local article widget on `/posts/ai-learning-roadmap/`: comment `2`, HTTP 200, `is_pending=true`. A separate unauthenticated read returned count 0. Approved it through the administrator UI (HTTP 200, action changed from 待审 to 已审); a fresh unauthenticated read returned count 1 and the mobile article rendered the approved text. Keep this authorized test record for owner review.
- Anonymous management `/api/v2/sites` returns 403. Approved website CORS works; an untrusted origin receives no allow-origin header. The restricted sidebar frame policy is installed, not the earlier blanket denial. Public TLS validation succeeds without bypasses.
- Actual backend-connected article renders at 390px with document width 390px, no uncaught page errors, no upload control, and working dark-mode updates. Failure/retry is covered separately by the browser suite's mocked API test. Public configuration currently advertises frontend image upload capability; the website explicitly disables uploads and remote frontend overrides. This is not proof that every backend upload endpoint is disabled.
- Fresh complete browser suite passes **125/125** with two workers (2.5 minutes), superseding the earlier high-concurrency timing failures below. Existing 210-unit-test, Astro check/build, nine safety-test and three Artalk deployment-test results remain recorded below; only documentation changes followed the complete browser run.
- Original Waline service, Neon database and credentials remain untouched by Artalk deployment; no historical migration or database deletion occurred. Artalk uses independent SQLite and verified local consistent backups. Off-host backup and SMTP delivery are not configured.
- Dependency audit still reports 30 existing build-chain findings. The critical [AVIF optimization advisory](https://github.com/advisories/GHSA-26w7-cxv4-gfx2) requires processing attacker-controlled AVIF input. The website is static output, with no visitor image-processing endpoint, and the new widget disables uploads; this narrows public exposure but does not clear build-time risk or the other findings. No major framework upgrade is bundled with this comment-system release.
- Release scope: switch only the website comment client/footer to Artalk, preserving current published features and the Waline rollback source. Inactive historical Waline modal source/styles are deliberately retained for rollback and are not imported by the active layout. Production deployment still needs verification after the normal Git push.

## 2026-10-21 — Artalk local service staged, publication gated

### Public backend prepared; administrator acceptance pending

- Owner reported a repeated administrator-password prompt. Browser logs show repeated `Need login` / 403 immediately after entering management, plus a captcha failure. The minimal custom YAML omitted `login_timeout`, while Artalk's config loader does not merge the example defaults. Added the official example's 259200-second lifetime to the installed configuration and bootstrap template, preserved the previous protected config, and restarted the service without changing the password or database. Public `/api/v2/conf` returns 200 after restart. Successful persistent login still requires the owner's retry before treating this hypothesis as verified.
- Applied the reviewed restricted sidebar embedding policy in Caddy and verified the public CSP header; removed the earlier blanket frame denial. Administrator login page reloaded for a fresh attempt. No authentication tokens/passwords were read or printed.

- Owner completed interactive administrator creation without sharing the password. The database has an administrator record (`is_admin=1`); authenticated login/review remains unverified.
- Added only DNSPod `comments` A record to `82.156.68.115`, TTL 600. Google public DNS confirms this address. Existing apex, WWW and TXT records were preserved. The existing firewall already allowed TCP 80; added only TCP 443, leaving SSH and other rules unchanged. Artalk's own port remains loopback-only.
- Caddy uses automatic HTTPS and proxies to Artalk. Initial ACME validation encountered stale negative DNS caches; after propagation a strict HTTPS request to `/api/v2/conf` returned 200 and Artalk 2.10.0 JSON without bypassing certificate validation. A comment-list request with `Origin: https://leonzk.cn` returned 200 and the matching CORS allow-origin.
- Corrected the installed disabled-email/image-path defaults and restarted Artalk. SQLite integrity check returns `ok`; the consistent-backup command completed successfully, and the service and daily timer are enabled. Backups remain local/root-only, not off-host disaster recovery.
- Sent exactly one test-comment POST on `/__artalk-health-check-20261021/`. HTTP request completed, but the returned fields were initially inspected using the wrong nested shape, so no ID/pending claim is made yet. A fresh anonymous list returns zero comments. Confirm the stored row and approval in the authenticated backend before claiming the write/review flow passes; do not submit duplicates.
- Fresh whole-site browser run: 120/125 pass at 11 workers; five animation timing cases failed. All five pass when rerun alone with one worker, without modifying their application code. Preserve this distinction rather than claiming a clean full-suite run. Nine repository/server/workflow safety tests also pass.
- Browser is left on the Artalk HTTPS login page for the owner. Still gated: admin login/review, public pending-to-approved transition, live frontend/mobile, CORS rejection and management authorization, final embedding policy, cutover/push/deployment. The installed Caddy header currently denies framing; the reviewed template replaces it with a restricted `frame-ancestors` policy so the Artalk sidebar can work from the approved website origins. Apply and verify before publication.
- Dependency audit reports 30 production-tree findings in the existing Astro/build dependency chain, including a critical Astro advisory. Artalk/marked are not listed by this audit; this is not a full security review. No force upgrades or unrelated framework migration were attempted. Assess static-output relevance and disclose remaining risk before release.

- Integrated the newer published website history through `f94fe3a` without resetting or force pushing. Local merge `8b21241` retains the current Journal Suite, Feishu and game pages.
- Downloaded the official Artalk 2.10.0 Linux amd64 archive and verified SHA-256 `8ef3dcb322207ea76038a32d8e137604eba9313259c3423683d80efbcf18aed1` both locally and on the existing Tencent server. Uploaded via the owner's MFA-verified OrcaTerm session.
- Installed Caddy and SQLite from the configured Tencent Ubuntu mirror. Artalk now runs under a dedicated system account, listening only on `127.0.0.1:23366`. A local `/api/v2/conf` request returned valid Artalk 2.10.0 JSON. Independent storage and daily consistent-backup timer are configured; backup execution/integrity is not yet verified.
- New comments default to pending; image uploads, SMTP delivery and social login are disabled. The app key was generated on the server and was never printed or committed. Administrator creation is waiting for the owner to enter a password directly into the terminal; no credentials are requested in chat.
- Frontend changes are local only. Replaced the article widget and footer actions with Artalk; removed the Waline account modal from the active layout. Historical modal source/styles remain temporarily unreferenced for review; the original Waline service and Neon database remain unchanged, and historical comments are not migrated.
- Fresh checks: 210 unit tests pass; Astro check reports zero errors/warnings (14 informational hints); production build succeeds with 186 pages. The focused browser test for unavailable-service messaging and retry recovery passes (1/1, mocked API, not public backend acceptance). DNS/TLS, public API/CORS, administrator login/review and backup integrity remain release gates. No Artalk cutover or Git push yet.
- Initial custom server configuration emitted initialization warnings for the disabled email sender and image path. The bootstrap template now specifies their non-secret defaults; apply this correction to the installed config before final service acceptance. No mail was sent and uploads remain disabled.

## 2026-10-21 — WWW domain binding verified

- Owner requested binding `www.leonzk.cn` to the same website as `leonzk.cn`. Existing EdgeOne project `leon-zhang1031` uses the free plan and includes mainland China; the apex production binding and HTTPS are active.
- An existing WWW binding had no valid CNAME target and its certificate request had failed. Following the console recommendation, removed only that inactive binding and re-added it to production after the five-minute resource-release interval. EdgeOne assigned `www.leonzk.cn.pages.dnsoe6.com`; added only the WWW CNAME in DNSPod, default line / TTL 600. Google public DNS-over-HTTPS returned this exact target. Existing apex/TXT records remain unchanged.
- Selected EdgeOne's free automatically validated/renewed/deployed HTTPS certificate. An initial Edge request failed with `ERR_CERT_COMMON_NAME_INVALID` during rollout; no warning bypass was used. Final console status is active / HTTPS deployed. Actual Edge navigation to both HTTPS homepages returned 200 and title `张坤个人主页`; an HTTP WWW visit landed on HTTPS and returned 200 (browser result, not a claim about the precise redirect status).
- The WWW article `/posts/ai-learning-roadmap/` returned 200, negotiated TLS 1.3 with a TrustAsia certificate for `www.leonzk.cn`, retained the apex canonical URL, and rendered at 390 px with document width 384 px and zero uncaught page errors. This verifies binding and a sample page, not all website/comment functionality. No code deployment or Git push was required.
- Owner waived historical Waline-comment migration. Preserve the original service/database; the waiver removes the full-export prerequisite, not the obligation to validate new Artalk functionality. No new Artalk service, migration, paid resource or Git push occurred.

## 2026-10-21 — Artalk host verified; full backup pending

- Owner selected `comments.leonzk.cn` and the existing Tencent Cloud Beijing Lighthouse server. Live browser and read-only command checks confirmed Ubuntu 24.04.4, 2 CPUs / 2 GB RAM, 33 GB free disk, no 80/443 listener and no active Docker/Nginx/Caddy. Tencent ICP status for `leonzk.cn` is normal and associated with this server.
- Keep restored Waline and the original database intact. No Artalk deployment, database import, comment-domain cutover, paid resource or Git push has occurred. Preserve a full authorized export before importing into independent storage and compare historical records before release.
- The owner sees comment management in their window, but the controlled Edge session's authenticated token endpoint still reports `guest`, with no management navigation. Requested a full administrative export saved outside Git or a redacted navigation screenshot; no permission elevation. GitHub and Docker Hub requests from the server timed out, so official Artalk artifact delivery remains unresolved.
- Repository repair is downloading missing current-remote Git objects in resumable batches; remote feature integration and full regression remain pending. See [comments reliability](features/comments-reliability.md) for migration and rollback gates.

## 2026-10-21 — Waline restored; repository publication pending

- Authenticated Edge inspection confirmed the comment project was connected to the Astro blog. Disconnected that incorrect Git connection; retained Neon integration and all database environment values unchanged.
- Recovered the original server dependency versions and log suppression into `services/waline`; added explicit dynamic MathJax/font and `mhchemparser` function includes after two runtime-failing candidates. Nine dependency-free workflow, identity and service checks passed.
- Owner authorized Vercel CLI in Edge. Deployment `dpl_AJTLvbieVEqjTYtqA4toNqngjsX1` is now promoted to the existing `lz1031-waline.vercel.app` domain with current `SITE_URL`/allowlist. Browser-origin API read returned HTTP 200 / errno 0; the real article editor rendered with zero console errors and no 390px horizontal overflow.
- Owner separately approved one isolated test comment: ID 6, status `waiting`, path `/__waline-health-check-20261021/`. Anonymous reads do not expose it. Login/registration forms render; authenticated original-row comparison and approval/email delivery remain unverified.
- No database migration, initialization, database-credential reveal/download/change, account creation or Git push. Original database configuration was retained, but this is not a full historical-row comparison. Newer remote commits still need integration and regression testing; Git object downloads have encountered a TLS disconnect.

## 2026-10-21 — Site health audit (not release-ready)

- Tested local baseline `269d1f3`: 196 unit tests and 112 Chrome Playwright tests passed; Astro check reported zero errors and five hints; 163-post structural audit passed; production build generated 183 pages. These results do not cover newer remote features absent from the local baseline.
- Fixed the homepage GitHub account link, canonical fallback domain and obsolete hosting attribution. Two identity regression checks passed after failing before the repair; all five dependency-free workflow/identity checks passed. Rebuilt 183 pages and confirmed the local 390px homepage and navigation render with no console errors.
- Live `leonzk.cn` homepage/mobile navigation rendered, but comments remain blocked. The Waline hostname serves the blog homepage and `/api/comment` returns Vercel 404. See [comments reliability](features/comments-reliability.md) for evidence and the non-destructive backend repair boundary. No real comment, account registration, credential change or database operation was performed.
- Fetched remote `f94fe3a`; it contains newer study tools, games and downloads. Complete integration and rerun validation before release; old-baseline test counts are not acceptance evidence for those changes. No remote push or hosting deployment was made.
- Recommendations only: web analytics (Umami), frontend error monitoring (Sentry), retain Waline after backend restoration, and optional read-only article Q&A through a separately secured server API. LangSmith fits future LLM traces/evaluation, not replacement traffic/error monitoring. No analytics, session replay, Agent service or paid plan was enabled.

## 2026-10-21 — Repository automation repair

- GitHub run `39557325695` fetched project data successfully but failed to push with HTTP 403: `github-actions[bot]` had only `contents: read`. Changed the project sync workflow to `contents: write` and removed unused pull-request write permission.
- Gitee run `39558743796` failed authentication against the legacy mirror. Made this optional workflow manual-only and removed force push; retained its destination unchanged pending owner confirmation and a valid `GITEE_TOKEN`. Authentication is not repaired, and no Gitee push was attempted.
- Added a dependency-free regression check: `node --test tests/workflow-safety.test.mjs`. Before the workflow edits all three assertions failed; after the edits all three passed. This checks configuration, not live GitHub token permissions or Gitee authentication.
- Changes are local only. Repository visibility, credentials, hosting configuration, existing local commits and untracked `.workbuddy/` were not changed. Remote execution remains unverified until the workflow changes are published and project sync runs again.
## 2026-10-21 — Journal Suite v1.9.2 publication

- Added `/projects/journal-suite/` and one project-list card using the existing project-page layout.
- User explicitly approved a public install ZIP while retaining the private source repository. ZIP contains only main.js, manifest.json, styles.css and README.md; SHA-256: `d1f690c6f3b9723ee8e08dfaffb3a5bc8593baf50d73f314eea14d60f35c7b5d`.
- Plugin source published normally as `d58738b`; 166 assertions in 7 suites, production build and unused-export check passed. A fresh clone also installed dependencies, passed all suites and built without the old ignored entry file.
- Site pre-release validation: Astro check 0 errors/0 warnings/5 existing hints; production build generated 186 pages. Sparse checkout omits unrelated media, causing four unresolved unrelated Jingxin asset warnings locally; those tracked assets are preserved remotely.
- Local Edge/Playwright passed project-card navigation, detail heading, actual ZIP download and byte hash, checksum link, 390px width with no overflow, and no page errors. Desktop/mobile screenshots were inspected. Actual Obsidian host acceptance is still outstanding and stated on the public page.
- Publish via the existing GitHub main / hosting integration. `[skip actions]` avoids the unrelated Gitee force-push workflow; no domain or proxy change. Production verification will be recorded in the plugin delivery progress once completed.

## 2026-10-02 — Survival trial public beta

- Added the PC Web / 18+ survival trial to the existing game archive and generated detail route, with real gameplay WebP and click-to-load MP4. Preserved all three prior playable games and the latest remote-main content.
- Copied the verified Creator 3.8.8 release package with debug/source maps off and a stable full-viewport shell. Game sidebar phase card has separate cost, due and paid/outstanding lines; regular Debug entry is removed.
- Pre-release verification: 210 unit tests passed; Astro checked 134 files with zero errors/warnings and five existing hints; production build generated 184 pages. Three focused publication browser tests passed, including actual video loading and 390px width. Release-package and website nested-path real mouse smoke both passed new-game/character/starter-box/combat/management flow without page errors or HTTP failures.
- Release isolated in a latest-main worktree, preserving unrelated dirty files in the user's original checkout. Uses the existing GitHub main / Vercel / canonical Worker pipeline without domain/proxy changes; `[skip actions]` prevents the unrelated Gitee force-push workflow.
- Published `b85bc30` normally to main. Vercel reported successful deployment `5XnCGwZa8MqVFzgL3HmZvV73EVNn` (GitHub production deployment 6807199970). Canonical Worker browser smoke passed at 2026-10-02 11:20:53 UTC: four game cards, real 24-second video metadata, 390px width, detail/play links and release gameplay new-game/starter-box/combat/management. A second gameplay pass explicitly waited for all visible art placeholders to disappear before screenshots; page errors and HTTP failures were zero. Public entry: https://zk.lz1031.workers.dev/games/blind-box-survival/ .

## 2026-10-01

- Applied the BaziMiao-inspired study upgrade independently in the existing Astro/TypeScript stack: solar/lunar/direct-pillar modes, gender-based luck direction, minute uncertainty, place calibration preview, basic/pro chart layers, and per-pillar Xun Kong.
- Added deterministic eight-period Dayun, selectable Liunian and Jie-based Liuyue, current-period navigation, and matching SVG/textual Ganzhi relations with node/edge highlighting.
- Connected the selected chart, period, and pillar to factual Ask Classics context and added local knowledge entries for Na Yin, Xun Kong, Dayun, Liunian, Liuyue, and Ganzhi relations.
- Added privacy-safe text/PNG sharing, subject-filtered encrypted casebooks, and Bazi continuation with an in-memory cross-page handshake. The original lunar input survives continuation; successful transfer locks and wipes the source notebook; refresh clears restored input.
- Added regression coverage for date/input conversion, luck direction/rule differences, complete relation groups, period interaction, share downloads, mobile overflow, and encrypted lunar-case continuation.
- Verification: all 206 Vitest tests and all 102 Playwright browser tests passed; the final Bazi contrast adjustment passed another 14 related browser tests. Astro checked 125 files with zero errors and zero warnings (five pre-existing informational hints). The production build completed with all 182 pages. Desktop and 390px result screenshots were inspected, and `git diff --check` passed. These were pre-release checks; publication evidence is recorded below.
- Release integration: preserved all nine existing remote-main blog commits through `73a6006`, resolving only the shared progress-document insertion by retaining both histories. The integrated tree passed 209 unit tests, 122 browser tests, and Astro checking with zero errors/warnings (five existing hints); the production build generated 183 pages. Deployment uses the existing main-to-Vercel pipeline behind the canonical Worker, with no domain or proxy configuration change and no Gitee force-push task.
- Published integration `8dfa324` to GitHub main; Vercel reported successful production deployment (`4WvJeTUQC694GmbrvT9QojnDUS4P`). Live Worker checks verified all eleven rooms, the Bazi golden chart and period/relationship controls, all three complete lot sequences, Five Elements, woodfish, Qimen, and I Ching, but detected an intermittent media-volume exception. A RAF timestamp slightly preceding fade setup made the cubic easing extrapolate above 1; both fade progress and final media volume are now bounded. The regression reproduces that earlier timestamp. Remediation passed all 210 unit tests, 47 sound-bearing-room browser tests, and type checking with zero errors/warnings (five existing hints); final live verification follows redeployment.
- Remediation `f72c2ac` was pushed normally to main and successfully deployed (`GQfv4Yh4zeWoc8rq2KVoGHUHiwvK`). The final canonical Worker browser smoke passed at 2026-10-01 06:24:17 UTC: eleven routes HTTP 200 with private metadata, Bazi golden calculation/period relations/Ask Classics/mobile width/refresh-clears-input, Five Elements interaction, woodfish strike/pause/default sound, all three complete sixteen-frame lot animations, Qimen and I Ching calculation, replacement audio/PWA files, and sitemap exclusion. The browser loaded the fixed compiled woodfish module; no page errors occurred. Production desktop/mobile Bazi screenshots were captured and the desktop image inspected. No domain, Worker proxy, backend, or unrelated dirty-checkout change was made.

## 2026-09-30

- Added a site-wide local `问典` study drawer with versioned Five Elements, Bazi, I Ching, Qimen, and ritual entries; answers separate definitions, rules, boundaries, and source clues and refuse high-stakes prediction prompts.
- Connected clickable study terms and Five Elements deep links to the same knowledge surface without adding a remote model or transmitting page inputs.
- Added explicit encrypted study-case saves for Bazi, Qimen, I Ching, and all three lot collections while preserving the existing AES-GCM notebook envelope and refresh-clears-input behavior.
- Added an unlocked case index, two-case comparison, and privacy-stripped result copying to `静心手札`.
- Added the non-predictive `今日入堂` hall card, last-room continuation, one-minute breathing entry, reversible focus mode, shared master mute, and trusted-gesture mobile haptics.
- Added a scoped `/jing/` manifest and offline service worker; non-Jingxin routes remain untouched.
- Verification added for local knowledge retrieval/refusal, Unicode case markers, Ask Classics UI, focus mode, Five Elements deep links, and encrypted Bazi case save/unlock/index flow.

## 2026-09-20 — Fourth blog foundations batch

- Revised four ML foundations posts: defer final test evaluation until selection, fix NumPy log indexing and missing imports, distinguish RMSE/MAE and coefficient/inference assumptions, preserve the selected KMeans model and preprocessing, and select tree depth within training folds.
- Executed 18 labelled code fences from the actual trusted article files; generated four measured teaching figures, three CSVs and one environment/results JSON. All eight artifacts reproduced byte-for-byte in this environment.
- Existing Windows joblib multiprocessing failed with missing `_posixsubprocess`; the small teaching search now uses one process. No system changes or new dependencies; parallel execution is not claimed repaired.
- Structural audit: 163 posts, 32 illustrated posts, 40 image references, no failures. Unit tests: 196 passed; Astro check zero errors/five existing hints; build generated 183 pages. Chrome Playwright rerun: 112 passed; all four figures visually inspected; mobile zoom/Escape/focus and desktop layout passed.
- Published implementation `9ab38e4`; Worker smoke passed at 2026-09-20 12:07:28 UTC after the first run could not yet find the new Iris figure. Twelve pages returned 200; fourth-batch figures/JSON loaded, mobile width passed, comment read returned 200/errno=0. No comment submission, domain/routing change or backend configuration change.
- Targeted deepening covers 41 unique posts across four batches, with 122 outside these batches. This does not certify full technical reproduction of any article or all corpus content.

## 2026-09-20 — Third blog validation-protocol batch

- Revised time-series forecasting, anomaly detection and AutoML search articles: corrected centered-window leakage, prediction-horizon assumptions, calibration boundaries and inactive pruning claims; removed unsupported historical benchmark rankings.
- Added an offline synthetic runner extracting actual article functions, with four figures, three CSV files and environment/results JSON. Eight artifacts reproduced byte-for-byte in the same environment.
- Verified 196 unit and 107 Chrome Playwright tests; Astro check zero errors/five existing hints; 163-post structural audit passed with 28 illustrated posts and 36 image references.
- No new dependencies, model downloads or external experiment writes. Optuna/TPE, ARIMA/Prophet/LSTM, OCSVM/AE and real business benchmarks remain unexecuted in this batch.
- Published implementation `0a0da9e`; Worker smoke passed at 2026-09-20 10:18:08 UTC after an initial pre-deployment missing-image timeout. Eight pages returned 200; third-batch figures and JSON loaded, mobile width passed, comment read returned 200/errno=0 (no submission). Broader corpus review and original evidence remain outstanding.

## 2026-09-20 — Second blog correctness batch

- Revised 8 posts across A/B statistics, OpenCV and speech evaluation; corrected runnable errors and removed unsupported accuracy/speed claims rather than fabricating historical logs.
- Added 8 measured teaching figures, CSV/JSON evidence, and an offline runner with synthetic inputs. Extracted the actual article classifier and passed six match/reject/invalid-input cases.
- Verified 196 unit tests and 103 Chrome Playwright tests; scoped verification metadata distinguishes executed examples from camera, GUI, real photographs and Whisper workflows that were not run.
- Comment API read returned 200/errno=0 with the Worker Origin; no comment was submitted. Browser-origin read check is included in the production smoke.
- Published implementation `1c450c5` to main. Worker production smoke passed at 2026-09-20 08:35:38 UTC: five pages HTTP 200, new images/JSON available, mobile width valid, browser-origin comment read HTTP 200/errno=0. No comment submission tested. Ten generated artifacts reproduced byte-for-byte in the same environment.
- Corpus-wide technical review and original project evidence remain outstanding; see [editorial delivery](editorial/delivery.md).

## 2026-09-20 — Blog depth and reading tools

- Inventoried all 163 posts with per-article editorial cards; automatic inventory is not a full technical review.
- Deepened 26 existing articles: 18 original explanatory diagrams, two measured CPU plots, exercises, evidence boundaries and targeted technical corrections.
- Added 12 learning paths, research milestone contracts, article TOC, series navigation, related posts, optional prerequisites, scoped verification metadata, image zoom and code copy/failure handling.
- Five CPU teaching experiments ran successfully; source, environment versions, CSV, SVG and JSON artifacts are included. No GPU, live model serving or historic project benchmark reproduction is claimed.
- Verification: 196 unit tests, 94 Playwright tests using installed Chrome, Astro check with zero errors and five existing hints; all 163 published article pages, internal article links and local images checked.
- Published code commits `b75e491` and `afb55e0` to GitHub main, skipping GitHub Actions to avoid the existing force-push Gitee mirror workflow. On 2026-09-20 07:15 UTC, the Worker production browser smoke passed: learning routes and article returned 200, image modal/Escape and mobile width passed, experiment JSON/SVG were available.
- Remaining: full per-paragraph technical review of the corpus; historical benchmark logs/screenshots; GPU/external-service experiments. See [editorial delivery](editorial/delivery.md).

## 2026-09-01

- Applied the professional-study visual pass to Bazi, I Ching, and Qimen without changing their existing local calculation boundaries.
- Bazi now exposes hidden stems, hidden-stem ten gods, Na Yin, clearer paper contrast, compact examples, and a return-to-input action.
- I Ching now builds six lines visibly from bottom to top, uses larger two-sided coins, and compares primary and changed hexagrams before secondary derived views.
- Qimen now opens as one focused school board with explicit school switching and an optional three-school comparison layout.
- Replaced the woodfish, lot-draw, and coin action audio with the three user-supplied root recordings; sound controls default to enabled and persist an explicit mute choice.
- Removed the lot redraw cooldown and chant-highlight action, then separated the source disclosure, optional question field, and action row so they no longer intercept one another.
- Reframed all three sixteen-frame lot animations from their full-sequence alpha unions onto fixed 2:3 transparent canvases, with shared scale, stable bottom-center anchors, audited safe margins, and matched web/high-resolution outputs so no vessel, flying stick, or settled stick is cropped.
- Verification: Astro check completed with zero errors; Vitest passed all 193 tests; the complete Playwright suite passed all 88 tests; the production build generated all 182 pages.

## Remaining

- Bazi Shensha and strength/useful-god interpretations remain unautomated pending specific versioned rule-table choices; professional results currently expose auditable calendar and relationship structures.
- I Ching original judgment and line texts remain intentionally untranscribed pending a versioned public-domain text edition decision.


## 2026-10-21 — 飞书图文复制 2.3.0

- 在 Projects 的 GitHub 模块增加扩展卡片，提供详情、安装包与源码入口。
- 源码与测试位于 tools/feishu-copy-helper；ZIP 使用 6 文件白名单，附带 SHA256，避免发布本地会话和配置。
- 新增保留格式、纯文本、Markdown 模式和真实页面连接检测；18 项逻辑测试、50 项安装包浏览器检查通过。
- 复用真实布局的 2 页面局部构建通过；完整站点部署结果以 GitHub 提交状态和线上访问核对为准。
- 设计和验证边界见 [功能说明](features/feishu-copy-helper.md)。
