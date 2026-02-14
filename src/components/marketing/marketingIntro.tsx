"use client";
import Link from 'next/link';
import React from 'react'

export default function MarketingIntro(){
  return (
    <section id="marketing-intro" className="relative py-14 px-6 bg-linear-to-r from-black/40 to-black/60 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <div className="text-3xl md:text-4xl font-extrabold mb-2">TCST - El Token oficial del Techno Crypto Summit</div>
        <p className="text-lg mb-4">Un token utilitario que desbloquea acceso, participación y beneficios dentro del ecosistema del evento.</p>
        <div className="flex justify-center gap-4 mb-4">
          <Link href="/token" 
            className="w-[60%] inline-flex items-center p-4 rounded bg-linear-to-r from-[#3b82f6] to-[#0ea5e9]"
          >
            <span className='w-full text-center text-3xl font-bold'>Ver TCST</span>
          </Link>
        </div>
        <div className="mt-8 flex justify-center gap-3 flex-wrap text-xs text-gray-200">
          <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20">Supply: 100,000</span>
          <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20">Emisión: Algorand</span>
          <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20">Futuro: Multi-chain</span>
        </div>
      </div>
    </section>
  );
}
