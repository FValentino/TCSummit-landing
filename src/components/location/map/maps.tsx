// Nueva implementación sin dependencias externas: mapa embebido simple
// Este module conserva la API default export para ser utilizado por el frontend
import React from 'react'

export default function MapForja() {
  return (
    <div className="w-full h-96 rounded-lg overflow-hidden my-6 shadow-lg border border-white/10" aria-label="Mapa de Gala Convenciones">
      <iframe
        src="https://www.google.com/maps?q=Gala+Convenciones+Resistencia&output=embed"
        width="100%" height="100%" style={{ border:0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
        title="Mapa Gala Convenciones"
      />
    </div>
  )
}
