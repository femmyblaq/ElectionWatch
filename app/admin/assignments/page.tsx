
"use client";

import { useEffect, useState } from "react";
import {
  MapPin,
  UserRound,
  ClipboardList,
  Plus,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import { getAgentApplications } from "@/hooks/lib/api/admin";
import {
  createAgentAssignment,
  getAllAssignments,
} from "@/hooks/lib/api/assignments";

import type { AgentApplication } from "@/types/agent";
import type { AgentAssignment } from "@/types/assignment";

const initialForm = {
  agentId: "",
  pollingUnitCode: "",
  pollingUnitName: "",
  state: "",
  lga: "",
  ward: "",
  address: "",
  electionName: "",
  electionDate: "",
};

export default function AdminAssignmentsPage() {
  const [agents, setAgents] = useState<AgentApplication[]>([]);
  const [assignments, setAssignments] = useState<AgentAssignment[]>([]);
  const [form, setForm] = useState(initialForm);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function loadData() {
    try {
      setLoading(true);
      setError("");

      const [applications, existingAssignments] = await Promise.all([
        getAgentApplications(),
        getAllAssignments(),
      ]);

      setAgents(
        applications.filter(
          (application) => application.status === "APPROVED"
        )
      );

      setAssignments(existingAssignments);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load assignment information."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  function updateField(
    field: keyof typeof initialForm,
    value: string
  ) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!form.agentId) {
      setError("Select an approved agent.");
      return;
    }

    try {
      setSubmitting(true);

      const selectedAgent = agents.find(
        (agent) => agent.agentId === form.agentId
      );

      if (!selectedAgent) {
        throw new Error("The selected agent could not be found.");
      }

      const assignment = await createAgentAssignment({
        agentId: selectedAgent.agentId,
        agentName: selectedAgent.fullName,
        pollingUnitCode: form.pollingUnitCode.trim(),
        pollingUnitName: form.pollingUnitName.trim(),
        state: form.state.trim(),
        lga: form.lga.trim(),
        ward: form.ward.trim(),
        address: form.address.trim(),
        electionName: form.electionName.trim(),
        electionDate: form.electionDate,
      });

      setAssignments((previous) => [
        assignment,
        ...previous,
      ]);

      setForm(initialForm);
      setSuccess("Polling unit successfully assigned to the agent.");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to create assignment."
      );
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass =
    "w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <div>
        <p className="text-sm font-medium text-blue-700">
          Agent Management
        </p>

        <h1 className="mt-2 text-2xl font-bold text-slate-900">
          Polling Unit Assignments
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Allocate polling units to approved election monitoring agents.
        </p>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      {success && (
        <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700">
          <CheckCircle2 size={18} />
          {success}
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-5">
        {/* Assignment form */}
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7 xl:col-span-3">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-lg bg-blue-50 p-3 text-blue-700">
              <Plus size={21} />
            </div>

            <div>
              <h2 className="font-semibold text-slate-900">
                Create assignment
              </h2>
              <p className="text-xs text-slate-500">
                Assign an election monitoring location.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Select approved agent
              </label>

              <select
                required
                value={form.agentId}
                onChange={(event) =>
                  updateField("agentId", event.target.value)
                }
                className={inputClass}
              >
                <option value="">Choose an agent</option>

                {agents.map((agent) => (
                  <option
                    key={agent.agentId}
                    value={agent.agentId}
                  >
                    {agent.fullName} — {agent.email}
                  </option>
                ))}
              </select>

              {!loading && agents.length === 0 && (
                <p className="mt-2 text-xs text-amber-700">
                  No approved agents are available for assignment.
                </p>
              )}
            </div>

            <div className="border-t border-slate-100 pt-5">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-800">
                <MapPin size={17} className="text-blue-700" />
                Polling unit information
              </h3>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-medium text-slate-600">
                    Polling unit code
                  </label>
                  <input
                    required
                    value={form.pollingUnitCode}
                    onChange={(event) =>
                      updateField("pollingUnitCode", event.target.value)
                    }
                    placeholder="Enter official PU code"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium text-slate-600">
                    Polling unit name
                  </label>
                  <input
                    required
                    value={form.pollingUnitName}
                    onChange={(event) =>
                      updateField("pollingUnitName", event.target.value)
                    }
                    placeholder="Polling unit name"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium text-slate-600">
                    State
                  </label>
                  <input
                    required
                    value={form.state}
                    onChange={(event) =>
                      updateField("state", event.target.value)
                    }
                    placeholder="State"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium text-slate-600">
                    Local government area
                  </label>
                  <input
                    required
                    value={form.lga}
                    onChange={(event) =>
                      updateField("lga", event.target.value)
                    }
                    placeholder="LGA"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium text-slate-600">
                    Ward
                  </label>
                  <input
                    required
                    value={form.ward}
                    onChange={(event) =>
                      updateField("ward", event.target.value)
                    }
                    placeholder="Ward"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium text-slate-600">
                    Address / location description
                  </label>
                  <input
                    required
                    value={form.address}
                    onChange={(event) =>
                      updateField("address", event.target.value)
                    }
                    placeholder="Polling unit address"
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-5">
              <h3 className="mb-4 text-sm font-semibold text-slate-800">
                Election information
              </h3>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-medium text-slate-600">
                    Election name
                  </label>
                  <input
                    required
                    value={form.electionName}
                    onChange={(event) =>
                      updateField("electionName", event.target.value)
                    }
                    placeholder="Election name"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium text-slate-600">
                    Election date
                  </label>
                  <input
                    required
                    type="date"
                    value={form.electionDate}
                    onChange={(event) =>
                      updateField("electionDate", event.target.value)
                    }
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting || loading || agents.length === 0}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Plus size={17} />
              {submitting ? "Creating assignment..." : "Assign polling unit"}
            </button>
          </form>
        </section>

        {/* Summary */}
        <section className="space-y-5 xl:col-span-2">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  Total assignments
                </p>
                <h2 className="mt-2 text-3xl font-bold text-slate-900">
                  {assignments.length}
                </h2>
              </div>

              <div className="rounded-xl bg-blue-50 p-3 text-blue-700">
                <ClipboardList size={23} />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <UserRound size={20} className="text-blue-700" />
              <h2 className="font-semibold text-slate-900">
                Assignment guidance
              </h2>
            </div>

            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-500">
              <li>Only approved agents should receive assignments.</li>
              <li>Verify the polling unit before assigning it.</li>
              <li>Each assignment must relate to a specific election.</li>
              <li>Agents should report only against their assignments.</li>
            </ul>
          </div>
        </section>
      </div>

      {/* Existing assignments */}
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 p-5">
          <div>
            <h2 className="font-semibold text-slate-900">
              Assignment records
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Polling units allocated to agents.
            </p>
          </div>

          <button
            type="button"
            onClick={loadData}
            disabled={loading}
            aria-label="Refresh assignments"
            className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-slate-50"
          >
            <RefreshCw
              size={17}
              className={loading ? "animate-spin" : ""}
            />
          </button>
        </div>

        {loading ? (
          <div className="p-8 text-center text-sm text-slate-500">
            Loading assignments...
          </div>
        ) : assignments.length === 0 ? (
          <div className="p-10 text-center">
            <MapPin size={30} className="mx-auto text-slate-300" />
            <p className="mt-3 font-medium text-slate-800">
              No assignments created
            </p>
            <p className="mt-1 text-sm text-slate-500">
              New polling-unit assignments will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-5 py-4">Agent</th>
                  <th className="px-5 py-4">Polling unit</th>
                  <th className="px-5 py-4">Location</th>
                  <th className="px-5 py-4">Election</th>
                  <th className="px-5 py-4">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {assignments.map((assignment) => (
                  <tr key={assignment.id}>
                    <td className="px-5 py-4">
                      <p className="text-sm font-semibold text-slate-800">
                        {assignment.agentName}
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        {assignment.agentId}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm font-medium text-slate-800">
                        {assignment.pollingUnitName}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {assignment.pollingUnitCode}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {assignment.ward}, {assignment.lga}, {assignment.state}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {assignment.electionName}
                    </td>

                    <td className="px-5 py-4">
                      <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
                        {assignment.status.replaceAll("_", " ")}
                      </span>
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
