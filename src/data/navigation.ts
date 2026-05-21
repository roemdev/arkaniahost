export const NAV_LINKS = [
  { label: "Solución",  href: "#solucion"       },
  { label: "Proceso",   href: "#funcionamiento" },
  { label: "Precios",   href: "#planes"         },
  { label: "FAQ",       href: "#faq"            },
] as const;

// FA icon classes para las redes sociales
export const SOCIAL_LINKS = [
  { label: "Discord",   icon: "fa-brands fa-discord",   href: "https://discord.arkaniahost.xyz" },
  { label: "Twitter",   icon: "fa-brands fa-twitter",   href: "https://twitter.com/" },
  { label: "Instagram", icon: "fa-brands fa-instagram", href: "https://instagram.com/" },
] as const;

// Texto rotativo del hero
export const ROTATING_WORDS = [
  "sueños.",
  "amigos.",
  "seguidores.",
  "experimentos.",
] as const;

// Features del marquee
export const MARQUEE_FEATURES = [
  { icon: "fa-solid fa-infinity", label: "Almacenamiento Ilimitado" },
  { icon: "fa-solid fa-truck-fast", label: "Migración Gratuita" },
  { icon: "fa-solid fa-wand-magic-sparkles", label: "Instalación de Mods" },
  { icon: "fa-solid fa-bolt", label: "Activación Inmediata" },
] as const;

// Pasos del flujo de trabajo
export const WORKFLOW_STEPS = [
  { number: 1, title: "Elige tu plan",    description: "Selecciona la RAM que necesitas según el tamaño de tu grupo o los mods que quieras correr." },
  { number: 2, title: "Paga y accede",    description: "Completa el pago y recibe acceso inmediato al panel. Sin esperas ni aprobaciones manuales." },
  { number: 3, title: "Configura y juega", description: "Instala tu versión o modpack desde el panel con un clic. Comparte la IP y a jugar." },
] as const;

// Cards de la sección "Solución"
export const SOLUTION_CARDS = [
  {
    icon: "fa-solid fa-layer-group",
    title: "Panel Intuitivo",
    description: "Interfaz directa. Instala o cambia configuraciones con pocos clics.",
  },
  {
    icon: "fa-solid fa-microchip",
    title: "Hardware Dedicado",
    description: "Cero sobreventa. Procesamos tu mundo sin lag ni caídas.",
  },
  {
    icon: "fa-solid fa-headset",
    title: "Soporte Humano",
    description: "Asistencia directa sin bots ni respuestas automatizadas.",
  },
] as const;
