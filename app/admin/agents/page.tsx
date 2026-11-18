"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  RefreshCw,
  Eye,
  Users,
  Clock3,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import { getAgentApplications } from "@/hooks/lib/api/admin";
import type { AgentApplication } from "@/types/agent";

type FilterStatus = "ALL" | AgentApplication["status"];

const statusStyles: Record<string, string> = {
  UNDER_REVIEW: "bg-amber-50 text-amber-700",
  APPROVED: "bg-green-50 text-green-700",
  REJECTED: "bg-red-50 text-red-700",
  REQUIRES_CORRECTION: "bg-blue-50 text-blue-700",
};

function formatStatus(status: string) {
  return status.replaceAll("_", " ");
}

export default function AdminAgentsPage() {
  const [applications, setApplications] = useState<AgentApplication[]>([]);
  const [filter, setFilter] = useState<FilterStatus>("ALL");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadApplications = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAgentApplications();
      setApplications(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load applications."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadApplications();
  }, [loadApplications]);

  const counts = useMemo(
    () => ({
      total: applications.length,
      pending: applications.filter(
        (item) => item.status === "UNDER_REVIEW"
      ).length,
      approved: applications.filter(
        (item) => item.status === "APPROVED"
      ).length,
      corrections: applications.filter(
        (item) => item.status === "REQUIRES_CORRECTION"
      ).length,
    }),
    [applications]
  );

  const filteredApplications = useMemo(() => {
    return applications.filter((application) => {
      const matchesStatus =
        filter === "ALL" || application.status === filter;

      const query = search.trim().toLowerCase();

      const matchesSearch =
        !query ||
        application.fullName.toLowerCase().includes(query) ||
        application.email.toLowerCase().includes(query) ||
        application.id.toLowerCase().includes(query);

      return matchesStatus && matchesSearch;
    });
  }, [applications, filter, search]);

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-blue-700">
            Agent Management
          </p>
          <h2 className="mt-1 text-2xl font-bold text-slate-900">
            Agent Applications
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Review and manage agent registration applications.
          </p>
        </div>

        <button
          onClick={loadApplications}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Total applications",
            value: counts.total,
            icon: Users,
            color: "text-blue-700 bg-blue-50",
          },
          {
            label: "Awaiting review",
            value: counts.pending,
            icon: Clock3,
            color: "text-amber-700 bg-amber-50",
          },
          {
            label: "Approved agents",
            value: counts.approved,
            icon: CheckCircle2,
            color: "text-green-700 bg-green-50",
          },
          {
            label: "Corrections needed",
            value: counts.corrections,
            icon: AlertCircle,
            color: "text-purple-700 bg-purple-50",
          },
        ].map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-xl border border-slate-200 bg-white p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">{stat.label}</p>
                <span className={`rounded-lg p-2 ${stat.color}`}>
                  <Icon size={19} />
                </span>
              </div>

              <p className="mt-4 text-3xl font-bold text-slate-900">
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>

      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="flex flex-col gap-4 border-b border-slate-200 p-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="font-semibold text-slate-900">
              Submitted applications
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Search and filter applications by their current status.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search agent..."
                className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-blue-500 sm:w-64"
              />
            </div>

            <select
              value={filter}
              onChange={(event) =>
                setFilter(event.target.value as FilterStatus)
              }
              className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500"
            >
              <option value="ALL">All statuses</option>
              <option value="UNDER_REVIEW">Under review</option>
              <option value="APPROVED">Approved</option>
              <option value="REQUIRES_CORRECTION">
                Requires correction
              </option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="m-5 rounded-lg bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <div className="space-y-4 p-6">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-14 animate-pulse rounded-lg bg-slate-100"
              />
            ))}
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <Users
              size={32}
              className="mx-auto text-slate-300"
            />
            <h4 className="mt-4 font-semibold text-slate-800">
              No applications found
            </h4>
            <p className="mt-1 text-sm text-slate-500">
              Applications will appear here after agents submit their verification.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[750px] text-left">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-6 py-4 font-semibold">Agent</th>
                  <th className="px-6 py-4 font-semibold">Application ID</th>
                  <th className="px-6 py-4 font-semibold">Location</th>
                  <th className="px-6 py-4 font-semibold">Submitted</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 text-right font-semibold">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredApplications.map((application) => (
                  <tr
                    key={application.id}
                    className="hover:bg-slate-50"
                  >
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-800">
                        {application.fullName}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {application.email}
                      </p>
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {application.id}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {application.state}, {application.lga}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {new Date(application.submittedAt).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1.5 text-xs font-semibold ${statusStyles[application.status]}`}
                      >
                        {formatStatus(application.status)}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/admin/agents/${application.id}`}
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:border-blue-300 hover:text-blue-700"
                      >
                        <Eye size={15} />
                        Review
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}