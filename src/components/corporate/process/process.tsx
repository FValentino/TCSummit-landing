'use client'

import { motion } from "framer-motion"
import { PROCESS_STEPS } from "./processData"

export default function CorporateProcess() {
  return (
    <section id="proceso" className="w-full relative z-30 py-24 bg-black/20 overflow-hidden">
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
            ¿Cómo funciona el{" "}
            <span className="bg-linear-to-r from-[#03f5ff] to-[#b5bbef] bg-clip-text text-transparent">
              proceso de sponsor?
            </span>
          </motion.h2>
          <p className="text-gray-300 text-xl max-w-3xl mx-auto">
            Un camino simple, transparente y diseñado para que tu empresa
            obtenga resultados desde el primer contacto.
          </p>
        </motion.div>

        <div className="relative">
          {/* Línea conectora (desktop) */}
          <div className="hidden lg:block absolute top-8 left-[10%] right-[10%] h-0.5 bg-linear-to-r from-[#03f5ff] via-[#0090ff] to-[#03f5ff] opacity-30" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {PROCESS_STEPS.map((step, index) => {
              const IconComponent = step.icon
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: index * 0.15, duration: 0.6 },
                  }}
                  viewport={{ once: true, margin: "-50px" }}
                  whileHover={{ y: -6 }}
                  className="relative flex flex-col items-center text-center"
                >
                  {/* Ícono numerado */}
                  <motion.div
                    className="relative w-16 h-16 rounded-full border-4 border-[#002c6b] bg-linear-to-br from-[#03f5ff] to-[#0090ff] flex items-center justify-center mb-6"
                    animate={{
                      boxShadow: [
                        "0 0 0 0 rgba(3, 245, 255, 0.4)",
                        "0 0 0 8px rgba(3, 245, 255, 0.15)",
                        "0 0 0 0 rgba(3, 245, 255, 0.4)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <IconComponent className="w-7 h-7 text-[#002c6b]" />
                    <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#03f5ff] border-2 border-[#002c6b] flex items-center justify-center text-white text-xs font-bold">
                      {step.id}
                    </span>
                  </motion.div>

                  <motion.div
                    className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-white/10 w-full transition-colors duration-300 hover:border-[#03f5ff]/40"
                    whileHover={{
                      borderColor: "rgba(3, 245, 255, 0.4)",
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                    }}
                  >
                    <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}