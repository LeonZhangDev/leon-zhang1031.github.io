# Waline service

This is the recovered comment backend, not the Astro website. It preserves the
deployed `@waline/vercel` 1.41.5 / jsdom 26.1.0 versions and SQL info-log suppression.
Explicit function includes preserve MathJax's dynamically loaded modules, fonts and
`mhchemparser`, which automatic dependency tracing otherwise omits.

Deploy this directory only to the existing `leonzhang1031/lz1031-waline` project.
Keep database connection variables in that project's existing Production
environment. Do not download them into the repository, initialize a replacement
database, rerun database setup, or attach the Astro repository root to this service.

The current public site is `https://leonzk.cn`, and the comment service domain is
`https://lz1031-waline.vercel.app`. Configure `SITE_URL` and `SECURE_DOMAINS`
in Vercel. Domain allowlists contain hostnames without URL protocols.

Install with `npm ci`, then publish with Vercel CLI from this directory after
confirming the linked project. Production validation must include API JSON,
cross-origin reads from the real site, account routes, and an approved moderated
write/read test. Merely seeing a Ready deployment does not establish service health.

Do not run a schema migration or use registration to replace an existing administrator.
