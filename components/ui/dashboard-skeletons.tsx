import { Skeleton } from "./skeleton";

export function StatCardSkeleton() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <Skeleton className="h-4 w-28" />

      <Skeleton className="mt-4 h-8 w-24" />

      <Skeleton className="mt-3 h-3 w-36" />
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <Skeleton className="mb-6 h-5 w-40" />

      <div className="flex h-64 items-end gap-3">
        {Array.from({ length: 7 }).map((_, index) => (
          <Skeleton
            key={index}
            className="flex-1 rounded-t-md"
            style={{
              height: `${35 + index * 8}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function TableSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white p-5">
      <Skeleton className="mb-6 h-5 w-44" />

      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="flex items-center gap-4 border-b border-slate-100 py-4"
        >
          <Skeleton className="h-10 w-10 rounded-full" />

          <div className="flex-1 space-y-2">
            <Skeleton className="h-3 w-32" />
            <Skeleton className="h-3 w-48" />
          </div>

          <Skeleton className="h-7 w-20 rounded-full" />
        </div>
      ))}
    </div>
  );
}

export function MapSkeleton() {
  return (
    <div className="relative flex h-[400px] items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
      <Skeleton className="absolute inset-0 rounded-none opacity-60" />
      <div className="relative space-y-3 text-center">
        <Skeleton className="mx-auto h-10 w-10 rounded-full" />
        <Skeleton className="h-3 w-32" />
      </div>
    </div>
  );
}