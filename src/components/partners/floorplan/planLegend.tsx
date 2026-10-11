'use client'

import type { NonDefaultStatus, StandCategory } from "./floorplanData"
import {
  CATEGORY_TOTALS,
  LEGEND_STATUSES,
  STAND_CATEGORIES,
  STATUS_COUNTS,
} from "./floorplanData"
import {
  CATEGORY_COLOR,
  CATEGORY_LABEL,
  LEGEND_COPY,
  PANEL_INITIAL_COPY,
  STATUS_COLOR,
  STATUS_COPY,
  standCount,
} from "./floorplanCopy"

const LEGEND_TITLE_ID = "plano-leyenda"
const CATEGORIES_TITLE_ID = "plano-leyenda-categorias"
const STATUSES_TITLE_ID = "plano-leyenda-estados"

/** Square for a category, round for a state — the two shapes the plan already uses: a stand
 *  is a rectangle, and the detail dialog marks a state with a round chip. Colour
 *  is therefore never the only thing separating the two groups, which is the accessibility
 *  half of a legend whose whole content is colour. */
const SWATCH_CLASS = {
  square: "h-2.5 w-2.5 shrink-0 rounded-sm border border-white/30",
  dot: "h-2 w-2 shrink-0 rounded-full",
} as const

type SwatchShape = keyof typeof SWATCH_CLASS

interface LegendEntry {
  key: string
  swatch: string
  shape: SwatchShape
  label: string
  count: number
}

/** Swatch, tier name and count, and nothing else. The sentences that used to sit under each
 *  row were the same strings the detail dialog shows as a stand's location and status note —
 *  `LOCATIONS` and `STATUS_COPY.note` — so a sponsor read the same fact twice and the legend
 *  row grew a sentence that explained the tier rather than naming it. Both strings stay in
 *  `floorplanCopy.ts` and stay wired to the dialog; only their second appearance here goes. */
const categoryEntry = (category: StandCategory): LegendEntry => ({
  key: category,
  swatch: CATEGORY_COLOR[category],
  shape: "square",
  label: CATEGORY_LABEL[category],
  count: CATEGORY_TOTALS[category],
})

const statusEntry = (status: NonDefaultStatus): LegendEntry => ({
  key: status,
  swatch: STATUS_COLOR[status],
  shape: "dot",
  label: STATUS_COPY[status].label,
  count: STATUS_COUNTS[status],
})

/** Built once at module scope, like the panel's stats rows: the enums and the aggregates are
 *  all static, so a re-render has nothing to recompute. */
const CATEGORY_ENTRIES = STAND_CATEGORIES.map(categoryEntry)
const STATUS_ENTRIES = LEGEND_STATUSES.map(statusEntry)

interface LegendGroupProps {
  id: string
  label: string
  entries: LegendEntry[]
}

function LegendGroup({ id, label, entries }: LegendGroupProps) {
  return (
    <section aria-labelledby={id}>
      <h4 id={id} className="text-xs font-semibold tracking-widest text-[#03f5ff] uppercase">
        {label}
      </h4>
      {/* An unordered list, not a definition list: the rows used to be term-and-definition, and
          dropping the definition left a `dl` whose `dd` had nothing to define. A `li` states
          what the markup actually holds. The swatch is `aria-hidden`, so the label is what a
          screen reader announces — which is why the two groups differ by shape as well as by
          colour, since colour alone would carry none of it. */}
      <ul className="mt-3 space-y-2">
        {entries.map((entry) => (
          <li
            key={entry.key}
            className="flex items-baseline justify-between gap-3 text-sm text-white"
          >
            <span className="flex min-w-0 items-center gap-2">
              <span
                aria-hidden
                className={SWATCH_CLASS[entry.shape]}
                style={{ backgroundColor: entry.swatch }}
              />
              {entry.label}
            </span>
            <span className="shrink-0 text-xs font-medium text-gray-300">
              {standCount(entry.count)}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}

/** The colour key for the plan, and now the whole of the right-hand column: it is always
 *  mounted and nothing about it depends on a selection, so the counts it prints are the
 *  figures the user sees whether or not a stand is open. Mounted in the column rather than
 *  as an overlay inside the canvas: the canvas sizes its own overlays against itself, so a
 *  six-row card floating over the stand rows is what pushed the chrome off the plan in the
 *  first place, and in flow there is nothing for it to collide with. The counts are the same
 *  aggregates the filter line reads, so the two cannot disagree. */
export default function PlanLegend() {
  return (
    <section
      aria-labelledby={LEGEND_TITLE_ID}
      className="rounded-2xl border border-[#03f5ff]/20 bg-black/40 p-5 backdrop-blur-sm"
    >
      {/* The heading a sponsor lands on when nothing is selected, kept verbatim from the
          panel it replaces: it is the instruction that used to sit where the legend now is,
          and the column is its home whether or not a dialog is open. */}
      <h2
        id={LEGEND_TITLE_ID}
        className="text-2xl font-bold text-white [text-shadow:0_0_20px_rgba(3,245,255,0.5)]"
      >
        {PANEL_INITIAL_COPY.title}
      </h2>
      <p className="mt-3 text-base text-gray-300">{PANEL_INITIAL_COPY.body}</p>
      {/* One column at every width, where it used to be two above `sm`: the grid breakpoint
          reads the viewport, and the 30fr column is ~336 px at `max-w-7xl` — splitting that
          in two puts each location sentence in a box too narrow to read. */}
      <div className="mt-6 grid grid-cols-1 gap-6">
        <LegendGroup id={CATEGORIES_TITLE_ID} label={LEGEND_COPY.categories} entries={CATEGORY_ENTRIES} />
        <LegendGroup id={STATUSES_TITLE_ID} label={LEGEND_COPY.statuses} entries={STATUS_ENTRIES} />
      </div>
    </section>
  )
}
