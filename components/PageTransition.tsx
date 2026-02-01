"use client";

import { usePathname, useRouter } from "next/navigation";
import React from "react";

const getRouteColor = (route: string): string => {
  if (route.includes("/real")) return "#60a5fa"; // blue
  if (route.includes("/rentals")) return "#34d399"; // emerald
  if (route.includes("/insurance")) return "#fbbf24"; // amber
  if (route.includes("/ops")) return "#a78bfa"; // violet
  if (route.includes("/aec")) return "#ef4444"; // red
  return "#ff6b6b"; // default red
};

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const [pendingRoute, setPendingRoute] = React.useState<string | null>(null);
  const [routeColor, setRouteColor] = React.useState("#ff6b6b");
  const [isInitialLoading, setIsInitialLoading] = React.useState(true);

  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");

      if (link && link.href && link.href.startsWith(window.location.origin)) {
        const url = new URL(link.href);
        // If clicking the home link while already on home, reload immediately
        // and avoid playing the overlay here (initial mount already plays it).
        if (url.pathname === pathname && pathname === "/") {
          e.preventDefault();
          window.location.reload();
          return;
        }

        // Otherwise animate on link click for same-origin links. If it's the same
        // path (not home), we'll reload after the animation; otherwise, push to new route.
        e.preventDefault();
        setIsTransitioning(true);
        setPendingRoute(url.pathname);
        setRouteColor(getRouteColor(url.pathname));
      }
    };

    document.addEventListener("click", handleClick);
    // listen to programmatic navigation requests (e.g., buttons)
    const handleProgrammatic = (ev: Event) => {
      const custom = ev as CustomEvent<{ pathname: string }>;
      const pathnameTo = custom?.detail?.pathname;
      if (typeof pathnameTo === "string") {
        // if it's home->home, reload immediately
        if (pathnameTo === pathname && pathname === "/") {
          window.location.reload();
          return;
        }
        setIsTransitioning(true);
        setPendingRoute(pathnameTo);
        setRouteColor(getRouteColor(pathnameTo));
      }
    };
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
  }, [pathname]);

  React.useEffect(() => {
    if (pendingRoute) {
      const timer = setTimeout(() => {
        if (pendingRoute === pathname) {
          // If user clicked a link to the same path, force a reload.
          window.location.reload();
        } else {
          // Use a hard navigation here to ensure the transition always leads
          // to the target page even if router.push has edge cases in this setup.
          window.location.assign(pendingRoute);
        }
        setPendingRoute(null);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [pendingRoute, router, pathname]);

  React.useEffect(() => {
    // When a transition starts without a pendingRoute (initial or after
    // navigation), hide the overlay after the full animation time.
    if (isTransitioning && !pendingRoute) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        // If this was the initial load, mark it complete so the page becomes visible
        if (isInitialLoading) setIsInitialLoading(false);
      }, 3500);

      return () => clearTimeout(timer);
    }
  }, [isTransitioning, pendingRoute, isInitialLoading]);

  // Start the initial loading animation on first mount. Keep `isInitialLoading`
  // true until the first animation completes so children can render in the
  // background while the overlay plays on top.
  React.useEffect(() => {
    setIsTransitioning(true);
    setRouteColor(getRouteColor(pathname));
    const initialTimer = setTimeout(() => {
      // Allow the isTransitioning effect to clear the overlay and mark initial done
      setPendingRoute(null);
    }, 50);

    return () => clearTimeout(initialTimer);
    // run on mount only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isTransitioning && (
        <div className="fixed inset-0 z-[200000] flex items-center justify-center overflow-hidden">
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
                animation: fadeInBg 0.3s ease-out 0.5s forwards;
                opacity: 0;
              }
              .stars-layer {
                animation: fadeInStars 0.3s ease-out forwards;
                opacity: 0;
              }
              .transition-container {
                animation: fadeOutAll 0.75s ease-out 2.75s forwards;
              }
            `}
          </style>

          <div className="absolute inset-0 transition-container">
            {/* Black background - fades in at 0.5s */}
            <div className="absolute inset-0 bg-black bg-layer" />

            {/* Starry background - fades in immediately */}
            <div className="absolute inset-0 stars-layer">
              {[...Array(100)].map((_, i) => (
                <div
                  key={i}
                  className="absolute bg-white rounded-full animate-pulse"
                  style={{
                    width: Math.random() * 3 + 1 + "px",
                    height: Math.random() * 3 + 1 + "px",
                    left: Math.random() * 100 + "%",
                    top: Math.random() * 100 + "%",
                    animationDelay: Math.random() * 2 + "s",
                    animationDuration: Math.random() * 3 + 2 + "s",
                  }}
                />
              ))}
            </div>

            <svg
              width="100%"
              height="100%"
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid meet"
              className="absolute inset-0"
              style={{ filter: "blur(0px)" }}
            >
              <defs>
                <filter
                  id="softGlow"
                  x="-200%"
                  y="-200%"
                  width="500%"
                  height="500%"
                  filterUnits="objectBoundingBox"
                >
                  <feGaussianBlur
                    in="SourceGraphic"
                    stdDeviation="2"
                    result="blur1"
                  />
                  <feGaussianBlur
                    in="SourceGraphic"
                    stdDeviation="5"
                    result="blur2"
                  />
                  <feGaussianBlur
                    in="SourceGraphic"
                    stdDeviation="10"
                    result="blur3"
                  />
                  <feGaussianBlur
                    in="SourceGraphic"
                    stdDeviation="20"
                    result="blur4"
                  />
                  <feGaussianBlur
                    in="SourceGraphic"
                    stdDeviation="40"
                    result="blur5"
                  />
                  <feMerge>
                    <feMergeNode in="blur5" />
                    <feMergeNode in="blur4" />
                    <feMergeNode in="blur3" />
                    <feMergeNode in="blur2" />
                    <feMergeNode in="blur1" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <style>
                {`
                @keyframes drawIn {
                  0% { stroke-dashoffset: 280; }
                  100% { stroke-dashoffset: 0; }
                }
                @keyframes neonPulse {
                  0%, 100% { opacity: 0.9; }
                  50% { opacity: 1; }
                }
                @keyframes delayedDraw {
                  0%, 50% { stroke-dashoffset: 290; opacity: 0; }
                  51% { opacity: 1; }
                  100% { stroke-dashoffset: 0; opacity: 1; }
                }
                .e-letter {
                  stroke-width: 6;
                  fill: none;
                  stroke-dasharray: 290;
                  animation: delayedDraw 2s ease-out forwards, neonPulse 2s ease-in-out 1.5s infinite;
                  filter: url(#softGlow);
                  stroke-linecap: round;
                  stroke-linejoin: round;
                }
              `}
              </style>
              <path
                d="M 20 50 L 75 50 Q 80 30, 70 20 Q 60 10, 45 10 Q 30 10, 20 20 Q 10 30, 10 45 Q 10 60, 20 70 Q 30 80, 45 80 Q 60 80, 70 70 Q 76 62, 78 50 Q 78 54, 79 58"
                className="e-letter"
                style={{ stroke: routeColor }}
              />
            </svg>
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
