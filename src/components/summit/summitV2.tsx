import { SUMMIT } from "./summitData"
import UniversesGrid from "./universesGrid"

/**
 * `#summit` chapter (spec homepage-narrative). Server-rendered narrative — "no es una
 * conferencia, es una experiencia" — plus the objective list and the six-universe teaser. The
 * only client island is the interactive universes grid.
 */
export default function SummitV2() {
  return (
    <section
      id="summit"
      aria-labelledby="summit-title"
      className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#03f5ff] sm:text-sm">
        {SUMMIT.kicker}
      </p>
      <h2
        id="summit-title"
        className="mt-3 max-w-3xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl"
      >
        {SUMMIT.headline}
      </h2>
      <p className="mt-6 max-w-3xl text-base leading-relaxed text-gray-300 sm:text-lg">
        {SUMMIT.lead}
      </p>

      <div className="mt-12 rounded-3xl border border-[#03f5ff]/20 bg-white/5 p-8">
        <h3 className="text-xl font-bold text-[#03f5ff] sm:text-2xl">{SUMMIT.objectiveTitle}</h3>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {SUMMIT.objectives.map((objective) => (
            <li key={objective} className="flex items-center gap-2 text-gray-200">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#03f5ff]" />
              {objective}
            </li>
          ))}
        </ul>
        <p className="mt-4 font-medium text-white">{SUMMIT.objectiveClosing}</p>
      </div>

      <div className="mt-20">
        <h3 className="text-2xl font-bold text-white sm:text-3xl">{SUMMIT.universesTitle}</h3>
        <p className="mt-3 max-w-2xl text-base text-gray-300">{SUMMIT.universesLead}</p>
        <div className="mt-8">
          <UniversesGrid />
        </div>
      </div>
    </section>
  )
}
