import AI from "@/assets/images/introduction/AI.webp"
import conection from "@/assets/images/introduction/conection.webp"
import { motion } from "framer-motion"

export default function IntroductionDescription(){
  return(
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full bg-black/40 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-[#03f5ff]/30 mb-16"
      >
        <div className="text-center space-y-8">
          <p className="text-white text-lg lg:text-xl leading-relaxed">
            En un mundo cada vez más digitalizado, la convergencia de{" "}
            <span className="text-[#03f5ff] font-semibold">Tecnologías</span>,{" "}
            <span className="text-[#03f5ff] font-semibold">Bitcoin-criptomonedas</span> e{" "}
            <span className="text-[#03f5ff] font-semibold">Inteligencia artificial</span> está transformando
            radicalmente nuestra forma de <span className="text-[#fcfef9] font-bold">INTERACTUAR</span>,{" "}
            <span className="text-[#fcfef9] font-bold">COMERCIAR</span> Y{" "}
            <span className="text-[#fcfef9] font-bold">RAZONAR</span>.
          </p>

          <p className="text-white text-lg lg:text-xl leading-relaxed">
            El TechnoCrypto Summit es el epicentro donde estudiantes (secundarios y universitarios), entusiastas,
            innovadores, emprendedores y expertos se reúnen para explorar, ampliar y definir el futuro de estas
            esferas interconectadas.
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
      >
        <motion.div
          className="relative rounded-2xl overflow-hidden border-2 border-[#03f5ff]/30"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={typeof AI === 'string' ? AI : (AI as any).src}
            alt="Innovación Tecnológica"
            loading="lazy"
            className="w-full h-64 object-cover"
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-[#03f5ff]/20 to-transparent"
            animate={{
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          />
        </motion.div>

        <motion.div
          className=" relative rounded-2xl overflow-hidden border-2 border-[#0090ff]/30"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={typeof conection === 'string' ? conection : (conection as any).src}
            alt="Crypto e IA"
            loading="lazy"
            className="w-full h-64 object-cover"
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-[#0090ff]/20 to-transparent"
            animate={{
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
          />
        </motion.div>
      </motion.div>

    </>
  )
}
