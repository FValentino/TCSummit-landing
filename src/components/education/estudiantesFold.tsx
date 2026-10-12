import { EDUCATION_FOLD, ESTUDIANTES_EMAIL, FOLD_CTA } from "./educationData"

/**
 * Folded `/estudiantes` content inside `#educacion` (spec publics-depth "Overlap —
 * /estudiantes disposition"; resolved decision 3). Presentational: the registration paths,
 * the student contact and the transport note that previously lived on the dedicated route.
 */
export default function EstudiantesFold() {
  return (
    <div className="mt-12 rounded-3xl border border-[#03f5ff]/25 bg-white/5 p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#03f5ff]">
        {EDUCATION_FOLD.kicker}
      </p>
      <h3 className="mt-3 text-xl font-bold text-white sm:text-2xl">{EDUCATION_FOLD.headline}</h3>
      <p className="mt-3 max-w-3xl text-base leading-relaxed text-gray-300">
        {EDUCATION_FOLD.lead}
      </p>

      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {EDUCATION_FOLD.paths.map((path) => (
          <li key={path.title} className="rounded-2xl border border-[#03f5ff]/20 bg-white/5 p-5">
            <h4 className="text-base font-bold text-[#03f5ff]">{path.title}</h4>
            <p className="mt-2 text-sm leading-relaxed text-gray-300">{path.body}</p>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-sm leading-relaxed text-gray-200">
        {EDUCATION_FOLD.note} Escribinos a{" "}
        <a
          href={`mailto:${ESTUDIANTES_EMAIL}`}
          className="font-semibold text-[#03f5ff] hover:underline"
        >
          {ESTUDIANTES_EMAIL}
        </a>
        .
      </p>

      <a
        href="#participar"
        className="mt-6 inline-flex items-center rounded-lg border border-[#03f5ff]/40 px-4 py-2 text-sm font-semibold text-[#03f5ff] transition-colors hover:bg-[#03f5ff]/10"
      >
        {FOLD_CTA}
      </a>
    </div>
  )
}