"use client";

import { useCallback, useEffect, useState } from "react";

/** Matches --ground in globals.css for each theme. */
const CHROME = { dark: "#0a121c", light: "#edf1f5" } as const;

/* <meta name="theme-color"> is static in the document and ships dark with it,
   so it has to be retinted whenever the actual theme isn't dark — on mount for
   a returning light-theme visitor, and on every toggle after that. */
function syncChrome(dark: boolean) {
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", dark ? CHROME.dark : CHROME.light);
}

/**
 * Reads the theme already applied to <html> — dark, unless the bootstrap script
 * in layout.tsx removed it for a stored light preference — then keeps the class,
 * localStorage and the browser chrome in sync on toggle.
 */
export function useTheme() {
  // Dark is the server-rendered default, so start there and let the effect
  // correct it for the returning light-theme visitor.
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const dark = document.documentElement.classList.contains("dark");
    setIsDark(dark);
    syncChrome(dark);
  }, []);

  const toggle = useCallback(() => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    syncChrome(next);

    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // Private browsing can reject writes; the class still applies for this visit.
    }
    setIsDark(next);
  }, []);

  return { isDark, toggle };
}
