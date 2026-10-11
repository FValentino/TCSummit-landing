import type { PriceStage, Stand, StandCategory, StandStatus, ZoneId } from "./floorplanData"

export const SECTION_COPY = {
  eyebrow: "Mapa de stands",
  title: "Explorá el plano del recinto",
  /** Takes the count as an argument, for the same reason `resultCount` does, and the caller
   *  now passes `STANDS.length` rather than `TOTAL_STANDS`. The two are 115 and 130: the
   *  tariff declares 130 slots and the layout tiles 115 of them, so a section that quoted
   *  the tariff claimed 15 places on this floor that are not drawn — beside a legend whose
   *  four category rows sum to the drawn 115. Two figures, one viewport, and the larger one
   *  is the one that is not on screen. The argument keeps the import one-way; reading either
   *  constant here would form a TDZ cycle with the data module, which is the constraint
   *  `resultCount` already obeys. */
  subtitle: (total: number): string =>
    `${total} espacios de exhibición listos para tu marca. Seleccioná cualquier stand para ver su ubicación, superficie y disponibilidad.`,
}

/** The heading and the line under it for the right-hand column, which is where a sponsor
 *  arrives when nothing is selected. Kept under its old name after the panel it belonged to
 *  became the stand dialog: the string never changed, only the surface that shows it. */
export const PANEL_INITIAL_COPY = {
  title: "Seleccioná un stand",
  body: "Explorá el mapa interactivo para conocer la ubicación, características y disponibilidad de cada espacio.",
}

/** Plural labels, keyed by the stand states. The availability filter is the only consumer
 *  left — the legend's rows are the states the plan actually paints, so the default one
 *  never reaches a count here — and one map means the filter and any future surface cannot
 *  disagree over the same word (C12). */
export const STATUS_PLURAL: Record<StandStatus, string> = {
  disponible: "Disponibles",
  reservado: "Reservados",
  vendido: "Vendidos",
}

export const PANEL_COPY = {
  category: "Categoría",
  location: "Ubicación",
  area: "Superficie",
  status: "Estado",
  benefits: "Qué incluye",
  areaUnit: "m²",
}

/** The one word that marks a figure the commercial team has not confirmed. Two surfaces
 *  publish an area — the detail dialog and the accessible name — and `DRAFT_NOTICE`
 *  only reaches one of them, so the qualifier is what carries the caveat to the other.
 *  It qualifies the *number*, not the stand: the stand is real, its dimensions are the part
 *  still under review. */
export const AREA_QUALIFIER = "aprox."

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

/** Same rule for the dialog's dismiss control. */
export const CLOSE_GLYPH = { close: "×" }

export const DRAFT_NOTICE =
  "Datos de referencia en revisión. La asignación y la disponibilidad de cada stand se confirman con el equipo comercial."

export const A11Y_COPY = {
  planGroup: "Mapa de stands",
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

/** Read by the hotspot: a stand in the default state takes its category colour and every
 *  other state takes its own, which is what keeps an unreserved stand identifiable as its
 *  tier instead of as a fifth, unlabelled colour. */
export const STATUS_COLOR: Record<StandStatus, string> = {
  // Never painted as a fill — the default state falls back to the category colour, which is
  // why sharing a hex with `bronce` above is harmless on the plan. It is not harmless in the
  // legend, which is why the legend's rows come from the non-default states and the data
  // module throws if one of them ever collides with a category.
  disponible: "#22D3EE",
  // Muted lilac, chosen by measurement across every colour the plan already paints. Two
  // constraints drove it. First, the slate it replaces sat at 2.52:1 against the canvas
  // field — under the 3:1 WCAG needs for a graphic that has to be seen — and at hue 215,
  // two degrees off `platino`, so a held stand rendered as a dim blue. Second, this state is
  // exempt from the hotspot's two opacity curtains (see `planHotspot.tsx`), so it is seen at
  // full strength and the colour has to be quiet on its own account rather than merely
  // legible: a saturated hue reads as a shout next to 113 tier-coloured stands.
  // 22% saturation clears `vendido` by 77 degrees of hue and `platino` by 70, at 9.31:1.
  // Violet is deliberately avoided — hue 283 rather than the 255 that every lavender sits on,
  // because `planCanvas.tsx` spends violet on the totems and a stand in that band makes a
  // totem read as a stand. The obvious `#B39DDB` is 6 degrees from the totem fill.
  reservado: "#CBA9D9",
  vendido: "#EF4444",
}

export const STATUS_COPY: Record<StandStatus, { label: string; note: string }> = {
  disponible: { label: "Disponible", note: "" },
  reservado: {
    label: "Reservado",
    note: "",
  },
  vendido: {
    label: "Vendido",
    note: "",
  },
}

export const LEGEND_COPY = {
  categories: "Categoría",
  statuses: "Estado",
}

/** Where each tier sits in the building. Reached by the detail dialog's "Ubicación" row and by
 *  `floorplanData` when it stamps `Stand.location`; it stopped being legend copy when the
 *  legend rows went to name-and-count only, and the strings live on because the dialog is
 *  where a sponsor reads where a specific stand is. */
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

/** The legend's per-row count. Singular and plural decided here rather than at the call
 *  site, because "1 stands" next to "21 stands" is the kind of thing that survives to
 *  production because nothing about it is wrong at compile time. */
export const standCount = (count: number): string => `${count} ${count === 1 ? "stand" : "stands"}`

/** The single formatter for a published area, so a surface that renders its own `${areaM2}
 *  m²` is a surface that can print a provisional number with nothing to say so. The flag is
 *  read off the stand rather than passed in: it is derived from `PROVISIONAL_AREA_M2` in the
 *  data module at the point the stand is built, and travelling on the stand is what stops
 *  the two halves from being derived by two different routes — the mistake this module's
 *  area arithmetic was already wrong about once. */
export const areaText = (stand: Stand): string =>
  `${stand.areaM2} ${PANEL_COPY.areaUnit}${stand.areaProvisional ? ` ${AREA_QUALIFIER}` : ""}`

export const hotspotLabel = (stand: Stand): string =>
  `Stand ${shortLabel(stand.label)}, categoría ${CATEGORY_LABEL[stand.category]}, ${areaText(stand)}, ${STATUS_COPY[stand.status].label}`

export const ctaLabel = (stand: Stand): string =>
  `Solicitar información sobre el stand ${shortLabel(stand.label)}`
