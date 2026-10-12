/**
 * Depth-route copy (brief §29 Speakers, §31 Hackathon, §32 Expo, §28/§55 TCST). Spanish,
 * user-facing. These pages own the long content that does not fit a modal (spec publics-depth
 * "Route inventory"); the homepage chapters link here. TCST copy is gated by `tcstEnabled` and
 * always ships with the §55 regulatory disclaimer.
 */

export interface DepthSection {
  heading: string
  body: string
  itemsLabel?: string
  items?: readonly string[]
}

export interface DepthContent {
  kicker: string
  title: string
  lead: string
  sections: readonly DepthSection[]
  cta: { label: string; href: string }
}

export const SPEAKERS_CONTENT: DepthContent = {
  kicker: "Speakers",
  title: "Las personas que están construyendo el futuro.",
  lead: "Investigadores, especialistas, fundadores y referentes comparten lo que saben. La grilla de oradores se confirma a medida que avanza la organización del Summit.",
  sections: [
    {
      heading: "Perfiles que vas a encontrar",
      body: "Un programa que cruza disciplinas y sectores.",
      itemsLabel: "Categorías",
      items: [
        "Ciencia — investigadores y científicos",
        "Tecnología — especialistas y desarrolladores",
        "IA — expertos",
        "Empresas — directivos e innovadores",
        "Startups — fundadores y emprendedores",
        "Educación — docentes y especialistas",
        "Gobierno — referentes de políticas públicas e innovación",
      ],
    },
  ],
  cta: { label: "Quiero ser parte", href: "/#participar" },
}

export const HACKATHON_CONTENT: DepthContent = {
  kicker: "Hackathon",
  title: "Una idea. Un equipo. Un desafío. Un prototipo.",
  lead: "Equipos interdisciplinarios resuelven desafíos reales con mentoría y foco en el prototipo, en un formato intensivo durante el Summit.",
  sections: [
    {
      heading: "Áreas de desafío",
      body: "Elegí dónde querés construir y sumate a un equipo.",
      itemsLabel: "Áreas",
      items: [
        "IA",
        "Blockchain",
        "Robótica",
        "Educación",
        "Ambiente",
        "Industria",
        "Ciudades",
        "Datos",
      ],
    },
  ],
  cta: { label: "Quiero participar", href: "/#participar" },
}

export const EXPO_CONTENT: DepthContent = {
  kicker: "Expo",
  title: "Tecnología que se puede ver, tocar y experimentar.",
  lead: "Empresas, startups, universidades e instituciones muestran lo que están construyendo, con demostraciones y prototipos abiertos al público.",
  sections: [
    {
      heading: "Quiénes participan",
      body: "Un piso de exhibición que conecta organizaciones con el público del Summit.",
      itemsLabel: "Participan",
      items: [
        "Empresas",
        "Startups",
        "Universidades",
        "Instituciones",
        "Centros de investigación",
        "Organizaciones",
      ],
    },
    {
      heading: "Qué vas a encontrar",
      body: "Demostraciones, prototipos y servicios en un mismo espacio.",
      itemsLabel: "En exhibición",
      items: [
        "Demostraciones",
        "Prototipos",
        "Productos",
        "Servicios",
        "Investigación",
        "Tecnologías emergentes",
      ],
    },
  ],
  cta: { label: "Quiero un stand", href: "/#participar" },
}

/** §55 — always visible on `/tcst`, regardless of the runtime flag. */
export const TCST_DISCLAIMER =
  "El alcance del token está sujeto al diseño técnico, jurídico y regulatorio correspondiente."

export const TCST_CONTENT: DepthContent = {
  kicker: "TCST",
  title: "El token que conecta aprendizaje, experiencia e innovación.",
  lead: "El ecosistema TCST busca explorar blockchain como herramienta educativa y experiencial.",
  sections: [
    {
      heading: "Cómo funciona",
      body: "Un recorrido pensado para aprender haciendo.",
      itemsLabel: "Recorrido",
      items: ["Aprender", "Participar", "Crear", "Desafiar", "Obtener reconocimiento"],
    },
  ],
  cta: { label: "Quiero ser parte", href: "/#participar" },
}

/** Shown while `tcstEnabled` is off: describes the proposal without publishing the token. */
export const TCST_NEUTRAL: DepthContent = {
  kicker: "TCST",
  title: "Una propuesta tecnológica y educativa en desarrollo.",
  lead: "Estamos definiendo el alcance de TCST. Su diseño técnico, jurídico y regulatorio se encuentra en evaluación.",
  sections: [],
  cta: { label: "Quiero ser parte", href: "/#participar" },
}
