import { motion } from "framer-motion";

export default function IntroductionLocation(){
  return(
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="w-full text-center mb-16"
      >
        <motion.h3
          className="text-3xl lg:text-4xl font-bold text-[#03f5ff] mb-8"
          animate={{
            textShadow: [
              "0 0 20px rgba(3, 245, 255, 0.8)",
              "0 0 40px rgba(3, 245, 255, 1)",
              "0 0 20px rgba(3, 245, 255, 0.8)",
            ],
          }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          ÚNETE A NOSOTROS
        </motion.h3>
        <p className="text-white text-xl mb-8">
          y descubre un nuevo mundo lleno de oportunidades en Tecnologías, Criptomonedas e Inteligencia Artificial.
        </p>

        <div className="space-y-6">
          <p className="text-white text-lg">Nos emociona presentarles el</p>
          <motion.div
            className="bg-linear-to-r from-[#03f5ff]/20 to-[#0090ff]/20 backdrop-blur-sm rounded-2xl p-6 border border-[#03f5ff]/30"
            animate={{
              borderColor: ["rgba(3, 245, 255, 0.3)", "rgba(0, 144, 255, 0.3)", "rgba(3, 245, 255, 0.3)"],
            }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          >
            <h4 className="text-2xl lg:text-3xl font-bold text-[#03f5ff] mb-2">
              TCSummit - ARGENTINA
            </h4>
            <p className="text-white text-xl font-semibold">Un MEGA EVENTO sin precedentes.</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Descripción del evento */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="w-full bg-black/40 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-[#03f5ff]/30 mb-16"
      >
        <p className="text-white text-lg lg:text-xl leading-relaxed text-center mb-8">
          En el cual en <span className="text-[#03f5ff] font-bold">3 (tres) días</span> se reúne y se sumergen,
          con el apoyo gubernamental y privado, a expertos globales, emprendedores innovadores, entusiastas y
          estudiantes del criptoespacio, AI y Tecnología, para explorar las últimas tendencias, discutir avances
          tecnológicos y fomentar la colaboración en estas revolucionarias industrias.
        </p>

        <p className="text-white text-lg lg:text-xl leading-relaxed text-center mb-8">
          Desde principiantes hasta expertos, todos encontrarán algo emocionante y educativo en este{" "}
          <span className="text-[#fcfef9] font-bold">EVENTO ÚNICO</span>.
        </p>

        <motion.p
          className="text-[#03f5ff] text-xl lg:text-2xl font-bold text-center"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
        >
          TECHNOCRYPTO SUMMIT 2027 tiene el objetivo de impulsar y apoyar los distintos proyectos
          <br />
          <span className="text-[#fcfef9]">CRIPTOGRÁFICOS, TECNOLÓGICOS Y DE INTELIGENCIA ARTIFICIAL.</span>
        </motion.p>
      </motion.div>

      {/* Botón de compra y estadísticas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="text-center mb-16"
      >
        <motion.button
          className="bg-gradient-to-r from-[#03f5ff] to-[#0090ff] text-[white] px-12 py-6 rounded-3xl font-bold text-xl shadow-lg mb-16 hover:cursor-pointer"
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 40px rgba(3, 245, 255, 0.8)",
          }}
          whileTap={{ scale: 0.95 }}
          animate={{
            boxShadow: [
              "0 0 30px rgba(3, 245, 255, 0.4)",
              "0 0 60px rgba(3, 245, 255, 0.6)",
              "0 0 30px rgba(3, 245, 255, 0.4)",
            ],
          }}
          transition={{
            boxShadow: { duration: 2 , repeat: Number.POSITIVE_INFINITY },
          }}
        >
          Comprar Entrada
        </motion.button>
      </motion.div>
    </>
  )
}
