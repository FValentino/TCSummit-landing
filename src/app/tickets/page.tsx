import Hero from "@/components/tickets/hero/hero"
import Carousel from "@/components/tickets/carousel/carousel"
import LegalFooter from "@/components/tickets/legal-footer/legalFooter"
import ParticlesBackground from "@/components/utils/ParticlesBackground"

export default function TicketsPage() {
  return (
    <main className="w-full min-h-screen">
      <ParticlesBackground dots={60} lines={40}>
        <Hero />
      </ParticlesBackground>

      <ParticlesBackground dots={120} lines={60}>
        <section className="relative z-10 pt-20 pb-10 md:pt-28 md:pb-16">
          <Carousel />
        </section>
        <LegalFooter />
      </ParticlesBackground>
    </main>
  )
}
