"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import styles from "./PathBeam.module.css";

/**
 * A line beside a long text with a light that follows the reader down it.
 * Rewritten for this project from Aceternity UI "Tracing Beam"
 * (https://ui.aceternity.com/components/tracing-beam): the same kinked SVG
 * path and scroll-driven gradient, driven by a scroll listener in place of
 * the motion dependency, in Kongruens' colours, and still when reduced
 * motion is asked for.
 */
export function PathBeam({ children, className = "" }: { children: ReactNode; className?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const grad = useRef<SVGLinearGradientElement>(null);
  const [height, setHeight] = useState(0);
  const id = useId();

  useEffect(() => {
    const el = content.current;
    if (!el) return;
    const measure = () => setHeight(el.offsetHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const el = wrap.current;
    const g = grad.current;
    if (!el || !g || !height) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      g.setAttribute("y1", "0");
      g.setAttribute("y2", String(height));
      return;
    }

    let y1 = 50;
    let y2 = 50;
    let t1 = 50;
    let t2 = 50;
    let frame = 0;

    const target = () => {
      const rect = el.getBoundingClientRect();
      // 0 when the block's top reaches mid-screen, 1 when its end does
      const p = Math.min(1, Math.max(0, (window.innerHeight * 0.55 - rect.top) / rect.height));
      t1 = 50 + (height - 50) * Math.min(1, p / 0.8);
      t2 = 50 + (height - 250) * p;
    };

    const tick = () => {
      y1 += (t1 - y1) * 0.12;
      y2 += (t2 - y2) * 0.12;
      g.setAttribute("y1", y1.toFixed(1));
      g.setAttribute("y2", y2.toFixed(1));
      frame = Math.abs(t1 - y1) > 0.5 || Math.abs(t2 - y2) > 0.5 ? requestAnimationFrame(tick) : 0;
    };

    const onScroll = () => {
      target();
      if (!frame) frame = requestAnimationFrame(tick);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [height]);

  const d = `M 1 0 V 28 l 18 24 V ${height * 0.8} l -18 24 V ${height}`;

  return (
    <div ref={wrap} className={`${styles.wrap} ${className}`}>
      <div className={styles.rail} aria-hidden="true">
        <span className={styles.dot} />
        {height ? (
          <svg viewBox={`0 0 20 ${height}`} width="20" height={height}>
            <path d={d} className={styles.track} fill="none" />
            <path d={d} fill="none" stroke={`url(#${id})`} strokeWidth="1.5" />
            <defs>
              <linearGradient ref={grad} id={id} gradientUnits="userSpaceOnUse" x1="0" x2="0" y1="50" y2="50">
                <stop stopColor="#1f3d4a" stopOpacity="0" />
                <stop stopColor="#1f3d4a" />
                <stop offset="0.325" stopColor="#3d5360" />
                <stop offset="1" stopColor="#7a93a3" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        ) : null}
      </div>
      <div ref={content}>{children}</div>
    </div>
  );
}
