import type { Project } from "./types";

/**
 * Projects are ordered best-first; the home page reads the first four with
 * `featured: true` for the showcase bands and the rest for the grid.
 *
 * `ownership.commits` is the number of commits authored by Luis in that repo,
 * measured with `git log --author`, next to the repository total. Nothing here
 * is estimated — a portfolio that inflates attribution is worse than a short one.
 */
export const projects: Project[] = [
  {
    slug: "t1-envios-shipping-admin",
    dir: "shipping-admin-nextjs",
    name: "T1 Envíos — Portal de Envíos",
    tagline: "Todo el ciclo de un envío, de la cotización a la entrega, en un solo portal.",
    category: "Plataforma",
    year: "2025–2026",
    accent: "#0A84FF",
    featured: true,
    ownership: {
      tier: "lead",
      commits: 1315,
      repoCommits: 2094,
      label: "Autor principal",
      share: "63%",
    },
    role: "Arquitectura frontend y desarrollo principal: autor de la mayoría de los commits del repositorio.",
    summary:
      "Portal SaaS multi-tenant con el que los comercios de T1 operan su logística: cotizan, generan guías (individuales o masivas), programan recolecciones, sincronizan pedidos de sus marketplaces, gestionan incidencias y sobrepeso, recargan saldo y miden todo desde dashboards de reportes. Son 67 rutas sobre una arquitectura en capas estricta —UI, hooks, estado, Server Actions como BFF y una capa de servicios que es la única que habla con las APIs externas— con 1,464 casos de prueba que la sostienen.",
    problem:
      "Un comercio que vende en varios marketplaces termina con la logística repartida entre portales de paqueterías, hojas de cálculo y correos: cotiza a mano, pierde el rastro de las incidencias y no sabe cuánto le cuesta realmente entregar.",
    solution:
      "Un solo portal que conecta los marketplaces, cotiza contra todas las paqueterías contratadas, emite la guía y sigue el envío hasta la entrega, con reportes que explican el periodo y una vista en tiempo real de lo que requiere acción hoy.",
    architectureNotes:
      "Arquitectura en capas con fronteras explícitas y verificables: los componentes de UI no contienen lógica de negocio, los hooks orquestan el cliente, los Server Actions (src/actions) actúan como BFF y solo la capa de servicios (56 archivos) habla con las APIs de paqueterías, marketplaces y NEST. El estado global se reparte entre Redux Toolkit (22 reducers, 18 thunks) y contexto de React. La autenticación vive en un middleware que resuelve sesión Keycloak, tienda activa y permisos por ruta antes de renderizar, con deduplicación y caché de la verificación de revocación del token. Los dashboards de reportes ponen los filtros en la URL en vez de useState, de modo que el servidor vuelve a pedir los datos y el reporte se comparte pegando el enlace; la vista en tiempo real es la excepción y se alimenta por WebSocket. El cliente WebSocket se compone —no se hereda— para que la vista de reportes reutilice reconexión y estados mientras resuelve lo suyo: recalcular la URL en cada reintento para no reconectar con un token vencido.",
    highlights: [
      "Middleware multi-tenant con Keycloak/NextAuth: permisos por ruta y refresh de token con caché",
      "Arquitectura en capas: Server Actions como BFF sobre 56 servicios de API aislados",
      "Cliente WebSocket propio: backoff exponencial, heartbeat y URL recalculada en cada reintento",
      "Reportes server-rendered con filtros en la URL: el enlace reproduce la vista exacta",
      "Drilldown geográfico con mapa coroplético de México y polígonos por estado cacheados",
      "Motor visual de reglas de ruteo por paquetería con @xyflow/react y layout automático dagre",
    ],
    metrics: [
      { label: "Rutas de aplicación", value: "67" },
      { label: "Componentes React", value: "501" },
      { label: "Casos de prueba", value: "1,464" },
      { label: "Líneas de TypeScript", value: "207 mil" },
    ],
    image: {
      src: "/proyectos/t1-envios-shipping-admin.png",
      alt: "Panel de inicio de T1 Envíos: cotizador de envío por código postal y dimensiones, indicadores de envíos en tránsito, entregados y con incidencia, gráfica de los últimos siete días y saldo de la cuenta.",
      width: 2990,
      height: 1905,
      blurDataURL:
        "data:image/webp;base64,UklGRjgAAABXRUJQVlA4ICwAAABwAQCdASoMAAgAAsBIJZ1/2AGIAAD+95wHcb2XxRryRU4Q9qogCDNdstkAAA==",
    },
    stack: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Redux Toolkit",
      "NextAuth v5",
      "Keycloak",
      "MUI",
      "Tailwind CSS",
      "WebSockets",
      "Recharts",
      "Vitest",
      "PostHog",
    ],
  },
  {
    slug: "account-admin",
    dir: "account-admin-nextjs",
    name: "T1 Account Admin",
    tagline: "El centro de control de cada vendedor en la plataforma T1.",
    category: "Plataforma",
    year: "2025–2026",
    accent: "#BF5AF2",
    featured: true,
    ownership: {
      tier: "core",
      commits: 120,
      repoCommits: 1266,
      label: "Desarrollo central",
      share: "9%",
    },
    role: "Desarrollo frontend de los módulos de facturación, saldos y movimientos, métodos de pago, antifraude y planes",
    summary:
      "Panel administrativo multi-tenant donde cada vendedor de T1 gestiona su cuenta: facturación, saldos y movimientos, métodos de pago, planes de suscripción, roles y permisos, llaves de API y webhooks. Corre sobre Next.js 14 con App Router, autentica contra Keycloak vía NextAuth v5 y resuelve tienda, sesión y permisos en el middleware antes de renderizar. Es la superficie transversal que conecta al vendedor con el resto de los microservicios de la plataforma.",
    problem:
      "Un vendedor en T1 opera sobre múltiples servicios (envíos, pagos, tiendas, órdenes) sin un lugar único donde administrar su cuenta, su facturación y quién de su equipo puede tocar qué. La información de billing y accesos vivía dispersa entre backends internos.",
    solution:
      "Un panel único que centraliza cuenta, cobranza y accesos: el middleware resuelve tenant y permisos por ruta, un conjunto de rutas proxy firma y reenvía a los microservicios internos, y un store de Redux Toolkit por dominio mantiene sincronizado el estado de facturación, planes y roles.",
    architectureNotes:
      "Arquitectura middleware-first: toda la resolución de sesión, tenant (store) y RBAC ocurre en src/middleware.ts, que mapea módulos de servicio a rutas permitidas mediante checkPathPermission antes de que se renderice cualquier página. La capa de datos combina Server Actions ('use server' en 28 de los 30 servicios) con 15 rutas proxy [...route] que reinyectan el access_token del lado servidor. Destaca un patrón de puertos con contratos congelados y documentados (src/ports/) para deep links entre aplicaciones, validados con parsers puros y sus propias pruebas; Vitest cubre la capa de lógica agnóstica de framework con umbral de cobertura como guardia de regresión.",
    highlights: [
      "SSO con Keycloak y NextAuth v5 con refresh, revocación de tokens y caché anti-duplicado",
      "Middleware resuelve el tenant, valida acceso y aplica RBAC por ruta antes de renderizar",
      "15 rutas proxy reenvían a microservicios internos sin exponer el access token al browser",
      "Store de Redux Toolkit con 17 reducers y 17 thunks: facturación, planes, saldos y roles",
      "Facturación completa: historial, detalle, saldos y movimientos con filtros y exportación",
      "Tours guiados con react-joyride, pasos controlados y persistencia por sección",
    ],
    metrics: [
      { label: "Líneas TS/TSX", value: "61,906" },
      { label: "Componentes React", value: "181" },
      { label: "Rutas del App Router", value: "26" },
    ],
    image: {
      src: "/proyectos/account-admin.png",
      alt: "Pantalla de información personal de T1 Cuenta: personalización del avatar, nombre y apellidos, e información de contacto con correo de Google y número celular verificado, junto a la navegación de finanzas y administración.",
      width: 2000,
      height: 1273,
      blurDataURL:
        "data:image/webp;base64,UklGRjYAAABXRUJQVlA4ICoAAADQAQCdASoMAAgAAsBIJZwAAu07oHmuuAD++q4ffGuTea4pke9i4pgFAAA=",
    },
    stack: [
      "Next.js 14",
      "React 18",
      "TypeScript",
      "Redux Toolkit",
      "MUI v6",
      "NextAuth v5",
      "Keycloak",
      "Tailwind CSS",
      "SCSS Modules",
      "Vitest",
      "PostHog",
      "Recharts",
    ],
  },
  {
    slug: "t1-store-admin",
    dir: "store-admin-nextjs",
    name: "T1 Store Admin",
    tagline: "Administra y diseña una tienda completa desde un solo panel.",
    category: "Plataforma",
    year: "2025–2026",
    accent: "#FF375F",
    featured: false,
    ownership: {
      tier: "contributor",
      commits: 255,
      repoCommits: 10963,
      label: "Colaborador",
      share: "2%",
    },
    role: "Desarrollo frontend del módulo de órdenes y logística multicanal: generación de guías, flujos por marketplace (Shopify, WooCommerce, TikTok Shop, AliExpress, Tienda Nube, Walmart), Home y políticas de privacidad.",
    summary:
      "Panel de administración multi-tenant y constructor visual de páginas para T1, un SaaS tipo Shopify orientado a vendedores en Latinoamérica. Cubre catálogo, inventario, precios, órdenes multicanal, descuentos, clientes, reportes, punto de venta, métodos de pago y marketing en una sola aplicación Next.js. Incluye un editor visual propio (Builder V2) con generación de tienda asistida por IA en streaming. Es el producto sucesor de T1 Páginas Admin y comparte formato de datos con el storefront público.",
    problem:
      "Un vendedor que opera en varios marketplaces y en su propia tienda tiene que saltar entre paneles distintos para publicar productos, atender órdenes, generar guías de envío y editar su sitio.",
    solution:
      "Un solo panel App Router que actúa como proxy autenticado sobre los microservicios de T1 y normaliza 20 canales de venta, más un editor visual que produce el mismo formato de secciones que consume el storefront.",
    architectureNotes:
      "Aplicación puramente frontend: no hay ORM ni base de datos propia; las 52 rutas /api son proxies autenticados hacia microservicios (productos, órdenes, identidad, plantillas, envíos). El estado es híbrido por diseño: Redux Toolkit con 56 reducers y 55 thunks para sesión, tienda y permisos, y SWR/RTK Query para datos de vista con SSR + fallbackData. El Builder V2 se sostiene en cuatro contextos (Editor, Theme, EditorUI, Viewport), un registro de transformers que preserva `_v1Settings`/`_v1Blocks` para round-trips sin pérdida, feature flags por modo standard/agency y temas declarados en JSON (themes/minimal, themes/bold). Conviven builder V2 y builder-legacy en producción. Una regla ESLint propia (no-mui-button) obliga a usar el Button del design system @t1-org/t1components. 23 documentos en docs/ cubren arquitectura, builder y migraciones.",
    highlights: [
      "Builder visual V2 con 25 módulos y 26 transformers bidireccionales V1↔V2 sin pérdida de datos",
      "Agente de IA en el editor: 42 herramientas que mutan el estado del canvas vía toolExecutor",
      "Generación de tienda por IA en streaming WebSocket con sincronía automática de tema al storefront",
      "Auth Keycloak + NextAuth v5 con refresh, caché de revocación y deduplicación de llamadas en vuelo",
      "Middleware multi-tenant de 476 líneas: resuelve ?store, valida permisos por ruta e inyecta x-store-id",
      "Gateway de analítica tipado con 125 eventos PostHog que prohíbe capture() suelto en componentes",
    ],
    metrics: [
      { label: "Rutas App Router", value: "121" },
      { label: "Casos de prueba", value: "2,898" },
      { label: "Líneas TS/TSX", value: "595,932" },
    ],
    image: {
      src: "/proyectos/t1-store-admin.png",
      alt: "Panel de inicio de T1 Tienda: resumen de rendimiento con ventas totales, pedidos y ticket promedio, y desglose de ventas por canal entre tienda en línea y Mercado Libre.",
      width: 2000,
      height: 1271,
      blurDataURL:
        "data:image/webp;base64,UklGRjQAAABXRUJQVlA4ICgAAADQAQCdASoMAAgAAsBIJaQAAugxyR50AAD++q7xpXRmO30urpQ9wAAA",
    },
    stack: [
      "Next.js 14 (App Router)",
      "React 18",
      "TypeScript",
      "Redux Toolkit",
      "RTK Query",
      "MUI 5",
      "Tailwind CSS",
      "NextAuth v5 + Keycloak",
      "TipTap",
      "dnd-kit",
      "Vitest",
      "PostHog",
    ],
  },
  {
    slug: "t1paginas-onboarding",
    dir: "t1paginas-webpageform-nextjs",
    name: "T1 Páginas Onboarding",
    tagline: "De una idea a una tienda publicada, generada por IA en minutos.",
    category: "Producto",
    year: "2024–2025",
    accent: "#FF9F0A",
    featured: true,
    ownership: {
      tier: "core",
      commits: 95,
      repoCommits: 652,
      label: "Desarrollo central",
      share: "15%",
    },
    role: "Desarrollo frontend del flujo de creación express, formularios multipaso y migración de servicios a Server Actions",
    summary:
      "Embudo de alta para T1 Páginas: el comerciante describe su negocio y la aplicación genera con IA la descripción, el logotipo, el estilo visual y las categorías de producto de su tienda. La construcción final se transmite por WebSocket sección por sección, con fases y progreso en vivo, hasta redirigir al editor con la tienda ya creada. Toda la capa de datos vive en Server Actions de Next.js.",
    problem:
      "Crear una tienda en línea exige decisiones de marca, catálogo y diseño que frenan al comerciante en el primer contacto, justo donde el abandono es más caro. Un formulario largo y silencioso no sostiene esa espera.",
    solution:
      "Un onboarding de cinco pasos que resuelve por IA lo que el usuario no sabe definir, y una pantalla de construcción que abre un WebSocket y narra la generación en tiempo real: fases, secciones recibidas y redirección automática al editor.",
    architectureNotes:
      "El hook useAIWebsocket concentra toda la máquina de estados del streaming (conexión, fases, secciones recibidas, timeouts de conexión y de finalización, URL de redirección) en un único reducer local, lo que mantiene la pantalla de construcción declarativa. Los servicios son Server Actions marcadas con 'use server' que llaman lambdas de IA y revalidan rutas con revalidatePath, evitando exponer endpoints al cliente. El middleware replica el patrón de SSO con Keycloak —refresh de token, reintentos y limpieza de cookies de sesión— y next-intl resuelve mensajes en el servidor. Despliegue en Elastic Beanstalk con ajustes de nginx para cargas de archivos y buffers de proxy.",
    highlights: [
      "Streaming por WebSocket de la generación IA: 13 secciones con fases, progreso y reconexión",
      "Capa de datos íntegra en Server Actions; la única API route es el handler de NextAuth",
      "Onboarding de 5 pasos con react-hook-form y persistencia en cookies para reanudar",
      "Generación IA de descripción, logo, estilo y categorías vía lambdas dedicadas",
      "Warm-up de lambdas cada 4 min en el paso crítico para evitar cold starts",
      "Tema MUI propio con Manrope y overrides de botones, radios, inputs y selects",
    ],
    metrics: [
      { label: "Líneas TS/TSX", value: "10,953" },
      { label: "Componentes React", value: "31" },
      { label: "Rutas del App Router", value: "8" },
    ],
    stack: [
      "Next.js 14",
      "React 18",
      "TypeScript",
      "Server Actions",
      "Redux Toolkit",
      "MUI v6",
      "NextAuth v5",
      "Keycloak",
      "next-intl",
      "React Hook Form",
      "WebSockets",
      "AWS Elastic Beanstalk",
    ],
  },
  {
    slug: "t1-landing",
    dir: "t1landing",
    name: "T1 Landing",
    tagline: "Un solo sitio para cuatro mercados, tres idiomas y todo el ecosistema T1.",
    category: "Marketing",
    year: "2026",
    accent: "#FF453A",
    featured: false,
    ownership: {
      tier: "contributor",
      commits: 42,
      repoCommits: 883,
      label: "Colaborador",
      share: "5%",
    },
    role: "Desarrollo frontend en la vertical de Envíos: rastreo renderizado en servidor, flujos de alta con SSO y gestión de releases hotfix a producción",
    summary:
      "Sitio público de T1 (t1.com): la puerta de entrada a Tienda, Envíos, Pagos y Partners para México, Estados Unidos, Colombia y Brasil. Además de las landings comerciales opera superficies de producto reales —rastreo de guías, precios de planes, alta enterprise y un chat con asistente— sobre Next.js App Router. Todo el enrutamiento por país, la resolución de idioma y la detección de sesión se resuelven en un middleware de borde antes de renderizar.",
    problem:
      "T1 necesitaba una sola propiedad web para vender cuatro productos en cuatro países con idiomas y URLs distintas, sin fragmentar el sitio en cuatro proyectos ni perder SEO por rutas internas expuestas.",
    solution:
      "Un App Router con segmento [locale], middleware que geolocaliza, reescribe rutas nativas por mercado (/mx/envios, /us/shipping, /br/pagamentos) hacia páginas unificadas y propaga idioma por header, más un sistema propio de i18n con carga diferida y fallbacks en cadena.",
    architectureNotes:
      "Las 25 páginas son Server Components sin excepción; la interactividad se aísla en 174 componentes cliente, de modo que dependencias pesadas como dayjs o el cliente del blog nunca llegan al bundle. El middleware acumula cookies y headers en un solo objeto y los aplica al final, evitando respuestas parciales entre rewrites, redirects y el retorno de SSO. La capa de datos vive en módulos server-only (lib/tracking.ts, lib/blog/t1-blog-api.ts) que normalizan respuestas externas a interfaces de vista, y los secretos —API key del blog, config de Keycloak— solo se leen ahí o en los route handlers. Analítica centralizada en un único util sobre dataLayer, con GTM como distribuidor a las cinco plataformas de medición.",
    highlights: [
      "Middleware de 615 líneas: geo-routing, rewrites localizados y detección de sesión Keycloak",
      "URLs nativas por mercado (/mx/envios, /us/shipping, /br/pagamentos) sin duplicar páginas",
      "i18n propio con carga diferida por locale/idioma y triple fallback en Server Components",
      "Rastreo renderizado en servidor: 23 paqueterías normalizadas a un solo contrato de datos",
      "75 helpers tipados sobre el dataLayer de GTM: GA4, Meta, Google Ads, LinkedIn y TikTok",
      "Web Vitals en Edge Runtime con validación por whitelist para evitar un open proxy",
    ],
    metrics: [
      { label: "Componentes React", value: "223" },
      { label: "Páginas · API routes", value: "25 · 9" },
      { label: "Países · idiomas", value: "4 · 3" },
      { label: "Líneas de TS/TSX", value: "48,153" },
    ],
    image: {
      src: "/proyectos/t1-landing.webp",
      alt: "Portada de t1.com: el titular «Crea tu tienda en segundos», un campo para describir el negocio con categorías sugeridas, las métricas del ecosistema y los logotipos de las marcas que operan con T1.",
      width: 2000,
      height: 1273,
      blurDataURL:
        "data:image/webp;base64,UklGRkQAAABXRUJQVlA4IDgAAADwAQCdASoMAAgAAsBIJYwCdAEQEWooiAAA/vmIIwGKppLEcQoleKHuzfFGLo/ao6NtymNLtcewAA==",
    },
    stack: [
      "Next.js 14 (App Router)",
      "React 18",
      "TypeScript",
      "Tailwind CSS",
      "SCSS Modules",
      "MUI 7",
      "GSAP",
      "Swiper",
      "PostHog",
      "Google Tag Manager",
      "Keycloak / OIDC",
      "Playwright",
    ],
  },
  {
    slug: "t1components",
    dir: "t1components",
    name: "T1 Components",
    tagline: "Un solo paquete para que todos los productos T1 se vean y funcionen igual.",
    category: "Design System",
    year: "2026",
    accent: "#64D2FF",
    featured: false,
    ownership: {
      tier: "contributor",
      commits: 5,
      repoCommits: 1116,
      label: "Colaborador",
      share: "0%",
    },
    role: "Contribución como desarrollador dentro de un equipo: features en Navbar y BalanceBanner (callbacks de navegación, balance en móvil, configuración de rutas). La autoría principal del repositorio corresponde a otro integrante del equipo T1; el proyecto se documenta aquí como librería compartida de la que también se es consumidor e integrador.",
    summary:
      "Librería de componentes React publicada como paquete npm privado (@t1-org/t1components) que estandariza la interfaz de los productos T1. Organiza 51 componentes bajo diseño atómico —átomos, moléculas, organismos y vistas— sobre Material UI, con un tema central que redefine 32 componentes de MUI. Se distribuye con build dual ESM/CJS, tipos generados automáticamente y un catálogo de 728 iconos SVG documentado en Storybook.",
    problem:
      "Cada producto de T1 reimplementaba sus propios inputs, tablas, menús y navegación, con criterios visuales distintos y sin una fuente única de verdad para el tema. Mantener consistencia entre apps de React Router y de Next.js era manual y costoso.",
    solution:
      "Una librería universal en npm que expone componentes tipados, un tema MUI centralizado y un sistema de tokens SCSS. La navegación se inyecta por props (currentPath / onPathChange), de modo que el mismo Sidebar y LayoutMenu funcionan igual en React Router y en el App Router de Next.js.",
    architectureNotes:
      "Paquete de librería con Vite en modo lib: dos formatos de salida (index.js / index.cjs), React, MUI, Emotion y react-router-dom marcados como external o peer dependencies, vite-plugin-dts para las declaraciones y vite-plugin-lib-inject-css para inyectar el CSS junto al componente. El tema (src/styles/theme.ts, 960 líneas) concentra 32 styleOverrides de MUI, augmentation de módulos para colores propios y un reset explícito contra los anillos de focus de Tailwind, para poder convivir con apps que ya usan Tailwind. Los organismos aplican separación por responsabilidad: Sidebar delega en useSidebarState, useSidebarNavigation, useSidebarMobile y useSidebarExpansion, y renderiza subcomponentes (CreateButton, BalanceSection, SidebarMenuRenderer). El estado compartido del menú va por Context (MenuProvider / useMenu), sin Redux. Table implementa genéricos (<T extends Record<string, any>>) con orden, selección, expansión y paginación server-side opcional; AdaptiveTable compone Table más una rejilla móvil. El estilado combina sx de MUI con 26 CSS Modules SCSS sobre design-tokens.scss (paleta neutra, escala de espaciado 8pt). La cobertura de pruebas es el punto débil: 5 archivos de test y 29 casos frente a 60 archivos de stories, es decir la documentación visual sustituye en gran medida a la prueba automatizada.",
    highlights: [
      "Diseño atómico: 51 componentes en átomos, moléculas, organismos y vistas",
      "Tema MUI único con 32 overrides de componentes y tokens de diseño en SCSS",
      "Build dual ESM/CJS con Vite, tipos .d.ts autogenerados y CSS por componente",
      "Suite propia de 8 date pickers: rango, dual y móvil, sin librería de calendario",
      "Sidebar desacoplado en 4 hooks: estado, navegación, móvil y expansión",
      "CI con 7 gates: typecheck, lint, formato, tests, build, size-limit y Storybook",
    ],
    metrics: [
      { label: "Componentes", value: "51" },
      { label: "Iconos SVG catalogados", value: "728" },
      { label: "Releases publicados", value: "100" },
      { label: "Archivos de Storybook", value: "60" },
    ],
    stack: [
      "TypeScript",
      "React 18",
      "Material UI 5",
      "Emotion",
      "Vite 5",
      "Storybook 8",
      "Vitest",
      "SCSS Modules",
      "React Hook Form",
      "Framer Motion",
      "SVGR",
      "size-limit",
    ],
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
export const otherProjects = projects.filter((project) => !project.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/** Every distinct technology across the portfolio, for the hero ticker. */
export const allTech: string[] = Array.from(
  new Set(projects.flatMap((project) => project.stack)),
).sort((a, b) => a.localeCompare(b, "es"));
