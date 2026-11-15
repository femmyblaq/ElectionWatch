import Link from "next/link";
import { notFound } from "next/navigation";
import {
    ArrowLeft,
    CalendarDays,
    MapPin,
    ShieldCheck,
    FileCheck2,
    Users,
    BarChart3,
    Info,
} from "lucide-react";

import PublicHeader from "@/components/layout/public-header";
import PublicFooter from "@/components/layout/public-footer";
import { elections } from "@/features/elections/data/elections";
import type { ElementType, ReactNode } from "react";

type PageProps = {
    params: Promise<{ id: string }>;
};

const statusStyles = {
    UPCOMING: "bg-blue-50 text-blue-700",
    ONGOING: "bg-emerald-50 text-emerald-700",
    COMPLETED: "bg-slate-100 text-slate-600",
};

function formatDate(date: string) {
    return new Intl.DateTimeFormat("en-NG", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(new Date(`${date}T00:00:00`));
}

function InformationCard({
    icon: Icon,
    title,
    children,
}: {
    icon: ElementType;
    title: string;
    children: ReactNode;
}) {
    return (
        <section className="rounded-xl border border-slate-200 bg-white p-6">
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-800">
                    <Icon size={20} />
                </div>
                <h2 className="font-bold text-slate-900">{title}</h2>
            </div>

            <div className="mt-5">{children}</div>
        </section>
    );
}

export default async function ElectionDetailsPage({
    params,
}: PageProps) {
    const { id } = await params;

    const election = elections.find((item) => item.id === id);

    if (!election) {
        notFound();
    }

    return (
        <>
            <PublicHeader />

            <main className="min-h-screen bg-slate-50">
                {/* Page heading */}
                <section className="border-b border-slate-200 bg-white">
                    <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
                        <Link
                            href="/elections"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-blue-700"
                        >
                            <ArrowLeft size={16} />
                            Back to elections
                        </Link>

                        <div className="mt-8 flex flex-col justify-between gap-6 md:flex-row md:items-start">
                            <div className="max-w-3xl">
                                <p className="text-sm font-bold uppercase tracking-wider text-blue-800">
                                    Election details
                                </p>

                                <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
                                    {election.title}
                                </h1>

                                <p className="mt-4 text-base leading-7 text-slate-600">
                                    {election.description}
                                </p>
                            </div>

                            <span
                                className={`inline-flex w-fit rounded-md px-4 py-2 text-sm font-bold ${statusStyles[election.status]
                                    }`}
                            >
                                {election.status}
                            </span>
                        </div>
                    </div>
                </section>

                <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
                    {/* Key election information */}
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="rounded-xl border border-slate-200 bg-white p-5">
                            <div className="flex items-center gap-3 text-slate-500">
                                <CalendarDays size={19} />
                                <span className="text-sm font-medium">Election date</span>
                            </div>
                            <p className="mt-4 text-lg font-bold text-slate-900">
                                {formatDate(election.date)}
                            </p>
                        </div>

                        <div className="rounded-xl border border-slate-200 bg-white p-5">
                            <div className="flex items-center gap-3 text-slate-500">
                                <MapPin size={19} />
                                <span className="text-sm font-medium">Location</span>
                            </div>
                            <p className="mt-4 text-lg font-bold text-slate-900">
                                {election.state}, Nigeria
                            </p>
                        </div>

                        <div className="rounded-xl border border-slate-200 bg-white p-5">
                            <div className="flex items-center gap-3 text-slate-500">
                                <FileCheck2 size={19} />
                                <span className="text-sm font-medium">Election type</span>
                            </div>
                            <p className="mt-4 text-lg font-bold text-slate-900">
                                {election.electionType}
                            </p>
                        </div>
                    </div>

                    {/* Detailed sections */}
                    <div className="mt-8 grid gap-6 lg:grid-cols-2">
                        <InformationCard
                            icon={BarChart3}
                            title="Election results"
                        >
                            <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 px-5 py-8 text-center">
                                <Info
                                    size={25}
                                    className="mx-auto text-slate-400"
                                />

                                <h3 className="mt-4 font-semibold text-slate-900">
                                    Results are not available yet
                                </h3>

                                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                                    Published results will appear here after the
                                    required submission and verification process.
                                </p>
                            </div>
                        </InformationCard>

                        <InformationCard
                            icon={MapPin}
                            title="Polling-unit coverage"
                        >
                            <p className="text-sm leading-6 text-slate-500">
                                Explore the geographic structure of this election,
                                including states, LGAs, wards and polling units.
                            </p>

                            <Link
                                href={`/elections/${election.id}/polling-units`}
                                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-800 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-900"
                            >
                                Explore polling units
                                <MapPin size={17} />
                            </Link>
                        </InformationCard>

                        <InformationCard
                            icon={Users}
                            title="Participating parties"
                        >
                            <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 px-5 py-8 text-center">
                                <Users
                                    size={25}
                                    className="mx-auto text-slate-400"
                                />

                                <h3 className="mt-4 font-semibold text-slate-900">
                                    Party information unavailable
                                </h3>

                                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                                    Official participating-party information will
                                    appear here when it is available from the platform.
                                </p>
                            </div>
                        </InformationCard>

                        <InformationCard
                            icon={ShieldCheck}
                            title="Data integrity"
                        >
                            <div className="rounded-lg bg-blue-50 p-5">
                                <div className="flex items-start gap-3">
                                    <ShieldCheck
                                        size={21}
                                        className="mt-0.5 shrink-0 text-blue-800"
                                    />

                                    <div>
                                        <h3 className="font-semibold text-blue-950">
                                            Verification matters
                                        </h3>

                                        <p className="mt-2 text-sm leading-6 text-blue-900/80">
                                            Election submissions should pass the
                                            platform's verification process before
                                            being presented as confirmed results.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </InformationCard >
                    </div>

                    <p className="mt-8 text-center text-xs leading-5 text-slate-400">
                        Demonstration interface. Election records and
                        information are illustrative until connected to
                        verified backend data.
                    </p>
                </div>
            </main>

            <PublicFooter />
        </>
    );
}