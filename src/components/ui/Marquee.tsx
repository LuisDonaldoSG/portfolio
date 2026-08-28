import type { CSSProperties } from "react";

type Props = {
  items: string[];
  /** Seconds for one full loop. */
  duration?: number;
  reverse?: boolean;
};

/**
 * Edge-faded infinite ticker. The list is duplicated once and translated -50%,
 * which makes the loop seamless without measuring anything in JS.
 */
export function Marquee({ items, duration = 42, reverse = false }: Props) {
  const track = [...items, ...items];

  return (
    <div
      className="relative flex overflow-hidden py-1 [mask-image:linear-gradient(90deg,transparent,#000_9%,#000_91%,transparent)]"
      role="list"
      aria-label="Tecnologías"
    >
      <div
        role="presentation"
        className="marquee-track flex shrink-0 items-center gap-3 pr-3 will-change-transform"
        style={
          {
            "--marquee-duration": `${duration}s`,
            "--marquee-direction": reverse ? "reverse" : "normal",
          } as CSSProperties
        }
      >
        {track.map((item, i) => (
          <span
            key={`${item}-${i}`}
            role="listitem"
            aria-hidden={i >= items.length}
            className="whitespace-nowrap rounded-pill border border-[var(--line)] bg-[var(--surface-muted)] px-4 py-2 text-[0.8125rem] font-medium tracking-[-0.005em] text-[var(--text-secondary)]"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
