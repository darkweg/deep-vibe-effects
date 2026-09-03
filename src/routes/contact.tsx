import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ArrowUpRight, MapPin, Mail, ShieldCheck, Send } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & espace membre — Club GTEL" },
      {
        name: "description",
        content:
          "Écrire au Bureau du club GTEL de l'ENSPY, proposer une actualité, déposer un document de parrainage ou rejoindre la Cellule Communication.",
      },
      { property: "og:title", content: "Contact & espace membre — Club GTEL" },
      {
        property: "og:description",
        content: "Contacter le Bureau du club GTEL et rejoindre la Cellule Communication.",
      },
    ],
  }),
  component: Contact,
});

const CHAMPS = [
  { name: "nom", label: "Nom et prénom", type: "text", placeholder: "Votre nom" },
  { name: "email", label: "Adresse e-mail", type: "email", placeholder: "vous@enspy.cm" },
  { name: "promo", label: "Promotion / statut", type: "text", placeholder: "GTEL 4, enseignant, externe…" },
] as const;

function Contact() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="theme-midnight min-h-screen">
      <PageHeader
        eyebrow="Contact"
        title="Écrire au Bureau du club"
        intro="Proposer une actualité, signaler un document manquant dans la bibliothèque ou rejoindre la Cellule Communication : ce formulaire arrive directement au Bureau."
      />

      <section className="container-x py-12 sm:py-20">
        <div className="grid gap-10 sm:gap-14 lg:grid-cols-[1.3fr_1fr] lg:gap-24">
          <Reveal>
            <form onSubmit={onSubmit} className="space-y-8">
              {CHAMPS.map((c) => (
                <div key={c.name}>
                  <label
                    htmlFor={c.name}
                    className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-steel"
                  >
                    {c.label}
                  </label>
                  <input
                    id={c.name}
                    name={c.name}
                    type={c.type}
                    required
                    placeholder={c.placeholder}
                    className="mt-3 w-full border-b border-border bg-transparent pb-3 text-lg outline-none transition-colors duration-500 placeholder:text-steel/70 focus:border-primary"
                  />
                </div>
              ))}

              <div>
                <label
                  htmlFor="message"
                  className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-steel"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  placeholder="Votre message au Bureau…"
                  className="mt-3 w-full resize-none border-b border-border bg-transparent pb-3 text-lg outline-none transition-colors duration-500 placeholder:text-steel/70 focus:border-primary"
                />
              </div>

              <button
                type="submit"
                className="btn-glow hover-sheen group inline-flex items-center gap-2 rounded-full px-8 py-4"
              >
                <Send className="h-4 w-4" />
                {sent ? "Message envoyé" : "Envoyer"}
                <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>

              {sent && (
                <p className="text-sm text-glow">
                  Merci — le Bureau revient vers vous dans les meilleurs délais.
                </p>
              )}
            </form>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="glass-card space-y-10 rounded-2xl p-8">
              <div>
                <p className="badge-cyan"><MapPin className="h-3 w-3" /> Adresse</p>
                <p className="mt-3 text-muted-foreground">
                  École Nationale Supérieure Polytechnique
                  <br />
                  Université de Yaoundé I<br />
                  Département de Télécommunications
                </p>
              </div>
              <div>
                <p className="badge-cyan"><Mail className="h-3 w-3" /> E-mail</p>
                <p className="mt-3 text-muted-foreground">wambougloria@gmail.com</p>
              </div>
              <div>
                <p className="badge-cyan"><ShieldCheck className="h-3 w-3" /> Espace membre</p>
                <p className="mt-3 text-sm text-muted-foreground">
                  Réservé à la Cellule Communication, au Président et à l'Administrateur du site.
                  Les accès sont délivrés par le Bureau en début de mandat.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
