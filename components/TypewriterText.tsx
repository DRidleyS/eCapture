"use client";

import React from "react";

interface TypewriterTextProps {
  items: Array<{ text: string; color: string }>;
  pauseOnInvisible?: boolean;
}

export default function TypewriterText({
  items,
  pauseOnInvisible = false,
}: TypewriterTextProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [displayText, setDisplayText] = React.useState("");
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(true);
  const ref = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    if (!pauseOnInvisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [pauseOnInvisible]);

  React.useEffect(() => {
    if (pauseOnInvisible && !isVisible) return;

    const currentItem = items[currentIndex];
    const typingSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && displayText === currentItem.text) {
      setTimeout(() => setIsDeleting(true), 2000);
      return;
    }

    if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setCurrentIndex((prev) => (prev + 1) % items.length);
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayText(
        isDeleting
          ? currentItem.text.substring(0, displayText.length - 1)
          : currentItem.text.substring(0, displayText.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [
    displayText,
    isDeleting,
    currentIndex,
    isVisible,
    items,
    pauseOnInvisible,
  ]);

  return (
    <span
      ref={ref}
      className="inline-block min-w-[300px] text-left"
      style={{ color: items[currentIndex].color }}
    >
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
}
