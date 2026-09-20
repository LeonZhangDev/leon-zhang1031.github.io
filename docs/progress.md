# Project Progress

## 2026-09-20 — Fourth blog foundations batch

- Revised four ML foundations posts: defer final test evaluation until selection, fix NumPy log indexing and missing imports, distinguish RMSE/MAE and coefficient/inference assumptions, preserve the selected KMeans model and preprocessing, and select tree depth within training folds.
- Executed 18 labelled code fences from the actual trusted article files; generated four measured teaching figures, three CSVs and one environment/results JSON. All eight artifacts reproduced byte-for-byte in this environment.
- Existing Windows joblib multiprocessing failed with missing `_posixsubprocess`; the small teaching search now uses one process. No system changes or new dependencies; parallel execution is not claimed repaired.
- Structural audit: 163 posts, 32 illustrated posts, 40 image references, no failures. Unit tests: 196 passed; Astro check zero errors/five existing hints; build generated 183 pages. Chrome Playwright rerun: 112 passed; all four figures visually inspected; mobile zoom/Escape/focus and desktop layout passed. Production verification pending.
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

- Full luck-cycle calculation for Bazi remains intentionally absent until gender/direction and start-luck rule choices are specified.
- I Ching original judgment and line texts remain intentionally untranscribed pending a versioned public-domain text edition decision.
