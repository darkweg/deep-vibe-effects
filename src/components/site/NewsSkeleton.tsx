/** Placeholder cards shown while the Actualités feed prepares its media. */
export function NewsSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-8 sm:space-y-10" aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="glass-card grid animate-pulse gap-5 rounded-2xl p-3 sm:gap-8 sm:p-4 md:grid-cols-[1.1fr_1.4fr] md:items-center md:p-6"
        >
          <div className="aspect-video w-full rounded-xl bg-muted/60 md:aspect-auto md:h-[18rem]" />
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="h-5 w-24 rounded-full bg-muted/60" />
              <div className="h-5 w-20 rounded-full bg-muted/50" />
            </div>
            <div className="h-8 w-4/5 rounded-lg bg-muted/60" />
            <div className="h-8 w-3/5 rounded-lg bg-muted/50" />
            <div className="h-4 w-full rounded bg-muted/40" />
            <div className="h-4 w-2/3 rounded bg-muted/40" />
          </div>
        </div>
      ))}
    </div>
  );
}
