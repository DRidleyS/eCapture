"use client";

import { usePathname, useRouter } from "next/navigation";
import React from "react";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const [pendingRoute, setPendingRoute] = React.useState<string | null>(null);

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
        <div className="fixed inset-0 z-9999 flex items-center justify-center overflow-hidden">
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
                  0%, 50% { stroke-dashoffset: 280; opacity: 0; }
                  51% { opacity: 1; }
                  100% { stroke-dashoffset: 0; opacity: 1; }
                }
                .e-letter {
                  stroke: #ff6b6b;
                  stroke-width: 6;
                  fill: none;
                  stroke-dasharray: 280;
                  animation: delayedDraw 2s ease-out forwards, neonPulse 2s ease-in-out 1.5s infinite;
                  filter: url(#softGlow);
                  stroke-linecap: round;
                  stroke-linejoin: round;
                }
              `}
              </style>
              <path
                d="M 20 50 L 75 50 Q 80 30, 70 20 Q 60 10, 45 10 Q 30 10, 20 20 Q 10 30, 10 45 Q 10 60, 20 70 Q 30 80, 45 80 Q 60 80, 70 70 Q 76 62, 78 50"
                className="e-letter"
              />
            </svg>
          </div>
        </div>
      )}
      {children}
    </>
  );
}
