"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import type { ArchLayer } from "@/content/ai";

type Props = {
  layers: ArchLayer[];
  /** Layer ids the current task is allowed to touch. */
  activeIds: string[];
  accent: string;
};

// Bounded so a plate never swings out of its column at the narrowest
// two-column width (~1024px viewport). See .arch-plate inset-inline.
const MAX_SPIN = 24;
// Below this the stack lies almost flat and the top plate climbs out of frame.
const MIN_TILT = 11;
const MAX_TILT = 34;
const DRAG_SENSITIVITY = 0.38;

/**
 * The layer ladder as a physical stack.
 *
 * A layered architecture already *is* a stack, so the 3D is the diagram rather
 * than decoration: plates sit in the order the request travels, the beam shows
 * the direction, and the plates a task may touch light up while the rest recede.
 *
 * Rotation is a pointer enhancement only — every plate carries its real name,
 * path and rule as text, so the whole thing reads without ever being turned.
 * Transforms are written straight to CSS custom properties inside a rAF, so
 * dragging never triggers a React render.
 */
export function ArchitectureStack({ layers, activeIds, accent }: Props) {
  const sceneRef = useRef<HTMLDivElement>(null);
  // Must match the resting --spin / --tilt in globals.css, or the first
  // pointer move snaps the stack to a different pose.
  const stateRef = useRef({ spin: -14, tilt: 11, dragging: false, x: 0, y: 0 });
  const frameRef = useRef(0);
  const [dragging, setDragging] = useState(false);
  const hasPointer = useSyncExternalStore(
    subscribeHover,
    getHoverSnapshot,
    // The server can't know the input device; assume touch and let hydration
    // correct it, so the hint never claims a mouse that isn't there.
    () => false,
  );

  const apply = useCallback(() => {
    frameRef.current = 0;
    const node = sceneRef.current;
    if (!node) return;
    node.style.setProperty("--spin", `${stateRef.current.spin}deg`);
    node.style.setProperty("--tilt", `${stateRef.current.tilt}deg`);
  }, []);

  const schedule = useCallback(() => {
    if (frameRef.current) return;
    frameRef.current = requestAnimationFrame(apply);
  }, [apply]);

  const onPointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      // Let the browser keep vertical scrolling; only take over the gesture
      // once it is clearly horizontal (handled by touch-action: pan-y).
      const s = stateRef.current;
      s.dragging = true;
      s.x = event.clientX;
      s.y = event.clientY;
      setDragging(true);
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    [],
  );

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const s = stateRef.current;
      if (!s.dragging) return;
      const dx = event.clientX - s.x;
      const dy = event.clientY - s.y;
      s.x = event.clientX;
      s.y = event.clientY;
      s.spin = clamp(s.spin + dx * DRAG_SENSITIVITY, -MAX_SPIN, MAX_SPIN);
      s.tilt = clamp(s.tilt - dy * DRAG_SENSITIVITY * 0.5, MIN_TILT, MAX_TILT);
      schedule();
    },
    [schedule],
  );

  const endDrag = useCallback(() => {
    stateRef.current.dragging = false;
    setDragging(false);
  }, []);

  useEffect(() => () => cancelAnimationFrame(frameRef.current), []);

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between gap-4">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.06em] text-[var(--text-tertiary)]">
          Capas que puede tocar
        </p>
        <p className="type-caption inline-flex items-center gap-1.5">
          <svg
            viewBox="0 0 16 16"
            aria-hidden="true"
            className="size-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          >
            <path d="M2 8h3M11 8h3M5.5 5.5 3 8l2.5 2.5M10.5 5.5 13 8l-2.5 2.5" />
          </svg>
          {hasPointer ? "Arrastra para girar" : "Desliza para girar"}
        </p>
      </div>

      <div
        ref={sceneRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        role="group"
        aria-label="Capas de la arquitectura, en orden de recorrido de la petición"
        data-dragging={dragging || undefined}
        className="arch-scene group/scene relative mt-6 flex-1 select-none touch-pan-y"
        style={{ ["--layer-accent" as string]: accent }}
      >
        <div className="arch-stack">
          {/* Direction of travel through the layers. */}
          <div aria-hidden="true" className="arch-beam">
            <span className="arch-pulse" />
          </div>

          {layers.map((layer, index) => {
            const on = activeIds.includes(layer.id);
            return (
              <div
                key={layer.id}
                className="arch-plate"
                data-on={on || undefined}
                style={{
                  ["--i" as string]: index,
                  zIndex: layers.length - index,
                }}
              >
                <div className="arch-face">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-[0.9375rem] font-medium tracking-[-0.006em] text-[var(--text-primary)]">
                      {layer.name}
                    </span>
                    <code className="shrink-0 font-[family-name:var(--font-mono)] text-[0.625rem] text-[var(--text-tertiary)]">
                      {layer.path}
                    </code>
                  </div>
                  <p className="mt-1 text-[0.75rem] leading-[1.35] text-[var(--text-secondary)]">
                    {layer.rule}
                  </p>
                </div>
                {/* Extruded edge: gives the plate thickness. */}
                <div aria-hidden="true" className="arch-edge" />
              </div>
            );
          })}
        </div>
      </div>

      <p className="type-caption mt-5 flex items-center gap-2">
        <span
          aria-hidden="true"
          className="h-px w-6 shrink-0"
          style={{ background: accent }}
        />
        La petición baja hasta servicios y la respuesta vuelve. Solo servicios
        cruza al exterior.
      </p>
    </div>
  );
}

const HOVER_QUERY = "(hover: hover)";

function subscribeHover(onChange: () => void) {
  const media = window.matchMedia(HOVER_QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function getHoverSnapshot() {
  return window.matchMedia(HOVER_QUERY).matches;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}
