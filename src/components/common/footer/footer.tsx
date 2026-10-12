import Link from 'next/link'

import { DEPTH_LINKS, NAV_LINKS } from '@/components/common/navLinks'

/** Full chrome footer: brand block, anchor navigation and the closing CTA. A server
 *  component on purpose — no motion, no client state, nothing that needs hydration. */
export default function Footer() {
  return (
    <footer
      className="relative z-30 border-t border-[#F107CA]/30 bg-black/60 py-12 backdrop-blur-xl"
      aria-label="Pie de página"
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-6 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div
            className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#F107CA] to-[#C5128E]"
            role="img"
            aria-label="Logo de TCSummit"
          >
            <span className="text-xl font-bold text-white">T</span>
          </div>
          <h2 className="text-2xl font-bold text-[#F71ABF]">TCSummit</h2>
          <p className="mt-2 max-w-xs text-sm text-gray-300">
            Conectando el futuro de la ciencia, la tecnología y la innovación.
          </p>
        </div>

        <nav aria-label="Navegación del pie de página">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[#F71ABF]">
            Explorar
          </h2>
          <ul className="space-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className="text-gray-300 transition-colors hover:text-[#F71ABF]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Secciones del evento">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[#F71ABF]">
            Profundizar
          </h2>
          <ul className="space-y-2">
            {DEPTH_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-gray-300 transition-colors hover:text-[#F71ABF]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[#F71ABF]">
            Participá
          </h2>
          <p className="mb-4 max-w-xs text-sm text-gray-300">
            Sumate como sponsor, institución, gobierno o asistente.
          </p>
          <a
            href="#contacto"
            className="inline-flex items-center rounded-lg border border-[#F107CA]/40 px-4 py-2 text-sm font-semibold text-[#F71ABF] transition-colors hover:bg-[#F107CA]/10"
          >
            Contactanos
          </a>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl border-t border-[#F107CA]/30 px-6 pt-6">
        <p className="text-center text-sm text-gray-400">
          © {new Date().getFullYear()} TCSummit. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}
