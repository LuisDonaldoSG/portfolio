type Props = {
  /** Two hex accents that define the mesh. */
  from: string;
  to?: string;
  className?: string;
  /** 0–100, how present the glow is. */
  intensity?: number;
};

/**
 * Decorative gradient mesh. Pure CSS so it costs nothing at runtime and
 * degrades to a flat wash when blend modes are unsupported.
 */
export function Aurora({ from, to, className = "", intensity = 42 }: Props) {
  const second = to ?? from;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div
        data-motion="loop"
        className="absolute -left-[15%] top-[-30%] size-[62vw] max-w-[820px] rounded-full blur-[110px] animate-[drift_18s_ease-in-out_infinite]"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${from}, transparent 68%)`,
          opacity: intensity / 100,
        }}
      />
      <div
        data-motion="loop"
        className="absolute -right-[12%] top-[8%] size-[52vw] max-w-[700px] rounded-full blur-[120px] animate-[drift_24s_ease-in-out_infinite_reverse]"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${second}, transparent 66%)`,
          opacity: (intensity * 0.78) / 100,
        }}
      />
    </div>
  );
}
