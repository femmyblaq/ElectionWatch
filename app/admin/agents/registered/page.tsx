
"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { RefreshCw, Users, Eye } from "lucide-react";

import { getAgentApplications } from "@/hooks/lib/api/admin";
import type { AgentApplication } from "@/types/agent";

export default function RegisteredAgentsPage() {
  const [agents, setAgents] = useState<AgentApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadAgents = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const applications = await getAgentApplications();

      setAgents(
        applications.filter(
          (application) => application.status === "APPROVED"
        )
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load registered agents."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAgents();
  }, [loadAgents]);

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-blue-700">
            Agent Management
          </p>

          <h1 className="mt-2 text-2xl font-bold text-slate-900">
            Registered Agents
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            View agents with approved verification applications.
          </p>
        </div>

        <button
          type="button"
          onClick={loadAgents}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">
              Approved agents
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {loading ? "—" : agents.length}
            </p>
          </div>

          <div className="rounded-lg bg-blue-50 p-3 text-blue-700">
            <Users size={23} />
          </div>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 p-5">
          <h2 className="font-semibold text-slate-900">
            Approved agent records
          </h2>
        </div>

        {loading ? (
          <div className="space-y-4 p-6">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-12 animate-pulse rounded-lg bg-slate-100"
              />
            ))}
          </div>
        ) : agents.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <Users
              size={32}
              className="mx-auto text-slate-300"
            />

            <h3 className="mt-4 font-semibold text-slate-800">
              No registered agents yet
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Approved agent applications will appear here.
            </p>

            <Link
              href="/admin/agents"
              className="mt-5 inline-flex text-sm font-semibold text-blue-700 hover:text-blue-800"
            >
              View applications
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-left">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-6 py-4">Agent</th>
                  <th className="px-6 py-4">Reference</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {agents.map((agent) => (
                  <tr key={agent.id}>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-800">
                        {agent.fullName}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {agent.email}
                      </p>
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {agent.id}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {agent.state}, {agent.lga}
                    </td>

                    <td className="px-6 py-4">
                      <span className="rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
                        Approved
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/admin/agents/${agent.id}`}
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:border-blue-300 hover:text-blue-700"
                      >
                        <Eye size={15} />
                        View
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
