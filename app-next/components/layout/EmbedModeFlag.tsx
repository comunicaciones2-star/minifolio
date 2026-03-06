"use client";

import { useEffect } from "react";

export function EmbedModeFlag() {
  useEffect(() => {
    const root = document.documentElement;
    const isEmbedded = window.self !== window.top;

    if (isEmbedded) {
      root.classList.add("is-embedded");
    }

    return () => {
      root.classList.remove("is-embedded");
    };
  }, []);

  return null;
}
