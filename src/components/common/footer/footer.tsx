import { NAV_LINKS } from '@/components/common/navLinks'

/** Full chrome footer: brand block, anchor navigation and the closing CTA. A server
 *  component on purpose — no motion, no client state, nothing that needs hydration. */
export default function Footer() {
  return (
    <footer
      className="relative z-30 border-t border-[#03f5ff]/30 bg-black/60 py-12 backdrop-blur-xl"
      aria-label="Pie de página"
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-6 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <div
            className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#03f5ff] to-[#0090ff]"
            role="img"
            aria-label="Logo de TCSummit"
          >
            <span className="text-xl font-bold text-white">T</span>
          </div>
          <h2 className="text-2xl font-bold text-[#03f5ff]">TCSummit</h2>
          <p className="mt-2 max-w-xs text-sm text-gray-300">
            Conectando el futuro de la ciencia, la tecnología y la innovación.
          </p>
        </div>

        <nav aria-label="Navegación del pie de página">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[#03f5ff]">
            Explorar
          </h2>
          <ul className="space-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className="text-gray-300 transition-colors hover:text-[#03f5ff]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[#03f5ff]">
            Participá
          </h2>
          <p className="mb-4 max-w-xs text-sm text-gray-300">
            Sumate como sponsor, institución, gobierno o asistente.
          </p>
          <a
            href="#contacto"
            className="inline-flex items-center rounded-lg border border-[#03f5ff]/40 px-4 py-2 text-sm font-semibold text-[#03f5ff] transition-colors hover:bg-[#03f5ff]/10"
          >
            Contactanos
          </a>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl border-t border-[#03f5ff]/20 px-6 pt-6">
        <p className="text-center text-sm text-gray-400">
          © {new Date().getFullYear()} TCSummit. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}
