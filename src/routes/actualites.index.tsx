import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CalendarDays, GraduationCap, LayoutGrid, PartyPopper, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { FilterTabs } from "@/components/site/FilterTabs";
import { NewsSkeleton } from "@/components/site/NewsSkeleton";
import { ParallaxMedia } from "@/components/site/ParallaxMedia";
import { ACTUALITES } from "@/lib/gtel-data";
import { ACTU_IMAGES } from "@/lib/actu-media";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

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
  const liste = useMemo(
    () => ACTUALITES.filter((a) => filtre === "Toutes" || a.categorie === filtre),
    [filtre],
  );

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
      <PageHeader
        eyebrow="Actualités & annonces"
        title="Ce qui se passe dans la filière"
        intro="Événements, appels à candidature, formations et vie du Bureau. Le fil est alimenté par la Cellule Communication."
     titleClassName="text-blue-950"
   />

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
