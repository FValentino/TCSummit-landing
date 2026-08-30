'use client'

import { motion } from "framer-motion"
import { Users, Building2, Presentation, Calendar } from "lucide-react"
import Image from "next/image"
import robot from "@/assets/images/hero/robot.webp"

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
      className="relative w-full pt-28 pb-16 md:pt-20 md:min-h-[calc(100vh-4rem)] md:flex md:flex-col md:justify-center overflow-hidden"
    >
      {/* Orbes decorativos */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#03f5ff]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#0090ff]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-2/3 w-64 h-64 bg-[#b5bbef]/10 rounded-full blur-2xl pointer-events-none" />

      {/* Mascota como fondo sutil */}
      <div className="absolute right-0 bottom-0 w-[45%] max-w-xl opacity-20 pointer-events-none select-none">
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <Image
            src={robot}
            alt=""
            aria-hidden
            className="w-full h-auto"
            priority
          />
        </motion.div>
      </div>

      <div className="w-[90%] mx-auto relative z-10 flex flex-col gap-2 md:gap-3">
        {/* Bloque superior — eyebrow + chips (ancho completo) */}
        <div className="w-full flex flex-col gap-4">
          {/* Eyebrow */}
          <motion.p
            className={`${orbitron.className} self-start inline-block text-[#03f5ff] text-xs md:text-sm font-bold tracking-widest uppercase border border-[#03f5ff]/30 bg-[#03f5ff]/10 rounded-full px-5 py-1.5`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Programa de Sponsors · TCSummit 2027
          </motion.p>

          {/* Chips — ADN del evento */}
          <motion.div
            className="flex flex-wrap gap-2.5"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {["Tecnología", "Inteligencia Artificial", "Blockchain"].map(
              (chip) => (
                <span
                  key={chip}
                  className={`${orbitron.className} text-[11px] md:text-xs text-[#03f5ff]/80 font-semibold tracking-widest uppercase border border-[#03f5ff]/25 bg-[#03f5ff]/5 rounded-full px-4 py-1.5`}
                >
                  {chip}
                </span>
              )
            )}
          </motion.div>
        </div>

        {/* Bloque 60/40 — contenido + stats */}
        <div className="w-full md:flex md:items-center md:justify-between md:gap-12">
          {/* Columna izquierda — contenido */}
          <div className="w-full md:w-[60%] space-y-4">
            {/* Título */}
            <motion.h1
            className={`${saira.className} mb-4 text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight`}
            initial={{ opacity: 0, y: 40 }}
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
            className="text-gray-200 text-base md:text-xl max-w-xl leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Primera edición del mega evento sin precedentes en el país.{" "}
            <strong className="text-[#00c6ff]">
              Un espacio sin igual para destacar ante el talento y las empresas
              que definen la próxima generación tech.
            </strong>
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <motion.a
              href="#contacto"
              className="bg-linear-to-r from-[#03f5ff] to-[#0090ff] text-[#002c6b] px-7 py-3.5 rounded-2xl font-bold text-base shadow-lg text-center"
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
              className="bg-transparent border-2 border-[#03f5ff] text-[#03f5ff] px-7 py-3.5 rounded-2xl font-bold text-base hover:bg-[#03f5ff]/10 transition-all text-center"
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

        {/* Columna derecha — stats */}
        <motion.div
          initial={{ opacity: 0, x: 60, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="relative z-20 mt-12 md:mt-0 w-full md:w-[40%] grid grid-cols-2 md:grid-cols-1 gap-4"
        >
          {HERO_STATS.map((stat) => {
            const IconComponent = stat.icon
            return (
              <motion.div
                key={stat.label}
                className="bg-black/40 backdrop-blur-sm rounded-xl p-5 border border-[#03f5ff]/30 flex items-center gap-4"
                whileHover={{ scale: 1.05 }}
                animate={{
                  borderColor: [
                    "rgba(3, 245, 255, 0.3)",
                    "rgba(3, 245, 255, 0.6)",
                    "rgba(3, 245, 255, 0.3)",
                  ],
                }}
                transition={{
                  borderColor: {
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                  },
                }}
              >
                <div className="bg-[#03f5ff]/10 rounded-lg p-2.5 shrink-0">
                  <IconComponent className="w-6 h-6 text-[#03f5ff]" />
                </div>
                <div className="flex flex-col">
                  <motion.span
                    className="text-2xl font-bold text-white"
                    animate={{
                      textShadow: [
                        "0 0 10px rgba(3, 245, 255, 0.5)",
                        "0 0 20px rgba(3, 245, 255, 0.8)",
                        "0 0 10px rgba(3, 245, 255, 0.5)",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  >
                    {stat.value}
                  </motion.span>
                  <p className="text-gray-300 text-sm">{stat.label}</p>
                </div>
              </motion.div>
            )
          })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
