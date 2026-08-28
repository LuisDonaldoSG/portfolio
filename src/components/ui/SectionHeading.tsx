import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  /** Heading level — keeps the document outline correct per section. */
  as?: "h1" | "h2" | "h3";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as: Tag = "h2",
  className = "",
}: Props) {
  const alignment =
    align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <div className={`flex flex-col ${alignment} ${className}`}>
      {eyebrow ? (
        <Reveal as="p" className="type-eyebrow mb-3 text-[var(--accent-text)]">
          {eyebrow}
        </Reveal>
      ) : null}
      <Reveal delay={60}>
        <Tag className="type-display max-w-[15ch] text-gradient">{title}</Tag>
      </Reveal>
      {description ? (
        <Reveal delay={120}>
          <p
            className={`type-lead mt-5 max-w-[52ch] text-[var(--text-secondary)] ${
              align === "center" ? "mx-auto" : ""
            }`}
          >
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
