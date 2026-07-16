import type { Metadata } from "next";
import About from "@/components/about/about";
import ActivitiesSection from "@/components/activities/activities";
import Header from "@/components/header/header";
import Introduction from "@/components/introduction/introduction";
import Roadmap from "@/components/roadmap/roadmap";
import Team from "@/components/team/team";
import ParticlesBackground from "@/components/utils/ParticlesBackground";
import Contact from "@/components/contact/contact";

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
      <div className="w-full mx-auto text-white relative min-h-screen  mb-16 mt-32">
        <ParticlesBackground dots={100} lines={120}>
          <Roadmap/>
          <Contact />
        </ParticlesBackground>
      </div>
    </main>
  );
}
