/** Ambient background: drifting neon grid + floating blurred light orbs. */
export function Ambient({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div className="grid-drift absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div
        className="orb h-[28rem] w-[28rem] -top-24 -left-20"
        style={{ background: "rgb(0 102 255 / 0.35)" }}
      />
      <div
        className="orb h-[22rem] w-[22rem] top-1/3 right-[-6rem]"
        style={{ background: "rgb(0 240 255 / 0.22)", animationDelay: "-6s" }}
      />
      <div
        className="orb h-[26rem] w-[26rem] -bottom-32 left-1/3"
        style={{ background: "rgb(59 141 255 / 0.2)", animationDelay: "-11s" }}
      />
    </div>
  );
}
