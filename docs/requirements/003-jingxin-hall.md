# Jingxin Hall

## Overview

Provide a private-interest, hidden cultural study space named `静心堂` at `/jing/`. It combines quiet practice, separately presented Buddhist and Taoist reverence content, traditional metaphysics research tools, three complete lot collections, and encrypted local notes. The 2026 visual rebuild keeps every local-first calculation and data contract while replacing the narrow content-site presentation with an immersive, scene-led desktop experience and a purpose-built mobile layout. The feature is educational and reflective; it must not promise supernatural outcomes or replace professional advice.

## User Stories

- As the site owner, I can enter Jingxin Hall through a subtle `静` seal in the public-site footer without adding it to normal navigation.
- As a mobile visitor, I can use the woodfish, reverence, charting, casting, and lot tools without horizontal layout breakage or unsolicited page-load playback.
- As a traditional-culture learner, I can see the rules and derivation behind a result instead of receiving an unexplained verdict.
- As a privacy-conscious user, I can calculate locally without sending birth details, questions, or notes to a server.
- As a private-note user, I can encrypt, export, import, lock, and clear my notes locally.
- As a returning visitor, I can enter a coherent night-courtyard hall, see lightweight local practice totals, and move between quiet practice, reverence, study, and private collection areas without encountering a dashboard-style UI.
- As a desktop visitor, I can use the core rooms comfortably at 1920×1080 and 1440×900 without every page becoming a long narrow article.
- As a mobile visitor, I get drawers, stacked panels, and intentional scene crops rather than a scaled-down desktop canvas.
- As a learner, I can click important terms or ask a constrained local study question and see a factual definition, the rule used, its limits, and source clues without sending my chart to a server.
- As a notebook user, I can explicitly save a versioned Bazi, Qimen, I Ching, or lot result as an encrypted study case and compare two saved cases after unlocking the notebook.
- As a returning visitor, I can use a non-predictive daily entry, resume my last room, or hide secondary controls for a focused ritual session.

## Functional Reqs

- Provide `/jing/` as a hidden hall with child routes for meditation, woodfish, Buddhist content, Taoist content, Yixue basics, Bazi, I Ching, Qimen Dunjia, lot drawing, and private notes.
- Use an immersive layout without the public navigation. Child pages provide `返回静心堂`; the hall provides a quiet `返回主页` action.
- Add one subtle `静` seal to the existing public footer as the only deliberate public entry.
- Keep all Jingxin routes out of the public navigation, site search, generated sitemap, and search-engine index.
- Keep Buddhist and Taoist content, imagery, audio, rituals, and lot collections separate.
- Include Shakyamuni Buddha, Guanyin Bodhisattva, and Ksitigarbha Bodhisattva in the Buddhist room.
- Include Yuanshi Tianzun, Lingbao Tianzun, Daode Tianzun, Lu Zu, and Guan Di in the Taoist room. Preserve and reuse existing local source imagery; do not regenerate sacred figures.
- Implement a meditation room with breathing, quiet sitting, countdown, optional ambience, and a reduced-motion path.
- Implement woodfish counting with count, average rhythm, elapsed duration, pause, reset, touch, click, keyboard input, optional auto-strike, local daily/cumulative merit records, and a short recent-strike chart. Merit is a private practice counter only; do not add rankings, streak rewards, loot, purchases, or supernatural claims.
- Build the woodfish room background in HTML/CSS rather than a full-scene image. Use transparent PNG object assets for a reddish 45-degree woodfish, mallet, incense burner, candle, and prayer beads; a strike advances through at least five visible code-controlled frames and preserves reduced-motion behavior. On desktop, keep statistics and controls as floating side overlays so they cannot displace the centered tabletop, woodfish, and strike button; on mobile, reorder the stage before collapsible data and controls.
- Implement guided reverence with selectable respectful gestures, slow 2D phases, neutral completion copy, local session records, and distinct Buddhist/Taoist movement names. Sacred images are never direct game buttons and remain visually static. Animate a separate foreground worshipper through transparent action frames, CSS presentation, and a typed state machine with explicit start, stop, completion, reduced-motion paths, and an accessible numbered progress state.
- Provide an interactive Five Elements relationship view plus Bagua reference material. Selecting an element highlights generation/restraint links and updates its correspondence panel. The relation, attribute, direction, season, color, and organ topic controls must each produce a visible selected state, status explanation, and matching correspondence highlight.
- Implement Bazi calculation for 1900-2100 using solar-term months and Lichun year turnover, with legal-time default, optional true solar time, optional late-Zi day turnover, and boundary warnings. Submission must expose computing, completion, and error status and move focus to the generated result instead of silently placing it below the fold.
- Implement I Ching casting through three coins, yarrow stalks, numbers, time, and manual line entry. Show primary, changed, mutual, opposite, and reversed hexagrams with derivations. Code-built coins must have an identifiable circular bronze form, square hole, and explicit `字面`/`背面`; empty number/time inputs must not be interpreted as zero.
- Implement separate Shijia Qimen calculations for chai-bu, zhi-run, and Maoshan rules, plus a comparison view. Submission must expose layer-progress/completion/error status and move focus to the generated comparison. Selecting any palace must visibly identify its same-number counterparts in the other schools and expose a narrow-screen-readable, same-palace structural comparison without adding fortune claims.
- Provide independent Guanyin, Lu Zu, and Guan Di collections of 100 lots each, including source/version metadata and completeness validation.
- Make divination cups optional within each lot room. Repeated redraws start immediately without a cooldown, while the in-memory session ledger keeps earlier results available for the current visit. Normal-motion drawing visibly progresses through shake, numbered-stick emergence, and paper unfurl; reduced motion reveals the same result immediately. Keep the optional question field visually above the action row and omit the former chant-highlight control.
- Build the lot-room background in HTML/CSS rather than a full-scene image. Guanyin, Lu Zu, and Guan Di each use a distinct sixteen-frame transparent PNG sequence derived from one stable visual direction per collection. Each sequence must keep its vessel, bundle, selected stick, and identifying ornament consistent across frames, reserve visible safety space above the highest stick, then carry the complete matching stick through initial stillness, shake left/right, emergence, airborne release, gravity-driven fall, one restrained table rebound, settled pause, and result reveal. Derive every collection's crop from the union of all sixteen alpha bounds, apply one shared scale and one fixed bottom-center vessel anchor, and reserve 18% top, 12% side, and 10% bottom padding on a 2:3 canvas. Do not resize individual frames. Pre-decode the selected collection and coordinate the phases through one cancellable timeline. Advance complete frames near the cue boundary without cross-fading two selected-stick poses. Keep the selected stick visible on the altar table after reveal. Keep reproducible 1024x1536 masters, 768x1152 web outputs, contact sheets, and a boundary audit manifest for all three collections.
- Keep the currently selected lot tube visible in the central shrine before the first interaction. Drawing animates that same visual, and completion returns it to a settled idle state instead of leaving the central stage empty.
- A single press of the draw button must start the ritual and automatically continue from the short first-visit cleansing prelude into shaking; it must not require a second click. The idle stick bundle appears inserted inside the tube, and the selected stick emerges from the center of the same opening.
- Use browser-local computation for all birth data, questions, casts, charts, and lots. Do not persist temporary inputs or results by default. An in-memory lot session ledger may retain at most eight draws until refresh.
- Allow an explicit result excerpt to be copied into encrypted private notes.
- Provide optional local password protection, automatic session locking, encrypted export, validated import, and local-data clearing.
- Preserve existing local note encryption envelopes and migration compatibility while presenting the room as `静心手札`.
- Provide a site-wide `问典` drawer backed by a versioned local knowledge set. Answers must separate term meaning, derivation rule, safety boundary, and source clues; reject health, safety, legal, and financial prediction requests. Do not call a remote model or upload page inputs in this version.
- Make important Five Elements, Bazi, I Ching, and Qimen terms open the same `问典` explanation surface. Five Elements links may deep-link to a selected element.
- Add explicit `存入手札案卷` actions to Bazi, Qimen, I Ching, and lot results. A save asks for the existing vault password (or creates a new vault), appends a versioned case marker and readable note inside the same encrypted plaintext, then immediately locks the temporary session.
- Index encrypted cases only after the vault is unlocked. Permit two-case structural comparison and copying a sanitized result summary that omits the input summary.
- Add `今日入堂` to the hall with a deterministic classical quotation, one factual study topic, a short breathing entry, a woodfish entry, and a link to the last local room. Do not add daily fortune, luck scores, streaks, or fear-based copy.
- Add a reversible focus mode that hides secondary chrome while retaining exit and master sound controls. Use short mobile haptics only for trusted woodfish, coin, lot, and cup gestures where the browser supports vibration.
- Provide a scoped `/jing/` web manifest and service worker. Pre-cache the core routes, cache same-origin Jingxin assets at runtime, and keep navigation usable offline without intercepting non-Jingxin routes.

## Non-Functional Reqs

- Treat all interpretations as traditional study and reflection, not guaranteed prediction.
- Do not make certain claims about death, disease, disaster, pregnancy, crime, legal outcomes, investment returns, or other high-stakes decisions.
- Show derivation, uncertainty language, and a real-world reminder near material conclusions.
- Do not use analytics, advertising, third-party tracking, cloud sync, automatic geolocation, external fonts, comments, accounts, likes, or sharing widgets.
- Do not add face/palm uploads, life-score graphs, paid master chat, rankings, matchmaking, or an open-ended fortune chatbot. Any future remote language-model provider requires a separate explicit decision covering provider, cost, consent, minimization, retention, and failure behavior.
- Sound controls default to enabled and remain user-toggleable; action audio is lazy-loaded by the triggering gesture and looping ambience still obeys browser autoplay policy. No sutra, mantra, holy-name, or baogao recitation audio is included.
- Map the stored 0–1 volume preference to perceptual gain at playback time. Foreground ritual sounds must use short attack/longer release ambience ducking, preserve headroom, and avoid abrupt loop-volume jumps. Source-recorded effects must have auditable attribution and checksums; project foley must not be labelled as field recording.
- Limit raster art to optimized local decorative scene backdrops where retained, licensed sacred source images, approved transparent worshipper action frames, and approved transparent woodfish/lot object frames. Build room structure, controls, diagrams, charts, coins, particles, timing, ritual state, and responsive states in HTML/CSS/SVG/TypeScript; above-the-fold imagery reserves layout space and must not introduce external requests.
- Use Web Crypto primitives for local note encryption; never persist the password or plaintext notes.
- Support current mobile and desktop browsers, keyboard operation, screen readers, sufficient contrast, and reduced-motion preferences.
- Use licensed or public-domain sacred imagery with visible source metadata.
- Keep modern explanations original; do not copy protected commentary from modern websites.
- Preserve the existing public-site navigation, comments, and canonical Worker deployment boundary outside the one footer seal.

## Data Model

- `JingSettings`: sound-enabled preference, volume, enabled ambience, motion preference, lock timeout, and dismissed introduction state.
- `EncryptedNotebook`: format version, KDF parameters, salt, IV, ciphertext, and authentication metadata; no password or plaintext fields.
- `LotCollection`: tradition, collection ID, title, source edition, content version, and exactly 100 `LotEntry` records.
- `LotEntry`: number, original text, historical allusion, traditional class, topic interpretations, cautions, source reference, and revision metadata.
- `CalculationResult`: in-memory-only input normalization, rule-set version, derivation steps, chart/cast output, interpretation, and warnings.
- `SacredFigure`: tradition, name, title, introduction, image attribution, license, and optional ambience group.
- `PracticeSummary`: browser-local date key, daily and cumulative woodfish counts, elapsed practice seconds, recent strike buckets, and optional reverence/meditation session summaries. No account identity or remote sync.
- `StudyKnowledgeEntry`: stable term ID, aliases, category, factual meaning, derivation rule, caution, source clues, and optional local deep link.
- `StudyCaseRecord`: case ID, kind, timestamp, rule version, input summary, result summary, derivation steps, source references, and optional whitelisted Bazi resume fields. The record exists only in memory until explicit save and is then embedded inside the existing encrypted notebook plaintext. Resume handoff must stay in memory between verified same-origin windows; plaintext fields must not enter browser storage or URL parameters.
- `BaziStudyInput`: solar/lunar/direct-pillar mode, birth date/time or four valid Jiazi pillars, optional case label, gender, leap-month and unknown-minute flags, place/longitude, late-Zi mode, and start-luck method.
- `LuckTimeline`: explicit direction, start offset/date, start-luck method, and eight Dayun periods with yearly and Jie-based monthly Ganzhi indexes. Direct-pillar inputs cannot produce a dated luck timeline.
- `GanZhiRelation`: relation kind, participating chart/period node IDs, and a structural explanation. Diagram and textual list must refer to the same records.

## UI/UX

- Use a refined Chinese 2D illustrated style built from dark timber, ink-black space, warm gold, parchment, bronze, candlelight, incense haze, cloud motifs, and restrained cinnabar. Avoid SaaS/dashboard visual language and cheap occult effects.
- Desktop rooms use a scene shell with left navigation or parameters, a central ritual/study stage, and right guidance/results where appropriate. The hall uses a persistent grouped left rail and scene-led entry cards.
- Mobile layouts use a compact top bar, horizontal/slide-out navigation, stacked or drawer panels, and intentional background crops. Controls remain at least 44px high.
- Use collapsible result sections on narrow screens ordered as input summary, chart, derivation, interpretation, and reminders.
- Allow wide charts to scroll inside their own container without widening the page.
- Bazi defaults to a basic chart; the professional layer exposes hidden stems, Na Yin, Xun Kong, period timelines, and a relationship diagram. Each selection must visibly update current context; keyboard users can activate the same native buttons.
- Provide solar, lunar, and valid direct-pillar input modes, explicit start-luck options, real-time place correction preview, and a visible uncertainty note for unknown minutes. Do not silently accept a nonexistent leap month.
- Bazi privacy-share text/images exclude birth date, place, and case names. Explicit case continuation preserves the original input calendar and clears again on refresh.
- Present sound as enabled by default, but start action playback only from the corresponding user gesture and allow a persistent mute choice. Respect reduced motion and provide static alternatives for reverence, lot shaking, and divination cups.
- Show user-facing errors for invalid dates, solar-term boundaries, storage denial, insufficient local storage, failed decryption, damaged imports, and unsupported versions.
- Provide a right-side back-to-top control on each room without obscuring mobile content.
- Keep `问典` and encrypted-save prompts as right-side drawer / centered modal surfaces, with Escape and scrim close behavior, keyboard focus, live status text, and no dashboard treatment.
- In focus mode, preserve the primary ritual target and the ability to exit or mute; hide secondary statistics, navigation, and reference panels instead of scaling the whole page.
- Target the supplied final-reference composition at 1920×1080 and 1440×900 while retaining readable content below the initial viewport when the professional tools require more space.

## API

No remote application API is required. Calculations, randomness, encryption, study retrieval, and storage are browser-local. Built-in source data is versioned with the static site. A remote generative assistant is intentionally out of scope until its provider and privacy contract are explicitly approved.

## Testing

- Unit-test calendar boundaries, Lichun turnover, solar-term month changes, true-solar-time correction, and late-Zi mode.
- Unit-test all five I Ching input methods and all derived hexagram relationships.
- Validate the three Qimen rule sets independently and test comparison output.
- Validate that each lot collection contains exactly the numbers 1-100 with no duplicates or cross-collection records.
- Test cryptographic round trips, wrong passwords, damaged files, incompatible versions, auto-lock, and storage-denied behavior.
- Test keyboard, touch, reduced motion, light/dark themes, and representative mobile widths.
- Add visual-structure assertions for the scene shell, grouped navigation, page-specific side panels, meditation route, interactive Five Elements states, and local practice summary.
- Build all Astro routes and verify Jingxin routes are absent from navigation, search data, and sitemap output and contain `noindex`.
- Verify no temporary personal inputs are written to local storage, logs, analytics, or network requests.
- Unit-test local knowledge alias matching, cited answer structure, high-stakes refusal, and Unicode study-case marker round trips.
- End-to-end test `问典`, focus mode, Five Elements deep links, and explicit encrypted case save/unlock/index flow.
- Freeze Bazi solar/lunar equivalence, invalid Jiazi/leap-month rejection, male/female luck direction, both start-luck methods, complete three-union detection, period/node/edge interaction, privacy exports, and encrypted lunar-case continuation without plaintext storage.
- Verify the manifest and scoped service worker do not intercept routes outside `/jing/`.

## Open Questions

- No blocking product questions remain for the visual rebuild. Exact historical editions and algorithm reference works remain governed by the shipped source ledger. Scene assets are decorative and must not be presented as historical documentation.
