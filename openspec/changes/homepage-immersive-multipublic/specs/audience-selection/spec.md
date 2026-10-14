# Delta for audience-selection

## ADDED Requirements

### Requirement: Four-public selector

`/` MUST present a segmented selector with exactly four options near the hero:
`Quiero asistir` (Asistente), `Soy empresa` (Empresa), `Soy institución` (Institución),
`Represento al sector público` (Gobierno). The default MUST be neutral (no option selected).

#### Scenario: Neutral default

- GIVEN a first-time visitor
- WHEN `/` loads
- THEN no chip is selected
- AND all base CTAs are shown

#### Scenario: Selecting prioritizes without hiding

- GIVEN the selector is visible
- WHEN the user selects `Soy empresa`
- THEN Empresa-priority chapters are visually promoted
- AND every chapter remains reachable (none hidden)

### Requirement: CTA segmentation

The hero, final, and floating CTAs MUST render the selected public's action; with no selection the
neutral base CTAs MUST show.

| Public | CTA | Target |
| --- | --- | --- |
| Asistente | `Comprar entradas` | ticket link + modal M7 |
| Empresa | `Quiero ser sponsor` | `/partners` + modal M8 |
| Institución | `Vincular mi institución` | modal M9 |
| Gobierno | `Articular con el Summit` | modal M9 (variant) |

#### Scenario: CTA follows selection

- GIVEN the user selects `Soy empresa`
- WHEN the hero CTA renders
- THEN it reads `Quiero ser sponsor`
- AND it links to `/partners`

### Requirement: Selection persistence

Selection MUST mirror to the URL as `?publico={asistente|empresa|institucion|gobierno}` AND to
`localStorage`; a shared URL MUST restore the mode on load. No server state.

#### Scenario: Shared link restores mode

- GIVEN a URL `/?publico=gobierno`
- WHEN a new visitor opens it
- THEN `Represento al sector público` is active
- AND Gobierno CTAs render

#### Scenario: Invalid param falls back neutral

- GIVEN `?publico=foo`
- WHEN `/` loads
- THEN the selector stays neutral
- AND no error is thrown

### Requirement: Keyboard-operable selector

The selector MUST be keyboard-operable (arrow keys within the group, roving tabindex), MUST expose
ARIA radiogroup semantics, and MUST be labelled in Spanish.

#### Scenario: Arrow-key navigation

- GIVEN focus is on the selector
- WHEN the user presses ArrowRight
- THEN focus/selection moves to the next public
- AND the active public is announced
