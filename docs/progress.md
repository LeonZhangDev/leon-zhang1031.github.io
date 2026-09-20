# Project Progress

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
