"use client"

import { useState } from "react"
import {
  GraduationCap,
  Briefcase,
  Users,
  Rocket,
  Mail,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
} from "lucide-react"
import { Button } from "@/components/common/ui/button"
import { Card, CardContent } from "@/components/common/ui/card"
import { benefits } from "./oportunitiesData"
import { useRouter } from "next/navigation"

export default function Opportunities() {

  const navigate = useRouter();

  const [currentSlides, setCurrentSlides] = useState<{ [key: number]: number }>({
    0: 0,
    1: 0,
    2: 0,
  })

  const nextSlide = (benefitIndex: number) => {
    setCurrentSlides((prev) => ({
      ...prev,
      [benefitIndex]: (prev[benefitIndex] + 1) % benefits[benefitIndex].slides.length,
    }))
  }

  const prevSlide = (benefitIndex: number) => {
    setCurrentSlides((prev) => ({
      ...prev,
      [benefitIndex]: prev[benefitIndex] === 0 ? benefits[benefitIndex].slides.length - 1 : prev[benefitIndex] - 1,
    }))
  }

  return (
    <section className="w-[90%] py-16 text-[#fcfef9] relative mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 mb-4">
          <Rocket className="w-20 h-20 text-[#03f5ff] "/>
          <h2 className="text-3xl lg:text-5xl font-bold bg-linear-to-r from-[#03f5ff] to-[#b5bbef] bg-clip-text text-transparent">
            Todo lo que podés aprovechar
          </h2>
        </div>
      </div>

      {/* Benefits Grid */}
      <div className="grid gap-8 mb-16 lg:grid-cols-1 xl:grid-cols-1">
        {benefits.map((benefit, benefitIndex) => {
          const Icon = benefit.icon
          const currentSlide = currentSlides[benefitIndex] || 0
          const slide = benefit.slides[currentSlide]
          const SlideIcon = slide.icon

          return (
            <Card
              key={benefitIndex}
              className={`group bg-linear-to-br ${benefit.bgGradient} ${benefit.borderColor} hover:border-[#03f5ff]/50 transition-all duration-500 hover:scale-[1.01] hover:shadow-2xl hover:shadow-[#03f5ff]/20 backdrop-blur-sm`}
            >
              <CardContent className="p-8">
                <div className="flex flex-col items-center lg:flex-row gap-8 lg:items-start">
                  {/* Icon Section */}
                  <div className="shrink-0">
                    <div
                      className={`w-20 h-20 rounded-2xl bg-linear-to-br ${benefit.gradient} p-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    >
                      <Icon className="w-full h-full text-[#002c6b]" />
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 space-y-6">
                    <h3 className="text-2xl lg:text-3xl font-bold text-[#03f5ff] group-hover:text-[#b5bbef] transition-colors">
                      {benefit.title}
                    </h3>

                    <p className="text-[#fcfef9]/80 text-lg leading-relaxed">{benefit.description}</p>

                    {/* Slider Section */}
                    <div className="relative">
                      <div
                        className={`bg-linear-to-br from-[#fcfef9]/10 to-[#fcfef9]/5 rounded-2xl p-6 border border-[#fcfef9]/20 shadow-lg backdrop-blur-sm`}
                      >
                        {/* Slider Navigation */}
                        <div className="flex justify-between items-center mb-4">
                          <div className="flex gap-2">
                            {benefit.slides.map((_, index) => (
                              <div
                                key={index}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                  index === currentSlide ? `bg-linear-to-r ${benefit.gradient}` : "bg-[#fcfef9]/30"
                                }`}
                              />
                            ))}
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => prevSlide(benefitIndex)}
                              className="w-auto p-0 rounded-[50%] hover:bg-[#fcfef9]/10 text-[#fcfef9]"
                            >
                              <ChevronLeft className="w-auto  text-4xl" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => nextSlide(benefitIndex)}
                              className="w-auto p-0 rounded-[50%] hover:bg-[#fcfef9]/10 text-[#fcfef9]"
                            >
                              <ChevronRight className="w-auto text-4xl" />
                            </Button>
                          </div>
                        </div>

                        {/* Slide Content */}
                        <div className="flex flex-col items-start gap-4">
                          <div className="w-full flex items-center ">
                            <div
                            className={`w-12 h-12 rounded-xl bg-linear-to-br ${benefit.gradient} p-2.5 shrink-0 mx-3`}
                            >
                              <SlideIcon className="w-full h-full text-[#002c6b]" />
                            </div>
                            <h4 className="text-xl font-bold text-[#03f5ff] ">{slide.title}</h4>
                          </div>
                          <div className="w-full flex-1">
                            <p className="text-[#fcfef9]/80 mb-3 block w-full">{slide.content}</p>
                            <div
                              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-linear-to-r ${benefit.gradient} text-[#002c6b] text-sm font-semibold`}
                            >
                              <TrendingUp className="w-4 h-4" />
                              {slide.stats}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      
      <Card className="bg-linear-to-br from-[#fcfef9]/10 to-[#fcfef9]/5 border-[#03f5ff]/30 backdrop-blur-sm shadow-2xl">
        <CardContent className="p-8 lg:p-12">
          <div className="w-full text-center space-y-8">
            <div className="flex items-center justify-center mb-6 ">
              <GraduationCap className="w-12 h-12 lg:w-8 lg:h-8 text-[#03f5ff]" />
              <h3 className="text-3xl lg:text-4xl font-bold text-[#03f5ff]">¿Cómo participar?</h3>
            </div>

            <div className="flex flex-col gap-6 lg:grid lg:grid-cols-2 max-w-4xl mx-auto">
              {/* Institutional Registration */}
              <div className="bg-linear-to-br from-[#03f5ff]/10 to-[#00c6ff]/5 rounded-2xl p-6 border border-[#03f5ff]/20 shadow-lg backdrop-blur-sm">
                <div className="flex items-center justify-center mb-4">
                  <Briefcase className="w-12 h-12 lg:w-6 lg:h-6 text-[#03f5ff]" />
                  <h4 className="text-xl font-bold text-[#03f5ff] ms-4">Registro institucional</h4>
                </div>
                <p className="text-[#fcfef9]/80 text-lg">Tu colegio o facultad recibirá un código de acceso.</p>
              </div>

              {/* Independent Student */}
              <div className="bg-linear-to-br from-[#0090ff]/10 to-[#b5bbef]/5 rounded-2xl p-6 border border-[#0090ff]/20 shadow-lg backdrop-blur-sm">
                <div className="flex items-center justify-center mb-4">
                  <Users className="w-12 h-12 lg:w-6 lg:h-6 text-[#03f5ff]" />
                  <h4 className="text-xl font-bold text-[#03f5ff] lg:ms-4">¿Sos estudiante independiente?</h4>
                </div>
                <div className="space-y-2">
                  <p className="text-[#fcfef9]/80">Escribinos a:</p>
                  <div className="flex justify-center items-center gap-2 ">
                    <Mail className="w-5 h-5 text-[#03f5ff]" />
                    <span className="text-[#03f5ff] text-md lg:text-lg font-semibold">estudiantes@tcsummit.com.ar</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Important Note */}
            <div className="bg-linear-to-r from-[#fcfef9]/10 to-[#fcfef9]/5 rounded-xl p-4 border border-[#fcfef9]/20 max-w-2xl mx-auto backdrop-blur-sm">
              <p className="text-[#fcfef9]/80 font-medium">
                *Las plazas de transporte se asignan por orden de inscripción.
              </p>
            </div>

            {/* CTA Button */}
            <Button onClick={()=>{navigate.push("/new-feature")}}
              className="flex text-[#002c6b] font-bold text-lg py-4 rounded-2xl lg:text-xl
              bg-linear-to-r from-[#0090ff] to-[#0090ff] 
              hover:from-[#00c6ff] hover:to-[#0090ff] hover:scale-105 hover:shadow-2xl hover:shadow-[#03f5ff]/30
              transition-all duration-300 hover:cursor-pointer"
            >
              <span>Registro Estudiantes</span>
              <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#03f5ff]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#b5bbef]/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-[#00c6ff]/10 rounded-full blur-2xl"></div>
      </div>
    </section>
  )
}
