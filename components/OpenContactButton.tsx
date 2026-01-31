"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function OpenContactButton({
  children,
  className,
  ...rest
}: Props) {
  const router = useRouter();
  return (
    <button
      {...rest}
      className={className}
      onClick={() => router.push("/contact")}
    >
      {children}
    </button>
  );
}
