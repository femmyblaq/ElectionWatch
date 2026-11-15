import type { Metadata } from "next";
import PublicHeader from "@/components/layout/public-header";
import PublicFooter from "@/components/layout/public-footer";
import ElectionsList from "@/features/elections/components/elections-list";
import type { ElementType, ReactNode } from "react";
export const metadata: Metadata = {
  title: "Elections",
  description:
    "Browse election information and published election records.",
};

export default function ElectionsPage() {
  return (
    <>
      <PublicHeader />

      <main className="min-h-screen bg-slate-50">
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
            <p className="text-sm font-bold uppercase tracking-wider text-blue-800">
              Election directory
            </p>

            <h1 className="mt-4 max-w-3xl text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              Explore elections across Nigeria
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
              Browse election records, check election status and
              access available information about electoral activities.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-16">
          <ElectionsList />
        </section>
      </main>

      <PublicFooter />
    </>
  );
}