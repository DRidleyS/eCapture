"use client";

import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function OpenContactButton({
  children,
  className,
  onClick,
  ...rest
}: Props) {
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    try {
      onClick?.(e as any);
    } catch (err) {
      // swallow handler errors to ensure transition still fires
    }

    // Dispatch a global event so PageTransition can play the overlay
    // and then perform navigation. This avoids routing directly here
    // which would bypass the transition overlay.
    window.dispatchEvent(
      new CustomEvent("startPageTransition", {
        detail: { pathname: "/contact" },
      }),
    );
  };

  return (
    <button
      {...rest}
      className={`cta-interactive ${className ?? ""}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
