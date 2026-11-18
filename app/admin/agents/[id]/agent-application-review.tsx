
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  AlertCircle,
  FileText,
  UserRound,
  MapPin,
  Loader2,
} from "lucide-react";

import {
  getAgentApplication,
  reviewAgentApplication,
} from "@/hooks/lib/api/admin";

import type { AgentApplication } from "@/types/agent";

type Props = {
  id: string;
};

type ReviewAction =
  | "APPROVED"
  | "REJECTED"
  | "REQUIRES_CORRECTION";

export default function AgentApplicationReview({
  id,
}: Props) {
  const [application, setApplication] =
    useState<AgentApplication | null>(null);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [reviewNote, setReviewNote] = useState("");

  // Load the selected application.
  useEffect(() => {
    let active = true;

    async function loadApplication() {
      try {
        setLoading(true);
        setError("");

        const result = await getAgentApplication(id);

        if (active) {
          setApplication(result);

          if (!result) {
            setError("This application could not be found.");
          }
        }
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load this application."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadApplication();

    return () => {
      active = false;
    };
  }, [id]);

  // Handle administrator decisions.
  async function handleReview(action: ReviewAction) {
    if (!application) return;

    if (
      (action === "REJECTED" ||
        action === "REQUIRES_CORRECTION") &&
      !reviewNote.trim()
    ) {
      setError("Please provide a reason for this decision.");
      return;
    }

    const actionLabel =
      action === "APPROVED"
        ? "approve"
        : action === "REJECTED"
          ? "reject"
          : "request corrections for";

    const confirmed = window.confirm(
      `Are you sure you want to ${actionLabel} this application?`
    );

    if (!confirmed) return;

    try {
      setSubmitting(true);
      setError("");

      const updated = await reviewAgentApplication(
        application.id,
        action,
        reviewNote.trim() || undefined
      );

      setApplication(updated);
      setReviewNote("");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to update this application."
      );
    } finally {
      setSubmitting(false);
    }
  }

  // Loading state.
  if (loading) {
    return (
      <div className="flex min-h-80 items-center justify-center">
        <div className="text-center">
          <Loader2
            size={30}
            className="mx-auto animate-spin text-blue-700"
          />
          <p className="mt-3 text-sm text-slate-500">
            Loading application...
          </p>
        </div>
      </div>
    );
  }

  // Application not found.
  if (!application) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
        <AlertCircle
          size={35}
          className="mx-auto text-slate-400"
        />

        <h2 className="mt-4 font-semibold text-slate-900">
          Application not found
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          {error || "This application does not exist."}
        </p>

        <Link
          href="/admin/agents"
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-800"
        >
          <ArrowLeft size={16} />
          Return to applications
        </Link>
      </div>
    );
  }

  const isPending =
    application.status === "UNDER_REVIEW";

  const documents = [
    {
      label: "Passport photograph",
      file: application.documents.passport,
    },
    {
      label: "Voter's card",
      file: application.documents.votersCard,
    },
    {
      label: "Membership card",
      file: application.documents.membershipCard,
    },
    {
      label: "Additional identification",
      file: application.documents.additionalId,
    },
  ];

  const statusStyles: Record<string, string> = {
    UNDER_REVIEW: "bg-amber-50 text-amber-700",
    APPROVED: "bg-green-50 text-green-700",
    REJECTED: "bg-red-50 text-red-700",
    REQUIRES_CORRECTION: "bg-blue-50 text-blue-700",
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">

      {/* Navigation */}
      <Link
        href="/admin/agents"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-700"
      >
        <ArrowLeft size={16} />
        Back to applications
      </Link>

      {/* Application heading */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-blue-700">
            Agent Management / Application Review
          </p>

          <h1 className="mt-2 text-2xl font-bold text-slate-900">
            {application.fullName}
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Application reference: {application.id}
          </p>
        </div>

        <span
          className={`w-fit rounded-full px-4 py-2 text-xs font-semibold ${
            statusStyles[application.status]
          }`}
        >
          {application.status.replaceAll("_", " ")}
        </span>
      </div>

      {/* Error message */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Personal and location information */}
      <div className="grid gap-6 lg:grid-cols-2">

        {/* Personal information */}
        <section className="rounded-xl border border-slate-200 bg-white p-6">
          <div className="mb-6 flex items-center gap-3">
            <span className="rounded-lg bg-blue-50 p-2 text-blue-700">
              <UserRound size={20} />
            </span>

            <h2 className="font-semibold text-slate-900">
              Personal Information
            </h2>
          </div>

          <div className="space-y-5">
            {[
              ["Full name", application.fullName],
              ["Email address", application.email],
              ["Phone number", application.phoneNumber],
              [
                "Organization",
                application.organization || "Not provided",
              ],
              [
                "Membership number",
                application.membershipNumber || "Not provided",
              ],
            ].map(([label, value]) => (
              <div key={label}>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  {label}
                </p>

                <p className="mt-1 text-sm font-medium text-slate-800">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Location information */}
        <section className="rounded-xl border border-slate-200 bg-white p-6">
          <div className="mb-6 flex items-center gap-3">
            <span className="rounded-lg bg-blue-50 p-2 text-blue-700">
              <MapPin size={20} />
            </span>

            <h2 className="font-semibold text-slate-900">
              Location Information
            </h2>
          </div>

          <div className="space-y-5">
            {[
              ["State", application.state],
              ["Local government area", application.lga],
              ["Ward", application.ward],
              [
                "Submitted on",
                new Date(application.submittedAt).toLocaleString(),
              ],
            ].map(([label, value]) => (
              <div key={label}>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  {label}
                </p>

                <p className="mt-1 text-sm font-medium text-slate-800">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Submitted documents */}
      <section className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="mb-6 flex items-center gap-3">
          <span className="rounded-lg bg-blue-50 p-2 text-blue-700">
            <FileText size={20} />
          </span>

          <div>
            <h2 className="font-semibold text-slate-900">
              Submitted Documents
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Demo mode displays filenames only.
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {documents.map((document) => (
            <div
              key={document.label}
              className="flex items-center gap-3 rounded-lg border border-slate-200 p-4"
            >
              <FileText
                size={21}
                className="shrink-0 text-slate-400"
              />

              <div className="min-w-0">
                <p className="text-xs text-slate-500">
                  {document.label}
                </p>

                <p className="truncate text-sm font-medium text-slate-800">
                  {document.file || "Not provided"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Previous review note */}
      {application.reviewNote && (
        <section className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="font-semibold text-slate-900">
            Previous Administrator Note
          </h2>

          <p className="mt-3 text-sm text-slate-600">
            {application.reviewNote}
          </p>

          {application.reviewedAt && (
            <p className="mt-3 text-xs text-slate-400">
              Reviewed on:{" "}
              {new Date(application.reviewedAt).toLocaleString()}
            </p>
          )}
        </section>
      )}

      {/* Administrator review actions */}
      <section className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="font-semibold text-slate-900">
          Administrator Decision
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Provide a reason when rejecting an application or requesting corrections.
        </p>

        <textarea
          value={reviewNote}
          onChange={(event) =>
            setReviewNote(event.target.value)
          }
          rows={4}
          disabled={!isPending || submitting}
          placeholder="Enter your review comments..."
          className="mt-5 w-full rounded-lg border border-slate-200 p-3 text-sm text-slate-700 outline-none focus:border-blue-500 disabled:bg-slate-50"
        />

        {isPending ? (
          <div className="mt-5 flex flex-wrap gap-3">

            {/* Approve */}
            <button
              type="button"
              onClick={() => handleReview("APPROVED")}
              disabled={submitting}
              className="inline-flex items-center gap-2 rounded-lg bg-green-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <CheckCircle2 size={17} />
              Approve Application
            </button>

            {/* Request corrections */}
            <button
              type="button"
              onClick={() =>
                handleReview("REQUIRES_CORRECTION")
              }
              disabled={submitting}
              className="inline-flex items-center gap-2 rounded-lg border border-blue-200 px-4 py-2.5 text-sm font-semibold text-blue-700 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <AlertCircle size={17} />
              Request Corrections
            </button>

            {/* Reject */}
            <button
              type="button"
              onClick={() => handleReview("REJECTED")}
              disabled={submitting}
              className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-700 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <XCircle size={17} />
              Reject Application
            </button>

          </div>
        ) : (
          <div className="mt-5 rounded-lg bg-slate-50 p-4 text-sm text-slate-600">
            This application has been reviewed. No further decisions are available in this demo.
          </div>
        )}

        {submitting && (
          <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
            <Loader2 size={16} className="animate-spin" />
            Saving administrator decision...
          </div>
        )}
      </section>
    </div>
  );
}
