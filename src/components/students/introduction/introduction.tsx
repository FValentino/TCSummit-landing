import { MicVocal } from 'lucide-react'

export default function Introduction(){
  return (
    <section  className="w-[90%] mx-auto my-8 text-center text-white space-y-16 relative">

      <div className=" mx-auto space-y-4 ">
        <div className="flex flex-col items-center justify-center mb-16 ">
          <div className="w-[80%] mx-auto inline-flex items-center justify-center text-start gap-2 mb-4 lg:w-auto">
            <MicVocal className="w-20 h-20 text-[#03f5ff]" />
            <h2 className="text-3xl mx-auto lg:text-5xl font-bold bg-linear-to-r from-[#03f5ff] to-[#b5bbef] bg-clip-text text-transparent">
              Charlas que inspiran
            </h2>
          </div>
          <p className="w-full text-lg lg:text-2xl">
            <strong className="text-[#02c5ff]">Conectar. Informar. Transformar.</strong> Sumate a la comunidad de jóvenes que están cambiando el mundo digital.
          </p>
          <p className="w-full text-lg lg:text-2xl text-gray-300 text-center 
            leading-relaxed">
            <strong className="text-[#03f5ff]">NEA - Argentina</strong> se convierte en el epicentro de{" "}
            una experiencia que te conecta con la{" "}
            <span className="text-[#00c6ff] font-semibold">innovación</span>, la{" "}
            <span className="text-[#0090ff] font-semibold">tecnología</span> y los{" "}
            <span className="text-[#03f5ff] font-semibold">empleos del mañana</span>.
          </p>
        </div>
      </div>
    </section>
  )
}
