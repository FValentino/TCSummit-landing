import CienciaTeaser from "./cienciaTeaser"
import ConicetBlock from "./conicetBlock"
import { CIENCIA } from "./scienceData"

/**
 * `#ciencia` chapter (spec homepage-narrative, brief §13–§16). Server-rendered narrative: the
 * headline, lead and the four "ciencia que…" pillars ship as text; only `CienciaTeaser` (the M2/M3
 * triggers) hydrates. The CONICET block is flag-gated server-side.
 */
export default function ScienceV2() {
  return (
    <section
      id="ciencia"
      aria-labelledby="ciencia-title"
      className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#03f5ff] sm:text-sm">
        {CIENCIA.kicker}
      </p>
      <h2
        id="ciencia-title"
        className="mt-3 max-w-3xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl"
      >
        {CIENCIA.headline}
      </h2>
      <p className="mt-6 max-w-3xl text-base leading-relaxed text-gray-300 sm:text-lg">
        {CIENCIA.lead}
      </p>

      <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {CIENCIA.pillars.map((pillar) => (
          <li
            key={pillar}
            className="rounded-2xl border border-[#03f5ff]/20 bg-white/5 px-4 py-3 text-sm font-semibold text-gray-100"
          >
            {pillar}
          </li>
        ))}
      </ul>

      <div className="mt-16">
        <CienciaTeaser />
      </div>

      <div className="mt-12">
        <ConicetBlock />
      </div>
    </section>
  )
}
