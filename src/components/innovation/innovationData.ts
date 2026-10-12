/**
 * `#innovacion` chapter copy (brief §23 Ciencia + Empresa, §24 Interdisciplinariedad, §25 Think
 * Tank). Spanish, user-facing. Static narrative lives here; the Think Tank detail is a
 * `DetailContent` payload consumed by its modal, so the trigger file owns layout only.
 */

import type { DetailContent } from "@/components/common/modals/detailModal"

export const INNOVACION = {
  kicker: "Innovación",
  headline: "El futuro no pertenece a una sola disciplina.",
  lead: "La innovación nace cuando el conocimiento, la tecnología y el territorio se encuentran. Ciencia, empresas, educación y gobierno trabajando sobre un mismo desafío.",
} as const

export const CIENCIA_EMPRESA = {
  kicker: "Ciencia + Empresa",
  title: "Cuando el conocimiento encuentra un problema real.",
  flow: [
    "Investigación",
    "Descubrimiento",
    "Tecnología",
    "Innovación",
    "Empresa",
    "Empleo",
    "Desarrollo",
  ],
  lines: [
    "Cuando el conocimiento encuentra un problema real, puede convertirse en una solución.",
    "Cuando una solución encuentra una empresa, puede convertirse en innovación.",
    "Cuando la innovación encuentra talento, inversión y territorio, puede transformar una región.",
  ],
} as const

export const INTERDISCIPLINARIEDAD = {
  kicker: "Interdisciplinariedad",
  title: "Las grandes soluciones nacen de miradas distintas.",
  disciplines: [
    "Ciencia",
    "Ingeniería",
    "IA",
    "Diseño",
    "Economía",
    "Derecho",
    "Comunicación",
    "Educación",
    "Empresa",
    "Gobierno",
    "Tecnología",
  ],
  message:
    "Las grandes soluciones nacen cuando personas con conocimientos diferentes trabajan sobre un mismo desafío.",
} as const

export interface ThinkTankActor {
  name: string
  role: string
}

export const THINK_TANK: {
  kicker: string
  title: string
  subtitle: string
  actors: ThinkTankActor[]
} = {
  kicker: "Think Tank TCSUMMIT",
  title: "Ideas que se convierten en propuestas.",
  subtitle: "Grupos interdisciplinarios trabajando sobre desafíos concretos.",
  actors: [
    { name: "Ciencia", role: "Aporta conocimiento." },
    { name: "Tecnología", role: "Diseña soluciones." },
    { name: "Educación", role: "Transforma conocimiento en aprendizaje." },
    { name: "Empresas", role: "Aportan necesidades reales." },
    { name: "Gobierno", role: "Plantea desafíos territoriales." },
    { name: "Estudiantes", role: "Aportan creatividad y nuevas perspectivas." },
  ],
}

export const THINK_TANK_DETAIL: DetailContent = {
  eyebrow: "Think Tank TCSUMMIT",
  title: "Ideas que se convierten en propuestas.",
  body: "Un espacio de grupos interdisciplinarios donde cada actor aporta su mirada para convertir ideas en propuestas concretas.",
  itemsLabel: "Actores",
  items: THINK_TANK.actors.map((actor) => `${actor.name}: ${actor.role}`),
  footnote: "Ciencia · Tecnología · Educación · Empresas · Gobierno · Estudiantes.",
  cta: { label: "Quiero ser parte", href: "#participar" },
}
