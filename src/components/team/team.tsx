"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react"

import { teamData } from "./teamData"


export default function TeamSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Configuración responsive del carousel
  const getItemsPerView = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1024) return 3 // lg: 3 items
      if (window.innerWidth >= 768) return 2 // md: 2 items
      return 1 // sm: 1 item
    }
    return 3
  }

  const [itemsPerView, setItemsPerView] = useState(3)

  useEffect(() => {
    const handleResize = () => {
      setItemsPerView(getItemsPerView())
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const maxIndex = Math.max(0, teamData.length - itemsPerView)
        return prev >= maxIndex ? 0 : prev + 1
      })
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, itemsPerView])

  const nextSlide = () => {
    const maxIndex = Math.max(0, teamData.length - itemsPerView)
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }

  const prevSlide = () => {
    const maxIndex = Math.max(0, teamData.length - itemsPerView)
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const maxIndex = Math.max(0, teamData.length - itemsPerView)

  return (
    <section id="equipo" className="w-full relative z-30 py-20 bg-black/20">
      <div className="w-[90%] mx-auto px-6">
                    <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-4xl lg:text-5xl font-bold text-white mb-6"
          >
            Nuestro <span className="text-[#03f5ff]">Equipo</span>
          </motion.h2>
          <p className="text-gray-300 text-xl max-w-3xl mx-auto">
            Conoce a los profesionales apasionados que hacen posible este evento único
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Navigation Buttons */}
          <motion.button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 backdrop-blur-sm border-2 border-[#03f5ff]/50 rounded-full p-3 text-[#03f5ff] hover:bg-[#03f5ff]/20 transition-all duration-300 hover:cursor-pointer"
            whileHover={{
              scale: 1.1,
              boxShadow: "0 0 20px rgba(3, 245, 255, 0.6)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>

          <motion.button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 backdrop-blur-sm border-2 border-[#03f5ff]/50 rounded-full p-3 text-[#03f5ff] hover:bg-[#03f5ff]/20 transition-all duration-300 hover:cursor-pointer"
            whileHover={{
              scale: 1.1,
              boxShadow: "0 0 20px rgba(3, 245, 255, 0.6)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>

          {/* Carousel Content */}
          <div className="overflow-hidden mx-12">
            <motion.div
              className="flex transition-transform duration-500 ease-out"
              animate={{
                x: `${-currentIndex * (100 / itemsPerView)}%`,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {teamData.map((member, index) => (
                <motion.div
                  key={member.id}
                  className={`shrink-0 px-4`}
                  style={{ width: `${100 / itemsPerView}%` }}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <div
                    className="relative bg-black/40 backdrop-blur-sm rounded-2xl overflow-hidden border-2 p-6 h-full"
                    style={{ borderColor: member.neonColor }}
                  >
                    {/* Imagen del miembro */}
                    <div className="relative mb-6">
                      <div
                        className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4"
                        style={{ borderColor: member.neonColor }}
                    >
                    <div className="w-full h-32 relative">
                      <Image src={member.img} alt={member.name} fill className="cover" />
                    </div>
                      </div>

                      {/* Efectos decorativos */}
                      <motion.div
                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full"
                        style={{ backgroundColor: member.neonColor }}
                        
                      />
                    </div>

                    {/* Información del miembro */}
                    <div className="text-center">
                      <h3 className="text-white font-bold text-xl mb-2">{member.name}</h3>
                      <p
                        className="font-semibold mb-4"
                        style={{ color: member.neonColor }}
                      >
                        {member.role}
                      </p>
                    </div>

                    {/* Grid de fondo */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="grid grid-cols-6 grid-rows-6 h-full w-full">
                        {[...Array(36)].map((_, i) => (
                          <div
                            key={i}
                            className="border-r border-b opacity-30"
                            style={{ borderColor: member.neonColor }}
                          />
                        ))}
                      </div>
                    </div>
            </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-3 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                  currentIndex === index
                    ? "bg-[#03f5ff] border-[#03f5ff]"
                    : "bg-transparent border-[#03f5ff]/50 hover:border-[#03f5ff]"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}

              />
            ))}
          </div>

          {/* Progress Bar */}
          <div className="mt-6 mx-auto max-w-md">
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-linear-to-r from-[#03f5ff] to-[#0090ff] rounded-full"
                animate={{
                  width: `${((currentIndex + 1) / (maxIndex + 1)) * 100}%`,
                }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Auto-play indicator */}
          <div
            className="absolute top-4 right-4 flex items-center space-x-2 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1 border border-[#03f5ff]/30"
          >
            <div
              className={`w-2 h-2 rounded-full ${isAutoPlaying ? "bg-green-400" : "bg-red-400"}`}
            />
            <span className="text-white text-xs font-mono">{isAutoPlaying ? "AUTO" : "MANUAL"}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
