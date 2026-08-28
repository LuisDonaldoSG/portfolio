import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The scaffolder writes AGENTS.md/CLAUDE.md on every dev boot; this repo
  // keeps its own docs.
  agentRules: false,

  poweredByHeader: false,

  images: {
    // Screenshots dropped into /public are served locally; formats are listed
    // so a future remote source gets modern encodings for free.
    formats: ["image/avif", "image/webp"],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
