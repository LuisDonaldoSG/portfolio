import type { Metadata, Viewport } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { JsonLd } from "@/components/JsonLd";
import { profile } from "@/content/profile";
import { siteConfig } from "@/lib/site";
import { personSchema, websiteSchema } from "@/lib/seo";
import "./globals.css";

/**
 * Inter is the fallback for platforms without SF Pro. Apple devices resolve
 * `-apple-system` first, which is the real thing — see --font-display.
 */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const mono = Geist_Mono({
  variable: "--font-mono-geist",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s · ${profile.name}`,
  },
  description: profile.headline,
  applicationName: `${profile.name} — Portafolio`,
  authors: [{ name: profile.name, url: siteConfig.url }],
  creator: profile.name,
  publisher: profile.name,
  category: "technology",
  alternates: {
    canonical: "/",
    languages: { "es-MX": "/" },
  },
  openGraph: {
    type: "profile",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${profile.name} — ${profile.role}`,
    description: profile.headline,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.role}`,
    description: profile.headline,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  formatDetection: { email: false, address: false, telephone: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: siteConfig.themeColor.light },
    { media: "(prefers-color-scheme: dark)", color: siteConfig.themeColor.dark },
  ],
};

/**
 * Applies the stored theme before first paint so a dark-mode visitor never sees
 * a white flash. Kept inline and tiny on purpose — it must run render-blocking.
 */
const THEME_BOOTSTRAP = `(function(){try{var t=localStorage.getItem("portfolio-theme");if(t==="dark"||t==="light"){document.documentElement.dataset.theme=t;var m=document.querySelector('meta[name="theme-color"]:not([media])');if(m)m.setAttribute("content",t==="dark"?"#000000":"#ffffff")}}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang={siteConfig.lang}
      className={`${inter.variable} ${mono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/*
          The themeColor entries in `viewport` are keyed on prefers-color-scheme,
          so they cannot follow an explicit choice. This unmediated tag is the
          one the toggle and the bootstrap script rewrite.
        */}
        <meta name="theme-color" content={siteConfig.themeColor.light} />
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOTSTRAP }} />
      </head>
      <body className="flex min-h-full flex-col bg-[var(--surface)] text-[var(--text-primary)]">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-pill focus:bg-[var(--accent)] focus:px-5 focus:py-2.5 focus:text-[0.875rem] focus:font-medium focus:text-[var(--accent-contrast)]"
        >
          Saltar al contenido
        </a>
        <Header />
        <main id="contenido" className="flex-1">
          {children}
        </main>
        <Footer />
        <JsonLd schema={[personSchema(profile), websiteSchema(profile)]} />
      </body>
    </html>
  );
}
