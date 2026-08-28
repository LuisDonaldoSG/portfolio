import type { Ownership } from "@/content/types";

const TIER_STYLE: Record<Ownership["tier"], string> = {
  lead: "border-[color-mix(in_oklab,var(--accent)_45%,transparent)] text-[var(--accent-text)]",
  core: "border-[var(--line-strong)] text-[var(--text-secondary)]",
  contributor: "border-[var(--line)] text-[var(--text-tertiary)]",
};

type Props = {
  ownership: Ownership;
  /** Include the raw commit counts. */
  detailed?: boolean;
  className?: string;
};

/**
 * States the real contribution to a repository. Shown everywhere a project is,
 * so a shared codebase is never mistaken for solo authorship.
 */
export function OwnershipBadge({ ownership, detailed = false, className = "" }: Props) {
  const { tier, label, commits, repoCommits, share } = ownership;
  const solo = repoCommits === 0;

  const detail = solo
    ? "Proyecto propio"
    : `${commits.toLocaleString("es-MX")} de ${repoCommits.toLocaleString("es-MX")} commits del repositorio (${share})`;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-pill border px-2.5 py-1 text-[0.6875rem] font-medium ${TIER_STYLE[tier]} ${className}`}
    >
      <svg viewBox="0 0 16 16" aria-hidden="true" className="size-3" fill="currentColor">
        <circle cx="8" cy="8" r="3" />
        {tier !== "contributor" ? (
          <circle cx="8" cy="8" r="6.2" fill="none" stroke="currentColor" strokeWidth="1.2" />
        ) : null}
      </svg>
      {solo ? "Proyecto propio" : label}
      {detailed && !solo ? (
        <span className="font-normal opacity-70">
          · {commits.toLocaleString("es-MX")} commits ({share})
        </span>
      ) : null}
      {/* The compact badge shows only the tier; the figures behind it stay
          available to assistive tech instead of hiding in a title attribute. */}
      {!detailed ? <span className="sr-only"> — {detail}</span> : null}
    </span>
  );
}
