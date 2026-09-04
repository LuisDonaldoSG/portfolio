import Image from "next/image";
import type { Project } from "@/content/types";

type Props = {
  project: Project;
  priority?: boolean;
  className?: string;
  sizes?: string;
  /**
   * Which box the capture fills.
   *
   * "slot" (default) — the caller's aspect class wins and the image is cropped
   * to fit it. The crop is anchored top-left, never centred: a screenshot of an
   * admin keeps its identity in the top-left corner (logo, tenant, nav, search),
   * so that is the corner that has to survive an arbitrary crop. Centred, the
   * home band's portrait box cuts the balance mid-digits and halves two buttons.
   *
   * "image" — the wrapper takes the file's own ratio, so nothing is cropped.
   * The inline aspect-ratio beats the caller's aspect utility, which is what
   * lets one className serve both branches: the generated signature is built
   * entirely from absolutely-positioned layers and collapses to zero height
   * without an aspect class, so the class has to stay for projects with no
   * capture. Ignored when the project has no image.
   */
  aspect?: "slot" | "image";
};

/**
 * The visual slot for a project.
 *
 * With `project.image` it renders an optimized screenshot. Without one it draws
 * a deterministic "app signature" — a stylised window whose layout is derived
 * from the project's category — so every card is complete today and becomes a
 * real capture the moment an image is added.
 */
export function ProjectVisual({
  project,
  priority = false,
  className = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
  aspect = "slot",
}: Props) {
  const image = project.image;

  if (image) {
    return (
      <div
        className={`relative overflow-hidden ${className}`}
        style={
          aspect === "image"
            ? { aspectRatio: `${image.width} / ${image.height}` }
            : undefined
        }
      >
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes={sizes}
          priority={priority}
          // Default q=75 AVIF is tuned for photographs and smears the 10-13px
          // UI type that is the whole point of a product capture.
          quality={90}
          placeholder={image.blurDataURL ? "blur" : "empty"}
          blurDataURL={image.blurDataURL}
          className="size-full object-cover object-top-left"
        />
      </div>
    );
  }

  return <GeneratedSignature project={project} className={className} />;
}

const LAYOUTS: Record<string, "console" | "grid" | "graph" | "canvas"> = {
  Plataforma: "graph",
  "Design System": "grid",
  Producto: "console",
  Infraestructura: "graph",
  Herramienta: "console",
  Marketing: "canvas",
};

function GeneratedSignature({
  project,
  className = "",
}: {
  project: Project;
  className?: string;
}) {
  const layout = LAYOUTS[project.category] ?? "console";
  const accent = project.accent;

  return (
    <div
      aria-hidden="true"
      className={`relative overflow-hidden ${className}`}
      style={{
        background: `linear-gradient(155deg, color-mix(in oklab, ${accent} 26%, var(--surface-muted)) 0%, var(--surface-muted) 58%)`,
      }}
    >
      {/* Ambient glow */}
      <div
        className="absolute -right-1/4 -top-1/3 size-[75%] rounded-full blur-[70px]"
        style={{ background: accent, opacity: 0.34 }}
      />
      {/* Grid rule, like a design canvas */}
      <div
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "linear-gradient(var(--text-tertiary) 1px, transparent 1px), linear-gradient(90deg, var(--text-tertiary) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 45%, #000 30%, transparent 100%)",
        }}
      />

      {/* Floating app window */}
      <div className="absolute inset-x-[8%] bottom-[-6%] top-[14%] flex flex-col overflow-hidden rounded-t-tile border border-[var(--line)] bg-[color-mix(in_oklab,var(--surface)_88%,transparent)] shadow-[var(--shadow-lift)] backdrop-blur-md">
        <div className="flex shrink-0 items-center gap-1.5 border-b border-[var(--line)] px-4 py-3">
          <span className="size-2 rounded-full bg-[#ff5f57]" />
          <span className="size-2 rounded-full bg-[#febc2e]" />
          <span className="size-2 rounded-full bg-[#28c840]" />
          <span
            className="ml-3 h-4 max-w-[52%] flex-1 rounded-full"
            style={{ background: `color-mix(in oklab, ${accent} 20%, transparent)` }}
          />
        </div>
        <div className="flex-1 p-4">
          <WindowBody layout={layout} accent={accent} />
        </div>
      </div>
    </div>
  );
}

function WindowBody({
  layout,
  accent,
}: {
  layout: "console" | "grid" | "graph" | "canvas";
  accent: string;
}) {
  const soft = `color-mix(in oklab, ${accent} 16%, transparent)`;
  const solid = `color-mix(in oklab, ${accent} 62%, transparent)`;

  if (layout === "grid") {
    return (
      <div className="grid h-full grid-cols-4 grid-rows-4 gap-2.5">
        {Array.from({ length: 16 }, (_, i) => (
          <div
            key={i}
            className="rounded-xl"
            style={{
              background: i % 5 === 0 ? solid : soft,
              opacity: 1 - (i % 4) * 0.14,
            }}
          />
        ))}
      </div>
    );
  }

  if (layout === "graph") {
    // A dependency graph fanning out: one root, three groups, then leaves.
    return (
      <div className="flex h-full flex-col justify-center gap-5">
        <div className="flex justify-center">
          <div className="h-7 w-28 rounded-lg" style={{ background: solid }} />
        </div>
        <div className="flex justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-6 w-[18%] rounded-lg" style={{ background: soft }} />
          ))}
        </div>
        <div className="flex justify-center gap-1.5">
          {Array.from({ length: 6 }, (_, i) => (
            <div
              key={i}
              className="h-5 w-[11%] rounded-md"
              style={{ background: soft, opacity: 0.8 - i * 0.06 }}
            />
          ))}
        </div>
        <div className="flex justify-center gap-1.5">
          {Array.from({ length: 9 }, (_, i) => (
            <div
              key={i}
              className="h-4 w-[7%] rounded"
              style={{ background: soft, opacity: 0.6 - i * 0.04 }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (layout === "canvas") {
    // Hero band, feature row, copy — a marketing page in silhouette.
    return (
      <div className="flex h-full flex-col gap-3">
        <div
          className="min-h-[28%] flex-[2] rounded-xl"
          style={{ background: solid, opacity: 0.5 }}
        />
        <div className="grid flex-1 grid-cols-3 gap-2.5">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-lg" style={{ background: soft }} />
          ))}
        </div>
        <div className="flex flex-1 flex-col justify-center gap-2">
          <div className="h-2.5 w-2/3 rounded-full" style={{ background: soft }} />
          <div className="h-2.5 w-1/2 rounded-full" style={{ background: soft, opacity: 0.7 }} />
        </div>
      </div>
    );
  }

  // console: sidebar + toolbar + data table, the shape of every admin here
  return (
    <div className="flex h-full gap-3">
      <div className="flex w-1/4 flex-col gap-2">
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={i}
            className="h-3.5 shrink-0 rounded-md"
            style={{ background: i === 1 ? solid : soft, opacity: i === 1 ? 1 : 0.9 - i * 0.06 }}
          />
        ))}
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <div className="h-8 shrink-0 rounded-lg" style={{ background: soft }} />
        {Array.from({ length: 9 }, (_, i) => (
          <div
            key={i}
            className="h-4 shrink-0 rounded-md"
            style={{ background: soft, opacity: 0.88 - i * 0.075 }}
          />
        ))}
      </div>
    </div>
  );
}
