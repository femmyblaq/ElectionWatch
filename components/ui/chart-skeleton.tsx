// components/ui/chart-skeleton.tsx

export function ChartSkeleton() {
  return (
    <div className="w-full animate-pulse rounded-xl border border-gray-200 bg-white p-5">
      <div className="mb-6 h-5 w-40 rounded bg-gray-200" />

      <div className="flex h-64 items-end gap-3">
        {Array.from({ length: 7 }).map((_, index) => (
          <div
            key={index}
            className="flex-1 rounded-t-md bg-gray-200"
            style={{
              height: `${35 + index * 8}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}