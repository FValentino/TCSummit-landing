import { motion } from "framer-motion"

export default function IntroductionHeader(){
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full text-center mb-8"
      >
        <motion.h2
          className="text-4xl lg:text-5xl font-bold text-white mb-6"
        >
          Te invitamos y damos la bienvenida
        </motion.h2>
        <p className="text-[#03f5ff] text-xl lg:text-2xl font-medium mb-8">
          A la experiencia definitiva en el mundo de Tecnologías, Bitcoin-Criptomonedas e Inteligencia Artificial
        </p>
        <motion.h3
          className="text-3xl lg:text-4xl font-bold text-white"
        >
          TechnoCrypto Summit 2026: Conectando el Futuro
        </motion.h3>
      </motion.div>


      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full text-center  mb-16 flex items-center justify-center"
      >
          <div
            className="w-10 h-10 bg-gradient-to-br from-[#03f5ff] to-[#0090ff] rounded-full flex items-center justify-center"
          >
          <span className="text-white font-bold text-4xl">T</span>
        </div>
        <p className="text-[white] font-bold text-3xl ms-3">TCSUMMIT 2026</p>
      </motion.div>
    </>
  )
}