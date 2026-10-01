# Blog tooling

- `audit-content.mjs`: rebuild the source inventory and individual editing cards; `--check` detects stale inventory and broken local resources. This is not a semantic review.
- `figure-specs.mjs`: original explanatory diagram labels, captions, and teaching additions, with exact article insertion anchors.
- `build-figures.mjs`: regenerate SVGs. `--insert` inserts the specified teaching additions once; existing marked sections are never overwritten.
- `verify-production.mjs`: read-only browser smoke test against the approved Worker domain; checks new route, image interaction and experiment artifacts. Uses installed Chrome by default; `PLAYWRIGHT_CHANNEL` can select another installed Playwright channel. Never submits comments.

Run from the repository with Node 24. Diagrams illustrate concepts and do not claim measured performance. Edits to existing marked prose are made directly in Markdown; the source specification should be kept consistent when the diagram changes.
