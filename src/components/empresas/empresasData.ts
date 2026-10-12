/**
 * `#empresas` chapter copy (brief §22 "Empresas" and §39 "Sponsors"). Spanish, user-facing. The
 * §22 block sells six concrete ways to participate; the §39 block sells sponsorship as value
 * (visibilidad, experiencia, talento…) with a `DetailContent` payload consumed by
 * `sponsorsDetailModal` when the visitor asks for depth.
 */

import type { DetailContent } from "@/components/common/modals/detailModal"

export const EMPRESAS = {
  kicker: "Empresas",
  headline: "El futuro también se construye en las empresas.",
  lead: "Participar es mostrar, conectar, innovar, detectar, desarrollar e incorporar: el Summit conecta tu organización con el talento y el conocimiento que la hacen crecer.",
} as const

export interface EmpresaBenefit {
  verb: string
  body: string
}

export const EMPRESA_BENEFITS: EmpresaBenefit[] = [
  { verb: "Mostrar", body: "Tecnologías y soluciones." },
  { verb: "Conectar", body: "Con talento." },
  { verb: "Innovar", body: "Con universidades e investigadores." },
  { verb: "Detectar", body: "Nuevas oportunidades." },
  { verb: "Desarrollar", body: "Alianzas estratégicas." },
  { verb: "Incorporar", body: "Talento." },
]

/** Empresa CTA — the M8 lead form lands in S7; until then it targets the closing segment. */
export const EMPRESA_CTA = {
  label: "Quiero participar como empresa",
  href: "#participar",
} as const

export const SPONSORS = {
  kicker: "Sponsors",
  headline: "Tu marca también puede ser parte del futuro.",
  lead: "No es solo una tabla de precios: es visibilidad, experiencia, talento, innovación, networking y posicionamiento junto a la comunidad que construye el futuro.",
} as const

export const SPONSOR_BENEFITS: string[] = [
  "Visibilidad",
  "Experiencia",
  "Talento",
  "Innovación",
  "Networking",
  "Posicionamiento",
]

/** Sponsor CTA — routes to the existing `/partners` sponsorship depth (design D2). */
export const SPONSORS_CTA = {
  label: "Quiero ser sponsor",
  href: "/partners",
} as const

export const SPONSORS_DETAIL: DetailContent = {
  eyebrow: "Sponsors",
  title: "Tu marca también puede ser parte del futuro.",
  body: "Asociar tu marca al Summit es formar parte de la comunidad de ciencia, tecnología, innovación y educación del Nordeste argentino, con proyección nacional y regional.",
  itemsLabel: "Lo que tu marca se lleva",
  items: SPONSOR_BENEFITS,
  footnote: "Niveles y beneficios en la propuesta de sponsors.",
  cta: SPONSORS_CTA,
}