import { Link } from "@tanstack/react-router";
import { NAV_LINKS } from "@/lib/gtel-data";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t bg-ink">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[70rem] -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]" />
      <div className="container-x relative py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="eyebrow">Club GTEL</p>
            <p className="mt-4 max-w-sm font-display text-3xl leading-tight">
              La vitrine numérique du Génie des Télécommunications à l'ENSPY.
            </p>
          </div>

          <div>
            <p className="eyebrow">Navigation</p>
            <ul className="mt-4 space-y-2">
              {NAV_LINKS.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow">Contact</p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>École Nationale Supérieure Polytechnique</li>
              <li>Université de Yaoundé I, Cameroun</li>
              <li>club.gtel@enspy.cm</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-border/60 pt-6 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-steel sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Club GTEL — ENSPY</span>
          <span>Cellule Communication</span>
        </div>
      </div>
    </footer>
  );
}
