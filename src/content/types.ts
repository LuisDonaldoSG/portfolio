export type ProjectCategory =
  | "Plataforma"
  | "Design System"
  | "Producto"
  | "Infraestructura"
  | "Herramienta"
  | "Marketing";

export interface Metric {
  /** Short label, e.g. "Componentes" */
  label: string;
  /** Pre-formatted value, e.g. "120+" */
  value: string;
}

export type OwnershipTier = "lead" | "core" | "contributor";

export interface Ownership {
  tier: OwnershipTier;
  /** Commits authored by Luis in this repository. */
  commits: number;
  /** Total commits in the repository, for honest context. */
  repoCommits: number;
  label: string;
  share: string;
}

export interface Project {
  slug: string;
  /** Directory name on disk — kept for traceability, never rendered. */
  dir: string;
  name: string;
  tagline: string;
  category: ProjectCategory;
  year: string;
  summary: string;
  role: string;
  problem: string;
  solution: string;
  highlights: string[];
  metrics: Metric[];
  stack: string[];
  architectureNotes: string;
  ownership: Ownership;
  /** Hex accent used for the project's gradient signature. */
  accent: string;
  featured: boolean;
  /**
   * Optional real screenshot. When absent, ProjectVisual renders a generated
   * signature from `accent` — so the site is complete before captures exist,
   * and upgrades to real imagery by adding this field alone.
   */
  image?: ProjectImage;
}

export interface ProjectImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Tiny base64 blur placeholder, optional. */
  blurDataURL?: string;
}

export interface SkillGroup {
  title: string;
  items: string[];
}

export interface Role {
  company: string;
  /** e.g. "T1 Comercios · T1 Envíos" */
  detail?: string;
  title: string;
  /** e.g. "Jul 2023 — Presente" */
  period: string;
  /** "Presencial" | "Remoto" | … */
  mode: string;
  summary: string;
  points: string[];
  stack: string[];
  current: boolean;
}

export interface Education {
  degree: string;
  school: string;
  period: string;
  /** Professional licence, when the degree has one on a public registry. */
  license?: ProfessionalLicense;
}

/**
 * A Mexican *cedula profesional*: the licence the SEP issues once a degree is
 * registered, and the number a professional is legally identified by. It is
 * public record — anyone can look it up by name on the Registro Nacional de
 * Profesionistas — which is why the number is printed here rather than hidden.
 *
 * What is deliberately NOT modelled: the folio, electronic signature and sello
 * digital of the *constancia de situacion profesional* this data came from.
 * Those authenticate one 30-day document, not the person, and publishing them
 * would be both meaningless and careless.
 */
export interface ProfessionalLicense {
  /** The cedula number itself, e.g. "12345678". */
  number: string;
  /** Official degree wording as registered, which is longer than `degree`. */
  profession: string;
  /** Issuing authority, e.g. "Secretaria de Educacion Publica". */
  authority: string;
  /** Public registry the number can be checked against. */
  registry: string;
  /** Public lookup page for the registry. */
  registryUrl: string;
  /** ISO dates, for `<time dateTime>` and JSON-LD. */
  graduatedOn: string;
  issuedOn: string;
  /** The same two dates, written the way es-MX reads them. */
  graduatedLabel: string;
  issuedLabel: string;
}

export interface Language {
  name: string;
  level: string;
}

export interface Social {
  label: string;
  href: string;
  handle: string;
}

export interface Profile {
  name: string;
  headline: string;
  role: string;
  location: string;
  email: string;
  bio: string;
  aboutParagraphs: string[];
  activeYears: string;
  skillGroups: SkillGroup[];
  socials: Social[];
  roles: Role[];
  education: Education;
  languages: Language[];
}

export interface Stat {
  value: string;
  label: string;
}
