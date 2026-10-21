# Artalk

Independent Artalk 2.10.0 service for `comments.leonzk.cn`. The original
Waline service has since been paused and its three tables cleared with owner
approval; its source was retired. Artalk data remains independent; no historical import.

- `bootstrap.sh`: first-install script for the verified official Linux amd64 archive.
- Bind only `127.0.0.1:23366`; put Caddy HTTPS in front of it.
- Persistent SQLite: `/var/lib/artalk/artalk.db`; configuration contains a
  server-generated key in `/etc/artalk/artalk.yml`, never in Git.
- New comments require approval. The website disables client image uploads;
  this is not proof that backend upload endpoints are disabled. SMTP and social login are disabled.
- Create the administrator interactively using `artalk admin --config
  /etc/artalk/artalk.yml --name 张坤 --email <owner-email>`; type the password
  only into the server terminal's hidden prompt, never chat or command arguments.
- Daily consistent SQLite backups live in root-only `/var/backups/artalk`.
  Retention/off-host backup needs a later explicit policy; this script never
  deletes backups. Check disk usage periodically.
- `Caddyfile`: dedicated comment proxy limits request size/time and upstream
  concurrency without changing Artalk data or administrator authentication.
  Excess concurrency returns 503 and recovers after requests drain. Caddy 2.6.2
  reports streaming body overflow as 502; normal subsequent requests recover.
- `verify-proxy.py`: isolated fake-backend check, not a public-service load test.
  Run `python3 verify-proxy.py Caddyfile` with Caddy installed and loopback port
  24443 free. No Artalk data or credentials are used.
- Do not rerun bootstrap against an existing database. Configuration changes,
  upgrades and restores require an explicit backup and validation first.

TLS, trusted origins, anonymous pending submission, administrator approval,
rejected unauthenticated management, local backup integrity and frontend checks
passed on 2026-10-21. Production website publication is tracked in
`../../docs/progress.md`; a local preview is not production acceptance.

Administrator: open `https://comments.leonzk.cn/sidebar/#/comments`, sign in,
select the site or all sites, then open 待审. Click a comment's 待审 action to
approve it (the action becomes 已审). Clicking 已审 reverses approval.
The authorized replacement validation comment is number 2 on the real learning
roadmap article; the owner deleted the earlier synthetic-path record.

The website explicitly disables image uploads and ignores remote frontend
overrides. An earlier public config check advertised `imgUpload: true`; the
2026-10-21 follow-up now returns `false`. Neither frontend setting proves
backend upload endpoint rejection; do not infer it from the template. SMTP
delivery and off-host disaster-recovery backups are not part of acceptance.

Current control evidence, limitations and the exact proxy rollback file are in
[free security hardening](../../docs/features/free-security-hardening.md).
