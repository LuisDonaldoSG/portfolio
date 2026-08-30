# Portafolio — Luis Donaldo Solano Gómez

Portafolio personal construido con **Next.js 16 (App Router)**, **React 19**, **TypeScript estricto** y **Tailwind CSS v4**. Diseño inspirado en las páginas de producto de Apple: tipografía SF Pro, retícula de 980 px, cromo esmerilado y la curva de easing `cubic-bezier(0.28, 0.11, 0.32, 1)`.

## Arrancar

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # build de producción (todo estático)
npm start
```

## Qué hay dentro

```
src/
├── app/
│   ├── layout.tsx                    # metadata raíz, fuentes, JSON-LD Person + WebSite
│   ├── page.tsx                      # portada
│   ├── proyectos/
│   │   ├── page.tsx                  # índice de proyectos
│   │   └── [slug]/
│   │       ├── page.tsx              # caso de estudio (SSG, dynamicParams: false)
│   │       └── opengraph-image.tsx   # OG por proyecto, generada
│   ├── opengraph-image.tsx           # OG del sitio
│   ├── icon.tsx · sitemap.ts · robots.ts · manifest.ts
│   ├── not-found.tsx · error.tsx
│   └── globals.css                   # tokens de diseño (@theme, @theme inline, @utility)
├── components/
│   ├── site/     Header · Footer · ThemeToggle
│   ├── sections/ Hero · FeaturedWork · MoreWork · ProjectGrid
│   │             AiEngineering · Timeline · StackSection · About · Contact
│   └── ui/       Button · Reveal · Aurora · Marquee · SectionHeading
│                 ProjectCard · ProjectVisual · OwnershipBadge · Credential
├── content/      projects.ts · profile.ts · ai.ts · types.ts  ← el contenido vive aquí
└── lib/          seo.ts · site.ts
```

Todo el texto y los datos están en `src/content/`. **No hay que tocar componentes para editar el portafolio.**

## Configurar antes de publicar

1. **Dominio** — crea `.env.local`:
   ```bash
   NEXT_PUBLIC_SITE_URL=https://tudominio.com
   ```
   Alimenta `metadataBase`, las URLs canónicas, el sitemap y el JSON-LD. Sin esto se usa `https://luissolano.dev` como marcador.

2. **Redes** — en `src/content/profile.ts` queda un `TODO`: LinkedIn y GitHub están comentados. El CV muestra el nombre del perfil («Donaldo Gómez») pero no el enlace, y no quiero adivinar el slug. El correo público ya es el del CV (`donaldo293y@gmail.com`).

   El teléfono del CV **no** está en el sitio, a propósito: publicarlo en una página indexable lo expone a scrapers. Si lo quieres, agrégalo a `socials`.

3. **Cédula profesional** — el número (`14772789`) sí está publicado, y a propósito: es registro público, cualquiera puede consultarlo por nombre en el [Registro Nacional de Profesionistas](https://cedulaprofesional.sep.gob.mx/) y en México se imprime de rutina en tarjetas y facturas. Un número que nadie puede verificar valdría menos que ninguno, así que va acompañado del enlace al registro.

   De la constancia **solo** se copiaron cuatro datos duraderos: número, profesión registrada, fecha de titulación y fecha de expedición. El folio de la constancia, la firma electrónica y el sello digital quedaron fuera a propósito: autentican ese PDF —que vence a los 30 días—, no a la persona.

   Si prefieres no publicarla, borra `license` dentro de `education` en `src/content/profile.ts`: la tarjeta de Trayectoria, la fila de «Sobre mí» y el JSON-LD desaparecen solos: el campo es opcional.

## Agregar capturas de pantalla

Cada proyecto dibuja una **firma generada** (una ventana estilizada teñida con su color) cuando no hay imagen. Para usar una captura real:

1. Guarda la imagen en `public/proyectos/<slug>.png` (proporción 16:10, ≥ 1600 px de ancho).
2. Agrega el campo `image` al proyecto en `src/content/projects.ts`:

   ```ts
   image: {
     src: "/proyectos/t1-envios-shipping-admin.png",
     alt: "Panel de envíos mostrando el listado de guías con filtros",
     width: 2560,
     height: 1600,
   },
   ```

`ProjectVisual` cambia sola a `next/image` con `sizes` correcto y carga prioritaria donde toca. No hay que tocar nada más.

## De dónde sale el contenido

| Qué | Fuente |
| --- | --- |
| Identidad, trayectoria, formación, idiomas, skills | Tu CV (`cv.pdf`) |
| Cédula profesional | «Constancia de Situación Profesional» de la SEP |
| Proyectos, métricas, stacks, arquitectura | Lectura directa de los repos en `~/Developer/t1` |
| `ownership` (commits propios vs. totales) | `git log` sobre cada repo |
| Sección **Ingeniería con IA** | `t1/shipping-admin-nextjs/CLAUDE.md` (288 líneas, autor único) |

### La sección de IA

`src/content/ai.ts` no es marketing: sale línea por línea del archivo orquestador que mantienes en el repo de envíos. Los seis subagentes (`tech-lead-architect`, `senior-fullstack-shipping`, `mid-frontend-ui`, `qa-playwright`, `technical-writer`, `devops-shipping`), la escalera de riesgo (bajo / medio / alto), las estrategias de delegación y los ocho flujos de alto riesgo están tal cual los declara el contrato.

**Si cambias `CLAUDE.md`, actualiza `src/content/ai.ts`.** Es la única parte del sitio que puede quedar desincronizada sin que nada falle.

La sección **Trayectoria** incluye T1 y Bullground como experiencia laboral, tal como aparecen en el CV. No hay tarjetas de proyecto de Bullground: los 6 casos de estudio son todos de T1. Si prefieres quitar Bullground del sitio, borra su entrada en `roles` dentro de `src/content/profile.ts` — nada más depende de ella.

## Atribución

`ownership` en cada proyecto guarda los commits reales medidos sobre los repos de `~/Developer/t1`, junto al total del repositorio. La insignia y el bloque «Mi rol» los muestran tal cual. Si un número cambia, actualízalo ahí: un portafolio que infla la atribución es peor que uno corto.

Para volver a medirlo todo:

```bash
cd ~/Developer/t1
for d in */; do d="${d%/}"
  git -C "$d" rev-parse --is-inside-work-tree >/dev/null 2>&1 || continue
  mine=$(git -C "$d" log --all --format='%an|%ae' | grep -icE 'donaldo|luis.*solano|LuisDonaldo')
  all=$(git -C "$d" log --all --oneline | wc -l | tr -d ' ')
  [ "$mine" -gt 0 ] && printf '%-32s %s / %s\n' "$d" "$mine" "$all"
done
```

Hoy: **3,802 commits propios en 11 repositorios**. El portafolio muestra 6 proyectos, así que ~1,970 de esos commits viven en repos de T1 que ya no tienen tarjeta (`t1-envios-nextjs` 1861, `internal_admin_shipments` 64, `t1envios-backoffice` 42, `t1paginas-admin` 2, `Phoenix` 1). La etiqueta del stat dice «Commits propios **en T1**» justamente por eso: es producción de carrera, no la suma de las tarjetas. Si prefieres que cuadren, la suma de los seis `ownership.commits` es **1,832**.

Para agregar o quitar un proyecto basta con editar el arreglo de `src/content/projects.ts`: los conteos de la portada, el índice, el sitemap y las imágenes OG se derivan de su longitud. El único número escrito a mano es el título de `/proyectos` (`src/app/proyectos/page.tsx`), porque va en letra.

Dos carpetas de `~/Developer/t1` **no** están incluidas a propósito:

| Carpeta | Motivo |
| --- | --- |
| `t1PartnersWeb` | 0 commits propios — el historial es de otras personas |
| `KC25ThemesProvidersSource-dev` | no es un repo git y el README apunta a la máquina de otro desarrollador |

## SEO

- Metadata por ruta con canónicas y plantilla de título
- JSON-LD: `Person`, `WebSite`, `ItemList`, `SoftwareSourceCode`, `BreadcrumbList`
- `sitemap.xml`, `robots.txt`, `manifest.webmanifest` generados
- Imágenes Open Graph generadas con `next/og` (una del sitio + una por proyecto)
- Todas las rutas son estáticas y se prerenderizan en el build

## Rendimiento y accesibilidad

- Cero dependencias de UI: sin librerías de animación ni de componentes
- Fuentes locales vía `next/font` (Inter + Geist Mono), con SF Pro nativo en Apple
- Las entradas al hacer scroll degradan a contenido visible: si no hay JS, `IntersectionObserver` o el usuario pidió menos movimiento, nada se oculta
- Tema claro/oscuro que respeta el sistema y recuerda la preferencia, sin parpadeo
- Enlace para saltar al contenido, foco visible y estructura de encabezados correcta
