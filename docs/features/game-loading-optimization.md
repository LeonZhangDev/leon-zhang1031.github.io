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
