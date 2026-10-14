# Verification Report — homepage-immersive-multipublic (S8 focus)

**Change**: homepage-immersive-multipublic
**Version**: delta specs legal-gates, publics-depth, homepage-narrative (current)
**Mode**: Standard (non-TDD — no test runner configured; gate = tsc/lint/build + SSR smoke)
**Branch under verification**: `feat/homepage-v2-routes-legal` (PR#9; full chain S1–S8 present)

## Scope of This Verification

S8 deliverables, per orchestrator gates: routes, legal gates, redirect, fold, plus
regression on nav/footer depth links and no-new-lint-errors.

## Completeness

| Metric | Value |
|--------|-------|
| Tasks total (S8 sub-tasks 8.1–8.7) | 7 |
| Tasks complete | 7 |
| Tasks incomplete | 0 |

All change tasks S1–S8 checked `[x]` in tasks.md; apply-progress marks PR#9 DONE.
No unchecked implementation task remains.

## Build & Runtime Execution

**Typecheck**: ✅ Pass — `npx tsc --noEmit` exit 0.
**Lint**: ✅ Baseline compliant — `npm run lint`: 2 errors + 3 warnings, all pre-existing
(`introductionDescription.tsx` 2× no-explicit-any — documented baseline; `participateData.ts`
unused `Tag`). No new lint findings in S8 files (baseline recorded 4 warnings; now 3).
**Build (flag on)** `NEXT_PUBLIC_HOMEPAGE_V2=true NEXT_PUBLIC_TCST_ENABLED=true NEXT_PUBLIC_CONICET_STAGE=3`:
✅ exit 0 — 8 static routes: `/`, `/estudiantes`, `/expo`, `/hackathon`, `/partners`,
`/speakers`, `/tcst`, `/_not-found` + Proxy (middleware).
**Build (flag off)**: ✅ exit 0 — same route set, legacy home served.
**Build (flag on, CONICET stage 5)**: ✅ exit 0.
**SSR smoke** (`next start` + `curl`):
- `/speakers` `/tcst` `/hackathon` `/expo` `/partners` → 200, each with own `<title>` and exactly 1 `<h1>`.
- `/estudiantes` → `308` `Location: http://localhost:3199/#educacion` (both flag states).
- Flag-on `/`: 10 `section[id]` in exact order hero→summit→ciencia→tecnologia→innovacion→educacion→experiencia→empresas→territorio→participar; `<canvas>` ×1; `<h1>` ×1; headings organized `<h2>`/`<h3>`/`<h4>`; legacy sections 0.
- `/tcst`: disclaimer `sujeto al diseño técnico, jurídico y regulatorio correspondiente` present in both flag states; forbidden framing (rentabilidad/inversión/especulación/retorno) 0 matches; h1 varies by flag (TCST_CONTENT vs TCST_NEUTRAL).
- Flag-on home: TCST teaser `Conocé TCST` ×1; footer Profundizar links `/speakers` `/hackathon` `/expo` ×1 each + `/tcst` ×2 (footer + teaser); CONICET neutral `Sistema científico-tecnológico` ×1, CONICET name 0 at stage 3; at stage 5 CONICET name ×1, neutral 0, "Institucional" kicker ×1.
- Flag-off home: legacy composition (`#acerca-de` ×1, legacy `#hero` ×1), no v2 chapters, no TCST teaser, no footer `/tcst` link.
- `#educacion` SSR contains the folded students content (`EstudiantesFold` + `mailto:estudiantes@tcsummit.net` ×1) inside section `#educacion`.
- `/new-feature`: 0 occurrences in `src/` (grep) and 0 in SSR HTML.

**Tests**: ➖ None configured (project config `testing.test_runner: none`, `strict_tdd: false`).
Runtime verification executed via build + SSR smoke (curl), which is the project's agreed gate.

**Coverage**: ➖ Not available (no runner).

## Spec Compliance Matrix

### legal-gates

| Requirement | Scenario | Evidence | Result |
|-------------|----------|----------|--------|
| CONICET communication gate | Stage 1–2 renders placeholder | SSR stage-3 flag-on: neutral placeholder ×1, name 0 (stage 1–2 is the same `<4` branch: `conicetBlock.tsx` ternary + `flags.conicetAuthorized=false`; flag-off stage 1 build also green) | ✅ COMPLIANT |
| CONICET communication gate | Stage 4–5 authorized content | SSR stage-5 flag-on build: `CONICET en TechnoCrypto Summit 2027` ×1, `Institucional` ×1, neutral 0 | ✅ COMPLIANT |
| TCST legal gate | Disclaimer always present | `/tcst` SSR both flags: disclaimer ×1 (unconditional render in `tcst/page.tsx`) | ✅ COMPLIANT |
| TCST legal gate | Forbidden framing blocked | `/tcst` SSR grep: 0 matches; `src/` TCST constants grep: 0 (rentabilidad/inversión/especulación/retorno); only `/partners` processData sponsor-ROI copy exists — not TCST copy, out of scope | ✅ COMPLIANT |
| Metric counters data gate | No invented metrics | `flags.metricsConfirmed=false`; `IMPACT_COUNTERS` all `value: null`; `impactCounters.tsx` renders pending note when not confirmed | ✅ COMPLIANT (static — no runner) |

### publics-depth

| Requirement | Scenario | Evidence | Result |
|-------------|----------|----------|--------|
| Progressive disclosure rule | Short content opens modal | Education/science/innovation "Conocé más" buttons use local `setActive` (no `router.push`); modal inventory M1–M10 in tree (prior slices S4–S6 SSR showed `role="dialog"` ×11 on flag-on home) | ✅ COMPLIANT |
| Progressive disclosure rule | Long/legal content navigates to `/tcst` | TCST teaser `href="/tcst"` (flag-on); `/tcst` → 200 with disclaimer | ✅ COMPLIANT |
| Route inventory | All five routes resolve | SSR: `/speakers` `/tcst` `/hackathon` `/expo` `/partners` → 200 each with own metadata; route set = 5 (≤ 5 limit) | ✅ COMPLIANT |
| Modal inventory | Trigger opens correct modal | M1 `universeModal` wired to `universesGrid` (S4/S5a refactor); dialog count SSR ×11 on flag-on home | ✅ COMPLIANT (client interaction validated via prior-slice SSR + source) |
| Overlap — /estudiantes disposition | Student CTA no longer dead-ends | `/new-feature` 0 refs; only remaining `/estudiantes` nav = legacy header hero CTA (`router.push("/estudiantes")` → 308 → `/#educacion`), a real route — no dead end | ✅ COMPLIANT (scenario) — ⚠️ literal MUST not fully followed (see WARNING W1) |
| Overlap — /estudiantes disposition | /estudiantes folds into #educacion | `/estudiantes` → 308 `/#educacion`; `#educacion` SSR contains `EstudiantesFold` (paths, mailto, CTA `#participar`) | ✅ COMPLIANT |
| Overlap — /expo vs /partners | No duplicate stand ownership | `/expo` + `/partners` separate (both 200, own metadata); stand floor plan single source at `/partners`; `/expo` copy has no stand inventory | ✅ COMPLIANT (scenario) — ⚠️ letter deviation (see WARNING W2) |

### homepage-narrative

| Requirement | Scenario | Evidence | Result |
|-------------|----------|----------|--------|
| Single-page chapter composition | Cold load renders all chapters | SSR flag-on: 10 `section[id]` in fixed order; plain `<a href="#...">` anchors in menu/footer (no-JS hash nav) | ✅ COMPLIANT |
| Single-page chapter composition | Deep link to #educacion | `#educacion` section present with id; menu anchor `#educacion` present; scrollspy active-state from S3 (single IntersectionObserver) | ✅ COMPLIANT |
| Scrollspy active-state | Scrolling updates active chapter | S3 evidence (rootMargin `-45%`, single IO); client-side | ✅ COMPLIANT (prior slice) |
| Scrollspy active-state | No JavaScript | plain `href="#id"` in menu (navLinks → `<a>`), footer; SSR HTML confirms | ✅ COMPLIANT |
| Audience-neutral load | Load does not move viewport | `AudienceSelector` neutral default (prior slice); no auto-scroll in SSR shell | ✅ COMPLIANT (prior slice) |
| Mobile-first shell | Floating CTA on mobile | S4 `AudienceCta` floating behavior (prior slice) | ✅ COMPLIANT (prior slice) |
| Homepage SEO ownership | Single H1 | SSR flag-on: `<h1>` ×1; `<h2>`/`<h3>`/`<h4>` ordered; each route own metadata (SSR titles) | ✅ COMPLIANT |

**Compliance summary**: 17/17 scenarios compliant (runtime/SSR evidence where the project allows; static + prior-slice evidence where client-side). 2 spec-letter deviations surfaced as warnings (see below).

## Correctness (Static Evidence)

| Requirement | Status | Notes |
|------------|--------|-------|
| 8.1 `/speakers` route + metadata | ✅ Implemented | `speakers/page.tsx` → `DepthPage` + `SPEAKERS_CONTENT` |
| 8.2 `/hackathon` route + metadata | ✅ Implemented | `hackathon/page.tsx` + `HACKATHON_CONTENT` |
| 8.3 `/expo` route, kept separate from `/partners` | ✅ Implemented (⚠️ scope note) | Own route + metadata; floor plan stays at `/partners` (documented deviation) |
| 8.4 `/tcst` + always-on disclaimer | ✅ Implemented | Disclaimer unconditional; TCST_CONTENT/TCST_NEUTRAL flag-gated |
| 8.5 Fold students content into `#educacion` | ✅ Implemented | `estudiantesFold.tsx` mounted in `educationV2.tsx`; retired `students/**` (no dangling imports) |
| 8.6 `/estudiantes` permanentRedirect + link cleanup | ✅ Implemented (⚠️ 1 legacy link) | `permanentRedirect("/#educacion")` verified 308; `/new-feature` removed; footer Profundizar + nav depth links flag-aware |
| 8.7 CONICET/TCST flag branches | ✅ Implemented | CONICET stage<4 neutral / ≥4 authorized (SSR both); TCST teaser + footer link only when `tcstEnabled` |
| File-size rule (<300 lines) | ✅ Compliant | Largest new S8 file `routesData.ts` 131 lines |

## Coherence (Design)

| Decision | Followed? | Notes |
|----------|-----------|-------|
| 4 new route pages + keep `/partners`, per-route metadata | ✅ Yes | Matches design §Routes |
| `/tcst` disclaimer always rendered; copy flag-gated | ✅ Yes | Matches design §Legal |
| CONICET stages 1–3 neutral / 4–5 authorized | ✅ Yes | Matches design §Legal; SSR-verified both ends |
| Metrics render only from confirmed data | ✅ Yes | `metricsConfirmed:false`, `value:null` counters |
| `/estudiantes` fold + permanentRedirect | ✅ Yes | Matches design open-question resolution |
| `/expo` owns stands vs `/partners` tiers | ⚠️ Partial | Design said `/expo` owns stands; implementation kept the single source of truth at `/partners` (no duplication, exactly one source — scenario satisfied). Documented in apply-progress |
| Shared `DepthPage` shell for all depth routes | ✅ Yes | Reuse-first, one `<main>`, one `<h1>` per route |

## Issues Found

**CRITICAL**: None

**WARNING**:
- **W1 — Legacy header hero still links `/estudiantes`** (`src/components/header/hero/hero.tsx:173`, "¿Eres estudiante?"). publics-depth requires homepage links that pointed at `/estudiantes` to be repointed to `/#educacion`. The CTA still pushes `/estudiantes`; behavior is not dead (308 → `/#educacion`), and in flag-on it resolves correctly, but in flag-off the legacy home has no `#educacion` anchor, so the redirect lands without scrolling. Literal MUST not followed; scenario passes. Needs a decision: repoint (would dead-end in legacy) or absorb the legacy hero's CTA into the fold.
- **W2 — `/expo` does not own the stands floor plan** (documented deviation in apply-progress). publics-depth says `/expo` MUST own "exhibición/stands" with its floor plan as single source of truth; implementation left the floor plan at `/partners`. No duplication exists (scenario compliant), but the letter of the requirement is unmet. Out of slice scope per apply; flag for the orchestrator/build owner.

**SUGGESTION**:
- S1 — Footer "Contactanos" (`footer.tsx`) anchors `#contacto`, which does not exist on the immersive home (legacy-only anchor) → no-op click when flag on. Consider `#participar` or removing on flag-on.
- S2 — `src/components/activities/card/**` is now unused after the students retirement (apply noted; left in place). Candidate for cleanup in a future slice.
- S3 — Lint baseline improved to 3 warnings (from 4); the 2 remaining errors are the documented pre-existing `introductionDescription.tsx`.

## Verdict

**PASS WITH WARNINGS** — All S8 deliverables verified working at runtime (routes resolve with metadata, `/estudiantes` 308 → `/#educacion`, TCST disclaimer always visible with no forbidden framing, CONICET stage gate proven at stage 3 neutral and stage 5 authorized, fold renders inside `#educacion`, nav/footer depth links live, no `/new-feature` anywhere, no new lint errors). Two documented spec-letter deviations tracked as warnings (legacy hero `/estudiantes` link, `/expo` stand-ownership split); neither breaks a verifiable scenario.