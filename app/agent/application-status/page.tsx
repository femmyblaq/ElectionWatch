
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  Clock3,
  FileCheck,
  ShieldCheck,
  ArrowRight,
  AlertCircle,
} from "lucide-react";

import { getCurrentAgent, updateCurrentAgent } from "../../../hooks/lib/api/auth";
import type { AgentUser } from "@/types/agent";

const MOCK_API =
  process.env.NEXT_PUBLIC_USE_MOCK_API === "true";

export default function AgentApplicationStatusPage() {
  const router = useRouter();

  const [agent, setAgent] = useState<AgentUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentAgent = getCurrentAgent();

    if (!currentAgent) {
      router.replace("/signup");
      return;
    }

    setAgent(currentAgent);
    setLoading(false);
  }, [router]);

  function simulateApproval() {
    if (!MOCK_API) return;

    const updated = updateCurrentAgent({
      applicationStatus: "APPROVED",
    });

    if (updated) {
      setAgent(updated);
    }
  }

  if (loading || !agent) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-sm text-slate-500">Loading application...</p>
      </main>
    );
  }

  const approved = agent.applicationStatus === "APPROVED";

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-3xl">

        <div className="mb-10 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
            <ShieldCheck size={32} />
          </div>

          <h1 className="mt-5 text-3xl font-bold text-slate-900">
            Application tracking
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            Hello {agent.fullName}, track the progress of your
            ElectionWatch agent application here.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Application reference
              </p>

              <p className="mt-2 font-bold text-slate-900">
                {agent.id}
              </p>
            </div>

            <span className={`w-fit rounded-full px-4 py-2 text-xs font-bold ${
              approved
                ? "bg-green-100 text-green-700"
                : "bg-amber-100 text-amber-700"
            }`}>
              {approved ? "APPROVED" : "UNDER REVIEW"}
            </span>
          </div>

          <div className="my-8 border-t border-slate-100" />

          <div className="space-y-7">
            <div className="flex gap-4">
              <CheckCircle2 className="shrink-0 text-green-600" size={23} />
              <div>
                <h3 className="font-semibold text-slate-900">
                  Account created
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Your account has been successfully registered.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <FileCheck className="shrink-0 text-green-600" size={23} />
              <div>
                <h3 className="font-semibold text-slate-900">
                  Documents submitted
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Your verification application has been submitted.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              {approved ? (
                <CheckCircle2 className="shrink-0 text-green-600" size={23} />
              ) : (
                <Clock3 className="shrink-0 text-amber-500" size={23} />
              )}

              <div>
                <h3 className="font-semibold text-slate-900">
                  Administrator review
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  {approved
                    ? "Your application has been approved."
                    : "Your application is waiting for administrator review."}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-9 rounded-xl bg-slate-50 p-5">
            {approved ? (
              <>
                <h3 className="font-bold text-green-700">
                  Your agent account is approved!
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  You can now continue to your agent dashboard in this
                  demonstration.
                </p>

                <button
                  onClick={() => router.push("/agent/dashboard")}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-700 px-5 py-3 text-sm font-bold text-white hover:bg-blue-800"
                >
                  Go to dashboard
                  <ArrowRight size={17} />
                </button>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <AlertCircle size={19} className="text-amber-600" />
                  <h3 className="font-bold text-slate-900">
                    What happens next?
                  </h3>
                </div>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  An authorized administrator will review your information
                  and submitted documents. You will be notified when a
                  decision is made.
                </p>

                {MOCK_API && (
                  <button
                    onClick={simulateApproval}
                    className="mt-5 w-full rounded-lg border border-blue-300 bg-white px-5 py-3 text-sm font-semibold text-blue-700 hover:bg-blue-50"
                  >
                    Demo only: Simulate admin approval
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
