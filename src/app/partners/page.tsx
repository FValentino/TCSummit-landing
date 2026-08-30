import type { Metadata } from "next";

import PartnersHero from "@/components/partners/hero/hero";
import PartnersSponsors from "@/components/partners/sponsors/sponsors";
import PartnersBenefits from "@/components/partners/benefits/benefits";
import PartnersProcess from "@/components/partners/process/process";
import PartnersContact from "@/components/partners/contact/contact";
import ParticlesBackground from "@/components/utils/ParticlesBackground";

export const metadata: Metadata = {
  title: "Sponsors & Empresas | TCSummit 2027",
  description:
    "Convierta su marca en protagonista del TechnoCrypto Summit 2027: alcance masivo, talento tech y más de 300 stands disponibles para empresas y sponsors.",
};

export default function PartnersPage() {
  return (
    <main className="w-full">
      <ParticlesBackground dots={100} lines={120}>
        <PartnersHero />
      </ParticlesBackground>

      <ParticlesBackground dots={100} lines={120} particleColor="#00c6ff" lineColor="rgba(0, 198, 255, 0.4)">
        <PartnersSponsors />
      </ParticlesBackground>

      <ParticlesBackground dots={100} lines={120}>
        <PartnersBenefits />
      </ParticlesBackground>

      <PartnersProcess />

      <div className="w-full mx-auto text-white relative min-h-screen mb-16 mt-32">
        <ParticlesBackground dots={100} lines={120}>
          <PartnersContact />
        </ParticlesBackground>
      </div>
    </main>
  );
}