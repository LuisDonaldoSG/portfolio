"use client";

import { useEffect } from "react";
import { Button, ButtonLink } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="grid min-h-[70vh] place-items-center py-32">
      <div className="shell-narrow text-center">
        <p className="type-eyebrow text-[var(--accent-text)]">Algo salió mal</p>
        <h1 className="type-display text-gradient mx-auto mt-4 max-w-[18ch]">
          No pudimos cargar esta sección.
        </h1>
        <p className="type-lead mx-auto mt-5 max-w-[46ch] text-[var(--text-secondary)]">
          Puedes reintentar; si vuelve a ocurrir, vuelve al inicio.
        </p>
        {error.digest ? (
          <p className="mt-4 font-[family-name:var(--font-mono)] text-[0.75rem] text-[var(--text-tertiary)]">
            {error.digest}
          </p>
        ) : null}
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button onClick={reset}>Reintentar</Button>
          <ButtonLink href="/" variant="secondary">
            Ir al inicio
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
