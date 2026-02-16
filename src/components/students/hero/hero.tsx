"use client";

import { motion } from "framer-motion";
import Image from 'next/image';
import robot from "@/assets/images/hero/robot.webp"

export default function Hero() {

  return (
    <section id="hero-estudiantes" className="w-full pt-12 pb-8 relative z-30 h-auto mt-4 flex items-center ">
      <div className="w-[90%] mx-auto">
        <div className="md:flex md:justify-around items-center mt-2">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4 w-full md:w-[50%] mb-18 md:mb-0"
          >

            <motion.h1
              className="text-5xl lg:text-6xl font-bold text-white leading-tight text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <span className="block">
                ¿Sos {" "}
                <motion.span
                  className="text-[#03f5ff]"
                  animate={{
                    textShadow: [
                      "0 0 20px rgba(3, 245, 255, 0.8)",
                      "0 0 40px rgba(3, 245, 255, 1)",
                      "0 0 20px rgba(3, 245, 255, 0.8)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  estudiante
                </motion.span>
                {" "} secundario o universitario?
              </span>
            </motion.h1>

            
            <div className="space-y-6">
              <motion.div
                className="flex items-center justify-center space-x-3"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-2xl md:text-3xl lg:text-4xl font-semibold text-center lg:text-left"
                >
                  <motion.span
                    className="text-[#00c6ff]"
                    animate={{
                      opacity: [0.8, 1, 0.8],
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    ¡Viví el futuro en el
                  </motion.span>{" "}
                  <br className="hidden md:block" />
                  <span className="text-[#03f5ff] font-bold">Technocrypto Summit 2025!</span>
                </motion.h2>
              </motion.div>
            </div>

            <motion.div
              className="w-full flex justify-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <motion.button
                className="bg-linear-to-r from-[#03f5ff] to-[#0090ff] text-[#002c6b] 
                px-8 py-4  rounded-2xl font-bold text-lg shadow-lg hover:cursor-pointer"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(3, 245, 255, 0.6)",
                }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(3, 245, 255, 0.4)",
                    "0 0 40px rgba(3, 245, 255, 0.6)",
                    "0 0 20px rgba(3, 245, 255, 0.4)",
                  ],
                }}
                transition={{
                  boxShadow: { duration: 2, repeat: Number.POSITIVE_INFINITY },
                }}
              >
                Comprar entradas
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
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotate: [0, 2, -2, 0],
              }}
              transition={{
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="relative"
            >
              {/* En Next.js, si pasas la imagen importada a 'src', no necesitas width/height fijos */}
              <Image
                src={robot}
                alt="Robot TCS"
                className="w-full max-w-md mx-auto"
                priority
              />
            </motion.div>

            {/* Círculos de energía */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 border-2 border-[#03f5ff]/30 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.8,
                }}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
