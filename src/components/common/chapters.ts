/**
 * Single source of truth for the immersive `/` chapter set (spec §1): anchor
 * order, sticky-menu labels (Spanish, user-facing), audience→chapter priority,
 * and the menu grouping that keeps the sticky menu short. Consumed by the page
 * shell, scrollspy menu, and chapter components.
 */

import type { AudienceMode } from "@/components/publics/audienceData"

/** Menu group keys. The sticky menu renders one top-level item per group; groups
 *  with a single chapter render as a plain link, the rest as a dropdown. */
export type ChapterGroup = "inicio" | "summit" | "ejes" | "publicos" | "participar"

export interface Chapter {
  id: string
  /** Sticky-menu label (Spanish UI copy). */
  label: string
  /** Publics promoted by this chapter (empty → neutral, no promotion). */
  prioritizedAudiences: AudienceMode[]
  /** Which top-level menu group this chapter belongs to. */
  group: ChapterGroup
}

/** Chapters in visual (document) order. `group` is only a navigation-layer concern —
 *  each chapter keeps its own `section[id]`, so anchors, scrollspy and deep links are
 *  unaffected by grouping. */
export const CHAPTERS: Chapter[] = [
  { id: "hero", label: "Inicio", prioritizedAudiences: [], group: "inicio" },
  { id: "summit", label: "El Summit", prioritizedAudiences: [], group: "summit" },
  { id: "equipo", label: "Equipo", prioritizedAudiences: [], group: "summit" },
  { id: "ciencia", label: "Ciencia", prioritizedAudiences: ["institucion", "gobierno"], group: "ejes" },
  { id: "tecnologia", label: "Tecnología", prioritizedAudiences: ["empresa", "institucion"], group: "ejes" },
  { id: "innovacion", label: "Innovación", prioritizedAudiences: ["empresa", "institucion", "gobierno"], group: "ejes" },
  { id: "educacion", label: "Educación", prioritizedAudiences: ["asistente", "institucion"], group: "ejes" },
  { id: "experiencia", label: "Experiencia", prioritizedAudiences: ["asistente"], group: "summit" },
  { id: "empresas", label: "Empresas", prioritizedAudiences: ["empresa"], group: "publicos" },
  { id: "territorio", label: "Territorio", prioritizedAudiences: ["gobierno", "institucion"], group: "publicos" },
]

export const PARTICIPAR = { id: "participar", label: "Participar", group: "participar" } as const

export interface NavGroupDef {
  id: ChapterGroup
  /** Top-level menu label (Spanish UI copy). */
  label: string
}

/** Top-level menu groups, in menu order. */
export const GROUPS: NavGroupDef[] = [
  { id: "inicio", label: "Inicio" },
  { id: "summit", label: "El Summit" },
  { id: "ejes", label: "Ejes temáticos" },
  { id: "publicos", label: "Públicos" },
  { id: "participar", label: "Participar" },
]

/** Full anchor order including the closing segment, in document order (spec §1 composition). */
export const ANCHOR_ORDER: string[] = [...CHAPTERS.map((chapter) => chapter.id), PARTICIPAR.id]
