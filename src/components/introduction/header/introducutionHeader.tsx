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
          animate={{
            textShadow: [
              "0 0 20px rgba(3, 245, 255, 0.5)",
              "0 0 40px rgba(3, 245, 255, 0.8)",
              "0 0 20px rgba(3, 245, 255, 0.5)",
            ],
          }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
        >
          Te invitamos y damos la bienvenida
        </motion.h2>
        <p className="text-[#03f5ff] text-xl lg:text-2xl font-medium mb-8">
          A la experiencia definitiva en el mundo de Tecnologías, Bitcoin-Criptomonedas e Inteligencia Artificial
        </p>
        <motion.h3
          className="text-3xl lg:text-4xl font-bold text-white"
          animate={{
            scale: [1, 1.02, 1],
          }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
        >
          TechnoCrypto Summit 2027: Conectando el Futuro
        </motion.h3>
      </motion.div>


      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full text-center  mb-16 flex items-center justify-center"
      >
        <motion.div
          className="w-10 h-10 bg-gradient-to-br from-[#03f5ff] to-[#0090ff] rounded-full flex items-center justify-center"
          animate={{
            boxShadow: [
              "0 0 30px rgba(3, 245, 255, 0.5)",
              "0 0 60px rgba(3, 245, 255, 0.8)",
              "0 0 30px rgba(3, 245, 255, 0.5)",
            ],
            rotate: [0, 360],
          }}
          transition={{
            boxShadow: { duration: 3, repeat: Number.POSITIVE_INFINITY },
            rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
          }}
        >
          <span className="text-white font-bold text-4xl">T</span>
        </motion.div>
        <p className="text-[white] font-bold text-3xl ms-3">TCSUMMIT 2027</p>
      </motion.div>
    </>
  )
}
