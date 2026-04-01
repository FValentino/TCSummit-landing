'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu as MenuIcon } from "lucide-react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import logo from "@/assets/images/logo.png"

export default function Menu(){
  const [showMenuMobile, setShowMenuMobile] = useState<boolean>(false)
  const [isDesktop, setIsDesktop] = useState<boolean>(false)
  
  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024)
      if (window.innerWidth >= 1024) {
        setShowMenuMobile(true)
      }
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  function toggleMenu(){
    if (!isDesktop){
      setShowMenuMobile(!showMenuMobile)
    }
  }

  function getLink(name: string){
    return (
      <Link href={`#${name}`} onClick={toggleMenu}
        className="text-2xl cursor-pointer text-white capitalize lg:text-lg hover:border-b hover:border-white">
          {name}
      </Link>
    )
  }
  
return (
    <NavigationMenu.Root>
      <header className={`w-full flex items-center px-3 fixed top-0 z-1000 border-b-gray-40
         ${isDesktop ? "bg-blue-950/50 h-16" : "bg-blue-950/90 min-h-16"}
         ${showMenuMobile && " py-2"}`}>
        <nav aria-label="Navegación principal" 
          className={`w-full flex flex-col justify-between items-center lg:flex-row`}>
          {/* logo */}
          <div className="w-full flex justify-between items-center">
            <Link href="/inicio#hero">
              <div className="w-[50%]">
                <Image
                  src={logo}
                  alt="TCSummit"
                  layout="responsive"
                  priority
                />
              </div>
            </Link>
            <button className="lg:hidden" onClick={toggleMenu}>
              <MenuIcon className="w-6 h-6 text-white"/>
            </button>
          </div>

          {/* navegacion */}
          <div className={`${showMenuMobile ? "w-full my-2 lg:me-2" : "hidden"}`}>
            <NavigationMenu.List className="w-full flex flex-col items-start ms-3 lg:flex-row lg:justify-between">
              <li className="my-1">
                {getLink("inicio")}
              </li>
              <li className="my-1">
                {getLink("actividades")}
              </li>
              <li className="my-1">
                {getLink("nosotros")}
              </li>
              <li className="my-1">
                {getLink("roadmap")}
              </li>
              {/* <li className="my-1">
                {getLink("ubicacion")}
              </li> */}
              <li className="my-1">
                {getLink("contacto")}
              </li>
            </NavigationMenu.List>
          </div>
        </nav>
      </header>
    </NavigationMenu.Root>
  )
}