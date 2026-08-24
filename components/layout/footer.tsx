import { Mail, Video, ArrowUp } from "lucide-react"
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons"
import { profile } from "@/lib/data"

export function Footer() {
  const year = new Date().getFullYear()
  const socials = [
    { icon: GithubIcon, href: profile.links.github, label: "GitHub" },
    { icon: LinkedinIcon, href: profile.links.linkedin, label: "LinkedIn" },
    { icon: Mail, href: profile.links.email, label: "Correo" },
  ]

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-10 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-xs font-bold text-primary-foreground">
            WS
          </span>
          <span>
            © {year} {profile.name}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="grid h-9 w-9 place-items-center rounded-lg border border-border text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:text-foreground"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
          <a
            href="#hero"
            aria-label="Volver arriba"
            className="grid h-9 w-9 place-items-center rounded-lg border border-border text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:text-foreground"
          >
            <ArrowUp className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  )
}
