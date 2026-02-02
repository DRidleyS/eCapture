"use client";

import React, { useEffect, useRef, useState } from "react";
import ServiceCard from "./ServiceCard";
import AnimatedSection from "./AnimatedSection";

interface CarouselItem {
  title: string;
  description: React.ReactNode;
  color: string;
  modelId: string;
  link: string;
}

export default function ServiceCarousel({ items }: { items: CarouselItem[] }) {
  const [index, setIndex] = useState(0);
  const [incomingIndex, setIncomingIndex] = useState<number | null>(null);
  const [incomingVisible, setIncomingVisible] = useState(false);
  const [showCurrent, setShowCurrent] = useState(true);
  const timeoutRef = useRef<number | null>(null);
  const TRANSITION_MS = 700;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") changeIndex((index + 1) % items.length);
      if (e.key === "ArrowLeft")
        changeIndex((index - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length, index]);

  const clearPrevTimeout = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const changeIndex = (newIndex: number) => {
    if (newIndex === index) return;
    clearPrevTimeout();

    // Start: hide current instantly, prepare incoming slide
    setIncomingIndex(newIndex);
    setIncomingVisible(false);
    setShowCurrent(false); // hide current immediately (no fade)

    // Next frame: begin fade-in of incoming slide
    requestAnimationFrame(() => {
      setIncomingVisible(true);
      timeoutRef.current = window.setTimeout(() => {
        // Finish transition: commit new index, clear incoming
        setIndex(newIndex);
        setIncomingIndex(null);
        setIncomingVisible(false);
        setShowCurrent(true);
        timeoutRef.current = null;
      }, TRANSITION_MS);
    });
  };

  const prev = () => changeIndex((index - 1 + items.length) % items.length);
  const next = () => changeIndex((index + 1) % items.length);

  return (
    <div className="w-full flex items-center justify-center relative py-8 lg:py-12">
      <button
        onClick={prev}
        aria-label="Previous service"
        className="cta-interactive hidden lg:flex items-center justify-center absolute left-0 z-20 ml-4 w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <div
        className="w-full flex items-center justify-center relative"
        style={{ minHeight: 520 }}
      >
        {/* Current slide (no fade on hide) */}
        <div
          className={`absolute inset-0 flex items-center justify-center ${incomingIndex === null ? "opacity-100 z-20" : showCurrent ? "opacity-100 z-20" : "opacity-0 z-10 pointer-events-none"}`}
        >
          <AnimatedSection>
            <ServiceCard
              title={items[index].title}
              description={items[index].description}
              color={items[index].color}
              modelId={items[index].modelId}
              link={items[index].link}
              forceLoad={true}
            />
          </AnimatedSection>
        </div>

        {/* Incoming slide (fades in) */}
        {incomingIndex !== null && (
          <div
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ${incomingVisible ? "opacity-100 z-20" : "opacity-0 z-10 pointer-events-none"}`}
          >
            <AnimatedSection>
              <ServiceCard
                title={items[incomingIndex].title}
                description={items[incomingIndex].description}
                color={items[incomingIndex].color}
                modelId={items[incomingIndex].modelId}
                link={items[incomingIndex].link}
                forceLoad={true}
              />
            </AnimatedSection>
          </div>
        )}
      </div>

      <button
        onClick={next}
        aria-label="Next service"
        className="cta-interactive hidden lg:flex items-center justify-center absolute right-0 z-20 mr-4 w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="absolute bottom-0 right-1/2 translate-x-1/2 mb-2 flex gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => changeIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`cta-interactive w-2 h-2 rounded-full ${i === index ? "bg-white" : "bg-white/30"}`}
          />
        ))}
      </div>
    </div>
  );
}
