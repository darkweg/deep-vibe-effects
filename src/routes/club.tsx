import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal, RevealText } from "@/components/site/Reveal";
import { ParallaxMedia } from "@/components/site/ParallaxMedia";
import { BUREAU } from "@/lib/gtel-data";
import studentsImg from "@/assets/students.jpg";
import eventImg from "@/assets/event.jpg";

export const Route = createFileRoute("/club")({
  head: () => ({
    meta: [
      { title: "Origine & Bureau du club GTEL — ENSPY" },
      {
        name: "description",
        content:
          "L'histoire du club GTEL de l'ENSPY, ses fondateurs, ses temps forts et la composition du Bureau actuel.",
      },
      { property: "og:title", content: "Origine & Bureau du club GTEL — ENSPY" },
      {
        property: "og:description",
        content: "Histoire, identité et Bureau du club GTEL.",
      },
    ],
  }),
  component: Club,
});

const JALONS = [
  { annee: "2016", texte: "Premiers rassemblements informels des étudiants GTEL autour des projets de laboratoire." },
  { annee: "2019", texte: "Structuration du club : statuts, Bureau élu et première Cellule Communication." },
  { annee: "2022", texte: "Lancement du parrainage documentaire entre promotions L3, L4 et L5." },
  { annee: "2026", texte: "Mise en ligne de la vitrine numérique du club et centralisation des ressources." },
];

function Club() {
  return (
    <>
      <PageHeader
        eyebrow="Le club"
        title="Origine, identité et Bureau"
        intro="Né de l'entraide entre promotions, le club GTEL s'est structuré pour porter la voix de la filière Génie des Télécommunications au sein de l'ENSPY."
      />

      <section className="container-x py-24">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <ParallaxMedia
              src={studentsImg}
              alt="Membres du club GTEL en séance de travail"
              className="h-[30rem] w-full"
            />
          </Reveal>
          <div className="lg:pt-10">
            <h2 className="text-4xl leading-[1.05] font-semibold md:text-5xl">
              <RevealText text="Transmettre plus qu'un diplôme" />
            </h2>
            <Reveal delay={0.2}>
              <p className="mt-8 leading-relaxed text-muted-foreground">
                Le club rassemble les étudiants de la filière, toutes promotions confondues. Sa
                mission : informer sur la vie du département, valoriser le parcours GTEL et
                organiser la transmission des ressources académiques aux promotions suivantes.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="mt-5 leading-relaxed text-muted-foreground">
                Il fonctionne autour d'un Bureau, d'une Cellule Communication chargée des
                publications, et d'un pôle Parrainage qui collecte et classe les documents.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-y bg-ink py-24">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow">Chronologie</p>
          </Reveal>
          <div className="mt-12 grid gap-px bg-border/60 md:grid-cols-4">
            {JALONS.map((j, i) => (
              <Reveal key={j.annee} delay={0.08 * i} className="h-full">
                <div className="group h-full bg-ink p-8 transition-colors duration-500 hover:bg-secondary/50">
                  <p className="font-display text-4xl font-bold text-gradient-blue">{j.annee}</p>
                  <p className="mt-4 text-sm text-muted-foreground">{j.texte}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-24">
        <Reveal>
          <p className="eyebrow">Bureau actuel</p>
        </Reveal>
        <h2 className="mt-6 text-4xl font-semibold md:text-5xl">
          <RevealText text="Celles et ceux qui font tourner le club" />
        </h2>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {BUREAU.map((m, i) => (
            <Reveal key={m.nom} delay={0.07 * i}>
              <div className="group relative overflow-hidden border border-border/70 p-7 transition-colors duration-500 hover:border-primary/60">
                <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-primary transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-glow">
                  {m.role}
                </p>
                <p className="mt-3 font-display text-xl">{m.nom}</p>
                <p className="mt-1 text-sm text-steel">{m.promo}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative h-[60svh] min-h-[22rem] overflow-hidden border-t">
        <ParallaxMedia
          src={eventImg}
          alt="Assemblée du club GTEL en amphithéâtre"
          className="absolute inset-0 h-full w-full"
          strength={80}
        />
        <div className="relative z-3 flex h-full items-end pb-16">
          <div className="container-x">
            <h2 className="max-w-2xl text-3xl leading-tight font-semibold md:text-5xl">
              <RevealText text="Une promotion passe, le club reste." />
            </h2>
          </div>
        </div>
      </section>
    </>
  );
}
