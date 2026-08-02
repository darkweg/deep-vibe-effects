import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Download, Search } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { DOCUMENTS } from "@/lib/gtel-data";

export const Route = createFileRoute("/bibliotheque")({
  head: () => ({
    meta: [
      { title: "Bibliothèque de parrainage L3–L5 — Club GTEL" },
      {
        name: "description",
        content:
          "Anciens sujets, TD corrigés et supports de cours de la filière GTEL, classés par niveau et par unité d'enseignement, en téléchargement libre.",
      },
      { property: "og:title", content: "Bibliothèque de parrainage L3–L5 — Club GTEL" },
      {
        property: "og:description",
        content: "La mémoire académique de la filière GTEL, transmise de promotion en promotion.",
      },
    ],
  }),
  component: Bibliotheque,
});

const NIVEAUX = ["Tous", "L3", "L4", "L5"] as const;

function Bibliotheque() {
  const [niveau, setNiveau] = useState<(typeof NIVEAUX)[number]>("Tous");
  const [q, setQ] = useState("");

  const liste = useMemo(() => {
    const term = q.trim().toLowerCase();
    return DOCUMENTS.filter(
      (d) =>
        (niveau === "Tous" || d.niveau === niveau) &&
        (term === "" ||
          [d.titre, d.matiere, d.type, d.annee].join(" ").toLowerCase().includes(term)),
    );
  }, [niveau, q]);

  return (
    <>
      <PageHeader
        eyebrow="Bibliothèque de parrainage"
        title="La mémoire académique de la filière"
        intro="Anciens sujets, TD corrigés et supports transmis par les promotions précédentes. Téléchargement libre pour tous les visiteurs, dépôt réservé aux contributeurs."
      />

      <section className="container-x py-20">
        <Reveal>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
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

            <label className="flex items-center gap-3 border border-border px-4 py-2.5 transition-colors duration-500 focus-within:border-primary md:w-80">
              <Search className="h-4 w-4 text-steel" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Matière, année, type de document"
                className="w-full bg-transparent text-sm outline-none placeholder:text-steel"
              />
            </label>
          </div>
        </Reveal>

        <div className="mt-12 border-t border-border/60">
          {liste.map((d, i) => (
            <Reveal key={d.titre} delay={0.04 * i}>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="group grid gap-3 border-b border-border/60 py-6 transition-colors duration-500 hover:bg-secondary/40 md:grid-cols-[4rem_1fr_9rem_7rem_6rem_auto] md:items-center md:gap-6 md:px-4"
              >
                <span className="font-mono text-xs tracking-[0.18em] text-glow">{d.niveau}</span>
                <span className="font-display text-lg leading-snug transition-colors duration-500 group-hover:text-glow">
                  {d.titre}
                </span>
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">
                  {d.matiere}
                </span>
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">
                  {d.type}
                </span>
                <span className="font-mono text-[0.65rem] tracking-[0.16em] text-steel">
                  {d.annee} · {d.taille}
                </span>
                <span className="inline-flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground transition-colors duration-500 group-hover:text-foreground">
                  PDF
                  <Download className="h-4 w-4 transition-transform duration-500 group-hover:translate-y-0.5" />
                </span>
              </a>
            </Reveal>
          ))}

          {liste.length === 0 && (
            <p className="py-16 text-center text-sm text-muted-foreground">
              Aucun document ne correspond à cette recherche.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
