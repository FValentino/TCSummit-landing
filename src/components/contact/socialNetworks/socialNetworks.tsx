import { motion } from "framer-motion"
import { Instagram, Twitter, Facebook, Twitch, } from 'lucide-react'

//{ name: "LinkedIn", icon: Linkedin, color: "#0077B5", handle: "TechnoCrypto Summit", link:"https://www.linkedin.com/in/tcsummit-747b9935a/" },
export default function SocialNetworks(){

  return(
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="space-y-8 h-full"
    >
      <h3 className="text-2xl font-bold text-white mb-6">Síguenos en Redes Sociales</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { name: "Instagram", icon: Instagram, color: "#E4405F", handle: "@tcsummit.com.ar", link:"https://www.instagram.com/tcsummit.com.ar?igsh=d2gzanc5bG02Ymd6" },
          { name: "Twitter", icon: Twitter, color: "#1DA1F2", handle: "@tcsummit2025", link:"https://x.com/tcsummit2025" },
          { name: "Facebook", icon: Facebook, color: "#4267B2", handle: "TechnoCrypto Summit", link:"https://www.facebook.com/profile.php?id=61575134905840" },
          { name: "Twitch", icon: Twitch, color: "#ae00ffff", handle: "tcsummit2025", link:"https://www.twitch.tv/tcsummit2025" }
        ].map((social, index) => {
          const IconComponent = social.icon
          return (
            <motion.button
              key={social.name}
              className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-white/10 cursor-pointer hover:cursor-pointer"
              whileHover={{
                scale: 1.05,
                borderColor: social.color,
                backgroundColor: `${social.color}10`,
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: { delay: index * 0.1, duration: 0.5 },
              }}
              viewport={{ once: true }}
            >
              <a href={social.link} target="_blank">
                <div
                  className="flex flex-col items-center space-y-3"
                >
                  <div
                    className="p-3 rounded-full"
                    style={{ backgroundColor: `${social.color}20` }}
                  >
                    <IconComponent className="w-8 h-8" style={{ color: social.color }} />
                  </div>
                  <div className="text-center">
                    <h4 className="text-white font-bold">{social.name}</h4>
                    <p className="text-gray-400 text-sm">{social.handle}</p>
                  </div>
                </div>
              </a>
            </motion.button>
          )
        })}
      </div>
    </motion.div>
  )
}
