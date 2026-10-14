# Change Spec — Immersive Multi-Public Homepage (`/`)

Change: `homepage-immersive-multipublic` · Store: hybrid · Language: English; user-facing copy stays Spanish.

## Purpose

Rebuild `/` as one immersive page serving 4 publics (Asistente, Empresa, Institución, Gobierno);
progressive depth via modals + ≤5 routes; three isolated lead forms; feature-flagged legal gates.

## Baseline Note

No `openspec/specs/` exists yet, so `MODIFIED`/`REMOVED` blocks in these deltas reference the
**current codebase behavior** (`src/app/(public)/page.tsx`, `common/menu`, `common/footer`,
`/estudiantes`), not a prior spec. This change establishes the first baseline for these domains.

## Domains

| Domain | Scope |
|--------|-------|
| `homepage-narrative` | Chapters, scrollspy, sticky menu, SEO structure |
| `immersive-quality` | Performance, media, reduced-motion, accessibility |
| `audience-selection` | 4-public selector, CTA segmentation, persistence |
| `publics-depth` | Modal/route disclosure rules, inventory, overlaps |
| `lead-forms` | Three isolated conversion forms |
| `legal-gates` | CONICET + TCST feature flags, metric-data gate |

## DEPENDENCIES

| # | Dependency | Type | Status |
| --- | --- | --- | --- |
| D1 | **Asset manifest** (§60/§61) | Non-blocking input | **Placeholder-first** — real assets swap in later; manifest + `TODO(assets)` in S1 |
| D2 | `/partners` merged/deployed | Cross-branch | Required for Empresa CTAs |
| D3 | `components/common/modals/` primitive | New | Reuse proven `floorplan/standModal.tsx` + `useScrollLock.ts` pattern |
| D4 | `@radix-ui/react-dialog` (if Radix Dialog chosen) | npm dep | **NOT installed** (only `react-slot`, `react-navigation-menu`, `react-icons`) |
| D5 | `motion` from `framer-motion` (never the `motion` pkg) | Existing dep | OK |
| D6 | `@/lib/email` + Mailjet + zod | Existing | OK — reuse |
| D7 | `?publico=` URL param + `localStorage` schema | Contract | New |
| D8 | Confirmed metrics data source (§37) | Blocking for counters | MISSING |

## RISKS

| Risk | Sev | Mitigation |
| --- | --- | --- |
| Missing assets → placeholder-only, not "premium" | High | Ship placeholder-first behind `homepage-v2`; asset manifest + `TODO(assets)` in S1 (non-blocking) |
| ~14 MB hero video hurts LCP | High | Poster + lazy video; measured LCP <2.5 s |
| Particle canvas × chapters → INP | Med | Single capped canvas; reduced-motion path; approved API-preserving RAF-cancel fix (A1, S2) |
| Legal copy ships wrong | High | Feature flags + human review gate (`legal-gates`) |
| `/expo` vs `/partners` stand ownership undecided | Resolved | Keep separate — `/expo` owns stands, `/partners` owns tiers (S8) |
| `/estudiantes` dead `/new-feature` links | Resolved | Fold content into `#educacion` + permanent redirect + `#new-feature` link cleanup (S8) |
