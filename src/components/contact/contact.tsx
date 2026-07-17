"use client";
import { motion } from "framer-motion";
import SocialNetworks from "@/components/contact/socialNetworks/socialNetworks";
import ContactForms from "@/components/contact/contactForms/contactForms";

export default function Contact() {

  return (
    <section id="contacto" className="w-[90%] mx-auto relative z-30 py-20 bg-black/20 overflow-hidden">
      <div className="w-full mx-auto px-6">
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
            Contacto y<span className="text-[#03f5ff] block">Redes Sociales</span>
          </motion.h2>
          <p className="text-gray-300 text-xl max-w-3xl mx-auto">
            Mantente conectado con nosotros y no te pierdas ninguna novedad del evento
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 ">

          <SocialNetworks/>
          
          <ContactForms/>
        </div>
      </div>
    </section>
  );
}
