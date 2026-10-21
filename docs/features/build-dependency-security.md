# Build dependency security

## Overview

The 2026-10-21 repair replaces the vulnerable static-site build chain without
changing published article URLs or Artalk storage. The root audit initially
reported 31 findings (including one critical); a clean `npm ci` with Node 24
and npm 11 now audits 460 packages with zero findings at verification time.
This is dependency-advisory evidence, not a comprehensive security audit.

## Design decisions

- Use Astro 7.4.1, Tailwind 4.3.3 via its Vite plugin, and Sharp 0.35.5.
  Tailwind 3's dependency chain had no patched in-place braces release.
  Remove the unused Vercel server adapter: deployment remains static `dist/`.
- Use the Content Layer glob loader and `src/content.config.ts` as the schema
  owner. Post `id` replaces the removed legacy `slug`; heading slugs are unchanged.
- Explicitly retain the unified Markdown processor and HTML compression.
  Route both math plugins to the pinned root KaTeX version with `$katex`;
  browser coverage verifies rendered formulae and local fonts.
- Use Node 24 (`.node-version`). Astro's minimum is 22.22; the prior EdgeOne
  22.11 runtime was insufficient. EdgeOne is saved as 24.18.0 for the next build.
- Tailwind 4 raises browser requirements (Safari 16.4+, Chrome 111+,
  Firefox 128+). This trade-off removes the vulnerable legacy dependency chain;
  older-browser acceptance is not claimed.
- The owner explicitly confirmed erasing old Waline comments/accounts without
  an additional export. Only `main/neondb.public.wl_comment`, `wl_counter`,
  and `wl_users` in Neon `soft-surf-57088630` were cleared. Before: 3/0/2
  rows; independent after-counts: 0/0/0. No tables or databases were dropped.
  Neon-managed history may retain old data temporarily (6-hour configured history).
- Pause the old Vercel production project instead of deleting the project or
  integration. The formal API returns 503 `DEPLOYMENT_PAUSED`. Preview artifacts
  are not deleted by pause. Artalk SQLite and existing approved comment remain
  independent; no migration, reset or Artalk data deletion is performed.

## Implementation notes

- Remove `services/waline`, its deployment test, the unused account modal and
  its CSS. Git history retains code, not erased live database rows.
- Replace the obsolete Waline probe in `scripts/blog/verify-production.mjs`
  with a read-only Artalk probe against the current apex domain.
- Default missing content bodies once in the shared reading-time helper.
  Use package scripts rather than a removed internal Astro CLI file for E2E startup.
- ADR backfill action: lighter executed-decision record here, with current-state
  updates in comments reliability and the baseline. No duplicate ADR framework
  is introduced. Packaged Aegis ADR reference documents were unavailable;
  this note is not an authoritative Aegis gate result.
- Local acceptance: 210 unit tests, 125 Chrome E2E tests, 10 Node safety tests,
  163-post structural audit, type check without errors, and 186-page build.
  Publication and production acceptance are recorded separately in progress.

References: [Astro 6 migration](https://docs.astro.build/en/guides/upgrade-to/v6/),
[Astro 7 migration](https://docs.astro.build/en/guides/upgrade-to/v7/),
[Tailwind upgrade guide](https://tailwindcss.com/docs/upgrade-guide).
