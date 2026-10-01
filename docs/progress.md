# Project Progress

## 2026-10-01

- Applied the BaziMiao-inspired study upgrade independently in the existing Astro/TypeScript stack: solar/lunar/direct-pillar modes, gender-based luck direction, minute uncertainty, place calibration preview, basic/pro chart layers, and per-pillar Xun Kong.
- Added deterministic eight-period Dayun, selectable Liunian and Jie-based Liuyue, current-period navigation, and matching SVG/textual Ganzhi relations with node/edge highlighting.
- Connected the selected chart, period, and pillar to factual Ask Classics context and added local knowledge entries for Na Yin, Xun Kong, Dayun, Liunian, Liuyue, and Ganzhi relations.
- Added privacy-safe text/PNG sharing, subject-filtered encrypted casebooks, and Bazi continuation with an in-memory cross-page handshake. The original lunar input survives continuation; successful transfer locks and wipes the source notebook; refresh clears restored input.
- Added regression coverage for date/input conversion, luck direction/rule differences, complete relation groups, period interaction, share downloads, mobile overflow, and encrypted lunar-case continuation.
- Verification: all 206 Vitest tests and all 102 Playwright browser tests passed; the final Bazi contrast adjustment passed another 14 related browser tests. Astro checked 125 files with zero errors and zero warnings (five pre-existing informational hints). The production build completed with all 182 pages. Desktop and 390px result screenshots were inspected, and `git diff --check` passed. This revision has not been deployed.

## 2026-09-30

- Added a site-wide local `问典` study drawer with versioned Five Elements, Bazi, I Ching, Qimen, and ritual entries; answers separate definitions, rules, boundaries, and source clues and refuse high-stakes prediction prompts.
- Connected clickable study terms and Five Elements deep links to the same knowledge surface without adding a remote model or transmitting page inputs.
- Added explicit encrypted study-case saves for Bazi, Qimen, I Ching, and all three lot collections while preserving the existing AES-GCM notebook envelope and refresh-clears-input behavior.
- Added an unlocked case index, two-case comparison, and privacy-stripped result copying to `静心手札`.
- Added the non-predictive `今日入堂` hall card, last-room continuation, one-minute breathing entry, reversible focus mode, shared master mute, and trusted-gesture mobile haptics.
- Added a scoped `/jing/` manifest and offline service worker; non-Jingxin routes remain untouched.
- Verification added for local knowledge retrieval/refusal, Unicode case markers, Ask Classics UI, focus mode, Five Elements deep links, and encrypted Bazi case save/unlock/index flow.

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
