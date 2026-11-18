
import Link from "next/link";
import {
  Users,
  ClipboardCheck,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";

const dashboardCards = [
  {
    title: "Agent Applications",
    description: "Review pending agent registration applications.",
    href: "/admin/agents",
    icon: ClipboardCheck,
  },
  {
    title: "Registered Agents",
    description: "View agents whose applications have been approved.",
    href: "/admin/agents/registered",
    icon: Users,
  },
];

export default function AdminOverviewPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <section>
        <p className="text-sm font-medium text-blue-700">
          Administration
        </p>

        <h1 className="mt-2 text-2xl font-bold text-slate-900">
          Dashboard Overview
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Manage agent applications and monitor platform administration.
        </p>
      </section>

      <section className="rounded-xl border border-blue-100 bg-white p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <div className="rounded-xl bg-blue-50 p-3 text-blue-700">
            <ShieldCheck size={25} />
          </div>

          <div>
            <h2 className="font-semibold text-slate-900">
              Welcome to ElectionWatch Administration
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Manage agent registrations, review verification
              submissions, and maintain oversight of the platform.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-slate-900">
          Management
        </h2>

        <div className="grid gap-5 md:grid-cols-2">
          {dashboardCards.map((card) => {
            const Icon = card.icon;

            return (
              <Link
                key={card.href}
                href={card.href}
                className="group rounded-xl border border-slate-200 bg-white p-6 transition hover:border-blue-300 hover:shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="rounded-lg bg-blue-50 p-3 text-blue-700">
                    <Icon size={22} />
                  </div>

                  <ArrowUpRight
                    size={19}
                    className="text-slate-400 transition group-hover:text-blue-700"
                  />
                </div>

                <h3 className="mt-5 font-semibold text-slate-900">
                  {card.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {card.description}
                </p>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
