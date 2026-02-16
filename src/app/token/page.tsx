"use client";
import React, { useEffect, useState } from 'react';
import Card from '@/components/activities/card/card';
import ParticlesBackground from '@/components/utils/ParticlesBackground';

// Simple ICO phase data (static for now)
const ICO_PHASES = [
  { phase: 'Friends & Family', tokens: 5000, price: '$0.01' },
  { phase: 'Private Sale', tokens: 10000, price: '$0.02' },
  { phase: 'Public Sale', tokens: 20000, price: '$0.03' },
];

// Use cases data for student-style cards (adapted for token page use cases)
const USE_CASES = [
  { title: '🎟 Acceso VIP', description: 'Acceso a áreas y eventos' },
  { title: '🎤 Votación de speakers', description: 'Participa en la selección de speakers' },
  { title: '🎁 Recompensas por referidos', description: 'Recompensas por invitar a otros' },
  { title: '🖼 Compra de NFTs del evento', description: 'NFTs coleccionables del evento' },
  { title: '📉 Descuentos progresivos en entradas', description: 'Descuentos por fases' },
  { title: '🔒 Staking (próximamente)', description: 'Staking de TCST' },
];

export default function TokenPage() {
  // ICO counter (simulado)
  const [start] = useState<number>(Date.now());
  const [now, setNow] = useState<number>(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const remaining = Math.max(0, Math.floor((3600 - ((now - start) / 1000))));

  return (
    <main className="min-h-screen p-6 bg-linear-to-b from-black/90 to-black/60 text-white">
      {/* HERO */}
      <section id="hero-token" className="py-12 px-6 text-center bg-linear-to-r from-slate-800 to-slate-900 rounded-xl shadow-xl mb-8">
        <h1 className="text-5xl font-bold mb-2">TCST</h1>
        <div className="text-2xl md:text-3xl font-semibold mb-4">El Token Oficial del Tecno Crypto Summit</div>
        <p className="max-w-2xl mx-auto mb-4">Impulsando la economía Web3 del evento tecnológico más innovador de Latinoamérica.</p>
        <div className="flex justify-center gap-4 flex-wrap mb-6">
          <a href="/assets/TCST-White-Paper.pdf" download className="px-4 py-2 rounded bg-white/20">📄 Leer White Paper</a>
          <a href="#ico" className="px-4 py-2 rounded bg-linear-to-r from-[#3b82f6] to-[#0ea5e9]">🚀 Participar en la ICO</a>
          <a href="#contract" className="px-4 py-2 rounded bg-black/40">🔗 Ver contrato en Algorand</a>
        </div>
        <div className="mt-6 flex justify-center items-center gap-8">
          <div className="h-40 w-72 border-2 border-dashed border-white/30 rounded-lg flex items-center justify-center text-sm text-white/70">Imagen 1</div>
          <div className="text-6xl font-bold">100,000</div>
        </div>
      </section>

      {/* 2) ¿Qué es TCST? */}
      <ParticlesBackground dots={200} lines={100}>
        <section id="que-es" className="relative py-12 px-6">
          <h2 className="text-3xl font-bold text-center mb-4">¿Qué es TCST?</h2>
          <p className="text-center max-w-3xl mx-auto">El Tecno Crypto Summit Token (TCST) es un token utilitario desarrollado para potenciar la participación, el engagement y la economía interna del evento.</p>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto text-center text-sm text-gray-200">
            <div className="bg-black/40 rounded p-3 border border-white/10">Nombre: Tecno Crypto Summit Token</div>
            <div className="bg-black/40 rounded p-3 border border-white/10">Símbolo: TCST</div>
            <div className="bg-black/40 rounded p-3 border border-white/10">Supply: 100,000</div>
            <div className="bg-black/40 rounded p-3 border border-white/10">Tipo: Utilitario</div>
            <div className="bg-black/40 rounded p-3 border border-white/10">Blockchain inicial: Algorand</div>
            <div className="bg-black/40 rounded p-3 border border-white/10">Futuras: Ethereum, Polygon, BSC, Arbitrum</div>
          </div>
        </section>

        {/* 3) Tokenomics */}
        <section id="tokenomics" className="relative py-12 px-6">
          <h2 className="text-3xl font-bold text-center mb-4">Tokenomics</h2>
          <div className="flex justify-center mb-6">
            <div className="w-60 h-60 rounded-full" style={{ background: 'conic-gradient(#10b981 0 30%, #f59e0b 30% 45%, #6b7280 45% 55%, #3b82f6 55% 65%, #a78bfa 65% 100%)' }} />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center text-xs text-gray-200 max-w-4xl mx-auto">
            {[
              { label:'Founders', color:'#10b981' },
              { label:'Community', color:'#f59e0b' },
              { label:'Financing', color:'#e11d48' },
              { label:'Marketing', color:'#3b82f6' },
              { label:'ICO', color:'#a855f7' },
            ].map((s)=> (
              <div key={s.label} className="py-2 border-t" style={{ borderTopColor: s.color }}>
                <span style={{ color: s.color }}>{s.label}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 max-w-3xl mx-auto">
            <div className="bg-black/40 rounded p-4 border border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-left text-sm text-gray-200">
                {ICO_PHASES.map((p)=> (
                  <div key={p.phase}>
                    <div className="font-semibold">{p.phase}</div>
                    <div className="text-xs">{p.tokens} tokens @ {p.price}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {true && (
            <div className="text-center mt-4" id="ico-counter">ICO activo</div>
          )}
        </section>

        {/* 4) Casos de Uso Reales */}
        <section id="use-cases" className="relative py-12 px-6">
          <h2 className="text-3xl font-bold text-center mb-6">Casos de Uso Reales</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
            {USE_CASES.map((u)=> (
              <Card key={u.title} title={u.title} description={u.description} />
            ))}
          </div>
        </section>

        {/* 5) Seguridad & Transparencia */}
        <section id="security" className="relative py-12 px-6">
          <h3 className="text-xl font-bold text-center mb-2">Seguridad & Transparencia</h3>
          <ul className="max-w-xl mx-auto list-disc pl-5 text-sm text-gray-200 text-left">
            <li>✔ Contrato verificado en Algorand</li>
            <li>✔ Supply fijo</li>
            <li>✔ Sin minteo adicional</li>
            <li>✔ Billeteras multisig</li>
            <li>✔ Transparencia comunitaria</li>
          </ul>
        </section>

        {/* 6) Advertencia Legal */}
        <section id="legal" className="relative py-8 px-6 text-center">
          <h3 className="text-xl font-bold mb-2">Advertencia Legal</h3>
          <p className="text-sm text-gray-300">TCST es un token utilitario. No representa acciones, dividendos ni derechos financieros. Su uso se limita al ecosistema del Tecno Crypto Summit. Esto es importante para regulación en Argentina.</p>
        </section>

        {/* 7) CTA Final */}
        <section id="cta" className="py-8 px-6 text-center">
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#comprar" className="inline-flex items-center px-4 py-2 rounded bg-linear-to-r from-[#10b981] to-[#059669]">Comprar TCST</a>
            <a href="#community" className="inline-flex items-center px-4 py-2 rounded bg-white/10">Unirse a la comunidad</a>
            <a href="/assets/TCST-White-Paper.pdf" download className="inline-flex items-center px-4 py-2 rounded bg-black/40">Descargar Whitepaper</a>
          </div>
        </section>
      </ParticlesBackground>
    </main>
  )
}
