import type { Ownership } from "@/content/types";

const TIER_STYLE: Record<Ownership["tier"], string> = {
  lead: "border-[color-mix(in_oklab,var(--accent)_45%,transparent)] text-[var(--accent-text)]",
  core: "border-[var(--line-strong)] text-[var(--text-secondary)]",
  contributor: "border-[var(--line)] text-[var(--text-tertiary)]",
};

type Props = {
  ownership: Ownership;
  className?: string;
};

/**
 * States the level of contribution to a repository. Shown everywhere a project
 * is, so a shared codebase is never mistaken for solo authorship.
 */
export function OwnershipBadge({ ownership, className = "" }: Props) {
  const { tier, label } = ownership;

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
      {label}
    </span>
  );
}
