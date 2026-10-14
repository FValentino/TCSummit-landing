# Delta for lead-forms

## ADDED Requirements

### Requirement: Three isolated forms

The site MUST expose three SEPARATE conversion forms — Asistente (§51), Empresa (§52), Institucional
(§53) — each in its own modal (M7/M8/M9). Publics MUST NOT be merged into one form.

#### Scenario: One public per form

- GIVEN the three modals
- WHEN a user opens each
- THEN each collects only its public's fields
- AND no form mixes asistente, empresa, and institucional fields

### Requirement: Separate schemas

Each form MUST own a dedicated zod schema (mirroring `contactSchema`/`partnersContactSchema`); schemas
MUST NOT be merged into a single union.

#### Scenario: Validation is per-form

- GIVEN the Empresa form
- WHEN required fields are missing
- THEN Spanish validation messages render inline
- AND submission is blocked

### Requirement: Server actions

Each form MUST submit via a Next.js server action. The Empresa form SHOULD reuse/compose
`partnersContactSchema` + `partnersContactEmail`; Asistente and Institucional MUST each get their own
action. All actions MUST escape user HTML and send via `@/lib/email` (Mailjet).

#### Scenario: Successful submit

- GIVEN a valid Asistente form
- WHEN it is submitted
- THEN the action validates server-side
- AND an email is sent via Mailjet
- AND the user sees a Spanish success state

#### Scenario: Invalid payload rejected server-side

- GIVEN a tampered payload
- WHEN the action runs
- THEN `safeParse` fails
- AND no email is sent

### Requirement: Form accessibility

Every field MUST have an associated label and error announcement, MUST be keyboard-operable, and the
owning modal MUST trap focus while open.

#### Scenario: Error is announced

- GIVEN an invalid field
- WHEN submit is pressed
- THEN the error is programmatically associated with the field
- AND focus moves to the first invalid field
