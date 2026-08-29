import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

type Props = {
  /** Raw value like "200+", "24", "3 Niveaux" — digits are animated. */
  value: string;
  className?: string;
  duration?: number;
};

/** Animated count-up for stat figures. Non-numeric parts are preserved. */
export function Counter({ value, className, duration = 1600 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();

  const target = Number(value.match(/\d+/)?.[0] ?? 0);
  const [n, setN] = useState(reduced || !target ? target : 0);

  useEffect(() => {
    if (!inView || reduced || !target) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, target, duration]);

  const display = target ? value.replace(String(target), String(n)) : value;

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
