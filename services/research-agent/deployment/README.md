# HTTPS deployment

## 2026-10-23 Tavily release

Active source: `/opt/research-agent/releases/tavily-28394ed3d986`, 44 verified source files. Archive SHA-256: `28394ed3d986b27c4ffe52917ed61559aa61efe6126a0ad68fecd8925df9f05f`. Exact locked Linux dependencies were reused; no Windows modules or credentials entered the source archive. Windows 136/136 and Ubuntu 133/133 tests passed. The isolated candidate completed a mock HTTP task; Chrome access to that candidate was unavailable because SSH forwarding is prohibited. No SSH policy was weakened. Actual production Chrome subsequently passed report/GFM/source/download/mobile/logout protection, without creating another paid task.

Production has all four explicit flags (`--allow-model-calls`, `--allow-memory-model-calls`, `--allow-cloud-traces`, `--allow-web-tools`) with matching Qwen/Qwen-memory/cloud/Tavily env modes. Tavily free quota was API-checked; disabled automatic payment was explicitly confirmed by the user because `/usage` did not establish it. The key alias in the local file was mapped during private transfer, without editing or displaying that file. Production retains its upload-only LangSmith key; the local PAT was used only for readback.

The first live task `8a35b99d-8745-4a55-8cfb-64479b822fdd` failed on an unobserved URL after one real search and one successful extraction. Keep this failed task and all 17 runs. The focused correction hides loaded Skills and permits one budgeted report-only decision after a denied URL when evidence exists. A separate real-model cached recovery `fdbde5e4-9ca3-472d-bb17-2b8a12f18a0e` completed with one model call, one save, zero new web or memory calls. Its 4 runs and the original 17 were read back; the preceding Mem0 20-run trace was also read back. This is not a fresh uninterrupted full-loop pass.

Authoritative `/var/lib/research-agent/agent.sqlite`: 104 fee records, cumulative reservation CNY0.6724/5, fixed memory-validation CNY0.3816/0.50, fixed web-validation CNY0.2442/0.30. One historical unknown use remains reserved. The remaining CNY0.0558 cannot reserve another search (CNY0.064); do not increase caps or create a fresh ledger without explicit user authorization. Production seed floor is now 6724 units; templates are placeholders and must be refreshed. Local ledger merge added accounting only, preserved 243 original rows/configuration, and passed integrity/foreign-key checks. Only production may issue real calls; old local readers must not be used for paid execution after tool fees exist.

Rollback evidence: `/var/backups/research-agent/20261023-tavily-379c02ef900b/`, with a fresh consistent DB/env/unit snapshot in `before-activation-2/`. The first activation guard rejected a quoted origin before changing production configuration; it restored the old service in offline mode and retained that attempt's snapshot. The guard was corrected to parse the existing quoted value. Never restore an earlier database after paid calls. Any source rollback to the Mem0 release must keep **all paid modes off**, because the old accounting reader omits `tool_calls`. Keep the new ledger and unknown reservations. Existing public proxy, blog and Caddy/Artalk were unchanged; the temporary candidate was stopped. Evidence: `.tmp/tavily-release-20261023/` in the release worktree.

The remaining sections describe historical deployments.

## 2026-10-22 Mem0 release

Backend `mem0-a8784daf9571` is active with Qwen decisions, Qwen memory and summary-only cloud tracing. Its 42 source hashes were verified before install; Windows tests passed 106/106, Ubuntu non-browser tests 104/104. Chrome verified the actual private route, candidate confirmation/recall, terminal report save, GFM/source/download, 390px layout and logout. All 20 run writes for task `e81dc395-911b-45f6-969d-77bf71300a82` returned HTTP202. The configured key is Tracing Only: project readback HTTP403 is an expected key-type restriction. Keep that upload-only key in production; use a separate local PAT for readback, without replaying the paid task. Tracing-key permissions cannot be edited. API ingest does not prove cloud UI/quota or vendor billing.

The authoritative ledger is `/var/lib/research-agent/agent.sqlite`: 93 calls, CNY0.4282 conservative cumulative reservation, including CNY0.1374 of the fixed CNY0.50 validation allowance; one historical unknown-use timeout remains reserved. Local accounting was reconciled back from production after acceptance; local configuration remains offline. Only production may issue subsequent real calls. Refresh the seed floor from the latest ledger before every transfer; the template CNY0.3230 is the pre-release minimum, not the present balance.

Use `ledger-transfer.mjs export/inspect/import --apply` to merge task-linked calls, standalone memory calls/operations and cloud dispatches by ID. The bundle excludes credentials, sessions and memory text, but includes private task bodies: keep it outside public/Git paths. Stop services and back up first. Never replace production SQLite; conflicts, active work, missing references and either budget overrun stop import. Existing task bodies are preserved; this transfers accounting, not complete event/trace history. Remember to merge cloud dispatches too.

The server env adds `AGENT_MEMORY_MODE=qwen`, `MEMORY_PRICING_CONFIRMED=true`, `MEMORY_LLM_MODEL=qwen3.8-flash`, `MEMORY_EMBEDDING_MODEL=text-embedding-v4`, `MEMORY_EMBEDDING_DIMENSIONS=1024`, `MEMORY_RECALL_THRESHOLD=0.55` and `AGENT_VALIDATION_BUDGET_YUAN=0.5`. The actual unit has all three explicit authorization flags. The checked-in env/unit templates remain offline by default.

Rollback backup: `/var/backups/research-agent/20261022-mem0-a8784daf9571/`. Reverting to pre-Mem0 source requires forcing `AGENT_MODE=mock`, `AGENT_MEMORY_MODE=offline` and `AGENT_TRACE_MODE=offline`: older code cannot count the new memory-call table. Do not resume paid calls on an old release or restore an old budget DB. The activation failure handler restores source/config in offline mode while retaining all new ledger data. Caddy and Artalk were not reconfigured by this upgrade.

The following records describe the earlier production release.

Target: existing Ubuntu server `82.156.68.115`, Caddy host `comments.leonzk.cn`.
The public website remains Astro/EdgeOne Pages. Only its private random path is
proxied to the Node service. Existing Artalk routes and data must be preserved.
Deployment completed on 2026-10-22. Backend release `a3d4031` runs under systemd;
the website proxy is published from GitHub main. Local defaults remain mock/offline;
production explicitly enables qwen/cloud with both startup approval flags.

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
   Check WAL/SHM ownership as well: a root SQLite inspection can create root-owned
   sidecars and prevent service writes. Use the service account for live reads;
   inspect an inactive seed with read-only immutable mode, then verify ownership.
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

Current production verification: task/root trace `e7c3a82c-479b-4086-bb04-35b11c6bad84`,
4 measured Qwen requests, 9 cloud run writes accepted, one valid report save and
no subsequent model/tool activity. Search/page tools remain synthetic. Cumulative
known model usage estimate CNY0.053245; conservative reservation CNY0.2908. One
earlier timed-out request has unknown usage; its full reservation remains charged
against the CNY5 cap. Final vendor bills and LangSmith quota/readback are unverified.

The server uses private Node v24.22.1 under `/opt/research-agent/node`, unprivileged
user `research-agent`, root-only `/etc/research-agent/agent.env`, and persistent
`/var/lib/research-agent/agent.sqlite`. Caddy reload was validated; Artalk remains
healthy. Backup configuration is under `/var/backups/research-agent/20261022-c9db487/`;
pre-live env/unit backups are under `/var/backups/research-agent/20261022-a246bc6/`.
Do not roll back the live database when reverting source/configuration.

Deployment fixes: resolve the CLI entrypoint's real path when `current` is a symlink;
normalize EdgeOne string/ArrayBuffer/view chunks before UTF-8 JSON forwarding;
allow up to 60 seconds per model request inside the 180-second task deadline;
offer only unread URL choices to the model. Windows and Ubuntu service tests: 63/63.
Private path security headers also need a matching `edgeone.json` rule because
site-wide configured headers can override the upstream response. Keep no-store
and the private CSP/referrer policy when editing global website headers.
