import { Reveal, RevealText } from "./Reveal";

export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro: string;
}) {
  return (
    <section className="relative overflow-hidden border-b pt-40 pb-20">
      <div className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-primary/20 blur-[130px]" />
      <div className="container-x relative">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
        </Reveal>
        <h1 className="mt-6 max-w-4xl text-5xl leading-[0.95] font-semibold md:text-7xl">
          <RevealText text={title} />
        </h1>
        <Reveal delay={0.2}>
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground">{intro}</p>
        </Reveal>
      </div>
    </section>
  );
}
