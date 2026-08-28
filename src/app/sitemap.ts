import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { absoluteUrl } from "@/lib/site";

/**
 * A build timestamp is not a content-change date — stamping every URL with
 * "now" on each deploy teaches crawlers to distrust lastmod. Bump this when the
 * content in src/content actually changes.
 */
const CONTENT_UPDATED = new Date("2026-08-27T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteUrl("/"),
      lastModified: CONTENT_UPDATED,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: absoluteUrl("/proyectos"),
      lastModified: CONTENT_UPDATED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...projects.map((project) => ({
      url: absoluteUrl(`/proyectos/${project.slug}`),
      lastModified: CONTENT_UPDATED,
      changeFrequency: "yearly" as const,
      priority: project.featured ? 0.8 : 0.6,
    })),
  ];
}
