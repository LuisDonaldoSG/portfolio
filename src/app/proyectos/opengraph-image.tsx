import { ImageResponse } from "next/og";
import { projects } from "@/content/projects";
import { profile } from "@/content/profile";

export const alt = `Los ${projects.length} proyectos de ${profile.name}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function ProjectsOgImage() {
  const swatches = projects.slice(0, 12).map((p) => p.accent);

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
            top: -240,
            right: -120,
            width: 760,
            height: 700,
            borderRadius: 9999,
            background:
              "radial-gradient(circle at 50% 50%, rgba(41,151,255,0.5), rgba(0,0,0,0) 70%)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", fontSize: 26, color: "#86868b" }}>
          {profile.name}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              display: "flex",
              fontSize: 78,
              fontWeight: 700,
              letterSpacing: -2.8,
              lineHeight: 1.04,
            }}
          >
            {projects.length} proyectos
            <br />
            en producción.
          </div>
          <div style={{ display: "flex", fontSize: 29, color: "#a1a1a6", letterSpacing: -0.5 }}>
            Logística, comercio, design systems y herramientas internas.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 10,
            borderTop: "1px solid rgba(255,255,255,0.14)",
            paddingTop: 32,
          }}
        >
          {swatches.map((color, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                width: 76,
                height: 12,
                borderRadius: 999,
                background: color,
              }}
            />
          ))}
        </div>
      </div>
    ),
    size,
  );
}
