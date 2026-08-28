import Link from "next/link";
import type { Project } from "@/content/types";
import { ProjectVisual } from "./ProjectVisual";
import { OwnershipBadge } from "./OwnershipBadge";

type Props = {
  project: Project;
  /** Larger treatment for the first tiles in a grid. */
  emphasis?: boolean;
  priority?: boolean;
};

export function ProjectCard({ project, emphasis = false, priority = false }: Props) {
  return (
    <article
      className="group relative isolate flex h-full flex-col overflow-hidden rounded-tile border border-[var(--line)] bg-[var(--surface-muted)] transition-[translate,box-shadow,border-color] duration-500 [transition-timing-function:var(--ease-apple)] hover:-translate-y-1.5 hover:border-[var(--line-strong)] hover:shadow-[var(--shadow-lift)]"
      style={{ ["--project-accent" as string]: project.accent }}
    >
      <ProjectVisual
        project={project}
        priority={priority}
        sizes={
          emphasis
            ? "(max-width: 768px) 100vw, (max-width: 1240px) 60vw, 720px"
            : "(max-width: 768px) 100vw, (max-width: 1240px) 45vw, 420px"
        }
        className={`w-full shrink-0 ${emphasis ? "aspect-[16/10]" : "aspect-[16/11]"}`}
      />

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span
            className="rounded-pill px-2.5 py-1 text-[0.6875rem] font-semibold tracking-[0.01em]"
            style={{
              // Mixing toward the text colour keeps the hue but guarantees
              // contrast in both themes, whatever the accent is.
              color: `color-mix(in oklab, ${project.accent} var(--accent-mix), var(--text-primary))`,
              background: `color-mix(in oklab, ${project.accent} 14%, transparent)`,
            }}
          >
            {project.category}
          </span>
          <span className="type-caption">{project.year}</span>
          <OwnershipBadge ownership={project.ownership} className="ml-auto" />
        </div>

        <h3
          className={`font-[family-name:var(--font-display)] font-semibold tracking-[-0.018em] text-[var(--text-primary)] ${
            emphasis ? "text-[1.75rem] leading-[1.15]" : "text-[1.375rem] leading-[1.2]"
          }`}
        >
          <Link href={`/proyectos/${project.slug}`} className="before:absolute before:inset-0 before:z-10 before:content-['']">
            {project.name}
          </Link>
        </h3>

        <p className="mt-2.5 text-[0.9375rem] leading-[1.5] tracking-[-0.005em] text-[var(--text-secondary)]">
          {project.tagline}
        </p>

        {project.metrics.length > 0 ? (
          <dl className="mt-6 grid grid-cols-3 gap-x-4 border-t border-[var(--line)] pt-5">
            {project.metrics.slice(0, 3).map((metric) => (
              <div key={metric.label} className="flex flex-col">
                <dt className="order-2 mt-1 text-[0.625rem] uppercase leading-[1.25] tracking-[0.045em] text-[var(--text-tertiary)]">
                  {metric.label}
                </dt>
                <dd className="order-1 font-[family-name:var(--font-display)] text-[1.25rem] font-semibold tracking-[-0.02em] text-[var(--text-primary)]">
                  {metric.value}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}

        <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-6">
          {project.stack.slice(0, emphasis ? 5 : 4).map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-[var(--line)] px-2 py-1 text-[0.6875rem] font-medium text-[var(--text-tertiary)]"
            >
              {tech}
            </span>
          ))}
        </div>

        <p className="mt-5 inline-flex items-center gap-1.5 text-[0.875rem] font-medium text-[var(--accent-text)]">
          Ver proyecto
          <svg
            viewBox="0 0 16 16"
            aria-hidden="true"
            className="size-3.5 transition-transform duration-500 [transition-timing-function:var(--ease-apple)] group-hover:translate-x-1"
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
    </article>
  );
}
