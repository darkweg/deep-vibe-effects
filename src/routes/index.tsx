import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { Reveal, RevealText } from "@/components/site/Reveal";
import { ParallaxMedia } from "@/components/site/ParallaxMedia";
import { ACTUALITES, CHIFFRES, UES } from "@/lib/gtel-data";
import heroImg from "@/assets/hero.jpg";
import studentsImg from "@/assets/students.jpg";
import fiberImg from "@/assets/fiber.jpg";
import towerImg from "@/assets/tower.jpg";
import eventImg from "@/assets/event.jpg";
import libraryImg from "@/assets/library.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Club GTEL — Génie des Télécommunications, ENSPY" },
      {
        name: "description",
        content:
          "Actualités du département, galerie, fiches des unités d'enseignement et bibliothèque de parrainage L3–L5 du club GTEL de l'ENSPY.",
      },
      { property: "og:title", content: "Club GTEL — Génie des Télécommunications, ENSPY" },
      {
        property: "og:description",
        content: "La vitrine numérique de la filière GTEL : actualités, filière, parrainage.",
      },
    ],
  }),
  component: Index,
});

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[38rem] overflow-hidden">
      <motion.div style={{ scale, y }} className="absolute inset-0 scanlines">
        <img
          src={heroImg}
          alt="Laboratoire de télécommunications éclairé par des fibres optiques bleues"
          width={1920}
          height={1088}
          className="h-full w-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: "var(--gradient-hero)" }}
          aria-hidden
        />
      </motion.div>

      <motion.div style={{ opacity }} className="relative flex h-full items-end pb-20">
        <div className="container-x">
          <Reveal y={0}>
            <p className="eyebrow">École Nationale Supérieure Polytechnique de Yaoundé</p>
          </Reveal>
          <h1 className="mt-6 max-w-5xl text-[13vw] leading-[0.86] font-bold tracking-tighter sm:text-[9vw] lg:text-[7.5rem]">
            <RevealText text="CLUB GTEL" />
            <span className="block text-gradient-blue">
              <RevealText text="Télécommunications" delay={0.15} />
            </span>
          </h1>

          <div className="mt-10 flex flex-col gap-8 border-t border-border/60 pt-8 md:flex-row md:items-end md:justify-between">
            <Reveal delay={0.35}>
              <p className="max-w-md text-base text-muted-foreground">
                Un point d'information unique sur la vie du département, la filière et la mémoire
                académique transmise de promotion en promotion.
              </p>
            </Reveal>
            <Reveal delay={0.45}>
              <div className="flex flex-wrap gap-3">
                <Link
                  to={isMember ? "/bibliotheque" : "/auth"}
                  className="group relative inline-flex items-center gap-2 overflow-hidden bg-primary px-6 py-3.5 font-mono text-xs uppercase tracking-[0.16em] text-primary-foreground"
                >
                  <span className="relative">
                    {isMember ? "Bibliothèque de parrainage" : "Espace membre"}
                  </span>
                  <ArrowUpRight className="relative h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
                <Link
                  to="/actualites"
                  className="group inline-flex items-center gap-2 border border-border px-6 py-3.5 font-mono text-xs uppercase tracking-[0.16em] transition-colors duration-500 hover:border-primary"
                >
                  Actualités
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/50 pulse-ring">
          <ArrowDown className="h-4 w-4 text-glow" />
        </span>
      </motion.div>
    </section>
  );
}

function Marquee() {
  const items = [
    "Réseaux mobiles",
    "Fibre optique",
    "Traitement du signal",
    "Antennes & propagation",
    "Sécurité réseau",
    "Systèmes embarqués",
  ];
  return (
    <div className="overflow-hidden border-y bg-ink py-5">
      <div className="marquee-track gap-10">
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <span
            key={i}
            className="flex shrink-0 items-center gap-10 font-mono text-xs uppercase tracking-[0.28em] text-steel"
          >
            {item}
            <span className="h-1 w-1 rounded-full bg-primary" />
          </span>
        ))}
      </div>
    </div>
  );
}

function Index() {
  return (
    <>
      <Hero />
      <Marquee />

      {/* Manifeste — thème graphite (page /club) */}
      <section className="theme-graphite py-28 md:py-36">
        <div className="container-x grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
          <div>
            <Reveal>
              <p className="eyebrow">01 — Le club</p>
            </Reveal>
            <h2 className="mt-6 text-4xl leading-[1.02] font-semibold md:text-6xl">
              <RevealText text="Une filière, une mémoire, une communauté." />
            </h2>
            <Reveal delay={0.2}>
              <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
                Le club GTEL rassemble les étudiants du Génie des Télécommunications de l'ENSPY.
                Il documente la vie du département, structure la présentation de la filière et
                conserve les ressources académiques accumulées au fil des promotions.
              </p>
            </Reveal>
            <div className="mt-12 grid grid-cols-2 gap-8">
              {CHIFFRES.map((c, i) => (
                <Reveal key={c.label} delay={0.1 * i}>
                  <p className="font-display text-5xl font-bold text-gradient-blue">{c.valeur}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{c.label}</p>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.3}>
              <Link
                to="/club"
                className="mt-10 inline-flex items-center gap-2 border border-border px-6 py-3.5 font-mono text-xs uppercase tracking-[0.16em] transition-colors duration-500 hover:border-primary"
              >
                Découvrir le club <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <Reveal className="sm:mt-16">
              <ParallaxMedia
                src={studentsImg}
                alt="Étudiants GTEL travaillant sur des équipements réseau"
                className="h-[22rem] w-full"
              />
            </Reveal>
            <Reveal delay={0.15}>
              <ParallaxMedia
                src={fiberImg}
                alt="Faisceau de fibres optiques bleues"
                className="h-[22rem] w-full"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Bandeau bibliothèque — thème cendre (page /bibliotheque) */}
      <section className="theme-ash relative h-[70svh] min-h-[26rem] overflow-hidden">
        <ParallaxMedia
          src={towerImg}
          alt="Antenne de télécommunications sous un ciel gris"
          className="absolute inset-0 h-full w-full"
          strength={90}
          scrim
        />
        <div className="relative z-3 flex h-full items-center">
          <div className="container-x">
            <h2 className="max-w-3xl text-4xl leading-[1.02] font-semibold md:text-6xl">
              <RevealText text="Ce qui se transmet ne doit pas se perdre." />
            </h2>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-xl text-muted-foreground">
                Anciens sujets, TD corrigés, supports de cours : la bibliothèque de parrainage
                centralise ce que chaque promotion lègue à la suivante.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <Link
                to="/bibliotheque"
                className="mt-8 inline-flex items-center gap-2 border border-border px-6 py-3.5 font-mono text-xs uppercase tracking-[0.16em] transition-colors duration-500 hover:border-primary"
              >
                Ouvrir la bibliothèque <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Actualités — thème noir doux (page /actualites) */}
      <section className="theme-soft-black py-28 md:py-36">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
            <Reveal>
              <p className="eyebrow">02 — Actualités</p>
            </Reveal>
            <h2 className="mt-6 text-4xl font-semibold md:text-5xl">
              <RevealText text="À la une du département" />
            </h2>
          </div>
          <Reveal delay={0.2}>
            <Link
              to="/actualites"
              className="hover-line font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground hover:text-foreground"
            >
              Toutes les actualités
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 divide-y divide-border/60 border-y border-border/60">
          {ACTUALITES.slice(0, 3).map((a, i) => (
            <Reveal key={a.slug} delay={0.08 * i}>
              <Link
                to="/actualites"
                className="group grid gap-4 py-8 transition-colors duration-500 md:grid-cols-[9rem_1fr_auto] md:items-baseline md:gap-8"
              >
                <span className="font-mono text-xs tracking-[0.16em] text-steel uppercase">
                  {a.date}
                </span>
                <span>
                  <span className="block font-display text-2xl leading-snug transition-colors duration-500 group-hover:text-glow md:text-3xl">
                    {a.titre}
                  </span>
                  <span className="mt-2 block max-w-2xl text-sm text-muted-foreground">
                    {a.resume}
                  </span>
                </span>
                <span className="border border-border px-3 py-1 font-mono text-[0.65rem] tracking-[0.16em] uppercase text-muted-foreground">
                  {a.categorie}
                </span>
              </Link>
            </Reveal>
          ))}
          </div>
        </div>
      </section>

      {/* Filière — thème ardoise (page /filiere) */}
      <section className="theme-slate border-y py-28 md:py-36">
        <div className="container-x">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <Reveal>
                <p className="eyebrow">03 — La filière</p>
              </Reveal>
              <h2 className="mt-6 text-4xl leading-[1.02] font-semibold md:text-5xl">
                <RevealText text="Unités d'enseignement, de la L3 à la L5" />
              </h2>
              <Reveal delay={0.2}>
                <p className="mt-6 text-muted-foreground">
                  Chaque UE est présentée avec son volume horaire, ses crédits, son semestre et
                  l'enseignant responsable lorsque l'information est disponible.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <Link
                  to="/filiere"
                  className="mt-8 inline-flex items-center gap-2 border border-primary/60 px-6 py-3.5 font-mono text-xs uppercase tracking-[0.16em] transition-colors duration-500 hover:bg-primary hover:text-primary-foreground"
                >
                  Explorer la filière <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Reveal>
            </div>

            <div className="space-y-4">
              {UES.slice(0, 4).map((ue, i) => (
                <Reveal key={ue.code} delay={0.08 * i}>
                  <div className="group relative overflow-hidden border border-border/70 p-7 transition-colors duration-500 hover:border-primary/60">
                    <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-primary transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
                    <div className="flex flex-wrap items-center gap-3 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-steel">
                      <span className="text-glow">{ue.code}</span>
                      <span>·</span>
                      <span>{ue.niveau}</span>
                      <span>·</span>
                      <span>{ue.credits} crédits</span>
                    </div>
                    <h3 className="mt-3 font-display text-2xl">{ue.intitule}</h3>
                    <p className="mt-3 text-sm text-muted-foreground">{ue.resume}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Galerie teaser — thème bleu profond (page /galerie) */}
      <section className="theme-deep-blue py-28 md:py-36">
        <div className="container-x">
        <Reveal>
          <p className="eyebrow">04 — Galerie</p>
        </Reveal>
        <h2 className="mt-6 max-w-3xl text-4xl leading-[1.02] font-semibold md:text-6xl">
          <RevealText text="La vie du club, image par image" />
        </h2>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            { src: eventImg, alt: "Cérémonie du club GTEL en amphithéâtre", label: "Forum Télécoms" },
            { src: libraryImg, alt: "Documents de parrainage empilés sur un bureau", label: "Parrainage" },
            { src: studentsImg, alt: "Séance de travaux pratiques réseau", label: "Travaux pratiques" },
          ].map((item, i) => (
            <Reveal key={item.label} delay={0.1 * i}>
              <Link to="/galerie" className="group block">
                <ParallaxMedia src={item.src} alt={item.alt} className="h-[26rem] w-full" strength={40} />
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {item.label}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-steel transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-glow" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        </div>
      </section>

      {/* CTA — thème minuit (page /contact) */}
      <section className="theme-midnight relative overflow-hidden border-t py-28 md:py-36">
        <div className="pointer-events-none absolute inset-x-0 -bottom-40 mx-auto h-96 w-[60rem] rounded-full bg-primary/20 blur-[140px]" />
        <div className="container-x relative text-center">
          <h2 className="mx-auto max-w-4xl text-4xl leading-[1.02] font-semibold md:text-6xl">
            <RevealText text="Rejoignez la Cellule Communication" />
          </h2>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-xl text-muted-foreground">
              Publier une annonce, alimenter la galerie ou déposer un document dans la bibliothèque :
              tout passe par un espace membre simple à prendre en main.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <Link
              to="/contact"
              className="mt-10 inline-flex items-center gap-2 bg-primary px-8 py-4 font-mono text-xs uppercase tracking-[0.16em] text-primary-foreground transition-opacity duration-500 hover:opacity-90"
            >
              Nous écrire <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
