"use client";

import React from "react";

export default function ScrollIndicator() {
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY <= 50);
    };
    if (typeof window !== "undefined") onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`hidden lg:flex justify-center mt-8 transition-opacity duration-500 ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      <a
        href="#about"
        className="text-white/80 hover:text-white"
        aria-label="Scroll to about section"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12 text-white/70 animate-bounce"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </a>
    </div>
  );
}
