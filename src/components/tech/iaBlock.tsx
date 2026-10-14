import { IA } from "./techData"

/**
 * Inteligencia Artificial block (brief §26). Server-rendered: a static area list and a closing
 * line. The `areas` are not interactive here — they read as the agenda, not as triggers.
 */
export default function IaBlock() {
  return (
    <article className="flex h-full flex-col rounded-3xl border border-[#03f5ff]/25 bg-white/5 p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#03f5ff]">{IA.kicker}</p>
      <h3 className="mt-3 text-xl font-bold text-white sm:text-2xl">{IA.title}</h3>

      <div className="mt-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#03f5ff]">
          {IA.areasLabel}
        </p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {IA.areas.map((area) => (
            <li
              key={area}
              className="rounded-full border border-[#03f5ff]/20 bg-white/5 px-3 py-1 text-sm text-gray-200"
            >
              {area}
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-6 flex-1 border-l-2 border-[#03f5ff]/50 pl-4 text-base italic text-gray-200">
        {IA.quote}
      </p>
    </article>
  )
}
