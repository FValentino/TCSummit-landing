import About from "@/components/about/about";
import ActivitiesSection from "@/components/activities/activities";
import Header from "@/components/header/header";
import Introduction from "@/components/introduction/introduction";
import MarketingIntro from "@/components/marketing/marketingIntro";
import Roadmap from "@/components/roadmap/roadmap";
import Team from "@/components/team/team";
import ParticlesBackground from "@/components/utils/ParticlesBackground";
import Contact from "@/components/contact/contact";

export default function Home() {
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
      <div className="w-full mx-auto text-white relative min-h-screen  mb-16 mt-32">
        <ParticlesBackground dots={100} lines={120}>
          <Roadmap/>
          <Contact />
        </ParticlesBackground>
      </div>
    </main>
  );
}
