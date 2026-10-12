import { flags } from "@/config/flags"
import { CHAPTERS, PARTICIPAR } from "@/components/common/chapters"

export interface NavLink {
  id: string
  label: string
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

/** Immersive chapter anchors (spec §1), plus the closing segment. */
const CHAPTER_LINKS: NavLink[] = [
  ...CHAPTERS.map((chapter) => ({ id: chapter.id, label: chapter.label })),
  { id: PARTICIPAR.id, label: PARTICIPAR.label },
]

/** The sticky-menu and footer link set. Flag-aware so the chrome matches whichever home is
 *  serving — legacy anchors while `homepage-v2` is off, the immersive chapters once it is on.
 *  Single source so menu and footer can never drift apart. */
export const NAV_LINKS: NavLink[] = flags.homepageV2 ? CHAPTER_LINKS : LEGACY_LINKS

/** Anchor ids for the scrollspy to observe, in visual order. */
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
]

export const DEPTH_LINKS: RouteLink[] = flags.tcstEnabled
  ? [...DEPTH_LINKS_BASE, { href: "/tcst", label: "TCST" }]
  : DEPTH_LINKS_BASE
