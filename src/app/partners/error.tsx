"use client"

import { useEffect } from "react"

/** Segment-scoped, not global. The floor plan reads prices off the sponsor tariff, so a rename
 *  there is enough to throw during render — and without a boundary that replaces the whole
 *  statically prerendered `/partners` page: hero, sponsors, participate, assets, process, policy
 *  and the contact form, on a marketing route. A root `error.tsx` or `global-error.tsx` is
 *  deliberately not created, because those widen a failed section into a failed page.
 *
 *  The fallback must not try to render the plan either: the failure usually comes out of the
 *  plan's own data module, so drawing its zones here would run the code that just threw.
 *
 *  That is also why the copy is inline instead of living in `floorplanCopy.ts`. Importing a
 *  copy module onto this path would import the floorplan module graph onto the failure path,
 *  and the fallback is the one component that has to work when that graph does not. It also
 *  means the string is scoped to the route rather than to a floorplan concern it does not have.
 */
interface PartnersErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

const COPY = {
  eyebrow: "Mapa de stands",
  title: "Esta sección no está disponible",
  body: "No pudimos cargar el plano del recinto. El resto de la página sigue en pie: podés reintentarlo, o escribinos y te ayudamos a elegir tu ubicación.",
  retry: "Reintentar",
  contact: "Ir al formulario de contacto",
}

export default function PartnersError({ error, reset }: PartnersErrorProps) {
  useEffect(() => {
    // A debugging aid, not alerting. A client `console.error` is not collected by Vercel
    // unless something forwards it, and this project has no endpoint to forward it to —
    // `sendBeacon` to a URL that does not exist would manufacture the appearance of a signal
    // without one behind it. `digest` is the only handle the server hands a client-side
    // error, so it is logged beside the message it identifies.
    console.error(`[partners] ${COPY.title} (digest ${error.digest ?? "none"})`, error)
  }, [error])

  return (
    <section
      aria-label={COPY.eyebrow}
      className="relative z-30 w-full py-24"
    >
      <div className="mx-auto w-[90%] max-w-3xl">
        <p className="text-xs font-semibold tracking-widest text-[#03f5ff] uppercase">
          {COPY.eyebrow}
        </p>
        <h2 className="mt-4 text-3xl font-bold text-white lg:text-4xl [text-shadow:0_0_20px_rgba(3,245,255,0.5)]">
          {COPY.title}
        </h2>
        <p className="mt-4 text-base text-gray-300">{COPY.body}</p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="rounded-2xl bg-linear-to-r from-[#03f5ff] to-[#0090ff] px-6 py-3 text-center text-base font-bold text-[#002c6b] shadow-lg transition-transform hover:scale-[1.02] motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#03f5ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#002c6b]"
          >
            {COPY.retry}
          </button>
          {/* The contact form is this page's actual conversion path, so a visitor who lands
              here must still be able to reach it without reloading. */}
          <a
            href="#contacto"
            className="rounded-2xl border border-[#03f5ff]/20 bg-black/40 px-6 py-3 text-center text-base font-semibold text-[#03f5ff] backdrop-blur-sm transition-colors motion-reduce:transition-none hover:bg-[#03f5ff]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#03f5ff]"
          >
            {COPY.contact}
          </a>
        </div>
      </div>
    </section>
  )
}
