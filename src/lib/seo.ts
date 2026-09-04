import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "./site";
import type { Profile, Project } from "@/content/types";

/**
 * Trims to a length search engines will render without cutting a word in half.
 * Google renders roughly 155-160 characters of a description.
 */
export function truncate(text: string, max = 158): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[.,;:\s]+$/, "")}…`;
}

type BuildMetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  /** Path to an OG image; defaults to the route's own opengraph-image. */
  ogImage?: string;
  type?: "website" | "article" | "profile";
  publishedTime?: string;
};

export function buildMetadata({
  title,
  description,
  path,
  keywords,
  ogImage,
  type = "website",
  publishedTime,
}: BuildMetadataInput): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    keywords,
    // Metadata merges one key deep: returning `alternates` replaces the root
    // layout's object wholesale, so the language map has to be repeated here.
    alternates: { canonical: url, languages: { "es-MX": url } },
    openGraph: {
      type: type === "profile" ? "profile" : type,
      url,
      title,
      description,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      ...(ogImage ? { images: [{ url: absoluteUrl(ogImage) }] } : {}),
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImage ? { images: [absoluteUrl(ogImage)] } : {}),
    },
  };
}

/* -------------------------------------------------------------------------- */
/* JSON-LD                                                                     */
/* -------------------------------------------------------------------------- */

export function personSchema(profile: Profile) {
  const skills = profile.skillGroups.flatMap((group) => group.items);
  const { license } = profile.education;

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": absoluteUrl("/#person"),
    name: profile.name,
    url: siteConfig.url,
    email: `mailto:${profile.email}`,
    jobTitle: profile.role,
    description: profile.bio,
    image: absoluteUrl("/opengraph-image"),
    address: {
      "@type": "PostalAddress",
      addressLocality: profile.location,
    },
    knowsAbout: Array.from(new Set(skills)).slice(0, 40),
    knowsLanguage: profile.languages.map((language) => ({
      "@type": "Language",
      name: language.name,
    })),
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: profile.education.school,
    },
    // Two credentials, and they are different kinds of claim: the degree is
    // awarded by the university, the cédula is a licence granted by the state
    // and checkable against a public registry. Search engines only treat the
    // second as verifiable, so it carries the registry as `identifier` and the
    // SEP as `recognizedBy`.
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "degree",
        name: profile.education.degree,
        educationalLevel: "Licenciatura",
        recognizedBy: {
          "@type": "CollegeOrUniversity",
          name: profile.education.school,
        },
      },
      ...(license
        ? [
            {
              "@type": "EducationalOccupationalCredential",
              credentialCategory: "license",
              name: `Cédula profesional · ${license.profession}`,
              identifier: {
                "@type": "PropertyValue",
                propertyID: "Cédula profesional",
                name: license.registry,
                value: license.number,
              },
              dateCreated: license.issuedOn,
              recognizedBy: {
                "@type": "GovernmentOrganization",
                name: license.authority,
                url: "https://www.gob.mx/sep",
              },
              validIn: { "@type": "Country", name: "México" },
              // No `url` for the credential itself: the registry is a
              // search-by-name app with no per-cédula page, so there is no
              // canonical URL for this record to point at. The number lives in
              // `identifier`, which is what a consumer would match on anyway.
            },
          ]
        : []),
    ],
    sameAs: profile.socials
      .map((social) => social.href)
      .filter((href) => href.startsWith("http")),
    // Only the current employer belongs in worksFor; past roles are listed on
    // the page itself rather than claimed as present employment.
    worksFor: profile.roles
      .filter((role) => role.current)
      .map((role) => ({ "@type": "Organization", name: role.company })),
  };
}

export function websiteSchema(profile: Profile) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    url: siteConfig.url,
    name: `${profile.name} — Portafolio`,
    inLanguage: "es-MX",
    publisher: { "@id": absoluteUrl("/#person") },
  };
}

export function projectCollectionSchema(projects: Project[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": absoluteUrl("/proyectos#list"),
    name: "Proyectos",
    numberOfItems: projects.length,
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(`/proyectos/${project.slug}`),
      name: project.name,
    })),
  };
}

export function projectSchema(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    "@id": absoluteUrl(`/proyectos/${project.slug}#project`),
    name: project.name,
    headline: project.tagline,
    description: project.summary,
    url: absoluteUrl(`/proyectos/${project.slug}`),
    inLanguage: "es-MX",
    author: { "@id": absoluteUrl("/#person") },
    creator: { "@id": absoluteUrl("/#person") },
    // programmingLanguage expects languages, not frameworks — the rest of the
    // stack belongs in keywords.
    programmingLanguage: project.stack.filter((tech) =>
      PROGRAMMING_LANGUAGES.has(tech),
    ),
    keywords: project.stack.join(", "),
    about: { "@type": "Thing", name: project.category },
    // Only real captures are declared. The generated signature is decoration
    // derived from `accent`, not a picture of the product, so claiming it as
    // the project's image would be a lie told to a crawler.
    ...(project.image
      ? {
          image: {
            "@type": "ImageObject",
            url: absoluteUrl(project.image.src),
            width: project.image.width,
            height: project.image.height,
            caption: project.image.alt,
          },
        }
      : {}),
    isPartOf: { "@id": absoluteUrl("/#website") },
  };
}

const PROGRAMMING_LANGUAGES = new Set([
  "TypeScript",
  "JavaScript",
  "Java",
  "CSS",
  "Bash",
]);

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}
