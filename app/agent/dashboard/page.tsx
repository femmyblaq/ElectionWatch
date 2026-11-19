
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  MapPin,
  FileText,
  ClipboardCheck,
  ArrowUpRight,
  Clock3,
  CheckCircle2,
  AlertCircle,
  CalendarDays,
} from "lucide-react";
import AgentAssignmentList from "@/components/agent/agent-assignment-list";
import AgentSidebar from "@/components/agent/agent-sidebar";
import AgentHeader from "@/components/agent/agent-header";
import AgentVideoUpload from "@/components/agent/agent-video-upload";

import { getCurrentAgent } from "@/hooks/lib/api/auth";
import type { AgentUser } from "@/types/agent";

export default function AgentDashboardPage() {
  const router = useRouter();

  const [agent, setAgent] = useState<AgentUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [assignmentCount, setAssignmentCount] = useState(0);

  useEffect(() => {
    const currentAgent = getCurrentAgent();

    if (!currentAgent) {
      router.replace("/signin");
      return;
    }

    if (currentAgent.applicationStatus !== "APPROVED") {
      router.replace("/agent/application-status");
      return;
    }

    setAgent(currentAgent);
    setLoading(false);
  }, [router]);

  if (loading || !agent) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-blue-100 border-t-blue-700" />
          <p className="mt-4 text-sm text-slate-500">
            Loading your agent workspace...
          </p>
        </div>
      </div>
    );
  }

  const statistics = [
    {
      label: "Application status",
      value: "Approved",
      description: "Your account is verified",
      icon: ShieldCheck,
      iconStyle: "bg-green-50 text-green-700",
    },
    {
      label: "Polling unit assignments",
      value: String(assignmentCount),
      description: "Your assigned monitoring locations",
      icon: MapPin,
      iconStyle: "bg-blue-50 text-blue-700",
    },
    {
      label: "Reports submitted",
      value: "0",
      description: "Your submitted reports",
      icon: FileText,
      iconStyle: "bg-violet-50 text-violet-700",
    },
    {
      label: "Pending reviews",
      value: "0",
      description: "Reports awaiting review",
      icon: Clock3,
      iconStyle: "bg-amber-50 text-amber-700",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 lg:flex">
      <AgentSidebar />

      <div className="min-w-0 flex-1">
        <AgentHeader
          fullName={agent.fullName}
          email={agent.email}
        />

        <main className="mx-auto max-w-[1600px] space-y-8 p-5 sm:p-8">

          {/* Welcome */}
          <section id="overview" className="scroll-mt-24">
            <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-blue-700">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  AGENT DASHBOARD
                </div>

                <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  Welcome back, {agent.fullName}
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                  Manage your election monitoring activities,
                  assignments and evidence submissions from one
                  workspace.
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3">
                <CheckCircle2 size={19} className="text-green-700" />
                <div>
                  <p className="text-xs font-semibold text-green-800">
                    Account verified
                  </p>
                  <p className="text-xs text-green-700">
                    You are an approved agent
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Statistics */}
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {statistics.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-500">
                        {stat.label}
                      </p>

                      <h2 className="mt-4 text-2xl font-bold text-slate-900">
                        {stat.value}
                      </h2>
                    </div>

                    <div className={`rounded-xl p-3 ${stat.iconStyle}`}>
                      <Icon size={22} />
                    </div>
                  </div>

                  <p className="mt-3 text-xs text-slate-400">
                    {stat.description}
                  </p>
                </div>
              );
            })}
          </section>

          {/* Main content grid */}
          <section className="grid gap-6 xl:grid-cols-3">

            {/* Assignment section */}
            <div className="xl:col-span-2">
              <AgentAssignmentList
                agentId={agent.id}
                onCountChange={setAssignmentCount}
              />
            </div>

            {/* Account summary */}
            <div className="space-y-5">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Account Summary
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Your registration details.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
                    {agent.fullName
                      .split(" ")
                      .filter(Boolean)
                      .slice(0, 2)
                      .map((part) => part[0])
                      .join("")
                      .toUpperCase()}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate font-semibold text-slate-900">
                      {agent.fullName}
                    </p>
                    <p className="text-xs text-slate-500">
                      Election Monitoring Agent
                    </p>
                  </div>
                </div>

                <div className="space-y-4 pt-5">
                  <div>
                    <p className="text-xs text-slate-400">
                      Agent reference
                    </p>
                    <p className="mt-1 break-all text-sm font-semibold text-slate-800">
                      {agent.id}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Email address
                    </p>
                    <p className="mt-1 break-all text-sm font-medium text-slate-800">
                      {agent.email}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Account role
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      {agent.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Video evidence */}
          <AgentVideoUpload />

          {/* Reports */}
          <section
            id="reports"
            className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Recent Reports
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Track reports and evidence you have submitted.
                </p>
              </div>

              <FileText size={22} className="text-blue-700" />
            </div>

            <div className="mt-6 rounded-xl bg-slate-50 px-5 py-10 text-center">
              <ClipboardCheck
                size={30}
                className="mx-auto text-slate-300"
              />

              <p className="mt-3 font-semibold text-slate-800">
                No reports submitted
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Your submitted election reports will appear here.
              </p>
            </div>
          </section>

          {/* Activity and guidance */}
          <section className="grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-blue-50 p-2.5 text-blue-700">
                  <CalendarDays size={21} />
                </div>

                <h3 className="font-semibold text-slate-900">
                  Election activities
                </h3>
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-500">
                Election schedules and monitoring instructions
                will be displayed here when published by the
                platform administrator.
              </p>
            </div>

            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-white p-2.5 text-amber-700">
                  <AlertCircle size={21} />
                </div>

                <h3 className="font-semibold text-slate-900">
                  Agent guidelines
                </h3>
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-600">
                Submit accurate, time-relevant evidence. Never
                alter original footage, misrepresent events or
                expose voters' personal information unnecessarily.
              </p>
            </div>
          </section>

          <footer className="border-t border-slate-200 py-5 text-center text-xs text-slate-400">
            ElectionWatch Agent Portal · Election transparency through responsible reporting.
          </footer>
        </main>
      </div>
    </div>
  );
}
