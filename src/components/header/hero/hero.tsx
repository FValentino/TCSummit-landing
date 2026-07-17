"use client"
import {
  Calendar,
} from "lucide-react"

import robot from "@/assets/images/hero/robot.webp";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { Saira } from "next/font/google";

const saira = Saira({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});


export default function Hero() {

  const router = useRouter();


  return (
    <section id="inicio" className="relative z-30 h-auto mt-4 flex items-center md:mt-2">
      <div className="w-full mx-auto px-6 ">
        <div className="md:flex md:justify-around items-center mt-2">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4 w-full md:w-[50%] mb-18 md:mb-0"
          >
            <motion.p
              className="text-[#03f5ff] text-base md:text-2xl font-bold text-center "
            >
              El evento de Tecnología, Criptomonedas e Inteligencia Artificial
              más grande de Argentina
            </motion.p>

            <motion.h1
              className={`${saira.className} text-6xl lg:text-7xl font-bold text-white leading-tight text-center font-saira`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <span className="block">
                TECHNO {" "}
                <span
                  className="text-[#03f5ff] "
                >
                  CRYPTO
                </span>
              </span>

              <span className="block">
                SUMMIT {" "}
                <span
                  className="text-[#0090ff]  "
                >
                  2026
                </span>
              </span>
              
            </motion.h1>

            
            <div className="space-y-4">
              {/* <motion.div
                className="flex items-center justify-center space-x-3"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <motion.div
                  className="bg-[#03f5ff]/20 p-2 rounded-lg border border-[#03f5ff]"
                  animate={{
                    boxShadow: [
                      "0 0 10px rgba(3, 245, 255, 0.3)",
                      "0 0 20px rgba(3, 245, 255, 0.6)",
                      "0 0 10px rgba(3, 245, 255, 0.3)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <MapPin className="w-6 h-6 lg:w-8 lg:h-8 text-[#03f5ff]" />
                </motion.div>
                <div className="text-xl text-white md:text-3xl">
                  <p>Argentina</p>
                </div>
                
              </motion.div> */}

              <motion.div
                className="flex items-center justify-center space-x-3"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                <div
                  className="bg-[#0090ff]/20 p-2 rounded-lg border border-[#0090ff]"
                >
                  <Calendar className="w-4 h-4 lg:w-8 lg:h-8 text-[#0090ff]" />
                </div>
                <span className="text-xl text-white md:text-3xl">Octubre 2026</span>
              </motion.div>
            </div>

            
            <motion.div
              className=" w-full flex flex-col justify-center md:flex-row  gap-4"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <motion.button
                className="bg-linear-to-r from-[#03f5ff] to-[#0090ff] text-[#002c6b] px-8 py-4 rounded-2xl font-bold text-lg shadow-lg"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(3, 245, 255, 0.6)",
                }}
                whileTap={{ scale: 0.95 }}
              onClick={()=>{router.push("/new-feature")}}
              >
                Comprar entradas
              </motion.button>

              <motion.button
                className="bg-transparent border-2 border-[#03f5ff] text-[#03f5ff] px-8 py-4 rounded-2xl font-bold text-lg hover:bg-[#03f5ff]/10 transition-all"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(3, 245, 255, 0.1)",
                }}
                whileTap={{ scale: 0.95 }}
              onClick={()=>{router.push("/estudiantes")}}
              >
                ¿Eres estudiante?
                <br />
                <span className="text-sm font-normal">Haz clic aquí</span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Imagen del robot */}
          <motion.div
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative mb-12 lg:mb-0"
          >
            <div
              className="relative"
            >
              {/* En Next.js, si pasas la imagen importada a 'src', no necesitas width/height fijos */}
              <Image
                src={robot}
                alt="Robot TCS"
                className="w-full max-w-md mx-auto"
                priority
              />
            </div>

            {/* Círculos de energía */}
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute inset-0 border-2 border-[#03f5ff]/30 rounded-full opacity-45"
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
