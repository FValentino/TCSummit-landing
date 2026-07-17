"use client"

import rocket from "@/assets/images/about/rocket.webp";
import Ai from "@/assets/images/about/AiWebAp.webp";
import Image from "next/image";
import { motion } from "framer-motion";


export default function About() {

  return (
    <section id="nosotros" className="w-full relative z-30 overflow-x-hidden ">
        <div className="w-[90%] relative mx-auto px-6 my-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.h2
              className="text-4xl lg:text-5xl font-bold text-white mb-6"
            >
              ¿Quiénes somos?
            </motion.h2>
            <p className=" text-white text-xl  mx-auto">
              En TechnoCrypto Summit, nos enorgullecemos de ser los organizadores de eventos que exploran la
              intersección entre tecnología, Bitcoin, criptomonedas e inteligencia artificial.
            </p>
            <p className="text-white text-lg mt-4  mx-auto">
              Somos un equipo apasionado de entusiastas y profesionales con una visión compartida de promover la
              innovación y el avance en estas áreas emocionantes y en constante evolución.
            </p>
          </motion.div>

          {/* Misión */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-2 items-center mb-20"
          >
            <motion.div
              className="relative w-full max-w-[20rem] h-80 mx-auto rounded-[50%] overflow-hidden border-2 border-[#03f5ff]/30"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Image src={rocket} alt="Nuestra Misión" fill style={{ objectFit: 'cover' }} />
              <div
                className="absolute inset-0 bg-linear-to-t from-[#03f5ff]/30 to-transparent opacity-65"
              />
            </motion.div>

            <div className="space-y-6">
              <motion.h3
                className="text-3xl w-full text-center lg:text-4xl font-bold text-[#03f5ff]"
              >
                Nuestra misión
              </motion.h3>
              <div
                className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-[#03f5ff]/30"
              >
                <p className="text-white text-lg leading-relaxed">
                  Fomentar el diálogo, la colaboración y el crecimiento en la industria de tecnología, Bitcoin y
                  criptomonedas mediante la organización de eventos de alta calidad que reúnan a los principales
                  actores, innovadores y entusiastas de estos campos.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed mt-4">
                  Creemos en el poder de la educación, la conexión y la inspiración para impulsar el cambio y la
                  adopción masiva de estas tecnologías transformadoras.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Visión */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-2  items-center"
          >
            <div className="space-y-6 lg:order-1">
              <motion.h3
                className="text-3xl w-full text-center lg:text-4xl font-bold text-[#0090ff]"
              >
                Nuestra visión
              </motion.h3>
              <div
                className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-[#0090ff]/30"
              >
                <p className="text-white text-lg leading-relaxed">
                  Ser reconocidos como el principal punto de encuentro para aquellos interesados en tecnología, Bitcoin,
                  criptomonedas e inteligencia artificial, proporcionando una plataforma donde las ideas se conviertan
                  en acciones, las conexiones se conviertan en colaboraciones y la innovación se convierta en realidad.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed mt-4">
                  Queremos inspirar y empoderar a individuos y organizaciones para que aprovechen todo el potencial de
                  estas tecnologías disruptivas y revolucionen el mundo que nos rodea.
                </p>
              </div>
            </div>

            <motion.div
              className="relative w-full max-w-[20rem] h-80 mx-auto rounded-[50%] overflow-hidden border-2 border-[#0090ff]/30 lg:order-2"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Image src={Ai} alt="Nuestra Visión" fill style={{ objectFit: 'cover' }} />
              <div
                className="absolute inset-0 bg-linear-to-t from-[#0090ff]/30 to-transparent opacity-65"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>
  );
}
