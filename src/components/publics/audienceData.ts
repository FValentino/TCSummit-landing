/**
 * Audience model for the 4-public selector (spec audience-selection): options,
 * neutral default, and per-public CTA segmentation. User-facing strings are
 * Spanish (project convention).
 */

export type AudienceMode = "asistente" | "empresa" | "institucion" | "gobierno"

export type AudienceModalId = "M7" | "M8" | "M9"

export interface AudienceDescriptor {
  id: AudienceMode
  /** Selector chip label. */
  label: string
  /** Primary CTA label for the selected public. */
  cta: string
  /** Route target when the CTA deep-links (empresa → /partners). */
  ctaHref?: string
  /** Lead-form modal opened by the CTA (wired in S7). */
  modal: AudienceModalId
}

/** TODO(launch): confirmed ticket URL. */
export const TICKET_URL = "#"

export const AUDIENCES: AudienceDescriptor[] = [
  {
    id: "asistente",
    label: "Quiero asistir",
    cta: "Comprar entradas",
    ctaHref: TICKET_URL,
    modal: "M7",
  },
  {
    id: "empresa",
    label: "Soy empresa",
    cta: "Quiero ser sponsor",
    ctaHref: "/partners",
    modal: "M8",
  },
  {
    id: "institucion",
    label: "Soy institución",
    cta: "Vincular mi institución",
    modal: "M9",
  },
  {
    id: "gobierno",
    label: "Represento al sector público",
    cta: "Articular con el Summit",
    modal: "M9",
  },
]

export const AUDIENCE_PARAM = "publico"
export const AUDIENCE_STORAGE_KEY = "tcs:publico"

/** Validates raw URL/localStorage input; never throws, invalid input → null. */
export function parseAudienceMode(raw: string | null | undefined): AudienceMode | null {
  if (!raw) return null
  return AUDIENCES.some((audience) => audience.id === raw) ? (raw as AudienceMode) : null
}