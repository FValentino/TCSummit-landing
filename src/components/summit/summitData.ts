/**
 * `#summit` chapter copy + the six universes (brief §11/§12). Each universe is a modal entry
 * (M1) rendered from this data. Spanish, user-facing.
 */

export interface Universe {
  id: string
  number: string
  title: string
  tagline: string
  /** Longer body shown in the universe detail modal. */
  detail: string
}

export const SUMMIT = {
  kicker: "El Summit",
  headline: "No es una conferencia. Es una experiencia.",
  lead: "TechnoCrypto Summit 2027 es un gran encuentro de ciencia, tecnología, inteligencia artificial, blockchain, innovación y educación. Durante tres días, estudiantes, investigadores, universidades, empresas, emprendedores, profesionales, instituciones y público general comparten conocimiento, experiencias y oportunidades.",
  objectiveTitle: "El objetivo",
  objectives: [
    "Conectar personas",
    "Conectar conocimiento",
    "Conectar instituciones",
    "Conectar tecnología",
    "Conectar oportunidades",
  ],
  objectiveClosing: "Y generar nuevas posibilidades para el futuro.",
  universesTitle: "Los seis universos",
  universesLead: "Seis grandes bloques para explorar, cada uno con su propia comunidad, tecnología y oportunidades.",
} as const

export const UNIVERSES: Universe[] = [
  {
    id: "ciencia",
    number: "01",
    title: "Ciencia",
    tagline: "Investigación · conocimiento · descubrimiento",
    detail:
      "Un espacio dedicado a la investigación, la divulgación científica y la transferencia de conocimiento, donde investigadores, universidades y comunidad se encuentran.",
  },
  {
    id: "inteligencia-artificial",
    number: "02",
    title: "Inteligencia Artificial",
    tagline: "IA generativa · datos · automatización · robótica",
    detail:
      "Demostraciones y charlas sobre IA generativa, ciencia de datos, automatización y robótica aplicadas a la industria y a la vida cotidiana.",
  },
  {
    id: "tecnologia",
    number: "03",
    title: "Tecnología",
    tagline: "Software · hardware · transformación digital",
    detail:
      "El estado del arte en software, hardware y transformación digital, con casos reales de empresas y equipos que ya están construyendo el futuro.",
  },
  {
    id: "blockchain",
    number: "04",
    title: "Blockchain",
    tagline: "Web3 · tokenización · smart contracts · activos digitales",
    detail:
      "Web3, tokenización, smart contracts y activos digitales explicados sin humo: qué es real hoy, qué viene y cómo impacta en la economía.",
  },
  {
    id: "innovacion",
    number: "05",
    title: "Innovación",
    tagline: "Startups · emprendimiento · inversión · transferencia tecnológica",
    detail:
      "Startups, emprendimiento, inversión y transferencia tecnológica: el puente entre una idea y un proyecto que escala.",
  },
  {
    id: "educacion",
    number: "06",
    title: "Educación",
    tagline: "Estudiantes · universidades · investigadores · talento",
    detail:
      "El futuro tiene nombre y apellido, y puede estar hoy en un aula. Estudiantes, universidades, investigadores y talento en formación, conectados con el ecosistema.",
  },
]
