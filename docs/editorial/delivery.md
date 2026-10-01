# 博客升级实施记录

## 范围

用户批准：163 篇内容盘点、代表作深化、课程衔接、技术配图、可复现示例、阅读功能、验证和分批发布。

## 验收分层

1. 结构盘点：标题、摘要、章节、代码块、图片、链接、待核验断言。
2. 编辑深化：准确解释、适用边界、针对性练习、图文衔接。
3. 来源核验：记录官方来源、日期和具体核验范围。
4. 示例运行：记录环境、输入、结果和可运行入口。
5. 实验复现：原始数据、协议、日志、误差范围与比较条件。
6. 发布验证：生产页面与资源可用。

前一层通过不代表后一层通过。不得将整站构建成功描述为 163 篇模型实验全部复现。

## 本批实现

- 163 篇逐篇结构台账与待核验线索。
- 12 条人工编排的学习路线，涵盖深度学习 10 课与科研案例 27 课。
- 全站文章目录、系列前后篇、前置阅读、相关内容、中文阅读时长。
- 键盘可用的图片放大、代码复制与复制失败提示。
- 可选更新日期与限定范围的验证状态。
- 原创可重建 SVG 图解，以及插图位置对应的解释与练习。
- 修复评估文章中的测试集选阈值、数组长度和边界候选问题。
- 更新科研采集文章 OpenAlex 鉴权与分页约束。
- 五项 CPU 最小实验：合成二维分类、有限差分、因果注意力、拷贝边界、验证集阈值；环境与输出在 `public/examples/blog/`，入口在 `examples/blog/`。训练和注意力图来自真实执行，非真实业务基准。
- 修订科研课程 M1–M5 契约与教学/实测边界；将未提供原始记录的成绩表改成待测模板。修复 Trainer 缺少 F1 计算与保存策略、Streamlit 小样本抽样、bootstrap 标签集与随机种子等问题；这些课程代码未声称完整运行。

## 第二批：统计、OpenCV 与语音评估（2026-09-20）

对以下 8 篇逐篇阅读后定向修订，不代表完成整站技术审读。用 humanize-writing 清理聊天残留与无证据成绩，保留原有教程结构；没有批量重写其余文章。

| 文章 slug | 修正内容 | 实际执行与剩余边界 |
| --- | --- | --- |
| ab-testing-statistics | 区间返回值、样本量方向与向上取整、p 值解释、CUPED 系数、停止规则 | 教学计数、10000 次 A/A 和合成 CUPED；非业务实验 |
| python-opencv-tips | 模块别名、读图检查、摄像头释放、reshape/按键边界 | 静态修订；未接摄像头或执行 HDR/GUI |
| python-opencv-geometry-transform | 数学/图像坐标、Pillow 方向、逆映射、负剪切画布 | 合成平移与旋转断言；剪切与外部图片示例未跑 |
| opencv-image-interpolation-mask-roi-watermark-grayscale-tutorial | 单位变换无对照意义、mask 参数位置、水印极性、连续 alpha、边界默认值 | 插值、水印合成与保留背景断言；未测透明 PNG 与 GUI |
| opencv-contour-feature-extraction | Canny 输入与滞后、空轮廓、绘制线宽、占位图 | 凹多边形凸包/矩形/圆与面积；非真实目标识别 |
| opencv-hough-transform-brightness | 法向参数、None 返回、有符号坐标、uint8/NumPy 2 边界 | 亮度数组实验；霍夫检测与滑块未执行 |
| opencv-practical-projects | 撤下无日志成绩与固定加速倍数、拒识/校验、CLI 只输出候选计数 | 合成三圆盘；提取正文分类函数测六个案例；无实拍准确率与金额验收 |
| speech-recognition-basics | 帧移/重叠、MFCC 压缩比、Whisper 特征与长音频、CER 与 WER | 标准库编辑距离复算；未运行 jiwer/librosa/Whisper |

运行入口 `examples/blog/review-examples.py`；产物 `public/examples/blog-review-02/` 包含 8 张图、误报曲线 CSV、带版本的结果 JSON。图均为脚本生成的教学数据，不替代历史照片。轮廓图检查时发现圆边缘被画布裁切，已扩大展示画布并重跑。

结果摘要：双侧 p=0.066748、95% Newcombe 区间跨零、样本量 31218/组；A/A 固定终点误报 4.94%，20 次未经校正查看为 24.87%；中文一字替换 CER=1/12，默认空格 WER=1。后两项不是语音模型成绩。

本批本地验证：Python 脚本运行成功；结构检查 163 篇、25 篇有 Markdown 插图、32 处图片引用，失败为 0；196 个单元测试通过；Playwright 使用已安装 Chrome，103 个测试通过（新增 8 篇页面检查与 1 项结果文件检查）。Astro check 为 0 errors、5 个既有 hints。新增检查覆盖实际图片加载、手机宽度、数学渲染、JS 异常与 A/B 配图放大/Esc/焦点恢复。桌面 1440×1000、手机 390×844 截图存系统临时目录，未提交仓库。

首次增量同步输出已修改文章的 duplicate-id 提示；没有新增同名文件。最终独立 `npm run build` 不再出现该提示，成功生成 183 页。

评论只读诊断：没有 Origin 的服务端请求返回 403；加入 Worker Origin/Referer 后返回 HTTP 200、errno=0。403 不能单独证明服务故障，浏览器 CORS 与实际提交仍须区分。本轮不写入测试评论、不改后端设置。

发布实现提交 `1c450c5`，正常推送 main（`[skip actions]`，未强推）。首次检查因新部署尚未可见而等待新增图片超时；随后于 2026-09-20 08:35:38 UTC 重新执行生产脚本通过：学习路线、训练循环、A/B、水印、硬币五个页面均 HTTP 200；新增配图与 JSON 可用，手机无全页横向溢出。真实浏览器从 Worker 页面读取评论 API 返回 HTTP 200、errno=0，未提交评论。没有修改域名、平台路由或评论配置。

复跑全部 10 个生成文件，与上次结果 SHA-256 逐一一致；此结论仅针对同一环境，不承诺跨平台逐字节一致。

## 第三批：预测与验证协议（2026-09-20）

逐篇审读并修订 time-series-analysis、anomaly-detection-practice、automl-optuna-tuning，保留 slug。用 humanize-writing 收敛无来源排名与夸张结论，没有用新编的经验替代旧成绩。

| 修改类别 | 修正 | 示例 |
| --- | --- | --- |
| 技术边界 | 预测时点与阈值校准分开 | 居中窗口改为过去窗口；训练误差分位改为独立校准 |
| 证据 | 无日志成绩改成待测项 | 撤下 3 天→1.5 天及旧 XGBoost AUC 排名 |
| 表述 | 删除无条件性能承诺 | 不再声称 Prophet 几乎不用调参、孤立森林全面胜过 OCSVM |

复跑脚本 `examples/blog/review-model-validation.py` 提取正文函数执行，产物在 `public/examples/blog-review-03/`：4 SVG、3 CSV、1 JSON。Python 3.13.7、NumPy 2.2.6、Pandas 2.3.1、sklearn 1.7.1、Matplotlib 3.10.5；使用现有环境，未安装新依赖。

- 三折时间回测验证未来扰动隔离、非正 lag 拒绝；同时演示一步逐日观测与固定起点递归，未跑 ARIMA/Prophet/LSTM。
- 因果告警验证预热、零方差与未来不变性；居中窗口反例确实受未来影响。独立正常校准的孤立森林在合成测试得到 TP=38、FP=3、FN=2、TN=397，不外推为业务成绩。
- 网格与随机搜索各 12 候选、相同三折 CV，按开发集选定网格候选，最终测试 AUC=0.976177，仅调用测试一次。没有 Optuna，未将 sklearn 实验冒充 TPE 或剪枝实测。
- 官方来源核对：ADF 原假设、TimeSeriesSplit gap/等间隔约束、OCSVM nu、IsolationForest offset、Prophet 绘图接口及 Optuna MedianPruner 显式报告机制；链接附在对应正文。

本地验证：196 个单元测试、107 个 Chrome Playwright 测试通过；Astro check 0 errors、5 个既有 hints。结构检查覆盖 163 篇、28 篇有 Markdown 图片、36 处图片引用，无失败。浏览器覆盖三篇新增内容、图片加载、手机宽度与放大/Esc/焦点返回，截图保存在系统临时目录 `blog-review-anomaly-mobile.png`、`blog-review-anomaly-desktop.png`。8 个产物同环境复跑 SHA-256 一致；不是跨平台确定性保证。

发布实现提交 `0a0da9e`，main 正常推送，使用 `[skip actions]` 避免旧 Gitee 强推流程。首次生产检查在新部署可见前等待新图超时；2026-09-20 10:18:08 UTC 重试通过。八个页面 HTTP 200，新三篇图片和结果 JSON 可读，手机宽度正常；真实浏览器评论读取 HTTP 200、errno=0，未提交评论。未变更域名、路由或评论后端。

## 第四批：基础机器学习（2026-09-20）

本批修订四篇，未改 slug：

| 文章 | 关键修正 | 实际执行范围 |
| --- | --- | --- |
| ml-basics-scikit-learn | 搜索后再最终评估；缺失与未知类别；持久化安全边界 | Iris 五折选择与预留集预测；混合表格；自建可信模型临时往返 |
| ml-linear-regression | RMSE/MAE；R² 常数目标；含截距 VIF；正则尺度；数组 log 与缺失导入 | 合成 500 样本回归及标记片段，RMSE=11.844391、MAE=9.741236 |
| ml-decision-tree | 训练内部选深度；Gini 多类上界；重要性与外推限制 | Wine 五折、diabetes 片段、独立合成外推；选中深度 5 |
| ml-kmeans-clustering | 候选循环不覆盖 K=2；复用缩放；簇标签非序数；停止与噪声边界 | 八样本候选与预测；400 点双月固定参数对比，不按 ARI 调参 |

执行 `examples/blog/review-ml-foundations.py`，直接提取正文 18 个标记代码块。产物 `public/examples/blog-review-04/` 为 4 SVG、3 CSV、1 JSON；8 个文件同环境复跑 SHA-256 一致。环境：Python 3.13.7、sklearn 1.7.1 等，详见 JSON；官方 stable 文档核对与本地版本实测分开记录，不声称使用最新版运行。

教学参数锁定后，Iris 的 30 个预留样本恰好全部预测正确，不代表部署效果；Wine 36 个预留样本 macro-F1=0.945741。双月 ARI 是有生成标签的教学比较，不是真实业务分群成绩。真实房价、部署模型和其他练习未执行。

首次执行 `n_jobs=-1` 触发本机 joblib `_posixsubprocess` 缺失；教学搜索改成单进程后通过，未调整系统环境。正文额外提醒并行需要单独验证。初次浏览器标题断言错误地要求文章页包含首页名，实际页面标题为文章名；修正为与 h1 对应后重跑，未为迎合错误断言修改页面。

本地结构检查 163 篇、32 篇插图、40 处图片引用，无失败；196 个单元测试通过；Astro check 为 0 errors、5 个既有 hints，构建生成 183 页。Chrome Playwright 重跑 112 项全通过。按 frontend-testing-debugging 技能验收，Browser 插件不可用，采用现有 Playwright；桌面 1440×1000、手机 390×844 检查页面身份、正文、无错误覆盖层、实际图片加载、放大/Esc/焦点返回、无全页溢出。K-Means 首屏另查 console/pageerror 均为空；评论在本地使用模拟响应，不据此宣称真实提交成功。四张实验图截图已目视检查，系统临时目录存储 `blog-review-ml-*.png` 与三篇 `ml-*-figure.png`，不提交截图。最后独立浏览器构建通过，增量同步的 duplicate-id 提示不再复现。生产结果待补。

实现提交 `9ab38e4` 正常推送 main，带 `[skip actions]`。首次线上检查尚未找到新增 Iris 图并超时；2026-09-20 12:07:28 UTC 重跑生产脚本通过：12 个 Worker 页面均 HTTP 200，新增四图与结果 JSON 可用，手机宽度正常，浏览器跨源评论读取 HTTP 200/errno=0。未提交评论，未改域名、路由或后端配置。本批生产验收完成。

累计四批覆盖 41 个唯一文章 slug，另外 122 篇尚未进入这些深化批次；自动台账仍不等于全文审读完成。

## 尚需证据的工作（持续）

- 全部 163 篇的逐段技术审读与所有外部 API 版本复查，不得用自动台账替代。
- 历史 MindTrip、AtlasSplit、游戏平台发布与性能数据的原始日志、版本和截图。
- 涉及 GPU、外部账户、模型权重和数据许可的实验分别建立实际运行记录。
- 本批已发布并通过 Worker 冒烟测试；后续批次仍需重复生产验收。

## 发布安全

现有 `sync-to-gitee.yml` 会强制推送旧镜像，本批提交使用 `[skip actions]` 跳过 GitHub Actions，避免触发该旧目标。Vercel Git 集成是否部署成功必须单独检查，不以 Git 推送成功代替生产验收。

## 本地验证记录（2026-09-20）

- Node 24.19.0，未修改系统默认 Node；Python 3.13.7，CPU。
- `npm run blog:check`：163 篇，20 篇有 Markdown 插图，24 处图片引用；资源与文章链接检查无失败。
- `npm test`：20 个测试文件、196 个测试通过。
- `npm run check`：0 errors、5 个既有 hints。
- `PLAYWRIGHT_CHANNEL=chrome npm run test:e2e -- --workers=4`：94 个测试全部通过。
- 阅读用例覆盖页面身份、非空内容、无框架错误覆盖层、JS 运行错误、目录跳转、真实剪贴板读写、剪贴板拒绝、图片对话框、Esc/焦点恢复与手机无横向溢出。
- 所有已发布文章的生成页面、内部文章链接、本地图片文件和数学解析标记均已检查。
- 实际截图在系统临时目录 `blog-reading-mobile.png` 与 `blog-reading-desktop.png`，不提交到源码仓库。
- 初次浏览器运行缺少对应 Playwright Chromium 版本；改为本机已安装 Chrome 后通过，没有额外安装浏览器。复制测试初版定位器跟随按钮文案改变而误选下一按钮，改为稳定选择器后验证真实剪贴板内容。
- 评论恢复测试使用模拟 API；没有验证真实服务可提交评论，不据此宣布评论服务恢复。

## 生产验证记录

- 仓库：`LeonZhangDev/leon-zhang1031.github.io`，分支 `main`；实现提交 `b75e491`，生成文件规范化提交 `afb55e0`。
- 最终构建生成 183 个页面。`git push` 明确成功，未强推。
- 2026-09-20 07:15 UTC，执行 `node scripts/blog/verify-production.mjs` 成功。
- `https://zk.lz1031.workers.dev/posts/learning-paths/` 与 `/posts/deep-learning-01-training-loop/` 返回 HTTP 200，标题和新内容符合预期。
- 生产手机视口 390×844：图片对话框打开/Esc 关闭、无全页横向溢出；实测曲线成功加载，结果 JSON 中 CPU 环境和阈值 0.65 得到核对。
- 未修改 Cloudflare 路由、Vercel 项目名称或评论后端。没有把生产页面可访问当作全站所有业务路径已验证。

## 审校规则

保留现有 slug。优先补条件与证据，避免机械扩写。代码区分完整示例、依赖前文的片段和伪代码。实验结果、教学合成数据、概念图和历史截图分别标注。每张技术图必须有解释任务；没有必要时不强行配图。日期仅在本次确有修改或验证时更新。

## 维护

文章改变后重建台账，检查资源和内部链接。外部 API 文章在实际使用和相关版本变化时复核；发布前检查正文、图注、源图和运行记录一致。
