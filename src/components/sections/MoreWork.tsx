import { ButtonLink } from "@/components/ui/Button";
import { ProjectGrid } from "./ProjectGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { projects as allProjects } from "@/content/projects";
import type { Project } from "@/content/types";

type Props = { projects: Project[] };

export function MoreWork({ projects }: Props) {
  return (
    <section className="border-t border-[var(--line)] bg-[var(--surface-muted)] py-24 sm:py-32">
      <div className="shell">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Más trabajo"
            title="Y todo lo que hay alrededor."
            description="Design systems, backoffices financieros, onboarding con IA y herramientas propias. El andamiaje sin el que los productos principales no se sostienen."
            className="flex-1"
          />
          <Reveal delay={140} className="shrink-0">
            <ButtonLink href="/proyectos" variant="secondary">
              Ver los {allProjects.length} proyectos
            </ButtonLink>
          </Reveal>
        </div>

        <div className="mt-14 sm:mt-16">
          <ProjectGrid projects={projects} />
        </div>
      </div>
    </section>
  );
}
