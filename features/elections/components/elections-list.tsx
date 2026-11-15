
"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import ElectionCard from "./election-card";
import { elections } from "../data/elections";
import type { ElectionStatus } from "@/types/elections";

export default function ElectionsList() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [state, setState] = useState("ALL");

  const states = useMemo(
    () => [...new Set(elections.map((election) => election.state))].sort(),
    []
  );

  const filteredElections = useMemo(() => {
    const query = search.trim().toLowerCase();

    return elections.filter((election) => {
      const matchesSearch =
        election.title.toLowerCase().includes(query) ||
        election.electionType.toLowerCase().includes(query) ||
        election.state.toLowerCase().includes(query);

      const matchesStatus =
        status === "ALL" || election.status === status;

      const matchesState =
        state === "ALL" || election.state === state;

      return matchesSearch && matchesStatus && matchesState;
    });
  }, [search, status, state]);

  return (
    <section>
      <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
        <div className="grid gap-4 md:grid-cols-[1fr_190px_190px]">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search elections, type or state..."
              className="h-12 w-full rounded-lg border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="h-12 rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none focus:border-blue-700"
            aria-label="Filter by election status"
          >
            <option value="ALL">All statuses</option>
            <option value="UPCOMING">Upcoming</option>
            <option value="ONGOING">Ongoing</option>
            <option value="COMPLETED">Completed</option>
          </select>

          <select
            value={state}
            onChange={(event) => setState(event.target.value)}
            className="h-12 rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none focus:border-blue-700"
            aria-label="Filter by state"
          >
            <option value="ALL">All states</option>
            {states.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
          <p className="text-sm text-slate-500">
            <span className="font-semibold text-slate-900">
              {filteredElections.length}
            </span>{" "}
            election records found
          </p>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <SlidersHorizontal size={14} />
            Search and filters
          </div>
        </div>
      </div>

      {filteredElections.length > 0 ? (
        <div className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filteredElections.map((election) => (
            <ElectionCard key={election.id} election={election} />
          ))}
        </div>
      ) : (
        <div className="mt-7 rounded-xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
          <Search className="mx-auto text-slate-400" size={28} />
          <h3 className="mt-4 font-semibold text-slate-900">
            No elections found
          </h3>
          <p className="mt-2 text-sm text-slate-500">
            Try another search term or change your filters.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setStatus("ALL");
              setState("ALL");
            }}
            className="mt-5 text-sm font-semibold text-blue-700 hover:text-blue-900"
          >
            Clear filters
          </button>
        </div>
      )}
    </section>
  );
}