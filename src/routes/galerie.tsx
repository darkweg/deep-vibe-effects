import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import eventImg from "@/assets/event.jpg";
import fiberImg from "@/assets/fiber.jpg";
import studentsImg from "@/assets/students.jpg";
import libraryImg from "@/assets/library.jpg";
import towerImg from "@/assets/tower.jpg";
import heroImg from "@/assets/hero.jpg";

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
  { src: eventImg, alt: "Soirée de remise du club GTEL", album: "Forum Télécoms", span: "md:col-span-2 md:row-span-2" },
  { src: fiberImg, alt: "Atelier fibre optique", album: "Atelier fibre", span: "" },
  { src: studentsImg, alt: "Travaux pratiques réseau", album: "TP réseaux", span: "" },
  { src: towerImg, alt: "Sortie terrain sur pylône", album: "Sortie terrain", span: "md:col-span-2" },
  { src: libraryImg, alt: "Collecte de documents de parrainage", album: "Parrainage", span: "" },
  { src: heroImg, alt: "Laboratoire de télécommunications", album: "Laboratoire", span: "" },
];

function Galerie() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <>
      <PageHeader
        eyebrow="Galerie"
        title="Les moments forts, album par album"
        intro="Les photos publiées par la Cellule Communication, organisées par événement. Cliquez sur une image pour l'agrandir."
      />

      <section className="container-x py-20">
        <div className="grid auto-rows-[16rem] grid-cols-1 gap-4 md:grid-cols-4">
          {PHOTOS.map((p, i) => (
            <Reveal key={p.album} delay={0.05 * i} className={`${p.span} h-full`}>
              <button
                type="button"
                onClick={() => setActive(i)}
                className="media-fx scanlines group relative block h-full w-full"
              >
                <img src={p.src} alt={p.alt} loading="lazy" className="h-full w-full object-cover" />
                <span className="absolute bottom-4 left-4 z-3 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-foreground opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100 translate-y-2">
                  {p.album}
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-100 flex items-center justify-center bg-ink/95 p-6 backdrop-blur-xl"
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
    </>
  );
}
