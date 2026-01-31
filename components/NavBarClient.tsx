"use client";

import React from "react";
import { createPortal } from "react-dom";

export default function NavBarClient() {
  const [isOpen, setIsOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement | null>(null);
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);

  React.useEffect(() => {
    let previousActive: Element | null = null;

    if (isOpen) {
      previousActive = document.activeElement;
      document.body.style.overflow = "hidden";

      const container = menuRef.current;
      const focusable = container
        ? Array.from(
            container.querySelectorAll<HTMLElement>(
              'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
            ),
          )
        : [];

      focusable[0]?.focus();

      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsOpen(false);
          return;
        }

        if (e.key === "Tab" && focusable.length > 0) {
          const first = focusable[0];
          const last = focusable[focusable.length - 1];

          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            (last as HTMLElement).focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            (first as HTMLElement).focus();
          }
        }
      };

      document.addEventListener("keydown", onKeyDown);

      return () => {
        document.removeEventListener("keydown", onKeyDown);
        document.body.style.overflow = "";
        (previousActive as HTMLElement | null)?.focus?.();
      };
    }
  }, [isOpen]);

  const menu = (
    <div className="fixed inset-0 z-[100001]">
      {/* Frosted glass overlay */}
      <div
        className="absolute inset-0 bg-white/10 backdrop-blur-xl backdrop-saturate-150 z-[100000]"
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
        style={{ WebkitBackdropFilter: "blur(18px) saturate(150%)" }}
      />

      <div
        id="mobile-menu"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        className="md:hidden absolute inset-0 z-[100001]"
      >
        <div className="flex justify-between items-center p-4 border-b border-white/20">
          <span className="text-xl font-bold text-white">eCapture</span>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white"
            aria-label="Close menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)] space-y-8">
          <a
            href="/real"
            className="text-2xl text-white hover:text-blue-400 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Real Estate
          </a>
          <a
            href="/rentals"
            className="text-2xl text-white hover:text-emerald-400 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Rental Listings
          </a>
          <a
            href="/ops"
            className="text-2xl text-white hover:text-violet-400 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            ComOps
          </a>
          <a
            href="/insurance"
            className="text-2xl text-white hover:text-amber-400 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Insurance Work
          </a>
          <a
            href="/aec"
            className="text-2xl text-white hover:text-red-500 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            AEC
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden flex items-center text-white mt-[15px]"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label="Open menu"
      >
        {isOpen ? (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>

      {isOpen && typeof document !== "undefined"
        ? createPortal(menu, document.body)
        : null}
    </>
  );
}
