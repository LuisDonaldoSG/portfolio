import { CredentialCard } from "@/components/ui/Credential";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Education, Role } from "@/content/types";

type Props = { roles: Role[]; education: Education };

export function Timeline({ roles, education }: Props) {
  return (
    <section id="trayectoria" className="scroll-mt-24 py-24 sm:py-32">
      <div className="shell">
        <SectionHeading
          eyebrow="Trayectoria"
          title="Cuatro años entregando software en producción."
          description="Dos empresas, un mismo criterio: entender el dominio, dejar la arquitectura clara y que lo entregado siga funcionando cuando yo no esté mirando."
        />

        <ol className="mt-16 flex flex-col">
          {roles.map((role, index) => (
            // `as="li"` matters: <ol> only admits <li>, so letting Reveal
            // render its default <div> here would strip list semantics off
            // every row for assistive tech.
            <Reveal
              key={`${role.company}-${role.period}`}
              as="li"
              delay={index * 80}
              className="relative grid gap-6 border-t border-[var(--line)] py-10 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:gap-14"
            >
              {/* Meta rail */}
              <div className="lg:pt-1">
                <div className="flex items-center gap-2.5">
                  <h3 className="font-[family-name:var(--font-display)] text-[1.25rem] font-semibold tracking-[-0.015em] text-[var(--text-primary)]">
                    {role.company}
                  </h3>
                  {role.current ? (
                    <span className="inline-flex items-center gap-1.5 rounded-pill border border-[color-mix(in_oklab,var(--accent)_40%,transparent)] px-2 py-0.5 text-[0.6875rem] font-medium text-[var(--accent-text)]">
                      <span className="relative flex size-1.5">
                        <span className="absolute inline-flex size-full animate-ping rounded-full bg-[var(--accent)] opacity-70" />
                        <span className="relative inline-flex size-1.5 rounded-full bg-[var(--accent)]" />
                      </span>
                      Actual
                    </span>
                  ) : null}
                </div>
                {role.detail ? (
                  <p className="type-caption mt-1.5">{role.detail}</p>
                ) : null}
                <p className="mt-3 text-[0.8125rem] text-[var(--text-secondary)]">
                  {role.period}
                </p>
                <p className="type-caption mt-1">{role.mode}</p>
              </div>

              {/* Body */}
              <div>
                <p className="text-[1.0625rem] font-medium leading-[1.4] tracking-[-0.008em] text-[var(--text-primary)]">
                  {role.title}
                </p>
                <p className="mt-3 text-[0.9375rem] leading-[1.55] text-[var(--text-secondary)]">
                  {role.summary}
                </p>

                <ul className="mt-6 flex flex-col gap-3">
                  {role.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-3 text-[0.9375rem] leading-[1.5] text-[var(--text-secondary)]"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[0.5rem] size-1.5 shrink-0 rounded-full bg-[var(--accent)]"
                      />
                      {point}
                    </li>
                  ))}
                </ul>

                <ul className="mt-6 flex flex-wrap gap-1.5">
                  {role.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-md border border-[var(--line)] px-2 py-1 text-[0.6875rem] font-medium text-[var(--text-tertiary)]"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}

          <Reveal
            as="li"
            delay={roles.length * 80}
            className="grid gap-6 border-y border-[var(--line)] py-10 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:gap-14"
          >
            <div className="lg:pt-1">
              <h3 className="font-[family-name:var(--font-display)] text-[1.25rem] font-semibold tracking-[-0.015em] text-[var(--text-primary)]">
                {education.school}
              </h3>
              <p className="mt-3 text-[0.8125rem] text-[var(--text-secondary)]">
                {education.period}
              </p>
            </div>
            <div>
              <p className="text-[1.0625rem] font-medium leading-[1.4] tracking-[-0.008em] text-[var(--text-primary)]">
                {education.degree}
              </p>
              <p className="mt-3 text-[0.9375rem] leading-[1.55] text-[var(--text-secondary)]">
                Licenciatura. Base formal de la que salen los hábitos que
                sigo usando: estructuras de datos, bases de datos y redes.
              </p>
              {/* Only renders once `license` exists in content — the degree
                  entry stands on its own without it. */}
              {education.license ? (
                <CredentialCard license={education.license} className="mt-6" />
              ) : null}
            </div>
          </Reveal>
        </ol>
      </div>
    </section>
  );
}
