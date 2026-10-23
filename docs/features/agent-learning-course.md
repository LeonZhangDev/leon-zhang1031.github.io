# Agent learning course

## Overview

Publish one course overview and 24 chapters grouped by Agent knowledge area. Technical explanations, code and images remain as learning material; projects are teaching cases and are not claims of the site owner's personal achievements. Technical examples have not been rerun as part of this editorial work.

## Design decisions

- Read in overview → chapters 01–24 order. The article feed, course index and previous/next navigation share the curriculum order.
- At widths of at least 1200 px, the chapter directory stays on the left, the article stays in the middle and the current chapter's section directory stays on the right. Smaller screens show two independently expandable directories above the article. Both desktop directories are sticky and scroll independently.
- Preserve technical reference, GitHub and teaching-video links. Remove promotion, purchase/claim instructions and source document account navigation. Three Tencent video proxy links point directly to their original Bilibili videos. Images are local files.
- Preserve the existing website layout, comment behavior and unrelated unpublished work. Publication is prepared in a clean worktree based on the verified remote main branch.

## Implementation notes

- Course data lives in `src/data/learning-paths.ts`; shared navigation is in `src/data/agent-course-navigation.ts`. `AgentLearningSidebar.astro` and `ArticleSectionSidebar.astro` render the two directories.
- The 25 articles use normal published frontmatter. Original chapter filenames, section anchors, paragraphs, code and image references are retained from the reviewed local export.
- Only the course content, 531 referenced images, navigation components/helpers, narrowly scoped article/list changes and this documentation belong to this publication.
- Verification evidence is recorded in `docs/progress.md` after local checks complete. Validation of navigation, rendering and resource paths does not establish correctness of every technical example or availability of external reference sites.
- The 2026-10-23 editorial cleanup removes fan/submission attribution, source-author personal history, course update announcements, résumé packaging/coaching and purchase links. Mixed paragraphs retain their technical explanation as neutral learning cases; interview questions and technical reference answers remain. Five preformatted résumé templates were prose, not executable code: remove their personal metadata and retain only technical case/stack content. Technical code, images and source anchors are compared against pre-edit backups. Raw source exports and editorial evidence remain local.
- The Vercel project retained its historical Hugo preset, which built the Astro pages successfully but served the wrong output directory and returned 404. `vercel.json` explicitly selects Astro, the existing build command and `dist`; the existing cache header rules remain unchanged. This keeps the published configuration reproducible without changing the Worker or custom domains.
