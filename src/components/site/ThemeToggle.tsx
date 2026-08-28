"use client";

import { useCallback, useSyncExternalStore } from "react";

type Theme = "light" | "dark";

/** Mirrors the inline bootstrap script in the root layout. */
const STORAGE_KEY = "portfolio-theme";
const CHANGE_EVENT = "portfolio-theme-change";

/**
 * The document element is the source of truth — the inline bootstrap script
 * already set it before React ran. Subscribing to it instead of copying it into
 * state avoids a mount-time render pass and keeps the two in sync by
 * construction.
 */
function subscribe(onChange: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  media.addEventListener("change", onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    media.removeEventListener("change", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

function getSnapshot(): Theme {
  const explicit = document.documentElement.dataset.theme;
  if (explicit === "dark" || explicit === "light") return explicit;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

/** The server can't know the viewer's theme; render the light icon and let the
 *  client correct it on hydration. */
function getServerSnapshot(): Theme {
  return "light";
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback(() => {
    const next: Theme = getSnapshot() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;

    // Browser chrome follows the unmediated theme-color tag, not the CSS.
    document
      .querySelector('meta[name="theme-color"]:not([media])')
      ?.setAttribute("content", next === "dark" ? "#000000" : "#ffffff");

    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Private mode or blocked storage: the choice just won't persist.
    }
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }, []);

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
      title={isDark ? "Tema claro" : "Tema oscuro"}
      className="grid size-11 place-items-center rounded-full text-[var(--text-secondary)] transition-colors duration-300 hover:bg-[color-mix(in_oklab,var(--text-primary)_8%,transparent)] hover:text-[var(--text-primary)]"
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="size-[1.05rem]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {isDark ? (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </>
        ) : (
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
        )}
      </svg>
    </button>
  );
}
