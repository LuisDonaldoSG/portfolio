import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  const stack = ["Next.js", "React", "TypeScript", "Node.js", "AWS"];

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
            top: -260,
            right: -160,
            width: 720,
            height: 720,
            borderRadius: 9999,
            background:
              "radial-gradient(circle at 50% 50%, rgba(41,151,255,0.55), rgba(0,0,0,0) 70%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -300,
            left: -180,
            width: 700,
            height: 700,
            borderRadius: 9999,
            background:
              "radial-gradient(circle at 50% 50%, rgba(94,92,230,0.42), rgba(0,0,0,0) 70%)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              background: "#f5f5f7",
              color: "#000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            LS
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#a1a1a6" }}>
            {profile.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              fontSize: 76,
              fontWeight: 700,
              letterSpacing: -2.6,
              lineHeight: 1.05,
              maxWidth: 940,
            }}
          >
            {profile.role}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              color: "#a1a1a6",
              letterSpacing: -0.6,
              maxWidth: 900,
              lineHeight: 1.35,
            }}
          >
            {profile.headline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.14)",
            paddingTop: 32,
          }}
        >
          <div style={{ display: "flex", gap: 12 }}>
            {stack.map((tech) => (
              <div
                key={tech}
                style={{
                  display: "flex",
                  padding: "10px 20px",
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.18)",
                  fontSize: 22,
                  color: "#d2d2d7",
                }}
              >
                {tech}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#2997ff" }}>
            {projects.length} proyectos
          </div>
        </div>
      </div>
    ),
    size,
  );
}
