import type { MetadataRoute } from "next";
import { profile } from "@/content/profile";
import { siteConfig } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${profile.name} — Portafolio`,
    short_name: siteConfig.shortName,
    description: profile.headline,
    start_url: "/",
    display: "standalone",
    background_color: siteConfig.themeColor.dark,
    theme_color: siteConfig.themeColor.dark,
    lang: "es-MX",
    categories: ["portfolio", "technology", "developer"],
    // Installability needs a 192 and a 512; the maskable variant keeps the
    // mark inside the safe zone on platforms that crop to their own shape.
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-512-maskable.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
