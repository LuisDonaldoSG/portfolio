import { ButtonLink } from "@/components/ui/Button";
import { Aurora } from "@/components/ui/Aurora";
import { Reveal } from "@/components/ui/Reveal";
import { profile } from "@/content/profile";

type Props = { title: string; subtitle: string };

export function Contact({ title, subtitle }: Props) {
  return (
    <section
      id="contacto"
      className="relative isolate scroll-mt-24 overflow-hidden border-t border-[var(--line)] bg-[var(--surface-muted)] py-28 sm:py-36"
    >
      <Aurora from="#0a84ff" to="#30d158" intensity={22} />

      <div className="shell-narrow relative text-center">
        <Reveal>
          <h2 className="type-display text-gradient mx-auto max-w-[16ch]">{title}</h2>
        </Reveal>
        <Reveal delay={80}>
          <p className="type-lead mx-auto mt-6 max-w-[52ch] text-[var(--text-secondary)]">
            {subtitle}
          </p>
        </Reveal>
        <Reveal delay={160}>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href={`mailto:${profile.email}`} size="lg">
              {profile.email}
            </ButtonLink>
            {profile.socials
              .filter((s) => s.href.startsWith("http"))
              .slice(0, 1)
              .map((social) => (
                <ButtonLink
                  key={social.label}
                  href={social.href}
                  variant="secondary"
                  size="lg"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {social.label}
                </ButtonLink>
              ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
