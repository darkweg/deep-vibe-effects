import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowLeft, ArrowUpRight, CalendarDays, Linkedin, Share2, Tag } from "lucide-react";
import { toast } from "sonner";
import { Reveal } from "@/components/site/Reveal";
import { ParallaxMedia } from "@/components/site/ParallaxMedia";
import { ACTUALITES } from "@/lib/gtel-data";
import { actuImage } from "@/lib/actu-media";

export const Route = createFileRoute("/actualites/$id")({
  loader: ({ params }) => {
    const index = ACTUALITES.findIndex((a) => a.id === params.id);
    if (index === -1) throw notFound();
    return { index };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Article introuvable — Club GTEL" }, { name: "robots", content: "noindex" }],
      };
    }
    const a = ACTUALITES[loaderData.index]!;
    return {
      meta: [
        { title: `${a.titre} — Club GTEL` },
        { name: "description", content: a.resume.trim().slice(0, 155) },
        { property: "og:title", content: a.titre },
        { property: "og:description", content: a.resume.trim().slice(0, 155) },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: ArticleIntrouvable,
  component: ArticleDetail,
});

function ArticleIntrouvable() {
  return (
    <div className="theme-soft-black flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="font-display text-3xl font-bold sm:text-5xl">Article introuvable</h1>
      <p className="max-w-md text-mist">Cette actualité n'existe plus ou l'adresse est incorrecte.</p>
      <Link to="/actualites" className="btn-glow inline-flex items-center gap-2 px-6 py-3">
        <ArrowLeft className="h-4 w-4" />
        Retour aux actualités
      </Link>
    </div>
  );
}

function ArticleDetail() {
  const { index } = Route.useLoaderData();
  const article = ACTUALITES[index]!;
  const related = ACTUALITES.filter((a) => a.id !== article.id)
    .sort((a, b) => Number(b.categorie === article.categorie) - Number(a.categorie === article.categorie))
    .slice(0, 3);

  const share = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({ title: article.titre, url });
      } else {
        await navigator.clipboard.writeText(url);
        toast.success("Lien copié dans le presse-papier");
      }
    } catch {
      /* partage annulé */
    }
  };

  return (
    <div className="theme-soft-black min-h-screen">
      {/* Sticky header */}
      <div className="sticky top-16 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md sm:top-20">
        <div className="container-x flex items-center justify-between gap-4 py-3">
          <Link
            to="/actualites"
            className="inline-flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-foreground transition-transform duration-500 hover:-translate-x-1"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour aux actualités
          </Link>
          <button
            type="button"
            onClick={share}
            aria-label="Partager l'article"
            className="btn-ghost inline-flex items-center gap-2 px-4 py-2 text-xs"
          >
            <Share2 className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Partager</span>
          </button>
        </div>
      </div>

      <article className="container-x py-10 sm:py-16">
        <Reveal>
          <div className="flex flex-wrap items-center gap-3">
            <span className="badge-cyan">
              <Tag className="h-3 w-3" />
              {article.categorie}
            </span>
            <span className="badge-steel">
              <CalendarDays className="h-3 w-3" />
              {article.date}
            </span>
          </div>

          <h1 className="mt-5 max-w-4xl font-display text-[clamp(1.9rem,7vw,3.75rem)] leading-[1.05] font-extrabold tracking-tight">
            {article.titre}
          </h1>
          <p className="mt-5 max-w-2xl text-base text-mist sm:text-lg">{article.resume.trim()}</p>
        </Reveal>

        <Reveal delay={0.08}>
          <ParallaxMedia
            src={actuImage(index)}
            alt={article.titre}
            className="mt-8 aspect-video h-auto w-full rounded-2xl sm:mt-12 md:h-[30rem] md:aspect-auto"
            strength={50}
            priority
          />
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
            <div className="max-w-2xl space-y-6">
              {article.corps.map((p) => (
                <p key={p.slice(0, 24)} className="text-base leading-[1.85] text-foreground/85 sm:text-lg">
                  {p}
                </p>
              ))}
            </div>

            <aside className="glass-card rounded-2xl p-6 lg:sticky lg:top-40">
              <p className="eyebrow">Suivre le club</p>
              <p className="mt-3 text-sm text-mist">
                Retrouvez la publication complète, les photos et les échanges sur la page LinkedIn du club GTEL.
              </p>
              <a
                href={article.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="btn-glow mt-5 inline-flex w-full items-center justify-center gap-2 px-5 py-3"
              >
                <Linkedin className="h-4 w-4" />
                Consulter sur LinkedIn
              </a>
            </aside>
          </div>
        </Reveal>
      </article>

      {/* Related */}
      <section className="border-t border-border/60 py-12 sm:py-20">
        <div className="container-x">
          <Reveal>
            <h2 className="font-display text-2xl font-bold sm:text-4xl">Sur le même sujet</h2>
          </Reveal>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((a, i) => {
              const idx = ACTUALITES.findIndex((x) => x.id === a.id);
              return (
                <motion.div
                  key={a.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: 0.06 * i, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    to="/actualites/$id"
                    params={{ id: a.id }}
                    className="glass-card group flex h-full flex-col overflow-hidden rounded-2xl"
                  >
                    <img
                      src={actuImage(idx)}
                      alt={a.titre}
                      loading="lazy"
                      decoding="async"
                      className="aspect-video w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="flex flex-1 flex-col p-5">
                      <span className="badge-steel w-fit">
                        <CalendarDays className="h-3 w-3" />
                        {a.date}
                      </span>
                      <h3 className="mt-3 font-display text-lg leading-snug font-bold transition-colors duration-500 group-hover:text-primary">
                        {a.titre}
                      </h3>
                      <p className="mt-2 line-clamp-3 text-sm text-mist">{a.resume.trim()}</p>
                      <span className="mt-auto pt-4 inline-flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-primary">
                        Lire
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
