import type { Profile, Stat } from "./types";

/**
 * Identity, trajectory and skills come from Luis's CV. The project-level
 * numbers (commits, tests) are measured from the repositories in ~/Developer/t1
 * — see the comment on headlineStats before changing any of them.
 */
export const profile: Profile = {
  name: "Luis Donaldo Solano Gómez",
  role: "Ingeniero de Software",
  headline:
    "Plataformas web confiables de punta a punta: interfaz, backend, nube y las decisiones de arquitectura que las sostienen.",
  location: "Veracruz, México",

  email: "donaldo293y@gmail.com",

  activeYears: "2021 — 2026",

  bio: "Construyo plataformas web confiables y centradas en quien las usa. Voy más allá del requerimiento mínimo: priorizo buenas prácticas, arquitectura limpia y la experiencia final de cada stakeholder.",

  aboutParagraphs: [
    "Soy ingeniero de software, no solo de frontend. Trabajo de punta a punta: interfaz en React y Next.js con TypeScript estricto, lógica de negocio y APIs en Node.js, datos en MongoDB, MySQL o DynamoDB, e infraestructura en AWS —Amplify, Lambda detrás de API Gateway, Cognito para autenticación, ECS para desplegar—.",
    "Lo que más me define es el trabajo cerca del borde y la disciplina de arquitectura: una arquitectura por capas con fronteras explícitas —UI, hooks, estado, acciones de servidor y servicios—, un cliente WebSocket con reconexión exponencial y heartbeat, un service worker de Web Push que detecta la rotación de la llave VAPID, y pipelines de CI donde los tests son compuerta dura antes de desplegar.",
    "Uso Claude Code como socio de diseño, orquestando subagentes alrededor de esa arquitectura para refactorizar, documentar y entregar más rápido sin bajar la calidad; y el servidor MCP de Figma para llevar el contexto de diseño directo al código sin perder fidelidad. Aprendo tecnologías nuevas por gusto y me interesan las bases de código que escalan.",
  ],

  socials: [
    {
      label: "Correo",
      href: "mailto:donaldo293y@gmail.com",
      handle: "donaldo293y@gmail.com",
    },
    // TODO: pega aquí la URL de tu perfil. El CV muestra el nombre
    // ("Donaldo Gómez") pero no el enlace, y no quiero adivinar el slug.
    // { label: "LinkedIn", href: "https://linkedin.com/in/…", handle: "Donaldo Gómez" },
    // { label: "GitHub", href: "https://github.com/…", handle: "…" },
  ],

  /**
   * Career, as stated in the CV. The two roles overlap: the Bullground
   * engagement was remote and ran until Mar 2024, after T1 began.
   */
  roles: [
    {
      company: "T1",
      detail: "T1 Comercios · T1 Envíos",
      title: "Ingeniero de Software",
      period: "Jul 2023 — Presente",
      mode: "Presencial",
      summary:
        "Construyo de punta a punta la nueva plataforma de administración para los productos de envíos y comercio de T1, con foco en confiabilidad del sistema, arquitectura limpia y la experiencia de cada stakeholder.",
      points: [
        "Diseño y desarrollo de features full-stack sobre una plataforma Next.js 15 / React 19 con separación estricta entre UI, hooks, estado, acciones de servidor y servicios",
        "Lógica de negocio en flujos críticos: creación de guías, procesamiento de órdenes de marketplaces y envío masivo, cruzando frontend, acciones de servidor e integraciones de backend",
        "Enfoque architecture-first con Claude Code y subagentes para refactorizar, documentar y entregar más rápido sin sacrificar calidad",
      ],
      stack: ["Next.js", "React", "TypeScript", "Redux Toolkit", "MUI", "SCSS", "Node.js"],
      current: true,
    },
    {
      company: "Bullground",
      title: "Ingeniero de Software",
      period: "Dic 2021 — Mar 2024",
      mode: "Remoto",
      summary:
        "Ingeniería full-stack sobre una plataforma web: diseño y entrega de features nuevas, mantenimiento de las existentes, corrección de errores y mejora del producto frente a requerimientos funcionales y no funcionales.",
      points: [
        "Features de punta a punta abarcando UI, API y capa de datos sobre Next.js, Node.js y MongoDB",
        "Diseño y despliegue de infraestructura en AWS: Amplify para hosting, Lambda detrás de API Gateway para lógica serverless y Cognito para autenticación",
        "Colaboración con equipos multidisciplinarios para traducir requerimientos de producto en releases confiables y bien probadas",
      ],
      stack: ["Next.js", "Node.js", "TypeScript", "MongoDB", "SCSS", "AWS"],
      current: false,
    },
  ],

  education: {
    degree: "Ingeniería en Sistemas Computacionales",
    school: "Universidad Cristóbal Colón",
    period: "2017 — 2021",
  },

  languages: [
    { name: "Español", level: "Nativo" },
    { name: "Inglés", level: "Profesional" },
  ],

  skillGroups: [
    {
      title: "Frontend",
      items: [
        "TypeScript",
        "JavaScript",
        "React 19",
        "Next.js 13 → 16",
        "App Router y Server Components",
        "Redux Toolkit",
        "MUI",
        "Tailwind CSS",
        "SCSS · CSS3",
        "React Hook Form · Zod",
      ],
    },
    {
      title: "Backend y datos",
      items: [
        "Node.js",
        "Server Actions como BFF",
        "APIs REST y route handlers",
        "MongoDB",
        "MySQL",
        "DynamoDB",
        "Firebase",
        "Python",
      ],
    },
    {
      title: "Nube e infraestructura",
      items: [
        "AWS Amplify",
        "AWS Lambda",
        "API Gateway",
        "Cognito",
        "Amazon ECS y ECR",
        "Docker",
        "GitHub Actions",
        "CentOS 7",
      ],
    },
    {
      title: "Arquitectura y calidad",
      items: [
        "Arquitectura por capas",
        "Clean code",
        "Result<T, E> como ADT",
        "Vitest · Testing Library",
        "Playwright",
        "Cobertura v8",
        "ESLint · Prettier · Husky",
        "Documentación co-locada",
      ],
    },
    {
      title: "Tiempo real, PWA y auth",
      items: [
        "Cliente WebSocket propio",
        "Backoff exponencial y heartbeat",
        "Service workers en TypeScript",
        "Web Push con VAPID",
        "Modo offline e instalación PWA",
        "NextAuth v5",
        "Keycloak y OIDC",
        "Multi-tenant y RBAC",
      ],
    },
    {
      title: "IA y flujo de trabajo",
      items: [
        "Claude Code",
        "Orquestación de subagentes",
        "Servidor MCP de Figma",
        "Desarrollo asistido por IA",
        "Diseño → código sin perder fidelidad",
        "Revisión de código",
      ],
    },
  ],
};

/**
 * Headline numbers. Each one is measured, not estimated — recount before
 * changing any of them:
 *
 * - experiencia  first professional role began Dec 2021 (CV); as of Aug 2026
 *                that is 4 years and 8 months, stated conservatively as "4+".
 * - proyectos    the 6 entries in projects.ts, all shipped to production.
 * - commits      3,802 = commits matching his author identities across the
 *                eleven git repos under ~/Developer/t1 that contain his work
 *                (1861+1315+255+120+95+64+42+42+5+2+1). T1 only — the label
 *                says so, because earlier work is not in these repositories.
 *                The showcased set is curated: six repos are shown, so roughly
 *                1,970 of these commits sit in T1 repos that no longer have a
 *                card (t1-envios-nextjs 1861, internal_admin 64, backoffice 42,
 *                t1paginas-admin 2, Phoenix 1). The label says "en T1" for
 *                exactly that reason — it is career output, not a sum of the
 *                cards below. If you would rather it match the cards, the sum
 *                of the six ownership.commits values is 1,832.
 * - pruebas      1,464 = `it(`/`test(` calls across the 263 *.test.ts(x) files
 *                in shipping-admin-nextjs, where 118 of the 124 commits
 *                touching tests are his.
 */
export const headlineStats: Stat[] = [
  { value: "4+ años", label: "Experiencia profesional" },
  { value: "6", label: "Proyectos en producción" },
  { value: "3,802", label: "Commits propios en T1" },
  { value: "1,464", label: "Casos de prueba escritos" },
];

export const heroCopy = {
  eyebrow: "Disponible para nuevos retos",
  title: "Plataformas que no se pueden caer.",
  subtitle:
    "Ingeniero de software con más de cuatro años construyendo plataformas web de punta a punta: de la interfaz al backend, la nube y las decisiones de arquitectura que las sostienen.",
} as const;

export const contactCopy = {
  title: "¿Construimos algo que tenga que aguantar?",
  subtitle:
    "Me interesan los equipos donde la ingeniería se toma en serio: dominios con consecuencias reales, decisiones de arquitectura que se sostengan a tres años y espacio para hacer bien el trabajo.",
} as const;
