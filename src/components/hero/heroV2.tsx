import AudienceCta from "@/components/publics/AudienceCta"
import AudienceSelector from "@/components/publics/AudienceSelector"

import { HERO } from "./heroData"
import HeroMedia from "./heroMedia"

/**
 * `#hero` chapter (spec homepage-narrative, audience-selection). Server-rendered copy owns the
 * single `<h1>`; the audience selector and CTA are client islands so the static shell ships with
 * minimal JS. There is no auto-scroll and no preselected chip on load (spec §audience-neutral).
 */
export default function HeroV2() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-6 pb-20 pt-28"
    >
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div className="space-y-6 text-center lg:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F71ABF] sm:text-sm">
            {HERO.eyebrow}
          </p>

          <h1
            id="hero-title"
            className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
          >
            {HERO.title}
          </h1>

          <p className="mx-auto max-w-xl text-base text-gray-300 sm:text-lg lg:mx-0">
            {HERO.lead}
          </p>

          <p className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-sm font-medium text-[#F71ABF] lg:justify-start">
            <span>{HERO.date}</span>
            <span aria-hidden="true">·</span>
            <span>{HERO.location}</span>
          </p>

          <div className="space-y-5 pt-2">
            <AudienceSelector />
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <AudienceCta />
              <a
                href="#summit"
                className="inline-flex items-center justify-center rounded-2xl border-2 border-[#F107CA] px-8 py-4 text-lg font-bold text-[#F71ABF] transition-colors hover:bg-[#F107CA]/10"
              >
                {HERO.secondaryCta}
              </a>
            </div>
          </div>
        </div>

        <HeroMedia />
      </div>
    </section>
  )
}
