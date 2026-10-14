"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { annotate } from "rough-notation";

/**
 * A hand-drawn stroke under a phrase, drawn when it scrolls into view.
 * Rewritten for this project from Magic UI "Highlighter"
 * (https://magicui.design/docs/components/highlighter): same rough-notation
 * annotation and resize handling, with an IntersectionObserver in place of
 * the motion dependency and reduced motion respected.
 */
export function Marker({
  children,
  color = "#7a93a3",
  strokeWidth = 1.6,
  duration = 900,
}: {
  children: ReactNode;
  color?: string;
  strokeWidth?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const annotation = annotate(el, {
      type: "underline",
      color,
      strokeWidth,
      animationDuration: duration,
      animate: !reduced,
      iterations: 2,
      padding: 3,
      multiline: true,
    });

    let shown = false;
    let resize: ResizeObserver | null = null;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        // wait for the parent's reveal so the stroke lands on settled text
        window.setTimeout(() => {
          annotation.show();
          shown = true;
          resize = new ResizeObserver(() => {
            if (!shown) return;
            annotation.hide();
            annotation.show();
          });
          resize.observe(document.body);
        }, reduced ? 0 : 700);
      },
      { threshold: 0.6 }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      resize?.disconnect();
      annotation.remove();
    };
  }, [color, strokeWidth, duration]);

  // rough-notation places its drawing in the annotated element's parent,
  // so the outer span is the positioned box the stroke is measured against.
  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <span ref={ref}>{children}</span>
    </span>
  );
}
