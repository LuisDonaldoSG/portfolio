import { ButtonLink } from "@/components/ui/Button";
import { Aurora } from "@/components/ui/Aurora";
import { Marquee } from "@/components/ui/Marquee";
import type { Stat } from "@/content/types";

type Props = {
  eyebrow: string;
  title: string;
  subtitle: string;
  stats: Stat[];
  marquee: string[];
};

export function Hero({ eyebrow, title, subtitle, stats, marquee }: Props) {
  return (
    <section className="relative isolate overflow-hidden pt-28 sm:pt-36">
      <Aurora from="#0a84ff" to="#5e5ce6" intensity={30} />

      <div className="shell relative">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <p
            className="type-eyebrow mb-6 inline-flex items-center gap-2 whitespace-nowrap rounded-pill border border-[var(--line)] bg-[var(--surface-card)] px-3.5 py-1.5 text-[var(--text-secondary)] backdrop-blur-md"
            style={{ animation: "rise-in 0.9s var(--ease-out-soft) both" }}
          >
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-[var(--accent)] opacity-70" />
              <span className="relative inline-flex size-1.5 rounded-full bg-[var(--accent)]" />
            </span>
            {eyebrow}
          </p>

          <h1
            className="type-hero text-gradient max-w-[14ch]"
            style={{ animation: "rise-in 1s var(--ease-out-soft) 0.08s both" }}
          >
            {title}
          </h1>
        </div>

        <p
          className="type-lead mx-auto mt-7 max-w-[62ch] text-center text-[var(--text-secondary)]"
          style={{ animation: "rise-in 1s var(--ease-out-soft) 0.18s both" }}
        >
          {subtitle}
        </p>

        <div
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          style={{ animation: "rise-in 1s var(--ease-out-soft) 0.26s both" }}
        >
          <ButtonLink href="/#trabajo" size="lg">
            Ver el trabajo
          </ButtonLink>
          <ButtonLink href="/#contacto" variant="secondary" size="lg">
            Hablemos
          </ButtonLink>
        </div>

        <dl
          className="mx-auto mt-20 grid max-w-4xl grid-cols-2 gap-x-6 gap-y-10 border-t border-[var(--line)] pt-12 sm:grid-cols-4"
          style={{ animation: "rise-in 1s var(--ease-out-soft) 0.36s both" }}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col text-center">
              <dt className="order-2 mt-2.5 text-[0.75rem] leading-tight tracking-[0.01em] text-[var(--text-tertiary)]">
                {stat.label}
              </dt>
              <dd className="order-1 whitespace-nowrap font-[family-name:var(--font-display)] text-[clamp(1.75rem,1.2rem+1.9vw,2.75rem)] font-semibold leading-none tracking-[-0.03em] text-[var(--text-primary)]">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div
        className="mt-20 sm:mt-24"
        style={{ animation: "rise-in 1s var(--ease-out-soft) 0.44s both" }}
      >
        <Marquee items={marquee} duration={54} />
      </div>
    </section>
  );
}
