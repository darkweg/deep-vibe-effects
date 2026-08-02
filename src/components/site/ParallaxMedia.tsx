import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useRef } from "react";

type Props = {
  src: string;
  alt: string;
  className?: string;
  strength?: number;
  priority?: boolean;
};

/** Image inside a cinematic mask with scroll-driven parallax + hover duotone. */
export function ParallaxMedia({ src, alt, className, strength = 60, priority }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-strength, strength]);

  return (
    <div ref={ref} className={`media-fx scanlines ${className ?? ""}`}>
      <motion.img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        style={reduced ? {} : { y, height: `calc(100% + ${strength * 2}px)` }}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}
