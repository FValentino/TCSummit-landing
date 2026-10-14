/**
 * `#educacion` chapter copy (brief §17–§21). Spanish, user-facing. This module is the fold target
 * for `/estudiantes`: the students narrative (Hero/Introduction/Oportunities/Activities) migrates
 * here in S8, and the four `DetailContent` payloads below already carry the §18–§21 disclosures
 * (secundarios, universitarios, universidades, vocaciones).
 */

import type { DetailContent } from "@/components/common/modals/detailModal"

export const EDUCACION = {
  kicker: "Educación",
  headline: "El futuro tiene nombre y apellido.",
  subtitle: "Y puede estar hoy en un aula.",
  lead: "Miles de estudiantes tendrán la posibilidad de acercarse a nuevas tecnologías, descubrir profesiones, conocer investigadores, experimentar con herramientas y conversar con quienes están construyendo el futuro.",
} as const

export type EducationModalId = "estudiantes" | "universitarios" | "universidades" | "vocaciones"

export interface EducationTeaser {
  id: EducationModalId
  kicker: string
  headline: string
  body: string
  preview: readonly string[]
}

export const EDUCATION_TEASERS: EducationTeaser[] = [
  {
    id: "estudiantes",
    kicker: "Estudiantes secundarios",
    headline: "Descubrir. Experimentar. Crear. Elegir.",
    body: "Una experiencia especialmente diseñada para estudiantes del último año y jóvenes interesados en descubrir nuevas oportunidades académicas y profesionales.",
    preview: ["Descubrir", "Experimentar", "Crear", "Elegir"],
  },
  {
    id: "universitarios",
    kicker: "Universitarios",
    headline: "Conectar. Investigar. Emprender. Transformar.",
    body: "Un espacio para estudiantes universitarios que quieren llevar su formación más allá del aula y vincularse con empresas, investigadores y proyectos reales.",
    preview: [
      "Workshops",
      "Hackathons",
      "Networking",
      "Investigación",
      "Proyectos",
      "Innovación",
      "Emprendimiento",
      "Empresas",
    ],
  },
  {
    id: "universidades",
    kicker: "Universidades",
    headline: "El conocimiento no tiene fronteras.",
    body: "TechnoCrypto Summit conecta universidades, facultades, investigadores, docentes y estudiantes con empresas, instituciones y tecnologías emergentes.",
    preview: [
      "Investigación",
      "Divulgación",
      "Innovación",
      "Networking",
      "Transferencia",
      "Emprendimiento",
      "Talento",
      "Proyectos interdisciplinarios",
    ],
  },
  {
    id: "vocaciones",
    kicker: "Vocaciones científicas",
    headline: "Una experiencia puede cambiar una vocación.",
    body: "Un recorrido pensado para que las y los estudiantes descubran caminos que quizás todavía no imaginaban.",
    preview: [
      "Investigación",
      "Inteligencia artificial",
      "Robótica",
      "Ingeniería",
      "Biotecnología",
      "Emprender",
    ],
  },
]

export const ESTUDIANTES_DETAIL: DetailContent = {
  eyebrow: "Estudiantes secundarios",
  title: "Descubrir. Experimentar. Crear. Elegir.",
  body: "Una experiencia especialmente diseñada para estudiantes del último año y jóvenes interesados en descubrir nuevas oportunidades académicas y profesionales.",
  itemsLabel: "La experiencia",
  items: ["Descubrir", "Experimentar", "Crear", "Elegir"],
  cta: { label: "Quiero participar", href: "#participar" },
}

export const UNIVERSITARIOS_DETAIL: DetailContent = {
  eyebrow: "Universitarios",
  title: "Conectar. Investigar. Emprender. Transformar.",
  body: "Actividades para vincular la formación universitaria con empresas, investigadores y desafíos reales.",
  itemsLabel: "Actividades",
  items: [
    "Workshops",
    "Hackathons",
    "Networking",
    "Investigación",
    "Proyectos",
    "Innovación",
    "Emprendimiento",
    "Empresas",
  ],
  cta: { label: "Quiero participar", href: "#participar" },
}

export const UNIVERSIDADES_DETAIL: DetailContent = {
  eyebrow: "Universidades",
  title: "El conocimiento no tiene fronteras.",
  body: "TechnoCrypto Summit conecta universidades, facultades, investigadores, docentes y estudiantes con empresas, instituciones y tecnologías emergentes.",
  itemsLabel: "Áreas",
  items: [
    "Investigación",
    "Divulgación",
    "Innovación",
    "Networking",
    "Transferencia",
    "Emprendimiento",
    "Talento",
    "Proyectos interdisciplinarios",
  ],
  footnote: "Todas las disciplinas pueden formar parte del futuro.",
  cta: { label: "Quiero participar", href: "#participar" },
}

export const VOCACIONES_DETAIL: DetailContent = {
  eyebrow: "Vocaciones científicas",
  title: "Una experiencia puede cambiar una vocación.",
  body: "Seis preguntas que abren caminos: una experiencia puede ser el punto de partida de un futuro que todavía no estaba imaginado.",
  itemsLabel: "Preguntas",
  items: [
    "¿Qué pasa si un estudiante descubre la investigación?",
    "¿Qué pasa si descubre la inteligencia artificial?",
    "¿Qué pasa si descubre la robótica?",
    "¿Qué pasa si descubre la ingeniería?",
    "¿Qué pasa si descubre la biotecnología?",
    "¿Qué pasa si descubre que quiere crear una empresa?",
  ],
  footnote: "Tal vez el futuro de alguien comience en el Summit.",
  cta: { label: "Quiero participar", href: "#participar" },
}

/** Contact channel absorbed from the retired `/estudiantes` route (spec publics-depth). */
export const ESTUDIANTES_EMAIL = "estudiantes@tcsummit.net"

export const FOLD_CTA = "Quiero participar"

/** Folded `/estudiantes` narrative: the student CTA that used to live on its own route now
 *  renders inside `#educacion`, with the registration paths and the transport note preserved. */
export const EDUCATION_FOLD = {
  kicker: "Estudiantes",
  headline: "¿Sos estudiante secundario o universitario?",
  lead: "El futuro tiene nombre y apellido, y puede estar hoy en un aula. Charlas que inspiran, ciencia para experimentar y contacto directo con quienes construyen tecnología.",
  paths: [
    {
      title: "Registro institucional",
      body: "Tu colegio o facultad recibe un código de acceso para participar.",
    },
    {
      title: "Estudiante independiente",
      body: "Escribinos a estudiantes@tcsummit.net y te contamos cómo sumarte.",
    },
  ],
  note: "*Las plazas de transporte se asignan por orden de inscripción.",
} as const
