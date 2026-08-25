"use client"

import { motion } from "framer-motion"
import { Download, ArrowRight, Mail, MapPin, ChevronDown } from "lucide-react"
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons"
import { profile } from "@/lib/data"
import Image from "next/image"
import { useState, useRef, useEffect } from "react"

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
}

export function Hero() {
  const [isCvDropdownOpen, setIsCvDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

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

  return (
    <section id="hero" className="relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28">
      {/* backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-[-10%] left-1/2 h-130 w-130 -translate-x-1/2 rounded-full bg-primary/20 blur-[140px]" />
        <div className="absolute right-[10%] bottom-[-20%] h-90 w-90 rounded-full bg-accent/15 blur-[130px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,var(--background))]" />
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-[1.4fr_1fr]">
        <motion.div variants={container} initial="hidden" animate="visible" className="flex flex-col items-start gap-6">
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-4 py-1.5 text-xs font-medium text-muted-foreground"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Disponible para nuevos proyectos
          </motion.span>

          <motion.div
            variants={item}
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <MapPin className="h-4 w-4 text-primary" />
            {profile.location}
          </motion.div>

          <motion.h1
            variants={item}
            className="text-4xl font-extrabold tracking-tight text-balance sm:text-6xl leading-tight"
          >
            Hola, soy
            <br />
            <span className="text-gradient">{profile.name}</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="text-xl font-semibold text-primary"
          >
            {profile.role}
          </motion.p>

          <motion.div
            variants={item}
            className="flex flex-wrap gap-3"
          >
            {profile.titles.map((title) => (
              <span
                key={title}
                className="rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium"
              >
                {title}
              </span>
            ))}
          </motion.div>

          <motion.p
            variants={item}
            className="max-w-2xl text-lg leading-8 text-muted-foreground"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            variants={item}
            className="flex flex-wrap gap-4 pt-4"
          >
            {/* ✅ BOTÓN DE CV CON DROPDOWN - CORREGIDO */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setIsCvDropdownOpen(!isCvDropdownOpen)
                }}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:scale-105 hover:bg-primary/90"
              >
                <Download className="h-5 w-5" />
                Descargar CV
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isCvDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isCvDropdownOpen && (
                <div className="absolute left-0 mt-2 w-56 rounded-xl border border-border bg-background shadow-lg py-2 z-50 overflow-hidden">
                  {profile.cvs?.map((cv, index) => (
                    <a
                      key={index}
                      href={`/assets/documents/cv/${cv.file}`}
                      download
                      onClick={(e) => {
                        e.stopPropagation()
                        setIsCvDropdownOpen(false)
                      }}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-foreground hover:bg-secondary transition-colors"
                    >
                      <span className="text-xl">{cv.icon || '📄'}</span>
                      <span>{cv.label}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>

            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold transition hover:border-primary hover:text-primary"
            >
              Explorar proyectos
              <ArrowRight className="h-5 w-5" />
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl border border-transparent px-6 py-3 text-sm font-semibold text-muted-foreground transition hover:text-primary"
            >
              <Mail className="h-5 w-5" />
              Contactarme
            </a>
          </motion.div>

          <motion.div variants={item} className="flex items-center gap-3 pt-2">
            {[
              { icon: GithubIcon, href: profile.links.github, label: "GitHub" },
              { icon: LinkedinIcon, href: profile.links.linkedin, label: "LinkedIn" },
              { icon: Mail, href: profile.links.email, label: "Correo" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-card/60 text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:text-foreground"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div className="absolute -inset-4 -z-10 rounded-4xl bg-linear-to-tr from-primary/30 via-transparent to-accent/30 blur-2xl" />
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="glass relative aspect-4/5 overflow-hidden rounded-2xl p-2"
          >
            <div className="relative flex h-full w-full flex-col items-center justify-center rounded-[22px] bg-secondary/40 overflow-hidden">
              <Image
                src="/assets/images/profile/Perfil.jpeg"
                alt={`${profile.name} - ${profile.role}`}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
              <div className="relative z-10 mt-auto p-6 text-center w-full">
                <h3 className="text-lg font-semibold text-white">
                  {profile.name.split(" ").slice(0, 2).join(" ")}
                </h3>
                <p className="text-sm text-white/80">
                  {profile.role}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Metrics Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mx-auto mt-24 max-w-6xl px-6"
      >
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          <div className="rounded-xl border border-border/50 bg-card/50 p-6 text-center backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10">
            <h2 className="text-3xl font-bold text-primary">3+</h2>
            <p className="mt-1 text-sm text-muted-foreground">Años de experiencia</p>
          </div>
          <div className="rounded-xl border border-border/50 bg-card/50 p-6 text-center backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10">
            <h2 className="text-3xl font-bold text-primary">8+</h2>
            <p className="mt-1 text-sm text-muted-foreground">Proyectos desarrollados</p>
          </div>
          <div className="rounded-xl border border-border/50 bg-card/50 p-6 text-center backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10">
            <h2 className="text-3xl font-bold text-primary">12+</h2>
            <p className="mt-1 text-sm text-muted-foreground">Tecnologías utilizadas</p>
          </div>
          <div className="rounded-xl border border-border/50 bg-card/50 p-6 text-center backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10">
            <h2 className="text-3xl font-bold text-primary">100%</h2>
            <p className="mt-1 text-sm text-muted-foreground">Compromiso con la calidad</p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}