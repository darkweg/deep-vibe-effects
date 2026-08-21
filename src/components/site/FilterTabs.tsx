import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";

type Props = {
  items: readonly string[];
  active: string;
  onChange: (v: string) => void;
  layoutId: string;
  icons?: Record<string, LucideIcon>;
};

/** Pill filter tabs with a shared-layout sliding indicator. */
export function FilterTabs({ items, active, onChange, layoutId, icons }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => {
        const Icon = icons?.[item];
        const isActive = active === item;
        return (
          <button
            key={item}
            type="button"
            onClick={() => onChange(item)}
            className={`relative isolate inline-flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-[0.65rem] uppercase tracking-[0.18em] transition-colors duration-300 ${
              isActive
                ? "border-glow/60 text-background"
                : "border-border text-muted-foreground hover:border-glow/50 hover:text-foreground"
            }`}
          >
            {isActive && (
              <motion.span
                layoutId={layoutId}
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
                className="absolute inset-0 -z-1 rounded-full"
                style={{ background: "var(--gradient-blue)" }}
              />
            )}
            {Icon && <Icon className="h-3.5 w-3.5" />}
            {item}
          </button>
        );
      })}
    </div>
  );
}
