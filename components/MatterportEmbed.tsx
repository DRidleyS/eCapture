"use client";

import React, { useEffect, useRef, useState } from "react";

interface MatterportEmbedProps {
  modelId: string;
  // Load immediately if true
  forceLoad?: boolean;
  // Distance from viewport at which to prefetch connections (e.g. '400px')
  prefetchMargin?: string;
}

export default function MatterportEmbed({
  modelId,
  forceLoad = false,
  prefetchMargin = "800px",
}: MatterportEmbedProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [shouldPrefetch, setShouldPrefetch] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(forceLoad);

  const iframeSrc = `https://my.matterport.com/show/?m=${modelId}`;

  // Observe for prefetch (when near viewport) and load (when in viewport)
  useEffect(() => {
    if (forceLoad) return;
    const prefetchObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldPrefetch(true);
            prefetchObserver.disconnect();
          }
        });
      },
      { root: null, rootMargin: prefetchMargin },
    );

    const loadObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            loadObserver.disconnect();
          }
        });
      },
      { root: null, rootMargin: "0px" },
    );

    const el = containerRef.current;
    if (el) {
      prefetchObserver.observe(el);
      loadObserver.observe(el);
    }

    return () => {
      prefetchObserver.disconnect();
      loadObserver.disconnect();
    };
  }, [forceLoad, prefetchMargin]);

  // Add preconnect/dns-prefetch links when prefetech triggered
  useEffect(() => {
    if (!shouldPrefetch) return;
    try {
      const url = new URL(iframeSrc).origin;
      // preconnect
      if (!document.querySelector(`link[rel="preconnect"][href="${url}"]`)) {
        const l = document.createElement("link");
        l.rel = "preconnect";
        l.href = url;
        l.crossOrigin = "";
        document.head.appendChild(l);
      }
      // dns-prefetch
      if (!document.querySelector(`link[rel="dns-prefetch"][href="${url}"]`)) {
        const l2 = document.createElement("link");
        l2.rel = "dns-prefetch";
        l2.href = url;
        document.head.appendChild(l2);
      }
    } catch (e) {
      // ignore
    }
  }, [shouldPrefetch, iframeSrc]);

  // allow manual prefetch on hover/click
  const triggerPrefetch = () => setShouldPrefetch(true);

  return (
    <div
      ref={containerRef}
      style={{ position: "relative", paddingTop: "56.25%" }}
    >
      {shouldLoad ? (
        <iframe
          src={iframeSrc}
          frameBorder="0"
          allow="fullscreen; vr"
          allowFullScreen
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        />
      ) : (
        <div
          className="w-full h-full flex items-center justify-center bg-gray-800 text-white rounded"
          style={{ position: "absolute", inset: 0 }}
          onMouseEnter={triggerPrefetch}
          onFocus={triggerPrefetch}
        >
          <div className="text-center">
            <div className="mb-3">Preview unavailable</div>
            <button
              className="bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded"
              onClick={() => setShouldLoad(true)}
            >
              Load Tour
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
