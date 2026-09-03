import { Link } from "@tanstack/react-router";
import { Loader2, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Reveal } from "./Reveal";

/**
 * Rend son contenu uniquement aux membres du club (rôle membre / communication / admin).
 * Le vrai contrôle d'accès reste côté base de données via les politiques RLS.
 */
export function MemberGate({ children }: { children: ReactNode }) {
  const { loading, user, isMember } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-[50svh] items-center justify-center">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (user && isMember) return <>{children}</>;

  return (
    <section className="container-x flex min-h-[60svh] items-center py-16 sm:py-32">
      <Reveal>
        <div className="panel noise relative max-w-xl p-10">
          <ShieldCheck className="h-6 w-6 text-glow" />
          <h1 className="mt-6 font-display text-3xl md:text-4xl">Espace réservé aux membres</h1>
          <p className="mt-4 text-muted-foreground">
            Cette rubrique est accessible uniquement aux membres du club GTEL et à la Cellule
            Communication. Connectez-vous avec votre compte étudiant, ou demandez au Bureau
            d'activer votre adhésion.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/auth" className="btn-glow px-6 py-3.5">
              Se connecter
            </Link>
            <Link to="/contact" className="btn-ghost px-6 py-3.5">
              Contacter le Bureau
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
