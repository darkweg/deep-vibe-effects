import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import {
  ArrowUpRight,
  ArrowDown,
  BookOpen,
  CalendarDays,
  GraduationCap,
  Images,
  Newspaper,
  Radio,
  Users,
} from "lucide-react";
import { Reveal, RevealText } from "@/components/site/Reveal";
import { Ambient } from "@/components/site/Ambient";
import { Counter } from "@/components/site/Counter";
import { ParallaxMedia } from "@/components/site/ParallaxMedia";
import { ACTUALITES, CHIFFRES, UES } from "@/lib/gtel-data";
import { useAuth } from "@/hooks/useAuth";

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
  const { isMember } = useAuth();
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

      <Ambient className="z-1 opacity-90" />

      <motion.div style={{ opacity }} className="relative z-2 flex h-full items-end pb-14 sm:pb-20">
        <div className="container-x">
          <Reveal y={0}>
            <span className="badge-cyan">
              <Radio className="h-3 w-3" />
              École Nationale Supérieure Polytechnique de Yaoundé
            </span>
          </Reveal>
          <h1 className="mt-6 max-w-6xl font-display text-[clamp(2.2rem,8.5vw,6.5rem)] leading-[0.92] font-extrabold tracking-tight break-words text-white">
            <RevealText text="CLUB GTEL" />
            <span className="block text-[clamp(1.15rem,4.6vw,4.6rem)] text-blue-600 ">
              <RevealText text="Télécommunications" delay={0.15} />
            </span>
          </h1>

          <div className="mt-10 flex flex-col gap-8 border-t border-border/60 pt-8 md:flex-row md:items-end md:justify-between">
            <Reveal delay={0.35}>
              <p className="max-w-md text-base text-white" >
                Un point d'information unique sur la vie du département, la filière et la mémoire
                académique transmise de promotion en promotion.
              </p>
            </Reveal>
            <Reveal delay={0.45}>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  to={isMember ? "/bibliotheque" : "/auth"}
                  className="btn-glow hover-sheen group inline-flex items-center gap-2 rounded-full px-6 py-3.5"
                >
                  {isMember ? <BookOpen className="h-4 w-4  text-white " /> : <Users className="h-4 w-4  text-white" />}
                  <span className="relative text-white">
                    {isMember ? "Bibliothèque de parrainage" : "Espace membre"}
                  </span>
                  <ArrowUpRight className="relative h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 text-white"/>
                </Link>
                <Link
                  to="/actualites"
                  className="btn-ghost group inline-flex items-center gap-2 rounded-full px-6 py-3.5"
                >
                  <Newspaper className="h-4 w-4 text-white" />
                 <p className="text-white">Actualités</p> 
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
  const { isMember } = useAuth();
  return (
    <>
      <Hero />
      <Marquee />

      {/* Manifeste — thème graphite (page /club) */}
      <section className="theme-graphite py-16 sm:py-24 md:py-36">
        <div className="container-x grid gap-10 sm:gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
          <div>
            <Reveal>
              <span className="badge-cobalt  text-blue-950">
                <Users className="h-3 w-3  text-blue-950" /> 01 — Le club
              </span>
            </Reveal>
            <h2 className="mt-6 font-display text-3xl sm:text-4xl leading-[1.02] font-extrabold md:text-6xl">
              <RevealText text="Une filière, une mémoire, une communauté." />
            </h2>

            <Reveal delay={0.2}>
              <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
                Le club GTEL rassemble les étudiants du Génie des Télécommunications de l'ENSPY.
                Il documente la vie du département, structure la présentation de la filière et
                conserve les ressources académiques accumulées au fil des promotions.
              </p>
            </Reveal>
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
              {CHIFFRES.map((c, i) => (
                <Reveal key={c.label} delay={0.1 * i}>
                  <div className="glass-card rounded-2xl p-6">
                    <Counter
                      value={c.valeur}
                      className="font-display text-4xl sm:text-5xl font-extrabold text-gradient-blue  text-blue-950"
                   />
                    <p className="mt-2 text-sm text-mist">{c.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.3}>
              <Link
                to="/club"
                className="btn-ghost mt-10 inline-flex items-center gap-2 rounded-full px-6 py-3.5"
              >
                <Users className="h-4 w-4" /> Découvrir le club <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <Reveal className="sm:mt-16">
              <ParallaxMedia
                src={studentsImg}
                alt="Étudiants GTEL travaillant sur des équipements réseau"
                className="h-64 w-full rounded-2xl sm:h-[22rem]"
              />
            </Reveal>
            <Reveal delay={0.15}>
              <ParallaxMedia
                src={fiberImg}
                alt="Faisceau de fibres optiques bleues"
                className="h-64 w-full rounded-2xl sm:h-[22rem]"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Bandeau bibliothèque — réservé aux membres */}
      {isMember && (
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
            <h2 className="max-w-3xl font-display text-3xl sm:text-4xl leading-[1.02] font-extrabold md:text-6xl">
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
                className="btn-glow hover-sheen mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3.5"
              >
                <BookOpen className="h-4 w-4" /> Ouvrir la bibliothèque <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
      )}

      {/* Actualités — thème noir doux (page /actualites) */}
      <section className="theme-soft-black py-16 sm:py-24 md:py-36">
        <div className="container-x">
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
            <div>
            <Reveal>
              <span className="badge-cobalt"><Newspaper className="h-3 w-3" /> 02 — Actualités</span>
            </Reveal>
            <h2 className="mt-6 font-display text-3xl sm:text-4xl font-extrabold md:text-6xl">
              <RevealText text="À la une du département" />
            </h2>
          </div>
          <Reveal delay={0.2}>
            <Link
              to="/actualites"
              className="btn-ghost inline-flex items-center gap-2 rounded-full px-5 py-2.5"
            >
              <Newspaper className="h-3.5 w-3.5" />
              Toutes les actualités
            </Link>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-5 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
          {ACTUALITES.slice(0, 3).map((a, i) => (
            <Reveal key={a.slug} delay={0.08 * i} className="h-full">
              <Link
                to="/actualites"
                className="glass-card group flex h-full flex-col rounded-2xl p-7"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="badge-cyan">{a.categorie}</span>
                  <span className="badge-steel">
                    <CalendarDays className="h-3 w-3" />
                    {a.date}
                  </span>
                </div>
                <span className="mt-5 block font-display text-2xl leading-snug font-bold transition-colors duration-500 group-hover:text-cyan-glow">
                  {a.titre}
                </span>
                <span className="mt-3 block text-sm text-mist">{a.resume}</span>
                <span className="mt-6 inline-flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-glow">
                  Lire <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
              </Link>
            </Reveal>
          ))}
          </div>

        </div>
      </section>

      {/* Filière — réservée aux membres */}
      {isMember && (
      <section className="theme-slate border-y py-16 sm:py-24 md:py-36">
        <div className="container-x">
          <div className="grid gap-10 sm:gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-24 text-blue-950">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <Reveal>
                <span className="badge-cobalt"><GraduationCap className="h-3 w-3 text-blue-950" /> 03 — La filière</span>
              </Reveal>
              <h2 className="mt-6 font-display text-3xl sm:text-4xl leading-[1.02] font-extrabold md:text-6xl">
                <RevealText text="Unités d'enseignement, de la L3 à la L5" />
              </h2>
              <Reveal delay={0.2}>
                <p className="mt-6 text-mist">
                  Chaque UE est présentée avec son volume horaire, ses crédits, son semestre et
                  l'enseignant responsable lorsque l'information est disponible.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <Link
                  to="/filiere"
                  className="btn-glow hover-sheen mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3.5"
                >
                  <GraduationCap className="h-4 w-4" />
                  Explorer la filière <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Reveal>
            </div>

            <div className="space-y-4">
              {UES.slice(0, 4).map((ue, i) => (
                <Reveal key={ue.code} delay={0.08 * i}>
                  <div className="glass-card group rounded-2xl p-7">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="badge-cyan">{ue.code}</span>
                      <span className="badge-cobalt">{ue.niveau}</span>
                      <span className="badge-steel">{ue.credits} crédits</span>
                    </div>
                    <h3 className="mt-4 font-display text-2xl font-bold">{ue.intitule}</h3>
                    <p className="mt-3 text-sm text-mist">{ue.resume}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
      )}

      {/* Galerie teaser — thème bleu profond (page /galerie) */}
      <section className="theme-deep-blue py-16 sm:py-24 md:py-36">
        <div className="container-x">
        <Reveal>
          <span className="badge-cobalt">
            <Images className="h-3 w-3" /> 04 — Galerie
          </span>
        </Reveal>
        <h2 className="mt-6 max-w-3xl font-display text-3xl sm:text-4xl leading-[1.02] font-extrabold md:text-6xl">
          <RevealText text="La vie du club, image par image" />
        </h2>

        <div className="mt-10 grid gap-6 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { src: eventImg, alt: "Cérémonie du club GTEL en amphithéâtre", label: "Forum Télécoms" },
            { src: libraryImg, alt: "Documents de parrainage empilés sur un bureau", label: "Parrainage" },
            { src: studentsImg, alt: "Séance de travaux pratiques réseau", label: "Travaux pratiques" },
          ].map((item, i) => (
            <Reveal key={item.label} delay={0.1 * i}>
              <Link to="/galerie" className="group block">
                <ParallaxMedia
                  src={item.src}
                  alt={item.alt}
                  className="h-72 w-full rounded-2xl sm:h-[26rem] ring-1 ring-border transition-all duration-500 group-hover:ring-glow/60 group-hover:shadow-[0_30px_70px_-35px_rgb(0_102_255/0.9)]"
                  strength={40}
                />
                <div className="mt-4 flex items-center justify-between">
                  <span className="badge-steel">
                    <Images className="h-3 w-3" />
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
      <section className="theme-midnight relative overflow-hidden border-t py-16 sm:py-24 md:py-36">
        <Ambient />
        <div className="container-x relative text-center">
          <h2 className="mx-auto max-w-4xl font-display text-3xl sm:text-4xl leading-[1.02] font-extrabold md:text-6xl">
            <RevealText text="Rejoignez la Cellule Communication" />
          </h2>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-xl text-mist">
              Publier une annonce, alimenter la galerie ou déposer un document dans la bibliothèque :
              tout passe par un espace membre simple à prendre en main.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <Link
              to="/contact"
              className="btn-glow hover-sheen mt-10 inline-flex items-center gap-2 rounded-full px-8 py-4"
            >
              Nous écrire <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>


    </>
  );
}
