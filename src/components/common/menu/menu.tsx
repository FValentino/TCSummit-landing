'use client'

import { useEffect, useRef, useState, type MouseEvent } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useReducedMotion } from 'framer-motion'
import { Menu as MenuIcon, X, ChevronDown } from 'lucide-react'

import logo from '@/assets/images/logo.png'
import { NAV_GROUPS, NAV_IDS, type NavGroup } from '@/components/common/navLinks'
import { useScrollSpy } from './useScrollSpy'

const LINK_CLASS =
  'text-white text-xl lg:text-base capitalize transition-colors hover:text-[#03f5ff]'
const ACTIVE_CLASS = 'text-[#03f5ff]'
// The wrapper keeps the visual gap as *padding* (hoverable, inside the `li`) instead of
// margin (dead space) — otherwise the pointer crosses the gap, `onMouseLeave` fires and the
// dropdown closes before it can be clicked.
const DROPDOWN_WRAPPER_CLASS = 'absolute left-0 top-full z-10 pt-2'
const DROPDOWN_CARD_CLASS =
  'min-w-56 rounded-2xl border border-white/10 bg-blue-950/95 p-2 shadow-xl backdrop-blur-md'
const DROPDOWN_LINK_CLASS =
  'block rounded-lg px-3 py-2 text-base text-white capitalize transition-colors hover:bg-white/10 hover:text-[#03f5ff]'

export default function Menu() {
  const [showMenuMobile, setShowMenuMobile] = useState(false)
  const [openGroup, setOpenGroup] = useState<string | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const reduced = useReducedMotion()
  const activeId = useScrollSpy(NAV_IDS)

  function cancelClose() {
    if (closeTimer.current !== null) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }

  function openDropdown(id: string) {
    cancelClose()
    setOpenGroup(id)
  }

  // Small grace period before closing so a quick pointer slip off the trigger/dropdown
  // does not dismiss it mid-transit.
  function scheduleClose(id: string) {
    cancelClose()
    closeTimer.current = setTimeout(() => {
      setOpenGroup((prev) => (prev === id ? null : prev))
    }, 150)
  }

  useEffect(
    () => () => {
      if (closeTimer.current !== null) clearTimeout(closeTimer.current)
    },
    []
  )

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setShowMenuMobile(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (openGroup === null) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenGroup(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [openGroup])

  function toggleGroup(id: string) {
    cancelClose()
    setOpenGroup((prev) => (prev === id ? null : id))
  }

  function handleLinkClick(event: MouseEvent<HTMLAnchorElement>, id: string) {
    cancelClose()
    setOpenGroup(null)
    if (window.innerWidth < 1024) setShowMenuMobile(false)
    // Under reduced motion, leave the native hash jump to the browser — no smooth scroll.
    if (reduced) return
    const target = document.getElementById(id)
    if (target === null) return
    event.preventDefault()
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.history.replaceState(null, '', `#${id}`)
  }

  function isGroupActive(group: NavGroup) {
    return group.links.some((link) => link.id === activeId)
  }

  function renderLink(id: string, label: string, className = LINK_CLASS) {
    const isActive = activeId === id
    return (
      <a
        href={`#${id}`}
        onClick={(event) => handleLinkClick(event, id)}
        aria-current={isActive ? 'true' : undefined}
        className={`${className} ${isActive ? ACTIVE_CLASS : ''}`}
      >
        {label}
      </a>
    )
  }

  function groupLabel(group: NavGroup, size: 'sm' | 'lg') {
    return (
      <>
        {group.label}
        <ChevronDown
          aria-hidden="true"
          className={`${size === 'lg' ? 'h-4 w-4' : 'h-5 w-5'} transition-transform ${
            openGroup === group.id ? 'rotate-180' : ''
          }`}
        />
      </>
    )
  }

  return (
    <div className="fixed top-0 left-0 w-full z-1000">
      <header className="w-full bg-blue-950/90 backdrop-blur-md border-b border-white/10">
        <nav aria-label="Navegación principal" className="max-w-7xl mx-auto px-4">
          <div className="h-[4 rem] flex items-center justify-between">
            <Link href="/" className="flex items-center w-40 sm:w-48 shrink-0">
              <Image src={logo} alt="TCSummit" priority className="w-full h-auto object-contain" />
            </Link>

            <button
              onClick={() => setShowMenuMobile((prev) => !prev)}
              className="lg:hidden flex items-center justify-center text-white"
              aria-label={showMenuMobile ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={showMenuMobile}
            >
              {showMenuMobile ? <X className="w-7 h-7" /> : <MenuIcon className="w-7 h-7" />}
            </button>

            {/* navegación desktop */}
            <div className="hidden lg:flex">
              <ul className="flex items-center gap-8">
                {NAV_GROUPS.map((group) =>
                  group.links.length === 1 ? (
                    <li key={group.id}>{renderLink(group.links[0].id, group.links[0].label)}</li>
                  ) : (
                    <li
                      key={group.id}
                      className="relative"
                      onMouseEnter={() => openDropdown(group.id)}
                      onMouseLeave={() => scheduleClose(group.id)}
                    >
                      <button
                        type="button"
                        aria-haspopup="true"
                        aria-expanded={openGroup === group.id}
                        onClick={() => toggleGroup(group.id)}
                        className={`${LINK_CLASS} ${isGroupActive(group) ? ACTIVE_CLASS : ''} flex items-center gap-1`}
                      >
                        {groupLabel(group, 'lg')}
                      </button>
                      {openGroup === group.id && (
                        <div className={DROPDOWN_WRAPPER_CLASS}>
                          <ul className={DROPDOWN_CARD_CLASS}>
                            {group.links.map((link) => (
                              <li key={link.id}>
                                {renderLink(link.id, link.label, DROPDOWN_LINK_CLASS)}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          {/* navegación mobile */}
          <div
            className={`lg:hidden transition-all duration-300 ease-in-out ${
              showMenuMobile ? 'max-h-[70vh] overflow-y-auto opacity-100 pb-4' : 'max-h-0 overflow-hidden opacity-0'
            }`}
          >
            <ul className="flex flex-col gap-4 pt-2">
              {NAV_GROUPS.map((group) =>
                group.links.length === 1 ? (
                  <li key={group.id}>{renderLink(group.links[0].id, group.links[0].label)}</li>
                ) : (
                  <li key={group.id}>
                    <button
                      type="button"
                      aria-haspopup="true"
                      aria-expanded={openGroup === group.id}
                      onClick={() => toggleGroup(group.id)}
                      className={`${LINK_CLASS} ${isGroupActive(group) ? ACTIVE_CLASS : ''} flex w-full items-center justify-between`}
                    >
                      {groupLabel(group, 'sm')}
                    </button>
                    {openGroup === group.id && (
                      <ul className="mt-3 flex flex-col gap-3 border-l border-white/15 pl-4">
                        {group.links.map((link) => (
                          <li key={link.id}>{renderLink(link.id, link.label)}</li>
                        ))}
                      </ul>
                    )}
                  </li>
                )
              )}
            </ul>
          </div>
        </nav>
      </header>
    </div>
  )
}
