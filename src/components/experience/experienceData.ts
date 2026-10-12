/**
 * `#experiencia` chapter copy (brief §30 "Experiencia"). Spanish, user-facing. The event map is a
 * set of elements — escenario, hub, lab, expo, hackathon… — and each one carries its own
 * `DetailContent`, so `experienceMapElementModal` (M4) only binds the active element to the shared
 * `DetailModal` and the chapter keeps control of its own layout.
 */

import type { DetailContent } from "@/components/common/modals/detailModal"

export const EXPERIENCIA = {
  kicker: "Experiencia",
  headline: "Tres días. Un ecosistema.",
  lead: "El Summit es un recorrido: un escenario, laboratorios, expo, hackathon y espacios para encontrarse. Cada elemento del mapa abre su propia historia.",
} as const

export interface ExperienceElement {
  id: string
  label: string
  /** Short line shown on the map card. */
  teaser: string
  detail: DetailContent
}

export const EXPERIENCE_ELEMENTS: ExperienceElement[] = [
  {
    id: "escenario",
    label: "Escenario principal",
    teaser: "Las ideas que abren el futuro.",
    detail: {
      eyebrow: "Experiencia",
      title: "Escenario principal",
      body: "Charlas y paneles que ponen ciencia, tecnología, inteligencia artificial, blockchain, innovación y educación sobre un mismo escenario.",
      itemsLabel: "Qué vas a encontrar",
      items: ["Charlas magistrales", "Paneles", "Entrevistas", "Anuncios"],
      cta: { label: "Quiero ser parte", href: "#participar" },
    },
  },
  {
    id: "science-hub",
    label: "Science Hub",
    teaser: "Donde la ciencia sale del laboratorio.",
    detail: {
      eyebrow: "Experiencia",
      title: "Science Hub",
      body: "Un espacio para ver, preguntar, experimentar y descubrir la ciencia de una manera diferente.",
      itemsLabel: "Áreas",
      items: [
        "Inteligencia artificial",
        "Robótica",
        "Biotecnología",
        "Nanotecnología",
        "Ambiente",
        "Energía",
        "Salud",
        "Astronomía",
      ],
      cta: { label: "Quiero ser parte", href: "#participar" },
    },
  },
  {
    id: "future-lab",
    label: "Future Lab",
    teaser: "Las ideas que pueden cambiar mañana.",
    detail: {
      eyebrow: "Experiencia",
      title: "Future Lab",
      body: "Un laboratorio abierto donde estudiantes, investigadores, universidades, empresas y emprendedores convierten desafíos en prototipos.",
      itemsLabel: "El proceso",
      items: ["Desafío", "Idea", "Equipo", "Prototipo", "Solución", "Impacto"],
      footnote: "El futuro no se aprende solamente escuchando: se aprende haciendo.",
      cta: { label: "Quiero ser parte", href: "#participar" },
    },
  },
  {
    id: "expo",
    label: "Expo",
    teaser: "Tecnología que se puede ver y tocar.",
    detail: {
      eyebrow: "Experiencia",
      title: "Expo",
      body: "Empresas, startups, universidades e instituciones muestran prototipos, productos y tecnologías emergentes.",
      itemsLabel: "Participan",
      items: ["Empresas", "Startups", "Universidades", "Centros de investigación"],
      cta: { label: "Ver la Expo", href: "/expo" },
    },
  },
  {
    id: "hackathon",
    label: "Hackathon",
    teaser: "Una idea. Un equipo. Un prototipo.",
    detail: {
      eyebrow: "Experiencia",
      title: "Hackathon",
      body: "Equipos que resuelven desafíos reales en pocas horas, con mentoría y foco en el prototipo.",
      itemsLabel: "Áreas",
      items: ["IA", "Blockchain", "Robótica", "Educación", "Ambiente", "Ciudades", "Datos"],
      cta: { label: "Ver la Hackathon", href: "/hackathon" },
    },
  },
  {
    id: "workshops",
    label: "Workshops",
    teaser: "Aprender haciendo, con las manos.",
    detail: {
      eyebrow: "Experiencia",
      title: "Workshops",
      body: "Talleres prácticos para aprender herramientas concretas junto a quienes las usan todos los días.",
      itemsLabel: "Formato",
      items: ["Grupos reducidos", "Manos a la obra", "Mentoría", "Certificado de participación"],
      cta: { label: "Quiero ser parte", href: "#participar" },
    },
  },
  {
    id: "networking",
    label: "Networking",
    teaser: "Las conexiones pueden cambiarlo todo.",
    detail: {
      eyebrow: "Experiencia",
      title: "Networking",
      body: "Una conversación puede generar una idea, una idea un proyecto y un proyecto una empresa.",
      itemsLabel: "Se conectan",
      items: ["Personas", "Empresas", "Universidades", "Investigadores", "Proyectos"],
      footnote: "Todo puede comenzar con una conexión.",
      cta: { label: "Quiero ser parte", href: "#participar" },
    },
  },
  {
    id: "interactivas",
    label: "Experiencias interactivas",
    teaser: "El futuro que se puede experimentar.",
    detail: {
      eyebrow: "Experiencia",
      title: "Experiencias interactivas",
      body: "Instalaciones, demostraciones y recorridos inmersivos para acercarse a la tecnología de una forma distinta.",
      itemsLabel: "Incluye",
      items: ["Instalaciones", "Demostraciones", "Recorridos inmersivos", "Realidad extendida"],
      cta: { label: "Quiero ser parte", href: "#participar" },
    },
  },
]
