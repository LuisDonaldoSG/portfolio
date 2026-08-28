import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { SkillGroup } from "@/content/types";

type Props = { groups: SkillGroup[] };

export function StackSection({ groups }: Props) {
  return (
    <section
      id="stack"
      className="scroll-mt-24 border-y border-[var(--line)] bg-[var(--surface-muted)] py-24 sm:py-32"
    >
      <div className="shell">
        <SectionHeading
          eyebrow="Stack"
          title="Herramientas elegidas, no acumuladas."
          description="De la interfaz a la infraestructura. Cada pieza entró por una razón concreta y se quedó porque resolvió un problema real en producción."
        />

        <div className="mt-14 grid gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group, index) => (
            <Reveal key={group.title} delay={index * 70} className="h-full">
              {/* The hover transition lives on this inner element: Reveal owns
                  an inline `transition` for its entrance, which would override
                  any transition utility placed on the Reveal itself. */}
              <div className="h-full rounded-card border border-[var(--line)] bg-[var(--surface)] p-7 transition-[translate,box-shadow,border-color] duration-500 [transition-timing-function:var(--ease-apple)] hover:-translate-y-1 hover:border-[var(--line-strong)] hover:shadow-[var(--shadow-tile)]">
                <h3 className="font-[family-name:var(--font-display)] text-[1.0625rem] font-semibold tracking-[-0.01em] text-[var(--text-primary)]">
                  {group.title}
                </h3>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-md border border-[var(--line)] bg-[var(--surface-muted)] px-2.5 py-1.5 text-[0.8125rem] tracking-[-0.004em] text-[var(--text-secondary)]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
