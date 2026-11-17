
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  MapPin,
  UserRound,
  ShieldCheck,
  LogOut,
} from "lucide-react";

import { getCurrentAgent } from "../../../hooks/lib/api/auth";
import type { AgentUser } from "@/types/agent";

export default function AgentDashboardPage() {
  const router = useRouter();
  const [agent, setAgent] = useState<AgentUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentAgent = getCurrentAgent();

    if (!currentAgent || currentAgent.applicationStatus !== "APPROVED") {
      router.replace("/agent/application-status");
      return;
    }

    setAgent(currentAgent);
    setLoading(false);
  }, [router]);

  if (loading || !agent) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        Loading dashboard...
      </main>
    );
  }

  const stats = [
    {
      label: "Application status",
      value: "Approved",
      icon: ShieldCheck,
    },
    {
      label: "Polling unit assignments",
      value: "0",
      icon: MapPin,
    },
    {
      label: "Reports submitted",
      value: "0",
      icon: ClipboardList,
    },
  ];

  function logout() {
    sessionStorage.removeItem("electionwatch_demo_agent");
    router.replace("/signin");
  }

  return (
    <main className="min-h-screen bg-slate-50">

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-700 p-2 text-white">
              <LayoutDashboard size={22} />
            </div>

            <div>
              <h1 className="font-extrabold text-slate-900">
                ElectionWatch
              </h1>
              <p className="text-xs text-slate-500">
                Agent Portal
              </p>
            </div>
          </div>

          <button
            onClick={logout}
            className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
          >
            <LogOut size={17} />
            Sign out
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-10">

        <div>
          <p className="text-sm font-medium text-blue-700">
            AGENT DASHBOARD
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            Welcome, {agent.fullName}
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Your agent account has been approved. Here's your
            application overview.
          </p>
        </div>

        <div className="mt-9 grid gap-5 md:grid-cols-3">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="rounded-xl border border-slate-200 bg-white p-6"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                  <Icon size={22} />
                </div>

                <p className="mt-5 text-sm text-slate-500">
                  {stat.label}
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {stat.value}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6">
          <div className="flex items-center gap-3">
            <UserRound className="text-blue-700" size={22} />
            <h3 className="font-bold text-slate-900">
              Agent account information
            </h3>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <p className="text-xs text-slate-400">Full name</p>
              <p className="mt-1 text-sm font-semibold text-slate-800">
                {agent.fullName}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-400">Email address</p>
              <p className="mt-1 text-sm font-semibold text-slate-800">
                {agent.email}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-400">Agent reference</p>
              <p className="mt-1 text-sm font-semibold text-slate-800">
                {agent.id}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-400">Account role</p>
              <p className="mt-1 text-sm font-semibold text-slate-800">
                {agent.role}
              </p>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
