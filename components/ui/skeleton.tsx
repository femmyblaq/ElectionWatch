import type { CSSProperties } from "react";
import { cn } from "../../hooks/lib/utils";

type SkeletonProps = {
  className?: string;
  style?: CSSProperties;
};

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "animate-pulse rounded-md bg-slate-200",
        className
      )}
    />
  );
}