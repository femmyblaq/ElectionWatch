function ElectionCardSkeleton() {
  return (
    <div className="animate-pulse rounded-xl border border-slate-200 bg-white p-6">
      <div className="flex justify-between">
        <div className="h-6 w-24 rounded bg-slate-200" />
        <div className="h-6 w-20 rounded bg-slate-200" />
      </div>

      <div className="mt-6 h-6 w-3/4 rounded bg-slate-200" />
      <div className="mt-3 h-4 w-full rounded bg-slate-200" />
      <div className="mt-2 h-4 w-2/3 rounded bg-slate-200" />

      <div className="mt-8 space-y-3 border-t border-slate-100 pt-5">
        <div className="h-4 w-1/2 rounded bg-slate-200" />
        <div className="h-4 w-1/3 rounded bg-slate-200" />
      </div>

      <div className="mt-6 h-11 rounded-lg bg-slate-200" />
    </div>
  );
}

export default function ElectionsLoading() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl animate-pulse px-5 py-16 lg:px-8">
          <div className="h-4 w-32 rounded bg-slate-200" />
          <div className="mt-5 h-10 max-w-xl rounded bg-slate-200" />
          <div className="mt-4 h-4 max-w-2xl rounded bg-slate-200" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <div className="h-16 animate-pulse rounded-xl bg-slate-200" />

        <div className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <ElectionCardSkeleton key={index} />
          ))}
        </div>
      </section>
    </main>
  );
}