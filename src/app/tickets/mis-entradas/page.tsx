"use client"

import { motion } from "framer-motion"
import { Ticket, Calendar, MapPin, Clock, Download, QrCode } from "lucide-react"
import ParticlesBackground from "@/components/utils/ParticlesBackground"

const tickets = [
  {
    id: 1,
    name: "Ticket Early Bird",
    type: "Acceso General",
    description: "Edición limitada - Acceso a todas las charlas y stands",
    owner: "Juan Pérez",
    code: "TC-EB-2026-0042",
    color: "#03f5ff",
  },
  {
    id: 2,
    name: "Ticket VIP",
    type: "Acceso VIP",
    description: "Meet & Greet + Acceso preferencial + Merchandising exclusivo",
    owner: "María García",
    code: "TC-VIP-2026-0043",
    color: "#0090ff",
  },
]

const eventInfo = {
  date: "15 y 16 de Agosto, 2026",
  time: "09:00 - 18:00",
  location: "Quorum, Buenos Aires",
}

export default function MisEntradasPage() {
  return (
    <main className="w-full min-h-screen">
      <ParticlesBackground dots={80} lines={20}>
        <section className="w-[90%] max-w-5xl mx-auto pt-28 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <motion.div
              className="inline-flex items-center gap-3 mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: "spring", bounce: 0.4 }}
            >
              <Ticket className="w-10 h-10 text-[#03f5ff]" />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                Mis{" "}
                <span
                  className="text-[#03f5ff]"
                  style={{
                    textShadow: "0 0 20px rgba(3, 245, 255, 0.6)",
                  }}
                >
                  Entradas
                </span>
              </h1>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-[#fcfef9]/80 text-lg"
            >
              Tenés {tickets.length} entrada{tickets.length > 1 ? "s" : ""} confirmada{tickets.length > 1 ? "s" : ""}
            </motion.p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2">
            {tickets.map((ticket, index) => (
              <motion.div
                key={ticket.id}
                initial={{ opacity: 0, y: 40, rotateX: -10 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: 0.3 + index * 0.2, duration: 0.6, type: "spring", bounce: 0.3 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="relative group"
              >
                <div
                  className="relative rounded-2xl overflow-hidden border-2 backdrop-blur-sm"
                  style={{ borderColor: `${ticket.color}40` }}
                >
                  <div
                    className="absolute inset-0 opacity-5"
                    style={{
                      background: `linear-gradient(135deg, ${ticket.color}, transparent)`,
                    }}
                  />

                  <div className="relative p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <span
                          className="inline-block px-3 py-1 rounded-full text-xs font-bold text-[#002c6b] mb-2"
                          style={{ backgroundColor: ticket.color }}
                        >
                          {ticket.type}
                        </span>
                        <h2 className="text-2xl font-bold text-[#fcfef9]">{ticket.name}</h2>
                      </div>
                      <motion.div
                        whileHover={{ rotate: 90, scale: 1.2 }}
                        transition={{ duration: 0.3 }}
                        className="p-3 rounded-xl bg-black/30"
                      >
                        <QrCode className="w-8 h-8" style={{ color: ticket.color }} />
                      </motion.div>
                    </div>

                    <p className="text-[#fcfef9]/70 text-sm">{ticket.description}</p>

                    <div className="border-t border-[#fcfef9]/10 pt-4 space-y-3">
                      <div className="flex items-center gap-3 text-sm">
                        <Calendar className="w-4 h-4 shrink-0" style={{ color: ticket.color }} />
                        <span className="text-[#fcfef9]/80">{eventInfo.date}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Clock className="w-4 h-4 shrink-0" style={{ color: ticket.color }} />
                        <span className="text-[#fcfef9]/80">{eventInfo.time}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <MapPin className="w-4 h-4 shrink-0" style={{ color: ticket.color }} />
                        <span className="text-[#fcfef9]/80">{eventInfo.location}</span>
                      </div>
                    </div>

                    <div className="border-t border-[#fcfef9]/10 pt-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[#fcfef9]/50 text-xs uppercase tracking-wider">Propietario</p>
                          <p className="text-[#fcfef9] font-medium">{ticket.owner}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[#fcfef9]/50 text-xs uppercase tracking-wider">Código</p>
                          <p className="text-[#fcfef9] font-mono text-sm" style={{ color: ticket.color }}>
                            {ticket.code}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative px-6 py-4 bg-black/20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                      <span className="text-[#10b981] text-sm font-medium">Entrada válida</span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
                      style={{
                        backgroundColor: `${ticket.color}20`,
                        color: ticket.color,
                        border: `1px solid ${ticket.color}40`,
                      }}
                    >
                      <Download className="w-4 h-4" />
                      Descargar
                    </motion.button>
                  </div>
                </div>

                <motion.div
                  className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"
                  style={{ backgroundColor: `${ticket.color}20` }}
                />
              </motion.div>
            ))}
          </div>
        </section>
      </ParticlesBackground>
    </main>
  )
}
