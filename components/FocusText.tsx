import type { CSSProperties } from "react";

/**
 * Text whose words (or letters) resolve from soft focus one after another.
 * Rewritten for this project from React Bits "Blur Text"
 * (https://reactbits.dev/text-animations/blur-text): same blur-to-sharp
 * keyframes and stagger, but as CSS so it works inside headings, keeps the
 * real spaces in the text, needs no animation library and stays readable
 * without JavaScript or with reduced motion.
 *
 * The animation plays when a parent <Reveal> comes into view, or at once
 * when `now` is set. The text itself is never changed.
 */
export function FocusText({
  text,
  by = "words",
  now = false,
  delay = 0,
  step,
  className = "",
}: {
  text: string;
  by?: "words" | "letters";
  now?: boolean;
  delay?: number;
  step?: number;
  className?: string;
}) {
  const style = {
    "--focus-delay": `${delay}ms`,
    ...(step ? { "--focus-step": `${step}ms` } : {}),
  } as CSSProperties;

  const parts = by === "letters" ? Array.from(text) : text.split(/(\s+)/);
  let i = 0;

  return (
    <span className={`focus ${now ? "focus-now" : ""} ${className}`} style={style}>
      {parts.map((part, n) =>
        part.trim() === "" ? (
          part
        ) : (
          <span key={n} className="w" style={{ "--i": i++ } as CSSProperties}>
            {part}
          </span>
        )
      )}
    </span>
  );
}
