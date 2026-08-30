'use client'

import { motion } from "framer-motion"
import { Check, ArrowRight } from "lucide-react"
import { TIERS } from "./benefitsData"

export default function CorporateBenefits() {
  return (
    <section id="beneficios" className="w-full relative z-30 py-24">
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
            Beneficios por{" "}
            <span className="bg-linear-to-r from-[#03f5ff] to-[#b5bbef] bg-clip-text text-transparent">
              nivel de patrocinio
            </span>
          </motion.h2>
          <p className="text-gray-300 text-xl max-w-3xl mx-auto">
            Cada plan está diseñado para maximizar la exposición de tu marca.
            Elegí el nivel que mejor se adapta a tus objetivos o consultanos un
            plan a medida.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
          {TIERS.map((tier, index) => {
            const IconComponent = tier.icon
            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: index * 0.1, duration: 0.6 },
                }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                <motion.div
                  className={`relative bg-black/40 backdrop-blur-sm rounded-2xl border-2 ${tier.borderColor} ${
                    tier.featured ? "bg-linear-to-b from-[#03f5ff]/10 to-transparent" : ""
                  } flex flex-col h-full p-8 overflow-hidden`}
                  animate={{
                    boxShadow: [tier.glow, "0 0 15px rgba(255, 255, 255, 0.15)", tier.glow],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  {/* Grid decorativo */}
                  <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="grid grid-cols-4 grid-rows-4 h-full w-full">
                      {Array.from({ length: 16 }, (_, i) => (
                        <div key={i} className={`border-r border-b ${tier.borderColor} opacity-20`} />
                      ))}
                    </div>
                  </div>

                  {/* Icono + nombre */}
                  <div className="relative flex items-center gap-3 mb-4">
                    <motion.div
                      className={`w-12 h-12 rounded-xl bg-linear-to-br ${tier.gradient} p-2.5 flex items-center justify-center shrink-0`}
                      whileInView={{ rotate: [0, 360] }}
                      transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      viewport={{ once: false }}
                    >
                      <IconComponent className="w-full h-full text-[#002c6b]" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white">
                      {tier.name}
                      {tier.featured && (
                        <span className="block text-sm font-semibold text-[#03f5ff] mt-1">
                          Más solicitado
                        </span>
                      )}
                    </h3>
                  </div>

                  <p className="relative text-gray-300 text-base leading-relaxed mb-6">
                    {tier.tagline}
                  </p>

                  {/* Beneficios */}
                  <ul className="relative flex-1 space-y-3 mb-8">
                    {tier.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-3">
                        <span
                          className={`mt-0.5 w-5 h-5 rounded-full bg-linear-to-r ${tier.gradient} flex items-center justify-center shrink-0`}
                        >
                          <Check className="w-3 h-3 text-[#002c6b] font-bold" />
                        </span>
                        <span className="text-white/90 text-sm leading-relaxed">{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <motion.a
                    href="#contacto"
                    className={`relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-[#002c6b] bg-linear-to-r ${tier.gradient} transition-all duration-300 hover:shadow-[0_0_30px_rgba(3,245,255,0.6)]`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Solicitar plan
                    <ArrowRight className="w-4 h-4" />
                  </motion.a>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}