import Hero from '@/components/post-compra/hero/hero'
import OrderSummary from '@/components/post-compra/order-summary/orderSummary'
import Owners from '@/components/post-compra/owners/owners'
import Actions from '@/components/post-compra/actions/actions'
import ParticlesBackground from '@/components/utils/ParticlesBackground'

export default function PostCompraPage() {
  return (
    <main className="w-full min-h-screen">
      <ParticlesBackground dots={50} lines={0}>
        <Hero />
      </ParticlesBackground>
      <ParticlesBackground dots={200} lines={50}>
        <OrderSummary />
        <Owners />
        <Actions />
      </ParticlesBackground>
    </main>
  )
}
