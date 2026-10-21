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
- Vercel refused redeployment of the restored prebuilt artifact: prebuilt deployments cannot apply current project settings or environment variables. A fresh source deployment is required. Vercel CLI device authorization was requested from the owner in Edge; publication and live acceptance remain pending. No Git push, database write, account registration or real comment submission has occurred during recovery.
