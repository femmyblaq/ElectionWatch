
"use client";

import { useCallback, useEffect, useState } from "react";
import {
  MapPin,
  CalendarDays,
  Clock3,
  CheckCircle2,
  ClipboardList,
} from "lucide-react";

import { getAgentAssignments } from "@/hooks/lib/api/assignments";
import type { AgentAssignment } from "@/types/assignment";

type Props = {
  agentId: string;
  onCountChange?: (count: number) => void;
};

export default function AgentAssignmentList({
  agentId,
  onCountChange,
}: Props) {
  const [assignments, setAssignments] = useState<AgentAssignment[]>([]);
  const [loading, setLoading] = useState(true);

  const loadAssignments = useCallback(async () => {
    try {
      const result = await getAgentAssignments(agentId);

      setAssignments(result);
      onCountChange?.(result.length);
    } catch {
      setAssignments([]);
      onCountChange?.(0);
    } finally {
      setLoading(false);
    }
  }, [agentId, onCountChange]);

  useEffect(() => {
    loadAssignments();

    function handleStorageChange(event: StorageEvent) {
      if (
        event.key === "electionwatch_agent_assignments" ||
        event.key === null
      ) {
        loadAssignments();
      }
    }

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [loadAssignments]);

  return (
    <section
      id="assignments"
      className="scroll-mt-24 space-y-5"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            My Polling Unit Assignments
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Your designated election monitoring locations.
          </p>
        </div>

        <MapPin size={21} className="text-blue-700" />
      </div>

      {loading ? (
        <div className="rounded-xl border border-slate-200 bg-white p-8">
          <div className="h-5 w-48 animate-pulse rounded bg-slate-100" />
          <div className="mt-4 h-4 w-full animate-pulse rounded bg-slate-100" />
          <div className="mt-3 h-4 w-2/3 animate-pulse rounded bg-slate-100" />
        </div>
      ) : assignments.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
            <ClipboardList size={26} />
          </div>

          <h3 className="mt-4 font-semibold text-slate-900">
            No polling unit assigned yet
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            Your administrator will assign your monitoring location.
            Once assigned, its details will appear here.
          </p>

          <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-700">
            <Clock3 size={14} />
            Awaiting assignment
          </span>
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {assignments.map((assignment) => (
            <article
              key={assignment.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-blue-50 p-3 text-blue-700">
                    <MapPin size={22} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {assignment.pollingUnitName}
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                      {assignment.pollingUnitCode}
                    </p>
                  </div>
                </div>

                <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
                  {assignment.status.replaceAll("_", " ")}
                </span>
              </div>

              <div className="mt-5 space-y-3 border-t border-slate-100 pt-4">
                <div className="flex items-start gap-2 text-sm text-slate-600">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-slate-400" />
                  <span>
                    {assignment.address}, {assignment.ward}, {assignment.lga},{" "}
                    {assignment.state}
                  </span>
                </div>

                <div className="flex items-start gap-2 text-sm text-slate-600">
                  <CalendarDays size={16} className="mt-0.5 shrink-0 text-slate-400" />
                  <span>
                    {assignment.electionName}
                    {" · "}
                    {new Date(
                      `${assignment.electionDate}T00:00:00`
                    ).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <CheckCircle2 size={15} />
                  Assigned{" "}
                  {new Date(assignment.assignedAt).toLocaleDateString()}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
