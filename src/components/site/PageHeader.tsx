import { Reveal, RevealText } from "./Reveal";
import { Ambient } from "./Ambient";
import { Sparkles } from "lucide-react";

export function PageHeader({
  eyebrow,
  title,
  intro,
  titleClassName = "",
}: {
  eyebrow: string;
  title: string;
  intro: string;
  titleClassName?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b pt-28 pb-12 sm:pt-40 sm:pb-24">
      <Ambient />
      <div className="container-x relative">
        <Reveal>
          <span className="badge-cyan">
            <Sparkles className="h-3 w-3" />
            {eyebrow}
          </span>
        </Reveal>
        <h1 className={`mt-5 max-w-5xl font-display text-[clamp(2rem,9vw,3rem)] leading-[0.95] font-extrabold tracking-tight sm:mt-7 sm:text-6xl md:text-7xl lg:text-8xl ${titleClassName}`}>
          <RevealText text={title} />
        </h1>
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-2xl text-base text-mist sm:mt-8 sm:text-lg">{intro}</p>
        </Reveal>
      </div>
    </section>
  );
}