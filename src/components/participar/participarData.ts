/**
 * `#participar` closing segment copy (brief §40 Gala/Sede and §42 CTA Final). Spanish,
 * user-facing. The venue detail is the spec-canonical M10 payload consumed by `venueModal`;
 * the final CTA itself is audience-segmented via `AudienceCta` in the chapter component.
 */

import type { DetailContent } from "@/components/common/modals/detailModal"

export const PARTICIPAR = {
  kicker: "Participar",
  headline: "¿Qué futuro querés construir?",
  lead: "Ciencia, tecnología, educación y territorio se encuentran en un mismo lugar. Sumate al TechnoCrypto Summit 2027.",
  punchline: "El futuro no es algo que va a suceder. Es algo que estamos creando hoy.",
} as const

export const GALA = {
  kicker: "Sede",
  title: "Centro de Convenciones Gala",
  headline: "7.650 m² para imaginar el futuro.",
  body: "Un espacio diseñado para vivir el Summit: escenario principal, expo, laboratorios y sectores pensados para encontrarse.",
  features: ["Escenario", "Distribución", "Accesos", "Sectores", "Experiencias"],
  closing: "Resistencia se convierte en el punto de encuentro.",
} as const

/** M10 — venue detail (spec publics-depth modal inventory). */
export const VENUE_DETAIL: DetailContent = {
  eyebrow: "Sede",
  title: "Centro de Convenciones Gala",
  subtitle: "Resistencia · Chaco · Argentina",
  body: "7.650 m² diseñados para vivir el Summit: un escenario principal, espacios de expo y laboratorio, y sectores pensados para encontrarse.",
  itemsLabel: "El espacio",
  items: GALA.features,
  footnote: GALA.closing,
  cta: { label: "Quiero ser parte", href: "#participar" },
}