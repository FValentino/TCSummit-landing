/**
 * `#territorio` chapter copy (brief §34 Chaco, §35 Argentina, §36 Latinoamérica, §37 Impacto,
 * §38 Gobierno). Spanish, user-facing. Impact counters keep `value: null` — the §37 data gate
 * (`flags.metricsConfirmed`) decides whether anything is rendered; numbers are never invented.
 */

export const TERRITORIO = {
  kicker: "Territorio",
  headline: "El futuro también se construye desde aquí.",
  lead: "El Summit nace en Resistencia y proyecta al Chaco, al Nordeste argentino y a Latinoamérica como protagonistas de la economía del conocimiento.",
} as const

export const CHACO = {
  title: "Chaco",
  headline: "Territorio de ciencia, tecnología e innovación.",
  body: "Resistencia será el punto de encuentro de estudiantes, investigadores, universidades, empresas, emprendedores, profesionales e instituciones. TechnoCrypto Summit busca contribuir al posicionamiento del Chaco y del Nordeste argentino como protagonistas de la economía del conocimiento.",
  levels: ["Resistencia", "Nordeste", "Argentina", "Latinoamérica"],
  closing: "El futuro también se construye desde aquí.",
} as const

export const ARGENTINA = {
  headline: "Argentina tiene talento.",
  subtitle: "Y el talento necesita encuentros.",
  nodes: [
    "Universidades",
    "Laboratorios",
    "Empresas",
    "Startups",
    "Escuelas",
    "Investigadores",
    "Instituciones",
    "Personas",
  ],
} as const

export const LATINOAMERICA = {
  headline: "El futuro no tiene fronteras.",
  countries: ["Argentina", "Paraguay", "Uruguay", "Chile", "Brasil", "Bolivia"],
  message:
    "TechnoCrypto Summit proyecta construir una comunidad regional donde ciencia, tecnología, innovación, educación y emprendimiento puedan encontrarse.",
} as const

export interface ImpactCounter {
  id: string
  label: string
  caption: string
  /** Confirmed figure; null until the §37 data source is locked. */
  value: number | null
}

export const IMPACTO = {
  kicker: "Impacto",
  headline: "Más que un evento. Una plataforma de impacto.",
  pendingNote: "Los números se publican cuando estén confirmados.",
} as const

export const IMPACT_COUNTERS: ImpactCounter[] = [
  { id: "educacion", label: "Educación", caption: "Estudiantes alcanzados", value: null },
  { id: "ciencia", label: "Ciencia", caption: "Investigadores e instituciones", value: null },
  { id: "talento", label: "Talento", caption: "Personas conectadas", value: null },
  { id: "innovacion", label: "Innovación", caption: "Proyectos y desafíos", value: null },
  { id: "empresas", label: "Empresas", caption: "Organizaciones participantes", value: null },
  { id: "territorio", label: "Territorio", caption: "Impacto económico y turístico", value: null },
]

export const GOBIERNO = {
  headline: "Cuando todo el ecosistema trabaja junto, el impacto es mayor.",
  body: "TechnoCrypto Summit propone un espacio de articulación entre instituciones públicas, sistema científico, universidades, empresas, emprendedores y comunidad.",
  quote: "Los grandes desafíos no se resuelven desde un solo sector.",
} as const