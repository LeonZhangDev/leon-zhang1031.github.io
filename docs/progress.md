# Project Progress

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
