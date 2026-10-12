'use client'

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { AD_ASSETS, ASSET_CATEGORIES } from "./assetsData"

function formatUSD(amount: number) {
  return `USD ${amount.toLocaleString("en-US")}`
}

export default function PartnersAssets() {
  return (
    <section id="activos" className="w-full relative z-30 py-24">
      <div className="w-[90%] max-w-6xl mx-auto">
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
            Activos{" "}
            <span className="bg-linear-to-r from-[#03f5ff] to-[#b5bbef] bg-clip-text text-transparent">
              publicitarios
            </span>
          </motion.h2>
          <p className="text-gray-300 text-xl max-w-3xl mx-auto">
            Complementá tu presencia con publicidad física y digital en el
            evento. Todos los precios en USD + IVA.
          </p>
        </motion.div>

        <div className="space-y-12">
          {ASSET_CATEGORIES.map((category, catIndex) => {
            const categoryAssets = AD_ASSETS.filter(
              (a) => a.category === category.key
            )
            return (
              <motion.div
                key={category.key}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: catIndex * 0.15 }}
              >
                <h3 className="text-[#03f5ff] font-bold text-lg mb-5 tracking-wide uppercase">
                  {category.label}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categoryAssets.map((asset, index) => {
                    const IconComponent = asset.icon
                    return (
                      <motion.div
                        key={asset.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.5,
                          delay: catIndex * 0.15 + index * 0.08,
                        }}
                        whileHover={{ y: -4, scale: 1.02 }}
                        className="bg-black/40 backdrop-blur-sm rounded-xl border border-[#03f5ff]/20 p-5 flex flex-col gap-3 hover:border-[#03f5ff]/40 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-9 h-9 rounded-lg bg-linear-to-br ${asset.gradient} p-2 flex items-center justify-center shrink-0`}
                            >
                              <IconComponent className="w-full h-full text-[#002c6b]" />
                            </div>
                            <span className="text-white font-bold text-sm">
                              {asset.name}
                            </span>
                          </div>
                          <span className="text-[#03f5ff] font-bold text-lg">
                            {formatUSD(asset.price)}
                          </span>
                        </div>

                        <p className="text-gray-400 text-xs">{asset.format}</p>

                        <motion.button
                          type="button"
                          onClick={() => {
                            const message = `Buenas, quiero consultar por el activo publicitario ${asset.name}.`
                            window.dispatchEvent(
                              new CustomEvent("partners:prefill-contact", { detail: message })
                            )
                            document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })
                          }}
                          className="mt-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg font-bold text-xs text-[#002c6b] bg-linear-to-r from-[#03f5ff] to-[#0090ff] transition-all duration-300 hover:shadow-[0_0_20px_rgba(3,245,255,0.5)] cursor-pointer"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          Consultar
                          <ArrowRight className="w-3 h-3" />
                        </motion.button>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
