"use client";


import Hero from "./hero/hero" 

// Video assets removed to simplify Next.js migration; header now focuses on navigation


export default function Header(){
  
  return (
    <section id="hero" className="w-full min-h-screen mx-auto lg:pt-0 ">
      <div className="w-full mx-auto relative max-w-full pt-16">
        {/* Video de fondo */}
        <video 
          className="absolute top-0 left-0 w-full h-full object-cover z-0 " 
          autoPlay 
          loop 
          muted 
          playsInline 
          preload="metadata"
          aria-hidden="true"
        >
          <source src="/videos/header/backgroundMP4.mp4" type="video/mp4" />
          <source src="/videos/header/backgroundWEBM.webm" type="video/webm" />
        </video>

        {/* Capa semi-transparente sobre el video */}
        <div className="absolute top-0 left-0 w-full h-full bg-[#002c6b]/40 z-1"></div>

        {/* Contenido */}
        <div className="w-full min-h-screen relative z-10 pb-2">
          <Hero/>
        </div>
      </div>
    </section>
  );
}
