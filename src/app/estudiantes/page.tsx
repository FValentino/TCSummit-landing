import Hero from '@/components/students/hero/hero'
import Introduction from '@/components/students/introduction/introduction'
import Oportunities from '@/components/students/oportunities/oportunities'
import Activities from '@/components/students/activities/activities'

export default function StudentsPage() {
  return (
    <main className="w-full">
      <Hero />
      <Introduction />
      <Oportunities />
      <Activities />
    </main>
  )
}
