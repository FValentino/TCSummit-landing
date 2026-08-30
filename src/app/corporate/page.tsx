import type { Metadata } from "next";

import CorporateHero from "@/components/corporate/hero/hero";
import CorporateSponsors from "@/components/corporate/sponsors/sponsors";
import CorporateBenefits from "@/components/corporate/benefits/benefits";
import CorporateProcess from "@/components/corporate/process/process";
import CorporateContact from "@/components/corporate/contact/contact";
import ParticlesBackground from "@/components/utils/ParticlesBackground";

export const metadata: Metadata = {
  title: "Sponsors & Empresas | TCSummit 2027",
  description:
    "Convierta su marca en protagonista del TechnoCrypto Summit 2027: alcance masivo, talento tech y más de 300 stands disponibles para empresas y sponsors.",
};

export default function CorporatePage() {
  return (
    <main className="w-full">
      <ParticlesBackground dots={100} lines={120}>
        <CorporateHero />
      </ParticlesBackground>

      <ParticlesBackground dots={100} lines={120} particleColor="#00c6ff" lineColor="rgba(0, 198, 255, 0.4)">
        <CorporateSponsors />
      </ParticlesBackground>

      <ParticlesBackground dots={100} lines={120}>
        <CorporateBenefits />
      </ParticlesBackground>

      <CorporateProcess />

      <div className="w-full mx-auto text-white relative min-h-screen mb-16 mt-32">
        <ParticlesBackground dots={100} lines={120}>
          <CorporateContact />
        </ParticlesBackground>
      </div>
    </main>
  );
}