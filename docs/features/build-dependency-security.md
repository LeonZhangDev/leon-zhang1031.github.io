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

### Non-security diagnostic follow-up

- Remove unused source builders, intermediate Qimen values and imports without
  changing the verification-blocked schema, solar-term result or chart algorithm.
- Use the QR card's explicit click event rather than deprecated global `event`.
  Preserve card/backdrop/close/Escape behavior on desktop and mobile navigation.
- Label the Hugo HTML example `html`, supported by the installed Shiki grammar;
  leave the example text unchanged and regenerate the editorial ledger.
- Name intentionally unused extension callback positions with `_` while retaining
  callback arity. Repackage the unchanged-functionality 2.3.0 download and SHA256
  so published bytes match source; no new extension feature/version is introduced.
- Retain two visible `document.execCommand('copy')` deprecation hints. Browser
  tests explicitly deny async clipboard and verify actual copy/paste fallback;
  replacing this path merely to hide hints would regress existing functionality.
  No diagnostic exclusions, casts or suppression directives are added.
- Regression tests first failed on the old QR handler/unsupported fence, then
  passed after the focused fixes. Full acceptance is recorded in progress.

### Security research follow-up (recommendations, not implemented)

- Static pages and Artalk already have separate deployment/data boundaries;
  a new security framework or frontend anti-hacker plugin is not warranted.
- Check actual server captcha/rate policy, low-privilege service, loopback port,
  SSH restrictions, account MFA and OS patches. The bootstrap already enables
  image captcha and sandboxing; its presence is not live-configuration evidence.
- Plan encrypted off-host backups and restore drills; existing local backups do
  not protect against loss of the whole server. Choose storage/retention first.
- Apex homepage public GET returned no selected CSP/HSTS/nosniff/referrer-policy
  headers. Comment config GET has nosniff, Referrer-Policy and frame-ancestors.
  Evaluate compatible headers incrementally, with CSP Report-Only before
  enforcement; retain Artalk iframe, inline scripts and WASM/game requirements.
- Evaluate WAF/CC only after confirming plan cost and domain coverage; static
  EdgeOne hosting does not establish protection of the separate comment origin.
- No live security settings, paid resources, databases or credentials changed.
  This is advice and read-only observation, not a penetration test or proof of
  an exploitable vulnerability or active intrusion.

Sources: [Artalk safety](https://artalk.js.org/zh/guide/security),
[captcha operation limits](https://artalk.js.org/zh/guide/backend/captcha.html),
[Pages headers](https://pages.edgeone.ai/document/edgeone-json),
[GitHub MFA](https://docs.github.com/en/authentication/securing-your-account-with-two-factor-authentication-2fa/about-two-factor-authentication),
[legacy copy API](https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand).
