import AudienceCta from "@/components/publics/AudienceCta"
import AudienceSelector from "@/components/publics/AudienceSelector"

import { HERO } from "./heroData"
import HeroMedia from "./heroMedia"
import HeroVideo from "./heroVideo"

export default function HeroV2() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-6 pb-20 pt-28"
    >
      <HeroVideo />
      <div className="relative z-10 grid items-center gap-12 lg:grid-cols-2">
        <div className="space-y-6 text-center lg:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#03f5ff] sm:text-sm">
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

          <p className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-sm font-medium text-[#9fd8ff] lg:justify-start">
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
                className="inline-flex items-center justify-center rounded-2xl border-2 border-[#03f5ff] px-8 py-4 text-lg font-bold text-[#03f5ff] transition-colors hover:bg-[#03f5ff]/10"
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
