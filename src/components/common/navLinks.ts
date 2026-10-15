import { flags } from "@/config/flags"
import { CHAPTERS, GROUPS, PARTICIPAR, type ChapterGroup } from "@/components/common/chapters"

export interface NavLink {
  id: string
  label: string
}

/** A top-level sticky-menu entry. `links.length === 1` → plain link; otherwise a dropdown. */
export interface NavGroup {
  id: string
  label: string
  links: NavLink[]
}

/** Legacy `/` anchors, kept while the immersive home is flag-gated off. */
const LEGACY_LINKS: NavLink[] = [
  { id: "inicio", label: "Inicio" },
  { id: "actividades", label: "Actividades" },
  { id: "nosotros", label: "Nosotros" },
  { id: "ubicacion", label: "Ubicación" },
  { id: "roadmap", label: "Roadmap" },
  { id: "contacto", label: "Contacto" },
]

type GroupableChapter = { id: string; label: string; group: ChapterGroup }

const ALL_CHAPTERS: GroupableChapter[] = [...CHAPTERS, PARTICIPAR]

/** Immersive menu groups (spec §1). Chapters keep their own anchors; grouping only
 *  changes how the sticky menu presents them, so deep links keep working. */
const CHAPTER_GROUPS: NavGroup[] = GROUPS.map((group) => ({
  id: group.id,
  label: group.label,
  links: ALL_CHAPTERS.filter((chapter) => chapter.group === group.id).map((chapter) => ({
    id: chapter.id,
    label: chapter.label,
  })),
}))

/** Legacy stays flat: one single-link group per anchor renders exactly as before. */
const LEGACY_GROUPS: NavGroup[] = LEGACY_LINKS.map((link) => ({
  id: link.id,
  label: link.label,
  links: [link],
}))

/** The sticky-menu structure. Flag-aware so the chrome matches whichever home is serving. */
export const NAV_GROUPS: NavGroup[] = flags.homepageV2 ? CHAPTER_GROUPS : LEGACY_GROUPS

/** Flat anchor list (document order) for the footer and anything that needs every anchor. */
export const NAV_LINKS: NavLink[] = NAV_GROUPS.flatMap((group) => group.links)

/** Anchor ids for the scrollspy to observe. */
export const NAV_IDS: string[] = NAV_LINKS.map((link) => link.id)

export interface RouteLink {
  href: string
  label: string
}

/** Depth routes (spec publics-depth "Route inventory"): the long/legal content that lives on
 *  its own page instead of a modal. Consumed by the footer; the sticky menu stays in-page.
 *  TCST is gated by `tcstEnabled` because mentioning the token on the site is the legal gate. */
const DEPTH_LINKS_BASE: RouteLink[] = [
  { href: "/speakers", label: "Speakers" },
  { href: "/hackathon", label: "Hackathon" },
  { href: "/expo", label: "Expo" },
  { href: "/roadmap", label: "Roadmap" },
]

export const DEPTH_LINKS: RouteLink[] = flags.tcstEnabled
  ? [...DEPTH_LINKS_BASE, { href: "/tcst", label: "TCST" }]
  : DEPTH_LINKS_BASE
