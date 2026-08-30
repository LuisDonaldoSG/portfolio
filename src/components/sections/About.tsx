import type { ReactNode } from "react";

import { CredentialBadge } from "@/components/ui/Credential";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

import type { Education, Language } from "@/content/types";

type Props = {
  paragraphs: string[];
  role: string;
  location: string;
  years: string;
  education: Education;
  languages: Language[];
};

export function About({
  paragraphs,
  role,
  location,
  years,
  education,
  languages,
}: Props) {
  // `value` is a node, not a string, so the cédula row can carry the registry
  // link. Everything else stays plain text.
  const facts: { label: string; value: ReactNode }[] = [
    { label: "Rol", value: role },
    { label: "Base", value: location },
    { label: "Experiencia", value: years },
    { label: "Formación", value: `${education.degree} · ${education.school}` },
    ...(education.license
      ? [
          {
            label: "Cédula profesional",
            value: <CredentialBadge license={education.license} />,
          },
        ]
      : []),
    {
      label: "Idiomas",
      value: languages.map((l) => `${l.name} (${l.level})`).join(" · "),
    },
  ];

  return (
    <section id="sobre-mi" className="scroll-mt-24 py-24 sm:py-32">
      <div className="shell grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="Sobre mí"
            title="Ingeniería de punta a punta, con criterio de producto."
          />
          <Reveal delay={120}>
            <dl className="mt-10 flex flex-col gap-6 border-t border-[var(--line)] pt-8">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-[0.6875rem] uppercase tracking-[0.05em] text-[var(--text-tertiary)]">
                    {fact.label}
                  </dt>
                  <dd className="mt-1.5 text-[0.9375rem] tracking-[-0.005em] text-[var(--text-primary)]">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <div className="flex flex-col gap-6 lg:pt-4">
          {paragraphs.map((paragraph, index) => (
            <Reveal key={index} delay={index * 90}>
              <p
                className={
                  index === 0
                    ? "type-lead text-[var(--text-primary)]"
                    : "text-[1.0625rem] leading-[1.55] tracking-[-0.005em] text-[var(--text-secondary)]"
                }
              >
                {paragraph}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
