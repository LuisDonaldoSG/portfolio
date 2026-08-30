import type { ReactNode } from "react";

import type { ProfessionalLicense } from "@/content/types";

/**
 * A cédula profesional, rendered the way OwnershipBadge renders commit counts:
 * as a claim someone can go and check, not as a boast. The number is public
 * record on the Registro Nacional de Profesionistas, so it is printed in full
 * and paired with a link to the registry that confirms it — a number nobody can
 * verify would be worth less than no number at all.
 */

/** Seal-and-check. Drawn inline for the same reason OwnershipBadge's is: one
 *  small mark is not worth an icon dependency, and `currentColor` lets it
 *  inherit whichever text token the surrounding block already resolved. */
function Seal({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
    >
      <circle cx="8" cy="8" r="6.3" />
      <path
        d="M5.4 8.15 7.15 9.9l3.45-3.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function VerifyLink({ href, registry }: { href: string; registry: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="inline-flex items-center gap-1.5 rounded-[4px] text-[0.8125rem] font-medium text-[var(--accent-text)] underline-offset-4 transition-colors hover:underline"
    >
      Verificar en el registro
      {/* The registry is a search-by-name app with no per-cédula URL, so the
          destination is the lookup page rather than this record. Naming it
          keeps the promise honest for anyone reading with a screen reader. */}
      <span className="sr-only"> — {registry}, se abre en una pestaña nueva</span>
      <svg
        viewBox="0 0 12 12"
        aria-hidden="true"
        className="size-2.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4.2 2h5.8v5.8M10 2 2 10" />
      </svg>
    </a>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <dt className="text-[0.6875rem] uppercase tracking-[0.05em] text-[var(--text-tertiary)]">
        {label}
      </dt>
      <dd className="mt-1 text-[0.875rem] leading-[1.45] text-[var(--text-secondary)]">
        {children}
      </dd>
    </div>
  );
}

type CardProps = {
  license: ProfessionalLicense;
  className?: string;
};

/**
 * The full record, laid out as the registry itself states it. Sits under the
 * education entry, where the degree it licenses already is.
 */
export function CredentialCard({ license, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-card border border-[var(--line)] bg-[var(--surface-muted)] p-5 sm:p-6 ${className}`}
    >
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
        <div>
          <p className="inline-flex items-center gap-1.5 text-[0.6875rem] uppercase tracking-[0.05em] text-[var(--text-tertiary)]">
            <Seal />
            Cédula profesional
          </p>
          <p className="mt-1.5 font-[family-name:var(--font-mono)] text-[1.375rem] font-medium tabular-nums tracking-[0.02em] text-[var(--text-primary)]">
            {license.number}
          </p>
        </div>
        <VerifyLink href={license.registryUrl} registry={license.registry} />
      </div>

      <dl className="mt-6 grid gap-x-8 gap-y-4 border-t border-[var(--line)] pt-5 sm:grid-cols-2">
        <Field label="Registrada como">{license.profession}</Field>
        <Field label="Registro">
          {license.registry}
          <span className="block text-[var(--text-tertiary)]">
            {license.authority}
          </span>
        </Field>
        <Field label="Titulación">
          <time dateTime={license.graduatedOn}>{license.graduatedLabel}</time>
        </Field>
        <Field label="Expedición">
          <time dateTime={license.issuedOn}>{license.issuedLabel}</time>
        </Field>
      </dl>
    </div>
  );
}

type BadgeProps = {
  license: ProfessionalLicense;
  className?: string;
};

/**
 * One-line form for the facts list in «Sobre mí», where the full card would
 * outweigh every other row.
 */
export function CredentialBadge({ license, className = "" }: BadgeProps) {
  return (
    <span className={`inline-flex flex-wrap items-center gap-x-2 gap-y-1 ${className}`}>
      <span className="inline-flex items-center gap-1.5">
        <Seal className="size-3.5 text-[var(--text-tertiary)]" />
        <span className="font-[family-name:var(--font-mono)] tabular-nums tracking-[0.02em]">
          {license.number}
        </span>
      </span>
      <span aria-hidden="true" className="text-[var(--text-tertiary)]">
        ·
      </span>
      <VerifyLink href={license.registryUrl} registry={license.registry} />
    </span>
  );
}
