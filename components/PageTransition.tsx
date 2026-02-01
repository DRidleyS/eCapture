"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";

type StarMode = "mobile" | "desktop";

type HyperspaceParticle = {
  dx: number;
  dy: number;
  hue: number;
  depth: number;
  baseRadius: number;
  thickness: number;
};

function createMulberry32(seed0: number) {
  let seed = seed0 >>> 0;
  return () => {
    seed += 0x6d2b79f5;
    let t = seed;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function HyperspaceCanvas({
  seed,
  durationMs,
  mode,
}: {
  seed: number;
  durationMs: number;
  mode: StarMode;
}) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rand = createMulberry32(seed);
    const particleCount = mode === "mobile" ? 120 : 200;
    const particles: HyperspaceParticle[] = Array.from(
      { length: particleCount },
      () => {
        const angle = rand() * Math.PI * 2;
        return {
          dx: Math.cos(angle),
          dy: Math.sin(angle),
          hue: Math.floor(rand() * 360),
          depth: Math.pow(rand(), 2.2),
          baseRadius: Math.pow(rand(), 0.62),
          thickness: 0.5 + rand() * 1.6,
        };
      },
    );

    let raf = 0;
    let disposed = false;

    const resize = () => {
      const dprCap = mode === "mobile" ? 1 : 2;
      const dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, dprCap));
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const start = performance.now();
    const duration = Math.max(500, durationMs);

    const draw = (now: number) => {
      if (disposed) return;

      const t = Math.min(1, (now - start) / duration);

      // Sequence: appear -> jump -> land
      // Slower beginning + earlier landing fade.
      const appearEnd = 0.24;
      const jumpEnd = 0.78;
      const landStart = 0.8;
      const appear = easeOutCubic(clamp01(t / appearEnd));
      const jump = easeOutCubic(
        clamp01((t - appearEnd) / (jumpEnd - appearEnd)),
      );
      const land = clamp01((t - landStart) / (1 - landStart));

      const w = window.innerWidth;
      const h = window.innerHeight;
      const cx = w / 2;
      const cy = h / 2;
      const maxR = Math.max(w, h) * 1.25;

      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";

      // Quick center flash to sell the jump
      const flash = Math.max(0, (0.22 - t) / 0.22);
      if (flash > 0) {
        const g = ctx.createRadialGradient(
          cx,
          cy,
          0,
          cx,
          cy,
          Math.min(w, h) * 0.22,
        );
        g.addColorStop(0, `rgba(255,255,255,${0.72 * flash})`);
        g.addColorStop(0.35, `rgba(180,220,255,${0.22 * flash})`);
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      }

      const glowStrength = mode === "mobile" ? 0.22 : 0.55;
      const blurBase = mode === "mobile" ? 2 : 10;
      const blurNear = mode === "mobile" ? 6 : 18;

      for (const star of particles) {
        const near = 1 - star.depth;
        const dx = star.dx;
        const dy = star.dy;

        // Start distributed across the screen, then accelerate outward.
        const rBase = star.baseRadius * maxR * 0.62;
        const speed = 0.22 + near * 1.45;
        const rJump = maxR * jump * speed;
        const r = rBase + (rJump - rBase) * jump;

        const x = cx + dx * r;
        const y = cy + dy * r;

        const alpha = (0.1 + near * 0.95) * appear * (1 - land);
        if (alpha <= 0.001) continue;

        const trail = (6 + near * 52) * jump;
        const x0 = x - dx * trail;
        const y0 = y - dy * trail;

        ctx.lineCap = "round";
        ctx.lineWidth = star.thickness + near * 2.0;
        ctx.shadowBlur = blurBase + near * blurNear;
        ctx.shadowColor = `hsla(${star.hue}, 100%, 70%, ${glowStrength * alpha})`;
        ctx.strokeStyle = `rgba(255,255,255,${Math.min(1, alpha + 0.12).toFixed(3)})`;

        ctx.beginPath();
        if (jump < 0.06) {
          ctx.moveTo(x, y);
          ctx.lineTo(x, y);
        } else {
          ctx.moveTo(x0, y0);
          ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      ctx.globalCompositeOperation = "source-over";

      if (t < 1) raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      disposed = true;
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, [seed, durationMs]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0"
      style={{ pointerEvents: "none" }}
      aria-hidden
    />
  );
}

function buildStarfieldBoxShadow(seed0: number, count: number, mode: StarMode) {
  const rand = createMulberry32(seed0);
  const shadows: string[] = [];

  for (let i = 0; i < count; i++) {
    const x = (rand() * 100).toFixed(2);
    const y = (rand() * 100).toFixed(2);

    if (mode === "mobile") {
      const a = 0.78 + rand() * 0.18;
      const bright = rand() > 0.86;
      const blur = bright ? 1 : 0;
      const spread = bright ? 0.25 : 0;
      shadows.push(
        `${x}vw ${y}vh ${blur}px ${spread}px rgba(255,255,255,${a.toFixed(2)})`,
      );
      continue;
    }

    const a = 0.98;
    const bright = rand() > 0.76;
    const hue = Math.floor(rand() * 360);
    shadows.push(`${x}vw ${y}vh 1.6px 0.4px rgba(255,255,255,${a})`);
    if (bright) {
      shadows.push(`${x}vw ${y}vh 10px 3px rgba(255,255,255,0.65)`);
      shadows.push(`${x}vw ${y}vh 22px 7px rgba(255,255,255,0.25)`);
      shadows.push(`${x}vw ${y}vh 14px 4px hsla(${hue}, 100%, 75%, 0.22)`);
    }
  }

  return shadows.join(", ");
}

const STARFIELD_DESKTOP = buildStarfieldBoxShadow(0xdecafbad, 140, "desktop");
const STARFIELD_MOBILE = buildStarfieldBoxShadow(0x1234abcd, 60, "mobile");

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const [pendingRoute, setPendingRoute] = React.useState<string | null>(null);
  const [isInitialLoading, setIsInitialLoading] = React.useState(true);
  const [isMobile, setIsMobile] = React.useState(false);
  const [reduceMotion, setReduceMotion] = React.useState(false);
  const [transitionKey, setTransitionKey] = React.useState(0);

  // Timing: slower start, faster exit.
  const TRANSITION_TOTAL_MS = 1250;
  const NAVIGATE_AT_MS = 780;
  const FADE_OUT_START_MS = 860;
  const FADE_OUT_MS = 280;

  React.useEffect(() => {
    const mqMobile = window.matchMedia("(max-width: 768px)");
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => {
      setIsMobile(mqMobile.matches);
      setReduceMotion(mqReduce.matches);
    };
    sync();

    // Safari iOS uses addListener/removeListener
    if (mqMobile.addEventListener) mqMobile.addEventListener("change", sync);
    else mqMobile.addListener(sync);

    if (mqReduce.addEventListener) mqReduce.addEventListener("change", sync);
    else mqReduce.addListener(sync);

    return () => {
      if (mqMobile.removeEventListener)
        mqMobile.removeEventListener("change", sync);
      else mqMobile.removeListener(sync);

      if (mqReduce.removeEventListener)
        mqReduce.removeEventListener("change", sync);
      else mqReduce.removeListener(sync);
    };
  }, []);

  const showCanvas = !reduceMotion;
  const starsBoxShadow = showCanvas
    ? "none"
    : isMobile
      ? STARFIELD_MOBILE
      : STARFIELD_DESKTOP;

  const startTransition = React.useCallback((toPathname: string | null) => {
    setIsTransitioning(true);
    setPendingRoute(toPathname);
    setTransitionKey((k) => k + 1);
  }, []);

  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");
      if (
        !link ||
        !link.href ||
        !link.href.startsWith(window.location.origin)
      ) {
        return;
      }

      const url = new URL(link.href);
      if (url.pathname === pathname && pathname === "/") {
        e.preventDefault();
        window.location.reload();
        return;
      }

      e.preventDefault();
      startTransition(url.pathname);
    };

    const handleProgrammatic = (ev: Event) => {
      const custom = ev as CustomEvent<{ pathname: string }>;
      const pathnameTo = custom?.detail?.pathname;
      if (typeof pathnameTo !== "string") return;

      if (pathnameTo === pathname && pathname === "/") {
        window.location.reload();
        return;
      }

      startTransition(pathnameTo);
    };

    document.addEventListener("click", handleClick);
    window.addEventListener(
      "startPageTransition",
      handleProgrammatic as EventListener,
    );
    return () => {
      document.removeEventListener("click", handleClick);
      window.removeEventListener(
        "startPageTransition",
        handleProgrammatic as EventListener,
      );
    };
  }, [pathname, startTransition]);

  React.useEffect(() => {
    if (!isTransitioning) return;
    const routeAtStart = pendingRoute;

    const navTimer =
      typeof routeAtStart === "string"
        ? window.setTimeout(() => {
            if (routeAtStart === pathname) {
              window.location.reload();
            } else {
              router.push(routeAtStart);
            }
          }, NAVIGATE_AT_MS)
        : undefined;

    const endTimer = window.setTimeout(() => {
      setIsTransitioning(false);
      setPendingRoute(null);
      if (isInitialLoading) setIsInitialLoading(false);
    }, TRANSITION_TOTAL_MS);

    return () => {
      if (navTimer) window.clearTimeout(navTimer);
      window.clearTimeout(endTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transitionKey]);

  React.useEffect(() => {
    startTransition(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isTransitioning && (
        <div
          className="fixed inset-0 flex items-center justify-center overflow-hidden"
          style={{ zIndex: 200000, contain: "layout paint size" }}
        >
          <style>
            {`
              @keyframes fadeInBg {
                0% { opacity: 0; }
                100% { opacity: 1; }
              }
              @keyframes fadeInStars {
                0% { opacity: 0; }
                100% { opacity: 1; }
              }
              @keyframes fadeOutAll {
                0% { opacity: 1; }
                100% { opacity: 0; }
              }
              .bg-layer {
                opacity: 0;
                animation: fadeInBg 0.26s ease-out 0.34s forwards;
                will-change: opacity;
              }
              .vignette-layer {
                pointer-events: none;
                background: radial-gradient(circle at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.35) 62%, rgba(0,0,0,0.94) 100%);
                mix-blend-mode: multiply;
                opacity: 0;
                animation: fadeInBg 0.26s ease-out 0.34s forwards;
                will-change: opacity;
              }
              .stars-layer {
                /* Stars appear over live page content first, then black fades in beneath */
                animation: fadeInStars 0.28s ease-out 0.08s forwards;
                opacity: 0;
                will-change: opacity;
              }
              .transition-container {
                animation: fadeOutAll ${FADE_OUT_MS / 1000}s ease-out ${FADE_OUT_START_MS / 1000}s forwards;
                will-change: opacity;
              }
            `}
          </style>

          <div className="absolute inset-0 transition-container">
            {/* Start transparent (showing current page), then fade black in */}
            <div
              className="absolute inset-0 bg-layer"
              style={{ backgroundColor: "#000" }}
            />
            <div className="absolute inset-0 vignette-layer" />

            <div className="absolute inset-0 stars-layer">
              {showCanvas && (
                <HyperspaceCanvas
                  seed={0xfeedc0de}
                  durationMs={TRANSITION_TOTAL_MS}
                  mode={isMobile ? "mobile" : "desktop"}
                />
              )}
              {starsBoxShadow !== "none" && (
                <div
                  className="absolute left-0 top-0 w-px h-px bg-white"
                  style={{ boxShadow: starsBoxShadow }}
                  aria-hidden
                />
              )}
            </div>
          </div>
        </div>
      )}

      <div
        className={
          isInitialLoading ? "opacity-0 pointer-events-none" : "opacity-100"
        }
      >
        {children}
      </div>
    </>
  );
}
