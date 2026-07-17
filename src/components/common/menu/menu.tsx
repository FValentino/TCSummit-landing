'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu as MenuIcon, X } from 'lucide-react'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'

import logo from '@/assets/images/logo.png'

export default function Menu() {
  const [showMenuMobile, setShowMenuMobile] = useState(false)

  // Efecto para cerrar el menú mobile automáticamente al pasar a desktop
  useEffect(() => {
    const handleResize = () => {
      // cerrar menú mobile automáticamente al pasar a desktop
      if (window.innerWidth >= 1024) {
        setShowMenuMobile(false)
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Función para toggle del menú mobile
  function toggleMenu() {
    setShowMenuMobile((prev) => !prev)
  }

  // Función para cerrar el menú mobile al hacer clic en un enlace
  function handleLinkClick() {
    if (window.innerWidth < 1024) {
      setShowMenuMobile(false)
    }
  }

  // Función que genera los enlaces de navegación
  // Se usa href completo y scroll={true} para asegurar 
  // que navegue a la raíz con el hash correspondiente
  function getLink(name: string, customHref?: string) {
    // Si es "inicio", va a la raíz, si no, va a la raíz con el hash
    // Esto asegura que desde cualquier ruta (ej: /post-compra) 
    // siempre navegue a la raíz y luego al hash correspondiente
    const href = customHref || (name === 'inicio' ? '/' : `/#${name}`);
    
    return (
      <Link
        href={href}
        onClick={handleLinkClick}
        scroll={true} // Asegura que haga scroll al elemento con el hash
        className={`
          text-white
          text-xl
          lg:text-base
          capitalize
          transition-opacity
          hover:opacity-80
        `}
      >
        {name}
      </Link>
    )
  }

  return (
    <NavigationMenu.Root className={`fixed top-0 left-0 w-full z-1000 `}>
      <header
        className={`
          w-full
          bg-blue-950/90
          backdrop-blur-md
          border-b
          border-white/10
        `}
      >
        <nav
          aria-label="Navegación principal"
          className={`
            max-w-7xl
            mx-auto
            px-4
          `}
        >
          {/* barra superior */}
          <div
            className={`
              h-16
              flex
              items-center
              justify-between
            `}
          >
            {/* logo */}
            <Link
              href="/"
              className={`
                flex
                items-center
                w-40
                sm:w-48
                shrink-0
              `}
            >
              <Image
                src={logo}
                alt="TCSummit"
                priority
                className={`w-full h-auto object-contain`}
              />
            </Link>

            {/* botón mobile */}
            <button
              onClick={toggleMenu}
              className={`
                lg:hidden
                flex
                items-center
                justify-center
                text-white
              `}
              aria-label={
                showMenuMobile ? 'Cerrar menú' : 'Abrir menú'
              }
            >
              {showMenuMobile ? (
                <X className={`w-7 h-7`} />
              ) : (
                <MenuIcon className={`w-7 h-7`} />
              )}
            </button>

            {/* navegación desktop */}
            <div className={`hidden lg:flex`}>
              <NavigationMenu.List
                className={`
                  flex
                  items-center
                  gap-8
                `}
              >
                <li>{getLink('inicio')}</li>
                <li>{getLink('actividades')}</li>
                <li>{getLink('nosotros')}</li>
                <li>{getLink('roadmap')}</li>
                <li>{getLink('contacto')}</li>
                {/* <li>{getLink('Mis Entradas', '/tickets/mis-entradas')}</li> */}
              </NavigationMenu.List>
            </div>
          </div>

          {/* navegación mobile */}
          <div
            className={`
              lg:hidden
              overflow-hidden
              transition-all
              duration-300
              ease-in-out
              ${
                showMenuMobile
                  ? 'max-h-96 opacity-100 pb-4'
                  : 'max-h-0 opacity-0'
              }
            `}
          >
            <NavigationMenu.List
              className={`
                flex
                flex-col
                gap-4
                pt-2
              `}
            >
              <li>{getLink('inicio')}</li>
              <li>{getLink('actividades')}</li>
              <li>{getLink('nosotros')}</li>
              <li>{getLink('roadmap')}</li>
              <li>{getLink('contacto')}</li>
              {/* <li>{getLink('Mis Entradas', '/tickets/mis-entradas')}</li> */}
            </NavigationMenu.List>
          </div>
        </nav>
      </header>
    </NavigationMenu.Root>
  )
}