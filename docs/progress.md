# Project Progress

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
