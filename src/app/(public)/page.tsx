import { AudienceProvider } from "@/components/publics/AudienceContext"
import ParticlesLayer from "@/components/common/ParticlesLayer"
import HeroV2 from "@/components/hero/heroV2"
import ScienceV2 from "@/components/science/scienceV2"
import SummitV2 from "@/components/summit/summitV2"
import TechV2 from "@/components/tech/techV2"
import { flags } from "@/config/flags"

import HomeLegacy from "./page.legacy"

/**
 * `/` shell. Server-rendered: when `NEXT_PUBLIC_HOMEPAGE_V2` is on it composes the immersive
 * chapters inside the client `AudienceProvider` with a single particle canvas behind them;
 * otherwise it serves the legacy home (`page.legacy.tsx`) so the flag alone rolls the change
 * back. S4 shipped `#hero` + `#summit`; S5a adds `#ciencia` + `#tecnologia`; the remaining
 * chapters land in later slices.
 */
export default function Home() {
  if (!flags.homepageV2) {
    return <HomeLegacy />
  }

  return (
    <main className="w-full">
      <AudienceProvider>
        <ParticlesLayer />
        <HeroV2 />
        <SummitV2 />
        <ScienceV2 />
        <TechV2 />
      </AudienceProvider>
    </main>
  )
}
