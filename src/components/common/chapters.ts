/**
 * Single source of truth for the immersive `/` chapter set (spec §1): anchor
 * order, sticky-menu labels (Spanish, user-facing), and audience→chapter
 * priority. Consumed by the page shell, scrollspy menu, and chapter components.
 */

import type { AudienceMode } from "@/components/publics/audienceData"

export interface Chapter {
  id: string
  /** Sticky-menu label (Spanish UI copy). */
  label: string
  /** Publics promoted by this chapter (empty → neutral, no promotion). */
  prioritizedAudiences: AudienceMode[]
}

export const CHAPTERS: Chapter[] = [
  { id: "hero", label: "Inicio", prioritizedAudiences: [] },
  { id: "summit", label: "El Summit", prioritizedAudiences: [] },
  { id: "ciencia", label: "Ciencia", prioritizedAudiences: ["institucion", "gobierno"] },
  { id: "tecnologia", label: "Tecnología", prioritizedAudiences: ["empresa", "institucion"] },
  { id: "innovacion", label: "Innovación", prioritizedAudiences: ["empresa", "institucion", "gobierno"] },
  { id: "educacion", label: "Educación", prioritizedAudiences: ["asistente", "institucion"] },
  { id: "experiencia", label: "Experiencia", prioritizedAudiences: ["asistente"] },
  { id: "empresas", label: "Empresas", prioritizedAudiences: ["empresa"] },
  { id: "territorio", label: "Territorio", prioritizedAudiences: ["gobierno", "institucion"] },
]

export const PARTICIPAR = { id: "participar", label: "Participar" } as const

/** Full anchor order including the closing segment (spec §1 composition). */
export const ANCHOR_ORDER: string[] = [...CHAPTERS.map((chapter) => chapter.id), PARTICIPAR.id]