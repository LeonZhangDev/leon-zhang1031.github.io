# Project Progress

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
