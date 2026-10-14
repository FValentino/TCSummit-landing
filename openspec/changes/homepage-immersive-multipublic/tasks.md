# Tasks: Immersive Multi-Public Homepage (`/`)

Change: `homepage-immersive-multipublic`. Store: hybrid. Copy: English artifacts, Spanish UI.
Stack: Next.js 16 App Router · React 19 · TS 5.9 strict · Tailwind v4.
Testing: NON-TDD. Per-slice gate = `npx tsc --noEmit` + `npm run lint` + `npm run build` + manual checklist.

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~2,800–3,600 total |
| 400-line budget risk | High |
| Chained PRs recommended | Yes (mandatory) |
| Suggested split | 8 chained slices (see Work Units) |
| Delivery strategy | auto-chain (force-chained) |

```text
Decision needed before apply: No
Chained PRs recommended: Yes
Chain strategy: feature-branch-chain
400-line budget risk: High
```

### Chain Strategy Note

**Recommended: `feature-branch-chain`.** Slice PR #1 targets tracker branch
`feat/homepage-v2`; each later PR targets the **immediate previous PR branch**, so child
diffs stay focused. Only the tracker merges to `main`, so the whole immersive `/` stays
flag-gated (`homepage-v2`) and revertible as one unit. If the team prefers fast per-slice
iteration instead of coordinated release, `stacked-to-main` is acceptable — flag it before apply.

```text
PR1 base = feat/homepage-v2
PR2 base = PR1 branch   PR3 base = PR2 branch   …   PR8 base = PR7 branch
Only feat/homepage-v2 → main.
```

### Suggested Work Units

| # | Slice / PR | Goal | Effort |
|---|-----------|------|--------|
| S1 | PR#1 Config + audience foundation | flags, asset manifest + TODO, chapters, AudienceProvider | S |
| S2 | PR#2 Modal primitive + particles | `modalShell` + move `useScrollLock` + standModal refactor + `ParticlesLayer` + approved `ParticlesBackground` fix (A1) | M |
| S3 | PR#3 Chrome + a11y shell | scrollspy menu, full footer, skip-link, landmarks, tokens | M |
| S4 | PR#4 Hero + Summit + particles mount | chapters `#hero`,`#summit` | M |
| S5 | PR#5 Deep chapters + M1–M6 | ciencia/tecnología/innovación/educación(shell) + detail modals | L |
| S6 | PR#6 Depth + closing | experiencia/empresas/territorio + `#participar` + M10 | L |
| S7 | PR#7 Forms | 3 schemas/actions + M7–M9 + CTA wiring + `lib/html` | M |
| S8 | PR#8 Routes + legal + `/estudiantes` fold/redirect | `/speakers`,`/hackathon`,`/expo`(separate),`/tcst` + CONICET/TCST flags + fold `#educacion` | M |

> **Numbering note:** S5 was delivered in two chained PRs — S5a (PR#5, base PR#4) and S5b
> (PR#6, base PR#5) — so the slice labelled S6 below ships as PR#7, and so on. The chain/branch
> sequence is authoritative in `apply-progress.md`.

---

## Slice S1 — Config + Audience Foundation (PR#1)

- **id**: `S1-foundation-config`
- **title**: Feature flags, asset manifest, chapters, and audience context
- **type**: feat
- **scope**: config + client state boundary only; no UI rendering
- **files**: `src/config/flags.ts`, `src/config/assets.ts`, `src/components/common/chapters.ts`, `src/components/publics/AudienceContext.tsx`, `src/components/publics/useAudience.ts`, `src/components/publics/audienceData.ts`
- **description**: Create `Flags` (`homepageV2`, `conicetStage:1..5`, `tcstEnabled`) reading `NEXT_PUBLIC_HOMEPAGE_V2|CONICET_STAGE|TCST_ENABLED`; `AssetEntry` manifest (§60/§61 placeholder-first) as `Record<AssetKey, AssetEntry>` with a `TODO(assets)` list of pending keys — **non-blocking** (placeholders ship behind the flag); `chapters.ts` as single source of anchor order + scrollspy labels + audience→chapter priority; `AudienceProvider` with `mode`/`select(m)`, URL `?publico=` mirror + `localStorage tcs:publico`, invalid→neutral no-throw.
- **acceptance criteria**: `tsc` passes; `?publico=gobierno` restores mode; `?publico=foo` stays neutral without throw; no server state; provider exposes `useAudience()`; asset manifest exposes a `TODO(assets)` list and does NOT block build/launch.
- **depends_on**: none
- **effort**: S
- **commit-type**: feat(config)
- **pr-scope**: foundation, independently reviewable, no visible change
- **sub-tasks**: 1.1 flags.ts; 1.2 assets.ts + `TODO(assets)` list; 1.3 chapters.ts; 1.4 context+types; 1.5 useAudience hook; 1.6 URL/localStorage sync.
- **status**: ✅ done — PR#1 `feat/homepage-v2-foundation` (gate: tsc/lint/build pass; 2026-10-10)

## Slice S2 — Modal Primitive Extraction + ParticlesLayer + Particles fix (PR#2)

- **id**: `S2-modal-primitive`
- **title**: Extract shared modal primitive; wrap particles; approved API-preserving `ParticlesBackground` fix (A1 merged)
- **type**: refactor
- **scope**: refactor only — `/partners` behavior MUST be byte-for-byte preserved; particles edit is additive/API-preserving
- **files**: `src/components/common/modals/modalShell.tsx` (new), `src/components/common/modals/useScrollLock.ts` (move), `src/components/partners/floorplan/standModal.tsx` (modify), `src/components/partners/floorplan/useScrollLock.ts` (delete/re-export), `src/components/common/ParticlesLayer.tsx` (new), `src/components/utils/ParticlesBackground.tsx` (modify)
- **description**: Extract scrim, `role="dialog"`, `aria-modal`, focus trap, Esc, focus restore, scroll-lock into `modalShell.tsx` with `variant: center | slide-over`; move `useScrollLock.ts` to `common/modals/`; refactor `standModal.tsx` onto the shell with zero behavior change. Add `ParticlesLayer.tsx` (`"use client"`) wrapping ONE `ParticlesBackground` instance — mobile counts (~40/90), `useReducedMotion`→static gradient no canvas, fixed `inset-0 pointer-events-none z-0`. **A1 APPROVED — merged here:** apply the API-preserving edit to `ParticlesBackground.tsx`: `let rafId` + `cancelled` flag, `cancelAnimationFrame` in effect cleanup on unmount, early-return / no-RAF under `prefers-reduced-motion`, clamp dots/lines on mobile. No prop/shape/export change.
- **acceptance criteria**: `/partners` floor-plan modal focus/Esc/scrim/scroll-lock unchanged (manual parity check); exactly one `canvas` on `/`; unmount cancels RAF (no compounding callbacks); reduced-motion mounts static gradient with no RAF; `ParticlesBackground` public props/API unchanged; `immersive-quality` spec delta updated (edit now allowed, not forbidden).
- **depends_on**: S1
- **effort**: M
- **commit-type**: refactor(modals)
- **pr-scope**: no new `/` UI; pure reuse-first extraction + approved tiny particles fix
- **sub-tasks**: 2.1 create modalShell; 2.2 move useScrollLock; 2.3 refactor standModal; 2.4 ParticlesLayer; 2.5 approved `ParticlesBackground` edit (RAF cancel + reduced-motion + mobile clamp); 2.6 parity check.
- **status**: ✅ done — PR#2 `feat/homepage-v2-modal-particles` (gate: tsc/lint/build pass; 2026-10-10). Shipped naming per orchestrator: primitive at `src/components/common/modals/Modal.tsx` (design said `modalShell.tsx`), hook at `src/components/common/hooks/useScrollLock.ts` (design said `common/modals/`). `ParticlesBackground` public API unchanged.

## Slice S3 — Chrome + Accessibility Shell (PR#3)

- **id**: `S3-chrome-a11y`
- **title**: Scrollspy menu, full footer, skip-link, landmarks, tokens
- **type**: feat
- **scope**: common chrome; consumes `chapters.ts`
- **files**: `src/components/common/menu/useScrollSpy.ts` (new), `src/components/common/menu/menu.tsx` (modify), `src/components/common/footer/footer.tsx` (modify), `src/app/(public)/layout.tsx` (modify), `src/app/globals.css` (modify)
- **description**: One `IntersectionObserver` over `section[id]`, `rootMargin "-45% 0px -45% 0px"`, sets single active id; smooth scroll only on explicit click, disabled under reduced-motion; no-JS → native hash anchors. Full footer; landmarks `header/nav/main/footer`; first-tab-stop `Saltar al contenido` → `main`; CSS tokens only (no new palette).
- **acceptance criteria**: only one label active while scrolling; no-JS anchors work; first Tab focuses skip-link; reduced-motion kills smooth scroll.
- **depends_on**: S1
- **effort**: M
- **commit-type**: feat(menu)
- **pr-scope**: chrome layer, no chapter content
- **sub-tasks**: 3.1 useScrollSpy; 3.2 menu wiring; 3.3 footer; 3.4 layout landmarks+skip-link; 3.5 tokens in globals.css.
- **status**: ✅ done — PR#3 `feat/homepage-v2-chrome-a11y` (gate: tsc/lint/build pass; 2026-10-10). Added `src/components/common/navLinks.ts` as the flag-aware single link source (menu + footer). Scrollspy observes `section[id]`, rootMargin `-45% 0px -45% 0px`. Skip link → `#contenido` wrapper in `(public)/layout.tsx`; `main` landmark stays page-owned (pages already render `<main>`, so the layout wraps instead of nesting one). Menu consumes chapters via `navLinks` when `homepage-v2` is on, legacy anchors otherwise (current build: flag off → legacy anchors, all present).

## Slice S4 — Hero + Summit + Particles Mount (PR#4)

- **id**: `S4-hero-summit`
- **title**: `#hero` and `#summit` chapters with capped particle layer
- **type**: feat
- **scope**: first two chapters of `/`
- **files**: `src/app/(public)/page.tsx` (modify→shell), `src/components/hero/**`, `src/components/summit/**`, `page.legacy.tsx` (new, rollback)
- **description**: Replace `/` shell with server-rendered chapter composition mounting `ParticlesLayer` once behind content. Hero: poster image is LCP (priority), 14 MB video `preload="none"` mounted after idle/IntersectionObserver — never LCP; explicit dimensions (no CLS). Summit chapter + `{component}Data.ts` siblings; mobile-first.
- **acceptance criteria**: cold load renders `#hero`,`#summit` server-side; exactly one `canvas`, `pointer-events-none`; LCP element is poster, not video; no CLS; legacy kept in `page.legacy.tsx` behind `homepage-v2`.
- **depends_on**: S1, S2, S3
- **effort**: M
- **commit-type**: feat(homepage)
- **pr-scope**: visible but partial page; still behind flag
- **sub-tasks**: 4.1 page shell; 4.2 hero+LCP media; 4.3 lazy video; 4.4 summit; 4.5 legacy copy.
- **status**: ✅ done — PR#4 `feat/homepage-v2-hero-summit` (gate: tsc/lint/build pass, flag-on build SSR-verified; 2026-10-10). Shipped files: `hero/{heroV2,heroMedia,heroData}`, `summit/{summitV2,summitData,universesGrid,universeModal}`, `publics/{AudienceSelector,AudienceCta}`, `app/(public)/{page,page.legacy}.tsx`. Launch-prompt sub-tasks 4.1 heroV2 / 4.2 summitV2 / 4.3 page conditional / 4.4 ParticlesLayer mount fold into the same acceptance as tasks 4.1–4.5.

## Slice S5 — Deep Chapters + M1–M6 (PR#5)

- **id**: `S5-deep-chapters`
- **title**: Science/Tech/Innovation/Education chapters + short-depth modals M1–M6
- **type**: feat
- **scope**: chapters `#ciencia #tecnologia #innovacion #educacion` + detail modals
- **files**: `src/components/science/**`, `tech/**`, `innovation/**`, `education/**`, `src/components/common/modals/detailModal.tsx` (new)
- **description**: Four chapters with `section[id]` + semantic `h2/h3`; `detailModal.tsx` renders M1 universe, M2 science-hub, M3 future-lab, M4 experience element, M5 CONICET (flagged), M6 think-tank from data via `modalShell`. `CONOCÉ MÁS` triggers open modal (no navigation). `#educacion` ships as chapter shell here; `/estudiantes` content is folded in S8 (keeps the dead-link fix with the disposition).
- **acceptance criteria**: all four anchors reachable by hash; `CONOCÉ MÁS` opens modal without navigate; M5 hidden unless `conicetStage` allows; detail modals trap focus.
- **depends_on**: S2, S3, S4
- **effort**: L
- **commit-type**: feat(homepage)
- **pr-scope**: mid-page chapters + modals; watch 400-line budget per file (<300)
- **sub-tasks**: 5.1 ciencia; 5.2 tecnología; 5.3 innovación; 5.4 educación chapter shell; 5.5 detailModal M1–M6.
- **status**: ✅ done (S5a + S5b) — S5a `feat/homepage-v2-chapters-s5a` (PR#5, base PR#4): 5.1 ciencia ✅, 5.2 tecnología ✅, `detailModal.tsx` scaffold + M1–M3 integrated ✅. S5b `feat/homepage-v2-chapters-s5b` (PR#6, base PR#5): 5.3 innovación ✅ (§23–§25 + Think Tank modal), 5.4 educación chapter ✅ (§17–§21 + 4 student-detail modals, `/estudiantes` fold target prepared for S8). M4 deferred to S6 experience; M5 CONICET stays flag-gated in `science/conicetBlock.tsx` (no separate modal). Gates green (tsc/lint/build flag-on+off, 2026-10-10).

## Slice S6 — Depth + Closing (PR#6)

- **id**: `S6-depth-closing`
- **title**: Experience/Empresas/Territorio chapters + `#participar` + M10
- **type**: feat
- **scope**: chapters `#experiencia #empresas #territorio #participar`
- **files**: `src/components/experience/**`, `empresas/**`, `territorio/**`, `src/components/common/modals/**` (M10 venue)
- **description**: Final chapters with semantic structure; M10 venue modal; `#participar` closing segment + final CTA (neutral base until audience selected). Metric counters (§37) render only from non-empty `metricsData` — hidden/empty when unconfirmed, never invented.
- **acceptance criteria**: all anchors render in fixed order; final CTA neutral when no selection; metrics hidden without data; M10 focus-trapped.
- **depends_on**: S4, S5
- **effort**: L
- **commit-type**: feat(homepage)
- **pr-scope**: closes the chapter set; still behind flag
- **sub-tasks**: 6.1 experiencia; 6.2 empresas; 6.3 territorio; 6.4 M10; 6.5 #participar + final CTA; 6.6 metrics gate.
- **status**: ✅ done — PR#7 `feat/homepage-v2-chapters-s6` (base `feat/homepage-v2-chapters-s5b`; gate: tsc/lint/build flag-on pass + SSR checks; 2026-10-11). 6.1 experiencia ✅ (§30 event map + M4 `experienceMapElementModal`), 6.2 empresas ✅ (§22 + §39 + sponsors detail modal), 6.3 territorio ✅ (§34–§38), 6.4 M10 ✅ (venue `venueModal`), 6.5 `#participar` + final CTA ✅ (§40 Gala + §42 via `AudienceCta`; §41 countdown deferred), 6.6 metrics gate ✅ (`impactCounters` renders only from non-empty `IMPACT_COUNTERS` behind `flags.metricsConfirmed` — hidden with pending note now, never invented).

## Slice S7 — Forms (PR#8)

- **id**: `S7-forms`
- **title**: Three isolated lead forms M7/M8/M9 + CTA segmentation wiring
- **type**: feat
- **scope**: forms + audience→CTA behavior
- **files**: `src/schemas/{asistenteSchema,institucionalSchema}.ts`, `src/actions/{asistenteEmail,institucionalEmail}.ts`, `src/lib/html.ts`, `src/components/common/modals/leadModal.tsx`, `formData.ts`, `src/components/publics/**` (selector + CTA)
- **description**: `asistenteSchema`+`asistenteEmail`, `institucionalSchema`+`institucionalEmail`; Empresa reuses `partnersContactSchema`+`partnersContactEmail` (no merge, §50). Extract shared `escapeHtml` → `src/lib/html.ts`. `leadModal.tsx` wraps M7/M8/M9 on `modalShell`. Selector: ARIA radiogroup, roving tabindex, arrow keys, Spanish labels; CTAs follow selected public, neutral base otherwise.
- **acceptance criteria**: each form sends only its public's fields via Mailjet; tampered payload fails `safeParse`, no email; inline Spanish errors + focus to first invalid; selector arrow-key operable with announcement.
- **depends_on**: S1, S2
- **effort**: M
- **commit-type**: feat(forms)
- **pr-scope**: conversion path; independently testable
- **sub-tasks**: 7.1 schemas; 7.2 actions; 7.3 lib/html; 7.4 leadModal M7–M9; 7.5 selector a11y; 7.6 CTA segmentation.
- **status**: ✅ done — PR#8 `feat/homepage-v2-forms` (base `feat/homepage-v2-chapters-s6`; gate: tsc/lint/build flag-on pass + SSR smoke; 2026-10-11). 7.1 schemas ✅ (`asistenteSchema` §51, `empresaSchema` §52, `institucionalSchema` §53 + shared `schemas/formOptions.ts`), 7.2 actions ✅ (`actions/leadForms.ts`: `leadAsistente`/`leadEmpresa`/`leadInstitucional`, isolated per §50), 7.3 `lib/html.ts` ✅ (`escapeHtml`/`escapeHtmlMultiline`; legacy actions refactored to reuse), 7.4 lead modal M7–M9 ✅ (`components/forms/{leadForm,asistenteForm,empresaForm,institucionalForm}.tsx` on shared `Modal`), 7.5 selector a11y ✅ (already ARIA radiogroup from S4 — unchanged), 7.6 CTA segmentation ✅ (`publics/AudienceCta.tsx` opens the selected public's modal; neutral → `#participar`). Deviations: dedicated `empresaSchema` + single `leadForms.ts` per prompt (tasks artifact had proposed reusing `partnersContactSchema`); CTA opens M8 and the modal links on to `/partners`.

## Slice S8 — Routes + Legal Gates + `/estudiantes` Fold & Redirect (PR#9)

- **id**: `S8-routes-legal`
- **title**: Depth routes + CONICET/TCST gates + `/estudiantes` fold-into-`#educacion` + redirect
- **type**: feat
- **scope**: routes + feature-flagged legal copy (human review gate) + `/estudiantes` disposition
- **files**: `src/app/(public)/{speakers,hackathon,expo,tcst}/page.tsx`, `src/app/(public)/estudiantes/page.tsx` (→ redirect stub), `src/components/education/**` (absorb students content), `src/components/students/**` (retire/move), `src/components/common/{menu,footer}/**` + legacy header/hero (link cleanup), `src/config/flags.ts` (consume), chapter copy modules
- **description**: Create `/speakers`,`/hackathon`,`/expo`,`/tcst` with per-route metadata. `/expo` and `/partners` stay **separate** — `/expo` owns "exhibición/stands" (its floor plan is the single source of truth), `/partners` owns sponsorship tiers (reuse, no merge). Fold `/estudiantes` content (students `Hero`/`Introduction`/`Oportunities`/`Activities` + data siblings) into the `#educacion` chapter component, then replace `app/(public)/estudiantes/page.tsx` with App Router `permanentRedirect('/#educacion')` (existing `src/middleware.ts` partner rewrite untouched; no `next.config` hash redirect). Point menu/footer/homepage links at `/#educacion`; remove dead `/new-feature` links. `/tcst` ALWAYS shows `sujeto al diseño técnico, jurídico y regulatorio correspondiente`; no rentabilidad/inversión framing. CONICET stage 1–3 → `Sistema científico-tecnológico`, no logo/name; 4–5 → authorized.
- **acceptance criteria**: five routes resolve with own metadata; `/estudiantes` returns a permanent redirect (308) to `/#educacion`; `#educacion` renders the absorbed student content; `/expo` and `/partners` do NOT share stand inventory (exactly one source of truth); no `/new-feature` link remains anywhere; TCST disclaimer always visible; no CONICET logo/name below stage 4; legal copy passes human review gate.
- **depends_on**: S1, S5
- **effort**: M
- **commit-type**: feat(routes)
- **pr-scope**: routes + legal + disposition; SHIP LAST, review-gated
- **sub-tasks**: 8.1 speakers; 8.2 hackathon; 8.3 expo (stands source of truth); 8.4 tcst + disclaimer; 8.5 fold students content into `#educacion`; 8.6 `/estudiantes` `permanentRedirect` + menu/footer + `/new-feature` link cleanup; 8.7 CONICET/TCST flag branches.
- **status**: ✅ done — PR#9 `feat/homepage-v2-routes-legal` (base `feat/homepage-v2-forms`; gate: tsc/lint/build flag-on+flag-off pass + SSR smoke; 2026-10-11). 8.1 speakers ✅ (`app/(public)/speakers/page.tsx` + `routes/routesData.ts`), 8.2 hackathon ✅, 8.3 expo ✅ (route separate from `/partners`; CTA → `/#participar` — **deviation**: `/expo` does NOT host the stands floor plan, which stays at `/partners`; moving it is out of slice scope), 8.4 tcst ✅ (disclaimer `sujeto al diseño técnico, jurídico y regulatorio correspondiente` ALWAYS rendered; framing flag-gated, no rentabilidad/inversión language), 8.5 fold ✅ (`education/estudiantesFold.tsx` + `EDUCATION_FOLD` mounted in `education/educationV2.tsx`; students components retired), 8.6 redirect ✅ (`estudiantes/page.tsx` → `permanentRedirect('/#educacion')`, verified 308; `DEPTH_LINKS` in nav + footer "Profundizar" column; `/new-feature` dead link removed), 8.7 gates ✅ (CONICET `conicetBlock` unchanged — name/logo only ≥ stage 4; TCST teaser + footer link only when `flags.tcstEnabled`). Note: only the feature-branch-chain tracker `feat/homepage-v2` merges to `main`.

---

## Resolved Decisions (apply)

1. **Particles (`A1`) — APPROVED.** Merge into S2 as the API-preserving edit; invert the `immersive-quality` constraint (edit allowed) via spec delta.
2. **`/expo` vs `/partners` — keep separate.** `/expo` owns stands, `/partners` owns tiers; no merge. `/expo` route stays in S8.
3. **`/estudiantes` — fold + redirect.** Content moves into `#educacion`; App Router `permanentRedirect('/#educacion')`; update menu/footer/links. Handled in S8.
4. **Assets — placeholder-first, non-blocking.** Asset manifest + `TODO(assets)` list in S1; does not block launch.

## Still Open

- **Metrics data source (§37)** — blocks non-empty counters in S6; ship hidden/empty until confirmed.

## Out of Scope

Analytics (§49); `/partners`→separate change; `/new-feature` route (removed); real asset production; test runner introduction.
