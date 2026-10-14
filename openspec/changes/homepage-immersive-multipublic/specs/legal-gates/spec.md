# Delta for legal-gates

## ADDED Requirements

### Requirement: CONICET communication gate

Until formal authorization, the CONICET block MUST render only the neutral placeholder
`Sistema científico-tecnológico`. It MUST NOT display the CONICET logo or name as
present/partner/sponsor. Advancement MUST be driven by a feature flag covering §56 stages 1–5.

#### Scenario: Stage 1–2 renders placeholder

- GIVEN the CONICET flag at stage 1–2
- WHEN `#ciencia` renders
- THEN the block shows `Sistema científico-tecnológico`
- AND no CONICET logo or name appears

#### Scenario: Stage 4–5 authorized content

- GIVEN the flag at stage 4–5
- WHEN the block renders
- THEN logo + institutional name MAY render
- AND copy follows the approved institutional description

### Requirement: TCST legal gate

Any TCST mention MUST live on `/tcst` (a route, not a modal) and MUST NOT read as investment,
guaranteed return, financial instrument, speculative asset, or enrichment mechanism (§55). The
disclaimer `sujeto al diseño técnico, jurídico y regulatorio correspondiente` MUST be always visible
on `/tcst`.

#### Scenario: Disclaimer always present

- GIVEN `/tcst` renders
- WHEN the user reads the token section
- THEN the regulatory disclaimer is visible

#### Scenario: Forbidden framing blocked

- GIVEN any TCST copy (chapter teaser or `/tcst`)
- WHEN it is reviewed
- THEN no promise of rentabilidad, inversión, or speculation appears

### Requirement: Metric counters data gate

Impact counters (§37) MUST render only from a confirmed data source; with no confirmed numbers they
MUST render hidden/empty — never invented values.

#### Scenario: No invented metrics

- GIVEN the metrics module has no confirmed values
- WHEN the Impacto chapter renders
- THEN counters are hidden or empty
- AND no fabricated number is displayed
