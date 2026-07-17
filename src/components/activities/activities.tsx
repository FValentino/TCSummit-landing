"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { ACTIVITIES } from "./activitiesData"

export default function ActivitiesSection() {
  const [flippedCards, setFlippedCards] = useState<number[]>([])

  const toggleFlip = (cardId: number) => {
    setFlippedCards((prev) => (prev.includes(cardId) ? prev.filter((id) => id !== cardId) : [...prev, cardId]))
  }

  return (
    <section id="actividades" className="w-full relative z-30 py-20 bg-black/20">
      <div className="w-[90%] max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full text-center mb-16"
        >
          <motion.h2
            className="text-4xl lg:text-5xl font-bold text-white mb-6"
          >
            ¿CON QUE TE VAS A ENCONTRAR?
          </motion.h2>
          <p className="text-gray-300 text-xl max-w-4xl mx-auto">
            Al ofrecer una variedad de actividades y experiencias, podemos garantizar que el TechnoCrypto Summit sea un
            evento <span className="text-[#03f5ff] font-bold">INOLVIDABLE</span> y{" "}
            <span className="text-[#03f5ff] font-bold">ENRIQUECEDOR</span> para todos los asistentes
          </p>
        </motion.div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ACTIVITIES.map((activity, index) => {
            const IconComponent = activity.icon
            const isFlipped = flippedCards.includes(activity.id)

            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, rotateY: -90 }}
                whileInView={{
                  opacity: 1,
                  rotateY: 0,
                  transition: { delay: index * 0.1, duration: 0.6 },
                }}
                viewport={{ once: true }}
                className="h-96 perspective-[1000px]"
              >
                <motion.div
                  className="relative w-full h-full transform-3d"
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
                >
                  
                  <div
                    className={`absolute inset-0 bg-black/40 backdrop-blur-sm rounded-2xl p-6 
                    flex flex-col items-center justify-center 
                    shadow-lg border-2 boder border-[${activity.neonColor}]`}
                  >
                    
                    <div
                      className={`p-6 rounded-full mb-6 border-2 border-[${activity.neonColor}]`}
                    >
                      <IconComponent className={`w-12 h-12 text-[${activity.neonColor}]`} />
                    </div>

                    <h3 className="text-white font-bold text-xl text-center mb-6 leading-tight">{activity.title}</h3>

                    <motion.button
                      onClick={() => toggleFlip(activity.id)}
                      className={`px-6 py-3 rounded-full font-bold text-sm border-2 border-[${activity.neonColor}] 
                      transition-all duration-300 cursor-pointer text-[${activity.neonColor}]`}
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: `${activity.neonColor}30`,
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Más información
                    </motion.button>

                    <div
                      className="absolute top-4 right-4 w-3 h-3 rounded-full"
                      style={{ backgroundColor: `${activity.neonColor}60` }}
                    />
                    <div
                      className="absolute bottom-4 left-4 w-2 h-2 rounded-full"
                      style={{ backgroundColor: `${activity.neonColor}40` }}
                    />
                  </div>

                  <div
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-2 flex flex-col"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      borderColor: activity.neonColor,
                    }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="p-3 rounded-full border"
                        style={{
                          backgroundColor: `${activity.neonColor}20`,
                          borderColor: activity.neonColor,
                        }}
                      >
                        <IconComponent className="w-6 h-6" style={{ color: activity.neonColor }} />
                      </div>

                      <motion.button
                        onClick={() => toggleFlip(activity.id)}
                        className="p-2 rounded-full transition-all duration-200"
                        style={{ color: activity.neonColor }}
                        whileHover={{
                          scale: 1.1,
                          backgroundColor: `${activity.neonColor}30`,
                        }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ArrowLeft className="w-5 h-5" />
                      </motion.button>
                    </div>

                    <h3 className="text-white font-bold text-lg mb-4 text-center">{activity.title}</h3>

                    <div className="flex-1 overflow-y-auto">
                      <p className="text-white text-sm leading-relaxed text-justify">{activity.description}</p>
                    </div>

                    <div
                      className="mt-4 h-1 rounded-full opacity-75"
                      style={{ backgroundColor: `${activity.neonColor}40` }}
                    />
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="w-full text-center mt-12"
        >
          <p
            className="text-[#03f5ff] text-lg font-medium"
          >
            💡 Haz clic en &quot;Más información&quot; para conocer los detalles de cada actividad
          </p>
        </motion.div>
      </div>
    </section>
  )
}
