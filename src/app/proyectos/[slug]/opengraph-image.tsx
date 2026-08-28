import { ImageResponse } from "next/og";
import { getProject, projects } from "@/content/projects";
import { profile } from "@/content/profile";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

/**
 * A per-route `alt` export would be the same string for all twelve slugs.
 * generateImageMetadata runs per param, so each card gets its own alt text.
 */
export async function generateImageMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  return [
    {
      id: "card",
      size,
      contentType,
      alt: project
        ? `${project.name} — ${project.tagline}`
        : `Proyecto de ${profile.name}`,
    },
  ];
}

export default async function ProjectOgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#000",
            color: "#f5f5f7",
            fontSize: 56,
          }}
        >
          {profile.name}
        </div>
      ),
      size,
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#000000",
          color: "#f5f5f7",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -280,
            left: 180,
            width: 900,
            height: 760,
            borderRadius: 9999,
            background: `radial-gradient(circle at 50% 50%, ${project.accent}88, rgba(0,0,0,0) 68%)`,
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              display: "flex",
              padding: "10px 20px",
              borderRadius: 999,
              background: `${project.accent}2b`,
              color: project.accent,
              fontSize: 22,
              fontWeight: 600,
            }}
          >
            {project.category}
          </div>
          <div style={{ display: "flex", fontSize: 22, color: "#86868b" }}>
            {project.year}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              display: "flex",
              fontSize: 72,
              fontWeight: 700,
              letterSpacing: -2.4,
              lineHeight: 1.05,
              maxWidth: 960,
            }}
          >
            {project.name}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              color: "#a1a1a6",
              letterSpacing: -0.5,
              lineHeight: 1.35,
              maxWidth: 900,
            }}
          >
            {project.tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.14)",
            paddingTop: 32,
          }}
        >
          <div style={{ display: "flex", gap: 44 }}>
            {project.metrics.slice(0, 3).map((metric) => (
              <div
                key={metric.label}
                style={{ display: "flex", flexDirection: "column", gap: 8 }}
              >
                <div style={{ display: "flex", fontSize: 34, fontWeight: 700, letterSpacing: -1 }}>
                  {metric.value}
                </div>
                <div style={{ display: "flex", fontSize: 19, color: "#86868b" }}>
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", fontSize: 22, color: "#86868b" }}>
            {profile.name}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
