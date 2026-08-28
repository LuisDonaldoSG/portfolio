/**
 * Single source of truth for absolute URLs, shared by metadata, JSON-LD,
 * the sitemap and OG image generation.
 */
export const siteConfig = {
  name: "Luis Solano",
  shortName: "Luis Solano",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://luissolano.dev",
  locale: "es_MX",
  lang: "es",
  themeColor: { light: "#ffffff", dark: "#000000" },
} as const;

export function absoluteUrl(path = "/"): string {
  return new URL(path, siteConfig.url).toString();
}
