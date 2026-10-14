# Apply Progress — homepage-immersive-multipublic (S1–S8)

Change: `homepage-immersive-multipublic`. Store: hybrid. Chain: feature-branch-chain.
Tracker: `feat/homepage-v2`. Only the tracker merges to `main`.

Branch chain so far:
- PR#1 `feat/homepage-v2-foundation` (S1) — base `feat/homepage-v2`
- PR#2 `feat/homepage-v2-modal-particles` (S2) — base PR#1
- PR#3 `feat/homepage-v2-chrome-a11y` (S3) — base PR#2
- PR#4 `feat/homepage-v2-hero-summit` (S4) — base PR#3
- PR#5 `feat/homepage-v2-chapters-s5a` (S5a) — base PR#4
- PR#6 `feat/homepage-v2-chapters-s5b` (S5b) — base PR#5
- PR#7 `feat/homepage-v2-chapters-s6` (S6) — base `feat/homepage-v2-chapters-s5b`
- PR#8 `feat/homepage-v2-forms` (S7) — base `feat/homepage-v2-chapters-s6`
- PR#9 `feat/homepage-v2-routes-legal` (S8) — base `feat/homepage-v2-forms`

---

## Slice S1 — Config + Audience Foundation (PR#1) — DONE

- [x] 1.1 `src/config/flags.ts` — `Flags` (`homepageFeatureEnabled`, `homepageV2` alias, `conicetStage:1..5`, `conicetAuthorized`, `tcstEnabled`, `metricsConfirmed:false`, `audience`).
- [x] 1.2 `src/config/assets.ts` — placeholder-first `Record<AssetKey, AssetEntry>` + `TODO_ASSETS`.
- [x] 1.3 `src/components/common/chapters.ts` — 9 chapters + `#participar`; `ANCHOR_ORDER`.
- [x] 1.4 `src/components/publics/audienceData.ts` — `AudienceMode`, descriptor, `parseAudienceMode`.
- [x] 1.5 `src/components/publics/AudienceContext.tsx` — provider + `useAudience()`.
- [x] 1.6 URL/localStorage sync (`?publico=` wins, then `tcs:publico`, else neutral).

## Slice S2 — Modal Primitive + ParticlesLayer + Particles fix (PR#2) — DONE

- [x] 2.1 Shared modal primitive at `src/components/common/modals/Modal.tsx` (orchestrator name; design said `modalShell.tsx`).
- [x] 2.2 `useScrollLock` moved to `src/components/common/hooks/useScrollLock.ts`.
- [x] 2.3 `standModal.tsx` refactored onto `Modal`.
- [x] 2.4 `src/components/common/ParticlesLayer.tsx` — one capped canvas, mobile counts (40/90 mobile, 50/100 desktop), static gradient under reduced motion.
- [x] 2.5 `ParticlesBackground.tsx` approved API-preserving fix (RAF cancel + reduced-motion skip + mobile clamp).
- [x] 2.6 Parity check.

## Slice S3 — Chrome + Accessibility Shell (PR#3) — DONE

- [x] 3.1 `useScrollSpy.ts` — one IntersectionObserver over `section[id]`, `rootMargin "-45% 0px -45% 0px"`.
- [x] 3.2 menu wired (active state, `aria-current`, reduced-motion-safe smooth scroll).
- [x] 3.3 footer rebuilt with landmarks.
- [x] 3.4 `(public)/layout.tsx` first-tab-stop skip link → `#contenido`.
- [x] 3.5 tokens in `globals.css` + `.skip-link` + `section[id]{scroll-margin-top}`.

## Slice S4 — Hero + Summit + Particles Mount (PR#4) — DONE

- [x] 4.1 page shell — `src/app/(public)/page.tsx` server component: `flags.homepageV2` on → `#hero`+`#summit` inside `AudienceProvider` + one `ParticlesLayer`; off → `<HomeLegacy/>`.
- [x] 4.2 hero + LCP media — `hero/heroV2.tsx` (server, single `<h1>`), `hero/heroMedia.tsx` (poster slot reserves `aspect-video`; lazy video after IntersectionObserver, `preload="none"`, skipped under reduced motion).
- [x] 4.3 lazy video — mounted only after the media block scrolls near the viewport (idle fallback), never in first paint/LCP.
- [x] 4.4 summit — `summit/summitV2.tsx` (server narrative) + `summit/universesGrid.tsx` (client island) + `summit/universeModal.tsx` (M1 detail via shared `Modal`).
- [x] 4.5 legacy copy — `src/app/(public)/page.legacy.tsx` extracted verbatim for rollback.
- [x] 4.6 audience selector — `publics/AudienceSelector.tsx` (ARIA radiogroup, roving tabindex, arrow/Home/End, neutral default, Spanish labels).
- [x] 4.7 segmented CTA — `publics/AudienceCta.tsx` (neutral `[QUIERO SER PARTE]`; selected public's action; empresa → `/partners`).
- [x] 4.8 ParticlesLayer mounted exactly once behind the v2 chapters.

### Launch-prompt ↔ tasks.md sub-task reconciliation

Launch prompt renumbered S4 as 4.1 `heroV2.tsx`, 4.2 `summitV2.tsx`, 4.3 `page.tsx` conditional,
4.4 mount `ParticlesLayer`. These map onto tasks.md S4 acceptance (server-rendered `#hero`/`#summit`,
one canvas, LCP=poster, no CLS, legacy kept behind flag) and were delivered together.

---

## Gate Evidence (S4)

| Check | Command | Result |
|-------|---------|--------|
| Typecheck | `npx tsc --noEmit` | Pass (exit 0) |
| Lint | `npm run lint` | Baseline unchanged: 2 pre-existing errors + 4 warnings, none in new files |
| Build (flag off) | `npm run build` | Pass — 4 static routes (legacy home served) |
| Build (flag on) | `NEXT_PUBLIC_HOMEPAGE_V2=1 npm run build` | Pass — 6/6 pages generated |
| SSR flag-on HTML | inspect `.next/server/app/index.html` | `id="hero"` ×1, `id="summit"` ×1, `<canvas>` ×1, `<h1>` ×1, `role="radiogroup"` ×1, universes present |

## Files Changed (S4)

| File | Action | Notes |
|------|--------|-------|
| `src/app/(public)/page.tsx` | Rewritten | Server shell + flag conditional |
| `src/app/(public)/page.legacy.tsx` | Created | Legacy home for rollback |
| `src/components/hero/heroV2.tsx` | Created | Server chapter, single `<h1>` |
| `src/components/hero/heroMedia.tsx` | Created | Client; poster slot + lazy video |
| `src/components/hero/heroData.ts` | Created | Spanish copy |
| `src/components/publics/AudienceSelector.tsx` | Created | ARIA radiogroup selector |
| `src/components/publics/AudienceCta.tsx` | Created | Audience-aware primary CTA |
| `src/components/publics/audienceData.ts` | Modified | Added `NEUTRAL_CTA` |
| `src/components/summit/summitV2.tsx` | Created | Server chapter narrative |
| `src/components/summit/summitData.ts` | Created | Summit copy + six universes |
| `src/components/summit/universesGrid.tsx` | Created | Client interactive grid |
| `src/components/summit/universeModal.tsx` | Created | M1 detail modal |

All files < 300 lines.

## Deviations / Notes

- **M1 universe modal shipped in S4** (per launch-prompt "6 universos teaser/modal entry"). S5's
  `detailModal.tsx` (M1–M6) can supersede or reuse `universeModal.tsx`; it is additive and isolated.
- **Modal-backed CTAs** (M7–M9) resolve to `#participar` until S7 wires the lead modals; no dead trigger.
- **Placeholder assets**: `assets.heroPoster.src` is empty, so the poster slot renders a reserved
  gradient block (`aspect-video`, no CLS) instead of a broken `<Image>`; real asset swaps in later.
- **Server shell + client islands** honored: hero/summit text + headings are server-rendered; only the
  selector, CTA, media and universes grid hydrate.

## Workload / PR Boundary

- Mode: chained PR slice (feature-branch-chain), PR#4 of 8, base `feat/homepage-v2-chrome-a11y`.
- Boundary: first two chapters (`#hero`, `#summit`) + particle mount + flag shell. No science/tech/
  innovation/education/experience/empresas/territorio chapters (S5–S6), no forms (S7), no routes/legal (S8).
- 3 work-unit commits + 1 SDD bookkeeping commit. Well under the 400-line review budget.

## Status

S1 6/6, S2 6/6, S3 5/5, S4 8/8 sub-tasks complete. S4 gates green. Ready for verify of PR#4, or next
batch (S5) on base `feat/homepage-v2-hero-summit`.

---

## Slice S5a — Deep Chapters ciencia + tecnología + detail modal (PR#5) — DONE

Scope: split of S5. Chapters `#ciencia` (§13–§16) and `#tecnologia` (§26–§27) plus the data-driven
`detailModal` scaffold with M1–M3 integrated. `#innovacion`/`#educacion` shells and M5/M6 move to S5b.

- [x] 5a.1 ciencia — `science/scienceV2.tsx` (server §13 narrative + four pillars), `science/scienceData.ts`
      (copy + `DetailContent` for M2/M3), `science/cienciaTeaser.tsx` (client island; "Conocé más" triggers),
      `science/conicetBlock.tsx` (flag-gated §14 / §56), `science/scienceHubModal.tsx` (M2), `science/futureLabModal.tsx` (M3).
- [x] 5a.2 tecnología — `tech/techV2.tsx` (server §26–§27), `tech/techData.ts`, `tech/iaBlock.tsx` (§26),
      `tech/blockchainBlock.tsx` (§27).
- [x] 5a.3 modals M1–M4 — `common/modals/detailModal.tsx` is the single scaffold; M1 (`universeModal.tsx`)
      refactored onto it (external API unchanged), M2/M3 are thin consumers. M4 (experience element)
      deferred to S6; M5/M6 to S5b (the scaffold already covers them).
- [x] 5a.4 wire into the v2 shell — `app/(public)/page.tsx` mounts `#ciencia` + `#tecnologia` after `#summit`.

### Gate Evidence (S5a)

| Check | Command | Result |
|-------|---------|--------|
| Typecheck | `npx tsc --noEmit` | Pass (exit 0) |
| Lint | `npm run lint` | Baseline unchanged: 2 pre-existing errors + 4 warnings, none in new files |
| Build (flag off) | `npm run build` | Pass — legacy home served (`#acerca-de` present, `#ciencia` absent) |
| Build (flag on) | `NEXT_PUBLIC_HOMEPAGE_V2=1 npm run build` | Pass — 6/6 pages generated |
| SSR flag-on HTML | inspect `.next/server/app/index.html` | `section[id]` order hero→summit→ciencia→tecnologia; `<canvas>` ×1; `<h1>` ×1; no empty `<h2>`; `role="dialog"` ×3 each `aria-modal`/`inert` |

### Files Changed (S5a)

| File | Action | Notes |
|------|--------|-------|
| `src/components/common/modals/detailModal.tsx` | Created | Data-driven `DetailContent` modal; owns scaffold via `Modal` |
| `src/components/science/scienceV2.tsx` | Created | Server `#ciencia` chapter |
| `src/components/science/scienceData.ts` | Created | §13–§16 copy + M2/M3 `DetailContent` |
| `src/components/science/cienciaTeaser.tsx` | Created | Client island; M2/M3 triggers + motion |
| `src/components/science/conicetBlock.tsx` | Created | Flag-gated CONICET (§14/§56) |
| `src/components/science/scienceHubModal.tsx` | Created | M2 thin consumer |
| `src/components/science/futureLabModal.tsx` | Created | M3 thin consumer |
| `src/components/tech/techV2.tsx` | Created | Server `#tecnologia` chapter |
| `src/components/tech/techData.ts` | Created | §26–§27 copy |
| `src/components/tech/iaBlock.tsx` | Created | §26 IA block (server) |
| `src/components/tech/blockchainBlock.tsx` | Created | §27 Blockchain block (server) |
| `src/components/summit/universeModal.tsx` | Modified | M1 refactored onto `DetailModal`; API unchanged; gains CTA |
| `src/app/(public)/page.tsx` | Modified | Mount `#ciencia` + `#tecnologia` |

All files < 300 lines (largest: `detailModal.tsx` 138).

### Deviations / Notes (S5a)

- **detailModal vs separate modal files**: `scienceHubModal.tsx`/`futureLabModal.tsx` ship as thin
  consumers of one `DetailModal` (design §Modal Primitive, S5 5.3). No dialog scaffolding is duplicated;
  the scaffold lives only in `detailModal.tsx`.
- **M1 generalized, not re-implemented**: `universeModal.tsx` maps `Universe → DetailContent` and keeps
  its public props, so `universesGrid.tsx` needed no edits. The spec scenario requiring an M1 CTA is now
  satisfied (`Quiero ser parte` → `#participar` until S7).
- **M4 not in this slice**: M4 is the experience-map element (chapter `#experiencia`, S6); the shared
  scaffold already covers it when it lands. M5 (CONICET, flagged) / M6 (think-tank) are S5b.
- **conicetBlock is server + flag-gated**: below `conicetStage` 4 it renders the approved conceptual
  framing ("Ciencia argentina en TechnoCrypto Summit"), never the name/logo. No M5 trigger yet (S5b).
- **tech chapter stays server**: §26/§27 are static narrative, so no client island was added — matches
  the "server shell + client islands only for interactive chrome" design rule.
- **Closed-modal empty heading**: `DetailModal` skips the `<h2>` when `content.title` is empty, so the
  closed M1 no longer ships an empty heading.

### Workload / PR Boundary (S5a)

- Mode: chained PR slice (feature-branch-chain), PR#5, base `feat/homepage-v2-hero-summit`.
- Boundary: chapters `#ciencia` + `#tecnologia` + M1–M3 detail modals. No `#innovacion`/`#educacion`
  (S5b), no `#experiencia`+ (S6), no forms (S7), no routes/legal (S8).
- 4 work-unit commits: `feat(modals)`, `feat(science)`, `feat(tech)`, `feat(homepage)`.
- **Review budget**: ~570 added + ~44 deleted ≈ 610 changed lines → **over the 400-line budget**.
  Flagging per the workload gate; the slice was pre-assigned as one PR by the orchestrator. If a
  stricter budget is required, split S5a into (a) detailModal+M1, (b) ciencia, (c) tecnologia.

## Slice S5b — Deep Chapters innovación + educación + student modals (PR#6) — DONE

Scope: the S5 split. Chapter `#innovacion` (brief §23–§25 + Think Tank detail) and chapter
`#educacion` (brief §17–§21 + four student-detail disclosures), plus the `/estudiantes` fold target.
`#experiencia`+ and the `/estudiantes` redirect stay in S6/S8.

- [x] 5b.1 innovación — `innovation/innovationV2.tsx` (client chapter §23–§25),
      `innovation/innovationData.ts` (copy + flow + actors + `DetailContent`),
      `innovation/thinkTankModal.tsx` (Think Tank detail via shared `DetailModal`).
- [x] 5b.2 educación — `education/educationV2.tsx` (client chapter §17–§21 with four "Conocé más"
      triggers), `education/educationData.ts` (copy + four `DetailContent` payloads),
      `education/{estudiantes,universitarios,universidades,vocaciones}Modal.tsx` (thin consumers).
- [x] 5b.3 `/estudiantes` fold (prepare) — `educationData.ts` is documented as the fold target and
      already carries the §17–§21 narrative; the students components migrate here in S8 together
      with `permanentRedirect('/#educacion')`. No route edit in this slice.
- [x] 5b.4 wire into the v2 shell — `app/(public)/page.tsx` mounts `#innovacion` + `#educacion`
      after `#tecnologia`.

### Gate Evidence (S5b)

| Check | Command | Result |
|-------|---------|--------|
| Typecheck | `npx tsc --noEmit` | Pass (exit 0) |
| Lint | `npm run lint` | Baseline unchanged: 2 pre-existing errors + 4 warnings, none in new files |
| Build (flag off) | `npm run build` | Pass — legacy home served (`#acerca-de` present, `#educacion` absent) |
| Build (flag on) | `NEXT_PUBLIC_HOMEPAGE_V2=1 npm run build` | Pass — 6/6 pages generated |
| SSR flag-on HTML | inspect `.next/server/app/index.html` | `section[id]` order hero→summit→ciencia→tecnologia→innovacion→educacion; `<h1>` ×1; `<canvas>` ×1; no empty `<h2>`; `role="dialog"` ×8 (M1/M2/M3/Think-Tank + 4 education) |

### Files Changed (S5b)

| File | Action | Notes |
|------|--------|-------|
| `src/components/innovation/innovationData.ts` | Created | §23–§25 copy + Think Tank `DetailContent` |
| `src/components/innovation/innovationV2.tsx` | Created | Client `#innovacion` chapter |
| `src/components/innovation/thinkTankModal.tsx` | Created | Think Tank detail (thin `DetailModal` consumer) |
| `src/components/education/educationData.ts` | Created | §17–§21 copy + 4 `DetailContent`; `/estudiantes` fold target |
| `src/components/education/educationV2.tsx` | Created | Client `#educacion` chapter |
| `src/components/education/estudiantesModal.tsx` | Created | §18 thin consumer |
| `src/components/education/universitariosModal.tsx` | Created | §19 thin consumer |
| `src/components/education/universidadesModal.tsx` | Created | §20 thin consumer |
| `src/components/education/vocacionesModal.tsx` | Created | §21 thin consumer |
| `src/app/(public)/page.tsx` | Modified | Mount `#innovacion` + `#educacion` |

All files < 300 lines (largest: `innovationV2.tsx` 200, `educationData.ts` 191).

### Deviations / Notes (S5b)

- **V2 chapters are client islands.** The orchestrator's file set for each domain is
  `{Data, V2, modal(s)}` with no separate teaser file, so `innovationV2`/`educationV2` hold the
  modal state and hydrate as one unit (science kept `scienceV2` server + `cienciaTeaser` client
  because it *did* have an island file). Headings/copy still SSR; only the interactive chrome
  hydrates. If a stricter server-shell split is wanted, extract a `*Teaser.tsx` island later.
- **M-label reconciliation.** The canonical `publics-depth` inventory numbers the Think Tank as
  **M6**; this run's prompt called it "M5 (Think Tank)". The modal is implemented once
  (`thinkTankModal.tsx`) and is fine either way; `M5 CONICET` remains the flag-gated
  `science/conicetBlock.tsx` (below stage 4 it never shows the name/logo). The four education
  disclosures are section-level "Conocé más" modals outside the M1–M10 list.
- **`/estudiantes` not touched.** Per the prompt, S8 owns the fold + `permanentRedirect`. This
  slice only prepares the target chapter/modules and does not edit the route, menu, or footer.
- **Placeholder CTAs → `#participar`.** Every modal CTA resolves to `#participar` (mounted in S6),
  matching the existing M1/M2/M3 behaviour; no `/new-feature` link is introduced.

### Workload / PR Boundary (S5b)

- Mode: chained PR slice (feature-branch-chain), PR#6, base `feat/homepage-v2-chapters-s5a`.
- Boundary: chapters `#innovacion` + `#educacion` + student-detail modals + fold preparation. No
  `#experiencia`+ (S6), no forms (S7), no routes/legal/redirect (S8).
- 3 work-unit commits (`feat(innovation)`, `feat(education)`, `feat(homepage)`) + 1 SDD
  bookkeeping commit. ~590 added lines → over the pre-assigned 400-line budget (single PR as
  directed by the orchestrator).

## Status (updated)

S1 6/6, S2 6/6, S3 5/5, S4 8/8, S5a 4/4, S5b 4/4 sub-tasks complete. S5b gates green. Ready for
verify of PR#6, or next batch (S6) on base `feat/homepage-v2-chapters-s5b`.

---

## Slice S6 — Depth + Closing (PR#7) — DONE

Scope: chapters `#experiencia` (§30 event map + M4), `#empresas` (§22 + §39 + sponsors detail),
`#territorio` (§34–§38), `#participar` (§40 Gala + §42 final CTA + M10 venue), metrics gate (§37).
Delivered on base `feat/homepage-v2-chapters-s5b`; full detail in the Engram `apply-progress` revision.

- [x] 6.1 experiencia — `experience/{experienceV2,experienceData,experienceMapElementModal}.tsx`.
- [x] 6.2 empresas — `empresas/{empresasV2,empresasData,sponsorsDetailModal}.tsx` (§22 verbs + §39 benefits + CTA → `/partners`).
- [x] 6.3 territorio — `territorio/{territorioV2,territorioData,impactCounters}.tsx`.
- [x] 6.4 M10 — `participar/venueModal.tsx` (Gala venue via `DetailModal`).
- [x] 6.5 `#participar` + final CTA — `participar/participarV2.tsx` (§40/§42 via `AudienceCta`; §41 countdown deferred).
- [x] 6.6 metrics gate — `impactCounters` renders only from non-empty data behind `flags.metricsConfirmed`.

SSR flag-on: hero→summit→ciencia→tecnologia→innovacion→educacion→experiencia→empresas→territorio→participar;
`<h1>` ×1; `<canvas>` ×1; `role="dialog"` ×11.

## Slice S7 — Forms (PR#8) — DONE

Scope: three isolated lead forms M7/M8/M9 + CTA segmentation wiring. Branch
`feat/homepage-v2-forms`, base `feat/homepage-v2-chapters-s6`.

- [x] 7.1 M7 Asistente — `schemas/asistenteSchema.ts` (§51) + `forms/asistenteForm.tsx` (modal via shared `forms/leadForm.tsx`).
- [x] 7.2 M8 Empresa — `schemas/empresaSchema.ts` (§52) + `forms/empresaForm.tsx` (+ `/partners` link).
- [x] 7.3 M9 Institucional — `schemas/institucionalSchema.ts` (§53) + `forms/institucionalForm.tsx` (institución/gobierno variants).
- [x] 7.4 CTA segmentation — `publics/AudienceCta.tsx` opens the selected public's modal (M7/M8/M9); neutral → `#participar`.
- [x] 7.5 server actions — `actions/leadForms.ts` (`leadAsistente`/`leadEmpresa`/`leadInstitucional`, each `safeParse` → `sendEmail`).
- [x] 7.6 shared `escapeHtml` — `lib/html.ts`; legacy `contactEmail`/`partnersContactEmail` refactored to reuse it.

### Gate Evidence (S7)

| Check | Command | Result |
|-------|---------|--------|
| Typecheck | `npx tsc --noEmit` | Pass (exit 0) |
| Lint | `npm run lint` | Baseline unchanged: 2 pre-existing errors + 4 warnings, none in new files |
| Build (flag on) | `NEXT_PUBLIC_HOMEPAGE_V2=1 npm run build` | Pass — 4 routes; `/` prerendered static |
| SSR smoke | `next start` + `curl /` | 200; `id="participar"` ×1; neutral `Quiero ser parte`; `role="radiogroup"` ×1; `<h1>` ×1 |

### Files Changed (S7)

| File | Action | Notes |
|------|--------|-------|
| `src/lib/html.ts` | Created | `escapeHtml` + `escapeHtmlMultiline` (shared) |
| `src/schemas/formOptions.ts` | Created | §51–§53 select options (schema + UI source) |
| `src/schemas/asistenteSchema.ts` | Created | §51; `z.enum` attendeeType |
| `src/schemas/empresaSchema.ts` | Created | §52; `z.enum` interest |
| `src/schemas/institucionalSchema.ts` | Created | §53; `z.enum` type + interest |
| `src/actions/leadForms.ts` | Created | 3 isolated server actions |
| `src/components/forms/leadForm.tsx` | Created | Shared modal + field/select/submit/success primitives |
| `src/components/forms/asistenteForm.tsx` | Created | M7 modal |
| `src/components/forms/empresaForm.tsx` | Created | M8 modal + `/partners` link |
| `src/components/forms/institucionalForm.tsx` | Created | M9 modal (institución/gobierno) |
| `src/components/publics/AudienceCta.tsx` | Modified | Opens the correct modal per public |
| `src/actions/contactEmail.ts` | Modified | Reuse `lib/html` helpers |
| `src/actions/partnersContactEmail.ts` | Modified | Reuse `lib/html` helpers |

All files < 300 lines (largest: `leadForm.tsx` 188).

### Deviations / Notes (S7)

- **Prompt layout over the tasks artifact.** The tasks artifact proposed `asistenteEmail`/`institucionalEmail`
  and Empresa reusing `partnersContactSchema`/`partnersContactEmail`; this run's prompt instead specified one
  `actions/leadForms.ts` with `leadAsistente`/`leadEmpresa`/`leadInstitucional` and a dedicated `empresaSchema`.
  Followed the prompt (§52 empresa fields — empresa/contacto/cargo/email/teléfono/sector/interés — are broader
  than the partners schema).
- **CTA opens the modal (prompt 7.4).** The spec table lists `/partners` + M8 for Empresa; the CTA now opens M8
  and the modal carries a "Ver planes y beneficios" link to `/partners`, so the direct route survives.
  Asistente's confirmed ticket URL is still `TODO(launch)`, so M7 is the conversion path.
- **`formOptions.ts` lives under `src/schemas/`** (not `components/forms/formData.ts`) so schemas and forms share
  the enum source without a component→schema dependency.
- **Non-TDD:** no test runner in the project; gate is tsc/lint/build + SSR smoke.

### Workload / PR Boundary (S7)

- Mode: chained PR slice (feature-branch-chain), PR#8, base `feat/homepage-v2-chapters-s6`.
- Boundary: forms M7–M9 + actions + CTA wiring. No routes/legal/`/estudiantes` (S8).
- ~640 added + ~30 deleted ≈ 670 changed lines → over the 400-line budget (pre-assigned single PR by the orchestrator).

## Status (final)

S1 6/6, S2 6/6, S3 5/5, S4 8/8, S5a 4/4, S5b 4/4, S6 6/6, S7 6/6 sub-tasks complete. S7 gates green.
Ready for verify of PR#8, or final slice S8 on base `feat/homepage-v2-forms`.

---

## Slice S8 — Routes + Legal Gates + `/estudiantes` Fold & Redirect (PR#9) — DONE

Scope: depth routes `/speakers` `/tcst` `/hackathon` `/expo`, the `/estudiantes` fold into `#educacion`
with a permanent redirect, legal-gate copy for TCST/CONICET, and nav/footer depth links. Branch
`feat/homepage-v2-routes-legal`, base `feat/homepage-v2-forms`.

- [x] 8.1 `/speakers` — `app/(public)/speakers/page.tsx` + `routes/routesData.ts` (`SPEAKERS_CONTENT`) rendered via shared `routes/depthPage.tsx`.
- [x] 8.2 `/hackathon` — `app/(public)/hackathon/page.tsx` + `HACKATHON_CONTENT`.
- [x] 8.3 `/expo` — `app/(public)/expo/page.tsx` + `EXPO_CONTENT`; CTA → `/#participar` (does NOT host the stands floor plan — that stays at `/partners`).
- [x] 8.4 `/tcst` — `app/(public)/tcst/page.tsx`; disclaimer always rendered, framing gated by `flags.tcstEnabled` (`TCST_CONTENT` vs `TCST_NEUTRAL`).
- [x] 8.5 fold — `education/estudiantesFold.tsx` (presentational) + `EDUCATION_FOLD`/`ESTUDIANTES_EMAIL`/`FOLD_CTA` in `education/educationData.ts`; mounted in `education/educationV2.tsx`.
- [x] 8.6 `/estudiantes` → `permanentRedirect("/#educacion")`; depth links in `common/navLinks.ts` (`DEPTH_LINKS`) + footer "Profundizar" column; `/new-feature` dead link removed (`header/hero/hero.tsx` CTA → `#contacto`).
- [x] 8.7 legal gates — CONICET `conicetBlock` unchanged (stage-gated, name/logo only ≥4); TCST teaser (`tech/blockchainBlock.tsx` → `/tcst`) and footer TCST link surface only when `flags.tcstEnabled`.

Retired: `src/components/students/**` (hero, introduction, oportunities+data, activities+data, card).

### Gate Evidence (S8)

| Check | Command | Result |
|-------|---------|--------|
| Typecheck | `npx tsc --noEmit` | Pass (exit 0) |
| Lint | `npm run lint` | Baseline unchanged: 2 pre-existing errors + 4 warnings, none in new files |
| Build (flag on) | `NEXT_PUBLIC_HOMEPAGE_V2=true NEXT_PUBLIC_TCST_ENABLED=true NEXT_PUBLIC_CONICET_STAGE=3 npm run build` | Pass — 8 static routes (`/`, `/estudiantes`, `/expo`, `/hackathon`, `/partners`, `/speakers`, `/tcst`, `/_not-found`) |
| Build (flag off) | `npm run build` | Pass — same 8 routes, legacy home served |
| SSR flag-on | `next start` + `curl` | `/estudiantes` → `308` `Location: /#educacion`; `/speakers|/hackathon|/expo|/tcst|/partners` → `200`; `/tcst` shows exact disclaimer; no forbidden framing; footer depth links present; homepage TCST teaser `Conocé TCST`; `<h1>` ×1 (home + depth); CONICET name absent at stage 3, neutral placeholder present |
| SSR flag-off | `next start` + `curl` | `/tcst` neutral + disclaimer; no homepage TCST teaser; footer has depth links without `/tcst`; `/estudiantes` → `308` |

### Files Changed (S8)

| File | Action | Notes |
|------|--------|-------|
| `src/components/routes/routesData.ts` | Created | `DepthSection`/`DepthContent` + SPEAKERS/HACKATHON/EXPO/TCST content + BS2 disclaimer |
| `src/components/routes/depthPage.tsx` | Created | Shared server shell (one `<main>`, one `<h1>`, back + CTA links) |
| `src/app/(public)/speakers/page.tsx` | Created | Depth route + `metadata` |
| `src/app/(public)/hackathon/page.tsx` | Created | Depth route + `metadata` |
| `src/app/(public)/expo/page.tsx` | Created | Depth route + `metadata` |
| `src/app/(public)/tcst/page.tsx` | Created | Legal route; disclaimer always on, framing flag-gated |
| `src/app/(public)/estudiantes/page.tsx` | Rewritten | `permanentRedirect("/#educacion")` |
| `src/components/education/estudiantesFold.tsx` | Created | Folded student content (presentational) |
| `src/components/education/educationData.ts` | Modified | `EDUCATION_FOLD`, `ESTUDIANTES_EMAIL`, `FOLD_CTA` |
| `src/components/education/educationV2.tsx` | Modified | Mount `<EstudiantesFold />` |
| `src/components/common/navLinks.ts` | Modified | `RouteLink` + `DEPTH_LINKS` (TCST flag-gated) |
| `src/components/common/footer/footer.tsx` | Modified | `lg:grid-cols-4` + "Profundizar" column |
| `src/components/tech/techData.ts` | Modified | `TCST_TEASER` |
| `src/components/tech/blockchainBlock.tsx` | Modified | TCST teaser link → `/tcst` when flag on |
| `src/components/experience/experienceData.ts` | Modified | Expo → `/expo`, Hackathon → `/hackathon` CTAs |
| `src/components/header/hero/hero.tsx` | Modified | Removed `/new-feature` dead link → `#contacto` |
| `src/components/students/**` | Deleted | Retired in favour of `#educacion` fold |

All files < 300 lines (largest new: `routesData.ts` 131).

### Deviations / Notes (S8)

- **`/expo` does not host the stands floor plan.** The interactive stand inventory/map stays at
  `/partners`; moving it is out of slice scope. `/expo` therefore links home to `/#participar` instead
  of duplicating or coupling to the partners stand data.
- **TCST disclaimer is unconditional.** `/tcst` always renders "está sujeto al diseño técnico, jurídico
  y regulatorio correspondiente."; only the product framing (workshop/tech narrative vs neutral
  "en desarrollo") is gated by `flags.tcstEnabled`. No forbidden framing ("rentabilidad", "inversión
  garantizada", speculative language) in either state — verified by SSR grep.
- **CONICET gate untouched.** `conicetBlock` remains stage-gated; at stage 3 the name/logo never
  render, only the neutral "Sistema científico-tecnológico" placeholder.
- **`src/components/activities/card/card.tsx` is now unused** but left in place (out of slice scope).
- **Non-TDD:** no test runner; gate is tsc/lint/build + SSR smoke (both flag states).

### Workload / PR Boundary (S8)

- Mode: chained PR slice (feature-branch-chain), PR#9, base `feat/homepage-v2-forms`. Only the tracker
  `feat/homepage-v2` merges to `main`.
- Boundary: depth routes + `/tcst` legal gate + `/estudiantes` fold/redirect + nav/footer depth links +
  dead-link cleanup. No changes to chapters, forms, or the tracker.
- ~440 added + ~790 deleted (mostly retired `students/**`) ≈ 1230 changed lines → **over the 400-line
  budget**, but the bulk is dead-code retirement; net surface is small. Pre-assigned single PR by the
  orchestrator.

## Status (final)

S1 6/6, S2 6/6, S3 5/5, S4 8/8, S5a 4/4, S5b 4/4, S6 6/6, S7 6/6, S8 7/7 sub-tasks complete. All gates
green (tsc/lint/build flag-on+flag-off + SSR smoke). Change `homepage-immersive-multipublic` fully
implemented across PR#1–PR#9. Ready for `sdd-verify` on S8 (and the tracker), then `sdd-archive`.
