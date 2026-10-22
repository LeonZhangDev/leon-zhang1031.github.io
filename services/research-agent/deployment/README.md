# HTTPS release preparation

Target: existing Ubuntu server `82.156.68.115`, Caddy host `comments.leonzk.cn`.
The public website remains Astro/EdgeOne Pages. Only its private random path is
proxied to the Node service. Existing Artalk routes and data must be preserved.
These templates have not been installed on the server.

## Files

- [agent.env.example](agent.env.example): blank production configuration; start mock/offline.
- [research-agent.service](research-agent.service): loopback service with persistent storage.
- [caddy-routes.caddy](caddy-routes.caddy): private-route fragment, not a full Caddyfile.
- [../site-proxy.mjs](../site-proxy.mjs): fixed-backend EdgeOne handler without credentials.

## Deployment sequence

1. Verify host SSH fingerprint, OS/architecture, Node version (>=22.22.0), current
   Caddy configuration and Artalk health. Back up the actual Caddyfile before editing.
   Use a dedicated unprivileged `research-agent` system account.
2. Install the service source under `/opt/research-agent/current`; use the lockfile
   with `npm ci --omit=dev --ignore-scripts`. Install dependencies for the server's
   platform rather than copying Windows `node_modules`.
3. Transfer the consistent SQLite backup into `/var/lib/research-agent/agent.sqlite`.
   Keep its existing password hash, task history, all model-call reservations and
   cloud-dispatch records. The seed snapshot contains private reports and password
   hashes: never commit it or expose it through a static directory. Do not overwrite
   an existing production database; inspect and back it up first. Local and server
   copies must not both issue real calls after migration.
4. Create `/etc/research-agent/agent.env` from the blank template, owned by root,
   mode 0600. Transfer the user's configured keys only over the authenticated
   connection, without echoing them. Initially retain mock/offline. Give the service
   account sole access to its persistent data (directory 0700, database 0600).
   The current seed floor is 1881 units = CNY0.1881; refresh it from the ledger if
   another authorized call occurs before transfer.
5. Review the unit's Node executable path and install it. Start the service and
   check its status/auth endpoint through loopback with `X-Forwarded-Proto: https`
   and `X-Forwarded-Host: comments.leonzk.cn`. Confirm setup is disabled, protected
   APIs return 401, and the preserved budget is visible only after login.
6. Merge the fragment into the live comments site block. Wrap the existing Artalk
   reverse proxy in a fallback `handle` block, retaining all its original options.
   Preserve the original site's other directives. Validate using `caddy validate`
   before a reload; confirm Artalk health again and verify the private HTTPS login.
7. Once backend checks pass, install the Pages function wrappers from the release
   branch. The documented Pages integration uses `/functions`: the `index.js`
   and `[[path]].js` below the random path each export the handler from
   `services/research-agent/site-proxy.mjs` as named `onRequest`. Check the project's
   actual build/runtime support before publishing. Do not add this path to menus,
   robots.txt or sitemap; responses use noindex/no-store.
8. Validate browser login, Secure/HttpOnly Cookie, protected report access,
   logout, mock task completion and original blog/comment pages. Only then select
   qwen/cloud in the private server configuration and enable the corresponding
   explicit startup flags. The original 5-yuan cap and existing ledger remain.
   Enabling modes itself must not automatically run a model task.

## Rollback and acceptance

Keep the previous service directory/unit and Caddyfile. On failure, restore the
previous routing/configuration and reload only after validation. Keep SQLite and
all trial accounting; do not roll the budget back to an earlier snapshot after
any paid request. Source build, offline proxy tests and API ingest do not prove
production routing, cloud UI visibility or vendor billing.

Current real verification: task `df526952-d641-42ed-a093-8c365e45bedc`, 8 HTTP200
model requests, 17 HTTP202 trace writes, completed immediately after the first
valid report save. Search/page tools are still synthetic. Cumulative model usage
estimate CNY0.039477; conservative reservation CNY0.1881. Final vendor bills and
LangSmith quota/readback remain unverified.
