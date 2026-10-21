# Personal site initial baseline

Date: `2026-08-26`
Status: `initial dual-baseline snapshot`

## Current-state supersession (2026-10-21)

The dated snapshot below is historical. Current schema ownership is
`src/content.config.ts` with the Content Layer glob loader; static output
deploys to EdgeOne at `https://leonzk.cn` and `https://www.leonzk.cn`.
Artalk owns current comments with independent SQLite. After explicit scoped
owner confirmation the old Neon Waline tables were cleared, the production
service paused and its source/modal removed. See
[build dependency security](../../features/build-dependency-security.md) and
[comments reliability](../../features/comments-reliability.md) for decisions
and boundaries. Article content ownership and route ownership remain unchanged.

## Purpose

Record the current content and runtime boundaries used to assess the deep-learning Blog series.

## Product / Requirement Baseline

- The site presents games, projects, technical posts, and personal information.
- Blog content is static Markdown and should remain readable on mobile.
- The approved course is a ten-part theory-and-project series.
- Existing comprehensive Python, NumPy, OpenCV, and RAG content must not be duplicated.

## Architecture / Runtime Boundary Baseline

- `src/content/posts/` is the canonical owner for Blog articles.
- `src/content/config.ts` is the canonical frontmatter schema.
- `src/pages/posts/` owns list and detail routes.
- Static output and the current canonical Worker URL must remain unchanged by content generation.

## Compatibility boundary

- Existing routes, comments, game builds, account UI, and user worktree changes must remain intact.
- Deployment retirement is not authorized without exact target confirmation.
