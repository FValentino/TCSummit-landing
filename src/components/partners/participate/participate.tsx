'use client'

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, ArrowRight, ChevronDown } from "lucide-react"
import { GROUPS, type ParticipateGroup } from "./participateData"

/* ── Pricing table (expandable) ──────────────────────────────────── */

function PricingTable({ group }: { group: ParticipateGroup }) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="overflow-hidden"
    >
      <div className="mt-6 bg-black/40 backdrop-blur-sm rounded-xl border border-[#03f5ff]/15 overflow-hidden">
        <div
          className="grid gap-px bg-[#03f5ff]/10"
          style={{ gridTemplateColumns: `repeat(${group.pricingColumns.length}, 1fr)` }}
        >
          {group.pricingColumns.map((col) => (
            <div key={col.key} className="bg-[#002c6b]/80 px-5 py-3 text-[#03f5ff] font-bold text-xs uppercase tracking-wider">
              {col.label}
            </div>
          ))}
        </div>

        {group.pricingRows.map((row, i) => (
          <div
            key={i}
            className="grid gap-px border-t border-[#03f5ff]/10"
            style={{ gridTemplateColumns: `repeat(${group.pricingColumns.length}, 1fr)` }}
          >
            {group.pricingColumns.map((col, ci) => (
              <div
                key={col.key}
                className={`px-5 py-3.5 text-sm ${
                  ci === 0 ? "text-white font-semibold" : "text-gray-300 text-center"
                }`}
              >
                {String(row[col.key])}
              </div>
            ))}
          </div>
        ))}
      </div>
    </motion.div>
  )
}

/* ── Single card ─────────────────────────────────────────────────── */

const CONSULT_PREFIX: Record<string, string> = {
  niveles: "nivel de patrocinio",
  sponsorship: "paquete de sponsorship",
  corporativos: "pack corporativo",
}

function handleConsultar(group: ParticipateGroup, card: ParticipateGroup["cards"][number]) {
  const prefix = CONSULT_PREFIX[group.id] ?? group.title.toLowerCase()
  const message = `Buenas, quiero consultar por el ${prefix} ${card.name}.`
  window.dispatchEvent(
    new CustomEvent("partners:prefill-contact", { detail: message })
  )
  document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })
}

function ParticipateCard({
  card,
  index,
  accent,
  group,
}: {
  card: ParticipateGroup["cards"][number]
  index: number
  accent: string
  group: ParticipateGroup
}) {
  const IconComponent = card.icon
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      whileHover={{ y: -5 }}
      className="group relative"
    >
      <motion.div
        className={`relative bg-black/40 backdrop-blur-sm rounded-2xl border-2 ${card.borderColor} ${
          card.featured ? "bg-linear-to-b from-[#03f5ff]/10 to-transparent" : ""
        } flex flex-col h-full p-5 overflow-hidden`}
        animate={{
          boxShadow: [card.glow, "0 0 12px rgba(255,255,255,0.1)", card.glow],
        }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="grid grid-cols-4 grid-rows-4 h-full w-full">
            {Array.from({ length: 16 }, (_, i) => (
              <div key={i} className={`border-r border-b ${card.borderColor} opacity-20`} />
            ))}
          </div>
        </div>

        <div className="relative flex items-center gap-3 mb-3">
          <motion.div
            className={`w-10 h-10 rounded-xl bg-linear-to-br ${card.gradient} p-2 flex items-center justify-center shrink-0`}
            whileInView={{ rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            viewport={{ once: false }}
          >
            <IconComponent className="w-full h-full text-[#002c6b]" />
          </motion.div>
          <div>
            <h3 className="text-base font-bold text-white leading-tight">{card.name}</h3>
            {card.featured && (
              <span className="text-xs font-semibold" style={{ color: accent }}>
                Destacado
              </span>
            )}
          </div>
        </div>

        <p className="relative text-gray-300 text-sm leading-relaxed mb-4">{card.tagline}</p>

        <ul className="relative flex-1 space-y-2 mb-5">
          {card.benefits.map((benefit) => (
            <li key={benefit} className="flex items-start gap-2">
              <span className={`mt-0.5 w-4 h-4 rounded-full bg-linear-to-r ${card.gradient} flex items-center justify-center shrink-0`}>
                <Check className="w-2.5 h-2.5 text-[#002c6b] font-bold" />
              </span>
              <span className="text-white/85 text-xs leading-relaxed">{benefit}</span>
            </li>
          ))}
        </ul>

        <motion.button
          type="button"
          onClick={() => handleConsultar(group, card)}
          className={`relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-[#002c6b] bg-linear-to-r ${card.gradient} transition-all duration-300 hover:shadow-[0_0_25px_rgba(3,245,255,0.5)] cursor-pointer`}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Solicitar
          <ArrowRight className="w-3.5 h-3.5" />
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

/* ── Group section ───────────────────────────────────────────────── */

function ParticipateGroupSection({ group, index }: { group: ParticipateGroup; index: number }) {
  const [showPricing, setShowPricing] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className="space-y-8"
    >
      <div className="text-center">
        <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3">
          <span style={{ color: group.accent }}>{group.title}</span>
        </h3>
        <p className="text-gray-400 text-base max-w-2xl mx-auto">{group.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 items-stretch">
        {group.cards.map((card, i) => (
          <ParticipateCard key={card.id} card={card} index={i} accent={group.accent} group={group} />
        ))}
      </div>

      <div className="flex justify-center">
        <motion.button
          onClick={() => setShowPricing(!showPricing)}
          className="flex items-center gap-2 text-[#03f5ff] font-semibold text-sm hover:text-white transition-colors cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {showPricing ? "Ocultar precios" : "Ver precios"}
          <motion.span
            animate={{ rotate: showPricing ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.span>
        </motion.button>
      </div>

      <AnimatePresence>
        {showPricing && <PricingTable group={group} />}
      </AnimatePresence>
    </motion.div>
  )
}

/* ── Main section ────────────────────────────────────────────────── */

export default function PartnersParticipate() {
  return (
    <section id="participar" className="w-full relative z-30 py-24">
      <div className="w-[90%] max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
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
            Formas de{" "}
            <span className="bg-linear-to-r from-[#03f5ff] to-[#b5bbef] bg-clip-text text-transparent">
              participar
            </span>
          </motion.h2>
          <p className="text-gray-300 text-xl max-w-3xl mx-auto">
            Elegí la modalidad que mejor se adapte a tus objetivos: stands de
            exhibición, sponsorship con contenidos o paquetes corporativos
            todo incluido.
          </p>
        </motion.div>

        <div className="space-y-28">
          {GROUPS.map((group, index) => (
            <ParticipateGroupSection key={group.id} group={group} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
