"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

const NAV = [
  { href: "/#trabajo", label: "Trabajo" },
  { href: "/#ia", label: "IA" },
  { href: "/#trayectoria", label: "Trayectoria" },
  { href: "/#stack", label: "Stack" },
  { href: "/#sobre-mi", label: "Sobre mí" },
  { href: "/proyectos", label: "Proyectos" },
] as const;

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    // Deferred so the first measurement doesn't force a synchronous re-render
    // during mount; a restored scroll position is picked up on the next frame.
    const frame = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Close the sheet whenever the route changes. Adjusting during render is the
  // documented way to reset state from a changing value — an effect here would
  // paint the open menu once on the new route first.
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Both the sheet and its toggle are md:hidden. Widening past the breakpoint
  // with the sheet open would otherwise strand the page with scroll locked and
  // no visible control to unlock it.
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 48rem)");
    const close = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener("change", close);
    return () => desktop.removeEventListener("change", close);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 [transition-timing-function:var(--ease-apple)] ${
        scrolled || open
          ? "glass border-b border-[var(--line)]"
          : "border-b border-transparent"
      }`}
    >
      <nav aria-label="Principal" className="shell">
        <div className="flex h-12 items-center justify-between gap-6">
          <Link
            href="/"
            className="group flex items-center gap-2 text-[0.9375rem] font-semibold tracking-[-0.01em] text-[var(--text-primary)]"
          >
            <span
              aria-hidden="true"
              className="grid size-6 place-items-center rounded-[7px] bg-[var(--text-primary)] text-[0.6875rem] font-bold text-[var(--surface)] transition-transform duration-500 [transition-timing-function:var(--ease-apple)] group-hover:rotate-[-8deg]"
            >
              LS
            </span>
            <span className="hidden sm:inline">Luis Solano</span>
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {NAV.map((item) => {
              // Three entries are hash links to "/", so compare paths only.
              const current = item.href.split("#")[0].replace(/\/$/, "") ===
                pathname.replace(/\/$/, "");
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={current ? "page" : undefined}
                    className={`rounded-full px-3 py-1.5 text-[0.8125rem] transition-colors duration-300 hover:text-[var(--text-primary)] ${
                      current
                        ? "text-[var(--text-primary)]"
                        : "text-[var(--text-secondary)]"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-1.5">
            <ThemeToggle />
            <Link
              href="/#contacto"
              className="hidden h-8 items-center rounded-pill bg-[var(--accent)] px-4 text-[0.8125rem] font-medium text-[var(--accent-contrast)] transition-colors duration-300 hover:bg-[var(--accent-hover)] sm:inline-flex"
            >
              Contacto
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-movil"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              className="-mr-2 grid size-11 place-items-center rounded-full text-[var(--text-primary)] md:hidden"
            >
              <span className="relative block h-3 w-4">
                <span
                  className={`absolute left-0 block h-[1.5px] w-4 bg-current transition-transform duration-400 [transition-timing-function:var(--ease-apple)] ${
                    open ? "top-1.5 rotate-45" : "top-0.5"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-[1.5px] w-4 bg-current transition-transform duration-400 [transition-timing-function:var(--ease-apple)] ${
                    open ? "top-1.5 -rotate-45" : "top-2.5"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        <div
          id="menu-movil"
          hidden={!open}
          className="overflow-hidden pb-6 md:hidden"
        >
          <ul className="flex flex-col gap-1 pt-2">
            {NAV.map((item, i) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  style={{ animationDelay: `${i * 45}ms` }}
                  className="block animate-[rise-in_0.5s_var(--ease-out-soft)_both] border-b border-[var(--line)] py-3 text-[1.375rem] font-semibold tracking-[-0.015em] text-[var(--text-primary)]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/#contacto"
                onClick={() => setOpen(false)}
                style={{ animationDelay: `${NAV.length * 45}ms` }}
                className="block animate-[rise-in_0.5s_var(--ease-out-soft)_both] py-3 text-[1.375rem] font-semibold tracking-[-0.015em] text-[var(--accent-text)]"
              >
                Contacto
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
