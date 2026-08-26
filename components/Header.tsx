"use client";

import { useEffect, useState } from "react";
import { profile, sections } from "@/content/profile";
import { useTheme } from "@/lib/useTheme";
import CommandPalette from "./CommandPalette";
import Image from "next/image";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isDark, toggle } = useTheme();

  // Border and blur only kick in once the page has moved.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll spy for the nav's current-section marker.
  useEffect(() => {
    const targets = sections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => element !== null);

    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const onScreen = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (onScreen[0]) setActiveSection(onScreen[0].target.id);
      },
      { rootMargin: "-20% 0px -60% 0px" },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  // Cmd/Ctrl+K opens the palette from anywhere; Escape closes the mobile menu.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setPaletteOpen((open) => !open);
      }
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  /* The panel is md:hidden, so leaving it open while the viewport grows would
     strand the state — it vanishes, then reappears on the way back down. */
  useEffect(() => {
    const wide = window.matchMedia("(min-width: 48rem)");
    const sync = () => {
      if (wide.matches) setMenuOpen(false);
    };
    sync();
    wide.addEventListener("change", sync);
    return () => wide.removeEventListener("change", sync);
  }, []);

  // Transparent bar over an opaque dropdown reads as a mistake, so the menu
  // borrows the scrolled treatment even at the top of the page.
  const barSolid = scrolled || menuOpen;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
          barSolid ? "border-b border-line bg-ground/85 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6 sm:px-8">
          <a        
            href="#top"
            className="flex items-center gap-2"
            aria-label={`${profile.name} — back to top`}
          >
            <Image src="/logo.svg" alt={profile.name} width={28} height={28} className="size-7" />
          </a>

          <nav aria-label="Sections" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {sections.map((section) => {
                const isActive = activeSection === section.id;
                return (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      aria-current={isActive ? "true" : undefined}
                      className={`flex items-center gap-2 px-3 py-2 font-mono text-[11px] tracking-[0.1em] uppercase transition-colors ${
                        isActive ? "text-ink" : "text-muted hover:text-ink"
                      }`}
                    >
                      <span
                        aria-hidden
                        className={`size-1 transition-colors ${
                          isActive ? "bg-detect" : "bg-transparent"
                        }`}
                      />
                      {section.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-1">
            {/* Keyboard idiom, so it stays on the pointer/keyboard breakpoints.
                On a phone it would open a text field and raise the soft
                keyboard, where the menu button below is what's wanted. */}
            <button
              type="button"
              onClick={() => setPaletteOpen(true)}
              className="hidden items-center gap-2 border border-line px-2.5 py-1.5 font-mono text-[10px] tracking-[0.1em] text-muted uppercase transition-colors hover:border-detect hover:text-ink md:flex"
              aria-label="Open command palette"
            >
              <svg viewBox="0 0 24 24" className="size-3.5" fill="none" aria-hidden>
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span>⌘K</span>
            </button>

            {/* size-11 is the 44px touch minimum; it tightens up once there's a
                pointer and the row gets crowded by the nav. */}
            <button
              type="button"
              onClick={toggle}
              className="grid size-11 place-items-center text-muted transition-colors hover:text-detect md:size-9"
              aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
              aria-pressed={isDark}
            >
              {isDark ? (
                <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" aria-hidden>
                  <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="2" />
                  <path
                    d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M18.7 5.3l-1.4 1.4M6.7 17.3l-1.4 1.4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" aria-hidden>
                  <path
                    d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="grid size-11 place-items-center text-muted transition-colors hover:text-detect md:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
            >
              <svg
                viewBox="0 0 24 24"
                className="size-[18px]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden
              >
                {menuOpen ? (
                  <path d="M5 5l14 14M19 5 5 19" />
                ) : (
                  <path d="M4 8h16M4 16h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {menuOpen ? (
          <nav
            id="mobile-nav"
            aria-label="Sections"
            className="border-t border-line bg-ground/95 backdrop-blur-md md:hidden"
          >
            <ul className="mx-auto max-w-6xl px-6 py-2 sm:px-8">
              {sections.map((section) => {
                const isActive = activeSection === section.id;
                return (
                  <li key={section.id} className="border-b border-line/60 last:border-0">
                    <a
                      href={`#${section.id}`}
                      onClick={() => setMenuOpen(false)}
                      aria-current={isActive ? "true" : undefined}
                      className={`flex items-center gap-3 py-3.5 font-mono text-xs tracking-[0.12em] uppercase transition-colors ${
                        isActive ? "text-ink" : "text-muted"
                      }`}
                    >
                      <span
                        aria-hidden
                        className={`size-1.5 shrink-0 ${isActive ? "bg-detect" : "bg-line"}`}
                      />
                      {section.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        ) : null}
      </header>

      {menuOpen ? (
        <button
          type="button"
          aria-label="Close menu"
          tabIndex={-1}
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-30 cursor-default bg-ink/30 md:hidden"
        />
      ) : null}

      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        isDark={isDark}
        onToggleTheme={toggle}
      />
    </>
  );
}
