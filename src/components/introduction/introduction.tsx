"use client";
// Fondo
import IntroductionHeader from "./header/introducutionHeader"
import IntroductionDescription from "./description/introductionDescription"
import IntroductionLocation from "./location/introductionLocation"
import ParticipantInfo from "./stats/stats"

export default function Introduction(){

  
  return(
    <section id="acerca-de" className={`w-full mx-auto text-white relative min-h-screen py-4 `}>
      <div className="w-[90%] mx-auto relative z-10">
        <IntroductionHeader/>
        <IntroductionDescription/>
        <IntroductionLocation/>
        <ParticipantInfo/>
      </div>
    </section>
  )
}
