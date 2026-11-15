// features/analytics/components/election-chart.tsx

// "use client";

// import dynamic from "next/dynamic";
// import { ChartSkeleton } from "@/components/ui/chart-skeleton";

// const ElectionChart = dynamic(
//   () => import("./cart").then((mod) => mod.ElectionChart),
//   {
//     loading: () => <ChartSkeleton />,
//     ssr: false,
//   }
// );

// export default function ElectionChartSection() {
//   return <ElectionChart />;
// }