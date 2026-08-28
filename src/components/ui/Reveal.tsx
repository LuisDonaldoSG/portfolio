"use client";

import {
  useLayoutEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react";

type RevealProps = {
  children: ReactNode;
  /** Stagger in ms, applied as a transition-delay. */
  delay?: number;
  /** Distance travelled on entry, in px. */
  distance?: number;
  as?: ElementType;
  className?: string;
};

/**
 * Scroll-triggered entrance.
 *
 * Correctness rule: content must never be able to stay invisible. The markup
 * renders visible on the server and is only hidden if we can prove on the
 * client that motion is allowed, IntersectionObserver exists, and the element
 * starts below the fold. Once hidden, two independent mechanisms can reveal it
 * — the observer and a passive scroll check — because a missed observer
 * callback would otherwise leave a section permanently blank.
 */
export function Reveal({
  children,
  delay = 0,
  distance = 26,
  as: Tag = "div",
  className = "",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [hidden, setHidden] = useState(false);

  // Layout effect so the hide lands in the same frame as the measurement,
  // which stops below-the-fold content from flashing in and back out.
  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    // Already on screen? Never touch it.
    if (node.getBoundingClientRect().top < window.innerHeight) return;

    setHidden(true);

    let done = false;
    const reveal = () => {
      if (done) return;
      done = true;
      setHidden(false);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };

    // threshold 0 + a small fixed inset: any sliver entering the viewport
    // counts. Percentage insets combined with a non-zero threshold can skip
    // very tall sections entirely during a fast scroll.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) reveal();
      },
      { rootMargin: "0px 0px -40px 0px", threshold: 0 },
    );
    observer.observe(node);

    // Backstop: whatever the observer does, geometry decides.
    const onScroll = () => {
      if (node.getBoundingClientRect().top < window.innerHeight) reveal();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: hidden ? 0 : 1,
        transform: hidden ? `translate3d(0, ${distance}px, 0)` : "none",
        transition:
          "opacity 0.9s var(--ease-out-soft), transform 0.9s var(--ease-out-soft)",
        transitionDelay: `${delay}ms`,
        willChange: hidden ? "opacity, transform" : undefined,
      }}
    >
      {children}
    </Tag>
  );
}
