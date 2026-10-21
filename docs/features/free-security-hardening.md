# Free security hardening

## Overview

Protect the existing static site and independent Artalk service with free,
reversible controls. Preserve comments, administrator sessions, games, downloads
and platform cache behavior. This is hardening, not a penetration test or a
guarantee against intrusion or arbitrary traffic volumes.

## Design decisions

- The live EdgeOne Pages console already enables automatic DDoS cleaning and
  adaptive frequency control (2000 requests per visitor per 5 seconds, loose,
  JavaScript challenge). Retain these settings and default static edge caching.
  They cover the Pages website, not the independent comment origin. Free DDoS
  protection has no guaranteed minimum cleaning capacity.
- Do not enable site-wide human verification, strict IP bans or forced cache
  overrides: those can reject APIs/shared-network visitors or serve stale HTML.
- Add only nosniff, strict-origin-when-cross-origin and a deliberately minimal
  CSP (`base-uri 'self'; object-src 'none'`) to Pages. This is not a complete XSS
  policy; scripts, inline code, WASM and approved frames are not restricted.
- Bound the dedicated comment proxy: 15s headers, 60s body read, 2m idle,
  128KB headers, 1MiB body, 3s dial and 30s upstream response headers. Leave
  response write duration unrestricted for downloads/exports. Existing Artalk
  body limit is already 1MiB and backend/client image upload is disabled.
- At 64 in-flight proxy requests, shed excess work with 503 and recover as work
  drains. Cap upstream connections at 64. This is conservative load shedding,
  not a measured capacity promise, network DDoS protection or per-IP rate limit.
  Parallel admission may race slightly; the upstream connection cap is separate.
- Do not trust incoming forwarded IP headers or retry comment writes. Existing
  loopback-only Artalk, non-root user, systemd sandbox, captcha, moderation,
  origin allowlist and backup timer remain in place.

## Implementation notes

- `edgeone.json` owns static response headers; it deliberately contains no
  build overrides, cache rules, X-Frame-Options or HSTS preload.
- `services/artalk/Caddyfile` owns only comments.leonzk.cn. Before live reload,
  validate the candidate, verify the old config hash, run the existing consistent
  SQLite backup and retain a root-only old proxy config for rollback.
- On the installed Caddy 2.6.2, explicitly set `max_fails 1`: otherwise an
  overload-only passive policy can incorrectly regard a healthy backend as down.
  No failure-duration ban is enabled. Isolated fake-backend testing caught this
  before live replacement. Streaming body overflow on this version returns 502
  rather than 413; the body is rejected and subsequent normal requests recover.
- `services/artalk/verify-proxy.py` tests only loopback with a fake backend and
  three simultaneous requests, reducing the candidate cap to two. It checks
  normal access, overload rejection, recovery and normal/oversize bodies, without
  accessing Artalk or sending traffic to public services. It requires Caddy,
  Python 3.10+ and an unused loopback port 24443.
- The browser regression injects the actual Pages candidate headers into local
  preview responses. Astro preview alone does not apply vendor headers. Verify
  actual public headers separately after the automatic deployment.
- Live proxy reload on 2026-10-21 preserved SQLite integrity (`ok`) and counts
  comments/users/sites = 1/2/1, public comment 2, apex/WWW CORS and authenticated
  management visibility. Anonymous site management returns 403; an unapproved
  origin gets no CORS allow header (public comments are still public data).
- Rollback config: `/etc/caddy/Caddyfile.before-security-20261021-213201`.
  Restore this exact file, validate and gracefully reload Caddy if required;
  do not restore or delete the database to roll back proxy changes.

### Deferred controls and boundaries

- SSH root/password authentication remains enabled. Do not disable it until the
  owner has verified key login and recovery access. Existing Tencent terminal
  MFA is retained. Live cloud firewall allows only TCP 22/80/443 and ICMP for
  IPv4; the Artalk port is not opened. No credentials or firewall rules change.
- The distro Caddy is 2.6.2. Plan a separate backed-up upgrade with repository,
  package signature and compatibility validation; do not confuse added headers
  with current OS/proxy patch compliance.
- Local consistent backups exist; encrypted off-host backup and a restore drill
  still require a destination/retention decision. No storage was purchased.
- No real load/attack test or new public test comment was submitted. No claim
  that free services prevent bandwidth saturation or unlimited DDoS is made.
  Existing server bandwidth/traffic-package billing still applies; request
  limits do not guarantee zero traffic-overage charges.

Sources: [Pages quotas and protection](https://pages.edgeone.ai/document/limits-and-quotas),
[default caching](https://pages.edgeone.ai/document/configuring-cache),
[header configuration](https://pages.edgeone.ai/document/edgeone-json),
[Caddy proxy controls](https://caddyserver.com/docs/caddyfile/directives/reverse_proxy),
[Caddy timeouts](https://caddyserver.com/docs/caddyfile/options),
[body limits](https://caddyserver.com/docs/caddyfile/directives/request_body),
[2.6.2 upstream availability](https://github.com/caddyserver/caddy/blob/v2.6.2/modules/caddyhttp/reverseproxy/hosts.go),
[Artalk captcha](https://artalk.js.org/zh/guide/backend/captcha.html).
