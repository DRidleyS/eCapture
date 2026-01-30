"use client";

import React, { useState, useEffect, useRef } from "react";
import MatterportEmbed from "./MatterportEmbed";

interface ServiceCardProps {
  title: string;
  description: React.ReactNode;
  color: string;
  modelId: string;
  link: string;
  forceLoad?: boolean;
}

export default function ServiceCard({
  title,
  description,
  color,
  modelId,
  link,
  forceLoad,
}: ServiceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDesktop, setIsDesktop] = React.useState(false);
  const [loadIframe, setLoadIframe] = useState(Boolean(forceLoad));
  const iframeRef = useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    // Only run on client
    const checkDesktop = () => {
      setIsDesktop(window.matchMedia("(min-width: 768px)").matches);
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  // Always expanded on desktop (after hydration)
  const expanded = isDesktop ? true : isExpanded;

  React.useEffect(() => {
    if (isDesktop && !isExpanded) setIsExpanded(true);
    if (!isDesktop && isExpanded) setIsExpanded(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDesktop]);

  useEffect(() => {
    if (forceLoad) setLoadIframe(true);
  }, [forceLoad]);

  useEffect(() => {
    if (loadIframe) return;
    const el = iframeRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoadIframe(true);
          obs.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [loadIframe]);

  return (
    <div
      className={`rounded-xl shadow-lg overflow-hidden transition-all duration-500 ${
        isDesktop ? "w-[80vw] max-w-4xl mb-8 cursor-default" : "cursor-pointer"
      } ${expanded ? "" : "aspect-square"}`}
      style={{
        backgroundColor: expanded ? "rgba(255, 255, 255, 0.1)" : color,
      }}
      onClick={() => !isDesktop && setIsExpanded(!isExpanded)}
      onMouseEnter={() => !isDesktop && setIsExpanded(true)}
      onMouseLeave={() => !isDesktop && setIsExpanded(false)}
    >
      {/* Collapsed State - Just Title (mobile only) */}
      {!expanded && (
        <div className="h-full flex items-center justify-center p-8">
          <h3 className="text-3xl font-bold text-white text-center">{title}</h3>
        </div>
      )}

      {/* Expanded State - Full Content */}
      {expanded && (
        <div className="bg-white/10 backdrop-blur-md p-8 h-full overflow-auto">
          <h3 className="text-2xl font-semibold text-white mb-4">{title}</h3>
          <div className="text-white/80 text-lg mb-6">{description}</div>
          <div
            className="rounded-lg overflow-hidden"
            style={{ height: "480px" }}
            ref={iframeRef}
          >
            <MatterportEmbed
              modelId={modelId}
              forceLoad={loadIframe}
              prefetchMargin="800px"
            />
          </div>
        </div>
      )}
    </div>
  );
}
