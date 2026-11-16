import { Skeleton } from "@/components/ui/skeleton";

export default function VerificationLoading() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-5xl space-y-7">
        <div className="space-y-3">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-9 w-80" />
          <Skeleton className="h-4 w-full max-w-xl" />
        </div>

        <Skeleton className="h-24 w-full rounded-xl" />

        {[1, 2, 3, 4].map((item) => (
          <Skeleton
            key={item}
            className="h-64 w-full rounded-xl"
          />
        ))}
      </div>
    </main>
  );
}