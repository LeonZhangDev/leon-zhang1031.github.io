# Game and blog discovery

## Overview

Games now expose practical release metadata and dedicated discussion pages. Blog browsing supports search, common series, additional tags, and progressive loading.

## Design decisions

- Store game metadata in one typed module to prevent index/detail drift.
- Use WebP posters and create the video element only after explicit interaction.
- Keep the first Blog view short: eight cards on mobile and twelve on larger screens.

## Implementation notes

Game detail routes are generated under `/games/details/<id>/` so they do not conflict with static playable builds under `/games/<id>/`. Blog filtering is client-side because the current archive is small enough to ship as static HTML.

### Survival trial publication — 2026-10-02

- Added `blind-box-survival` at the front of the shared typed game list. The archive and generated detail route reuse the existing poster-first card, explicit video loading, play action, metadata and comments.
- Published the Creator 3.8.8 web-desktop package under `/games/blind-box-survival/`, with engine debug disabled, no source maps, hashed resources and a stable full-viewport HTML shell. The removed default Creator header/footer previously caused the first fullscreen click to be cancelled.
- Poster and H.264 demonstration video come from actual release-package gameplay, not concept art or simulated footage. Marked PC Web and 18+ public beta; server-verified leaderboards and exhaustive game balance are not represented as complete.
- Three publication browser regressions cover real lazy video metadata, all four game cards, play/detail links, 390px overflow, release settings and effect data. Isolated gameplay smoke covers new game, character, opening three starter boxes, combat, management and absence of Debug.
- Publish only through the existing main-to-Vercel pipeline behind `https://zk.lz1031.workers.dev`; no domain or proxy changes. Commit uses the existing `[skip actions]` convention so the unrelated Gitee force-push workflow does not execute.
