"use client"

import { useEffect, useState, useRef } from "react"
import { Menu, X, Download, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { navItems, profile } from "@/lib/data"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [isCvDropdownOpen, setIsCvDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Detectar scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCvDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Cerrar menú móvil al hacer click en un enlace
  const handleLinkClick = () => {
    setOpen(false)
    setIsCvDropdownOpen(false)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        aria-label="Navegación principal"
        className={cn(
          "flex w-full max-w-5xl items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300",
          scrolled ? "glass shadow-lg shadow-black/20" : "border border-transparent",
        )}
      >
        <a href="#hero" className="flex items-center gap-2 pl-1 font-bold tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-sm text-primary-foreground">
            WS
          </span>
          <span className="hidden sm:inline">Williams S.</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          {/* ✅ BOTÓN CV CON DROPDOWN - DESKTOP */}
          <div className="relative hidden sm:block" ref={dropdownRef}>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setIsCvDropdownOpen(!isCvDropdownOpen)
              }}
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25"
            >
              <Download className="h-4 w-4" />
              CV
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${isCvDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isCvDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl border border-border bg-background shadow-lg py-2 z-50 overflow-hidden">
                {profile.cvs?.map((cv, index) => (
                  <a
                    key={index}
                    href={`/assets/documents/cv/${cv.file}`}
                    download
                    onClick={(e) => {
                      e.stopPropagation()
                      setIsCvDropdownOpen(false)
                    }}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-secondary transition-colors"
                  >
                    <span className="text-lg">{cv.icon || '📄'}</span>
                    <span>{cv.label}</span>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Botón menú móvil */}
          <button
            type="button"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-lg border border-border text-foreground md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Menú móvil */}
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="glass absolute inset-x-4 top-20 rounded-2xl p-3 md:hidden"
          >
            <ul className="flex flex-col gap-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-4 py-3 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              {/* ✅ OPCIONES DE CV EN MENÚ MÓVIL */}
              <li className="border-t border-border pt-2 mt-1">
                {profile.cvs?.map((cv, index) => (
                  <a
                    key={index}
                    href={`/assets/documents/cv/${cv.file}`}
                    download
                    onClick={handleLinkClick}
                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  >
                    <Download className="h-4 w-4" />
                    {cv.label}
                  </a>
                ))}
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
