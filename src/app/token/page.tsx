// Token page: distributes information about the token paper
export default function TokenPage() {
  return (
    <main className="min-h-screen p-6 bg-gradient-to-b from-black/90 to-black/60 text-white">
      <section className="max-w-4xl mx-auto bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/20">
        <h1 className="text-3xl font-bold mb-4">Tech Token – Documentación</h1>
        <p className="text-sm text-gray-200 mb-4">
          Nota: Este modelo no puede leer PDFs. A continuación se ofrece la forma de distribuir el material de forma accesible.
        </p>
        <div className="my-4 text-sm text-gray-200">
          <p>
            ERROR: Cannot read "TCS Token White Paper.pdf" (this model does not support pdf input). Please download the file or provide a plain text summary.
          </p>
        </div>
        <div className="mt-4">
          <a href="/assets/TCS Token White Paper.pdf" download className="text-blue-300 hover:text-blue-400">Descargar PDF (si está disponible)</a>
        </div>
        <div className="mt-8 text-sm text-gray-300">
          Si necesitas distribuir el contenido, considera convertirlo a texto y usarlo en esta página o en una sección de resumen.
        </div>
      </section>
    </main>
  )
}
