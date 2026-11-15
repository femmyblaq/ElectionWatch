
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  MapPin,
  FileCheck2,
  BarChart3,
  CheckCircle2,
} from "lucide-react";

const capabilities = [
  {
    icon: MapPin,
    title: "Polling Unit Monitoring",
    description: "Structured field-level reporting.",
  },
  {
    icon: FileCheck2,
    title: "Result Documentation",
    description: "Traceable election submissions.",
  },
  {
    icon: BarChart3,
    title: "Public Transparency",
    description: "Accessible election information.",
  },
];

export default function HeroSection() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">

        {/* Left content */}
        <div>
          <div className="mb-7 inline-flex items-center gap-2 rounded-md bg-blue-50 px-3 py-2 text-xs font-bold text-blue-800">
            <ShieldCheck size={16} />
            ELECTION TRANSPARENCY PLATFORM
          </div>

          <h1 className="max-w-2xl text-4xl font-extrabold leading-[1.15] tracking-tight text-slate-950 sm:text-5xl lg:text-[58px]">
            Building trust through
            <span className="block text-blue-700">
              transparent elections.
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
            A digital platform supporting election monitoring,
            structured polling-unit reporting and access to
            verified electoral information across Nigeria.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/elections"
              className="inline-flex items-center justify-center gap-3 rounded-lg bg-blue-800 px-7 py-4 text-sm font-semibold text-white transition hover:bg-blue-900"
            >
              Explore Elections
              <ArrowRight size={17} />
            </Link>

            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-7 py-4 text-sm font-semibold text-slate-700 transition hover:border-blue-700 hover:text-blue-700"
            >
              Learn About the Platform
            </Link>
          </div>

          <div className="mt-12 border-t border-slate-200 pt-7">
            <p className="mb-5 text-xs font-bold uppercase tracking-wider text-slate-500">
              Our core commitments
            </p>

            <div className="flex flex-wrap gap-x-6 gap-y-4">
              {[
                "Accountability",
                "Data Integrity",
                "Transparency",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2
                    size={16}
                    className="text-blue-700"
                  />
                  <span className="text-sm font-medium text-slate-700">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right platform preview */}
        <div className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-7">

          <div className="flex items-center justify-between border-b border-slate-200 pb-5">
            <div>
              <p className="text-sm font-bold text-slate-900">
                Election Monitoring
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Platform overview
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-800 text-white">
              <ShieldCheck size={21} />
            </div>
          </div>

          {/* Overview card */}
          <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Monitoring framework
            </p>

            <h3 className="mt-3 text-xl font-bold text-slate-900">
              Nationwide Election Coverage
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              A structured system for organizing election
              information and monitoring polling-unit activity.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {capabilities.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-lg border border-slate-200 p-3"
                  >
                    <Icon size={19} className="text-blue-700" />

                    <p className="mt-3 text-xs font-bold text-slate-800">
                      {item.title}
                    </p>

                    <p className="mt-1 text-[11px] leading-5 text-slate-500">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Reporting process */}
          <div className="mt-4 rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-sm font-bold text-slate-900">
              Reporting and verification
            </p>

            <div className="mt-5 space-y-4">
              {[
                "Agent assignment",
                "Polling unit reporting",
                "Submission review",
                "Result publication",
              ].map((step, index) => (
                <div key={step} className="flex items-center gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-blue-50 text-xs font-bold text-blue-800">
                    {index + 1}
                  </div>

                  <p className="text-sm font-medium text-slate-700">
                    {step}
                  </p>

                  <div className="ml-auto">
                    <CheckCircle2
                      size={16}
                      className="text-slate-400"
                    />
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-4 border-t border-slate-100 pt-3 text-[11px] text-slate-400">
              Illustrative workflow. No live election data displayed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
