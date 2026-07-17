"use client";
import { motion } from "framer-motion";
import { Link, MapPin } from 'lucide-react';
import logo from '@/assets/images/location/quorum/galaLogo.png'
import Image from 'next/image'

export default function Location(){
 
  return(
    <motion.section
      id="ubicacion"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="w-[90%] mx-auto text-[#fcfef9] my-16 overflow-hidden"
    >
      <div className="w-full my-8 relative">
        <motion.h2
            className="text-4xl w-full text-center lg:text-5xl font-bold text-white mb-6 "
          >
            Locacion
          </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full flex justify-center my-8"
        >
          <div className="w-[60%] lg:w-[25%] max-w-50">
            <div
              className="w-full aspect-square rounded-full overflow-hidden p-4 shadow-lg shadow-[#03f5ff]/20 border border-[#05045ccc]"
            >
              <div className="relative w-full h-full rounded-full overflow-hidden border border-white/10" >
                <Image src={logo} alt="Gala Hotel & Convenciones Logo" fill />
              </div>
            </div>
          </div>
        </motion.div>

        <div className="w-full flex flex-col-reverse justify-center items-stretch lg:flex-row gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="w-full lg:w-1/2"
          >
            <p className="w-full text-xl text-center text-[#03f5ff] mt-0 mb-4 lg:my-2">
              <span className="w-full text-base text-start flex items-center justify-center font-bold lg:text-center lg:text-xl">
                <MapPin /> 
                Gala Convenciones - Centro de Exposiciones
              </span>
            </p>

            <p className="text-lg text-justify my-2">
              <span className="font-bold">El mayor centro de exposiciones del Nordeste Argentino. </span>
              Con 7.650 metros cuadrados cubiertos, Gala Convenciones ofrece un sistema estructural y profesional
              capaz de brindar un servicio integral de excelencia, contemplando todas las necesidades requeridas para
              eventos de gran envergadura.
              <br />
              <br />
              <span className="font-bold">
                Te invitamos a vivir la experiencia
                <span className="font-extrabold text-[#03f5ff]"> TechnoCrypto Summit… </span>
                en Gala Convenciones, donde la innovación encuentra su hogar.
              </span>
            </p>

            <div className="space-y-6 my-6">
              <div>
                <h3 className="text-2xl font-semibold mb-2 text-[#03f5ff]">Centro de Convenciones</h3>
                <p className="text-[#d7e8f9]">
                  Espacio principal con capacidad flexible, ideal para conferencias magistrales y presentaciones
                  principales del summit.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-2 text-[#03f5ff]">Salón de Exposiciones</h3>
                <p className="text-[#d7e8f9]">
                  Área amplia y versátil que puede adaptarse según la distribución requerida, perfecta para stands de
                  sponsors y networking.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-2 text-[#03f5ff]">Foyers Principales</h3>
                <p className="text-[#d7e8f9]">
                  Dos grandes foyers que ofrecen espacios ideales para acreditaciones, coffee breaks y encuentros
                  informales entre participantes.
                </p>
              </div>
            </div>

            <p className="text-lg font-bold mb-3 text-[#03f5ff]">Servicios y Facilidades de Primer Nivel</p>
            <ul className="list-disc list-inside ms-4 my-3 text-lg space-y-1 text-[#d7e8f9]">
              <li>Climatización integral en todos los espacios</li>
              <li>Sistema de detección y extinción de incendios</li>
              <li>Seguridad permanente en todas las zonas</li>
              <li>Área de acreditaciones especializada</li>
              <li>Guardarropas para comodidad de los asistentes</li>
              <li>
                <strong className="text-[#fcfef9]">19.500 m² de playas de estacionamiento</strong>
              </li>
              <li>
                <strong className="text-[#fcfef9]">Ubicación estratégica</strong> en Resistencia, Chaco, con fácil
                acceso desde toda la región del NEA.
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="w-full lg:w-1/2"
          >
            <p className="mt-4 mb-6 text-center text-xl font-bold lg:text-2xl">
              📍 A continuación encontrarás el mapa con la ubicación de Gala Convenciones en Resistencia, Chaco.
            </p>
            <div className="bg-[#556298]/30 border-[#99c4e9] overflow-hidden backdrop-blur-sm">
              <div className="p-0">
                <div className="aspect-video bg-[#012967]/50 relative">
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3540.710596259639!2d-59.02509662553449!3d-27.447128615743022!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94450b84e3795105%3A0x29279c417ba758dd!2sGala%20Hotel%20%26%20Convenciones!5e0!3m2!1ses!2sar!4v1756599472682!5m2!1ses!2sar"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0"
                  />
                  <div className="absolute top-4 left-4 bg-[#012967]/90 backdrop-blur-sm rounded-lg p-3 border border-[#03f5ff]/30">
                    <div className="flex items-center gap-2 text-[#03f5ff]">
                      <MapPin className="w-5 h-5" />
                      <span className="font-semibold">TC Summit 2026</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="w-full my-8 text-center">
          <p className="w-full text-xl font-bold mb-4">
            Este año, la innovación y el futuro se encuentran en Resistencia, Chaco.
            <br />
            Este año, nos vemos en Gala Convenciones.
          </p>
          <div className="w-full flex justify-center items-center">
            <motion.a
              href="https://www.hotelgala.com.ar/en/convenciones.html"
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center items-center text-xl text-[#03f5ff] hover:text-[#00c6ff] transition-all duration-300"
              whileHover={{ y: -5, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link className="mr-2 w-10 h-10 " />
              Ingresa aqui para conocer mas sobre este increible lugar
            </motion.a>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
