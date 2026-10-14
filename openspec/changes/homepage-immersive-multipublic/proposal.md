# Proposal: Immersive Multi-Public Homepage (`/`)

## Intent

`/` today is 5 stale "cripto" sections; the brief repositions to
**CIENCIA·TECNOLOGÍA·IA·BLOCKCHAIN·INNOVACIÓN·EDUCACIÓN** with ~30 blocks for 4 publics (Asistente, Empresa,
Institución, Gobierno). One immersive `/` is non-negotiable — it carries the whole event while each public finds
its depth. Now: IA, anchors, and legal gates shape all later content.

## Scope

**In**: rebuild `/` as 9 scroll chapters + `#participar`; audience selector (4 publics, neutral default);
modals M1–M10 + routes `/speakers`, `/tcst`, `/hackathon`, `/expo` (keep `/partners`); 3 separate forms in modals;
scrollspy menu + full footer; feature-flagged legal gates (CONICET/TCST).

**Out**: no test runner (`strict_tdd: false`); no edits to `ParticlesBackground.tsx` (cap instances only); no real
asset production (§60/§61, placeholder-first); `/estudiantes`, analytics (§49), `/partners` → separate changes.

## Capabilities

**New**:
- `homepage-narrative`: 9-chapter immersive `/` + scrollspy.
- `audience-selection`: 4-public selector, CTA segmentation, URL/localStorage persistence.
- `publics-depth`: modal/route progressive-disclosure rules + inventory.
- `lead-forms`: three isolated conversion forms with separate schemas/actions.

**Modified**: None — no `openspec/specs/` exist yet; all additive.

## Approach

Hybrid: page shell composes chapters + a client `AudienceProvider`; short depth → modal, long/legal → one of ≤5 routes; reuse `common/ui` + particles; CSS tokens.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/app/(public)/page.tsx` | Modified | Chapter shell + closing |
| `components/{hero,summit,science,tech,innovation,education,experience,empresas,territorio}/` | New | Chapter domains (`{domain}/{component}/`) |
| `components/publics/` | New | Selector, context, data |
| `components/common/modals/` | New | Modal primitive + form modals |
| `app/(public)/{speakers,tcst,hackathon,expo}/page.tsx` | New | Long-depth routes |
| `menu`, `footer`, `globals.css` | Modified | Scrollspy, full nav, tokens |

## Audience Selector + CTAs

| Public | Chip | CTA | Target |
|--------|------|-----|--------|
| Asistente | `Quiero asistir` | `Comprar entradas` + form | ticket link + M7 |
| Empresa | `Soy empresa` | `Quiero ser sponsor` + form | `/partners` + M8 |
| Institución | `Soy institución` | `Vincular mi institución` | M9 |
| Gobierno | `Represento al sector público` | `Articular con el Summit` | M9 (variant) |

Selection PRIORITIZES chapters (never hides), mirrors `?publico=` + localStorage, scrolls only on explicit click.

## Depth Rules

< ~1 screen → modal/slide-over (M1–M10). Long/dense/legal → route (≤5). Everything else → scroll chapter.

## Technical Approach

- **Scrollspy**: one `IntersectionObserver` over `section[id]`; degrades to plain anchors without JS.
- **Tokens/reduced-motion**: CSS variables (black/grafito + brand hexes, no new palette); gate new motion on `prefers-reduced-motion`.
- **Particles/media**: one capped instance (do not edit the component); WebP/AVIF, hero video poster + lazy/`preload="none"`, LCP <2.5 s (§46).
- **Legal gates**: flags — CONICET 5-stage (§56, no logo/"presente"), TCST disclaimer always visible (§55).
- **A11y**: modal focus trap + scroll lock + Esc; keyboard selector; aria labels; skip-to-section.

## Form Strategy

Three isolated forms M7/M8/M9 — separate zod schemas + server actions (mirror `contactSchema`/`contactEmail`); never merged (§50).

## SEO

`/` owns title/meta (§47), semantic headings, anchors; routes get per-route metadata. Rich semantics compensate for §48's 14-route ask.

## Risks

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| Assets (§60/§61) missing blocks "premium" feel | High | Placeholder-first + asset manifest as input |
| ~14 MB hero video hurts LCP | High | Poster, lazy video, measured <2.5 s |
| Particles × chapters → INP | Med | Single capped canvas; reduced-motion |
| ~30-block scroll / 5-sec test | Med | Chapter grouping, modals, scrollspy, P0 first |
| Legal copy ships wrong | Med | Feature flags + review gate on CONICET/TCST |

## Rollback Plan

Flag new `/` as `homepage-v2`, keep `page.tsx` as `page.legacy.tsx`. Revert restores legacy with no data migration (only `localStorage`/URL). New routes are additive and independently deletable.

## Decision Criteria (go/no-go)

- Go if chapter IA, audience→CTA mapping, and modal/route inventory are approved.
- Go only once `/expo` vs `/partners` stand ownership and `/estudiantes` disposition are decided (blocking).
- No-go for full immersive launch until an asset manifest exists.

## Next Step

`sdd-spec` — lock chapters/anchors, audience mapping, modal/route inventory, and CONICET/TCST flags.
Expect 5+ chained PR slices (far over the 400-line budget).
