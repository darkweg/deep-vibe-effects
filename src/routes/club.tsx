import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, CalendarDays, GraduationCap, Landmark, Users } from "lucide-react";
import { Reveal, RevealText } from "@/components/site/Reveal";
import { ParallaxMedia } from "@/components/site/ParallaxMedia";
import { BUREAU } from "@/lib/gtel-data";
import studentsImg from "@/assets/students.jpg";
import heroImg from "@/assets/hero.jpg";

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
    <div className="theme-soft-black min-h-screen">
      {/* Hero institutionnel */}
      <section className="relative flex min-h-[34rem] items-end overflow-hidden pt-28 sm:pt-40">
        <img
          src={studentsImg}
          alt="Les membres du club GTEL réunis au département"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/45 to-slate-950/90"
          aria-hidden
        />
        <div className="container-x relative z-2 pb-8">
          <Reveal>
            <span className="badge-cyan">
              <Landmark className="h-3 w-3" /> Institution
            </span>
          </Reveal>
          <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.2rem,7vw,4.8rem)] leading-[0.95] font-extrabold tracking-tight text-white drop-shadow-md">
            <RevealText text="À propos du Club GTEL" />
          </h1>
          <Reveal delay={0.2}>
            <p className="mt-5 max-w-2xl text-base text-white/85 drop-shadow-sm sm:text-lg">
              Né de l'entraide entre les promotions, le club porte la voix de la filière Génie des
              Télécommunications et transmet sa mémoire académique au sein de l'ENSPY.
            </p>
          </Reveal>
        </div>
      </section>
      {/* Barre de badges statistiques */}
      <div className="border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
        <div className="container-x flex flex-wrap gap-x-10 gap-y-4 py-5">
          {[
            { icon: GraduationCap, valeur: "3 Niveaux", label: "L3 · L4 · L5" },
            { icon: BookOpen, valeur: "200+ Documents", label: "Ressources partagées" },
            { icon: Users, valeur: "Filière GTEL", label: "ENSPY · Yaoundé I" },
          ].map((s, i) => (
            <Reveal key={s.valeur} delay={0.08 * i}>
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 ring-1 ring-primary/40">
                  <s.icon className="h-4 w-4 text-cyan-glow" />
                </span>
                <span>
                  <span className="block font-display text-sm font-bold text-white sm:text-base">{s.valeur}</span>
                  <span className="block font-mono text-[0.6rem] uppercase tracking-[0.18em] text-white/60">{s.label}</span>
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <section className="container-x py-14 sm:py-24">
        <div className="grid gap-10 sm:gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <ParallaxMedia
              src={studentsImg}
              alt="Membres du club GTEL en séance de travail"
              className="h-[30rem] w-full rounded-2xl"
            />
          </Reveal>
          <div className="lg:pt-10">
            <h2 className="font-display text-3xl sm:text-4xl leading-[1.05] font-extrabold md:text-6xl">
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

      <section className="border-y bg-ink py-14 sm:py-24">
        <div className="container-x">
          <Reveal>
            <span className="badge-cyan"><CalendarDays className="h-3 w-3" /> Chronologie</span>
          </Reveal>
          <div className="mt-12 grid gap-px bg-border/60 md:grid-cols-4">
            {JALONS.map((j, i) => (
              <Reveal key={j.annee} delay={0.08 * i} className="h-full">
                <div className="glass-card group h-full rounded-2xl p-8">
                  <p className="font-display text-3xl sm:text-4xl font-extrabold text-gradient-blue">{j.annee}</p>
                  <p className="mt-4 text-sm text-muted-foreground">{j.texte}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-14 sm:py-24">
        <Reveal>
          <span className="badge-cyan"><Users className="h-3 w-3" /> Bureau actuel</span>
        </Reveal>
        <h2 className="mt-6 font-display text-3xl sm:text-4xl font-extrabold md:text-6xl">
          <RevealText text="Celles et ceux qui font tourner le club" />
        </h2>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {BUREAU.map((m, i) => (
            <Reveal key={m.nom} delay={0.07 * i}>
              <div className="glass-card group rounded-2xl p-7">
                <span className="badge-cyan">{m.role}</span>
                <p className="mt-4 font-display text-xl font-bold">{m.nom}</p>
                <p className="mt-1 text-sm text-steel">{m.promo}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative h-[60svh] min-h-[22rem] overflow-hidden border-t">
        <ParallaxMedia
          src={heroImg}
          alt="Assemblée du club GTEL en amphithéâtre"
          className="absolute inset-0 h-full w-full"
          strength={80}
          scrim
        />
        <div className="relative z-3 flex h-full items-end pb-16">
          <div className="container-x">
            <h2 className="max-w-2xl text-3xl leading-tight font-semibold md:text-5xl">
              <RevealText text="Une promotion passe, le club reste." />
            </h2>
          </div>
        </div>
      </section>
    </div>
  );
}
