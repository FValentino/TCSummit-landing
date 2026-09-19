'use client'

import { motion } from "framer-motion"
import { DollarSign, Calendar, CreditCard, Shield, Handshake } from "lucide-react"

const POLICY_ITEMS = [
  {
    icon: DollarSign,
    title: "Precios en USD + IVA",
    description:
      "Todos los valores publicados son en dólares estadounidenses más IVA. El contrato define la conversión a pesos y la referencia cambiaria.",
    accent: "#03f5ff",
  },
  {
    icon: Calendar,
    title: "Ventanas de precio",
    description:
      "Early Bird → Preventa → Tarifa Normal. La prioridad de elección de ubicación y categoría se vincula a la reserva y el pago.",
    accent: "#00c6ff",
  },
  {
    icon: CreditCard,
    title: "Formas de pago",
    description:
      "Esquema sugerido: 30% de reserva + saldo en cuotas con vencimientos definidos. Early Bird requiere pago total.",
    accent: "#b5bbef",
  },
  {
    icon: Shield,
    title: "Sin descuentos agresivos",
    description:
      "En lugar de bajar precios, sumamos valor: entradas adicionales, pantallas, presencia web o activaciones extras.",
    accent: "#0090ff",
  },
  {
    icon: Handshake,
    title: "Exclusividad de categoría",
    description:
      "Disponible mediante contrato con cupo, alcance y vigencia definidos. Protegemos la inversión de cada partner.",
    accent: "#03f5ff",
  },
]

export default function PartnersPolicy() {
  return (
    <section id="politica" className="w-full relative z-30 py-24 bg-black/20">
      <div className="w-[90%] max-w-5xl mx-auto">
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
            Política{" "}
            <span className="bg-linear-to-r from-[#03f5ff] to-[#b5bbef] bg-clip-text text-transparent">
              comercial
            </span>
          </motion.h2>
          <p className="text-gray-300 text-xl max-w-3xl mx-auto">
            Condiciones y términos para todos los patrocinadores y empresas
            participantes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {POLICY_ITEMS.map((item, index) => {
            const IconComponent = item.icon
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-black/40 backdrop-blur-sm rounded-xl border border-[#03f5ff]/20 p-6 hover:border-[#03f5ff]/40 transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-lg bg-[#03f5ff]/10 border border-[#03f5ff]/30 flex items-center justify-center shrink-0"
                  >
                    <IconComponent className="w-5 h-5" style={{ color: item.accent }} />
                  </div>
                  <h3 className="text-white font-bold text-base">{item.title}</h3>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
