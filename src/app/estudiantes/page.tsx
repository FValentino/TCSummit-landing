import type { Metadata } from "next";
import Hero from "@/components/students/hero/hero";
import Introduction from "@/components/students/introduction/introduction";
import Oportunities from "@/components/students/oportunities/oportunities";
import Activities from "@/components/students/activities/activities";
import ParticlesBackground from "@/components/utils/ParticlesBackground";

export const metadata: Metadata = {
  title: "Estudiantes | Techno Crypto Summit",
  description:
    "Programa especial para estudiantes del Techno Crypto Summit. Accedé a entradas con descuento, networking y talleres exclusivos.",
  openGraph: {
    title: "Estudiantes | Techno Crypto Summit",
    description:
      "Programa especial para estudiantes del Techno Crypto Summit.",
    type: "website",
    locale: "es_AR",
  },
};

export default function StudentsPage() {
  return (
    <main className="w-full">
      <ParticlesBackground dots={50} lines={0}>
        <Hero />
      </ParticlesBackground>
      <ParticlesBackground dots={300} lines={100}>
        <Introduction />
        <Oportunities />
        <Activities />
      </ParticlesBackground>
    </main>
  )
}
