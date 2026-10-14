# Delta for publics-depth

## ADDED Requirements

### Requirement: Progressive disclosure rule

Content shorter than ~1 screen MUST open in a modal/slide-over; long, dense, or legal content MUST be a
route. The route set MUST NOT exceed 5.

#### Scenario: Short content opens modal

- GIVEN a "CONOCÉ MÁS" trigger on a chapter chip
- WHEN the user activates it
- THEN a modal/slide-over opens with the detail
- AND the page does not navigate

#### Scenario: Long/legal content navigates

- GIVEN the TCST legal detail
- WHEN the user activates its CTA
- THEN the browser navigates to `/tcst`

### Requirement: Route inventory

Exactly these public routes MUST exist for depth: `/speakers`, `/tcst`, `/hackathon`, `/expo`, and the
existing `/partners`.

#### Scenario: All five routes resolve

- GIVEN the build output
- WHEN each of the five routes is requested
- THEN each returns its own page with metadata

### Requirement: Modal inventory

These short-depth modals MUST exist: M1 universe, M2 science-hub area, M3 future-lab step,
M4 experience element, M5 CONICET (flagged), M6 think-tank actor, M7 asistente form, M8 empresa form,
M9 institucional form, M10 venue.

#### Scenario: Trigger opens the correct modal

- GIVEN a universe card (§12)
- WHEN it is activated
- THEN M1 opens with that universe's detail and a CTA

### Requirement: Overlap — /estudiantes disposition

`/estudiantes` content MUST be folded into the `#educacion` chapter component. The route MUST
`permanentRedirect` to `/#educacion` (App Router, `next/navigation`) rather than remain a standalone
page. Menu, footer, and homepage links that pointed at `/estudiantes` MUST be repointed to
`/#educacion`. Dead `/new-feature` links MUST be removed in the same slice.

#### Scenario: Student CTA no longer dead-ends

- GIVEN any student CTA
- WHEN it is activated
- THEN it targets a real anchor or route
- AND `/new-feature` is never linked

#### Scenario: /estudiantes folds into #educacion

- GIVEN a request to `/estudiantes`
- WHEN the route resolves
- THEN a permanent redirect lands on `/#educacion`
- AND the absorbed student content renders inside the `#educacion` chapter

### Requirement: Overlap — /expo vs /partners

`/expo` and `/partners` MUST remain separate routes. `/expo` MUST own "exhibición/stands" (its floor plan
is the single source of truth); `/partners` MUST own sponsorship tiers. Inventory MUST NOT be duplicated.

#### Scenario: No duplicate stand ownership

- GIVEN both routes are deployed
- WHEN stand inventory is edited
- THEN exactly one route is the source of truth

## DEPENDENCIES

- Resolved: `/expo` vs `/partners` → keep separate; `/expo` owns stands.
- Resolved: `/estudiantes` disposition → fold into `#educacion` + permanent redirect.
