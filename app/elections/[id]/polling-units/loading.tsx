function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-slate-200 ${className}`}
    />
  );
}

export default function PollingUnitsLoading() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="mt-8 h-9 max-w-lg" />
          <Skeleton className="mt-4 h-4 max-w-2xl" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-6 px-5 py-10 lg:px-8">
        <Skeleton className="h-40 w-full rounded-xl" />

        <div className="grid gap-4 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-28 rounded-xl" />
          ))}
        </div>

        <Skeleton className="h-80 w-full rounded-xl" />
      </section>
    </main>
  );
}