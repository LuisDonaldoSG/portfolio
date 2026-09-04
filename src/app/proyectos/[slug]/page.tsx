import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { ProjectVisual } from "@/components/ui/ProjectVisual";
import { OwnershipBadge } from "@/components/ui/OwnershipBadge";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { JsonLd } from "@/components/JsonLd";
import { getProject, projects } from "@/content/projects";
import { profile } from "@/content/profile";
import { breadcrumbSchema, buildMetadata, projectSchema, truncate } from "@/lib/seo";

/** Fully static: twelve known slugs, no runtime data source. */
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/proyectos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return buildMetadata({
      title: "Proyecto no encontrado",
      description: "Este proyecto no existe en el portafolio.",
      path: `/proyectos/${slug}`,
    });
  }

  return buildMetadata({
    title: `${project.name} — ${project.category}`,
    description: truncate(`${project.tagline} ${project.summary}`),
    path: `/proyectos/${project.slug}`,
    type: "article",
    keywords: [
      project.name,
      ...project.stack,
      profile.name,
      "caso de estudio frontend",
    ],
  });
}

export default async function ProjectPage({
  params,
}: PageProps<"/proyectos/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === project.slug);
  const related = [
    ...projects.slice(index + 1),
    ...projects.slice(0, index),
  ].slice(0, 3);

  const argument = [
    { label: "El problema", body: project.problem },
    { label: "La solución", body: project.solution },
    { label: "Arquitectura", body: project.architectureNotes },
  ];

  return (
    <>
      <article>
        {/* ---------- Hero ---------- */}
        <header className="relative isolate overflow-hidden pt-28 sm:pt-36">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[38rem]"
            style={{
              background: `radial-gradient(70% 55% at 50% 0%, color-mix(in oklab, ${project.accent} 26%, transparent) 0%, transparent 72%)`,
            }}
          />

          <div className="shell">
            <nav aria-label="Miga de pan" className="mb-8">
              <ol className="flex items-center gap-2 text-[0.8125rem] text-[var(--text-tertiary)]">
                <li>
                  <Link href="/" className="transition-colors hover:text-[var(--text-primary)]">
                    Inicio
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link
                    href="/proyectos"
                    className="transition-colors hover:text-[var(--text-primary)]"
                  >
                    Proyectos
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-[var(--text-secondary)]">
                  {project.name}
                </li>
              </ol>
            </nav>

            <div className="max-w-3xl">
              <div className="mb-6 flex flex-wrap items-center gap-2.5">
                <span
                  className="rounded-pill px-3 py-1 text-[0.6875rem] font-semibold"
                  style={{
                    color: `color-mix(in oklab, ${project.accent} var(--accent-mix), var(--text-primary))`,
                    background: `color-mix(in oklab, ${project.accent} 15%, transparent)`,
                  }}
                >
                  {project.category}
                </span>
                <span className="type-caption">{project.year}</span>
                <OwnershipBadge ownership={project.ownership} />
              </div>

              <h1 className="type-hero text-gradient">{project.name}</h1>
              <p className="type-lead mt-6 max-w-[54ch] text-[var(--text-secondary)]">
                {project.tagline}
              </p>
            </div>

            {project.metrics.length > 0 ? (
              <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-y border-[var(--line)] py-10 sm:grid-cols-4">
                {project.metrics.map((metric) => (
                  <div key={metric.label} className="flex flex-col">
                    <dt className="order-2 mt-2.5 text-[0.75rem] leading-tight text-[var(--text-tertiary)]">
                      {metric.label}
                    </dt>
                    <dd
                      className="order-1 font-[family-name:var(--font-display)] text-[clamp(1.5rem,1.2rem+1.2vw,2rem)] font-semibold leading-none tracking-[-0.028em]"
                      style={{
                        color: `color-mix(in oklab, ${project.accent} var(--accent-mix), var(--text-primary))`,
                      }}
                    >
                      {metric.value}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </div>
        </header>

        {/* ---------- Visual ---------- */}
        <div className="shell mt-14">
          <Reveal>
            <ProjectVisual
              project={project}
              priority
              // A real capture keeps its own ratio here: 16/9 is wider than any
              // of the screenshots, so object-cover was cropping 112px off the
              // top and taking the whole top bar with it. The aspect class stays
              // for projects with no capture — the generated signature has no
              // intrinsic height and collapses without it.
              aspect="image"
              sizes="(max-width: 1284px) calc(100vw - 2.75rem), 1240px"
              className="aspect-[16/9] w-full overflow-hidden rounded-tile border border-[var(--line)]"
            />
          </Reveal>
        </div>

        {/* ---------- Body ---------- */}
        <div className="shell mt-20 grid gap-16 pb-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-20">
          <div className="flex flex-col gap-14">
            <Reveal>
              <h2 className="type-title text-[var(--text-primary)]">Resumen</h2>
              <p className="type-lead mt-5 text-[var(--text-secondary)]">
                {project.summary}
              </p>
            </Reveal>

            {argument.map((block, i) => (
              <Reveal key={block.label} delay={i * 60}>
                <h2 className="type-title text-[var(--text-primary)]">{block.label}</h2>
                <p className="mt-5 text-[1.0625rem] leading-[1.6] tracking-[-0.005em] text-[var(--text-secondary)]">
                  {block.body}
                </p>
              </Reveal>
            ))}

            <Reveal>
              <h2 className="type-title text-[var(--text-primary)]">
                Lo más relevante
              </h2>
              <ul className="mt-7 flex flex-col gap-4">
                {project.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex gap-4 rounded-card border border-[var(--line)] bg-[var(--surface-muted)] p-5 text-[0.9375rem] leading-[1.5] text-[var(--text-secondary)]"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[0.42rem] size-2 shrink-0 rounded-full"
                      style={{ background: project.accent }}
                    />
                    {highlight}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* ---------- Aside ---------- */}
          <aside className="flex flex-col gap-8 lg:sticky lg:top-24 lg:self-start">
            <Reveal className="rounded-card border border-[var(--line)] bg-[var(--surface-muted)] p-7">
              <h2 className="text-[0.75rem] font-semibold uppercase tracking-[0.06em] text-[var(--text-tertiary)]">
                Mi rol
              </h2>
              <p className="mt-4 text-[0.9375rem] leading-[1.5] text-[var(--text-primary)]">
                {project.role}
              </p>
            </Reveal>

            <Reveal delay={80} className="rounded-card border border-[var(--line)] bg-[var(--surface-muted)] p-7">
              <h2 className="text-[0.75rem] font-semibold uppercase tracking-[0.06em] text-[var(--text-tertiary)]">
                Stack
              </h2>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-md border border-[var(--line)] bg-[var(--surface)] px-2.5 py-1.5 text-[0.8125rem] text-[var(--text-secondary)]"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={160}>
              <ButtonLink href="/#contacto" className="w-full">
                Hablemos de este trabajo
              </ButtonLink>
            </Reveal>
          </aside>
        </div>
      </article>

      {/* ---------- Related ---------- */}
      <section className="mt-16 border-t border-[var(--line)] bg-[var(--surface-muted)] py-24">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="type-title text-[var(--text-primary)]">Siguiente proyecto</h2>
            <Link
              href="/proyectos"
              className="text-[0.9375rem] font-medium text-[var(--accent-text)] transition-opacity hover:opacity-75"
            >
              Ver todos
            </Link>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <ProjectCard key={item.slug} project={item} />
            ))}
          </div>
        </div>
      </section>

      <JsonLd
        schema={[
          projectSchema(project),
          breadcrumbSchema([
            { name: "Inicio", path: "/" },
            { name: "Proyectos", path: "/proyectos" },
            { name: project.name, path: `/proyectos/${project.slug}` },
          ]),
        ]}
      />
    </>
  );
}
