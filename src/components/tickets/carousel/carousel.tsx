"use client"

import { useCallback, useRef, useState } from "react"
import { plans, type Plan } from "../plansData"
import PlanCard from "./planCard"
import BuyModal from "../buy-modal/buyModal"
import { useCarousel } from "@/components/common/carousel/useCarousel"
import CarouselArrow from "@/components/common/carousel/carouselArrow"
import CarouselDots from "@/components/common/carousel/carouselDots"

const AUTOPLAY_INTERVAL = 5000

export default function Carousel() {
  const trackRef = useRef<HTMLDivElement | null>(null)
  const [paused, setPaused] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)

  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current
    if (!track) return
    const card = track.children[index] as HTMLElement | undefined
    if (!card) return
    const target = card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2
    track.scrollTo({ left: target, behavior: "smooth" })
  }, [])

  const { index: activeIndex, next: goNext, prev: goPrev, goTo, setIndex, canPrev, canNext } = useCarousel({
    total: plans.length,
    autoPlay: !paused && !selectedPlan,
    autoPlayInterval: AUTOPLAY_INTERVAL,
    keyboard: !selectedPlan,
    onNavigate: (_, target) => scrollToIndex(target),
  })

  // Derive the active card from the scroll position.
  const handleScroll = useCallback(() => {
    const track = trackRef.current
    if (!track || track.children.length === 0) return
    const center = track.scrollLeft + track.clientWidth / 2
    let nearestIndex = 0
    let nearestDistance = Number.POSITIVE_INFINITY
    for (let i = 0; i < track.children.length; i++) {
      const card = track.children[i] as HTMLElement
      const distance = Math.abs(card.offsetLeft + card.offsetWidth / 2 - center)
      if (distance < nearestDistance) {
        nearestDistance = distance
        nearestIndex = i
      }
    }
    setIndex(nearestIndex)
  }, [setIndex])

  const handleCloseModal = useCallback(() => setSelectedPlan(null), [])

  return (
    <section className="relative z-10 w-full">
      <div className="mx-auto max-w-7xl px-4">
        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
        >
          <div
            ref={trackRef}
            onScroll={handleScroll}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-[7.5%] py-4 md:gap-8 md:px-8 lg:px-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {plans.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                onBuy={(selected) => setSelectedPlan(selected)}
                className="w-[85%] shrink-0 snap-center md:w-[50%] lg:w-[36%]"
              />
            ))}
          </div>

          {/* Prev arrow */}
          <CarouselArrow
            direction="prev"
            onClick={goPrev}
            disabled={!canPrev}
            accentColor="#03f5ff"
            className="absolute top-1/2 left-1 z-20 -translate-y-1/2 md:left-3"
          />

          {/* Next arrow */}
          <CarouselArrow
            direction="next"
            onClick={goNext}
            disabled={!canNext}
            accentColor="#0090ff"
            className="absolute top-1/2 right-1 z-20 -translate-y-1/2 md:right-3"
          />
        </div>

        {/* Pagination dots */}
        <CarouselDots
          count={plans.length}
          activeIndex={activeIndex}
          onSelect={goTo}
          getAccent={(index) => plans[index].accent}
          getLabel={(index) => `Ir a ${plans[index].name}`}
          className="mt-6 gap-2"
        />
      </div>

      <BuyModal plan={selectedPlan} onClose={handleCloseModal} />
    </section>
  )
}
