import { ButtonLink } from "@/components/ui/Button";
import { Aurora } from "@/components/ui/Aurora";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false, follow: true },
  // Without this the root layout's canonical="/" is inherited, so every 404
  // would declare itself to be the home page.
  alternates: { canonical: null },
};

export default function NotFound() {
  return (
    <section className="relative isolate grid min-h-[70vh] place-items-center overflow-hidden py-32">
      <Aurora from="#0a84ff" intensity={18} />
      <div className="shell-narrow relative text-center">
        <p className="type-eyebrow text-[var(--accent-text)]">Error 404</p>
        <h1 className="type-display text-gradient mx-auto mt-4 max-w-[16ch]">
          Esta página no existe.
        </h1>
        <p className="type-lead mx-auto mt-5 max-w-[46ch] text-[var(--text-secondary)]">
          El enlace puede estar roto o el contenido se movió. Desde aquí puedes
          volver al inicio o ver todos los proyectos.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href="/">Ir al inicio</ButtonLink>
          <ButtonLink href="/proyectos" variant="secondary">
            Ver proyectos
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
