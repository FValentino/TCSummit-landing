/**
 * Placeholder-first asset manifest — single source for media keys used by the
 * immersive `/` (§60/§61). Placeholders ship behind the homepage flag;
 * TODO_ASSETS tracks what still needs real production. Non-blocking.
 */

export type AssetKey =
  | "heroPoster"
  | "heroVideo"
  | "summit"
  | "ciencia"
  | "tecnologia"
  | "innovacion"
  | "educacion"
  | "experiencia"
  | "empresas"
  | "territorio"
  | "conicetLogo"

export interface AssetEntry {
  src: string
  /** Optional WebM alternative for video entries; browsers pick the first supported source. */
  srcWebm?: string
  /** Optional intrinsic width — enables aspect-ratio and the CLS budget. */
  width?: number
  /** Optional intrinsic height — enables aspect-ratio and the CLS budget. */
  height?: number
  /** Poster for video entries (hero). */
  poster?: string
  alt: string
}

const PLACEHOLDER = "" // real asset pending — see TODO_ASSETS

export const assets: Record<AssetKey, AssetEntry> = {
  heroPoster: {
    src: PLACEHOLDER,
    width: 1600,
    height: 900,
    alt: "TCSummit 2027 — próxima edición",
  },
  heroVideo: {
    src: "/videos/header/backgroundMP4.mp4",
    srcWebm: "/videos/header/backgroundWEBM.webm",
    alt: "Video de apertura TCSummit 2027",
  },
  summit: { src: PLACEHOLDER, alt: "TCSummit 2027 — el evento" },
  ciencia: { src: PLACEHOLDER, alt: "Ciencia — sistema científico-tecnológico" },
  tecnologia: { src: PLACEHOLDER, alt: "Tecnología — inteligencia artificial y blockchain" },
  innovacion: { src: PLACEHOLDER, alt: "Innovación — laboratorio de futuro" },
  educacion: { src: PLACEHOLDER, alt: "Educación — formación y estudiantes" },
  experiencia: { src: PLACEHOLDER, alt: "Experiencia — vivencia TCSummit" },
  empresas: { src: PLACEHOLDER, alt: "Empresas — sponsorship" },
  territorio: { src: PLACEHOLDER, alt: "Territorio — articulación público-privada" },
  conicetLogo: { src: PLACEHOLDER, alt: "Sistema científico-tecnológico" },
}

/**
 * TODO(assets): keys awaiting real media production — the §60/§61 launch gate.
 * Non-blocking: placeholders ship behind the homepage flag; this list blocks
 * launch polish, never the build.
 */
export const TODO_ASSETS: AssetKey[] = [
  "heroPoster",
  "summit",
  "ciencia",
  "tecnologia",
  "innovacion",
  "educacion",
  "experiencia",
  "empresas",
  "territorio",
  "conicetLogo",
]