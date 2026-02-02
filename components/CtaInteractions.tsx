"use client";

import React from "react";

function prefersReducedMotion() {
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

export default function CtaInteractions() {
  React.useEffect(() => {
    const running = new WeakMap<HTMLElement, Animation>();

    const HOVER_SCALE = 1.06;

    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const el = target.closest(".cta-interactive") as HTMLElement | null;
      if (!el) return;

      if (prefersReducedMotion()) return;

      try {
        running.get(el)?.cancel();

        // If the element is currently hovered, its "rest" transform is already scaled.
        // Animate relative to that base to avoid a snap/jitter at the end.
        const base = el.matches(":hover") ? HOVER_SCALE : 1;
        const down = base * 0.94;
        const up = base * 1.08;

        // Compositor-friendly bounce (smooth vs toggling CSS classes/state)
        const anim = el.animate(
          [
            { transform: `translateZ(0) scale(${base})`, offset: 0 },
            { transform: `translateZ(0) scale(${down})`, offset: 0.3 },
            { transform: `translateZ(0) scale(${up})`, offset: 0.65 },
            { transform: `translateZ(0) scale(${base})`, offset: 1 },
          ],
          {
            duration: 420,
            easing: "cubic-bezier(0.2, 0.9, 0.15, 1)",
            fill: "both",
          },
        );

        running.set(el, anim);

        anim.onfinish = () => {
          // Cleanup to avoid holding references
          if (running.get(el) === anim) running.delete(el);
        };
      } catch {
        // If WAAPI isn't available, we silently fall back to CSS.
      }
    };

    // Capture so we catch it before navigation/route handling.
    document.addEventListener("pointerdown", onPointerDown, true);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown, true);
    };
  }, []);

  return null;
}
