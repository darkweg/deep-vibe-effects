import { Link, useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/gtel-data";

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
        scrolled ? "glass-panel border-b py-3" : "border-b border-transparent py-6"
      }`}
    >
      <nav className="container-x flex items-center justify-between gap-6">
        <Link to="/" className="group flex items-center gap-3">
          <span className="relative flex h-9 w-9 items-center justify-center border border-primary/50">
            <span className="absolute inset-0 bg-primary/10 transition-colors duration-500 group-hover:bg-primary/25" />
            <span className="relative font-display text-sm font-bold tracking-tight text-glow">G</span>
          </span>
          <span className="leading-none">
            <span className="block font-display text-base font-bold tracking-tight">CLUB GTEL</span>
            <span className="eyebrow block text-[0.6rem]">ENSPY · Yaoundé I</span>
          </span>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`hover-line font-mono text-xs uppercase tracking-[0.16em] transition-colors duration-300 ${
                pathname === link.to ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:block">
          <Link
            to="/contact"
            className="group relative inline-flex items-center overflow-hidden border border-primary/60 px-5 py-2.5 font-mono text-xs uppercase tracking-[0.16em] text-foreground"
          >
            <span className="absolute inset-0 -translate-x-full bg-primary transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0" />
            <span className="relative transition-colors duration-500 group-hover:text-primary-foreground">
              Espace membre
            </span>
          </Link>
        </div>

        <button
          type="button"
          aria-label="Ouvrir le menu"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center border border-border lg:hidden"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden lg:hidden"
          >
            <div className="container-x flex flex-col gap-1 pt-6 pb-4">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.5 }}
                >
                  <Link
                    to={link.to}
                    className="block border-b border-border/60 py-3 font-display text-xl"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
