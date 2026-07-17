import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#002c6b] px-6">
      <div className="text-center max-w-md">
        <div className="text-8xl font-bold text-[#03f5ff] mb-4 font-[family-name:var(--font-orbitron)]">
          404
        </div>

        <h1 className="text-2xl font-bold text-white mb-3 font-[family-name:var(--font-orbitron)]">
          Página no encontrada
        </h1>

        <p className="text-gray-300 mb-8">
          La página que buscás no existe o fue movida a otra ubicación.
        </p>

        <Link
          href="/"
          className="inline-block px-6 py-3 bg-[#03f5ff] text-[#002c6b] font-semibold rounded-lg hover:bg-[#03f5ff]/90 transition-colors"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
