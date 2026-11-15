
import Link from "next/link";
import {
  Search,
  BarChart3,
  Map,
  FileSearch,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Election Information",
    description:
      "Access available election information and relevant electoral documentation.",
  },
  {
    icon: Map,
    title: "Polling Unit Visibility",
    description:
      "Explore Nigeria's electoral geography through states, LGAs, wards and polling units.",
  },
  {
    icon: BarChart3,
    title: "Results and Analytics",
    description:
      "Explore published, verified election results and their associated reporting context.",
  },
  {
    icon: FileSearch,
    title: "Submission Traceability",
    description:
      "Understand the reporting and verification history of submitted election information.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">

        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-700">
              Platform capabilities
            </p>

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Making election information more accessible.
            </h2>

            <p className="mt-5 leading-8 text-slate-500">
              Explore the tools designed to support transparent
              election reporting and public access to information.
            </p>
          </div>

          <Link
            href="/elections"
            className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-900"
          >
            Explore elections
            <ArrowRight size={17} />
          </Link>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="flex gap-5 rounded-2xl border border-slate-200 p-7 transition hover:border-blue-200 hover:bg-blue-50/40"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                  <Icon size={23} />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-500">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
