import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Image as ImageIcon, X } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { FilterTabs } from "@/components/site/FilterTabs";
import { BlogSection } from "@/components/blog/BlogSection";

import eventImg from "@/assets/event.jpg";
import fiberImg from "@/assets/fiber.jpg";
import studentsImg from "@/assets/students.jpg";
import libraryImg from "@/assets/library.jpg";
import towerImg from "@/assets/tower.jpg";
import heroImg from "@/assets/hero.jpg";
import students2Img from "@/assets/students2.jpg";
import journeeImg from "@/assets/journee.jpg";
import arduinoImg from "@/assets/arduino.jpg";


export const Route = createFileRoute("/galerie")({
  head: () => ({
    meta: [
      { title: "Galerie photos — Club GTEL" },
      {
        name: "description",
        content:
          "Albums photos du club GTEL : forums, ateliers réseau, travaux pratiques et moments forts de la filière Télécommunications de l'ENSPY.",
      },
      { property: "og:title", content: "Galerie photos — Club GTEL" },
      {
        property: "og:description",
        content: "Les moments forts du club GTEL en images.",
      },
    ],
  }),
  component: Galerie,
});

const PHOTOS = [
  { src: studentsImg, alt: "Travaux pratiques réseau", album: "TP réseaux", tags: ["#TP", "#L3"] },
  { src: eventImg, alt: "Soirée de remise du club GTEL", album: "Forum Télécoms", tags: ["#VieDuClub"] },
  { src: fiberImg, alt: "Atelier fibre optique", album: "Atelier fibre", span: "", tags: ["#FibreOptique", "#Soudure"] },
  { src: students2Img, alt: "Travaux pratiques", album: "TP réseaux", span: "", tags: ["#TP", "#L4"] },
  { src: arduinoImg, alt: "Laboratoire de télécommunications", album: "Atelier Arduino", span: "", tags: ["#IoT", "#L4"] },
  { src: towerImg, alt: "Sortie terrain sur pylône", album: "Sortie terrain", span: "md:col-span-2", tags: ["#Terrain"] },
  { src: libraryImg, alt: "Collecte de documents de parrainage", album: "Parrainage", span: "", tags: ["#VieDuClub"] },
  { src: journeeImg, alt: "Laboratoire ", album: "Sortie terrain", span: "", tags: ["#Terrain", "#VieDuClub"] },
];

const HASHTAGS = ["#FibreOptique", "#Soudure", "#L4", "#VieDuClub"];

function Galerie() {
  const [active, setActive] = useState<number | null>(null);
  const [tag, setTag] = useState("Tous");
  const [q, setQ] = useState("");
  const term = q.trim().toLowerCase();
  const visibles = PHOTOS.map((p, i) => ({ ...p, i })).filter(
    (p) =>
      (tag === "Tous" || p.tags.includes(tag)) &&
      (term === "" ||
        [p.alt, p.album, ...p.tags].join(" ").toLowerCase().includes(term)),
  );

  return (
    <div className="not-even:theme-deep-blue min-h-screen">
      {/* En-tête micro-feed social */}
      <section className="relative overflow-hidden border-b pt-28 pb-8 sm:pt-36 sm:pb-12">
        <div
          className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-background"
          aria-hidden
        />
        <div className="container-x relative">
          <Reveal>
            <span className="badge-cyan">
              <ImageIcon className="h-3 w-3" /> Fil photos du club
            </span>
          </Reveal>
          <h1 className="mt-5 max-w-3xl font-display text-[clamp(2rem,6vw,3.8rem)] leading-[0.98] font-extrabold tracking-tight">
            <RevealText text="La vie du club en images" />
          </h1>
          <Reveal delay={0.2}>
            <p className="mt-4 max-w-xl text-sm text-mist sm:text-base">
              Les photos publiées par la Cellule Communication. Plus bas, le micro-blog des
              membres : récits de TP, tutoriels réseau et commentaires.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-7 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <label className="glass-card flex w-full items-center gap-3 rounded-full px-5 py-2.5 focus-within:border-primary md:max-w-sm">
                <Search className="h-4 w-4 shrink-0 text-steel" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Rechercher un hashtag, un album…"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-steel"
                />
              </label>
              <div className="flex flex-wrap gap-2">
                {["Tous", ...HASHTAGS].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTag(t)}
                    className={`rounded-full border px-4 py-1.5 font-mono text-[0.65rem] tracking-[0.12em] transition-all duration-300 ${
                      tag === t
                        ? "border-primary bg-primary/15 text-primary ring-1 ring-primary/40"
                        : "border-border text-muted-foreground hover:border-primary/60 hover:text-foreground"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-x py-12 sm:py-20">
        <motion.div layout className="grid auto-rows-[13rem] grid-cols-1 gap-4 sm:auto-rows-[16rem] sm:grid-cols-2 md:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {visibles.map((p, idx) => (
              <motion.button
                key={p.i}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.5, delay: 0.04 * idx, ease: [0.16, 1, 0.3, 1] }}
                type="button"
                onClick={() => setActive(p.i)}
                className={`media-fx scanlines group relative block h-full w-full overflow-hidden rounded-2xl ring-1 ring-border transition-all duration-500 hover:ring-glow/70 hover:shadow-[0_30px_70px_-35px_rgb(0_102_255/0.9)] ${tag === "Tous" && term === "" ? p.span : ""}`}
              >
                <img src={p.src} alt={p.alt} loading="lazy" className="h-full w-full object-cover" />
                <span className="badge-cyan absolute bottom-4 left-4 z-3 translate-y-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <ImageIcon className="h-3 w-3" />
                  {p.album}
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>

        {visibles.length === 0 && (
          <p className="py-16 text-center text-sm text-muted-foreground">
            Aucune photo ne correspond à cette recherche.
          </p>
        )}
      </section>


      <BlogSection />


      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-100 flex items-center justify-center bg-foreground/90 p-6 backdrop-blur-xl"
            onClick={() => setActive(null)}
          >
            <button
              type="button"
              aria-label="Fermer"
              className="absolute top-6 right-6 flex h-11 w-11 items-center justify-center border border-border"
              onClick={() => setActive(null)}
            >
              <X className="h-4 w-4" />
            </button>
            <motion.figure
              initial={{ scale: 0.94, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="max-h-[85vh] max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={PHOTOS[active]?.src}
                alt={PHOTOS[active]?.alt ?? ""}
                className="max-h-[75vh] w-full object-contain"
              />
              <figcaption className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-steel">
                {PHOTOS[active]?.album} — {PHOTOS[active]?.alt}
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
