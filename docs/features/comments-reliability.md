# Comments reliability

## Overview

Waline is loaded only after a successful API health check. Unavailable service is shown as a maintenance message with a retry button.

## Design decisions

- Keep comments on detail pages where discussion has a clear subject.
- Allow anonymous comments with optional nickname and email.
- Disable image uploads and constrain comment length to reduce abuse surface.
- Use Neon PostgreSQL as durable storage and keep database credentials in Vercel Sensitive variables.
- Keep anonymous comments in `waiting` status until an administrator approves them.
- Expose low-emphasis login and registration actions in the global footer without presenting comments as a full site membership system.

## Implementation notes

The September 8, 2026 client check validates both HTTP status and the Waline JSON envelope. Failure messages are explicitly unhidden before retry. The configured remote API currently returns HTTP 404; see [blog-reading-quality](blog-reading-quality.md) for the deployment blocker and validation scope.

The client config uses `login: 'enable'` so visitors can remain anonymous while administrators can sign in, optional metadata, and a two-to-one-thousand character limit. Each detail-page comment section exposes the `#comments` anchor for direct links. The global layout provides a site-styled account modal that embeds Waline's canonical login and registration routes, plus an accessible scroll-to-top control on long pages. The server sets `COMMENT_AUDIT=true`, `IPQPS=60`, and `SECURE_DOMAINS`. Waline's default Akismet integration remains enabled. The first site administrator registers through the Waline management UI and reviews queued comments there.

### 2026-10-21 production blocker

Browser checks from `https://leonzk.cn` found CORS errors for the configured comment API. Direct navigation to both `lz1031-waline.vercel.app/api/comment` and the previous `zz1031-waline.vercel.app/api/comment` returned Vercel `404 NOT_FOUND`.

The current `lz1031-waline.vercel.app/` root renders the blog homepage, not Waline. The owner supplied deployment metadata showing the Waline Vercel project builds the blog repository at `f94fe3a`. This repository contains no Waline server entry point; `workers/waline` is a proxy, not the comment backend. The repair belongs to the Vercel project's service source/build configuration, not a browser CORS bypass.

Restore a known-good Waline deployment or reconnect the correct server source while preserving existing database credentials, tables, users and comments. Do not initialize a replacement database or rerun schema setup without confirming the existing state. Then verify API JSON, CORS from `leonzk.cn`, login/registration and a separately authorized moderated test comment. Current backend environment settings and database state have not been inspected.

### 2026-10-21 recovery in progress

- Inspected the authenticated Vercel project in Edge. Existing Neon integration and Production database variable names remain present; their secret values were not revealed, downloaded or changed. Presence alone does not establish database connectivity or row preservation.
- Restored retained deployment `J79VFQmWmcm6nTDLFasTk7vGkmgN` (August 27) without promoting it. Its API returns Waline JSON `403 Forbidden`, not the blog's Vercel 404. The old allowlist also rejects the current site's browser request.
- Recovered exact source settings: `@waline/vercel` 1.41.5, jsdom override 26.1.0, and suppression of SQL info logging. Reproducible source now lives in `services/waline`; no migration or database initialization is included.
- Set Production `SITE_URL=https://leonzk.cn` and `SECURE_DOMAINS=leonzk.cn,www.leonzk.cn,lz1031-waline.vercel.app,zk.lz1031.workers.dev`. Values were formerly write-only, so their previous values were not inspected. These updates require a new deployment before taking effect.
- Disconnected the incorrect blog Git repository from the comment project, preserving project settings and database integration. This prevents future website pushes from replacing Waline with Astro again.
- Vercel refused redeployment of the restored prebuilt artifact: prebuilt deployments cannot apply current project settings or environment variables. The owner authorized Vercel CLI in Edge for a fresh source deployment.

### 2026-10-21 production recovery verification

- Promoted deployment `dpl_AJTLvbieVEqjTYtqA4toNqngjsX1` to the existing `lz1031-waline.vercel.app` domain. The first two candidates exposed missing dynamic MathJax/font and `mhchemparser` dependencies at runtime despite successful builds. Explicit function includes fix both omissions; a Ready build alone was not accepted.
- From an actual `leonzk.cn` Edge page, the formal comment API returned HTTP 200 and `errno=0`. The article `/posts/ai-coding-assistant/` rendered its comment editor without console errors. At 390px the editor remained visible and document width stayed within the viewport.
- With explicit owner authorization, submitted exactly one deployment-validation comment on `/__waline-health-check-20261021/`. The response returned ID `6`, `errno=0`, and status `waiting`; an anonymous read returned count 0, confirming the pending comment was not public. Keep this record for owner review; do not delete original comments.
- Login and registration routes render their forms; the owner successfully signed in to the existing Leon Zhang account and reached its profile. That session exposes no comment-management navigation, so administrator privileges, original-record comparison, approval actions and email delivery remain unverified. The website's account-modal iframe also renders the login form. An unauthenticated management-list request returns HTTP 401 with no rows. A missing management-page favicon is cosmetic and does not affect the API.
- Existing database integration and credentials were reused unchanged; no database setup, migration, replacement, deletion or account creation was performed. This establishes connectivity and a moderated test write, not a before/after inventory of all historical rows.
- Git publication remains gated on integrating and testing the newer remote commits. A full-object fetch failed with an interrupted TLS download; no force push or history reset was used.

### 2026-10-21 Artalk replacement requested

- The owner chose Artalk after Waline recovery. Keep the working Waline service and original Neon database online until the replacement passes acceptance; do not repoint the current comment hostname or remove its source yet.
- Deployment destination is unresolved. Artalk requires its own backend process/container and durable storage, separate from the static website. No server purchase, paid plan, database credential transfer or external database migration is authorized by a hosting assumption.
- Before switching: obtain an authorized full export including moderated comments, preserve it outside Git, import into independent Artalk storage, and compare original comment count, timestamps, reply relationships, moderation flags and article keys. Keep `/__waline-health-check-20261021/` separate from genuine reader comments.
- Existing Waline accounts, password hashes and OAuth bindings are not assumed compatible with Artalk. Establish administrator access and explicitly validate account behavior rather than promising transparent credential migration.
- Replace the article widget and footer/account actions only after the backend hostname is known. Test anonymous submission, pending-comment visibility, administrator review, mobile layout, CORS, failure/retry and rollback before Git publication and production cutover.
- References: [deployment](https://artalk.js.org/zh/guide/deploy), [storage configuration](https://artalk.js.org/zh/guide/backend/config), [migration](https://artalk.js.org/zh/guide/transfer). No Artalk service or migration has been started.
