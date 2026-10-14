import { AudienceProvider } from "@/components/publics/AudienceContext"
import EducationV2 from "@/components/education/educationV2"
import EmpresasV2 from "@/components/empresas/empresasV2"
import ExperienceV2 from "@/components/experience/experienceV2"
import HeroV2 from "@/components/hero/heroV2"
import InnovationV2 from "@/components/innovation/innovationV2"
import ParticiparV2 from "@/components/participar/participarV2"
import ParticlesLayer from "@/components/common/ParticlesLayer"
import ScienceV2 from "@/components/science/scienceV2"
import SummitV2 from "@/components/summit/summitV2"
import TechV2 from "@/components/tech/techV2"
import TerritorioV2 from "@/components/territorio/territorioV2"
import { flags } from "@/config/flags"

import HomeLegacy from "./page.legacy"

/**
 * `/` shell. Server-rendered: when `NEXT_PUBLIC_HOMEPAGE_V2` is on it composes the immersive
 * chapters inside the client `AudienceProvider` with a single particle canvas behind them;
 * otherwise it serves the legacy home (`page.legacy.tsx`) so the flag alone rolls the change
 * back. S4 shipped `#hero` + `#summit`; S5a adds `#ciencia` + `#tecnologia`; S5b adds
 * `#innovacion` + `#educacion`; S6 adds the closing `#experiencia`, `#empresas`, `#territorio`
 * and `#participar`. The order matches `ANCHOR_ORDER` in `common/chapters.ts`.
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
        <InnovationV2 />
        <EducationV2 />
        <ExperienceV2 />
        <EmpresasV2 />
        <TerritorioV2 />
        <ParticiparV2 />
      </AudienceProvider>
    </main>
  )
}
