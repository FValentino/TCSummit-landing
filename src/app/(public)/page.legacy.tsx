import About from "@/components/about/about";
import ActivitiesSection from "@/components/activities/activities";
import Header from "@/components/header/header";
import Introduction from "@/components/introduction/introduction";
import Location from "@/components/location/location";
import Roadmap from "@/components/roadmap/roadmap";
import Team from "@/components/team/team";
import ParticlesBackground from "@/components/utils/ParticlesBackground";
import Contact from "@/components/contact/contact";

/** Previous `/` composition, kept for rollback. `page.tsx` serves this while
 *  `NEXT_PUBLIC_HOMEPAGE_V2` is off, so the immersive home can be reverted by the flag alone. */
export default function HomeLegacy() {
  return (
    <main className="w-full">
      <Header/>
      <ParticlesBackground dots={100} lines={120}>
        <Introduction/>
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
