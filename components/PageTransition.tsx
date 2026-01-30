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

  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");

      if (link && link.href && link.href.startsWith(window.location.origin)) {
        const url = new URL(link.href);
        if (url.pathname !== pathname) {
          e.preventDefault();
          setIsTransitioning(true);
          setPendingRoute(url.pathname);
          setRouteColor(getRouteColor(url.pathname));
        }
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [pathname]);

  React.useEffect(() => {
    if (pendingRoute) {
      const timer = setTimeout(() => {
        router.push(pendingRoute);
        setPendingRoute(null);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [pendingRoute, router]);

  React.useEffect(() => {
    if (isTransitioning && !pendingRoute) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 3500);

      return () => clearTimeout(timer);
    }
  }, [isTransitioning, pendingRoute]);

  return (
    <>
      {isTransitioning && (
        <div
          className="fixed inset-0 z-9999 flex items-center justify-center overflow-hidden"
          aria-hidden
        >
          <style>{`
            .pt-bg { opacity: 0; animation: pt-fade-in 0.35s ease-out forwards; }
            @keyframes pt-fade-in { from { opacity: 0 } to { opacity: 1 } }
            .pt-stars > * { will-change: transform, opacity; transition: opacity 900ms linear; opacity: 0.9 }
            .pt-letter { stroke-dasharray: 290; stroke-dashoffset: 290; animation: pt-draw 900ms ease-out forwards; }
            @keyframes pt-draw { to { stroke-dashoffset: 0 } }
          `}</style>

          <div className="absolute inset-0 pt-bg bg-black/95" />

          <div className="absolute inset-0 pt-stars" aria-hidden>
            {[...Array(20)].map((_, i) => {
              const size = Math.round(Math.random() * 3) + 1;
              const left = Math.random() * 100;
              const top = Math.random() * 100;
              const delay = Math.random() * 800;
              return (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    width: `${size}px`,
                    height: `${size}px`,
                    left: `${left}%`,
                    top: `${top}%`,
                    background: "white",
                    borderRadius: "50%",
                    opacity: 0.9,
                    transform: "translateZ(0)",
                    transitionDelay: `${delay}ms`,
                  }}
                />
              );
            })}
          </div>

          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid meet"
            className="absolute inset-0 pointer-events-none"
            style={{ willChange: "opacity, transform" }}
          >
            <defs>
              <filter
                id="softGlow"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feGaussianBlur in="SourceGraphic" stdDeviation="6" />
              </filter>
            </defs>
            <path
              d="M 20 50 L 75 50 Q 80 30, 70 20 Q 60 10, 45 10 Q 30 10, 20 20 Q 10 30, 10 45 Q 10 60, 20 70 Q 30 80, 45 80 Q 60 80, 70 70 Q 76 62, 78 50 Q 78 54, 79 58"
              className="pt-letter"
              style={{
                stroke: routeColor,
                fill: "none",
                strokeWidth: 6,
                filter: "url(#softGlow)",
                strokeLinecap: "round",
                strokeLinejoin: "round",
              }}
            />
          </svg>
        </div>
      )}
      {children}
    </>
  );
}
