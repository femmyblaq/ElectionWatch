"use client";

import { useMemo, useState } from "react";
import {
  MapPin,
  Search,
  Building2,
  Layers3,
  Map,
  ChevronRight,
  Info,
} from "lucide-react";

import {
  demoGeography,
  nigerianStates,
} from "../data/demo-geography";

export default function PollingUnitExplorer() {
  const [selectedState, setSelectedState] = useState("Lagos");
  const [selectedLga, setSelectedLga] = useState("demo-ikeja");
  const [selectedWard, setSelectedWard] = useState(
    "demo-ikeja-ward-1"
  );
  const [search, setSearch] = useState("");

  const stateData = demoGeography.find(
    (item) => item.name === selectedState
  );

  const lgas = stateData?.lgas ?? [];

  const lgaData = lgas.find(
    (item) => item.id === selectedLga
  );

  const wards = lgaData?.wards ?? [];

  const wardData = wards.find(
    (item) => item.id === selectedWard
  );

  const pollingUnits = wardData?.pollingUnits ?? [];

  const filteredPollingUnits = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return pollingUnits;

    return pollingUnits.filter(
      (unit) =>
        unit.name.toLowerCase().includes(query) ||
        unit.code.toLowerCase().includes(query)
    );
  }, [pollingUnits, search]);

  const totalLgas = lgas.length;

  const totalWards = lgas.reduce(
    (total, lga) => total + lga.wards.length,
    0
  );

  const totalPollingUnits = lgas.reduce(
    (total, lga) =>
      total +
      lga.wards.reduce(
        (wardTotal, ward) =>
          wardTotal + ward.pollingUnits.length,
        0
      ),
    0
  );

  function handleStateChange(stateName: string) {
    setSelectedState(stateName);
    setSearch("");

    const nextState = demoGeography.find(
      (item) => item.name === stateName
    );

    const firstLga = nextState?.lgas[0];
    const firstWard = firstLga?.wards[0];

    setSelectedLga(firstLga?.id ?? "");
    setSelectedWard(firstWard?.id ?? "");
  }

  function handleLgaChange(lgaId: string) {
    setSelectedLga(lgaId);
    setSearch("");

    const nextLga = lgas.find(
      (item) => item.id === lgaId
    );

    setSelectedWard(nextLga?.wards[0]?.id ?? "");
  }

  return (
    <div className="space-y-7">
      {/* Geographic selectors */}
      <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-800">
            <MapPin size={20} />
          </div>

          <div>
            <h2 className="font-bold text-slate-900">
              Geographic selection
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Select a location to explore its polling units.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-3">
          <div>
            <label
              htmlFor="state"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              State
            </label>

            <select
              id="state"
              value={selectedState}
              onChange={(event) =>
                handleStateChange(event.target.value)
              }
              className="h-12 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-700"
            >
              {nigerianStates.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="lga"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Local Government Area
            </label>

            <select
              id="lga"
              value={selectedLga}
              onChange={(event) =>
                handleLgaChange(event.target.value)
              }
              disabled={!lgas.length}
              className="h-12 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-700 disabled:bg-slate-50 disabled:text-slate-400"
            >
              {lgas.length ? (
                lgas.map((lga) => (
                  <option key={lga.id} value={lga.id}>
                    {lga.name}
                  </option>
                ))
              ) : (
                <option value="">No demo LGAs available</option>
              )}
            </select>
          </div>

          <div>
            <label
              htmlFor="ward"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Ward
            </label>

            <select
              id="ward"
              value={selectedWard}
              onChange={(event) => {
                setSelectedWard(event.target.value);
                setSearch("");
              }}
              disabled={!wards.length}
              className="h-12 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-700 disabled:bg-slate-50 disabled:text-slate-400"
            >
              {wards.length ? (
                wards.map((ward) => (
                  <option key={ward.id} value={ward.id}>
                    {ward.name}
                  </option>
                ))
              ) : (
                <option value="">No demo wards available</option>
              )}
            </select>
          </div>
        </div>
      </section>

      {/* Coverage summary */}
      <section className="grid gap-4 sm:grid-cols-3">
        {[
          {
            label: "Local Government Areas",
            value: totalLgas,
            icon: Building2,
          },
          {
            label: "Wards",
            value: totalWards,
            icon: Layers3,
          },
          {
            label: "Polling Units",
            value: totalPollingUnits,
            icon: Map,
          },
        ].map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="rounded-xl border border-slate-200 bg-white p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">
                  {item.label}
                </p>
                <Icon size={19} className="text-blue-700" />
              </div>

              <p className="mt-4 text-3xl font-extrabold text-slate-900">
                {item.value.toLocaleString("en-NG")}
              </p>
            </div>
          );
        })}
      </section>

      {/* Polling unit records */}
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 p-5 sm:p-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-bold text-slate-900">
                Polling units
              </h2>

              <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span>{selectedState}</span>
                <ChevronRight size={13} />
                <span>{lgaData?.name ?? "No LGA selected"}</span>
                <ChevronRight size={13} />
                <span>{wardData?.name ?? "No ward selected"}</span>
              </div>
            </div>

            <div className="relative w-full sm:max-w-xs">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="search"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                disabled={!pollingUnits.length}
                placeholder="Search polling units..."
                className="h-11 w-full rounded-lg border border-slate-200 pl-10 pr-3 text-sm outline-none focus:border-blue-700 disabled:bg-slate-50"
              />
            </div>
          </div>
        </div>

        {pollingUnits.length ? (
          <>
            <div className="flex items-center justify-between bg-slate-50 px-5 py-3 text-xs text-slate-500">
              <span>Polling unit details</span>
              <span>
                {filteredPollingUnits.length} record(s)
              </span>
            </div>

            {filteredPollingUnits.length ? (
              <div className="divide-y divide-slate-100">
                {filteredPollingUnits.map((unit) => (
                  <div
                    key={unit.id}
                    className="flex items-center justify-between gap-4 px-5 py-5 transition hover:bg-slate-50 sm:px-6"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                        <MapPin size={19} />
                      </div>

                      <div className="min-w-0">
                        <h3 className="truncate text-sm font-semibold text-slate-900">
                          {unit.name}
                        </h3>

                        <p className="mt-1 text-xs text-slate-500">
                          Code: {unit.code}
                        </p>
                      </div>
                    </div>

                    <span className="shrink-0 rounded-md bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
                      Demo record
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="px-5 py-12 text-center">
                <Search className="mx-auto text-slate-400" size={25} />
                <p className="mt-3 text-sm font-semibold text-slate-800">
                  No matching polling units
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Try searching with a different name or code.
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="px-5 py-14 text-center">
            <Info className="mx-auto text-slate-400" size={27} />

            <h3 className="mt-4 font-semibold text-slate-900">
              Geographic records not loaded
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              This demonstration currently contains sample
              geographic records for Lagos State only. Records
              for this location will be loaded from the backend
              when the API is connected.
            </p>
          </div>
        )}
      </section>

      <p className="text-xs leading-5 text-slate-400">
        Demonstration interface. Sample counts and polling-unit
        records are not official electoral figures.
      </p>
    </div>
  );
}