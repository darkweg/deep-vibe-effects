import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import {
  BookOpen,
  GraduationCap,
  Home,
  Images,
  LogOut,
  Mail,
  Menu,
  Newspaper,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { NAV_LINKS } from "@/lib/gtel-data";
import { useAuth } from "@/hooks/useAuth";
import polytechLogo from "@/assets/polytech-logo.png";
import logo from "@/assets/gtel-logo.jpg";

const NAV_ICONS: Record<string, LucideIcon> = {
  "/": Home,
  "/actualites": Newspaper,
  "/galerie": Images,
  "/filiere": GraduationCap,
  "/bibliotheque": BookOpen,
  "/club": Users,
  "/contact": Mail,
};

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { user, profile, signOut, isMember } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const links = NAV_LINKS.filter((l) => !l.memberOnly || isMember);

  return (
    <header
      className={`theme-dark-shell fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
        scrolled ? "glass-panel border-b py-3" : "bg-background/90 border-b border-transparent py-5"
      }`}
    >
      <nav className="container-x flex items-center justify-between gap-6">
        <Link to="/" className="group flex items-center gap-3">
          <img
            src={polytechLogo}
            alt="Logo Polytech ENSPY"
            className="h-10 w-10 rounded-lg object-contain transition-all duration-500"
          />
          <img
            src={logo}
            alt="Logo Club GTEL"
            className="h-10 w-10 rounded-lg object-cover ring-1 ring-glow/40 transition-all duration-500 group-hover:ring-glow"
          />
          <span className="leading-none">
            <span className="block font-display text-base font-extrabold tracking-tight">
              CLUB GTEL
            </span>
            <span className="eyebrow block text-[0.6rem]">ENSPY · Yaoundé I</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((link) => {
            const Icon = NAV_ICONS[link.to] ?? Home;
            const active = pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-2 font-mono text-[0.66rem] uppercase tracking-[0.14em] transition-all duration-300 ${
                  active
                    ? "bg-glow/12 text-glow ring-1 ring-glow/40"
                    : "text-muted-foreground hover:bg-surface-2/60 hover:text-foreground"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          {user ? (
            <>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-cobalt to-cyan font-mono text-[0.65rem] text-primary-foreground">
                {(profile?.display_name ?? user.email ?? "GT").slice(0, 2).toUpperCase()}
              </span>
              <button
                type="button"
                onClick={async () => {
                  await queryClient.cancelQueries();
                  queryClient.clear();
                  await signOut();
                  navigate({ to: "/", replace: true });
                }}
                className="btn-ghost inline-flex items-center gap-2 rounded-full px-4 py-2.5"
              >
                <LogOut className="h-3.5 w-3.5" />
                Sortir
              </button>
            </>
          ) : (
            <Link
              to="/auth"
              className="btn-glow hover-sheen inline-flex items-center gap-2 rounded-full px-5 py-2.5"
            >
              <Users className="h-3.5 w-3.5" />
              Espace membre
            </Link>
          )}
        </div>

        <button
          type="button"
          aria-label="Ouvrir le menu"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border lg:hidden"
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
              {links.map((link, i) => {
                const Icon = NAV_ICONS[link.to] ?? Home;
                return (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.5 }}
                  >
                    <Link
                      to={link.to}
                      className="flex items-center gap-3 border-b border-border/60 py-3 font-display text-xl font-bold"
                    >
                      <Icon className="h-5 w-5 text-glow" />
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
              {user ? (
                <button
                  type="button"
                  onClick={async () => {
                    queryClient.clear();
                    await signOut();
                    navigate({ to: "/", replace: true });
                  }}
                  className="btn-ghost mt-4 inline-flex items-center gap-2 rounded-full px-5 py-3  text-white"
                >
                  <LogOut className="h-4 w-4  text-white" /> Sortir
                </button>
              ) : (
                <Link
                  to="/auth"
                  className="btn-glow mt-4 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3  text-white"
                >
                  <Users className="h-4 w-4  text-white" /> Espace membre
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}