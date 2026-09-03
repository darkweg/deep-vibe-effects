import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Building2, Mail, MapPin, Radio, } from "lucide-react";
import { NAV_LINKS } from "@/lib/gtel-data";
import { useAuth } from "@/hooks/useAuth";
import logo from "@/assets/gtel-logo.jpg";
import {SiTiktok, SiWhatsapp } from '@icons-pack/react-simple-icons';
import { Linkedin } from 'lucide-react'; 

export function SiteFooter() {
  const { isMember } = useAuth();
  return (
    <footer className="theme-dark-shell relative overflow-hidden border-t bg-ink">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[70rem] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" />
      <div className="container-x relative py-12 sm:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="Logo du Club Génie Télécom"
                className="h-12 w-12 rounded-lg object-cover ring-1 ring-glow/30"
                loading="lazy"
              />
              <span className="badge-cyan">
                <Radio className="h-3 w-3" /> Club GTEL
              </span>
            </div>
            <p className="mt-5 max-w-sm font-display text-3xl leading-tight font-bold">
              La vitrine numérique du Génie des Télécommunications à l'ENSPY.
            </p>
          </div>

          <div>
            <p className="eyebrow">Navigation</p>
            <ul className="mt-4 space-y-2">
              {NAV_LINKS.filter((l) => !l.memberOnly || isMember).map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-glow"
                  >
                    {l.label}
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow">Contact</p>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-glow" />
                École Nationale Supérieure Polytechnique
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-glow" />
                Université de Yaoundé I, Cameroun
              </li>
              <li className="flex items-start gap-2">
                <Linkedin className="mt-0.5 h-4 w-4 shrink-0 text-glow" size={24}/>
                CLUB GTEL ENSPY
              </li>
              <li className="flex items-start gap-2">
                <SiWhatsapp className="mt-0.5 h-4 w-4 shrink-0 text-glow" size={24}/>
                CLUB GTEL ENSPY
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-border/60 pt-6 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-steel sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Club GTEL — ENSPY</span>
          <span>Connecter · Innover · Transformer</span>
        </div>
      </div>
    </footer>
  );
}