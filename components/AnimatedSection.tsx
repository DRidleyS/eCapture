import React from "react";

const AnimatedSection = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const sectionRef = React.useRef<HTMLDivElement | null>(null);
  const hideTimeoutRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    const ENTER_THRESHOLD = 0.2; // become visible when >= 20%
    const EXIT_THRESHOLD = 0.05; // become hidden when <= 5%
    const HIDE_DEBOUNCE_MS = 150; // delay before hiding to avoid flashes

    const observer = new IntersectionObserver(
      ([entry]) => {
        const ratio = entry.intersectionRatio ?? 0;

        if (ratio >= ENTER_THRESHOLD) {
          if (hideTimeoutRef.current) {
            clearTimeout(hideTimeoutRef.current);
            hideTimeoutRef.current = null;
          }
          setIsVisible(true);
        } else if (ratio <= EXIT_THRESHOLD) {
          if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
          hideTimeoutRef.current = window.setTimeout(() => {
            setIsVisible(false);
            hideTimeoutRef.current = null;
          }, HIDE_DEBOUNCE_MS);
        }
      },
      {
        threshold: [0, EXIT_THRESHOLD, ENTER_THRESHOLD, 0.5],
        rootMargin: "0px 0px -10% 0px",
      },
    );

    const el = sectionRef.current;
    if (el) observer.observe(el);

    return () => {
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`transition-all duration-700 ${
        isVisible
          ? "opacity-100 scale-100 translate-y-0"
          : "opacity-0 scale-95 translate-y-8"
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
