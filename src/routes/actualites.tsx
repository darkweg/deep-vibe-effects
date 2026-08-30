import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CalendarDays, GraduationCap, LayoutGrid, PartyPopper, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { FilterTabs } from "@/components/site/FilterTabs";
import { ParallaxMedia } from "@/components/site/ParallaxMedia";
import { ACTUALITES } from "@/lib/gtel-data";
import eventImg from "@/assets/event.jpg";
import fiberImg from "@/assets/fiber.jpg";
import studentsImg from "@/assets/students.jpg";
import students2Img from "@/assets/students2.jpg";
import journeeImg from "@/assets/journee.jpg";

export const Route = createFileRoute("/actualites")({
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

const IMAGES = [eventImg, fiberImg, students2Img, journeeImg,studentsImg];

const CAT_ICONS: Record<string, LucideIcon> = {
  Toutes: LayoutGrid,
  Événement: PartyPopper,
  Formation: GraduationCap,
  "Vie du club": Users,
};

function Actualites() {
  const categories = ["Toutes", ...Array.from(new Set(ACTUALITES.map((a) => a.categorie)))];
  const [filtre, setFiltre] = useState("Toutes");
  const liste = ACTUALITES.filter((a) => filtre === "Toutes" || a.categorie === filtre);

  return (
    <div className="theme-soft-black min-h-screen">
      <PageHeader
        eyebrow="Actualités & annonces"
        title="Ce qui se passe dans la filière"
        intro="Événements, appels à candidature, formations et vie du Bureau. Le fil est alimenté par la Cellule Communication."
      />

      <section className="container-x py-20">
        <Reveal>
          <FilterTabs
            items={categories}
            active={filtre}
            onChange={setFiltre}
            layoutId="actu-tab"
            icons={CAT_ICONS}
          />
        </Reveal>

        <motion.div layout className="mt-14 space-y-10">
          <AnimatePresence mode="popLayout">
            {liste.map((a, i) => {
              const Icon = CAT_ICONS[a.categorie] ?? PartyPopper;
              return (
                <motion.article
                  key={a.slug}
                  layout
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.6, delay: 0.05 * i, ease: [0.16, 1, 0.3, 1] }}
                  className="glass-card group grid gap-8 rounded-2xl p-4 md:grid-cols-[1.1fr_1.4fr] md:items-center md:p-6"
                >
                  <ParallaxMedia
                    src={IMAGES[i % IMAGES.length] as string}
                    alt={a.titre}
                    className="h-[18rem] w-full rounded-xl"
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
                    <h2 className="mt-5 font-display text-3xl leading-tight font-bold transition-colors duration-500 group-hover:text-cyan-glow md:text-4xl">
                      {a.titre}
                    </h2>
                    <p className="mt-4 max-w-xl text-mist">{a.resume}</p>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </section>
    </div>
  );
}
