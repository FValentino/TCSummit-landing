import Hero from '@/components/students/hero/hero'
import Introduction from '@/components/students/introduction/introduction'
import Oportunities from '@/components/students/oportunities/oportunities'
import Activities from '@/components/students/activities/activities'
import ParticlesBackground from '@/components/utils/ParticlesBackground'

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
