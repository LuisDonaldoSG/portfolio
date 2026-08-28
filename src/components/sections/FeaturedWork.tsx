import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectVisual } from "@/components/ui/ProjectVisual";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { OwnershipBadge } from "@/components/ui/OwnershipBadge";
import type { Project } from "@/content/types";

type Props = { projects: Project[] };

/**
 * Apple-style alternating showcase: one project per full-width band, image on
 * one side, argument on the other, sides swapping down the page.
 */
export function FeaturedWork({ projects }: Props) {
  return (
    <section id="trabajo" className="scroll-mt-24 py-24 sm:py-32">
      <div className="shell">
        <SectionHeading
          eyebrow="Trabajo destacado"
          title="Sistemas que sostienen operaciones reales."
          description="Plataformas de comercio y logística en producción, donde un error cuesta un envío o un cobro. Cada una resolvió un problema concreto de escala."
        />
      </div>

      <div className="mt-16 flex flex-col gap-6 sm:mt-20 sm:gap-8">
        {projects.map((project, index) => (
          <FeaturedBand
            key={project.slug}
            project={project}
            flipped={index % 2 === 1}
            priority={index === 0}
          />
        ))}
      </div>
    </section>
  );
}

function FeaturedBand({
  project,
  flipped,
  priority,
}: {
  project: Project;
  flipped: boolean;
  priority: boolean;
}) {
  return (
    <Reveal className="shell">
      <article className="group relative isolate overflow-hidden rounded-tile border border-[var(--line)] bg-[var(--surface-muted)] transition-[border-color,box-shadow] duration-500 [transition-timing-function:var(--ease-apple)] hover:border-[var(--line-strong)] hover:shadow-[var(--shadow-lift)]">
        <div
          className={`grid items-stretch lg:grid-cols-2 ${
            flipped ? "lg:[&>*:first-child]:order-2" : ""
          }`}
        >
          <ProjectVisual
            project={project}
            priority={priority}
            sizes="(max-width: 1024px) 100vw, 620px"
            className="aspect-[16/10] w-full lg:aspect-auto lg:min-h-[30rem]"
          />

          <div className="flex flex-col justify-center gap-6 p-8 sm:p-12 lg:p-14">
            <div className="flex flex-wrap items-center gap-2.5">
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
              <OwnershipBadge ownership={project.ownership} detailed />
            </div>

            <div>
              <h3 className="type-title text-[var(--text-primary)]">
                <Link
                  href={`/proyectos/${project.slug}`}
                  className="before:absolute before:inset-0 before:z-10 before:content-['']"
                >
                  {project.name}
                </Link>
              </h3>
              <p className="mt-3 text-[1.0625rem] leading-[1.5] tracking-[-0.006em] text-[var(--text-secondary)]">
                {project.tagline}
              </p>
            </div>

            <ul className="flex flex-col gap-2.5">
              {project.highlights.slice(0, 4).map((highlight) => (
                <li
                  key={highlight}
                  className="flex gap-3 text-[0.9375rem] leading-[1.45] text-[var(--text-secondary)]"
                >
                  <svg
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                    className="mt-[0.32rem] size-3.5 shrink-0"
                    style={{ color: project.accent }}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 8.5l3.2 3.2L13 5" />
                  </svg>
                  {highlight}
                </li>
              ))}
            </ul>

            {project.metrics.length > 0 ? (
              <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-[var(--line)] pt-6 sm:grid-cols-4">
                {project.metrics.slice(0, 4).map((metric) => (
                  <div key={metric.label} className="flex flex-col">
                    <dt className="order-2 mt-1.5 text-[0.625rem] uppercase leading-[1.25] tracking-[0.045em] text-[var(--text-tertiary)]">
                      {metric.label}
                    </dt>
                    <dd className="order-1 font-[family-name:var(--font-display)] text-[1.5rem] font-semibold leading-none tracking-[-0.025em] text-[var(--text-primary)]">
                      {metric.value}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : null}

            <p className="inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-[var(--accent-text)]">
              Ver el caso completo
              <svg
                viewBox="0 0 16 16"
                aria-hidden="true"
                className="size-3.5 transition-transform duration-500 [transition-timing-function:var(--ease-apple)] group-hover:translate-x-1.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 3l5 5-5 5" />
              </svg>
            </p>
          </div>
        </div>
      </article>
    </Reveal>
  );
}
