# Jingxin Hall

## Production atlas follow-up — 2026-10-23

### Production acceptance — 2026-10-23

- Normally published application commit `e3e92f7` through the existing GitHub
  main deployment pipeline; Vercel reports success. Fresh public EdgeOne visits
  subsequently confirm the optimized atlas on the canonical site without cache-
  busting URLs. No domain, paid resource or backend/data configuration changed.
- Five fresh mobile Chrome contexts on the real production URL, with the same
  5 Mbps / 60 ms / 4× CPU setup: LCP **7,392→2,032 ms** median (-72.5%), sample
  P75 **7,432→2,072 ms**, final range **1,844–2,092 ms**. Every after sample meets
  2.5 s, has empty HTTP cache, keeps the woodfish as final LCP and has no page
  errors or layout shifts. Transfer **3,664,654→912,597 B**; full-load median
  **7,353→2,532 ms**. These separate before/after cohorts include real CDN timing;
  they are not field-user P75 data or a guarantee for every physical phone/network.
- Real touch/keyboard/count/pause/reset pass. Home, Jing hall, Agent foundations
  with its course sidebar, Transformer math article, games and roadmap return
  200 without mobile overflow/math errors. The real deferred Artalk editor opens;
  no comment is submitted. No uncaught page errors occur across seven routes.
- Optimized atlas and three selected prop images match source SHA256 byte for
  byte; the preserved lossless atlas also matches. The production worker serves
  `Cache-Control: no-cache`, contains the committed worker code and its exact
  versioned public graph. A fresh production profile installs all 147 files, clears
  normal HTTP cache, then enters ten rooms offline and passes first-use effects,
  calculations, lot editions, encrypted saving, 206 audio range and shortcuts.
  Private plaintext and query URLs remain absent from the public cache.
- Actual Linux/Git-normalized worker version: `6ba85d8450becd43a036`,
  12,476,593 public bytes. This differs from
  the Windows local version because Git normalizes checked-in text line endings.
  The worker template matches committed source, its version recomputes correctly,
  and every differing public-text entry matches the corresponding Git blob.
  Image hashes agree and actual production offline verification passes.
- Full receipts, failed initial production cohort, raw visits and local artifacts
  remain in `.tmp/muyu-mobile-release/`. Rollback target before this performance
  release is `584eea9`; the intermediate props-only release is `c4382f4`.
  Roll back through a normal compensating commit and verify the worker update;
  do not reset user work, force-push or delete private storage.



The first authorized publication, `c4382f4`, passed the local target, but the
actual production CDN cohort remained above budget: five cold mobile visits
measured 2,768–3,100 ms, median 2,824 ms. Those results are preserved, and were
not presented as completion. The remaining atlas transfer is reduced further.

### Design decisions

- The existing Sharp producer adds `strike-sequence-optimized.webp`: 593,902 B
  versus the lossless atlas's 987,220 B (-39.8%). All six 512×512 frames remain
  in their original 1536×1024 atlas. The original PNG and lossless WebP stay in
  public assets. The codec remains WebP, with no new runtime loader or fallback
  branch; the existing CSS background and its matching head preload select it.
- This derivative uses **near-lossless** preprocessing, not an exact-pixel claim.
  Every pixel is composited against backgrounds 0/32/128/255 and checked: maximum
  RGB difference 4/255, alpha difference 2/255. Its rendered error is smaller than
  the tested AVIF alternatives. Pose, grid, timing, effects, audio and gameplay
  scripts are unchanged. The seven responsive prop variants remain as above.
- The cache graph automatically replaces the old atlas with its new derivative;
  still 147 files, now 12,476,617 B, local version `e2be968311540ee3064c`.
  The complete offline payload is slightly smaller than the previous hall-only
  cache despite retaining every responsive prop candidate.

### Final controlled comparison

Same conditions and fifteen alternating pairs per device as documented below.
The comparison baseline includes the prior unshipped performance batches; it is
separate from the much slower old PNG version formerly served in production.

| Metric | Before | Final after |
| --- | ---: | ---: |
| Mobile median LCP | 3,324 ms | 1,564 ms (-52.9%) |
| Mobile P75 / maximum LCP | 3,340 / 3,356 ms | 1,568 / 1,580 ms |
| Mobile median load | 3,277 ms | 1,518 ms |
| Mobile transfer | 1,966,107 B | 835,498 B (-57.5%) |
| Desktop median LCP | 3,288 ms | 1,324 ms (-59.7%) |
| Desktop P75 / maximum LCP | 3,304 / 3,324 ms | 1,336 / 1,344 ms |
| Final CLS / script errors | — | 0 / 0 |

All fifteen after visits on each device meet 2.5 s; LCP still belongs to the
visible woodfish sprite. No metric is gained by removing or hiding the sprite.

### Final verification

- Fresh 211-page build, all 29 Node checks and all 98 Jing browser tests pass
  after the atlas change. The earlier 212 unit checks and 25 blog/security browser
  checks cover modules unchanged by this follow-up; Astro check remains zero
  errors/warnings with 26 pre-existing hints.
- Twenty-four settled frame/theme/device pairs preserve all geometry, main
  content and computed styles after normalizing only the expected atlas URL.
  Maximum pixels above RGB delta 8: 0.275%; maximum full-screen RMSE 1.205.
  All such differences remain in resized-prop regions; the woodfish region
  stays below the threshold across all six frames. No horizontal overflow.
- Both final desktop/mobile profiles cache all 147 assets, clear normal HTTP
  cache, enter ten rooms offline and execute first-use interactions. Encrypted
  saving, audio ranges and query shortcuts pass with no cached private plaintext
  or query URLs and no page errors.
- Final artifact proof: all JS/media originals and non-Jing HTML remain identical
  to the integrated baseline. Room CSS changes only its atlas URL. Ten room HTML
  files update the corresponding CSS hash; woodfish additionally has its approved
  preload/srcset attributes. The derived worker and optimized atlas are expected
  changes. Raw comparisons and rejected encodings are retained under the evidence
  directory. Actual production acceptance follows publication and is separate
  from the controlled desktop-Chrome simulation, not a field-P75 guarantee.


## Woodfish mobile cold-load release — 2026-10-23

User authorized optimization followed by production publication while preserving
the visual style, effects and functions. This release integrates the prior local
website-performance batches with current remote main `584eea9`; all fifteen newer
article/private-workspace commits are retained. Unrelated local private-agent work
is excluded. Existing production domains, backends and deployment configuration
remain in place; the only cache-header addition is Jing's worker revalidation.

### Design decisions

The LCP element remains the visible six-frame woodfish sprite. Its original
987,220-byte lossless WebP, PNG source, resolution, alpha, animation timing,
sound and interaction scripts are unchanged. Priority-only loading still measured
approximately 3.3 seconds, so the substantive fix reduces competing prop bytes.
The existing Sharp producer adds seven responsive WebPs for incense, candles
and beads. Browser-native srcset/sizes selects enough pixels for the display;
full-resolution fallbacks and original PNGs remain. Derivatives are losslessly
encoded **after resizing**, not claimed pixel-identical to the full-size sources.
The room's head preloads the existing atlas at high priority; decorative images
use low fetch priority. No new loader, dependency or animation fallback is added.

The existing offline graph producer now follows every local srcset candidate.
Its fixture checks both widths and external-URL exclusion. Build-derived worker
version `aa9bfa2f9d7129dac133` contains 147 public files / 12,869,915 bytes; this is
389,109 bytes more than the previous cache because all seven width candidates
remain available offline across devices. Cache installation and private-data
exclusion rules are unchanged.

### Before/after evidence

Both 211-page artifacts use the same integrated current-main source, with only
the current woodfish preload/srcset changes reversed in the before build. Chrome
mobile emulation: 390×844 / DPR 2, 4× CPU slowdown, 655,360 B/s download,
131,072 B/s upload and 60 ms latency. Desktop: 1440×900 / DPR 1. Fifteen
alternating pairs per device use fresh contexts and empty HTTP caches; external
comments/statistics are blocked in both. Measurements end 1,200 ms after load.

| Metric | Before | After |
| --- | ---: | ---: |
| Mobile median LCP | 3,324 ms | 2,180 ms (-34.4%) |
| Mobile P75 / maximum LCP | 3,356 / 3,380 ms | 2,184 / 2,228 ms |
| Mobile median load | 3,276 ms | 2,127 ms |
| Mobile transfer | 1,966,107 B | 1,228,795 B (-37.5%) |
| Desktop median LCP | 3,292 ms | 1,940 ms (-41.1%) |
| Desktop P75 / maximum LCP | 3,312 / 3,328 ms | 1,944 / 1,952 ms |
| CLS | 0 | 0 |

All fifteen mobile after samples are below 2,500 ms, with the same final LCP
element and no script errors. A separate five-visit production **before** sample
on `https://leonzk.cn/jing/muyu/` measures median 7,392 ms with the previously
published PNG assets. Real network/CDN results are a separate cohort, not paired
against the local result. Production after acceptance is recorded after release.

### Verification and implementation notes

- Astro build: 211 pages. Astro check: zero errors/warnings, 26 existing hints.
  Current-main unit suite: 212 tests. Node suite: 29 tests. Existing Jing/blog/
  security browser suite: 123 tests (122 plus the corrected static-build rerun).
- Twenty-four settled frame/theme/device visual pairs: normalized main content,
  all element/pseudo-element computed styles and geometry agree, with no overflow.
  Maximum changed pixels above RGB delta 8: 0.275%; RMSE ≤1.175. All differences
  stay within decorative-prop regions. The six-frame sprite is byte-identical.
  Representative desktop/mobile screenshots were also visually inspected.
- Desktop and mobile fresh profiles install all 147 cached assets, clear ordinary
  HTTP cache, then enter ten rooms offline and perform first-use interactions,
  including woodfish, charts, all lot editions, encrypted saving and audio ranges.
  No private plaintext or query URL enters the cache.
- Artifact comparison changes only woodfish HTML and the derived worker relative
  to the integrated before build. Both fixtures contain the same seven derivative
  files, but the before HTML/worker never request or cache them. Other HTML, CSS,
  JS and runtime assets remain byte-identical in this final step.
- Initial static E2E fixture ran before its dist junction existed; the affected
  check passes after linking the already built artifact. A pre-existing shell-
  fixture LF assertion fails on Git's CRLF checkout; restoring its checkout to LF
  passes all Node tests without a source-content change. Original failures remain.
- Rejected image encoding experiments remain temporary: lossless AVIF is larger
  than the atlas WebP; lossy alternatives are not shipped. The atlas stays intact.

Evidence: `.tmp/muyu-mobile-release/` in the isolated release checkout, including
the decision, both builds, paired raw results/summary, artifact identity, visual
comparisons, offline receipts and test logs. Confidence B+ for the controlled lab
result; desktop Chrome emulation is not a physical-phone or field-P75 guarantee.
Publication and actual production acceptance are recorded separately below.

## Overview

Jingxin Hall is a hidden, local-first traditional-culture study space reached through a small `静` seal in the public footer. It uses an independent immersive layout and divides each subject into a separately loaded Astro route.

## Design decisions

- The canonical route is `/jing/`; it is deliberately absent from public discovery surfaces and marked `noindex`.
- The public footer seal is an easter-egg entry, not a security boundary. Sensitive material is protected by optional local encryption rather than route obscurity.
- The hall uses static Astro pages with isolated client-side islands for interactive calculations, audio, randomness, and encrypted notes. It is not a client-routed SPA.
- Buddhist and Taoist content remain separate in presentation, sound, imagery, reverence flow, and lot collections.
- Spiritual interactions avoid points, achievements, guaranteed blessings, or sacred images as game controls.
- Interpretations expose rule sets and derivations and use bounded traditional language rather than deterministic high-stakes claims.
- All personal inputs and calculations are local and ephemeral by default. Only settings, private practice totals, and encrypted notes persist. Lot session history remains memory-only and disappears on refresh.
- Sound controls default to enabled while playback remains gesture-safe and lazy-loaded; a visitor's mute choice persists. Audio is instrumental or ambient only and grouped by tradition. The saved linear slider is converted to a perceptual gain curve; foreground actions smoothly duck ambience and release it instead of changing loop volume abruptly.
- V1 includes all approved rooms but is implemented through seven independently verified stages before public deployment.
- The 2026 visual rebuild treats the supplied five-panel final artwork as the visual source of truth: immersive scene first, supporting controls second, and explanatory prose progressively disclosed.
- Practice totals may use the traditional `功德` label as a private local counter, but never become rank, reward, monetization, prediction, or social comparison.

## Implementation notes

- Reuse the existing Astro build, theme conventions, route generation, and footer owner. Add a dedicated Jingxin layout and scoped components/data under a `jing` boundary instead of expanding `BaseLayout.astro` into a second application shell.
- Load ordered, cacheable Jing styles through the layout: `jing.css` owns the shared shell and hall, `jing-room-scenes.css` owns room scenes, and `jing-continuity.css` owns local study tools. The hall omits only room scenes; room pages retain base → scenes → continuity → component order. Put new shared rules in their existing shared owner instead of duplicating a critical-CSS copy.
- Use Web Crypto with a versioned authenticated-encryption envelope for notes and exports. The derived key stays in memory for the unlocked session.
- Use `crypto.getRandomValues` for coin, lot, and cup randomness.
- Keep the 300 lot records and sacred-image attribution in typed, versioned static data files with validation tests.
- Keep calendar and divination rule sets as independent pure modules so the three Qimen schools and Bazi boundary options can be tested without rendering UI.
- Exclude Jingxin pages explicitly from sitemap generation and any local search index; route secrecy is not presented as access control.
- Do not add backend storage, Waline, Neon, Vercel APIs, Cloudflare data services, or third-party metaphysics APIs.

## 2026 visual rebuild — page plan

- **Hall:** fixed grouped navigation at left, moonlit courtyard stage, large title, four primary illustrated entries, and a compact local-practice strip. Secondary rooms remain reachable from the grouped rail.
- **Reverence:** shared front-facing ritual hall scene; object selector at left, licensed sacred figure layered in the central niche, a separate rear-facing worshipper actor in the foreground, and instructions/session state at right. Sacred figures remain static and are never regenerated or used as action controls. Buddhist and Taoist labels, figures, movement vocabulary, action frames, and state-machine sequences remain separate. The Buddhist flow supports single gestures and a complete three-bow sequence; the Taoist flow supports a complete general gongshou ritual and its individual poses. Every sequence exposes a numbered, accessible progress state, and adjacent transparent frames cross-fade without interpolating or redrawing the figure.
- **Woodfish:** 45-degree ritual tabletop scene with local summary at left, large strike target and restrained ripple feedback at center, controls at right, and a recent-strike chart near the bottom. On desktop, the side panels are floating overlays and do not participate in the stage layout, so the fish, tabletop, and strike button remain centered in the available viewport. The room background is built from CSS timber, light, and shadow layers instead of a full-scene image. The fish sits slightly below center on a CSS-built oval tabletop and light pool; incense remains high and central, candles recede symmetrically, and prayer beads anchor the lower-left foreground. A transparent six-frame PNG strike sequence provides the fish-and-mallet motion while TypeScript advances frames. The strike sound receives a restrained ±2% playback variation, the ripple remains close to the contact point, and side panels recede after practice begins while returning on hover/focus. Automatic practice exposes a 30–90 strikes/minute rhythm control and keeps exactly one timer active when the rate changes.
- **Lots:** collection selector at left, persistent container at center, parchment result at right, and explicit save/share/redraw actions. The room background is a CSS-built shrine without a full-scene image. Guanyin, Lu Zu, and Guan Di each use a complete sixteen-frame transparent sequence with collection-specific vessel, bundle, ornament, and selected-stick art. The selected stick rises from within the bundle, stays inside a protected top margin, releases into the air, drops, rebounds once, and settles diagonally. The former large oval table graphic is removed; only a soft contact shadow appears during landing and settlement. A cancellable TypeScript timeline pre-decodes the PNGs and switches cleanly near each cue boundary; it never cross-fades two complete frames and therefore never shows a duplicate selected stick. The three timelines share the same readable ritual phases but differ slightly in tempo: Guanyin is gentle, Lu Zu is lighter and quicker, and Guan Di is steadier. One draw click starts a short automatic cleansing prelude and continues directly through stillness, shake, emergence, impact, settled pause, and result reveal; no second confirmation click is required. Repeated draws have no cooldown and begin from the same action immediately. The optional question field sits above the action row, the source disclosure remains separately clickable, and the former chant-highlight action is removed. Secondary controls recede during the ritual and restore for the result. The selected stick remains visible until a new draw or collection switch. Existing 300 records, cups flow, bookmarks, and note handoff remain intact. Up to eight draws may be revisited in an in-memory session ledger; collection, question, and result never survive refresh.
- **Five Elements:** unified study shell with subject tabs above, selectable relation topics at left, an interactive five-node generation/restraint diagram at center, and correspondence details at right. Bagua stays available below/alongside at narrower widths.
- **Bazi:** basic/professional chart layers with solar, lunar (including validated leap months), and direct-pillar inputs. Birth profiles expose gender for luck direction, an explicit unknown-minute state, place/longitude correction preview, late-Zi selection, and two start-luck methods. Professional results add hidden stems, Na Yin, per-pillar Xun Kong, eight Dayun periods, selectable Liunian and Jie-based Liuyue, and an SVG relationship diagram with matching accessible controls/list. Relationships cover stem combinations/clashes and branch unions/clashes/harms/punishments/breaks, plus complete three-union and seasonal-group structures. Selecting a node or relation highlights its counterpart; selecting a period updates the factual context in Ask Classics. Direct-pillar charts have no fabricated start-luck date. Privacy-safe text and code-rendered PNG exports omit birth date, place, and case label. Shensha and strength/useful-god claims remain outside the automated interpretation layer until their distinct rule tables are specified.
- **Qimen:** parameter panel with strict complete-date validation and a local-current-time helper, complete nine-palace core, visible 九宫 → 天地盘 → 八门 → 九星 → 八神 reveal state, and palace explanation panel. One school is the default main board; an explicit comparison control expands all three schools. Selecting a palace marks the same palace in the other two schools and expands a factual three-school god/star/door/stem comparison; on narrow screens the explanation is brought into view so the action never appears inert.
- **I Ching:** existing five casting methods with larger code-built two-sided bronze coins, explicit `字面`/`背面` labels, a persistent six-line construction panel, method-specific validation/status text, a current-local-time helper, and a high-contrast paper result comparing the primary and changed hexagrams. Mutual, opposite, and reversed views remain secondary references.
- **Meditation:** minimal full-bleed room with breathing ring, timer and user-toggleable ambience; controls recede during an active session.
- **Notebook:** rename presentation to `静心手札`, keep the existing encrypted local vault contract, and style editor/unlock/export surfaces as a digital thread-bound paper notebook.
- **Ask Classics:** a site-wide `问典` drawer retrieves only from a versioned local knowledge set. It returns four visibly separate layers—term, rule, boundary, and source clues—and refuses high-stakes prediction prompts. It never reads the encrypted notebook or calls a remote model. This preserves the static/local-first architecture while leaving a typed seam for a future explicitly approved provider.
- **Study casebook:** Bazi, Qimen, I Ching, and lot results create in-memory `StudyCaseRecord` snapshots. Only an explicit save opens a password prompt, reuses the existing AES-GCM vault, appends a readable record plus a machine-readable marker, and locks the temporary session. The notebook parses those markers after unlock, filters by subject, compares two cases, and copies result-only summaries without private case labels. Bazi cases carry a whitelisted resume payload inside the same encrypted marker. “Continue study” opens a new local page and transfers the payload through an origin/source/token-checked in-memory message handshake; the URL contains only a random token, and no resume plaintext is written to local/session storage. Successful transfer locks and wipes the source notebook. Refresh clears the restored form.
- **Daily entry and focus:** the hall adds a restrained `今日入堂` card with a date-stable classical line, factual study topic, short practice entries, and last-room continuation. `入静` hides secondary chrome while retaining a fixed exit and sound control; supported mobile browsers receive short haptics only from trusted ritual gestures.
- **Offline shell:** a scoped web manifest and service worker pre-cache Jingxin's core routes and cache same-origin scene/audio/script assets at runtime. No public-site route is intercepted.

## Responsive strategy

- `>= 1180px`: full scene shell; 220–260px navigation/parameter rail; flexible central stage; 300–360px result rail.
- `760–1179px`: compact navigation rail, reduced side panels, and content allowed to continue below the first viewport.
- `< 760px`: scene crop, compact top bar, grouped navigation drawer/strip, one-column controls, and collapsible result/explanation panels. No whole-page transform scaling.

## Asset notes

- Decorative scene backdrops used by the other rooms live under `public/jing/scene/` as optimized local WebP; they contain no baked UI or readable text. Woodfish and lot rooms deliberately use no full-scene backdrop: their CSS environments and transparent object PNGs live under `public/jing/generated/muyu/` and `public/jing/generated/lot/`. Guanyin, Lu Zu, and Guan Di each use a self-contained sixteen-frame transparent sequence. Source frames remain under `frames-v3/`; `normalize-lot-frame-bounds.mjs` scans each complete sequence's alpha union, applies one shared scale and one fixed vessel anchor, then emits 1024x1536 masters under `frames-safe-hi/` and 768x1152 web frames under `frames-safe/`. The safe canvas reserves 18% above, 12% on both sides, and 10% below so stillness, shaking, emergence, airborne release, table contact, rebound, and the settled stick remain intact without per-frame resizing or edge clipping. Transparent contact sheets and a machine-readable audit manifest are retained under `frame-safe-preview/`. The Buddhist foreground worshipper uses seven transparent PNG action frames under `public/jing/ritual/buddhist-worshipper/`; the Taoist foreground worshipper uses five matching frames under `public/jing/ritual/taoist-worshipper/`. TypeScript controls selection, sequencing, cancellation, completion, and reduced-motion progress, while CSS handles frame presentation and environmental motion.
- Existing sacred figure files and attribution metadata remain unchanged and visible in an accessible source/details area. Any display derivatives may only crop, extract the background, add alpha, normalize dimensions, or unify tone; they may not regenerate or redraw a sacred figure.
- The Buddhist action set covers single actions plus a roughly ten-second complete three-bow sequence. The Taoist action set covers ready, gongshou, bow, deep respect, and return. Lu Zu and Guan Di use public-domain Metropolitan Museum of Art paintings with local WebP derivatives and verified source-ledger entries; no sacred figure was generated.
- Action audio remains local, defaults to enabled, and can be muted globally. The user-supplied root recordings are copied without transcoding to `woodfish.mp3`, `lot-draw.mp3`, and `coins-toss.wav`; they drive the woodfish strike, lot-shake start, and coin landing respectively. Cup and paper effects remain separate project foley.

## Privacy boundaries

- Temporary birth times, Qimen inputs, casts, questions, and results remain memory-only until the user explicitly selects `存入手札案卷`.
- Explicit case saves write only through the existing encrypted vault. The password, derived key, plaintext note, and pending case are never persisted separately.
- `问典` is a local study retriever, not an unrestricted fortune assistant. Remote inference, uploads, accounts, cloud sync, face/palm analysis, and high-stakes predictions remain excluded.

## BaziMiao-inspired study upgrade — 2026-10-01

- Adopted the separation of deterministic chart calculation, structural rules, knowledge references, and explanation, together with basic/pro chart hierarchy, period selection, relationship inspection, and multiple encrypted local cases.
- Implemented independently in the existing Astro/TypeScript stack; no BaziMiao source, artwork, server stack, account system, payment logic, or prompts were copied.
- `lunar-typescript 1.8.6` remains the pinned calendar dependency. `bazi-2.0.0` uses the existing calendar normalization, so true-solar correction affects the chart and start-luck calculation consistently. Minutes-based and traditional time-branch start-luck methods stay explicitly selectable; ages in the timeline use the dependency's traditional nominal-age convention.
- Calculation, input normalization, luck periods, relationships, and browser wiring live in separate Bazi modules. HTML/CSS/SVG/Canvas supply the interface, restrained motion, diagram, and share image without adding dependencies.

## Loading optimization — 2026-10-22, local only

### Overview

- Preserve the existing layouts, colors, transparency, gesture/strike/draw timing,
  all three independent 100-lot collections, chart rules, local-only study tools,
  and encrypted notebook format. No dependency, hosting, or deployment changes.
- Baseline and candidate are separate production builds of the current working
  tree under `.tmp/jing-performance/{before,after}/dist`; earlier website
  performance builds and concurrent private-agent work remain intact.

### Design decisions

- Keep the default Guanyin collection in the initial lot controller. Load Lu Zu
  and Guan Di only when selected; disable drawing during a pending selection so
  the first draw cannot use the preceding edition. Session history retains the
  exact collection associated with each draw.
- At entry, fetch the static first lot frame. Prepare the complete sixteen-frame
  animation on draw-button hover/focus or the cleansing prelude, await decoding
  before playing it, and release cached decoded sequences when changing editions.
  Frame count, canvas dimensions, motion profiles and action sounds are unchanged.
- Load the lunar calendar and calculation code on Bazi/Qimen form intent or
  submission. Install form controls immediately, await the first calculation,
  and invalidate pending results on reset. True-solar previews use the same
  deferred engine and ignore outdated preview requests.
- Keep focus mode, sound controls, drawer listeners and save listeners available
  at entry. Defer the knowledge dataset until the Ask Classics drawer is used,
  and the vault implementation until explicit case-save intent. Retain encryption
  parameters and storage keys; neither plaintext nor passwords are newly stored.

### Implementation notes

- `scripts/jing/optimize-action-assets.mjs` generates 49 lossless WebP derivatives
  for the woodfish sprite and three sixteen-frame lot sequences. It preserves all
  PNG sources and checks dimensions, alpha, and every RGB value with nonzero alpha.
  RGB beneath fully transparent pixels may be canonicalized by the encoder.
  Run with `--check` to verify existing derivatives without rewriting them.
- Combined source PNGs: 5,334,004 B; runtime WebP: 3,492,250 B, down **34.5%**.
  The woodfish sprite alone changes from 2,194,882 B to 987,220 B, down **55.0%**.
  Existing incense/candle/bead PNGs, ritual pose PNGs and licensed figure images
  are preserved; the totals above do not describe those unchanged resources.
- No changes to the service worker or its cache policy are included. Its existing
  incomplete coverage of hashed `/_astro/` assets and network-first navigation
  remain a separate follow-up. Localhost explicitly unregisters the Jing worker,
  so these checks do not establish installed/offline-app acceptance.

### Measurement and validation

- Chrome, production builds, Brotli for HTML/CSS/JS, 60 ms network latency,
  655,360 B/s download, 131,072 B/s upload and 4x CPU slowdown. Desktop 1440x900
  at DPR1; mobile emulation 390x844 at DPR2 with touch. These are local controlled
  runs, not measurements from production or a physical phone.
- Five paired cold visits per device/page/variant, with alternating version order
  and fresh browser contexts: 100 visits. Compression work is warmed on the local
  server before measurement while each browser context starts with an empty cache.
  Report medians; observe LCP/CLS/long tasks without a per-frame layout probe.
  `load` is the browser load event, and transfer includes navigation plus local
  resources through 1.2 seconds after load. Deferred modules requested by later
  interaction are excluded from this initial-loading window.

Cold-load medians in seconds (before → after):

| Device | Page | LCP | Browser load event |
| --- | --- | --- | --- |
| Desktop | Hall | 0.748 → 0.720 | 0.818 → 0.798 |
| Desktop | Woodfish | 5.744 → 3.876 | 5.724 → 3.857 |
| Desktop | Lots | 0.824 → 0.808 | 2.483 → 0.803 |
| Desktop | Bazi | 0.676 → 0.680 | 0.773 → 0.720 |
| Desktop | Qimen | 0.596 → 0.608 | 0.631 → 0.620 |
| Mobile emulation | Hall | 0.744 → 0.712 | 0.814 → 0.790 |
| Mobile emulation | Woodfish | 5.776 → 3.904 | 5.740 → 3.868 |
| Mobile emulation | Lots | 0.848 → 0.820 | 2.482 → 0.814 |
| Mobile emulation | Bazi | 0.660 → 0.652 | 0.725 → 0.733 |
| Mobile emulation | Qimen | 0.696 → 0.640 | 0.675 → 0.626 |

Initial resources, identical across the two viewport profiles (KiB, before → after):

| Page | Actual initial transfer, including headers | Downloaded JS decoded size, excluding inline scripts |
| --- | --- | --- |
| Hall | 122.6 → 118.0 | 26.3 → 12.9 |
| Woodfish | 3502.0 → 2318.0 | 34.9 → 21.6 |
| Lots | 1198.6 → 132.8 | 463.0 → 169.3 |
| Bazi | 127.2 → 40.8 | 351.6 → 36.6 |
| Qimen | 120.6 → 33.3 | 338.3 → 21.8 |

- The clearest LCP improvement is the woodfish scene, around **32.5%** on both
  profiles. Its remaining three prop PNGs total 1,349,916 B; these are a concrete
  next asset target. The six-frame sprite still uses its original sheet layout.
- Lot entry transfers fall **88.9%**, while most of the browser load-event saving
  comes from moving animation preparation to intent. Its LCP changes only slightly;
  do not equate the 67.7% load-event improvement with an equivalent visual LCP gain.
- Bazi/Qimen initial decoded JS falls **89.6% / 93.5%**. Desktop LCP is essentially
  unchanged, with small increases of 4 / 12 ms; no general LCP acceleration claim
  is made for these forms or for the small hall median change.
- Every one of the 100 initial-loading samples has CLS=0 and no page script errors.
  Raw samples and summaries: `.tmp/jing-performance/results.json`, `summary.json`.

First-action guard: three additional paired cold visits per viewport (12 visits),
with the same throttling, click Draw as soon as DOMContentLoaded and button
actionability allow. Keep all cleansing and draw animations enabled. Medians:

| Device | Click to decoded canvas ready | Click to result visible | Navigation to result visible |
| --- | --- | --- | --- |
| Desktop | 1.575 → 1.453 s | 6.110 → 5.959 s | 6.975 → 6.837 s |
| Mobile emulation | 1.565 → 1.462 s | 6.109 → 5.967 s | 7.040 → 6.848 s |

The deferred animation preparation does not worsen immediate first drawing in
these samples. The approximately six-second result time includes the deliberately
preserved ritual timeline. It is not an interaction latency/INP measurement.
Raw samples: `.tmp/jing-performance/actions.json`.

Validation receipts:

- Production build: 186 pages. Astro check: 0 errors, 0 warnings, 18 hints in
  unrelated service/tool tests. Vitest: 210 tests across 25 files. Node checks: 20.
- All 98 distinct Jing Chrome E2E scenarios passed across the runs. The first run
  needed an expected PNG→WebP assertion update. The final complete run passed
  97/98, with the public-footer test timing out while waiting for the public
  homepage's full `load` event; its DOM-only assertion now waits for DOMContentLoaded.
  All five shell tests then passed in the focused rerun. Preserve those original
  failures in `e2e.log`, `e2e-final.log`; reruns are `e2e-sprite.log` and
  `e2e-shell-rerun.log` under `.tmp/jing-performance/`.
- Additional 35 browser checks cover absent initial heavy chunks, first-action
  completion, delayed imports, reset during loading, failed-import recovery,
  selected-collection consistency, and the first queued Ask Classics question.
  `lazy-checks.json` contains the individual receipts.
- Twenty before/after visual pairs (40 screenshots): desktop/mobile, dark/light,
  five pages. Header/heading/main geometry and styles match, and main content
  hashes match after excluding build-script tags and normalizing the asset suffix.
  No horizontal overflow. Moving CSS animations are disabled for screenshots;
  action progression is checked separately by browser scenarios. Zero pixels
  differ by more than 8 in any RGB channel across all pairs. These are screenshot
  comparisons, not a frame-rate/GPU benchmark.
- Rechecked all 49 generated derivatives with `--check`. Raw pixel and screenshot
  checks retain the original images and dimensions. No commit, push, deployment,
  production configuration change, real model call, or third-party write by this
  batch. The existing offline cache behavior remains unverified in these local runs.

## Woodfish assets and offline cache — 2026-10-22, local only

### Overview

This follow-up starts from the preceding loading-optimization working tree,
not the older pre-optimization site. The source PNGs, full image dimensions,
transparent edges, layouts, motion, calculation rules, three lot collections,
audio, local knowledge retrieval and encrypted notebook format are preserved.
No dependencies were added. Nothing was committed, pushed or deployed.

### Design decisions and implementation notes

- Added lossless WebP derivatives for the incense burner, candle and prayer
  beads. Their combined file size changes from **1,349,916 to 940,066 B (-30.36%)**.
  `scripts/jing/optimize-action-assets.mjs --check` now verifies all 52 derivatives,
  including the previous 49: dimensions, alpha and every visible RGB value match.
  Source-only transparent RGB may be canonicalized by the encoder; visible
  pixels and transparency remain identical. The existing six-frame woodfish
  sprite layout and all prop positioning are unchanged.
- The old worker cached 11 HTML routes plus two app metadata files (13 entries)
  and waited for a network navigation before using cached HTML. Hashed `/_astro/`
  scripts, styles, delayed chart engines, lot data/frames, figures and audio were
  absent, so cached markup alone did not provide functional offline rooms.
- `scripts/jing/offline-build.mjs` uses the production HTML/CSS and Vite chunk
  graph, including dynamic imports, to embed an exact public asset allowlist into
  the built worker. Runtime-generated frame/audio paths are included explicitly.
  The current artifact contains **138 entries, 12,478,056 B of uncompressed content
  (11.90 MiB)**. This is cache content size, not a measured compressed wire transfer.
  Full installation incurs a one-time background download after page load; a
  changed build installs a new complete cache. No per-file delta update is claimed.
- Each entry has a SHA-256 revision, and the version includes worker code and all
  entry revisions. Installation uses three download workers and rejects any
  missing, redirected, non-200 or hash-mismatched response. Failed installation
  removes its incomplete cache and leaves the previous active version intact.
- Cached public navigations and exact dependencies are returned immediately.
  Missing cached entries are re-fetched with revision verification. GET requests
  with unknown queries or Authorization, unrelated routes/assets, cross-origin requests,
  API calls and writes bypass this cache. User inputs, notebook plaintext,
  passwords, keys and exports are outside the asset manifest.
- Known static navigation parameters remain usable offline: meditation
  `minutes=1/3/5/10/20` and five-elements `term=wood/fire/earth/metal/water`.
  Exactly one approved parameter is accepted, only for a navigation to its
  corresponding page. The worker reads the cached public HTML by pathname and
  retains the current URL for the existing UI; it never stores query URLs.
  Additional, duplicate or unknown parameters and non-navigation query requests
  bypass the worker. This preserves the hall's one-minute link and knowledge links.
- Updates wait for existing controlled tabs to close, then remove only older
  `jingxin-hall-*` caches. They preserve unrelated caches and local storage. The
  registration uses `updateViaCache: 'none'`; the local EdgeOne configuration adds
  an exact `no-cache` rule for `/jing/service-worker.js`. That platform rule has
  not been deployed or verified on a remote CDN.
- Cached full audio responses support explicit, suffix and open byte ranges with
  206 responses; invalid/unsupported ranges return 416. This preserves offline
  audio playback without caching partial media as complete files. Background on
  update waiting and cached media is documented by
  [Chrome's worker lifecycle guide](https://developer.chrome.com/docs/workbox/service-worker-lifecycle)
  and [cached audio/video guide](https://developer.chrome.com/docs/workbox/serving-cached-audio-and-video).

### Cold-loading comparison

Production artifacts before/after this follow-up, Chrome, Brotli for HTML/CSS/JS,
60 ms latency, 655,360 B/s down, 131,072 B/s up, 4x CPU slowdown. Desktop is
1440x900/DPR1; mobile emulation is 390x844/DPR2 with touch. Five fresh-context
paired cold visits per page/device/version, alternating version order: 40 visits.
The loopback cold test intentionally keeps the existing localhost worker opt-out
so it isolates page/asset loading; installed-worker behavior is measured separately.
These are local controlled samples, not production or physical-phone measurements.

| Device | Page | LCP median, before → after | Browser load median, before → after |
| --- | --- | --- | --- |
| Desktop | Woodfish | 3.996 → 3.380 s (-15.4%) | 3.969 → 3.332 s |
| Mobile emulation | Woodfish | 3.988 → 3.420 s (-14.2%) | 3.922 → 3.358 s |
| Desktop | Hall | 0.692 → 0.724 s (+32 ms) | 0.770 → 0.793 s |
| Mobile emulation | Hall | 0.724 → 0.740 s (+16 ms) | 0.788 → 0.813 s |

Woodfish initial transfer, including response headers, falls from **2,373,634 to
1,963,810 B (-17.3%)**, with identical initial request counts and decoded JS size.
Woodfish LCP ranges: desktop 3.920–4.016 → 3.292–3.404 s; mobile 3.912–4.028 →
3.336–3.428 s. Hall resources are essentially unchanged (+20 B inline registration
options); the small hall median increases overlap the observed before/after ranges.
No hall cold-LCP improvement or universal acceleration claim is made.
All 40 samples have CLS=0 and no page script errors. Raw samples and medians:
`.tmp/jing-offline/results.json`, `summary.json`.

### Installed cache comparison and offline validation

Installed-worker test: use a dedicated secure loopback hostname
`jing-offline.localhost` to execute the production registration branch, without
changing the source's localhost opt-out. Each fresh context first completes
installation. The local server then deliberately adds **800 ms to HTML navigation
responses**, preserving normal browser HTTP caches. Five alternating paired hall
revisits per device/version: 20 visits. Page CPU/network emulation matches the
cold profile; the server delay also applies to worker-originated network fetches.
This controlled delay proves removal of the network-first wait; it is not an
estimate of the current production server's response time.

| Device | Hall TTFB median, before → after | Hall LCP median, before → after | DOMContentLoaded median, before → after |
| --- | --- | --- | --- |
| Desktop | 806.0 → 3.8 ms | 916 → 152 ms | 951.4 → 139.3 ms |
| Mobile emulation | 811.7 → 3.3 ms | 964 → 156 ms | 944.4 → 127.0 ms |

Cached HTML transfer becomes 0 B in these installed-worker revisits; all 20
samples have CLS=0 and no page script errors. The HTML body comes from the
versioned cache, with no navigation-network wait. Worker update checks may still
use the network independently. Raw results: `cached-results.json`,
`cached-summary.json` under `.tmp/jing-offline/`.
These final measurements use the worker with the known query-navigation fix;
the earlier pre-shortcut samples are retained as `cached-pre-shortcuts-results.json`.

Functional offline checks use a fresh browser profile, install while online,
**clear the ordinary browser HTTP cache**, then set the context offline before
visiting ten previously unvisited rooms. Before the change, the cache contains
only 13 entries and room script requests return no content; raw HTML headings
alone do not establish working offline functionality. After the change:

- Desktop and mobile emulation both load all ten rooms, including their eagerly
  decoded visible/lazy figures, with no broken images or page script errors.
- First-ever Bazi and Qimen calculations succeed while offline. All three lot
  collections load on first selection and complete the unchanged ritual draw.
- Woodfish strike increments the count. A cached woodfish audio byte-range
  request returns 206, exactly 100 B and the correct Content-Range header.
- A first Ask Classics question works offline. An explicit Bazi case save uses
  the existing encrypted vault; the cached notebook HTML contains no test password
  or generated chart plaintext. Tests use synthetic inputs and isolated storage.
- The actual hall one-minute link works offline. All five approved timer values
  and all five five-elements topic links select the requested UI state in both
  desktop and mobile emulation; Cache Storage contains zero query-string URLs.
- A separate real-browser update fixture verifies old and new caches coexist
  while tabs remain open; an old tab completes its first lazy chart calculation.
  Closing both controlled tabs activates the new version and removes only the
  old Jing cache. An unrelated cache and local-storage sentinel survive. A
  deliberately hash-mismatched next update becomes redundant, removes its
  incomplete cache and retains the active previous version.

Receipts: `offline-browser.json`, `offline-mobile.json`, `update-browser.json`.
Offline availability requires a completed installation and retained browser
storage. Interrupted first installs, denied service-worker/storage support,
quota exhaustion or later browser eviction can leave offline resources unavailable;
an existing complete active version is preserved when a new install fails.
Background cache content totals 11.90 MiB per version; updates can temporarily
keep both versions until old tabs close. No forced refresh or background-data
cost reduction is claimed. These local checks do not verify a live CDN, installed
mobile PWA, storage persistence across browser eviction or physical-device audio.

Validation receipts:

- Final production build: 186 pages; 138 manifest entries, version
  `f6d1421cf40da05a6180`. All entry URLs, revisions and sizes exactly match the
  cold-measured artifact; the final worker additionally accepts the known static
  study parameters. `artifact-identity.json` verifies that equality.
- Astro check has 0 errors, 0 warnings and 26 unrelated service/tool hints.
  Node checks: 29 passed, including
  install failure, revision mismatch, dynamic chunk discovery, image revision
  invalidation, cache boundaries, query navigation, audio ranges and CDN policy.
  The existing Vitest suite passes 210 tests in 25 files.
- All 98 distinct Jing Chrome E2E scenarios pass in two non-overlapping batches
  (54 + 44), covering the unchanged production HTML/JS/assets. The localhost
  tests retain the worker opt-out; dedicated browser tests above exercise the
  production worker branch. `e2e.log`, `e2e-remaining.log` contain both receipts.
- Twenty visual pairs (40 screenshots), desktop/mobile and dark/light over five
  pages: header/heading/main geometry and styles match, normalized main-content
  hashes match, and no page has horizontal overflow. Nineteen pairs contain zero
  pixels with an RGB-channel difference above 8. One mobile hall pair differs
  only in 491 citation-text pixels (0.15% of its screenshot), at x52–135/y337–347.
  A focused repeat retains identical citation text, computed font, color, opacity
  and geometry; the complete Jing layout CSS files also have identical SHA-256.
  No source CSS was changed to hide this rasterization difference. Woodfish
  screenshots show zero differing pixels at this threshold; all 52 lossless
  assets separately pass visible-pixel/alpha/dimension checks. Screenshots disable
  animation for comparison; they do not establish physical-device frame rates.

The previous `.tmp/jing-performance/` results and original failed receipts remain
intact. Initial build errors involving optional Vite metadata and nested SVG
filter fragments were fixed in asset discovery before rebuilding successfully.
Browser-fixture host resolution and asynchronous polling assumptions were fixed
in the harness. Original failures and passing reruns are preserved separately.

### Hall cold-load diagnosis — 2026-10-22, local only

The parser-time back-to-top initialization has been repaired. **Hall LCP has
not shown a stable improvement**; the small desktop gain and mobile regression
below must not be presented as a general cold-load speedup. Visuals, motion,
features and offline-cache behavior retain their existing contracts. No deploy,
push, commit, dependency addition or production configuration change was made.

Diagnosis and decision:

- The previous batch changed woodfish props and installed-worker navigation.
  Those props are not requested by the hall, and an uninstalled worker cannot
  accelerate a first visit. The historical before/current hall HTML differs
  only by the worker registration option `updateViaCache: 'none'`; CSS, browser
  JavaScript and courtyard bytes match. The option is not executed in the
  localhost cold benchmark. The earlier +32/+16 ms medians therefore do not
  establish a service-worker execution regression. This does not prove that
  every real-device or production difference is measurement noise.
- A CPU/renderer trace attributes 76.551 ms of forced layout to the initial
  `updateTop()` reading `scrollY` while HTML is still being parsed; the function
  accounts for 95.105 ms of sampled time including that work. The canonical
  owner is `JingLayout.astro`. **Decision: code-change**: move that initial read
  to `pageshow`, retaining the passive scroll listener, threshold and click
  behavior. Three interleaved diagnostic pairs per device remove the associated
  script long task. The final trace no longer samples parser-time `updateTop`;
  comparable layout work still occurs during rendering. This is a scheduling
  fix, not evidence that total layout CPU time or interaction latency fell to zero.
- All 40 final LCP candidates are `.jing-portal-card` and its data-SVG paper
  background. The main retains its 450 ms opacity/translation entry animation.
  Courtyard download completion alone does not determine this LCP timestamp.
  Diagnostic removal of texture changes the candidate and does not consistently
  improve mobile LCP; removal of the animation changes the requested appearance.
  Neither modification was shipped.
- A native-HTTP four-way fixture tested the exact full CSS inline, with and
  without the scroll fix. In three desktop pairs the combined variant changes
  FCP 544→612 ms while LCP changes 668→612 ms. That tradeoff was rejected.
  No CSS splitting, duplicated style owner, asynchronous-style fallback or new
  runtime abstraction was introduced. The production patch is one event-listener
  substitution and an explanatory comment.

Final performance comparison uses **ten alternating paired cold visits per
device/version, 40 visits total**. Every visit creates an empty browser context,
with no HTTP cache, storage or installed worker. Chrome uses 60 ms simulated
latency, 655,360 B/s download, 131,072 B/s upload and 4× CPU throttling. Desktop
is 1440×900/DPR1; mobile emulation is 390×844/DPR2 with touch. Both locally served
production builds use Brotli; server compression is warmed before measurement.
No unit/build/E2E workload runs concurrently with this benchmark. Values are
medians, with even-sized medians averaged rather than rounded up.

| Metric | Desktop before → after | Mobile emulation before → after |
| --- | --- | --- |
| LCP | 724 → 718 ms (-0.8%) | 726 → 736 ms (+1.4%) |
| FCP | 580 → 580 ms | 590 → 598 ms |
| Load event | 806.30 → 802.35 ms | 805.70 → 804.85 ms |
| Long Tasks API blocking sum, max(duration−50, 0) | 44 → 0 ms | 47.5 → 0 ms |
| Long task count | 1 → 0 | 1 → 0 |
| Initial transfer | 120,799 → 120,850 B | 120,799 → 120,850 B |
| CLS / page script errors | 0 / 0 → 0 / 0 | 0 / 0 → 0 / 0 |

Desktop LCP ranges are 680–820 ms before and 696–744 ms after; mobile ranges are
704–748 and 688–800 ms. Paired LCP deltas range from −104 to +56 ms on desktop
and −40 to +96 ms on mobile. Desktop improves in 6/10 pairs; mobile in 3/10,
with one unchanged. The long-task scheduling improvement is repeatable, while
these LCP results remain mixed. No INP, physical-device FPS, live CDN latency or
universal cold-load improvement is claimed.

Verification and boundaries:

- Final build succeeds for 186 pages. Across 495 compared Jing/compiled asset
  files, 483 are byte-identical. The only changes are eleven HTML pages, each
  differing solely in the scroll initialization/comment, and the generated
  worker manifest. CSS, compiled browser JS, images and audio match exactly.
- The generated offline cache contains the same 138 URLs, now version
  `d004a7a7da4210b43473`, totaling 12,479,453 uncompressed B (+1,397 B from HTML).
  Fresh desktop and mobile browser profiles install that exact artifact, clear
  ordinary HTTP caches and then visit ten previously unvisited rooms offline.
  Woodfish counts, first Bazi/Qimen calculations, all three lot collections,
  Ask Classics, encrypted case saving, ten timer/topic shortcuts and audio range
  responses pass, with zero script errors and zero query URLs cached. The worker
  algorithm did not change; prior update-isolation evidence remains preserved.
- Dedicated browser checks pass for the back-to-top threshold, reload-restored
  scroll, history back navigation and return-to-zero on desktop/mobile.
  Those history returns used ordinary navigation, not an observed bfcache hit;
  a real persisted-page restoration is not claimed as tested.
- Astro check: 0 errors, 0 warnings, 26 unrelated hints. All 210 Vitest tests,
  29 Node checks and 98 distinct existing Jing Chrome E2E cases pass. The first
  E2E run passed 83 and failed 15 because its local origin did not match tests
  that require `localhost:4321`. Serving the same final artifact on that expected
  origin passes all 15 reruns; source and assertions were not relaxed. A separate
  scroll probe initially requested more scroll than its desktop document allowed;
  correcting the test viewport passes without a production change.
- Twenty visual pairs over five pages, both themes and desktop/mobile retain
  identical header/heading/main geometry, computed styles and normalized main
  content hashes, without horizontal overflow. All pairs have zero pixels whose
  RGB channel difference exceeds 8. Screenshots disable motion for comparison;
  existing E2E checks independently retain ritual/reduced-motion behavior.

Evidence is isolated in `.tmp/jing-hall-cold/`: `decision.md`,
`historical-html-diff.json`, `profile-before.json`, `profile-after.json`,
`causal.json`, `critical-probe.json`, `results.json`, `summary.json`,
`artifact-identity.json`, `scroll-restoration.json`, `offline-desktop.json`,
`offline-mobile.json`, `visual-comparison.json`, build/check/unit/Node/E2E logs
and the before/after production artifacts. Original CLI-path, fixture-origin and
viewport failures are retained. Previous `.tmp/jing-performance/` and
`.tmp/jing-offline/` results remain intact. Baseline alignment: preserved;
complexity: no new branch or dependency. Confidence: B for this local scheduling
repair, with no established LCP speedup or deployed/physical-device acceptance.

### Hall mobile cold-load styles — 2026-10-22, local only

This follow-up improves the hall's measured mobile LCP while preserving the
paper textures, scene images, fonts, entry animation and all existing features.
The baseline is a fresh build of the already-scroll-fixed version above. **Do
not compare this round's 624 ms result with the prior round's 736 ms median**:
the valid comparison is the alternating baseline measured in this same run.

The remaining avoidable critical-path payload was the shared layout loading
every room's scene rules on the hall. Native HTTP fixtures first compare the
original sheet, a hall-only external sheet and inline alternatives. Full CSS
inlining remains inconsistent across devices and was rejected. Splitting the
hall's retained styles into two cacheable files still improves both FCP and LCP
in the three-pair-per-device diagnostic, so the production change keeps external
stylesheets and the original ordering.

**Decision: code-change.** The canonical owner is `JingLayout.astro` and the
existing stylesheet sections. `jing.css` retains the shared shell and hall;
the existing middle section moves to `jing-room-scenes.css`; the final local
tools section moves to `jing-continuity.css`. The existing `isHall` flag selects
whether the room sheet is linked. No new client loader, purger, fallback,
dependency, asynchronous style application or duplicated source rules is added.
Visual validation caught an important cross-route dependency: the original room
section contains the final global `.jing-eyebrow` override, also used by the hall.
The initial split omitted that override and moved the hall heading vertically.
That split and its measurements are rejected and retained under
`.tmp/jing-hall-mobile/rejected-style-split/`. The final version moves that
existing rule, with unchanged declarations, into the end of the shared base.
Source reconstruction and compiled-rule comparison verify that this relocation
is the only ordering change; all other rule bytes and ordering are preserved.
Component styles remain last. Static screenshot checks additionally compare the
full computed styles and geometry of page elements and their pseudo-elements.

Final measurements use **15 alternating paired cold visits per device/version,
60 visits total**, with empty browser HTTP caches, storage and worker state.
Chrome uses 60 ms simulated latency, 655,360 B/s download, 131,072 B/s upload and
4× CPU throttling. Desktop is 1440×900/DPR1; mobile emulation is 390×844/DPR2 with
touch. Both production artifacts use local Brotli serving; compression is warmed
before measurements. No build/unit/E2E workload runs concurrently with any of
the performance runs. Values below are medians.

| Hall metric | Desktop before → after | Mobile emulation before → after |
| --- | --- | --- |
| LCP | 656 → 616 ms (-6.1%) | 680 → 624 ms (-8.2%) |
| FCP | 552 → 504 ms (-8.7%) | 564 → 508 ms (-9.9%) |
| Load event | 734.1 → 694.2 ms | 760.2 → 702.6 ms |
| Initial page transfer | 120,850 → 111,760 B (-7.5%) | 120,850 → 111,760 B (-7.5%) |
| Stylesheet transfer, including resource overhead | 17,246 → 8,142 B (-52.8%) | 17,246 → 8,142 B (-52.8%) |
| Decoded stylesheet bytes | 89,116 → 32,307 B (-63.7%) | 89,116 → 32,307 B (-63.7%) |
| Stylesheet resource count | 1 → 2 | 1 → 2 |
| Long task count / blocking sum | 0 / 0 → 0 / 0 ms | 0 / 0 → 0 / 0 ms |
| CLS / page script errors | 0 / 0 → 0 / 0 | 0 / 0 → 0 / 0 |

Mobile improves in 14/15 pairs, with paired deltas from −128 to +12 ms and median
−44 ms. Desktop also improves in 14/15 pairs, with deltas from −132 to +12 ms and
median −36 ms. All 30 mobile candidates remain the original portal-card paper
background. Desktop has 27 paper-background candidates and three text-span
candidates (two before, one after); browser candidate selection varies even with
the same content. Desktop LCP ranges are 632–704 ms before and 520–660 ms after;
mobile ranges are 648–744 and 588–688 ms. The gain does not come from deleting
the LCP element, disabling
motion, reducing image quality or hiding content. The mobile gain is modest;
it is not a claim that every visit becomes faster.

Additional guard measurements retain tradeoffs explicitly. Three alternating
cold pairs per room/device (24 visits) give:

| Guard LCP | Desktop before → after | Mobile before → after |
| --- | --- | --- |
| Woodfish | 3288 → 3344 ms | 3384 → 3400 ms |
| Qimen | 592 → 600 ms | 604 → 636 ms |

Those small guard samples do not establish acceleration or statistical stability
for rooms. Their complete stylesheet rules are preserved; separately compressing
the shared sections costs 2,223 B of additional CSS transfer in these cold
room visits. Another three mobile pairs navigate from the hall to Qimen in the
same context after the hall settles, without an installed worker: LCP 276→332 ms
(+56 ms), FCP 256→320 ms. The new room-scene sheet contributes 11,327 B of
additional CSS network transfer on that first transition (11,355 B for the whole
page). Base/tools styles are reused, and an
installed complete worker can serve the scene sheet from its public cache. This
round therefore claims a hall cold-load improvement, not a site-wide speedup.
Initial page-transfer figures exclude the offline install's background download.

Validation receipts (final build verified on 2026-10-23):

- Production build: 186 pages; the generated worker allowlist contains 140 files,
  12,480,806 uncompressed bytes, version `60c9b0d783216f9238ef`. Its caching
  algorithm is unchanged; the existing build step discovers the new CSS assets.
- Source and compiled-rule reconstruction permit only the shared eyebrow rule's
  relocation. All eleven Jing pages otherwise retain identical HTML and scripts
  after removing stylesheet links; 473 runtime scripts and media assets retain
  their exact bytes. Component stylesheet order is unchanged.
- All 98 existing Jing E2E cases pass in a single run against this final build,
  including ritual animations and reduced-motion behavior. Final Astro check
  reports zero errors/warnings and 26 unrelated hints; all 210 Vitest tests
  across 25 files and 29 Node checks pass after the performance runs finish.
- Fresh desktop/mobile worker installations each cache all 140 assets. After
  clearing the normal HTTP cache and going offline, ten previously unvisited
  rooms render and work: first-use Bazi/Qimen calculations, woodfish counting,
  three lot collections, Ask Classics, encrypted case saving and audio byte
  ranges. The range check returns 206/100 bytes. Hall timer/topic shortcuts work;
  no query URLs or private plaintext enter the public cache, and no script errors
  occur. This is completed-install coverage, not interrupted-install or real-CDN
  acceptance. Earlier update-failure evidence remains in the previous round.
- Desktop/mobile reload-restored scroll, ordinary history navigation and
  back-to-top checks pass. A persisted bfcache return is not observed or claimed.
- Thirty-two visual pairs cover five routes plus hall Ask/focus/about states,
  both themes and desktop/mobile. Geometry, normalized main content and full
  computed element/pseudo-element styles agree; no horizontal overflow occurs.
  All stable pairs have zero pixels with an RGB channel difference above 8.
  Two overly early captures are rechecked after the page settles: light desktop
  woodfish has a transient computed-state mismatch, and light mobile Ask has
  311 differing pixels around the quote source despite matching layout/content.
  Both settled recaptures pass without another product change. Motion is frozen
  only in this screenshot harness. Local origins in computed URLs and CSS
  property enumeration order are normalized before comparison.
- Initial offline automation filled the confirmation field before an existing
  delayed autofocus completed. Waiting for the actual focused field and checking
  input equality repairs the harness; the password implementation is unchanged.

Evidence is isolated in `.tmp/jing-hall-mobile/`, including `decision.md`,
`artifact-identity.json`, `final-receipt.json`, `results.json`, `summary.json`, `guard-summary.json`,
`visual-comparison.json`, `computed-visual.json`, `visual-retry.json`, offline and
scroll receipts, build/test logs, and both production artifacts. Rejected style
splits, early captures and their failed probes remain available. Previous rounds
are retained. No commit, push, deployment, production configuration change, real
model call or third-party write is performed by this batch. Confidence is B for
local simulated devices; physical phones, production CDN latency and production
worker-install traffic are not measured.
