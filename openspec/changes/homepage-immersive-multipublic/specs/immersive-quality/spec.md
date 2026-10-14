# Delta for immersive-quality

## ADDED Requirements

### Requirement: LCP and CLS budgets

`/` MUST target LCP < 2.5 s on mobile (§46); the LCP element MUST be a poster/hero image, NOT the
hero video; CLS MUST be minimized via reserved media dimensions.

#### Scenario: Hero does not block LCP

- GIVEN a cold mobile load
- WHEN the hero paints
- THEN the LCP element is the poster/hero image
- AND the autoplay video is not the LCP element

#### Scenario: No layout shift from media

- GIVEN below-fold images and video
- WHEN they load
- THEN surrounding layout does not shift
- AND explicit width/height or `aspect-ratio` is present

### Requirement: Media loading strategy

Below-fold video and images MUST lazy-load; the hero video MUST declare a poster and MUST NOT block
first paint; images MUST be served as AVIF/WebP with fallback.

#### Scenario: Lazy below-fold video

- GIVEN a user who has not scrolled
- WHEN the page is idle
- THEN below-fold video bytes are not fetched
- AND a poster is shown instead

### Requirement: Reduced-motion

Every new animation MUST be gated on `prefers-reduced-motion`; when reduce is requested, non-essential
motion MUST be disabled and content MUST be fully visible without animation.

#### Scenario: Reduced motion honoured

- GIVEN `prefers-reduced-motion: reduce`
- WHEN the page renders
- THEN entrance/parallax animations are disabled
- AND no content depends on an animation to become visible

### Requirement: Particle cost cap

The `/` experience MUST mount at most ONE `ParticlesBackground` instance, MUST reduce dot/line counts
on mobile, and MAY apply a small API-preserving edit to `ParticlesBackground.tsx` limited to: cancelling
the animation frame on unmount, skipping RAF under `prefers-reduced-motion`, and clamping dot/line counts
on mobile. The edit MUST NOT change the component's public props, exports, or rendered output shape. The
single instance SHOULD be a fixed background canvas behind content with `pointer-events-none`.
(Previously: the component edit was forbidden; reason for change — the RAF loop never cancels, so it leaks
across the long scroll and route changes. See `tasks.md` S2 / A1.)

#### Scenario: Single canvas

- GIVEN `/` is rendered
- WHEN the count of `canvas` elements is measured
- THEN at most one particle canvas is mounted
- AND it is `pointer-events-none`

#### Scenario: Animation frame does not leak

- GIVEN the particle canvas is mounted then unmounted (scroll past / route change)
- WHEN the component unmounts
- THEN the pending animation frame is cancelled
- AND no RAF callbacks compound across the scroll

#### Scenario: Reduced motion skips canvas work

- GIVEN `prefers-reduced-motion: reduce`
- WHEN the particle layer mounts
- THEN a static gradient is rendered with no RAF loop

## MODIFIED Requirements

### Requirement: Modal focus behaviour

Modals on `/` MUST trap focus, restore focus to the trigger on close, close on `Escape`, and lock
background scroll. This MUST be provided by a shared primitive extracted from the proven
`floorplan/standModal.tsx` + `useScrollLock.ts` pattern (reuse-first), OR by Radix Dialog if
`@radix-ui/react-dialog` is added.
(Previously: the pattern exists only inside the `/partners` floor-plan modal.)

#### Scenario: Keyboard stays inside modal

- GIVEN a modal is open
- WHEN the user presses Tab
- THEN focus cycles within the modal only
- AND Escape closes it and focus returns to the trigger

### Requirement: Accessibility structure

`/` MUST expose landmark regions (`header`/`nav`/`main`/`footer`), a skip-to-content link, and ARIA
labelling on interactive chrome.
(Previously: the legacy home had no skip link and no explicit landmark grouping.)

#### Scenario: Skip link is first tab stop

- GIVEN keyboard navigation from the top of the page
- WHEN the user presses Tab once
- THEN a "Saltar al contenido" link targeting `main` receives focus
