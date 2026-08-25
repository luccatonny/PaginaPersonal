"use client"

import { useState, useRef } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Send, Loader2, CheckCircle2, Mail, MapPin } from "lucide-react"
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons"
import { SectionHeading } from "@/components/ui/section-heading"
import { Reveal } from "@/components/ui/reveal"
import { profile } from "@/lib/data"

const contactSchema = z.object({
  name: z.string().min(2, "Ingresa tu nombre (mín. 2 caracteres)."),
  email: z.string().email("Ingresa un correo electrónico válido."),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres."),
})

type ContactValues = z.infer<typeof contactSchema>

export function Contact() {
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({ resolver: zodResolver(contactSchema) })

  // 🔧 Función para formatear la fecha actual
  const getCurrentDate = () => {
    const now = new Date()
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }
    return now.toLocaleDateString('es-ES', options)
  }

  async function onSubmit(values: ContactValues) {
    setError(null)
    
    try {
      console.log('📤 Enviando formulario:', values)

      // ✅ Enviamos los datos a nuestra API Route
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          message: values.message,
          current_date: getCurrentDate(),
        }),
      })

      console.log('📥 Respuesta del servidor:', response.status)

      // Intentar obtener el body de la respuesta
      let result
      try {
        result = await response.json()
        console.log('📦 Datos de respuesta:', result)
      } catch (parseError) {
        console.error('❌ Error al parsear respuesta:', parseError)
        // Si no se puede parsear, intentar leer como texto
        const text = await response.text()
        console.error('📄 Respuesta cruda:', text)
        throw new Error('Error en el servidor')
      }

      if (response.ok) {
        setSent(true)
        reset()
        setTimeout(() => setSent(false), 4000)
      } else {
        // Mostrar el error específico del servidor
        const errorMsg = result?.error || result?.message || 'Error al enviar'
        console.error('❌ Error del servidor:', errorMsg)
        throw new Error(errorMsg)
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido'
      console.error('❌ Error en onSubmit:', errorMessage)
      setError(`Hubo un error al enviar el mensaje: ${errorMessage}`)
    }
  }

  const socials = [
    { icon: GithubIcon, href: profile.links.github, label: "GitHub" },
    { icon: LinkedinIcon, href: profile.links.linkedin, label: "LinkedIn" },
    { icon: Mail, href: profile.links.email, label: "Correo" },
  ]

  return (
    <section id="contact" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-20 md:py-28">
      <SectionHeading
        eyebrow="Contacto"
        title="Trabajemos juntos"
        description="¿Tienes un proyecto en mente o buscas un desarrollador para tu equipo? Escríbeme y conversemos."
      />

      <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.4fr]">
        <Reveal className="glass flex flex-col justify-between gap-8 rounded-2xl p-8 transition-all duration-300 hover:border-primary/40">
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold">Hablemos</h3>
            <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
              Estoy abierto a oportunidades de trabajo, colaboraciones y proyectos freelance. Respondo en menos de 24
              horas.
            </p>
            
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary shrink-0" />
              <span>{profile.location}</span>
            </div>
            
            <a
              href={profile.links.email}
              className="inline-flex w-fit items-center gap-2 rounded-xl border border-border bg-secondary/60 px-4 py-2.5 text-sm font-medium transition-colors hover:border-primary/50 hover:bg-secondary/80"
            >
              <Mail className="h-4 w-4 text-primary" />
              {profile.links.email.replace("mailto:", "")}
            </a>
          </div>
          <div className="flex items-center gap-3">
            {socials.map(({ icon: Icon, href, label }) => (
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
          </div>
        </Reveal>

        <Reveal delay={1} className="glass rounded-2xl p-8 transition-all duration-300 hover:border-primary/40">
          <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Nombre
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Tu nombre"
                  aria-invalid={!!errors.name}
                  {...register("name")}
                  className="rounded-xl border border-input bg-secondary/40 px-4 py-3 text-sm outline-none transition-colors focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
                />
                {errors.name && <span className="text-xs text-destructive">{errors.name.message}</span>}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Correo
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="tucorreo@email.com"
                  aria-invalid={!!errors.email}
                  {...register("email")}
                  className="rounded-xl border border-input bg-secondary/40 px-4 py-3 text-sm outline-none transition-colors focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
                />
                {errors.email && <span className="text-xs text-destructive">{errors.email.message}</span>}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm font-medium">
                Mensaje
              </label>
              <textarea
                id="message"
                rows={5}
                placeholder="Cuéntame sobre tu proyecto..."
                aria-invalid={!!errors.message}
                {...register("message")}
                className="resize-none rounded-xl border border-input bg-secondary/40 px-4 py-3 text-sm outline-none transition-colors focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
              />
              {errors.message && <span className="text-xs text-destructive">{errors.message.message}</span>}
            </div>

            {error && (
              <div className="rounded-xl bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || sent}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : sent ? (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  ¡Mensaje enviado!
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Enviar mensaje
                </>
              )}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
