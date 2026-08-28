"use client";

import { useCallback, useId, useRef, useState } from "react";
import {
  architecture,
  practices,
  riskCopy,
  scenarios,
  subagents,
  type AiScenario,
} from "@/content/ai";
import { Reveal } from "@/components/ui/Reveal";
import { ArchitectureStack } from "@/components/ui/ArchitectureStack";

/**
 * The orchestration contract, made explorable.
 *
 * Picking a task class shows what the file actually decides: how much risk it
 * carries, which architecture layers it may touch, and how much machinery gets
 * spawned. The escalation is the argument — the smallest task gets no agents at
 * all, and the machinery only grows with the blast radius.
 *
 * Every panel stays in the DOM (`hidden` on the inactive ones) so the content is
 * crawlable and findable with the browser's own search.
 */
export function AiEngineering() {
  const [active, setActive] = useState(0);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();

  const scenario = scenarios[active];

  const onKeyDown = useCallback((event: React.KeyboardEvent, index: number) => {
    const last = scenarios.length - 1;
    let next: number | null = null;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = index === last ? 0 : index + 1;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = index === 0 ? last : index - 1;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = last;

    if (next === null) return;
    event.preventDefault();
    setActive(next);
    tabsRef.current[next]?.focus();
  }, []);

  return (
    <section
      id="ia"
      className="scroll-mt-24 border-y border-[var(--line)] bg-[var(--surface-muted)] py-24 sm:py-32"
    >
      <div className="shell">
        <Heading />

        {/* ---------------- Task selector ---------------- */}
        <div
          role="tablist"
          aria-label="Tipo de tarea"
          className="mt-14 flex flex-wrap gap-2 sm:mt-16"
        >
          {scenarios.map((item, index) => {
            const selected = index === active;
            const accent = riskCopy[item.risk].accent;
            return (
              <button
                key={item.id}
                ref={(node) => {
                  tabsRef.current[index] = node;
                }}
                role="tab"
                id={`${baseId}-tab-${item.id}`}
                aria-selected={selected}
                aria-controls={`${baseId}-panel-${item.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(index)}
                onKeyDown={(event) => onKeyDown(event, index)}
                className={`inline-flex items-center gap-2 rounded-pill border px-4 py-2.5 text-[0.8125rem] font-medium transition-[background-color,border-color,color] duration-300 [transition-timing-function:var(--ease-apple)] ${
                  selected
                    ? "border-transparent bg-[var(--text-primary)] text-[var(--surface)]"
                    : "border-[var(--line-strong)] text-[var(--text-secondary)] hover:border-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
                }`}
              >
                <span
                  aria-hidden="true"
                  className="size-1.5 shrink-0 rounded-full"
                  style={{ background: accent }}
                />
                {item.label}
              </button>
            );
          })}
        </div>

        {scenarios.map((item, index) => (
          <div
            key={item.id}
            role="tabpanel"
            id={`${baseId}-panel-${item.id}`}
            aria-labelledby={`${baseId}-tab-${item.id}`}
            hidden={index !== active}
            tabIndex={0}
            className="mt-8 rounded-tile border border-[var(--line)] bg-[var(--surface)] focus-visible:outline-2"
          >
            <Panel scenario={item} />
          </div>
        ))}

        <p className="type-caption mt-5">
          Las cinco clases de tarea, los seis subagentes y la escalera de riesgo
          salen del archivo orquestador que mantengo en el repositorio de envíos.
        </p>

        {/* ---------------- Surrounding practices ---------------- */}
        <Practices />
      </div>
      {/* Keep `scenario` referenced for the screen-reader live region below. */}
      <p className="sr-only" aria-live="polite">
        {scenario.title}. {riskCopy[scenario.risk].label}. {scenario.strategy}
      </p>
    </section>
  );
}

function Heading() {
  return (
    <div className="flex flex-col">
      <p className="type-eyebrow mb-3 text-[var(--accent-text)]">
        Ingeniería asistida por IA
      </p>
      <h2 className="type-display text-gradient max-w-[17ch]">
        La IA no decide. El contrato decide.
      </h2>
      <p className="type-lead mt-5 max-w-[58ch] text-[var(--text-secondary)]">
        Uso Claude Code como socio de diseño, no como autocompletado. Lo que hace
        que funcione no es el modelo: es que la arquitectura tenga fronteras
        escritas y que el repositorio sepa explicarlas. Elige una tarea y mira
        qué decide el contrato.
      </p>
    </div>
  );
}

function Panel({ scenario }: { scenario: AiScenario }) {
  const risk = riskCopy[scenario.risk];
  const activeAgents = subagents.filter((agent) =>
    scenario.agents.includes(agent.id),
  );

  return (
    <div className="grid gap-px overflow-hidden rounded-tile bg-[var(--line)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
      {/* ---- Architecture stack, in 3D ---- */}
      <div className="bg-[var(--surface)] p-7 sm:p-9">
        <ArchitectureStack
          layers={architecture}
          activeIds={scenario.layers}
          accent={risk.accent}
        />
      </div>

      {/* ---- Decision ---- */}
      <div className="flex flex-col justify-between gap-10 bg-[var(--surface)] p-7 sm:p-9">
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <span
              className="inline-flex items-center gap-1.5 rounded-pill px-2.5 py-1 text-[0.6875rem] font-semibold"
              style={{
                color: `color-mix(in oklab, ${risk.accent} var(--accent-mix), var(--text-primary))`,
                background: `color-mix(in oklab, ${risk.accent} 15%, transparent)`,
              }}
            >
              <span
                aria-hidden="true"
                className="size-1.5 rounded-full"
                style={{ background: risk.accent }}
              />
              {risk.label}
            </span>
            <span className="type-caption">{risk.definition}</span>
          </div>

          <h3 className="type-title mt-4 text-[var(--text-primary)]">
            {scenario.title}
          </h3>
          <p className="mt-3 text-[1.0625rem] font-medium leading-[1.45] tracking-[-0.008em] text-[var(--text-primary)]">
            {scenario.strategy}
          </p>
          <p className="mt-3 text-[0.9375rem] leading-[1.55] text-[var(--text-secondary)]">
            {scenario.reasoning}
          </p>
        </div>

        <div className="border-t border-[var(--line)] pt-6">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.06em] text-[var(--text-tertiary)]">
            {activeAgents.length > 0
              ? `Subagentes que entran · ${activeAgents.length} de ${subagents.length}`
              : "Subagentes que entran"}
          </p>

          {activeAgents.length === 0 ? (
            <p className="mt-4 text-[0.9375rem] leading-[1.5] text-[var(--text-secondary)]">
              Ninguno. El contrato también dice cuándo{" "}
              <em className="not-italic text-[var(--text-primary)]">no</em>{" "}
              delegar, y esa regla es la que evita que la herramienta se vuelva
              ceremonia.
            </p>
          ) : (
            <ul className="mt-4 flex flex-col gap-2">
              {activeAgents.map((agent, index) => (
                <li
                  key={agent.id}
                  style={{ animationDelay: `${index * 60}ms` }}
                  className="flex flex-wrap items-baseline gap-x-3 gap-y-1 rounded-card border border-[var(--line)] bg-[var(--surface-muted)] px-3.5 py-2.5 motion-safe:animate-[rise-in_0.5s_var(--ease-out-soft)_both]"
                >
                  <code className="font-[family-name:var(--font-mono)] text-[0.8125rem] text-[var(--accent-text)]">
                    {agent.id}
                  </code>
                  <span className="text-[0.8125rem] text-[var(--text-secondary)]">
                    {agent.role}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

function Practices() {
  return (
    <div className="mt-16 grid gap-4 sm:mt-20 sm:grid-cols-3">
      {practices.map((item, index) => (
        <Reveal key={item.title} delay={index * 80} className="h-full">
          <article className="flex h-full flex-col rounded-card border border-[var(--line)] bg-[var(--surface)] p-7">
            <code className="w-fit rounded-md border border-[var(--line)] bg-[var(--surface-muted)] px-2 py-1 font-[family-name:var(--font-mono)] text-[0.6875rem] text-[var(--text-tertiary)]">
              {item.tag}
            </code>
            <h3 className="mt-5 font-[family-name:var(--font-display)] text-[1.0625rem] font-semibold tracking-[-0.01em] text-[var(--text-primary)]">
              {item.title}
            </h3>
            <p className="mt-3 text-[0.9375rem] leading-[1.55] text-[var(--text-secondary)]">
              {item.body}
            </p>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
