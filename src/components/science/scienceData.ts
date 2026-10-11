/**
 * `#ciencia` chapter copy (brief §13–§16). Spanish, user-facing. Static narrative lives here so the
 * server section renders text without JS; the Science Hub (§15) and Future Lab (§16) details are
 * `DetailContent` payloads consumed by the M2/M3 modals.
 */

import type { DetailContent } from "@/components/common/modals/detailModal"

export interface ScienceTeaser {
  id: "hub" | "lab"
  kicker: string
  headline: string
  body: string
  preview: readonly string[]
}

export const CIENCIA = {
  kicker: "Ciencia en TechnoCrypto Summit",
  headline: "El conocimiento que transforma el futuro.",
  lead: "La ciencia es el punto de partida de muchas de las transformaciones que están cambiando nuestra sociedad. TechnoCrypto Summit suma un espacio dedicado a la investigación, la divulgación científica, la innovación y la transferencia de conocimiento: un lugar donde investigadores, estudiantes, universidades, empresas y comunidad se encuentran.",
  pillars: [
    "Ciencia que se comparte.",
    "Ciencia que se experimenta.",
    "Ciencia que se conecta.",
    "Ciencia que transforma.",
  ],
} as const

export const SCIENCE_TEASERS: ScienceTeaser[] = [
  {
    id: "hub",
    kicker: "Science Hub",
    headline: "Donde la ciencia sale del laboratorio.",
    body: "Un espacio diseñado para descubrir la ciencia de una manera diferente. No solamente observar: ver, preguntar, experimentar, descubrir.",
    preview: [
      "Inteligencia Artificial",
      "Robótica",
      "Biotecnología",
      "Nanotecnología",
      "Energía",
      "Salud",
    ],
  },
  {
    id: "lab",
    kicker: "Future Lab",
    headline: "Las ideas que pueden cambiar mañana comienzan hoy.",
    body: "Un laboratorio abierto de innovación donde estudiantes, investigadores, universidades, empresas, emprendedores y profesionales pasan de un desafío a una solución con impacto.",
    preview: ["Desafío", "Idea", "Equipo", "Prototipo", "Solución", "Impacto"],
  },
]

export const SCIENCE_HUB_DETAIL: DetailContent = {
  eyebrow: "Science Hub",
  title: "Donde la ciencia sale del laboratorio.",
  body: "Un espacio para descubrir la ciencia de otra manera. No solamente observar: ver, preguntar, experimentar y descubrir. Trece áreas para recorrer, tocar y entender.",
  itemsLabel: "Áreas",
  items: [
    "Inteligencia Artificial",
    "Robótica",
    "Biotecnología",
    "Nanotecnología",
    "Ambiente",
    "Energía",
    "Salud",
    "Materiales",
    "Astronomía",
    "Datos",
    "Computación",
    "Agroindustria",
    "Tecnologías emergentes",
  ],
  cta: { label: "Quiero ser parte", href: "#participar" },
}

export const FUTURE_LAB_DETAIL: DetailContent = {
  eyebrow: "Future Lab",
  title: "Las ideas que pueden cambiar mañana comienzan hoy.",
  body: "Un laboratorio abierto de innovación. Equipos mixtos de estudiantes, investigadores, universidades, empresas, emprendedores y profesionales recorren el camino completo: del desafío al impacto.",
  itemsLabel: "Proceso",
  items: ["Desafío", "Idea", "Equipo", "Prototipo", "Solución", "Impacto"],
  footnote: "El futuro no se aprende solamente escuchando. Se aprende haciendo.",
  cta: { label: "Quiero ser parte", href: "#participar" },
}

export const CONICET_BLOCK = {
  neutral: {
    title: "Ciencia argentina en TechnoCrypto Summit",
    body: "Trabajamos para articular con el sistema científico-tecnológico nacional: investigadores, institutos y proyectos compartiendo el espacio con estudiantes, universidades y empresas.",
  },
  authorized: {
    title: "CONICET en TechnoCrypto Summit 2027",
    body: "Ciencia argentina mirando hacia el futuro: identificación institucional, investigadores, institutos, proyectos, actividades, demostraciones y charlas, con vínculo directo con estudiantes, empresas y universidades.",
  },
} as const
