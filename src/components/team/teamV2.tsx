import TeamCarousel from "./teamCarousel"

/**
 * `#equipo` chapter. Server-rendered shell — the roster changes over time, so the team is
 * presented by a client carousel island (`TeamCarousel`) that holds any number of members.
 */
export default function TeamV2() {
  return (
    <section
      id="equipo"
      aria-labelledby="equipo-title"
      className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#03f5ff] sm:text-sm">
        Equipo
      </p>
      <h2
        id="equipo-title"
        className="mt-3 max-w-3xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl"
      >
        Las personas detrás del <span className="text-[#03f5ff]">Summit</span>.
      </h2>
      <p className="mt-6 max-w-3xl text-base leading-relaxed text-gray-300 sm:text-lg">
        Un equipo interdisciplinario que combina gestión de eventos, tecnología, legales y diseño
        para hacer posible TechnoCrypto Summit.
      </p>

      <div className="mt-12">
        <TeamCarousel />
      </div>
    </section>
  )
}
