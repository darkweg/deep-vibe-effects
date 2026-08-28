import { createFileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader2, LogIn, ShieldCheck, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Reveal } from "@/components/site/Reveal";
import { PageHeader } from "@/components/site/PageHeader";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Espace membre — connexion & inscription | Club GTEL" },
      {
        name: "description",
        content:
          "Connectez-vous à l'espace membre du club GTEL pour accéder aux fiches de la filière, à la bibliothèque de parrainage et publier sur le blog.",
      },
      { property: "og:title", content: "Espace membre — Club GTEL" },
      {
        property: "og:description",
        content: "Connexion réservée aux étudiants et anciens de la filière GTEL de l'ENSPY.",
      },
    ],
  }),
  component: AuthPage,
});

const NIVEAUX = ["L3", "L4", "L5", "Alumni"];

function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [niveau, setNiveau] = useState("L3");
  const [busy, setBusy] = useState(false);
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) navigate({ to: "/galerie", replace: true });
  }, [user, loading, navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: { display_name: displayName || email.split("@")[0], niveau },
          },
        });
        if (error) throw error;
        if (data.session) {
          toast.success("Bienvenue dans le club !");
          await router.invalidate();
          navigate({ to: "/galerie", replace: true });
          return;
        }
        toast.success("Compte créé. Vérifiez votre boîte mail pour confirmer votre adresse, puis connectez-vous.");
        return;
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        if (!data.session) {
          toast.info("Votre adresse n'est pas encore confirmée. Vérifiez votre boîte mail.");
          return;
        }
        toast.success("Connexion réussie");
      }
      await router.invalidate();
      navigate({ to: "/galerie", replace: true });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setBusy(false);
    }
  }

  async function onGoogle() {
    setBusy(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });
    setBusy(false);
    if (error) {
      toast.error(error.message || "Connexion Google impossible pour le moment.");
      return;
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Espace membre"
        title="Connexion au réseau GTEL"
        intro="La filière et la bibliothèque de parrainage sont réservées aux membres. Créez votre compte étudiant pour y accéder et publier sur le blog du club."
      />

      <section className="container-x grid gap-10 py-20 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal>
          <div className="panel noise relative p-8 md:p-10">
            <div className="pointer-events-none absolute -top-24 -right-16 h-56 w-56 rounded-full bg-primary/25 blur-[110px]" />
            <div className="relative">
              <div className="flex gap-2">
                {(["login", "signup"] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMode(m)}
                    className={`px-5 py-2 font-mono text-[0.65rem] uppercase tracking-[0.18em] transition-all duration-500 ${
                      mode === m
                        ? "bg-gradient-to-r from-cobalt to-azure text-primary-foreground"
                        : "border border-border text-mist hover:border-azure hover:text-foreground"
                    }`}
                  >
                    {m === "login" ? "Se connecter" : "Créer un compte"}
                  </button>
                ))}
              </div>

              <form onSubmit={onSubmit} className="mt-8 space-y-4">
                {mode === "signup" && (
                  <>
                    <div>
                      <label className="eyebrow" htmlFor="name">
                        Nom affiché
                      </label>
                      <input
                        id="name"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        maxLength={60}
                        placeholder="Ada Nguema"
                        className="field mt-2"
                      />
                    </div>
                    <div>
                      <span className="eyebrow">Niveau</span>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {NIVEAUX.map((n) => (
                          <button
                            key={n}
                            type="button"
                            onClick={() => setNiveau(n)}
                            className={`px-4 py-2 font-mono text-[0.65rem] uppercase tracking-[0.16em] transition-colors duration-500 ${
                              niveau === n
                                ? "border border-azure bg-azure/15 text-cyan"
                                : "border border-border text-steel hover:text-foreground"
                            }`}
                          >
                            {n}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <label className="eyebrow" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    maxLength={255}
                    placeholder="prenom.nom@enspy.cm"
                    className="field mt-2"
                  />
                </div>

                <div>
                  <label className="eyebrow" htmlFor="password">
                    Mot de passe
                  </label>
                  <input
                    id="password"
                    type="password"
                    required
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="8 caractères minimum"
                    className="field mt-2"
                  />
                </div>

                <button type="submit" disabled={busy} className="btn-glow w-full px-6 py-3.5 disabled:opacity-60">
                  {busy ? (
                    <Loader2 className="mx-auto h-4 w-4 animate-spin" />
                  ) : mode === "login" ? (
                    "Entrer dans l'espace membre"
                  ) : (
                    "Rejoindre le club"
                  )}
                </button>
              </form>

              <div className="my-6 flex items-center gap-4">
                <span className="h-px flex-1 bg-border" />
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-steel">ou</span>
                <span className="h-px flex-1 bg-border" />
              </div>

              <button type="button" onClick={onGoogle} className="btn-ghost flex w-full items-center justify-center gap-3 px-6 py-3.5">
                <LogIn className="h-4 w-4" />
                Continuer avec Google
              </button>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="space-y-4">
            {[
              {
                icon: ShieldCheck,
                titre: "Accès protégé",
                texte:
                  "Les fiches d'unités d'enseignement et la bibliothèque de parrainage ne sont visibles que par les membres connectés.",
              },
              {
                icon: Sparkles,
                titre: "Blog du club",
                texte:
                  "Publiez vos retours d'expérience, tutoriels réseau ou comptes rendus d'événements, et échangez en commentaires.",
              },
              {
                icon: LogIn,
                titre: "Un seul compte",
                texte: "Email/mot de passe ou Google — votre profil suit vos publications et vos commentaires.",
              },
            ].map((b) => (
              <div key={b.titre} className="panel-raised group p-6 transition-transform duration-500 hover:-translate-y-1">
                <b.icon className="h-5 w-5 text-cyan" />
                <h2 className="mt-4 font-display text-xl text-chalk">{b.titre}</h2>
                <p className="mt-2 text-sm leading-relaxed text-mist">{b.texte}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>
    </>
  );
}
