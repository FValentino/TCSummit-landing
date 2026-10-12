import type { Metadata } from "next";
import About from "@/components/about/about";
import ActivitiesSection from "@/components/activities/activities";
import Header from "@/components/header/header";
import Introduction from "@/components/introduction/introduction";
<<<<<<< HEAD:src/app/page.tsx
import MarketingIntro from "@/components/marketing/marketingIntro";
=======
import Location from "@/components/location/location";
>>>>>>> revert-text-colors:src/app/(public)/page.legacy.tsx
import Roadmap from "@/components/roadmap/roadmap";
import Team from "@/components/team/team";
import ParticlesBackground from "@/components/utils/ParticlesBackground";
import Contact from "@/components/contact/contact";

<<<<<<< HEAD:src/app/page.tsx
export const metadata: Metadata = {
  title: "Techno Crypto Summit | Evento de Tecnología y Crypto",
  description:
    "El evento presencial de tecnología y crypto más importante de Latinoamérica. 3 días de conferencias, talleres y networking.",
  openGraph: {
    title: "Techno Crypto Summit",
    description:
      "El evento presencial de tecnología y crypto más importante de Latinoamérica.",
    type: "website",
    locale: "es_AR",
  },
};

export default function Home() {
=======
/** Previous `/` composition, kept for rollback. `page.tsx` serves this while
 *  `NEXT_PUBLIC_HOMEPAGE_V2` is off, so the immersive home can be reverted by the flag alone. */
export default function HomeLegacy() {
>>>>>>> revert-text-colors:src/app/(public)/page.legacy.tsx
  return (
    <main className="w-full">
      <Header/>
      <ParticlesBackground dots={100} lines={120}>
        <Introduction/>
        <MarketingIntro/>
      </ParticlesBackground>
      <ActivitiesSection/>
      <ParticlesBackground dots={100} lines={120}>
        <About/>
      </ParticlesBackground>
      <Team/>
      <Location/>
      <div className="w-full mx-auto text-white relative min-h-screen  mb-16 mt-32">
        <ParticlesBackground dots={100} lines={120}>
          <Roadmap/>
          <Contact />
        </ParticlesBackground>
      </div>
    </main>
  );
}
