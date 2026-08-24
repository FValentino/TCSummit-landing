import { Bitcoin, CreditCard, Landmark } from "lucide-react"

export default function LegalFooter() {
  return (
    <footer className="relative z-10 w-full pt-12 pb-16">
      <div className="mx-auto max-w-7xl space-y-6 px-4 text-center">
        <p className="mx-auto max-w-2xl text-sm text-[#fcfef9]/60 md:text-base">
          Los precios mostrados están en USD. La conversión a ARS se realizará al momento del
          pago según la cotización oficial del día.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[#fcfef9]/50">
            <CreditCard className="h-4 w-4" />
            Tarjeta
          </span>
          <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[#fcfef9]/50">
            <Bitcoin className="h-4 w-4" />
            Crypto
          </span>
          <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[#fcfef9]/50">
            <Landmark className="h-4 w-4" />
            Transferencia
          </span>
        </div>
      </div>
    </footer>
  )
}
