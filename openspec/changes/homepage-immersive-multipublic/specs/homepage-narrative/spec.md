# Delta for homepage-narrative

## ADDED Requirements

### Requirement: Single-page chapter composition

`/` MUST render exactly nine scroll chapters plus a closing `#participar` segment, in this anchor
order: `#hero`, `#summit`, `#ciencia`, `#tecnologia`, `#innovacion`, `#educacion`, `#experiencia`,
`#empresas`, `#territorio`, `#participar`.

#### Scenario: Cold load renders all chapters

- GIVEN JS enabled or disabled
- WHEN a visitor opens `/`
- THEN all 10 `section[id]` roots render server-side in the fixed order
- AND each anchor is reachable by plain hash navigation without JS

#### Scenario: Deep link to a chapter

- GIVEN a shared URL ending in `#educacion`
- WHEN the page loads
- THEN the viewport lands on `#educacion`
- AND the sticky menu marks "Educación" active

### Requirement: Scrollspy active-state

A sticky menu MUST reflect the chapter currently in view using a single `IntersectionObserver` over
`section[id]`; it MUST degrade to plain anchors when JS is unavailable.

#### Scenario: Scrolling updates active chapter

- GIVEN the sticky menu is mounted
- WHEN a chapter crosses the viewport midpoint
- THEN only that chapter's label is marked active
- AND no other label remains active

#### Scenario: No JavaScript

- GIVEN JS disabled
- WHEN the user clicks a menu anchor
- THEN the browser performs native hash scroll to the section

### Requirement: Audience-neutral load

The page MUST NOT auto-scroll or preselect on load; scrolling MUST happen only on explicit user action.

#### Scenario: Load does not move viewport

- GIVEN a visitor with no prior selection
- WHEN `/` finishes loading
- THEN the viewport stays at the hero
- AND no audience chip is selected

### Requirement: Mobile-first shell

The base layout MUST be the mobile layout (desktop as progressive enhancement); on mobile the sticky
chrome MUST expose a floating `[QUIERO SER PARTE]` CTA (§45).

#### Scenario: Floating CTA on mobile

- GIVEN a viewport < 768px
- WHEN the user scrolls past the hero
- THEN the floating CTA stays reachable
- AND it does not overlap the sticky menu controls

### Requirement: Homepage SEO ownership

`/` MUST own exactly one `<h1>`, a unique title and meta description (§47); every chapter MUST use a
semantic `<section>` with ordered `<h2>`/`<h3>` headings; routes MUST declare per-route metadata.

#### Scenario: Single H1

- GIVEN any render of `/`
- WHEN the document is inspected
- THEN exactly one `<h1>` exists
- AND chapter headings follow `<h2>`/`<h3>` order

## MODIFIED Requirements

### Requirement: Homepage composition

`/` MUST be composed as the nine-chapter immersive narrative above, replacing the current
Header/Introduction/Activities/About/Team/Location/Roadmap/Contact layout.
(Previously: 5–8 anonymous sections with stale "cripto" framing; no chapters, scrollspy, or audience model.)

#### Scenario: Legacy sections no longer drive `/`

- GIVEN `/` renders
- WHEN the DOM is inspected
- THEN the old `#acerca-de`/`#actividades`/`#nosotros`/`#equipo`/`#roadmap` composition is not the page structure

## REMOVED Requirements

### Requirement: Legacy crypto-conference framing

(Reason: brief repositions to CIENCIA·TECNOLOGÍA·IA·BLOCKCHAIN·INNOVACIÓN·EDUCACIÓN.)
(Migration: legacy copy kept only in `page.legacy.tsx` for rollback behind the `homepage-v2` flag.)
