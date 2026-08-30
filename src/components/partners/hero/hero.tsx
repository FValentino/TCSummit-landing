'use client'

import { motion } from "framer-motion"
import { Calendar, Users, Building2, Presentation } from "lucide-react"

import { Saira, Orbitron } from "next/font/google"

const saira = Saira({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
})

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
})

const HERO_STATS = [
  { icon: Users, value: "+20.000", label: "Visitantes" },
  { icon: Building2, value: "+200", label: "Empresas" },
  { icon: Presentation, value: "+50", label: "Charlas" },
  { icon: Calendar, value: "4", label: "Días de evento" },
]

export default function PartnersHero() {
  return (
    <section
      id="hero-partners"
      className="relative w-full min-h-screen flex items-center overflow-hidden pt-28 pb-16"
    >
      {/* Orbes decorativos */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#03f5ff]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#0090ff]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-2/3 w-64 h-64 bg-[#b5bbef]/10 rounded-full blur-2xl pointer-events-none" />

      <div className="w-[90%] mx-auto relative z-10 text-center space-y-10">
        {/* Eyebrow */}
        <motion.p
          className={`${orbitron.className} inline-block text-[#03f5ff] text-sm md:text-base font-bold tracking-widest uppercase border border-[#03f5ff]/30 bg-[#03f5ff]/10 rounded-full px-6 py-2`}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Programa de Sponsors · TCSummit 2027
        </motion.p>

        {/* Título */}
        <motion.h1
          className={`${saira.className} text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mx-auto max-w-5xl`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Convierte tu marca en{" "}
          <motion.span
            className="text-[#03f5ff]"
            animate={{
              textShadow: [
                "0 0 20px rgba(3, 245, 255, 0.8)",
                "0 0 40px rgba(3, 245, 255, 1)",
                "0 0 20px rgba(3, 245, 255, 0.8)",
              ],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            protagonista
          </motion.span>{" "}
          de la próxima generación tech
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          className="text-gray-200 text-lg md:text-2xl max-w-4xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          El TechnoCrypto Summit es el evento de tecnología, criptomonedas e
          inteligencia artificial más grande de Argentina.{" "}
          <strong className="text-[#00c6ff]">
            Posiciona tu marca frente a miles de asistentes y al talento tech que
            define el futuro.
          </strong>
        </motion.p>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {HERO_STATS.map((stat) => {
            const IconComponent = stat.icon
            return (
              <motion.div
                key={stat.label}
                className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-[#03f5ff]/30 flex flex-col items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                animate={{
                  borderColor: ["rgba(3, 245, 255, 0.3)", "rgba(3, 245, 255, 0.6)", "rgba(3, 245, 255, 0.3)"],
                }}
                transition={{
                  borderColor: { duration: 2, repeat: Number.POSITIVE_INFINITY },
                }}
              >
                <IconComponent className="w-6 h-6 text-[#03f5ff]" />
                <motion.span
                  className="text-3xl font-bold text-white"
                  animate={{
                    textShadow: [
                      "0 0 10px rgba(3, 245, 255, 0.5)",
                      "0 0 20px rgba(3, 245, 255, 0.8)",
                      "0 0 10px rgba(3, 245, 255, 0.5)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  {stat.value}
                </motion.span>
                <p className="text-gray-300">{stat.label}</p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="w-full flex flex-col md:flex-row justify-center gap-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <motion.a
            href="#contacto"
            className="bg-linear-to-r from-[#03f5ff] to-[#0090ff] text-[#002c6b] px-8 py-4 rounded-2xl font-bold text-lg shadow-lg text-center"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 30px rgba(3, 245, 255, 0.6)",
            }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: [
                "0 0 20px rgba(3, 245, 255, 0.4)",
                "0 0 40px rgba(3, 245, 255, 0.6)",
                "0 0 20px rgba(3, 245, 255, 0.4)",
              ],
            }}
            transition={{
              boxShadow: { duration: 2, repeat: Number.POSITIVE_INFINITY },
            }}
          >
            Quiero ser sponsor
          </motion.a>

          <motion.a
            href="#beneficios"
            className="bg-transparent border-2 border-[#03f5ff] text-[#03f5ff] px-8 py-4 rounded-2xl font-bold text-lg hover:bg-[#03f5ff]/10 transition-all text-center"
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(3, 245, 255, 0.1)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            Ver beneficios
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}