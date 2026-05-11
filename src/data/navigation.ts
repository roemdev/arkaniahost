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
  { icon: "fa-solid fa-infinity",               label: "Almacenamiento Ilimitado" },
  { icon: "fa-solid fa-truck-fast",             label: "Migración Gratuita"       },
  { icon: "fa-solid fa-wand-magic-sparkles",    label: "Instalación de Mods"      },
  { icon: "fa-solid fa-globe",                  label: "IP Personalizada"         },
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
    title: "Panel Visual",
    description: "Una interfaz pulida y directa. Instala modpacks o cambia configuraciones con clics, sin tocar comandos.",
  },
  {
    icon: "fa-solid fa-microchip",
    title: "Rendimiento Dedicado",
    description: "No sobrevendemos. Tu espacio está respaldado por hardware de alto nivel para procesar tu mundo sin fluctuaciones.",
  },
  {
    icon: "fa-solid fa-headset",
    title: "Soporte Directo",
    description: "Conectamos a humanos con humanos. Nuestro equipo técnico asiste tus configuraciones vía Discord o WhatsApp con precisión.",
  },
] as const;
