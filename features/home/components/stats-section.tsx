
import {
  MapPinned,
  Users,
  FileCheck2,
  ShieldCheck,
} from "lucide-react";

const capabilities = [
  {
    icon: MapPinned,
    title: "Nationwide Coverage",
    description: "Structured monitoring across states, LGAs, wards and polling units.",
  },
  {
    icon: Users,
    title: "Agent Network",
    description: "Organized election agents with controlled polling-unit assignments.",
  },
  {
    icon: FileCheck2,
    title: "Result Documentation",
    description: "Structured reporting with supporting evidence and submission history.",
  },
  {
    icon: ShieldCheck,
    title: "Accountability",
    description: "Role-based access, verification workflows and audit trails.",
  },
];

export default function StatsSection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">

        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-700">
            Built for accountability
          </p>

          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            A stronger foundation for election monitoring
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-500">
            Bringing election information, field reporting and
            accountability processes together in one platform.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group rounded-2xl border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700 transition group-hover:bg-blue-700 group-hover:text-white">
                  <Icon size={23} />
                </div>

                <h3 className="mt-6 text-lg font-bold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
