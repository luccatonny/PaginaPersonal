// lib/data.ts

export type NavItem = { label: string; href: string }
export const navItems: NavItem[] = [
  { label: "Inicio", href: "#hero" },
  { label: "Sobre mí", href: "#about" },
  { label: "Tecnologías", href: "#tech" },
  { label: "Experiencia", href: "#experience" },
  { label: "Proyectos", href: "#projects" },
  { label: "Certificaciones", href: "#certifications" },
  { label: "Contacto", href: "#contact" },
]

export const profile = {
  name: "Williams Anthony Sanabria Tinoco",
  role: "Ingeniero de Sistemas e Informática | Full Stack Developer",
  location: "Huancayo, Perú",
  cvUrl: "/assets/documents/cv/WilliamsAnthonySanabriaTinocoCV_26_04_2026.pdf",
  tagline: "Ingeniero de Sistemas con experiencia en desarrollo full-stack, infraestructura tecnológica y soporte especializado. Combino habilidades técnicas en Next.js, NestJS, Flutter y Power BI con administración de sistemas y redes. Apasionado por construir soluciones tecnológicas que transforman procesos y generan impacto real.",
  titles: [
    "Ingeniero de Sistemas",
    "Full Stack Developer",
    "Desarrollador Móvil",
    "Especialista en Infraestructura TI",
  ],
  links: {
    github: "https://github.com/luccatonny",
    linkedin: "https://www.linkedin.com/in/williams-anthony-sanabria-tinoco-6893473a4",
    email: "mailto:lucvatonny6@gmail.com",
  },
}

export const about = {
  paragraphs: [
    "Soy Ingeniero de Sistemas e Informática con experiencia integral en desarrollo de software full-stack, gestión de infraestructura tecnológica y soporte técnico especializado. He trabajado en el sector microfinanciero, retail y proyectos independientes, combinando habilidades técnicas con una fuerte orientación al cliente.",
    "Actualmente me desempeño como Asistente de Ingeniería de Sistemas en el sector microfinanciero, donde combino desarrollo de aplicaciones móviles con Flutter, análisis de datos con Power BI, administración de sistemas y soporte técnico especializado.",
    "Mi enfoque está en crear soluciones tecnológicas escalables que resuelvan problemas reales. He desarrollado aplicaciones web full-stack con Next.js y NestJS, aplicaciones móviles multiplataforma, y he implementado infraestructura en la nube con Docker y DigitalOcean.",
  ],
  highlights: [
    "Arquitectura limpia y SOLID",
    "Backend con NestJS y Node.js",
    "Frontend con Next.js y React",
    "Aplicaciones móviles con Flutter",
    "Bases de datos relacionales",
    "DevOps & Docker",
  ],
}

export type Tech = { name: string; level: number; levelLabel: string; years: string }
export type TechCategory = { category: string; items: Tech[] }

export const techStack: TechCategory[] = [
  {
    category: "Backend",
    items: [
      { name: "NestJS", level: 85, levelLabel: "Avanzado", years: "2 años" },
      { name: "Node.js", level: 85, levelLabel: "Avanzado", years: "3 años" },
      { name: "TypeScript", level: 90, levelLabel: "Avanzado", years: "3 años" },
      { name: "Java", level: 70, levelLabel: "Intermedio", years: "2 años" },
      { name: "Python", level: 75, levelLabel: "Intermedio", years: "1.5 años" },
      { name: "C#", level: 65, levelLabel: "Intermedio", years: "1 año" },
      { name: "Angular", level: 60, levelLabel: "Conocimientos", years: "1 año" },
    ],
  },
  {
    category: "Frontend",
    items: [
      { name: "Next.js", level: 85, levelLabel: "Avanzado", years: "2 años" },
      { name: "React", level: 85, levelLabel: "Avanzado", years: "2 años" },
      { name: "Tailwind CSS", level: 88, levelLabel: "Avanzado", years: "2 años" },
      { name: "HTML/CSS", level: 90, levelLabel: "Avanzado", years: "4 años" },
    ],
  },
  {
    category: "Desarrollo Móvil",
    items: [
      { name: "Flutter (Dart)", level: 75, levelLabel: "Intermedio", years: "1.5 años" },
      { name: "Android Studio (Java)", level: 75, levelLabel: "Intermedio", years: "2 años" },
    ],
  },
  {
    category: "Bases de Datos",
    items: [
      { name: "PostgreSQL", level: 85, levelLabel: "Avanzado", years: "2 años" },
      { name: "MySQL", level: 80, levelLabel: "Avanzado", years: "3 años" },
      { name: "SQL Server", level: 70, levelLabel: "Intermedio", years: "1 año" },
      { name: "SQLite", level: 75, levelLabel: "Intermedio", years: "1.5 años" },
    ],
  },
  {
    category: "DevOps & Cloud",
    items: [
      { name: "Docker", level: 80, levelLabel: "Avanzado", years: "2 años" },
      { name: "DigitalOcean", level: 75, levelLabel: "Intermedio", years: "1.5 años" },
      { name: "Git", level: 92, levelLabel: "Avanzado", years: "4 años" },
      { name: "GitHub", level: 90, levelLabel: "Avanzado", years: "4 años" },
      { name: "Linux", level: 75, levelLabel: "Intermedio", years: "2 años" },
    ],
  },
  {
    category: "Análisis & Visualización",
    items: [
      { name: "Power BI", level: 70, levelLabel: "Intermedio", years: "1 año" },
      { name: "Excel Avanzado", level: 85, levelLabel: "Avanzado", years: "4 años" },
      { name: "Python (Ciencia de Datos)", level: 65, levelLabel: "Intermedio", years: "1 año" },
    ],
  },
  {
    category: "Infraestructura & Soporte",
    items: [
      { name: "Redes y Telecomunicaciones", level: 75, levelLabel: "Intermedio", years: "2 años" },
      { name: "Fibra Óptica", level: 70, levelLabel: "Intermedio", years: "1 año" },
      { name: "Mantenimiento de Equipos", level: 85, levelLabel: "Avanzado", years: "3 años" },
      { name: "Seguridad Informática", level: 65, levelLabel: "Intermedio", years: "1.5 años" },
    ],
  },
  {
    category: "Herramientas",
    items: [
      { name: "VS Code", level: 95, levelLabel: "Avanzado", years: "4 años" },
      { name: "Postman", level: 85, levelLabel: "Intermedio", years: "1 años" },
      { name: "Swagger", level: 80, levelLabel: "Avanzado", years: "2 años" },
    ],
  },
]

export type Experience = {
  company: string
  role: string
  period: string
  description: string
  tech: string[]
  achievements: string[]
}

export const experiences: Experience[] = [
  {
    company: "Sector Microfinanciero",
    role: "Asistente de Ingeniería de Sistemas",
    period: "Febrero 2025 — Julio 2026",
    description:
      "Soporte técnico integral a usuarios del sistema financiero, garantizando la continuidad operativa de las agencias. Administración de sistemas operativos, software especializado y aplicaciones financieras.",
    tech: ["Flutter", "Power BI", "SQL Server", "Redes", "Soporte TI"],
    achievements: [
      "Desarrollo de aplicaciones móviles con Flutter para mejorar procesos internos y experiencia del usuario en servicios financieros.",
      "Creación de dashboards y reportes interactivos en Power BI para visualización de indicadores clave de rendimiento.",
      "Gestión de incidencias tecnológicas y documentación de procesos técnicos.",
      "Mantenimiento preventivo y correctivo de equipos informáticos y servidores.",
    ],
  },
  {
    company: "GRUPO PAMD S.A.C.",
    role: "Ingeniero de Sistemas - Soporte TI",
    period: "Abril 2024 — Enero 2025",
    description:
      "Gestión de tecnologías de la información para empresas retail (Promart, Oechsle) y entidades financieras (Caja Los Andes).",
    tech: ["Soporte TI", "Redes", "Hardware", "Software"],
    achievements: [
      "Soporte técnico especializado en múltiples ubicaciones para empresas del sector retail y financiero.",
      "Optimización de infraestructuras tecnológicas garantizando la operatividad eficiente de los sistemas.",
      "Mantenimiento de equipos e instalación de software en entornos empresariales.",
    ],
  },
  {
    company: "CORTIJO SERVICIOS GENERALES EIRL",
    role: "Practicante - Área de Operaciones",
    period: "Enero 2024 — Abril 2024",
    description:
      "Gestión de procesos operativos, optimización de recursos y cumplimiento de objetivos en entorno dinámico.",
    tech: ["Gestión Operativa", "Procesos", "Optimización"],
    achievements: [
      "Apoyo en la implementación de mejoras en procesos administrativos y operacionales.",
      "Optimización de recursos y cumplimiento de objetivos en entorno dinámico.",
    ],
  },
  {
    company: "Cable Fast - Palian",
    role: "Técnico en Telecomunicaciones",
    period: "Julio 2023 — Diciembre 2023",
    description:
      "Instalación y configuración de redes de fibra óptica y sistemas de telecomunicaciones.",
    tech: ["Fibra Óptica", "Redes", "DVR", "Telecomunicaciones"],
    achievements: [
      "Realicé instalaciones y conexiones de fibra óptica para optimizar la calidad del servicio de internet.",
      "Configuré equipos DVR para distribución de señal de televisión por cable.",
      "Ejecuté trabajos de canalización, empalmes y pruebas de conectividad en redes de fibra óptica.",
      "Brindé soporte técnico en configuración de equipos de red y resolución de problemas de conectividad.",
    ],
  },
]

export type Project = {
  title: string
  description: string
  tech: string[]
  status: "Producción" | "En desarrollo" | "Completado"
  image: string
  github: string
  demo: string
  video?: string
}

export const projects: Project[] = [
  {
    title: "Aplicación Web Full-Stack - Sistema Fintech",
    description:
      "Desarrollo y despliegue de aplicación web full-stack con Next.js en frontend y NestJS en backend, base de datos PostgreSQL y documentación de API mediante Swagger. Implementación de arquitectura en contenedores con Docker y despliegue en DigitalOcean.",
    tech: ["Next.js","NestJS","TypeScript","PostgreSQL","Prisma","Swagger"],
    status: "Producción",
    image: "/projects/Fintech.png",
    github: "https://github.com/FINTCH-A",
    demo: "https://drive.google.com/file/d/1SL2GFuOkl-wRkc67cXMd_0FFmfzjBRB-/view?usp=sharing",
    video: "https://drive.google.com/file/d/1SL2GFuOkl-wRkc67cXMd_0FFmfzjBRB-/view?usp=sharing",
  },
  {
    title: "Aplicación Móvil - Sistema Fintech",
    description:
      "Aplicación móvil fintech multiplataforma orientada a la solicitud y gestión digital de préstamos, permitiendo a los clientes acceder a servicios crediticios sin necesidad de acudir a una agencia. Desarrollada con Dart y Flutter, con compatibilidad para Android e iOS, enfocada en brindar una experiencia ágil, accesible y eficiente.",
    tech: ["Flutter","Dart","Android","iOS"],
    status: "Completado",
    image: "/projects/AppFinanzas.webp",
    github: "https://github.com/FINTCH-A/APLICACION",
    demo: "https://drive.google.com/file/d/14enpZCHo4BD0cjqCUxy20tO5UXcsiCyl/view?usp=sharing",
    video: "https://drive.google.com/file/d/14enpZCHo4BD0cjqCUxy20tO5UXcsiCyl/view?usp=sharing",
  },
  {
    title: "Aplicacion Móvil - Drunk Mode",
    description:
      "Solución orientada a la seguridad personal en situaciones de consumo de alcohol, diseñada para facilitar la ubicación y asistencia del usuario mediante tecnología GPS, reduciendo la necesidad de realizar llamadas o tomar decisiones durante un estado de embriaguez. Desarrollada con Flutter, NestJS y PostgreSQL, con APIs documentadas mediante Swagger y bajo principios de Clean Architecture.",
    tech: ["Flutter","Dart","NestJS","TypeScript","PostgreSQL","Swagger","Clean Architecture"],
    status: "Producción",
    image: "/projects/drunk.webp", 
    github: "https://github.com/ModeDrunk",
    demo: "https://drive.google.com/file/d/1Y_pYBJtf519UjG-hs67O2gSeZD-4AxsT/view?usp=drive_link",
    video: "https://drive.google.com/file/d/1Y_pYBJtf519UjG-hs67O2gSeZD-4AxsT/view?usp=drive_link",
  },
  {
    title: "Desarrollo de Paginas Web",
    description:
      "Desarrollo de sitios web empresariales modernos y responsivos utilizando Next.js, incorporando formularios de contacto con envío de información al correo electrónico, integración de documentos PDF y contenido multimedia como videos. Enfocado en ofrecer una experiencia de usuario moderna, funcional y adaptada a las necesidades de cada empresa.",
    tech: ["Next.js","React","TypeScript","Tailwind CSS","EmailJS"],
    status: "Producción",
    image: "/projects/PaginaWeb.png",
    github: "https://github.com/PaginasWebsWs",
    demo: "https://drive.google.com/file/d/1gP0GSrLCh_LXIv2ondZBXuJd_IsGLT9R/view?usp=sharing",
    video: "https://drive.google.com/file/d/1gP0GSrLCh_LXIv2ondZBXuJd_IsGLT9R/view?usp=sharing",
  },
]

export type Certification = {
  title: string
  institution: string
  date: string
  description: string
  url: string
}

export const certifications: Certification[] = [
  {
    title: "Curso de Python para Ciencia de Datos",
    institution: "Platzi",
    date: "Noviembre 2024",
    description: "13 horas de teoría y práctica en Python para ciencia de datos.",
    url: "https://platzi.com/@70399468/",
  },
  {
    title: "Curso Profesional de Git y GitHub",
    institution: "Platzi",
    date: "Diciembre 2024",
    description: "22 horas de teoría y práctica en control de versiones con Git y GitHub.",
    url: "https://platzi.com/@70399468/",
  },
  {
    title: "Tercer Puesto - Feria de Proyectos de Ingeniería",
    institution: "Universidad Continental",
    date: "Octubre 2024",
    description: "Aplicación móvil con tecnología emergente para el control y uso eficiente del agua potable.",
    url: "#",
  },
]

export const education = {
  university: "Universidad Continental",
  degree: "Ingeniería de Sistemas e Informática",
  level: "Bachiller y Título Profesional",
  period: "2017 — 2026",
  description:
    "Bachiller en Ingeniería de Sistemas e Informática (2024). Título profesional obtenido en marzo de 2026. Formación integral en ingeniería de software, estructuras de datos, bases de datos, redes y gestión de proyectos tecnológicos.",
}

export type Stat = { label: string; value: number; suffix: string }
export const stats: Stat[] = [
  { label: "Años de experiencia", value: 3, suffix: "+" },
  { label: "Proyectos realizados", value: 8, suffix: "+" },
  { label: "Tecnologías dominadas", value: 15, suffix: "+" },
  { label: "Certificaciones", value: 3, suffix: "" },
  { label: "Años de estudios", value: 9, suffix: "" },
  { label: "Proyectos en producción", value: 3, suffix: "" },
]