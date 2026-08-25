"use client";

import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0 })}
      aria-label="Back to top"
      // Kept out of the tab order and hidden from AT while off-screen; the
      // header monogram already links to the top for keyboard users.
      aria-hidden={!shown}
      tabIndex={shown ? 0 : -1}
      className={`fixed right-5 bottom-5 z-30 grid size-11 place-items-center border border-line bg-surface text-muted shadow-lg transition-all duration-300 hover:border-detect hover:text-detect sm:right-8 sm:bottom-8 ${
        shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <svg viewBox="0 0 24 24" className="size-4" fill="none" aria-hidden>
        <path
          d="M12 19V5m0 0-6 6m6-6 6 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}
