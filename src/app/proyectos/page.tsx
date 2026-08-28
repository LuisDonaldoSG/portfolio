import type { Metadata } from "next";
import { ProjectGrid } from "@/components/sections/ProjectGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Aurora } from "@/components/ui/Aurora";
import { JsonLd } from "@/components/JsonLd";
import { projects } from "@/content/projects";
import { profile } from "@/content/profile";
import { buildMetadata, breadcrumbSchema, projectCollectionSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Proyectos",
  description: `Los ${projects.length} proyectos de ${profile.name}: plataformas de logística y comercio, design systems, backoffices y herramientas internas construidas con Next.js, React y TypeScript.`,
  path: "/proyectos",
  keywords: [
    "proyectos Next.js",
    "portafolio frontend",
    "casos de estudio React",
    "plataformas logística e-commerce",
    "Luis Donaldo Solano Gómez",
  ],
});

export default function ProjectsPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden pb-16 pt-32 sm:pt-40">
        <Aurora from="#0a84ff" to="#bf5af2" intensity={24} />
        <div className="shell relative">
          <SectionHeading
            eyebrow="Portafolio"
            title="Seis proyectos en producción."
            description="Cada uno con su problema, su arquitectura y su nivel real de participación medido en commits. Sin adornos."
            as="h1"
          />
        </div>
      </section>

      <section aria-labelledby="todos-los-proyectos" className="pb-28">
        <div className="shell">
          {/* The grid's cards are h3s; this h2 keeps the outline unbroken. */}
          <h2 id="todos-los-proyectos" className="sr-only">
            Todos los proyectos
          </h2>
          <ProjectGrid projects={projects} />
        </div>
      </section>

      <JsonLd
        schema={[
          projectCollectionSchema(projects),
          breadcrumbSchema([
            { name: "Inicio", path: "/" },
            { name: "Proyectos", path: "/proyectos" },
          ]),
        ]}
      />
    </>
  );
}
