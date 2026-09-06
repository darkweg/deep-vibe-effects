import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { BookOpen, GraduationCap, Images, Newspaper, PenLine, ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { useAuth } from "@/hooks/useAuth";
import { articlesQueryOptions, formatDate } from "@/lib/articles";

export const Route = createFileRoute("/_authenticated/espace-membre")({
  head: () => ({
    meta: [
      { title: "Espace membre — Club GTEL" },
      {
        name: "description",
        content: "Tableau de bord des membres du club GTEL : rédiger une actualité, accéder à la filière et à la bibliothèque.",
      },
      { property: "og:title", content: "Espace membre — Club GTEL" },
      { property: "og:description", content: "Tableau de bord réservé aux membres du club GTEL." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: EspaceMembre,
});

function EspaceMembre() {
  const { profile, user, roles } = useAuth();
  const { data: articles = [] } = useQuery(articlesQueryOptions);
  const mine = articles.filter((a) => a.author_id === user?.id);

  return (
    <div className="theme-slate min-h-screen">
      <PageHeader
        eyebrow="Espace membre"
        title={`Bonjour ${profile?.display_name ?? "Membre GTEL"}`}
        intro="Votre tableau de bord : publiez une actualité, retrouvez la filière et la bibliothèque de parrainage."
      />

      <section className="container-x pb-16 sm:pb-24">
        <Reveal>
          <Link
            to="/actualites/creer"
            className="btn-glow inline-flex items-center gap-2 px-6 py-3.5 text-base"
          >
            <PenLine className="h-4 w-4" />
            ➕ Rédiger une actualité
          </Link>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { to: "/actualites", label: "Actualités", icon: Newspaper, desc: "Le fil du département." },
            { to: "/filiere", label: "La filière", icon: GraduationCap, desc: "Unités d'enseignement L3–L5." },
            { to: "/bibliotheque", label: "Bibliothèque", icon: BookOpen, desc: "Ressources de parrainage." },
            { to: "/galerie", label: "Galerie", icon: Images, desc: "Le fil photos du club." },
          ].map((c, i) => (
            <Reveal key={c.to} delay={0.06 * i}>
              <Link to={c.to} className="glass-card group flex h-full flex-col rounded-2xl p-6">
                <c.icon className="h-5 w-5 text-primary" />
                <h2 className="mt-4 font-display text-xl font-bold group-hover:text-primary">{c.label}</h2>
                <p className="mt-2 text-sm text-mist">{c.desc}</p>
                <ArrowUpRight className="mt-auto h-4 w-4 pt-4 text-primary transition-transform duration-500 group-hover:translate-x-1" />
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <h2 className="mt-14 font-display text-2xl font-bold sm:text-3xl">Mes publications</h2>
        </Reveal>
        {mine.length === 0 ? (
          <p className="mt-4 text-mist">Vous n'avez pas encore publié d'actualité.</p>
        ) : (
          <div className="mt-6 grid gap-4">
            {mine.map((a) => (
              <Link
                key={a.id}
                to="/actualites/$id"
                params={{ id: a.id }}
                className="glass-card flex flex-col gap-1 rounded-xl p-5 transition-colors hover:border-primary/60"
              >
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-primary">
                  {a.categorie} · {formatDate(a.date_publication)}
                </span>
                <span className="font-display text-lg font-bold">{a.titre}</span>
                <span className="line-clamp-2 text-sm text-mist">{a.resume}</span>
              </Link>
            ))}
          </div>
        )}

        {roles.length > 0 && (
          <p className="mt-10 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-muted-foreground">
            Rôles : {roles.join(" · ")}
          </p>
        )}
      </section>
    </div>
  );
}
