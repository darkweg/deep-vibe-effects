import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, CalendarDays, Image, Link2, Loader2, PenLine, Send, Tag } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { Reveal } from "@/components/site/Reveal";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { CATEGORIES } from "@/lib/articles";

export const Route = createFileRoute("/actualites/creer")({
  head: () => ({
    meta: [
      { title: "Rédiger une actualité — Club GTEL" },
      {
        name: "description",
        content: "Publier une nouvelle actualité du club GTEL de l'ENSPY : titre, catégorie, résumé et contenu.",
      },
      { property: "og:title", content: "Rédiger une actualité — Club GTEL" },
      { property: "og:description", content: "Formulaire de publication réservé aux membres connectés." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CreerActualite,
});

const schema = z.object({
  titre: z.string().trim().min(4, "Le titre est trop court").max(160, "Le titre est trop long"),
  categorie: z.string().trim().min(1),
  date_publication: z.string().min(1, "Choisissez une date"),
  cover_url: z.string().trim().max(600).optional().or(z.literal("")),
  resume: z.string().trim().min(10, "Ajoutez un résumé de 2 à 3 phrases").max(600),
  contenu: z.string().trim().min(20, "Le contenu est trop court").max(20000),
  linkedin: z.string().trim().max(600).optional().or(z.literal("")),
});

const field =
  "w-full rounded-xl border border-border/70 bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary";

function CreerActualite() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [saving, setSaving] = useState(false);
  const today = new Date().toISOString().slice(0, 10);

  const [form, setForm] = useState({
    titre: "",
    categorie: CATEGORIES[0] as string,
    date_publication: today,
    cover_url: "",
    resume: "",
    contenu: "",
    linkedin: "",
  });

  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  if (loading) {
    return (
      <div className="theme-soft-black flex min-h-[60svh] items-center justify-center">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="theme-soft-black flex min-h-[70svh] items-center px-6">
        <div className="panel mx-auto max-w-xl p-8 sm:p-10">
          <PenLine className="h-6 w-6 text-primary" />
          <h1 className="mt-5 font-display text-2xl font-bold sm:text-3xl">Connexion requise</h1>
          <p className="mt-3 text-muted-foreground">
            Connectez-vous avec votre compte pour rédiger et publier une actualité du club.
          </p>
          <Link to="/auth" className="btn-glow mt-7 inline-flex px-6 py-3">
            Se connecter
          </Link>
        </div>
      </div>
    );
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Formulaire incomplet");
      return;
    }
    setSaving(true);
    const { data, error } = await supabase
      .from("articles")
      .insert({
        author_id: user.id,
        titre: parsed.data.titre,
        categorie: parsed.data.categorie,
        date_publication: parsed.data.date_publication,
        cover_url: parsed.data.cover_url || null,
        resume: parsed.data.resume,
        contenu: parsed.data.contenu,
        linkedin: parsed.data.linkedin || null,
      })
      .select("id")
      .single();
    setSaving(false);

    if (error || !data) {
      toast.error("La publication a échoué. Réessayez.");
      return;
    }
    await queryClient.invalidateQueries({ queryKey: ["articles"] });
    toast.success("Actualité publiée !");
    navigate({ to: "/actualites/$id", params: { id: data.id } });
  };

  return (
    <div className="theme-soft-black min-h-screen">
      <div className="sticky top-16 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md sm:top-20">
        <div className="container-x flex items-center justify-between gap-4 py-3">
          <Link
            to="/actualites"
            className="inline-flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-foreground transition-transform duration-500 hover:-translate-x-1"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour aux actualités
          </Link>
        </div>
      </div>

      <section className="container-x pt-12 pb-16 sm:pt-16">
        <Reveal>
          <span className="badge-cyan">
            <PenLine className="h-3 w-3" />
            Nouvelle publication
          </span>
          <h1 className="mt-5 font-display text-[clamp(1.8rem,6vw,3.25rem)] leading-tight font-extrabold">
            Rédiger une actualité
          </h1>
          <p className="mt-4 max-w-2xl text-mist">
            Renseignez les informations ci-dessous. L'article apparaîtra immédiatement en tête du fil
            d'actualités du club.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={submit} className="glass-card mt-10 grid gap-6 rounded-2xl p-5 sm:p-8">
            <label className="grid gap-2">
              <span className="text-sm font-semibold">Titre *</span>
              <input
                className={field}
                value={form.titre}
                onChange={(e) => set("titre")(e.target.value)}
                placeholder="Ex. Atelier fibre optique avec le laboratoire réseaux"
                maxLength={160}
                required
              />
            </label>

            <div className="grid gap-6 sm:grid-cols-2">
              <label className="grid gap-2">
                <span className="inline-flex items-center gap-2 text-sm font-semibold">
                  <Tag className="h-3.5 w-3.5 text-primary" /> Catégorie
                </span>
                <select
                  className={field}
                  value={form.categorie}
                  onChange={(e) => set("categorie")(e.target.value)}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2">
                <span className="inline-flex items-center gap-2 text-sm font-semibold">
                  <CalendarDays className="h-3.5 w-3.5 text-primary" /> Date de publication
                </span>
                <input
                  type="date"
                  className={field}
                  value={form.date_publication}
                  onChange={(e) => set("date_publication")(e.target.value)}
                  required
                />
              </label>
            </div>

            <label className="grid gap-2">
              <span className="inline-flex items-center gap-2 text-sm font-semibold">
                <Image className="h-3.5 w-3.5 text-primary" /> Image de couverture (lien)
              </span>
              <input
                className={field}
                value={form.cover_url}
                onChange={(e) => set("cover_url")(e.target.value)}
                placeholder="https://..."
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold">Résumé * (2–3 phrases)</span>
              <textarea
                className={`${field} min-h-24 resize-y`}
                value={form.resume}
                onChange={(e) => set("resume")(e.target.value)}
                maxLength={600}
                required
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold">Contenu de l'article *</span>
              <textarea
                className={`${field} min-h-72 resize-y font-mono text-[0.85rem] leading-relaxed`}
                value={form.contenu}
                onChange={(e) => set("contenu")(e.target.value)}
                placeholder={"## Sous-titre\n\nVotre paragraphe...\n\n- point 1\n- point 2"}
                maxLength={20000}
                required
              />
              <span className="text-xs text-muted-foreground">
                Markdown simple accepté : ## pour les sous-titres, - pour les listes, ligne vide entre
                les paragraphes.
              </span>
            </label>

            <label className="grid gap-2">
              <span className="inline-flex items-center gap-2 text-sm font-semibold">
                <Link2 className="h-3.5 w-3.5 text-primary" /> Lien LinkedIn (optionnel)
              </span>
              <input
                className={field}
                value={form.linkedin}
                onChange={(e) => set("linkedin")(e.target.value)}
                placeholder="https://www.linkedin.com/posts/..."
              />
            </label>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                disabled={saving}
                className="btn-glow inline-flex items-center justify-center gap-2 px-6 py-3.5 disabled:opacity-60"
              >
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                Publier l'actualité
              </button>
              <Link to="/actualites" className="btn-ghost inline-flex items-center justify-center px-6 py-3.5">
                Annuler
              </Link>
            </div>
          </form>
        </Reveal>
      </section>
    </div>
  );
}
