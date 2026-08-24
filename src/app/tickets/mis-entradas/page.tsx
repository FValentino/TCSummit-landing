"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Ticket, Calendar, MapPin, Clock, Download, QrCode } from "lucide-react"
import ParticlesBackground from "@/components/utils/ParticlesBackground"
import { useCarousel } from "@/components/common/carousel/useCarousel"
import CarouselArrow from "@/components/common/carousel/carouselArrow"
import CarouselDots from "@/components/common/carousel/carouselDots"

const tickets = [
  {
    id: 1,
    name: "Ticket Early Bird",
    type: "Acceso General",
    description: "Edición limitada - Acceso a todas las charlas y stands",
    owner: "Juan Pérez",
    code: "TC-EB-2026-0042",
    color: "#03f5ff",
  },
  {
    id: 2,
    name: "Ticket VIP",
    type: "Acceso VIP",
    description: "Meet & Greet + Acceso preferencial + Merchandising exclusivo",
    owner: "María García",
    code: "TC-VIP-2026-0043",
    color: "#0090ff",
  },
]

const eventInfo = {
  date: "15 y 16 de Agosto, 2026",
  time: "09:00 - 18:00",
  location: "Quorum, Buenos Aires",
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
}

export default function MisEntradasPage() {
  const [direction, setDirection] = useState(0)
  const totalTickets = tickets.length

  const { index: currentIndex, next: goNext, prev: goPrev, goTo, canPrev, canNext } = useCarousel({
    total: totalTickets,
    keyboard: true,
    onNavigate: (action, target) => {
      if (action === "next") setDirection(1)
      else if (action === "prev") setDirection(-1)
      else setDirection(target > currentIndex ? 1 : -1)
    },
  })

  const ticket = tickets[currentIndex]

  return (
    <main className="w-full min-h-screen">
      <ParticlesBackground dots={80} lines={20}>
        <section className="w-full min-h-screen flex flex-col pt-20 md:pt-24 lg:pt-28">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-3 md:py-6 shrink-0"
          >
            <motion.div
              className="inline-flex items-center gap-2 md:gap-3"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: "spring", bounce: 0.4 }}
            >
              <Ticket className="w-7 h-7 md:w-10 md:h-10 text-[#03f5ff]" />
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white">
                Mis{" "}
                <span
                  className="text-[#03f5ff]"
                  style={{
                    textShadow: "0 0 20px rgba(3, 245, 255, 0.6)",
                  }}
                >
                  Entradas
                </span>
              </h1>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-[#fcfef9]/80 text-sm md:text-lg mt-1 md:mt-2"
            >
              Tenés {tickets.length} entrada{tickets.length > 1 ? "s" : ""} confirmada{tickets.length > 1 ? "s" : ""}
            </motion.p>
          </motion.div>

          {/* Carousel */}
          <div className="flex-1 min-h-0 flex items-center justify-center px-4 overflow-hidden relative">
            {/* Prev Arrow */}
            {canPrev && (
              <CarouselArrow
                direction="prev"
                onClick={goPrev}
                accentColor={ticket.color}
                className="absolute left-2 md:left-6 z-20"
              />
            )}

            {/* Slide */}
            <div className="w-full max-w-lg mx-auto max-h-full">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={ticket.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, type: "spring", bounce: 0.25 }}
                  className="relative group max-h-full"
                >
                  <div
                    className="relative rounded-2xl overflow-hidden border-2 backdrop-blur-sm flex flex-col"
                    style={{
                      borderColor: `${ticket.color}40`,
                      maxHeight: "100%",
                    }}
                  >
                    <div
                      className="absolute inset-0 opacity-5"
                      style={{
                        background: `linear-gradient(135deg, ${ticket.color}, transparent)`,
                      }}
                    />

                    {/* Scrollable content area */}
                    <div className="relative overflow-y-auto overscroll-contain p-4 md:p-6 space-y-3 md:space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <span
                            className="inline-block px-2 md:px-3 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs font-bold text-[#002c6b] mb-1 md:mb-2"
                            style={{ backgroundColor: ticket.color }}
                          >
                            {ticket.type}
                          </span>
                          <h2 className="text-lg md:text-2xl font-bold text-[#fcfef9]">{ticket.name}</h2>
                        </div>
                        <motion.div
                          whileHover={{ rotate: 90, scale: 1.2 }}
                          transition={{ duration: 0.3 }}
                          className="p-2 md:p-3 rounded-xl bg-black/30 shrink-0"
                        >
                          <QrCode className="w-6 h-6 md:w-8 md:h-8" style={{ color: ticket.color }} />
                        </motion.div>
                      </div>

                      <p className="text-[#fcfef9]/70 text-xs md:text-sm">{ticket.description}</p>

                      <div className="border-t border-[#fcfef9]/10 pt-3 md:pt-4 space-y-2 md:space-y-3">
                        <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm">
                          <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4 shrink-0" style={{ color: ticket.color }} />
                          <span className="text-[#fcfef9]/80">{eventInfo.date}</span>
                        </div>
                        <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm">
                          <Clock className="w-3.5 h-3.5 md:w-4 md:h-4 shrink-0" style={{ color: ticket.color }} />
                          <span className="text-[#fcfef9]/80">{eventInfo.time}</span>
                        </div>
                        <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm">
                          <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 shrink-0" style={{ color: ticket.color }} />
                          <span className="text-[#fcfef9]/80">{eventInfo.location}</span>
                        </div>
                      </div>

                      <div className="border-t border-[#fcfef9]/10 pt-3 md:pt-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-[#fcfef9]/50 text-[10px] md:text-xs uppercase tracking-wider">Propietario</p>
                            <p className="text-[#fcfef9] text-xs md:text-base font-medium">{ticket.owner}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-[#fcfef9]/50 text-[10px] md:text-xs uppercase tracking-wider">Código</p>
                            <p className="text-[#fcfef9] font-mono text-xs md:text-sm" style={{ color: ticket.color }}>
                              {ticket.code}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="relative px-4 md:px-6 py-2 md:py-4 bg-black/20 flex items-center justify-between shrink-0">
                      <div className="flex items-center gap-1.5 md:gap-2">
                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#10b981] animate-pulse" />
                        <span className="text-[#10b981] text-[10px] md:text-sm font-medium">Entrada válida</span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-1 md:gap-2 px-2 md:px-4 py-1 md:py-2 rounded-lg text-[10px] md:text-sm font-medium transition-all duration-300 shrink-0"
                        style={{
                          backgroundColor: `${ticket.color}20`,
                          color: ticket.color,
                          border: `1px solid ${ticket.color}40`,
                        }}
                      >
                        <Download className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        Descargar
                      </motion.button>
                    </div>
                  </div>

                  <motion.div
                    className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"
                    style={{ backgroundColor: `${ticket.color}20` }}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Next Arrow */}
            {canNext && (
              <CarouselArrow
                direction="next"
                onClick={goNext}
                accentColor={ticket.color}
                className="absolute right-2 md:right-6 z-20"
              />
            )}
          </div>

          {/* Dots */}
          {totalTickets > 1 && (
            <CarouselDots
              count={totalTickets}
              activeIndex={currentIndex}
              onSelect={goTo}
              getAccent={(index) => tickets[index].color}
              getLabel={(index) => `Ir a entrada ${index + 1}`}
              className="gap-1.5 md:gap-2 py-2 md:py-4"
            />
          )}
        </section>
      </ParticlesBackground>
    </main>
  )
}
