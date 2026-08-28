import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { MoreWork } from "@/components/sections/MoreWork";
import { AiEngineering } from "@/components/sections/AiEngineering";
import { Timeline } from "@/components/sections/Timeline";
import { StackSection } from "@/components/sections/StackSection";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { allTech, featuredProjects, otherProjects } from "@/content/projects";
import { contactCopy, headlineStats, heroCopy, profile } from "@/content/profile";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: `${profile.name} — Ingeniero de Software · Next.js, Node.js y AWS`,
  description:
    "Portafolio de Luis Donaldo Solano Gómez, ingeniero de software con más de cuatro años construyendo plataformas web de punta a punta: React, Next.js, TypeScript, Node.js, AWS y arquitectura limpia.",
  path: "/",
  type: "profile",
  keywords: [
    "Luis Donaldo Solano Gómez",
    "ingeniero de software",
    "software engineer México",
    "desarrollador full stack",
    "desarrollador Next.js México",
    "React 19",
    "TypeScript",
    "Node.js",
    "AWS Lambda",
    "arquitectura de software",
    "clean architecture",
    "desarrollo asistido por IA",
    "Claude Code",
    "portafolio desarrollador México",
  ],
});

export default function HomePage() {
  return (
    <>
      <Hero
        eyebrow={heroCopy.eyebrow}
        title={heroCopy.title}
        subtitle={heroCopy.subtitle}
        stats={headlineStats}
        marquee={allTech}
      />

      <FeaturedWork projects={featuredProjects} />

      <MoreWork projects={otherProjects} />

      <AiEngineering />

      <Timeline roles={profile.roles} education={profile.education} />

      <StackSection groups={profile.skillGroups} />

      <About
        paragraphs={profile.aboutParagraphs}
        role={profile.role}
        location={profile.location}
        years={profile.activeYears}
        education={profile.education}
        languages={profile.languages}
      />

      <Contact title={contactCopy.title} subtitle={contactCopy.subtitle} />
    </>
  );
}
