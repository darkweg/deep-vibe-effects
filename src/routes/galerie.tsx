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
import event2Img from "@/assets/event2.jpg";
import fiber2Img from "@/assets/fiber2.jpg";
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
  { src: studentsImg, alt: "Travaux pratiques réseau", album: "TP réseaux"},
  { src: eventImg, alt: "Soirée de remise du club GTEL", album: "Forum Télécoms" },
  { src: fiberImg, alt: "Atelier fibre optique", album: "Atelier fibre", span: "" },
  { src: students2Img, alt: "Travaux pratiques", album: "TP réseaux", span: "" },
  { src: arduinoImg, alt: "Laboratoire de télécommunications", album: "Atelier Arduino", span: "" },
  { src: towerImg, alt: "Sortie terrain sur pylône", album: "Sortie terrain", span: "md:col-span-2" },
  { src: libraryImg, alt: "Collecte de documents de parrainage", album: "Parrainage", span: "" },
  { src: journeeImg, alt: "Laboratoire ", album: "Sortie terrain", span: "" },
  
];

function Galerie() {
  const [active, setActive] = useState<number | null>(null);
  const [album, setAlbum] = useState("Tous");
  const albums = ["Tous", ...Array.from(new Set(PHOTOS.map((p) => p.album)))];
  const visibles = PHOTOS.map((p, i) => ({ ...p, i })).filter(
    (p) => album === "Tous" || p.album === album,
  );

  return (
    <div className="not-even:theme-deep-blue min-h-screen">
      <PageHeader
        eyebrow="Galerie & blog"
        title="Les moments forts, album par album"
        intro="Les photos publiées par la Cellule Communication, organisées par événement. Plus bas, le blog des membres : récits de TP, tutoriels réseau et vie du club."
      />

      <section className="container-x py-12 sm:py-20">
        <Reveal>
          <FilterTabs items={albums} active={album} onChange={setAlbum} layoutId="galerie-tab" />
        </Reveal>

        <motion.div layout className="mt-12 grid auto-rows-[16rem] grid-cols-1 gap-4 md:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {visibles.map((p, idx) => (
              <motion.button
                key={p.album}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.5, delay: 0.04 * idx, ease: [0.16, 1, 0.3, 1] }}
                type="button"
                onClick={() => setActive(p.i)}
                className={`media-fx scanlines group relative block h-full w-full overflow-hidden rounded-2xl ring-1 ring-border transition-all duration-500 hover:ring-glow/70 hover:shadow-[0_30px_70px_-35px_rgb(0_102_255/0.9)] ${album === "Tous" ? p.span : ""}`}
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
