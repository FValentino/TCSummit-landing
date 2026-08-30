'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu as MenuIcon, X } from 'lucide-react'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'

import logo from '@/assets/images/logo.png'

const NAV_LINKS = [
  { label: 'Sponsors', href: '#sponsors' },
  { label: 'Beneficios', href: '#beneficios' },
  { label: 'Cómo funciona', href: '#proceso' },
  { label: 'Contacto', href: '#contacto' },
]

export default function CorporateMenu() {
  const [showMenuMobile, setShowMenuMobile] = useState(false)

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

  function toggleMenu() {
    setShowMenuMobile((prev) => !prev)
  }

  function handleLinkClick() {
    if (window.innerWidth < 1024) {
      setShowMenuMobile(false)
    }
  }

  function getLink(label: string, href: string) {
    return (
      <Link
        href={href}
        onClick={handleLinkClick}
        className="text-white text-xl lg:text-base transition-opacity hover:opacity-80"
      >
        {label}
      </Link>
    )
  }

  const ctaClasses = `
    inline-flex
    items-center
    justify-center
    bg-linear-to-r
    from-[#03f5ff]
    to-[#0090ff]
    text-[#002c6b]
    font-bold
    rounded-lg
    shadow-lg
    transition-all
    duration-300
    hover:shadow-[0_0_30px_rgba(3,245,255,0.6)]
  `

  return (
    <NavigationMenu.Root className="fixed top-0 left-0 w-full z-1000">
      <header
        className="w-full bg-blue-950/90 backdrop-blur-md border-b border-white/10"
      >
        <nav
          aria-label="Navegación corporativa"
          className="max-w-7xl mx-auto px-4"
        >
          {/* barra superior */}
          <div className="h-16 flex items-center justify-between">
            {/* logo */}
            <Link
              href="/"
              className="flex items-center w-40 sm:w-48 shrink-0"
            >
              <Image
                src={logo}
                alt="TCSummit"
                priority
                className="w-full h-auto object-contain"
              />
            </Link>

            {/* botón mobile */}
            <button
              onClick={toggleMenu}
              className="lg:hidden flex items-center justify-center text-white"
              aria-label={showMenuMobile ? 'Cerrar menú' : 'Abrir menú'}
            >
              {showMenuMobile ? (
                <X className="w-7 h-7" />
              ) : (
                <MenuIcon className="w-7 h-7" />
              )}
            </button>

            {/* navegación desktop */}
            <div className="hidden lg:flex">
              <NavigationMenu.List className="flex items-center gap-8">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>{getLink(link.label, link.href)}</li>
                ))}
                <li>
                  <Link
                    href="#contacto"
                    onClick={handleLinkClick}
                    className={`${ctaClasses} text-sm px-5 py-2.5`}
                  >
                    Quiero ser sponsor
                  </Link>
                </li>
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
            <NavigationMenu.List className="flex flex-col gap-4 pt-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>{getLink(link.label, link.href)}</li>
              ))}
              <li>
                <Link
                  href="#contacto"
                  onClick={handleLinkClick}
                  className={`${ctaClasses} w-full text-base px-5 py-3`}
                >
                  Quiero ser sponsor
                </Link>
              </li>
            </NavigationMenu.List>
          </div>
        </nav>
      </header>
    </NavigationMenu.Root>
  )
}