import Link from "next/link";
import {
  ArrowUpRight,
  CalendarDays,
  MapPin,
} from "lucide-react";
import type { Election } from "@/types/elections";

const statusStyles = {
  UPCOMING: "bg-blue-50 text-blue-700",
  ONGOING: "bg-emerald-50 text-emerald-700",
  COMPLETED: "bg-slate-100 text-slate-600",
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-NG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

export default function ElectionCard({
  election,
}: {
  election: Election;
}) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6 transition hover:border-blue-300 hover:shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <span className="rounded-md bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
          {election.electionType}
        </span>

        <span
          className={`rounded-md px-3 py-1.5 text-xs font-bold ${
            statusStyles[election.status]
          }`}
        >
          {election.status}
        </span>
      </div>

      <h2 className="mt-5 text-lg font-bold text-slate-900">
        {election.title}
      </h2>

      <p className="mt-2 flex-1 text-sm leading-6 text-slate-500">
        {election.description}
      </p>

      <div className="mt-6 space-y-3 border-t border-slate-100 pt-5">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <CalendarDays size={16} className="text-slate-400" />
          {formatDate(election.date)}
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-600">
          <MapPin size={16} className="text-slate-400" />
          {election.state}, Nigeria
        </div>
      </div>

      <Link
        href={`/elections/${election.id}`}
        className="mt-6 inline-flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-700 hover:text-blue-700"
      >
        View election details
        <ArrowUpRight size={17} />
      </Link>
    </article>
  );
}