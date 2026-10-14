# Design: Immersive Multi-Public Homepage (`/`)

## Technical Approach

Server-rendered `/` shell composes ten `section[id]` roots inside a client `AudienceProvider`
boundary; interactive chrome (selector, CTAs, modals, menu) are client islands. Short depth →
shared modal primitive; long/legal → ≤5 routes. Reuse `common/ui`, extracted `common/modals`,
and `ParticlesBackground` (one capped instance). CSS tokens only; new motion gated on
`prefers-reduced-motion`. Maps to specs `homepage-narrative`, `audience-selection`, `publics-depth`,
`lead-forms`, `immersive-quality`, `legal-gates`.

## Architecture Decisions

| Decision | Choice | Alternative | Rationale |
|---|---|---|---|
| Modal primitive | Extract `common/modals/modalShell.tsx` + move `useScrollLock.ts` out of floorplan; refactor `standModal.tsx` onto it | Add `@radix-ui/react-dialog` (D4 not installed); copy-paste | Reuse-first (config); proven focus trap/scroll-lock; no new dep |
| Audience state | Client `AudienceProvider` + `useAudience()`; URL `?publico=` mirrored to `localStorage` `tcs:publico`; neutral default | Server cookie; SSR pre-select | Spec: no server state; shareable links |
| `/` composition | Server shell + client islands | Whole page `use client` | Preserve SSR/SEO, minimal JS |
| Particles | One fixed `ParticlesLayer` behind content + **minimal additive edit** to `ParticlesBackground.tsx` (RAF cancel, reduced-motion skip) | Leave untouched | Proposal said "no edit", but RAF never cancels → compounding leak across the long scroll + route changes. 6-line, API-preserving fix. **Open question below.** |
| Forms | 3 isolated schemas/actions; Empresa reuses `partnersContactSchema`+`partnersContactEmail` | One union form | §50 forbids merge |
| Flags | Env-driven `src/config/flags.ts` | Hardcoded copy | Ship ahead of CONICET/TCST authorization |

## Data Model

```ts
type AudienceMode = 'asistente' | 'empresa' | 'institucion' | 'gobierno' | null
interface AudienceContextValue { mode: AudienceMode; select(m: AudienceMode): void }
interface Flags { homepageV2: boolean; conicetStage: 1|2|3|4|5; tcstEnabled: boolean }
interface AssetEntry { src: string; width?: number; height?: number; poster?: string; alt: string }
```
- `localStorage` key `tcs:publico`; URL `?publico=<mode>`; invalid → neutral, no throw.
- `src/config/flags.ts` reads `NEXT_PUBLIC_HOMEPAGE_V2`, `NEXT_PUBLIC_CONICET_STAGE`, `NEXT_PUBLIC_TCST_ENABLED`.
- `src/config/assets.ts`: `Record<AssetKey, AssetEntry>` — single §60/§61 source; placeholders today.

## Component Split (domains)

```
src/components/
├── hero/  publics/         # selector + AudienceProvider + publicsData.ts
├── summit/ science/ tech/ innovation/ education/ experience/
├── empresas/ territorio/   # each {domain}/{component}/ + sibling {component}Data.ts
├── common/modals/  common/menu/  common/footer/  common/ui/
```
Shared `chapters.ts` drives anchors, scrollspy labels, and audience→chapter priority.

## Modal Primitive

`modalShell.tsx` owns scrim, `role="dialog"`, `aria-modal`, focus trap, Esc, focus restore,
`useScrollLock`; `variant` = center | slide-over. `detailModal.tsx` renders M1–M6/M10 from data;
`leadModal.tsx` wraps M7–M9 forms. `standModal.tsx` refactored onto `modalShell` (drops ~under cap).
Each file < 300 lines; forms split under `common/modals/forms/`.

## Scrollspy

`common/menu/useScrollSpy.ts`: one `IntersectionObserver` over `section[id]`, `rootMargin: "-45% 0px -45% 0px"`, sets active id. No JS → native hash anchors (degrade). Smooth scroll only on explicit click, disabled under `prefers-reduced-motion`. `menu.tsx` consumes `chapters.ts`.

## Particles

`common/ParticlesLayer.tsx` (`"use client"`): `matchMedia` picks mobile counts (`dots≈40/lines≈90`) vs desktop; `useReducedMotion()` → render static gradient, no canvas. Fixed `inset-0 pointer-events-none z-0`. Component edit adds `cancelled` flag + `cancelAnimationFrame` in cleanup and early-returns under reduced-motion.

## Media Strategy

`next/image` (AVIF/WebP default), below-fold `loading="lazy"` + explicit `width/height`/`aspect-ratio` (no CLS). Hero: poster image is LCP (`priority`); `<video preload="none" muted playsInline poster>` mounted after idle/`IntersectionObserver` — never the LCP element.

## Forms

`asistenteSchema`+`asistenteEmail`, `institucionalSchema`+`institucionalEmail` (mirror `contactEmail`),
Empresa reuses `partnersContactSchema`+`partnersContactEmail`. Extract shared `escapeHtml` to
`src/lib/html.ts`; each action `safeParse` server-side, no merge.

## Routes

New `(public)/{speakers,tcst,hackathon,expo}/page.tsx` with per-route `metadata`; keep `/partners`.

## Legal

`flags.ts` gates CONICET: stage 1–3 → `Sistema científico-tecnológico`, no logo/name; 4–5 → authorized.
`/tcst` always renders `sujeto al diseño técnico, jurídico y regulatorio correspondiente`.
Metrics render only from non-empty `metricsData`; never invented. Copy constants live in data modules with a §55/§56 review gate.

## File Changes

| File | Action |
|---|---|
| `app/(public)/page.tsx` | Modify → shell; keep `page.legacy.tsx` for rollback |
| `app/(public)/{speakers,tcst,hackathon,expo}/page.tsx` | Create |
| `components/{hero,summit,science,tech,innovation,education,experience,empresas,territorio,publics}/**` | Create |
| `components/common/modals/**` | Create; `floorplan/standModal.tsx` Modify, `floorplan/useScrollLock.ts` move |
| `components/common/{menu,footer}/**`, `globals.css` | Modify |
| `config/{flags,assets}.ts`, `schemas/*`, `actions/*`, `lib/html.ts` | Create |
| `app/(public)/estudiantes/page.tsx` | Modify/redirect |

## Testing Strategy (non-TDD)

| Layer | Approach |
|---|---|
| Type | `npx tsc --noEmit` |
| Lint | `npm run lint` (2 pre-existing errors excluded) |
| Build | `npm run build` |
| Manual | LCP <2.5 s, modal focus/scroll-lock, audience UX, legal copy, keyboard |

## Migration / Rollout

No data migration — only `localStorage`/URL. Flag `homepage-v2`; legacy kept in `page.legacy.tsx`;
new routes additive and independently deletable.

## Accessibility

Landmarks (`header/nav/main/footer`), first-tab-stop "Saltar al contenido", selector as ARIA
radiogroup (roving tabindex, arrow keys, Spanish labels), modal focus trap/restore, reduced-motion,
`focus-visible` rings.

## Chained PR Slicing (>400 lines, force-chained)

1. Foundation: flags, assets, audience context/types, modal extraction + standModal refactor, `useScrollSpy`, `ParticlesLayer`.
2. Chrome: menu scrollspy, full footer, skip-link/landmarks, `chapters.ts`.
3. Hero + summit + particles layer.
4. Science/tech/innovation/education + M1–M6.
5. Experience/empresas/territorio + `#participar` + final CTA.
6. Forms: 3 schemas/actions + M7–M9 + CTA wiring.
7. Routes `/speakers` `/hackathon` `/expo` + `/estudiantes` absorption + `/new-feature` fix.
8. `/tcst` + CONICET/TCST gates (review-gated).

## Open Questions

- [x] **Particles scope amendment**: APPROVED — apply the 6-line API-preserving `ParticlesBackground.tsx` edit (RAF cancel + reduced-motion + mobile clamp) in S2; `immersive-quality` delta inverted.
- [x] **`/expo` vs `/partners` stand ownership**: keep separate — `/expo` owns stands, `/partners` owns tiers (S8).
- [x] **`/estudiantes` redirect vs thin page**: fold content into `#educacion` + `permanentRedirect('/#educacion')` (S8).
- [x] **Asset manifest source**: placeholder-first, non-blocking; manifest + `TODO(assets)` in S1.
- [ ] **Metrics data source (§37)** — still open; blocks non-empty counters in S6.
