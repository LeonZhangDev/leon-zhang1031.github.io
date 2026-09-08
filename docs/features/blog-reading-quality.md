# Blog reading quality

## Overview

Improve article clarity, render mathematical notation, and make comment failures understandable. The September 8, 2026 editorial pass now covers all 163 posts with local changes. Depth varies: some articles needed an opening rewrite, others a targeted explanation, technical correction, or historical-context note. This is not a claim that every paragraph was rewritten or every experiment independently reproduced.

## Design decisions

- Use the humanize-writing editorial approach: replace generic hype with concrete questions, constraints, and decision criteria. Preserve real project context; do not manufacture personal experiments or unsupported performance claims.
- Render math in all Markdown posts, including older posts whose `math` frontmatter is false. That field did not previously enable any renderer.
- Keep long equations scrollable within the article on narrow screens.
- Keep the existing comment service address until a working replacement is verified. Do not treat an HTTP 200 with a Waline error payload as healthy.

## Implementation notes

- Astro now uses remark-math and rehype-katex, with KaTeX CSS loaded on article pages.
- The initial editorial batch concentrated on 51 openings and selected technical explanations. Subsequent batches addressed all previously untouched articles, including course handoffs, input/output contracts, evaluation boundaries, and historical project context.
- Waline maintenance messages become visible even after an earlier successful initialization. Retry behavior is covered without submitting a real comment.
- Remote blocker: the configured `lz1031-waline.vercel.app` comment API returned HTTP 404; existing Vercel credentials returned HTTP 403. Frontend changes do not restore the remote service. A valid project login or verified replacement service URL is required.
- Verification: 181 pages built successfully; Astro check reported 0 errors and 5 existing hints; the three reading/comment Playwright tests passed. Generated post HTML contains no `katex-error` marker. Changes are local, not published.

### Second editorial batch — September 8, 2026

Three additional articles received body-level editing: `ml-basics-scikit-learn`, `ml-decision-tree`, and `ml-kmeans-clustering`. Cumulative edited articles: 60 of 163, with different review depths.

| Pass | What changed | Examples |
| --- | --- | --- |
| Logic | Reconnected code blocks | Preserve iris Pipeline; fit the replacement tree before reading importance |
| Accuracy | Added conditions and boundaries | Silhouette requires fewer labels than samples; unrestricted depth does not guarantee overfitting |
| Voice | Replaced unsupported anecdotes | Describe the reader's input and decisions rather than claim personal experiments |
| Continuity | Added portfolio extensions | Paper classification, review triage, and topic grouping |

Technical API points were checked against Scikit-learn's official decision-tree, clustering, and silhouette documentation. No model experiments were executed and no experimental metrics were added. Build validation checks the website, not model quality.

### Follow-up scope

Restore the Waline deployment after credentials/project ownership are available, then verify listing and an authorized comment submission. Publication has not been performed. Historical project narratives are retained; their measurements have not been independently rerun.

### Full-collection pass — September 8, 2026

The remaining 103 posts now have edits. Verification of the source inventory reports 163 Markdown posts, 163 changed posts, and no untouched posts.

| Pass | What changed | Examples |
| --- | --- | --- |
| Voice | Replaced inflated openings | Agent framework choice now starts with recovery and state needs |
| Logic | Added task-specific boundaries | Padding versus real sequence length; masks versus photographs; query versus write authorization |
| Technical correction | Fixed broken examples | HGB uses permutation importance; SVD cluster interpretation reverses scaling; small datasets no longer require sampling 20,000 rows |
| Evidence | Removed unsupported personal result tables | Mobile latency, CLIP scores, DQN ablation and SSL scores replaced with evaluation methods |
| Context | Separated old and current systems | Hugo articles marked historical; same-name AtlasSplit tools distinguished |
| Continuity | Connected stages and artifacts | Data version, feature schema, model labels, recovery and rollback contracts |

Validation covers the website, not execution of embedded training code. The reading regression suite checks a generated page for every published post, the existence of internal article-link targets, and absence of KaTeX parse-error markup. Browser cases verify mobile formula rendering and simulated comment failure/retry. Unit tests: 181 passed across 16 files. Astro check: 0 errors, 5 pre-existing hints.

Known build warning: the older Hugo code-fence language `go-html-template` falls back to plain text highlighting. Content is preserved. Waline availability remains a remote deployment blocker, not an editorial failure.
