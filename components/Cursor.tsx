"use client";

import { useEffect, useRef, useState } from "react";

/** How far the disc closes on the pointer each frame. Lower = more lag. */
const EASE = 0.22;

/* What counts as clickable. Kept in one place so the disc's hover state and the
   things that actually respond to a click never disagree. */
const INTERACTIVE = [
  "a[href]",
  "button",
  "summary",
  "select",
  '[role="option"]',
  '[role="button"]',
].join(", ");

/**
 * Replaces the system pointer with two layers: a hairline disc that shades what
 * it passes over and trails slightly behind, and a small dot pinned to the true
 * pointer position so precision is never lost. The disc opens over anything
 * clickable and snaps shut on press.
 *
 * Fine pointers only — there is nothing to follow on a touchscreen, and a stray
 * disc parked in the corner is worse than no pointer at all.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const discRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setEnabled(fine.matches);
    sync();
    // Plugging in a mouse, or dragging the window to a touch display, flips this.
    fine.addEventListener("change", sync);
    return () => fine.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const disc = discRef.current;
    const dot = dotRef.current;
    if (!disc || !dot) return;

    // Under reduced motion the disc still tracks, it just stops trailing.
    const trail = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let pointerX = 0;
    let pointerY = 0;
    let discX = 0;
    let discY = 0;
    let onScreen = false;
    let frame = 0;

    const setVisible = (visible: boolean) => {
      onScreen = visible;
      disc.dataset.visible = String(visible);
      dot.dataset.visible = String(visible);
    };

    const move = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;

      if (!onScreen) {
        // Land under the pointer on the first move rather than flying in from
        // the top-left corner.
        discX = pointerX;
        discY = pointerY;
        setVisible(true);
      }

      const target = event.target instanceof Element ? event.target : null;
      /* Over a text field the caret marks the insertion point and nothing else
         can stand in for it, so both layers step aside and the native one shows
         through — see the `cursor: text` exception in globals.css. */
      const overText = Boolean(target?.closest("input, textarea"));
      disc.dataset.text = String(overText);
      dot.dataset.text = String(overText);
      disc.dataset.hover = String(!overText && Boolean(target?.closest(INTERACTIVE)));
    };

    // Named rather than built inline, so removeEventListener gets the same
    // reference back on cleanup.
    const pressOn = () => {
      disc.dataset.press = "true";
    };
    const pressOff = () => {
      disc.dataset.press = "false";
    };

    const leave = () => setVisible(false);

    const tick = () => {
      const factor = trail ? EASE : 1;
      discX += (pointerX - discX) * factor;
      discY += (pointerY - discY) * factor;
      // translate3d for the position, then -50% to centre on it. Transform only,
      // so this never touches layout.
      disc.style.transform = `translate3d(${discX}px, ${discY}px, 0) translate(-50%, -50%)`;
      dot.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0) translate(-50%, -50%)`;
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", pressOn, { passive: true });
    window.addEventListener("pointerup", pressOff, { passive: true });
    // Leaving the window or tabbing away should not leave a disc stranded at the edge.
    document.addEventListener("pointerleave", leave);
    window.addEventListener("blur", leave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", pressOn);
      window.removeEventListener("pointerup", pressOff);
      document.removeEventListener("pointerleave", leave);
      window.removeEventListener("blur", leave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      {/* Nested spans carry the size and scale: the outer element's transform is
          owned by the animation frame, so a CSS transition there would fight it. */}
      <div ref={discRef} aria-hidden className="pointer-disc" data-visible="false">
        <span />
      </div>
      <div ref={dotRef} aria-hidden className="pointer-dot" data-visible="false">
        <span />
      </div>
    </>
  );
}
