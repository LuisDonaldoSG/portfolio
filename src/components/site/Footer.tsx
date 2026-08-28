import Link from "next/link";
import { profile } from "@/content/profile";

const YEAR_START = 2023;

export function Footer() {
  const year = new Date().getFullYear();
  const span = year > YEAR_START ? `${YEAR_START}–${year}` : `${year}`;

  return (
    <footer className="border-t border-[var(--line)] bg-[var(--surface-muted)]">
      <div className="shell py-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="text-[0.9375rem] font-semibold tracking-[-0.01em] text-[var(--text-primary)]">
              {profile.name}
            </p>
            <p className="type-caption mt-2">{profile.headline}</p>
          </div>

          <nav aria-label="Pie de página" className="flex flex-wrap gap-x-10 gap-y-6">
            <div>
              <p className="mb-3 text-[0.75rem] font-semibold uppercase tracking-[0.06em] text-[var(--text-tertiary)]">
                Navegación
              </p>
              <ul className="flex flex-col gap-2 text-[0.8125rem] text-[var(--text-secondary)]">
                <li>
                  <Link href="/#trabajo" className="transition-colors hover:text-[var(--text-primary)]">
                    Trabajo
                  </Link>
                </li>
                <li>
                  <Link href="/proyectos" className="transition-colors hover:text-[var(--text-primary)]">
                    Todos los proyectos
                  </Link>
                </li>
                <li>
                  <Link href="/#ia" className="transition-colors hover:text-[var(--text-primary)]">
                    Ingeniería con IA
                  </Link>
                </li>
                <li>
                  <Link href="/#trayectoria" className="transition-colors hover:text-[var(--text-primary)]">
                    Trayectoria
                  </Link>
                </li>
                <li>
                  <Link href="/#stack" className="transition-colors hover:text-[var(--text-primary)]">
                    Stack
                  </Link>
                </li>
                <li>
                  <Link href="/#sobre-mi" className="transition-colors hover:text-[var(--text-primary)]">
                    Sobre mí
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="mb-3 text-[0.75rem] font-semibold uppercase tracking-[0.06em] text-[var(--text-tertiary)]">
                Contacto
              </p>
              <ul className="flex flex-col gap-2 text-[0.8125rem] text-[var(--text-secondary)]">
                {profile.socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target={social.href.startsWith("http") ? "_blank" : undefined}
                      rel={social.href.startsWith("http") ? "noreferrer noopener" : undefined}
                      className="transition-colors hover:text-[var(--text-primary)]"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-[var(--line)] pt-6 text-[0.75rem] text-[var(--text-tertiary)] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {span} {profile.name}. Todos los derechos reservados.
          </p>
          <p>Hecho con Next.js, React y demasiado café.</p>
        </div>
      </div>
    </footer>
  );
}
