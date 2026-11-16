
"use client";

import { useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  CalendarDays,
  ArrowRight,
} from "lucide-react";

import ElectionCard from "./election-card";
import { elections } from "../data/elections";
import type { ElectionStatus } from "@/types/elections";

export default function ElectionsList() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<ElectionStatus | "ALL">("ALL");
  const [state, setState] = useState("ALL");

  const nextElectionDate = "16 January 2027";

  const states = useMemo(
    () =>
      [...new Set(elections.map((election) => election.state))].sort(),
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

  const clearFilters = () => {
    setSearch("");
    setStatus("ALL");
    setState("ALL");
  };

  return (
    <section className="space-y-7">

      {/* Upcoming Election Announcement */}
      <div className="rounded-xl border border-blue-100 bg-blue-50/70 p-5 sm:p-6">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-blue-700 shadow-sm">
              <CalendarDays size={23} />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-blue-700">
                Upcoming National Election
              </p>

              <h2 className="mt-2 text-lg font-bold text-slate-900 sm:text-xl">
                Presidential, Senate and House of Representatives
              </h2>

              <p className="mt-2 text-sm text-slate-600">
                Scheduled election date:{" "}
                <span className="font-semibold text-slate-900">
                  {nextElectionDate}
                </span>
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2 self-start rounded-full border border-blue-200 bg-white px-3 py-2 text-xs font-semibold text-blue-700 sm:self-center">
            <span className="h-2 w-2 rounded-full bg-blue-600" />
            Upcoming
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5">

        <div className="mb-4">
          <h3 className="font-bold text-slate-900">
            Browse Elections
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Search and filter available election records.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-[1fr_190px_190px]">

          {/* Search */}
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

          {/* Status Filter */}
          <select
            value={status}
            onChange={(event) =>
              setStatus(event.target.value as ElectionStatus | "ALL")
            }
            className="h-12 rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
            aria-label="Filter by election status"
          >
            <option value="ALL">All statuses</option>
            <option value="UPCOMING">Upcoming</option>
            <option value="ONGOING">Ongoing</option>
            <option value="COMPLETED">Completed</option>
          </select>

          {/* State Filter */}
          <select
            value={state}
            onChange={(event) => setState(event.target.value)}
            className="h-12 rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
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

        {/* Results Count */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
          <p className="text-sm text-slate-500">
            <span className="font-semibold text-slate-900">
              {filteredElections.length}
            </span>{" "}
            election records found
          </p>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <SlidersHorizontal size={14} />
            Search and filters

            {(search || status !== "ALL" || state !== "ALL") && (
              <button
                type="button"
                onClick={clearFilters}
                className="ml-2 font-semibold text-blue-700 hover:text-blue-900"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Election Cards */}
      {filteredElections.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filteredElections.map((election) => (
            <ElectionCard
              key={election.id}
              election={election}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
          <Search
            className="mx-auto text-slate-400"
            size={28}
          />

          <h3 className="mt-4 font-semibold text-slate-900">
            No elections found
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Try another search term or change your filters.
          </p>

          <button
            type="button"
            onClick={clearFilters}
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900"
          >
            Clear filters
            <ArrowRight size={15} />
          </button>
        </div>
      )}
    </section>
  );
}
