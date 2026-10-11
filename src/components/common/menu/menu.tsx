'use client'

import { useEffect, useState, type MouseEvent } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useReducedMotion } from 'framer-motion'
import { Menu as MenuIcon, X } from 'lucide-react'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'

import logo from '@/assets/images/logo.png'
import { NAV_LINKS, NAV_IDS } from '@/components/common/navLinks'
import { useScrollSpy } from './useScrollSpy'

const LINK_CLASS =
  'text-white text-xl lg:text-base capitalize transition-colors hover:text-[#03f5ff]'
const ACTIVE_CLASS = 'text-[#03f5ff]'

export default function Menu() {
  const [showMenuMobile, setShowMenuMobile] = useState(false)
  const reduced = useReducedMotion()
  const activeId = useScrollSpy(NAV_IDS)

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

  function handleLinkClick(event: MouseEvent<HTMLAnchorElement>, id: string) {
    if (window.innerWidth < 1024) {
      setShowMenuMobile(false)
    }
    // Under reduced motion, leave the native hash jump to the browser — no smooth scroll.
    if (reduced) return
    const target = document.getElementById(id)
    if (target === null) return
    event.preventDefault()
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.history.replaceState(null, '', `#${id}`)
  }

  function renderLink(id: string, label: string) {
    const isActive = activeId === id
    return (
      <a
        href={`#${id}`}
        onClick={(event) => handleLinkClick(event, id)}
        aria-current={isActive ? 'true' : undefined}
        className={`${LINK_CLASS} ${isActive ? ACTIVE_CLASS : ''}`}
      >
        {label}
      </a>
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
              aria-expanded={showMenuMobile}
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
                {NAV_LINKS.map((link) => (
                  <li key={link.id}>{renderLink(link.id, link.label)}</li>
                ))}
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
              {NAV_LINKS.map((link) => (
                <li key={link.id}>{renderLink(link.id, link.label)}</li>
              ))}
            </NavigationMenu.List>
          </div>
        </nav>
      </header>
    </NavigationMenu.Root>
  )
}
