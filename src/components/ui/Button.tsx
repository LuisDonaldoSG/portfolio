import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-pill font-medium " +
  "transition-[background-color,color,scale,box-shadow,border-color] duration-300 " +
  "[transition-timing-function:var(--ease-apple)] active:scale-[0.97] " +
  "disabled:pointer-events-none disabled:opacity-45 whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--accent)] text-[var(--accent-contrast)] hover:bg-[var(--accent-hover)] " +
    "shadow-[0_1px_2px_rgba(0,0,0,0.12)]",
  secondary:
    "border border-[var(--line-strong)] text-[var(--text-primary)] " +
    "hover:border-[var(--accent)] hover:text-[var(--accent-text)] " +
    "bg-[color-mix(in_oklab,var(--surface)_60%,transparent)] backdrop-blur-sm",
  ghost:
    "text-[var(--accent-text)] hover:bg-[color-mix(in_oklab,var(--accent)_10%,transparent)]",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-3.5 text-[0.8125rem]",
  md: "h-11 px-6 text-[0.9375rem]",
  lg: "h-[3.25rem] px-8 text-[1.0625rem]",
};

type ButtonLinkProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
} & Omit<ComponentProps<typeof Link>, "className">;

export function ButtonLink({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      {...props}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </Link>
  );
}

type ButtonProps = {
  variant?: Variant;
  size?: Size;
} & ComponentProps<"button">;

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
}
