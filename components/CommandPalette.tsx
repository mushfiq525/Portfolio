"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { profile, sections } from "@/content/profile";

type Action = {
  id: string;
  label: string;
  hint: string;
  run: () => void;
};

type Props = {
  open: boolean;
  onClose: () => void;
  /** Owned by Header so the header icon and this row stay in sync. */
  isDark: boolean;
  onToggleTheme: () => void;
};

export default function CommandPalette({ open, onClose, isDark, onToggleTheme }: Props) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const actions = useMemo<Action[]>(() => {
    const goTo = (id: string) => () => {
      document.getElementById(id)?.scrollIntoView({ block: "start" });
    };

    return [
      ...sections.map((section) => ({
        id: `go-${section.id}`,
        label: section.label,
        hint: "Jump to section",
        run: goTo(section.id),
      })),
      {
        id: "theme",
        label: isDark ? "Switch to light theme" : "Switch to dark theme",
        hint: "Appearance",
        run: onToggleTheme,
      },
      {
        id: "resume",
        label: "Open résumé",
        hint: "PDF",
        run: () => window.open(profile.resume, "_blank"),
      },
      {
        id: "email",
        label: "Copy email address",
        hint: profile.email,
        run: () => void navigator.clipboard?.writeText(profile.email),
      },
      {
        id: "github",
        label: "Open GitHub profile",
        hint: "github.com/mushfiq525",
        run: () => window.open("https://github.com/mushfiq525", "_blank"),
      },
    ];
  }, [isDark, onToggleTheme]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter(
      (action) =>
        action.label.toLowerCase().includes(q) || action.hint.toLowerCase().includes(q),
    );
  }, [actions, query]);

  // Reset and focus each time it opens, then hand focus back to whatever
  // opened it so keyboard users don't get dropped at the top of the page.
  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    setQuery("");
    setActive(0);
    inputRef.current?.focus();
    return () => previouslyFocused?.focus?.();
  }, [open]);

  // Clamp the highlight when the result set shrinks under a new query.
  useEffect(() => {
    setActive((current) => Math.min(current, Math.max(results.length - 1, 0)));
  }, [results.length]);

  // Lock background scroll while open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  // Keep the highlighted row in view during arrow navigation.
  useEffect(() => {
    listRef.current?.children[active]?.scrollIntoView({ block: "nearest" });
  }, [active]);

  if (!open) return null;

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
      return;
    }
    /* aria-modal, so focus must not escape to the page underneath. The input is
       the only tab stop in here, which makes holding focus the whole trap. */
    if (event.key === "Tab") {
      event.preventDefault();
      inputRef.current?.focus();
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((current) => (current + 1) % Math.max(results.length, 1));
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((current) => (current - 1 + results.length) % Math.max(results.length, 1));
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      const choice = results[active];
      if (choice) {
        choice.run();
        onClose();
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[12vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <button
        type="button"
        aria-label="Close command palette"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-ink/45 backdrop-blur-[2px]"
      />

      <div
        className="relative w-full max-w-lg overflow-hidden rounded-sm border border-line bg-surface shadow-2xl"
        onKeyDown={handleKeyDown}
      >
        <div className="flex items-center gap-3 border-b border-line px-4">
          <span aria-hidden className="font-mono text-xs text-detect">
            &gt;
          </span>
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Jump to a section, or run a command"
            aria-label="Search sections and commands"
            role="combobox"
            aria-expanded
            aria-autocomplete="list"
            aria-controls="palette-list"
            /* Focus stays here while arrowing, so the highlighted row has to be
               announced through activedescendant rather than by moving focus. */
            aria-activedescendant={
              results[active] ? `palette-option-${results[active].id}` : undefined
            }
            /* Ring suppressed here only: focus is trapped on this input for as
               long as the palette is open, so the caret and the highlighted row
               are what indicate position — a ring around the full-width field
               would just outline the dialog's own top edge. */
            className="w-full bg-transparent py-4 font-mono text-sm outline-none placeholder:text-muted"
          />
          <kbd className="hidden shrink-0 border border-line px-1.5 py-0.5 font-mono text-[10px] text-muted sm:block">
            esc
          </kbd>
        </div>

        {results.length === 0 ? (
          <p className="px-4 py-8 text-center font-mono text-xs text-muted">
            Nothing matches “{query}”.
          </p>
        ) : (
          <ul
            ref={listRef}
            id="palette-list"
            role="listbox"
            aria-label="Sections and commands"
            className="max-h-[52vh] overflow-y-auto py-2"
          >
            {results.map((action, index) => (
              // Rows are options, not buttons: a listbox's children must be
              // options, and they must not be tab stops while the input has focus.
              <li
                key={action.id}
                id={`palette-option-${action.id}`}
                role="option"
                aria-selected={index === active}
                onClick={() => {
                  action.run();
                  onClose();
                }}
                onMouseEnter={() => setActive(index)}
                className={`flex cursor-pointer items-center justify-between gap-4 px-4 py-2.5 text-left transition-colors ${
                  index === active ? "bg-surface-2" : ""
                }`}
              >
                <span className="flex items-center gap-3 text-sm">
                  <span
                    aria-hidden
                    className={`size-1.5 shrink-0 ${
                      index === active ? "bg-detect" : "bg-line"
                    }`}
                  />
                  {action.label}
                </span>
                <span className="shrink-0 font-mono text-[10px] tracking-wide text-muted">
                  {action.hint}
                </span>
              </li>
            ))}
          </ul>
        )}

        <div className="flex items-center gap-4 border-t border-line px-4 py-2.5 font-mono text-[10px] text-muted">
          <span>↑↓ navigate</span>
          <span>↵ select</span>
          <span>esc close</span>
        </div>
      </div>
    </div>
  );
}
