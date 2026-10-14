import { useId } from "react";
import styles from "./Atmosphere.module.css";

/**
 * Film grain over a surface. Ported from Magic UI "Noise Texture"
 * (https://magicui.design/docs/components/noise-texture): the same
 * feTurbulence filter and defaults, with the Tailwind classes moved to CSS.
 */
export function Grain({
  frequency = 0.4,
  octaves = 6,
  slope = 0.15,
  noiseOpacity = 0.6,
  className = "",
}: {
  frequency?: number;
  octaves?: number;
  slope?: number;
  noiseOpacity?: number;
  className?: string;
}) {
  const id = useId();
  return (
    <svg className={`${styles.grain} ${className}`} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <filter id={id}>
        <feTurbulence type="fractalNoise" baseFrequency={frequency} numOctaves={octaves} stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
        <feComponentTransfer>
          <feFuncR type="linear" slope={slope} />
          <feFuncG type="linear" slope={slope} />
          <feFuncB type="linear" slope={slope} />
        </feComponentTransfer>
      </filter>
      <rect width="100%" height="100%" filter={`url(#${id})`} opacity={noiseOpacity} />
    </svg>
  );
}

/**
 * Blue-hour haze behind a section.
 * Layer structure from Aura "Frosted Slate" (grain category,
 * https://auragradients.vercel.app/): a 145deg four-stop wash, a soft-light
 * radial highlight blurred 88px / 126px, and grain. The four colour stops
 * are swapped for Kongruens' own --paper tokens, so this is that gradient's
 * construction in this site's palette, not the gradient as published.
 */
export function Haze({ flip = false }: { flip?: boolean }) {
  return (
    <div className={`${styles.haze} ${flip ? styles.flip : ""}`} aria-hidden="true">
      <div className={styles.wash} />
      <div className={styles.glow} />
      <Grain className={styles.hazeGrain} frequency={0.7} octaves={4} slope={0.5} noiseOpacity={0.5} />
    </div>
  );
}

/** The brand's two overlapping circles, as a quiet ornament. */
export function Rings({ className = "" }: { className?: string }) {
  return (
    <svg className={`${styles.rings} ${className}`} viewBox="0 0 300 200" fill="none" aria-hidden="true">
      <circle cx="110" cy="100" r="88" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      <circle cx="190" cy="100" r="88" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
