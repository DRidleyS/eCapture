"use client";

import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function OpenContactButton({
  children,
  className,
  ...rest
}: Props) {
  return (
    <button
      {...rest}
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent("openContactForm"))}
    >
      {children}
    </button>
  );
}
