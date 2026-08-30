'use client'

import { motion } from "framer-motion"
import { Users, Megaphone, Briefcase, LayoutGrid } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface SponsorValue {
  icon: LucideIcon
  title: string
  description: string
  accent: string
}

const SPONSOR_VALUES: SponsorValue[] = [
  {
    icon: Users,
    title: "Alcance masivo",
    description:
      "Más de 20.000 visitantes, 10.000 estudiantes y 50 expertos se reúnen durante 4 días en un mismo lugar: tu marca frente a una audiencia que no podés ignorar.",
    accent: "#03f5ff",
  },
  {
    icon: Megaphone,
    title: "Posicionamiento de marca",
    description:
      "Presencia en escenario, streaming, pantallas, materiales y redes sociales del evento. Tu logo integrado a la experiencia de miles de asistentes.",
    accent: "#00c6ff",
  },
  {
    icon: Briefcase,
    title: "Acceso al talento",
    description:
      "Conectá con profesionales, desarrolladores y futuros referentes del ecosistema tech: el talento que tu empresa necesita para crecer.",
    accent: "#b5bbef",
  },
  {
    icon: LayoutGrid,
    title: "300+ stands",
    description:
      "Exhibí tu propuesta en uno de los eventos de tecnología más grandes de Argentina, con más de 300 espacios disponibles para empresas.",
    accent: "#0090ff",
  },
]

export default function CorporateSponsors() {
  return (
    <section id="sponsors" className="w-full relative z-30 py-24 bg-black/20">
      <div className="w-[90%] max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-4xl lg:text-5xl font-bold text-white mb-6"
            animate={{
              textShadow: [
                "0 0 20px rgba(3, 245, 255, 0.5)",
                "0 0 40px rgba(3, 245, 255, 0.8)",
                "0 0 20px rgba(3, 245, 255, 0.5)",
              ],
            }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          >
            ¿Por qué sponsorear el{" "}
            <span className="bg-linear-to-r from-[#03f5ff] to-[#b5bbef] bg-clip-text text-transparent">
              TechnoCrypto Summit?
            </span>
          </motion.h2>
          <p className="text-gray-300 text-xl max-w-4xl mx-auto leading-relaxed">
            No es solo un evento: es el punto de encuentro donde la tecnología,
            las criptomonedas y la inteligencia artificial definen las próximas
            décadas.{" "}
            <span className="text-[#03f5ff] font-bold">
              Ser sponsor es estar donde el futuro se construye.
            </span>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SPONSOR_VALUES.map((value, index) => {
            const IconComponent = value.icon
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: index * 0.1, duration: 0.6 },
                }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-[#03f5ff]/30"
              >
                <div className="flex items-start gap-5">
                  <motion.div
                    className="w-14 h-14 rounded-2xl bg-linear-to-br from-[#03f5ff]/20 to-[#0090ff]/10 border border-[#03f5ff]/30 flex items-center justify-center shrink-0"
                    animate={{
                      boxShadow: [
                        `0 0 15px ${value.accent}40`,
                        `0 0 30px ${value.accent}60`,
                        `0 0 15px ${value.accent}40`,
                      ],
                    }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <IconComponent className="w-7 h-7" style={{ color: value.accent }} />
                  </motion.div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-white">{value.title}</h3>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.p
          className="text-center text-[#03f5ff] text-lg font-semibold mt-12"
          initial={{ opacity: 0.7 }}
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
        >
          Más de 300 stands disponibles para empresas, startups y sponsors.
        </motion.p>
      </div>
    </section>
  )
}