import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";
import { notFound } from "next/navigation";

import PublicHeader from "@/components/layout/public-header";
import PublicFooter from "@/components/layout/public-footer";
import PollingUnitExplorer from "@/features/polling-units/components/polling-unit-explorer";
import { elections } from "@/features/elections/data/elections";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function PollingUnitsPage({
  params,
}: PageProps) {
  const { id } = await params;

  const election = elections.find(
    (item) => item.id === id
  );

  if (!election) {
    notFound();
  }

  return (
    <>
      <PublicHeader />

      <main className="min-h-screen bg-slate-50">
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
            <Link
              href={`/elections/${election.id}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-700"
            >
              <ArrowLeft size={16} />
              Back to election details
            </Link>

            <div className="mt-8 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-800">
                <MapPin size={22} />
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-blue-800">
                  Polling unit coverage
                </p>

                <h1 className="mt-1 text-2xl font-extrabold text-slate-950 sm:text-3xl">
                  {election.title}
                </h1>
              </div>
            </div>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600">
              Explore the geographic structure associated with
              this election, from states and local government
              areas to wards and individual polling units.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
          <PollingUnitExplorer />
        </section>
      </main>

      <PublicFooter />
    </>
  );
}