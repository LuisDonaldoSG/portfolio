import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/ui/ProjectCard";
import type { Project } from "@/content/types";

type Props = {
  projects: Project[];
  /** Give the first N tiles the larger treatment. */
  emphasizeFirst?: number;
  columns?: 2 | 3;
};

export function ProjectGrid({ projects, emphasizeFirst = 0, columns = 3 }: Props) {
  const cols =
    columns === 2
      ? "sm:grid-cols-2"
      : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={`grid gap-5 ${cols}`}>
      {projects.map((project, index) => {
        const emphasis = index < emphasizeFirst;
        return (
          <Reveal
            key={project.slug}
            delay={(index % 3) * 80}
            className={`h-full ${emphasis && columns === 3 ? "sm:col-span-2" : ""}`}
          >
            <ProjectCard project={project} emphasis={emphasis} />
          </Reveal>
        );
      })}
    </div>
  );
}
