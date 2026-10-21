# Waline account modal

## Overview

Retired from the active layout by the staged Artalk replacement. Source and
styles are temporarily retained for review until cutover acceptance; the
Waline service and original database must remain intact regardless. The new
footer links directly to the Artalk administrator page, without advertising
Waline registration or sharing credentials between systems.

The global footer opens Waline login and registration inside a site-styled modal instead of immediately navigating visitors away from the portfolio.

## Design decisions

- Keep Waline as the canonical owner of credentials, tokens, social login, password reset, and account data.
- Embed the official `/ui/login` and `/ui/register` routes in a cross-origin iframe because the deployed Waline service permits framing.
- Style only the portfolio-owned modal shell. Browser same-origin rules intentionally prevent the parent site from rewriting Waline's internal interface.
- Preserve direct links as a no-JavaScript and new-window fallback.
- Keep anonymous comments available.

## Implementation notes

`AccountModal.astro` owns modal state, tabs, loading feedback, focus return, backdrop and Escape-key dismissal. The global stylesheet provides desktop split-panel and mobile full-screen layouts. No authentication tokens or passwords pass through the portfolio application.
