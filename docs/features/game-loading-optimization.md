# Game loading optimization

## Overview

First batch: reduce the oversized survival-game favicon request and improve
repeat visits through exact, versioned engine-resource cache rules. No game
logic, art/audio bundle, save key, storage implementation, origin or play URL
changes. No new dependencies, hosting product or paid resource.

## Design decisions

- The survival release previously requested a 1,021,548-byte ICO. Reuse the
  current site's existing 46,381-byte Zhang icon (95.46% smaller). Retain the
  old ICO for rollback; do not regenerate game artwork or repack bundles.
- Long caching applies only to eight literal URLs: the active core engine and
  Spine WASM for each of four games. Resolve the current import map to identify
  active engines; do not cache an old unused engine merely because it exists.
- Preserve global security headers, vendor edge caching and all other browser
  cache policies. In particular, no blanket immutable rule for HTML, index.js,
  settings, import maps, service workers, main game code or the whole games tree.
- Each immutable URL has a recorded SHA256 checked by the normal build command.
  Text bundle hashes use canonical LF (Git's Windows CRLF checkout normalizes
  to LF in Pages); binary WASM hashes use exact bytes without normalization.
  Changed resource bytes require a new URL and updated references; do not simply
  update a checksum at the old URL. Browser caches cannot be recalled through
  a CDN purge. Retire old rules only after publishing updated references, and
  retain resources needed by older sessions while handling release rollback.

## Implementation notes

- `edgeone.json` adds exact `Cache-Control: public,max-age=31536000,immutable`
  rules. The existing global response headers remain unchanged.
- `tests/game-loading.test.mjs` owns the eight-file contract and guards against
  missing/changed bytes, inactive engine references, broad cache rules and an
  oversized icon request. `npm run build` runs this check before Astro.
- Benchmark in isolated Playwright CLI contexts without request interception:
  routing disables HTTP caching, so routing-based timings would be misleading.
  Cold means a fresh browser context; warm means visiting about:blank and then
  returning to the same URL in that context. No cache-busting URL or forced
  reload is used. Existing user browser storage is never cleared or opened.
- Use the same desktop viewport, unthrottled CPU and CDP network profile:
  5 Mib/s downstream, 1 Mib/s upstream and 60ms latency. Three cold/warm pairs
  for the survival game; report medians, bytes and engine cache behavior, not
  a single best run. Cocos scene present plus rendered frames >2 is the startup
  marker, not proof that all assets, sound or gameplay are ready.
- Before publication, compare baseline/candidate through loopback static QA
  servers with equivalent MIME, compression and conditional-cache handling.
  This tests browser policy effects, not the live CDN implementation. Validate
  actual apex/WWW response headers after automatic deployment separately.
- Test new-game/save/revisit using an isolated synthetic browser profile only.
  Published game scripts/resources and storage logic remain byte-for-byte
  unchanged. Local synthetic data is not a backup or a migration of user saves.

### Pre-publication acceptance (2026-10-21)

- Initial cloud build was safely blocked by Windows CRLF versus cloud LF hash
  differences. Confirmed each canonical LF bundle equals its committed Git blob,
  then made text-only hash comparison platform independent; game files unchanged.
- Astro check: zero errors/warnings, two existing clipboard deprecation hints.
  Vitest: 210 passed; Chrome E2E: 126 passed; root Node checks: 18 passed.
- All four games rendered Cocos scenes on first and repeat visits without
  page errors in isolated contexts. These smoke checks do not cover every level.
- Created a synthetic new game through the UI, acknowledged its intro, confirmed
  automatic IndexedDB saving, revisited the menu and clicked Continue. Slot 1
  was byte-equivalent before/after revisit and restored the same nickname,
  profession, room/day and inventory. No real-user storage was opened or cleared.
- Three-pair loopback comparison (medians): baseline cold 6,029ms / warm 2,182ms;
  candidate cold 5,097ms / warm 2,171ms. Startup resource transfer decreased
  from 1,789KiB to 837KiB. Warm timing is effectively unchanged, not a speedup
  claim. First samples include initial server compression; keep all samples.
- Live BEFORE medians on the same CDP profile: cold 10,928ms / warm 4,342ms,
  startup resource transfer 1,979KiB / 1KiB. Do not compare these directly to
  loopback values: CDN compression, latency and browser workload differ.

### Live acceptance (2026-10-21)

- Code `c2c916f`, Pages deployment `dpavtdlysn4a`: successful. Cloud build
  passed all four cache guards and generated 186 pages; dependency audit: zero.
- Apex and WWW: all eight engine/WASM URLs return 200, expected MIME, immutable
  cache policy and the original CSP/nosniff headers. Game HTML uses the small
  icon and still revalidates; unversioned index.js and cc.js still revalidate.
- Same browser/CDP profile, three pairs per version; no request interception,
  forced reload, real-user profile or concurrent local build during timing:

| Metric | Before | After |
| --- | --- | --- |
| Cold scene-frame samples (ms) | 11699 / 10928 / 10642 | 12342 / 10802 / 9964 |
| Cold median (ms) | 10928 | 10802 |
| Warm scene-frame samples (ms) | 4342 / 4699 / 3849 | 3991 / 3713 / 3518 |
| Warm median (ms) | 4342 | 3713 |
| Cold resource transfer at marker (KiB, rounded) | 1979 | 1026 |
| Warm resource transfer at marker (KiB, rounded) | 1 | 1 |

- BEFORE completed at 13:57:30 UTC; AFTER at 14:14:17 UTC. No page errors.
  Resource bytes exclude the HTML navigation. Cold time improvement is small;
  sample spread overlaps and WAN/CDN effects are not controlled. Warm median
  improved in this sample, but the loopback warm result was effectively flat:
  do not promise a universal latency percentage. The icon's byte reduction and
  exact live cache headers are the deterministic improvements.
- Post-deployment browser smoke: all four live game scenes render (200); warm
  survival engine transfer is zero bytes with a zero-duration cache hit. Apex
  and WWW game archives show all four cards without 390px overflow. The comment
  textarea remains visible and browser-origin comment API read returns 200.
  No page errors, comment writes, server changes or real-save storage access.

Sources: [Pages cache defaults](https://pages.edgeone.ai/document/configuring-cache),
[exact URL/header rules](https://pages.edgeone.ai/document/edgeone-json).

## Second batch — 2026-10-22

### Overview

Reduce discovery latency for the survival game's existing critical requests.
Only its maintained HTML shell changes; no engine, settings, game bundle,
audio/texture, storage format/key, IndexedDB version, play URL or cache changes.
No new dependency, paid resource, service worker or cross-page prefetch.

### Design decisions

- Add just three `preload` hints: the current core engine, startup settings and
  main script. They fetch existing bytes early without executing them. The
  existing SystemJS/Cocos loading and execution order remain authoritative.
- Match request credentials separately: SystemJS engine script has no
  `crossorigin`; XHR settings and the Cocos bundle script use `anonymous`.
  An initial local probe caught the bundle credentials mismatch before release;
  an HTTP-cache fallback alone is not proof of preload reuse.
- Keep the 2,000ms splash setting. This website repository contains published
  packages, not the original Creator project/build settings. Do not rewrite a
  cached settings file, patch an engine or bypass branding restrictions.
  Revisit only with the source project and supported free official build option.
- Tests bound hint count, check files/current references, request modes and
  loader execution order. Existing immutable-byte contracts remain unchanged.

### Implementation notes

- Record three cold/warm menu-visible samples under the same browser/CDP
  profile as batch one. A visible active `新游戏` Cocos label is the marker,
  not all art/audio ready or completed gameplay. Do not compare this marker
  directly with the previous scene-frame benchmark.
- Local baseline/candidate use identical headers, MIME and compression, with
  both servers primed before measurement. Browser contexts stay fresh per pair;
  no request interception, cache clear, forced reload or concurrent build.
- Verify each selected URL is requested once, including its eventual loader
  use, with no credentials mismatch. Test an isolated synthetic new save and
  Continue; do not read or clear real-user browser storage.

### Pre-publication results

- After priming server compression caches, three loopback pairs per version:

| Menu-visible time (ms) | Before | Candidate |
| --- | --- | --- |
| Cold samples | 5100 / 5131 / 5083 | 4659 / 4682 / 4689 |
| Cold median | 5100 | 4682 |
| Warm samples | 2150 / 2131 / 2108 | 2138 / 2133 / 2124 |
| Warm median | 2131 | 2133 |

- Cold resource transfer at the marker: 856,973 bytes on both versions. Each
  selected resource has exactly one resource timing entry, initiated by `link`
  in the candidate, with no preload/credentials/CSP warnings or page errors.
  This changes request scheduling, not compression or game download size.
- Live BEFORE menu-visible samples: cold 15413 / 15295 / 15043ms (median
  15295ms); warm 5196 / 3978 / 3509ms (median 3978ms). Captured at 08:55 UTC,
  before any publication. These are not comparable to loopback absolute times.
- Synthetic new game, intro acknowledgement, automatic IndexedDB slot save,
  revisit and Continue passed. The complete slot serialized identically before
  and after revisit and restored the same nickname/day/room/inventory. The
  initial UI probe clicked before slot reading finished; waiting for the normal
  UI readiness and retrying passed, without storage/logic changes.
- Source diff under `public/games/` is just four added lines in the survival
  HTML; all game scripts, images, audio, settings and save code are unchanged.

### Regression verification

- Root Node checks: 20 passed, including six game-loading contracts. Vitest:
  210 passed across 25 files. Astro check: zero errors/warnings, ten hints in
  the independently updated clipboard-extension files; no dependency changes.
- Full Chrome E2E: 126 passed with two workers. An initial default-concurrency
  run had one unrelated lot-animation timeout (125 passed); the isolated test
  and the subsequent complete bounded-concurrency run both passed. No animation
  implementation or test expectations were changed to obtain a pass.
- Production publication and same-profile measurements are verified separately
  after pushing; local build/test results alone do not establish deployment.

### Production acceptance

- Code commit `55abe8e` pushed successfully. Both apex and WWW subsequently
  returned all three hints, HTTP 200, CSP and `nosniff`; the exact engine URL
  retained `public,max-age=31536000,immutable`. No cloud setting was changed.
- Same-profile live AFTER measured at 09:10:58 UTC (BEFORE at 08:55 UTC):

| Menu-visible time (ms) | Before | After |
| --- | --- | --- |
| Cold samples | 15413 / 15295 / 15043 | 12119 / 9577 / 9580 |
| Cold median | 15295 | 9580 |
| Warm samples | 5196 / 3978 / 3509 | 3691 / 3898 / 3936 |
| Warm median | 3978 | 3898 |

- Profile: 5 Mib/s down, 1 Mib/s up, 60ms simulated latency, desktop with
  unthrottled CPU. Resource transfer at marker stays 1,050,860 bytes cold and
  900 bytes warm; HTML is excluded. WAN/CDN variability remains uncontrolled:
  the observed 37% cold median reduction is not a universal speed guarantee.
- All selected URLs have one timing entry, initiated by `link`; warm transfer
  is zero. No page errors, credentials mismatch or CSP violations. One pair
  emitted Chrome's early-preload/late-use advisory for the main script; it was
  intentionally fetched early and eventually used by the existing Cocos loader.
  This is not a duplicate transfer, but the rollout is not warning-free.
- The menu marker is not a promise that asynchronous save reading, all audio
  or all art are ready; the separate synthetic save/Continue test covers the
  save path. Physical mobile hardware and all network regions remain untested.
- Post-publication browser smoke: all four game scenes render with HTTP 200;
  warm survival engine is a zero-byte cache hit. Apex/WWW archives each show
  four cards with no 390px horizontal overflow. Comment textarea is visible,
  browser-origin API read/JSON parsing returns HTTP 200, and no page errors
  occur. No comment writes, database changes or real-user save access.

References: [preload critical assets](https://web.dev/articles/preload-critical-assets),
[Creator build options](https://docs.cocos.com/creator/3.8/manual/en/editor/publish/build-options.html).
