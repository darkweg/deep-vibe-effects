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
    <section className="relative overflow-hidden border-b pt-40 pb-24">
      <Ambient />
      <div className="container-x relative">
        <Reveal>
          <span className="badge-cyan">
            <Sparkles className="h-3 w-3" />
            {eyebrow}
          </span>
        </Reveal>
        <h1 className={`mt-7 max-w-5xl font-display text-5xl leading-[0.92] font-extrabold tracking-tight md:text-7xl lg:text-8xl ${titleClassName}`}>
          <RevealText text={title} />
        </h1>
        <Reveal delay={0.2}>
          <p className="mt-8 max-w-2xl text-lg text-mist">{intro}</p>
        </Reveal>
      </div>
    </section>
  );
}