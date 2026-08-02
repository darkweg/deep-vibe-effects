import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { ParallaxMedia } from "@/components/site/ParallaxMedia";
import { ACTUALITES } from "@/lib/gtel-data";
import eventImg from "@/assets/event.jpg";
import fiberImg from "@/assets/fiber.jpg";
import studentsImg from "@/assets/students.jpg";
import libraryImg from "@/assets/library.jpg";

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

const IMAGES = [eventImg, fiberImg, studentsImg, libraryImg];

function Actualites() {
  const categories = ["Toutes", ...Array.from(new Set(ACTUALITES.map((a) => a.categorie)))];
  const [filtre, setFiltre] = useState("Toutes");
  const liste = ACTUALITES.filter((a) => filtre === "Toutes" || a.categorie === filtre);

  return (
    <>
      <PageHeader
        eyebrow="Actualités & annonces"
        title="Ce qui se passe dans la filière"
        intro="Événements, appels à candidature, formations et vie du Bureau. Le fil est alimenté par la Cellule Communication."
      />

      <section className="container-x py-20">
        <Reveal>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setFiltre(c)}
                className={`border px-4 py-2 font-mono text-[0.65rem] uppercase tracking-[0.18em] transition-all duration-500 ${
                  filtre === c
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-primary/60 hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-14 space-y-16">
          {liste.map((a, i) => (
            <Reveal key={a.slug} delay={0.06 * i}>
              <article className="group grid gap-8 md:grid-cols-[1.1fr_1.4fr] md:items-center">
                <ParallaxMedia
                  src={IMAGES[i % IMAGES.length] as string}
                  alt={a.titre}
                  className="h-[20rem] w-full"
                  strength={40}
                />
                <div>
                  <div className="flex items-center gap-3 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-steel">
                    <span className="text-glow">{a.categorie}</span>
                    <span>·</span>
                    <span>{a.date}</span>
                  </div>
                  <h2 className="mt-4 font-display text-3xl leading-tight transition-colors duration-500 group-hover:text-glow md:text-4xl">
                    {a.titre}
                  </h2>
                  <p className="mt-4 max-w-xl text-muted-foreground">{a.resume}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
