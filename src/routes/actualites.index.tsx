import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CalendarDays, GraduationCap, LayoutGrid, Newspaper, PartyPopper, Search, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal, RevealText } from "@/components/site/Reveal";
import { FilterTabs } from "@/components/site/FilterTabs";
import { NewsSkeleton } from "@/components/site/NewsSkeleton";
import { ParallaxMedia } from "@/components/site/ParallaxMedia";
import { ACTUALITES } from "@/lib/gtel-data";
import { ACTU_IMAGES } from "@/lib/actu-media";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, PenLine } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { articlesQueryOptions, formatDate } from "@/lib/articles";

export const Route = createFileRoute("/actualites/")({
  head: () => ({
    meta: [
      { title: "Actualités & annonces — Club GTEL" },
      {
        name: "description",
        content:
          "Le fil d'actualités du département de Télécommunications de l'ENSPY : événements, formations, annonces et vie du club GTEL.",
      },
      { property: "og:title", content: "Actualités & annonces — Club GTEL" },
      {
        property: "og:description",
        content: "Événements, formations et annonces de la filière GTEL de l'ENSPY.",
      },
    ],
  }),
  component: Actualites,
});

const IMAGES = ACTU_IMAGES;

const CAT_ICONS: Record<string, LucideIcon> = {
  Toutes: LayoutGrid,
  Événement: PartyPopper,
  Formation: GraduationCap,
  "Vie du club": Users,
};

function Actualites() {
  const { user } = useAuth();
  const { data: dbArticles = [] } = useQuery(articlesQueryOptions);
  const categories = useMemo(
    () => ["Toutes", ...Array.from(new Set(ACTUALITES.map((a) => a.categorie)))],
    [],
  );
  const [filtre, setFiltre] = useState("Toutes");
  const [ready, setReady] = useState(false);
  const [q, setQ] = useState("");
  const liste = useMemo(() => {
    const term = q.trim().toLowerCase();
    return ACTUALITES.filter(
      (a) =>
        (filtre === "Toutes" || a.categorie === filtre) &&
        (term === "" || [a.titre, a.resume, a.categorie].join(" ").toLowerCase().includes(term)),
    );
  }, [filtre, q]);
  const featured = ACTUALITES[0];

  // Warm the browser image cache once so tab switching never re-downloads media.
  useEffect(() => {
    let cancelled = false;
    const done = () => !cancelled && setReady(true);
    Promise.all(
      IMAGES.map(
        (src) =>
          new Promise<void>((resolve) => {
            const img = new Image();
            img.onload = img.onerror = () => resolve();
            img.src = src as string;
          }),
      ),
    ).then(done);
    const t = setTimeout(done, 1200);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, []);

  return (
    <div className="theme-soft-black min-h-screen">
      {/* Bannière éditoriale */}
      <section className="relative overflow-hidden border-b pt-28 pb-10 sm:pt-40 sm:pb-16">
        <div
          className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-background"
          aria-hidden
        />
        <div className="container-x relative text-center">
          <Reveal>
            <span className="badge-cyan mx-auto">
              <Newspaper className="h-3 w-3" /> Journal du département
            </span>
          </Reveal>
          <h1 className="mx-auto mt-6 max-w-4xl font-display text-[clamp(2rem,7vw,4.5rem)] leading-[0.95] font-extrabold tracking-tight text-blue-950">
            <RevealText text="Journal & Annonces du Département" />
          </h1>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-5 max-w-xl text-sm text-mist sm:text-base">
              Événements, appels à candidature, formations et vie du Bureau — le fil est alimenté
              par la Cellule Communication.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <label className="glass-card mx-auto mt-8 flex w-full max-w-xl items-center gap-3 rounded-full px-5 py-3 focus-within:border-primary">
              <Search className="h-4 w-4 shrink-0 text-steel" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Rechercher un article, une annonce, une formation…"
                className="w-full bg-transparent text-sm outline-none placeholder:text-steel"
              />
            </label>
          </Reveal>

          {featured && (
            <Reveal delay={0.4}>
              <Link
                to="/actualites/$id"
                params={{ id: featured.id }}
                className="glass-card group mx-auto mt-8 flex max-w-2xl flex-col items-start gap-3 rounded-2xl p-5 text-left ring-1 ring-primary/25 transition-all duration-500 hover:ring-glow/60 sm:flex-row sm:items-center sm:gap-5 sm:p-6"
              >
                <span className="badge-cobalt shrink-0">À la une</span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-display text-base font-bold group-hover:text-primary sm:text-lg">
                    {featured.titre}
                  </span>
                  <span className="mt-1 block line-clamp-1 text-xs text-mist sm:text-sm">
                    {featured.resume}
                  </span>
                </span>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-primary transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </Reveal>
          )}
        </div>
      </section>

      <section className="container-x py-12 sm:py-20">
        <Reveal>
          <FilterTabs
            items={categories}
            active={filtre}
            onChange={setFiltre}
            layoutId="actu-tab"
            icons={CAT_ICONS}
          />
        </Reveal>

        {user && (
          <Reveal>
            <Link
              to="/actualites/creer"
              className="btn-glow mt-6 inline-flex items-center gap-2 px-5 py-3 text-sm"
            >
              <PenLine className="h-4 w-4" />
              ➕ Rédiger une actualité
            </Link>
          </Reveal>
        )}

        {dbArticles.length > 0 && (
          <div className="mt-10 grid gap-6 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
            {dbArticles
              .filter((a) => filtre === "Toutes" || a.categorie === filtre)
              .map((a) => (
                <Reveal key={a.id}>
                  <Link
                    to="/actualites/$id"
                    params={{ id: a.id }}
                    className="glass-card group flex h-full flex-col overflow-hidden rounded-2xl"
                  >
                    {a.cover_url && (
                      <img
                        src={a.cover_url}
                        alt={a.titre}
                        loading="lazy"
                        decoding="async"
                        className="aspect-video w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    )}
                    <div className="flex flex-1 flex-col p-5">
                      <span className="badge-cyan w-fit">{a.categorie}</span>
                      <h2 className="mt-3 font-display text-xl font-bold leading-snug group-hover:text-primary">
                        {a.titre}
                      </h2>
                      <p className="mt-2 line-clamp-3 text-sm text-mist">{a.resume}</p>
                      <span className="mt-auto pt-4 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-primary">
                        {formatDate(a.date_publication)}
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
          </div>
        )}

        {!ready && (
          <div className="mt-10 sm:mt-14">
            <NewsSkeleton count={3} />
          </div>
        )}

        <motion.div layout className="mt-10 space-y-8 sm:mt-14 sm:space-y-10">
          <AnimatePresence mode="popLayout">
            {ready &&
              liste.map((a, i) => {

              const Icon = CAT_ICONS[a.categorie] ?? PartyPopper;
              return (
                <motion.article
                  key={a.id}
                  layout
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.6, delay: 0.05 * i, ease: [0.16, 1, 0.3, 1] }}
                  className="glass-card group rounded-2xl p-3 sm:p-4 md:p-6"
                >
                  <Link
                    to="/actualites/$id"
                    params={{ id: a.id }}
                    className="grid gap-5 sm:gap-8 md:grid-cols-[1.1fr_1.4fr] md:items-center"
                  >
                  <ParallaxMedia
                    src={IMAGES[i % IMAGES.length] as string}
                    alt={a.titre}
                    className="aspect-video h-auto w-full rounded-xl md:aspect-auto md:h-[18rem]"
                    strength={40}
                  />
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="badge-cyan">
                        <Icon className="h-3 w-3" />
                        {a.categorie}
                      </span>
                      <span className="badge-steel">
                        <CalendarDays className="h-3 w-3" />
                        {a.date}
                      </span>
                    </div>
                    <h2 className="mt-4 font-display text-2xl sm:mt-5 sm:text-3xl leading-tight font-bold transition-colors duration-500 group-hover:text-cyan-glow md:text-4xl">
                      {a.titre}
                    </h2>
                    <p className="mt-4 max-w-xl text-mist">{a.resume}</p>
                    <span className="mt-6 inline-flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-primary transition-transform duration-500 group-hover:translate-x-1">
                      Lire l'article
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                  </Link>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </section>
    </div>
  );
}
