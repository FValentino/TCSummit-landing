import type { PriceStage, Stand, StandCategory, StandStatus, ZoneId } from "./floorplanData"

export const SECTION_COPY = {
  eyebrow: "Mapa de stands",
  title: "Explorá el plano del recinto",
  subtitle:
    "130 espacios de exhibición listos para tu marca. Seleccioná cualquier stand para ver su ubicación, superficie y disponibilidad.",
}

export const PANEL_INITIAL_COPY = {
  title: "Seleccioná un stand",
  body: "Explorá el mapa interactivo para conocer la ubicación, características y disponibilidad de cada espacio.",
}

/** Plural labels, keyed by the stand states. One map because the stats block and the
 *  availability filter both need the plural form, and two maps would let the page
 *  disagree with itself the way §9.13 had to fix in the hero (C12). */
export const STATUS_PLURAL: Record<StandStatus, string> = {
  disponible: "Disponibles",
  reservado: "Reservados",
  vendido: "Vendidos",
}

/** Keyed by the stand states so the stats block can be built by iterating the enum
 *  instead of listing labels next to their values (C12). */
export const STATS_COPY = {
  label: "Resumen del recinto",
  total: "Total de stands",
  ...STATUS_PLURAL,
}

export const PANEL_COPY = {
  category: "Categoría",
  location: "Ubicación",
  area: "Superficie",
  status: "Estado",
  benefits: "Qué incluye",
  areaUnit: "m²",
}

export const STAND_BENEFITS: readonly string[] = [
  "Inclusión en el sitio oficial del evento",
  "Presencia en el catálogo del evento",
  "Acceso para staff durante el montaje",
  "Conectividad WiFi",
  "Energía eléctrica",
]

export const STAGE_LABEL: Record<PriceStage, string> = {
  earlyBird: "Early Bird",
  presale: "Preventa",
  normal: "Valor full",
}

export const PRICE_COPY = {
  label: "Precio del nivel",
  active: "Activo",
  footnote: "El precio corresponde al nivel completo, no a un stand individual.",
}

/** "Desde" only makes sense on the live entry price. On the higher stages it reads as
 *  three identical entry points, which hides which one is cheapest. */
export const STAGE_PREFIX: Record<PriceStage, string> = {
  earlyBird: "Desde",
  presale: "Precio Preventa",
  normal: "Precio Valor full",
}

export const CTA_COPY = { label: "Solicitar información" }

export const FILTER_COPY = {
  group: "Filtros",
  category: "Categoría",
  availability: "Disponibilidad",
  all: "Todas",
  reset: "Limpiar filtros",
  empty: "No hay stands que coincidan con los filtros aplicados.",
}

/** Zoom-control glyphs. The accessible names live in A11Y_COPY; these are the visible
 *  marks only, kept here so the component carries no user-facing string. */
export const ZOOM_GLYPH = { in: "+", out: "−", reset: "1:1" }

export const DRAFT_NOTICE =
  "Datos de referencia en revisión. La asignación y la disponibilidad de cada stand se confirman con el equipo comercial."

export const A11Y_COPY = {
  planGroup: "Mapa de stands",
  panelRegion: "Detalle del stand",
  zoomIn: "Acercar el mapa",
  zoomOut: "Alejar el mapa",
  zoomReset: "Restablecer la vista del mapa",
  closeSelection: "Cerrar detalle del stand",
}

export const CATEGORY_LABEL: Record<StandCategory, string> = {
  platino: "Platino",
  oro: "Oro",
  plata: "Plata",
  bronce: "Bronce",
}

/** Keyed by the zones because each one is both drawn and announced: the visible label and
 *  the accessible name of the same region come from here, so they cannot disagree. */
export const ZONE_LABEL: Record<ZoneId, string> = {
  vip: "Zona VIP",
  entrance: "Entrada",
  margin: "Margen inferior",
}

/** One string for every totem, and it is the accessible name only. They are identical
 *  furniture, so numbering them would imply a catalogue entry that does not exist, and a
 *  totem is two cells wide — a thirtieth of the plan's width, an eighteenth of its height —
 *  so any text drawn inside it
 *  would be unreadable at every zoom the canvas offers. Unlike a zone it is not a region to
 *  read, it is an object standing on the floor. */
export const TOTEM_LABEL = "Tótem publicitario"

export const CATEGORY_COLOR: Record<StandCategory, string> = {
  platino: "#60A5FA",
  oro: "#84CC16",
  plata: "#FACC15",
  bronce: "#22D3EE",
}

export const STATUS_COLOR: Record<StandStatus, string> = {
  disponible: "#22D3EE",
  reservado: "#475569",
  vendido: "#EF4444",
}

export const STATUS_COPY: Record<StandStatus, { label: string; note: string }> = {
  disponible: { label: "Disponible", note: "" },
  reservado: {
    label: "Reservado",
    note: "Este stand está reservado. Contactanos para evaluar espacios disponibles.",
  },
  vendido: {
    label: "Vendido",
    note: "Este stand fue vendido. Contactanos para recibir el catálogo de espacios disponibles.",
  },
}

export const LOCATIONS: Record<StandCategory, string> = {
  platino: "Sector central frente al Main Stage",
  oro: "Anillo central - pasillos de circulación",
  plata: "Aisles laterales",
  bronce: "Fondo de sala - zona de respaldo",
}

const shortLabel = (label: string) => label.replace("Stand ", "")

/** Takes both counts as arguments so the numbers come from the data and only the
 *  sentence lives in the copy module. */
export const resultCount = (shown: number, total: number): string =>
  `${shown} de ${total} stands`

export const hotspotLabel = (stand: Stand): string =>
  `Stand ${shortLabel(stand.label)}, categoría ${CATEGORY_LABEL[stand.category]}, ${stand.areaM2} m², ${STATUS_COPY[stand.status].label}`

export const ctaLabel = (stand: Stand): string =>
  `Solicitar información sobre el stand ${shortLabel(stand.label)}`
