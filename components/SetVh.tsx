"use client";

import { useEffect } from "react";

export default function SetVh() {
  useEffect(() => {
    const setVh = () => {
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`,
      );
    };

    setVh();
    window.addEventListener("resize", setVh);
    if (window.visualViewport)
      window.visualViewport.addEventListener("resize", setVh);

    return () => {
      window.removeEventListener("resize", setVh);
      if (window.visualViewport)
        window.visualViewport.removeEventListener("resize", setVh);
    };
  }, []);

  return null;
}
