import { flags } from "@/config/flags"

import { IMPACT_COUNTERS, IMPACTO } from "./territorioData"

/**
 * §37 Impact counters (spec legal-gates "Metric counters data gate"). Rendered only when the
 * metrics source is confirmed AND a figure is actually present: with `flags.metricsConfirmed`
 * off — the current state — the block keeps its heading and shows a pending note, so the page
 * never displays a fabricated number.
 */
export default function ImpactCounters() {
  const confirmed = IMPACT_COUNTERS.filter((counter) => counter.value !== null)
  const showCounters = flags.metricsConfirmed && confirmed.length > 0

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#03f5ff]">
        {IMPACTO.kicker}
      </p>
      <h3 className="mt-3 text-xl font-bold text-white sm:text-2xl">{IMPACTO.headline}</h3>

      {showCounters ? (
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {confirmed.map((counter) => (
            <li
              key={counter.id}
              className="rounded-2xl border border-[#03f5ff]/20 bg-white/5 px-4 py-5"
            >
              <p className="text-3xl font-bold text-[#03f5ff]">{counter.value}</p>
              <p className="mt-1 text-sm font-bold text-white">{counter.label}</p>
              <p className="mt-1 text-xs text-gray-300">{counter.caption}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 max-w-3xl border-l-2 border-[#03f5ff]/50 pl-4 text-sm italic text-gray-300">
          {IMPACTO.pendingNote}
        </p>
      )}
    </div>
  )
}