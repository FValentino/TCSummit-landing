# Exploration: Immersive Multi-Public Homepage (`/`) — TCSummit 2027

Change: `homepage-immersive-multipublic` · Branch: `dev/partners` · Artifact store: hybrid
Language: this artifact is English. Quoted product UI copy stays Spanish (existing site convention).

---

## Current State

The live homepage `src/app/(public)/page.tsx` (32 lines) is a **5-section tech-conference** page:
`Header` (hero + bg video) → `Introduction` (`#acerca-de`) → `Activities` (`#actividades`) →
`About` (`#nosotros`) → `Team` (`#equipo`) → `Location` (`#ubicacion`) → `Roadmap` (`#roadmap`) +
`Contact` (`#contacto`). The `(public)` layout mounts a shared `Menu` + `Footer`.

Key facts that constrain every decision below:

- **Positioning is stale.** All copy is "tecnología / Bitcoin / criptomonedas / IA". The brief moves
  to **CIENCIA + TECNOLOGÍA + IA + BLOCKCHAIN + INNOVACIÓN + EDUCACIÓN**. `About`, `Introduction`,
  `Roadmap` and the hero all carry the old framing.
- **The brief's home block inventory is ~30 sections** (brief §09–§42) plus a 3-form conversion set
  (§50–§53) and a navigation/footer (§10, §43). The current home renders ~5. `Cambios-web.md` also
  asks for **14 SEO routes** (§48) — directly in tension with the "single page + ≤5 routes" constraint.
- **Only one secondary route exists on the public side** (`/estudiantes`), and `/partners` exists as
  the corporate/sponsor view. `/partners` lives on the `partners` line; `main` serves the public
  landing (per `openspec/config.yaml`).
- **Chrome:** `common/menu/menu.tsx` (180 lines) is hash-link based (`#inicio`, `#actividades`,
  `#nosotros`, `#ubicacion`, `#roadmap`, `#contacto`). `common/footer/footer.tsx` (82 lines) is a
  minimal brand strip — the brief §43 wants a full nav + contact footer.
- **Animation/particles:** home already instantiates `ParticlesBackground` (100 dots / 120 lines)
  3–4×. Each mount is a full `<canvas>` with an O(n²) nearest-neighbour loop (`100²/2 ≈ 5 000`
  distance checks/frame), **no `prefers-reduced-motion`, no `pointer-events-none`, and the RAF loop
  is never cancelled** (only the `resize` listener is removed).
- **Hero media:** `header/header.tsx` autoplays `backgroundMP4.mp4` (9.2 MB) + `backgroundWEBM.webm`
  (4.8 MB); `hero.tsx` renders `robot.webp` with `priority`. The hero LCP element is heavy.
- **Forms today:** one generic `contactForms` (name/email/message → `contactEmail` server action,
  Mailjet). The brief §50–§53 requires **three separate forms** (Asistente / Empresa / Institucional)
  — "no mezclar todos los públicos en un único formulario".
- **Conventions (verified):** `src/components/{domain}/{component}/{component}.tsx` + sibling
  `{component}Data.ts`; import `motion` from `framer-motion` (the `motion` package is NOT installed);
  300-line cap; no test runner (`strict_tdd: false`); brand hexes hardcoded (`#03f5ff`, `#00c6ff`,
  `#0090ff`, `#002c6b`, `#b5bbef`, `#d7e8f9`); Tailwind v4 CSS-first, no `tailwind.config.ts`.
- **Existing 300-line violations** (do not worsen): `team/team.tsx` 311, `partners/participate/participateData.ts` 349.

---

## 1. Block Mapping Table

Strategy legend: **scroll** = full section on `/`; **modal** = short detail in modal/slide-over
(<~1 screen); **route** = long/dense/legal page. Publics: **E**=Empresa/Sponsor, **A**=Asistente/Público,
**I**=Institución/Universidad/Científico, **G**=Gobierno/Sector público.
Priority: P0 = load-bearing for the 5-second test (§02), P1 = core narrative, P2 = depth.

| § | Block | Strategy | Publics | Priority |
| --- | --- | --- | --- | --- |
| 09 | Apertura / HERO ("El futuro no se espera") | scroll | A,E,I,G | P0 |
| 10 | Navegación principal (sticky + [QUIERO SER PARTE]) | chrome | all | P0 |
| 11 | El Summit ("No es una conferencia. Es una experiencia.") | scroll | A,I,G | P0 |
| 12 | Los Seis Universos (Ciencia·IA·Tec·Blockchain·Innovación·Educación) | scroll grid → **modal** per universe | all | P0 |
| 13 | Ciencia | scroll | I | P0 |
| 14 | CONICET (**gated** — §56 protocol, §14 forbidden claims) | scroll (placeholder) → **modal** until authorized | I,G | P1 |
| 15 | Science Hub ("Donde la ciencia sale del laboratorio") | scroll → **modal** (13 areas) | I,A | P1 |
| 16 | Future Lab (desafío→idea→equipo→prototipo→solución→impacto) | scroll → **modal** (process) | I,A | P1 |
| 17 | Educación ("El futuro tiene nombre y apellido") | scroll | A,I,G | P0 |
| 18 | Estudiantes secundarios | scroll → **modal** (experience) | A,I | P1 |
| 19 | Universitarios | scroll → **modal** | A,I | P1 |
| 20 | Universidades | scroll | I,G | P0 |
| 21 | Vocaciones científicas (animated questions) | scroll | A,I | P1 |
| 22 | Empresas (Mostrar/Conectar/Innovar/Detectar/Desarrollar/Incorporar) | scroll | E,G | P0 |
| 23 | Ciencia + Empresa (flujo → empleo) | scroll | E,I,G | P1 |
| 24 | Interdisciplinariedad | scroll | I,G | P2 |
| 25 | Think Tank TCSummit (6 actors) | scroll → **modal** | I,E,G | P2 |
| 26 | Inteligencia Artificial | scroll | A,E | P1 |
| 27 | Blockchain ("mucho más que criptomonedas") | scroll | A,E | P1 |
| 28 | TCST — **legal gate (§55)** | **route `/tcst`** | A,E,I | P1 |
| 29 | Speakers | scroll teaser → **route `/speakers`** | A,I,E | P0 |
| 30 | Experiencia (event map: escenario, hub, lab, expo, hackathon…) | scroll → **modal** per element | A,E | P1 |
| 31 | Hackathon | scroll teaser → **route `/hackathon`** | A,I | P1 |
| 32 | Expo ("quiero un stand") | scroll teaser → **route `/expo`** | E,I | P0 |
| 33 | Networking | scroll | A,E | P2 |
| 34 | Chaco (territorio) | scroll | G,I | P0 |
| 35 | Argentina (map + connections) | scroll | G,I | P1 |
| 36 | Latinoamérica (regional map) | scroll | G,I | P1 |
| 37 | Impacto (6 animated counters; numbers only when confirmed §37) | scroll | G,E,I | P0 |
| 38 | Gobierno (articulación pública) | scroll | G,I | P0 |
| 39 | Sponsors (visibilidad/experiencia/talento/… + [QUIERO SER SPONSOR]) | scroll → **route `/partners`** | E | P0 |
| 40 | Gala / Ubicación (7.650 m², mapa, sectores) | scroll → **modal** (detail) or inline | A,G,I | P0 |
| 41 | Cuenta regresiva (13·14·15 agosto 2027) | scroll | all | P1 |
| 42 | CTA Final (particle logo + [QUIERO SER PARTE]) | scroll | all | P0 |
| 43 | Footer (full nav + contacto + redes) | chrome | all | P1 |
| 50–51 | Formulario **Asistente** | **modal** | A | P0 |
| 52 | Formulario **Empresa** | **modal** | E | P0 |
| 53 | Formulario **Institucional** | **modal** | I,G | P0 |

---

## 2. Information Architecture — Chapters & Scrollspy

Nine scroll chapters, ordered by the brief's narrative map (§62: FUTURO→CIENCIA→TECNOLOGÍA→IA→
BLOCKCHAIN→INNOVACIÓN→EDUCACIÓN→TALENTO→EMPRESA→IMPACTO→DESARROLLO TERRITORIAL):

| # | Anchor | Chapter | Brief blocks | Scrollspy label |
| --- | --- | --- | --- | --- |
| 1 | `#hero` | Apertura — El Futuro | 09 (+ micro 41) | Inicio |
| 2 | `#summit` | El Summit | 11, 12 | El Summit |
| 3 | `#ciencia` | Ciencia | 13, 14*, 15, 16 | Ciencia |
| 4 | `#tecnologia` | Tecnología · IA · Blockchain | 26, 27 | Tecnología |
| 5 | `#innovacion` | Innovación & Think Tank | 23, 24, 25 | Innovación |
| 6 | `#educacion` | Educación & Talento | 17, 18, 19, 20, 21 | Educación |
| 7 | `#experiencia` | Experiencia & Actividades | 29†, 30, 31†, 32†, 33 | Experiencia |
| 8 | `#empresas` | Empresas & Sponsors | 22, 39† | Empresas |
| 9 | `#territorio` | Territorio & Impacto | 34, 35, 36, 37, 38 | Territorio |
| — | `#participar` | Cierre — Ubicación & CTA Final | 40, 41, 42, forms 51–53 | Contacto |

`*` CONICET block renders as a neutral "Sistema científico-tecnológico" placeholder until §56 stage 3–5.
`†` teaser section on `/` links out to its route.

**Scrollspy:** an `IntersectionObserver` over the 9 `section[id]` roots drives the sticky menu's
active state and the audience selector's progress. This instrument also supplies the brief's mobile
priority order (§45). It must degrade gracefully (no JS → plain anchors still work).

---

## 3. Audience Selector Design

**Placement:** immediately after the hero CTAs, above the fold on desktop; as a compact sticky
"floating CTA + audience chip" on mobile (§45 CTA flotante).

**Labels (Spanish, segmented control of 4):**

| Audience | Chip label | Icon (lucide) |
| --- | --- | --- |
| Asistente / Público | `Quiero asistir` | `Ticket` |
| Empresa / Sponsor | `Soy empresa` | `Building2` |
| Institución / Universidad | `Soy institución` | `GraduationCap` |
| Gobierno / Sector público | `Represento al sector público` | `Landmark` |

**Behavior:** selection writes an `audience` value into a client context (and mirrors it to
`localStorage` + URL hash, e.g. `?publico=empresa`, so shared links open in the right mode). It:

1. **Segments the CTAs** — hero primary + final CTA + floating CTA render the audience's action:
   - Asistente → `Comprar entradas` (ticket link) + `Asistente` form modal
   - Empresa → `Quiero ser sponsor` → `/partners` + `Empresa` form modal
   - Institución → `Quiero vincular mi institución` → `Institucional` form modal
   - Gobierno → `Articular con el Summit` → `Institucional` form modal (organism variant)
2. **Prioritizes chapters** — the audience's primary chapters are visually promoted (order/size/scroll
   cue) while all chapters remain reachable. **Nothing is hidden** — hiding sections hurts SEO and the
   "5-second" test for mixed-reading visitors (e.g., a journalist who is also a parent).
3. **Smooth-scrolls** to the audience's first priority chapter on explicit chip click (not on load).

**Default:** neutral — no chip preselected, no auto-scroll, both hero CTAs shown. Rationale: the
site is currently shared to a **closed audience** (per the user's own framing), so the first visitor
must see the whole event, not be forced into a lane. The broadest reading order is the mobile
priority list (§45: fecha, lugar, qué es, entradas, actividades, speakers, ubicación, sponsors,
contacto).

**Audience → chapter priority**

| Audience | Priority chapters | Primary conversion |
| --- | --- | --- |
| Asistente | Summit, Experiencia, Speakers, Territorio, Cierre | Entradas + Asistente form |
| Empresa | Empresas, Ciencia, Innovación, Experiencia(Expo), Territorio(impacto) | `/partners` + Empresa form |
| Institución | Ciencia, Educación, Innovación, Experiencia | Institucional form |
| Gobierno | Territorio, Ciencia, Educación, Empresas, Impacto | Institucional form |

---

## 4. Modal / Route Inventory

### Routes (long / dense / legal) — 5 total (within the "4–5" ceiling)

| Route | Owns | Justification |
| --- | --- | --- |
| `/speakers` | Full speaker list, 7 categories, per-speaker cards (§29) | Dense, grows over time; SEO target |
| `/tcst` | Token explanation + full legal disclaimer (§28, §55) | Legal content MUST be a standalone, linkable page |
| `/hackathon` | Rules, areas, schedule, registration (§31) | Dense + form; standalone campaign page |
| `/expo` | Expo detail, participants, "quiero un stand" (§32) | Dense commercial detail |
| `/partners` *(existing)* | Sponsorship tiers, partner deck, interactive floor plan | Already live; the canonical Empresa/Sponsor depth |

**Tension to flag:** brief §48 lists ~14 routes. The user constrains to ≤5. The 4 above are the
explicitly requested ones; `/partners` is retained as the 5th (already built, commercial depth).
Everything else (`/ciencia`, `/science-hub`, `/future-lab`, `/educacion`, `/universidades`,
`/empresas`, `/actividades`, `/sponsors`, `/ubicacion`, `/contacto`) is **demoted to scroll chapters
or modals**.

### Modals / slide-overs (short depth — "CONOCÉ MÁS", §58)

| # | Trigger | Content | Kind |
| --- | --- | --- | --- |
| M1 | Universe card (§12) | universe detail + CTA | slide-over |
| M2 | Science Hub area chip (§15) | area description | modal |
| M3 | Future Lab step (§16) | step detail | modal |
| M4 | Experience map element (§30) | element info | slide-over |
| M5 | CONICET block (§14) | gated institutional note / "en articulación" | modal (feature-flagged) |
| M6 | Think Tank actor (§25) | actor contribution | modal |
| M7 | Asistente CTA (§51) | Asistente form | slide-over |
| M8 | Empresa CTA (§52) | Empresa form | slide-over |
| M9 | Institución/Gobierno CTA (§53) | Institucional form | slide-over |
| M10 | Gala / Ubicación (§40) | venue detail + map embed | modal (fallback: inline) |

Forms stay **separate** (M7/M8/M9) — per §50, one public per form, never merged.

---

## 5. Overlaps

### `/estudiantes` vs the Educación chapter (blocks 17–21)
`src/app/(public)/estudiantes/page.tsx` composes `students/hero` + `students/introduction`
("Charlas que inspiran") + `students/oportunities` (jobs, transport, certs, mentors) +
`students/activities`. This is **~90% the same material** as `#educacion` (17–21), and its CTA
targets `/new-feature` (a non-existent route — `hero.tsx` also routes there).

**Recommendation:** absorb the student narrative into `#educacion` on `/`; demote the student
"how to participate / transport / registration code" detail to a modal (short) or keep the page
**thin**. `/estudiantes` becomes legacy → either redirect to `/#educacion` or repurpose as the
student-registration campaign page. Fix the dead `/new-feature` links regardless.

### `/partners` vs Empresas/Sponsors/Expo (blocks 22, 32, 39)
`/partners` owns sponsorship tiers + the interactive 115-stand floor plan (§32 Expo territory).
The brief's Empresas chapter (§22) and Expo block (§32) **overlap** with it:
- §22 (Empresas) → benefits framing; belongs on `#empresas` on `/`.
- §32 (Expo) and "quiero un stand" → the floor plan already IS Expo's stand inventory.

**Recommendation (needs one decision):** either (a) `/expo` owns "exhibición/stands" and `/partners`
owns "sponsorship tiers", with the floor plan living in one of them; or (b) merge Expo into
`/partners` and drop `/expo`, freeing a route slot. Default: **(a)** — `/expo` is a requested route;
`/partners` keeps the sponsor tiers and links to `/expo` for stand inventory. Flag as blocking.

---

## 6. Risks

- **Performance / LCP.** Hero autoplays ~14 MB of video + `priority` robot image. On the new long
  page, LCP will be the hero media. Need a poster image, `preload="none"` or metadata-only with
  lazy video, and a measured LCP target (<2.5 s, §46).
- **Particle cost multiplies.** `ParticlesBackground` is O(n²)/frame, never cancels its RAF loop, has
  no reduced-motion and no `pointer-events-none`. 9 chapters could mount many canvases → INP/main-thread
  risk. This component is **out of scope** (affects every page) but the new page must cap instances
  (ideally 1 persistent canvas behind, not one per section) and add a reduced-motion path for its own
  new animations.
- **Scroll length.** ~30 blocks in one page is a very long scroll. Mitigate with chapter grouping,
  progressive disclosure (modals), scrollspy, and skip-to-section. Risk of mobile fatigue and of the
  5-second test failing if P0 content is buried.
- **Legal gates.** CONICET (§14, §56): must NOT say "presente/partner/sponsor" or use the logo until
  formal authorization — content must be **feature-flagged** with 5 protocol stages. TCST (§55): must
  never read as investment/return; the disclaimer (`sujeto a diseño técnico, jurídico y regulatorio`)
  is mandatory on any token mention. Both need data-driven toggles, not hardcoded copy.
- **Asset strategy.** The brief demands real photo/video (students, scientists, entrepreneurs, venue,
  stands) plus CGI/particles/molecules/holograms and 8 named videos (§60). The repo has almost none
  (robot.webp, a few about/talk/venue images). This is the single largest content dependency and a
  hard blocker for "premium immersive" feel. Needs an asset manifest + placeholder plan.
- **Zero/negative metrics (§37).** "Numbers only when confirmed" — counters must render from a
  confirmed data source, not invented values.
- **Route/SEO tension.** Brief wants 14 indexable routes; the user wants ≤5. The 9 chapters must be
  SEO-strong (semantic headings, anchors, metadata) to compensate.
- **300-line cap.** The narrative shell, audience context, and per-chapter sections must be **pre-split**;
  several existing files are already over cap.
- **Branch topology.** Home work is public; `/partners` is on the `partners` line. Any home CTA that
  links to `/partners` assumes both are merged/deployed together.

---

## 7. Recommendation (hybrid — validated)

**Go hybrid. The single-page immersive narrative is the right call, and it is non-negotiable as
`/`.** Concretely:

- **One page `/` = 9 scroll chapters** following the §62 narrative order, with a **sticky scrollspy
  menu** and a **full footer** (§43). No splitting the main experience into routes.
- **Audience selector near the hero**, neutral by default, segmented into 4 CTAs, prioritizing (never
  hiding) chapters, mirrored to URL/localStorage. It is the mechanism that lets one narrative serve
  4 publics.
- **Depth via progressive disclosure:** short content → modal/slide-over (M1–M10); long/dense/legal →
  **max 5 routes** (`/speakers`, `/tcst`, `/hackathon`, `/expo`, `/partners`).
- **Reconcile overlaps:** fold `/estudiantes` into `#educacion`; clarify `/expo` vs `/partners`
  ownership of "stands".
- **Legal blocks are feature-flagged** (CONICET 5-stage, TCST disclaimer) so they can ship ahead of
  formal confirmations without violating the brief's protocols.

This is exactly the hybrid the orchestrator proposed; exploration confirms it is sound and the only
material risk is **content/asset availability**, not architecture.

**Concrete next step:** run **`sdd-propose`** for `homepage-immersive-multipublic` to lock, before
specs: (a) the 9 chapters + anchors, (b) the audience→chapter/CTA mapping, (c) the modal/route
inventory, (d) the `/estudiantes` and `/expo` ↔ `/partners` decisions, (e) the CONICET/TCST
feature-flag model. The proposal should also state the **chained-PR slicing** (this is far over the
400-line budget — expect 5+ slices) and call out the asset-manifest dependency as an explicit input.

---

## Open Questions

### Blocking
1. **`/expo` vs `/partners`** — who owns "stands/exhibición"? Keep both (a, default) or merge Expo into
   `/partners` and free a route slot?
2. **`/estudiantes` disposition** — redirect to `/#educacion`, keep as a thin registration page, or
   repurpose? (Dead `/new-feature` links must be fixed either way.)
3. **Assets** — who supplies the real photography/video (§60/§61)? Without it, "premium immersive" is
   not achievable. Is a placeholder-first launch acceptable?

### Defaultable (proceed unless overridden)
4. **Default audience:** neutral (no preselection). Alternative: `Quiero asistir` (broadest).
5. **Persistence:** URL `?publico=` + localStorage; no server state.
6. **Chapter count:** 9 scroll chapters + closing segment.
7. **CONICET (etapa 1):** render "Ciencia argentina en TCSummit / sistema científico-tecnológico",
   no logo, feature-flagged for etapas 3–5.
8. **TCST:** route `/tcst` mandatory; disclaimer always visible.
9. **Metrics counters:** render only from a confirmed data module; empty/hidden until then.
10. **Particles:** cap to a single persistent background canvas; own reduced-motion path; do not modify
    `ParticlesBackground.tsx` in this change.

---

## Verification Notes

- `strict_tdd: false` — no test runner, no CI. Gates are `npx tsc --noEmit`, `npm run lint`
  (2 pre-existing errors in `introductionDescription.tsx` + 4 warnings), `npm run build`.
- **Not machine-verifiable:** LCP/INP, scroll harmony, modal focus/scroll-lock, audience-mode UX,
  and legal-copy correctness. These need human review and should be explicit acceptance steps.
- Reuse existing primitives where possible (`common/ui`, `ParticlesBackground`) per config; import
  `motion` from `framer-motion` only.
