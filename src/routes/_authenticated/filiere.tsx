import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MemberGate } from "@/components/site/MemberGate";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { ParallaxMedia } from "@/components/site/ParallaxMedia";
import { UES } from "@/lib/gtel-data";
import towerImg from "@/assets/tower.jpg";

export const Route = createFileRoute("/_authenticated/filiere")({
  head: () => ({
    meta: [
      { title: "La filière GTEL & ses unités d'enseignement — Club GTEL" },
      {
        name: "description",
        content:
          "Présentation de la filière Génie des Télécommunications de l'ENSPY et fiches détaillées des unités d'enseignement de L3 à L5.",
      },
      { property: "og:title", content: "La filière GTEL & ses unités d'enseignement" },
      {
        property: "og:description",
        content: "Fiches UE par niveau et par semestre, avec enseignants responsables.",
      },
    ],
  }),
  component: Filiere,
});

const NIVEAUX = ["Tous", "L3", "L4", "L5"] as const;

function Filiere() {
  const [niveau, setNiveau] = useState<(typeof NIVEAUX)[number]>("Tous");
  const liste = UES.filter((u) => niveau === "Tous" || u.niveau === niveau);

  return (
    <MemberGate>
    <div className="theme-slate min-h-screen">
      <PageHeader
        eyebrow="La filière"
        title="Génie des Télécommunications"
        intro="Du traitement du signal aux réseaux opérateurs : le parcours GTEL couvre trois années d'ingénierie, structurées en unités d'enseignement semestrielles."
      />

      <section className="relative h-[46svh] min-h-[20rem] overflow-hidden">
        <ParallaxMedia
          src={towerImg}
          alt="Pylône de télécommunications"
          className="absolute inset-0 h-full w-full"
          strength={80}
        />
      </section>

      <section className="container-x py-20">
        <Reveal>
          <div className="flex flex-wrap gap-2">
            {NIVEAUX.map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setNiveau(n)}
                className={`border px-5 py-2 font-mono text-[0.65rem] uppercase tracking-[0.18em] transition-all duration-500 ${
                  niveau === n
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-primary/60 hover:text-foreground"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {liste.map((ue, i) => (
            <Reveal key={ue.code} delay={0.06 * i}>
              <article className="group relative h-full overflow-hidden border border-border/70 p-8 transition-colors duration-500 hover:border-primary/60">
                <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-primary transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-xs tracking-[0.18em] text-glow">{ue.code}</p>
                    <h2 className="mt-2 font-display text-2xl leading-snug">{ue.intitule}</h2>
                  </div>
                  <span className="border border-border px-2.5 py-1 font-mono text-[0.6rem] tracking-[0.18em] text-muted-foreground">
                    {ue.niveau} · {ue.semestre}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{ue.resume}</p>

                <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-border/60 pt-5 font-mono text-[0.65rem] uppercase tracking-[0.16em]">
                  <div>
                    <dt className="text-steel">Crédits</dt>
                    <dd className="mt-1 text-foreground">{ue.credits}</dd>
                  </div>
                  <div>
                    <dt className="text-steel">Volume</dt>
                    <dd className="mt-1 text-foreground">{ue.heures} h</dd>
                  </div>
                  <div>
                    <dt className="text-steel">Semestre</dt>
                    <dd className="mt-1 text-foreground">{ue.semestre}</dd>
                  </div>
                </dl>

                <div className="mt-5 flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/40 font-mono text-[0.65rem] text-glow">
                    {ue.enseignant.split(" ").slice(-1)[0]?.charAt(0)}
                  </span>
                  <span className="text-sm">
                    <span className="block">{ue.enseignant}</span>
                    <span className="block text-xs text-steel">{ue.grade}</span>
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
    </MemberGate>
  );
}
