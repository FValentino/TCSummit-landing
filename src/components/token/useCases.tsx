"use client";
import React from 'react'
import Card from '@/components/activities/card/card'
import { motion } from 'framer-motion'

interface UseCase {
  title: string
  description: string
}

const USE_CASES: UseCase[] = [
  { title: '🎟 Acceso VIP', description: 'Acceso a áreas y eventos' },
  { title: '🎤 Votación de speakers', description: 'Participa en la selección de speakers' },
  { title: '🎁 Recompensas por referidos', description: 'Recompensas por invitar a otros' },
  { title: '🖼 Compra de NFTs del evento', description: 'NFTs coleccionables del evento' },
  { title: '📉 Descuentos progresivos en entradas', description: 'Descuentos por fases' },
  { title: '🔒 Staking (próximamente)', description: 'Staking de TCST' },
]

export default function TokenUseCases(){
  return (
    <section id="use-cases" className="py-12 px-6">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Casos de Uso Reales</h2>
      <p className="text-center max-w-2xl mx-auto mb-6">TCST no es especulación. Es acceso, influencia y beneficios reales dentro del ecosistema TCS.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {USE_CASES.map((u) => (
          <motion.div key={u.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} whileHover={{ scale: 1.03 }} transition={{ duration: 0.25 }}>
            <Card title={u.title} description={u.description} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
