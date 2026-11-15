function DetailSkeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-slate-200 ${className}`}
    />
  );
}

export default function ElectionDetailsLoading() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
          <DetailSkeleton className="h-4 w-32" />
          <DetailSkeleton className="mt-10 h-4 w-36" />
          <DetailSkeleton className="mt-4 h-10 max-w-xl" />
          <DetailSkeleton className="mt-4 h-4 max-w-2xl" />
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="rounded-xl border border-slate-200 bg-white p-5"
            >
              <DetailSkeleton className="h-4 w-28" />
              <DetailSkeleton className="mt-5 h-6 w-40" />
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="rounded-xl border border-slate-200 bg-white p-6"
            >
              <DetailSkeleton className="h-6 w-40" />
              <DetailSkeleton className="mt-6 h-28 w-full" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}