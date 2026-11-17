
"use client";
import { useRouter } from "next/navigation";
import { submitAgentVerification } from "../../../hooks/lib/api/agent";
import { getCurrentAgent } from "../../../hooks/lib/api/auth";

import { useState } from "react";
import {
    UploadCloud,
    FileCheck,
    Trash2,
    UserRound,
    MapPin,
    ShieldCheck,
    CreditCard,
    ChevronRight,
    AlertCircle,
} from "lucide-react";

type DocumentKey =
    | "passport"
    | "votersCard"
    | "membershipCard"
    | "additionalId";

type DocumentFieldProps = {
    title: string;
    description: string;
    name: DocumentKey;
    required?: boolean;
    file: File | null;
    onChange: (name: DocumentKey, file: File | null) => void;
};

function DocumentField({
    title,
    description,
    name,
    required = false,
    file,
    onChange,
}: DocumentFieldProps) {
    const [error, setError] = useState("");

    function handleFileChange(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        const selectedFile = event.target.files?.[0];

        if (!selectedFile) return;

        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "application/pdf",
        ];

        if (!allowedTypes.includes(selectedFile.type)) {
            setError("Only PDF, JPG and PNG files are accepted.");
            event.target.value = "";
            return;
        }

        if (selectedFile.size > 5 * 1024 * 1024) {
            setError("File size must not exceed 5 MB.");
            event.target.value = "";
            return;
        }

        setError("");
        onChange(name, selectedFile);
    }

    return (
        <div className="rounded-xl border border-slate-200 p-5">
            <div className="flex flex-col justify-between gap-2 sm:flex-row">
                <div>
                    <h3 className="text-sm font-bold text-slate-800">
                        {title}
                        {required && (
                            <span className="ml-1 text-red-500">*</span>
                        )}
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                        {description}
                    </p>
                </div>

                {required ? (
                    <span className="h-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                        Required
                    </span>
                ) : (
                    <span className="h-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
                        Optional
                    </span>
                )}
            </div>

            {file ? (
                <div className="mt-5 flex items-center justify-between gap-3 rounded-lg bg-blue-50 p-4">
                    <div className="flex min-w-0 items-center gap-3">
                        <FileCheck className="shrink-0 text-blue-700" size={22} />

                        <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-slate-800">
                                {file.name}
                            </p>
                            <p className="text-xs text-slate-500">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => onChange(name, null)}
                        aria-label={`Remove ${title}`}
                        className="rounded-lg p-2 text-red-500 transition hover:bg-red-100"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            ) : (
                <label className="mt-5 flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-7 text-center transition hover:border-blue-500 hover:bg-blue-50">
                    <UploadCloud size={27} className="text-blue-700" />

                    <span className="mt-3 text-sm font-semibold text-slate-700">
                        Click to upload a document
                    </span>

                    <span className="mt-1 text-xs text-slate-400">
                        PDF, JPG or PNG · Maximum 5 MB
                    </span>

                    <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
                        className="sr-only"
                        onChange={handleFileChange}
                    />
                </label>
            )}

            {error && (
                <p className="mt-3 flex items-center gap-2 text-xs text-red-600">
                    <AlertCircle size={15} />
                    {error}
                </p>
            )}
        </div>
    );
}

const initialDocuments: Record<DocumentKey, File | null> = {
    passport: null,
    votersCard: null,
    membershipCard: null,
    additionalId: null,
};

export default function AgentVerificationForm() {
    const [documents, setDocuments] = useState(initialDocuments);
    const [consent, setConsent] = useState(false);
    const [message, setMessage] = useState("");

    const router = useRouter();
    const [loading, setLoading] = useState(false);



    function updateDocument(
        name: DocumentKey,
        file: File | null
    ) {
        setDocuments((previous) => ({
            ...previous,
            [name]: file,
        }));
    }


    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();
        setMessage("");

        if (!documents.passport || !documents.votersCard) {
            setMessage(
                "Please upload your passport photograph and voter's card."
            );
            return;
        }

        if (!consent) {
            setMessage("Please confirm your verification consent.");
            return;
        }

        const agent = getCurrentAgent();

        if (!agent) {
            setMessage("Your session has expired. Please sign up again.");
            return;
        }

        const formData = new FormData(event.currentTarget);

        try {
            setLoading(true);

            await submitAgentVerification({
                fullName: String(formData.get("fullName") || ""),
                email: agent.email,
                phoneNumber: String(formData.get("phoneNumber") || ""),
                dateOfBirth: String(formData.get("dateOfBirth") || ""),
                state: String(formData.get("state") || ""),
                lga: String(formData.get("local_government_area") || ""),
                ward: String(formData.get("ward") || ""),
                organization: String(formData.get("organization") || ""),
                membershipNumber: String(formData.get("membershipNumber") || ""),
                documents,
                consent,
            });

            router.push("/agent/application-status");
        } catch (error) {
            setMessage(
                error instanceof Error
                    ? error.message
                    : "Unable to submit your application."
            );
        } finally {
            setLoading(false);
        }
    }


    return (
        <div className="mx-auto max-w-5xl">
            {/* Header */}
            <div className="mb-8">
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-blue-700">
                    <ShieldCheck size={18} />
                    Agent verification portal
                </div>

                <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                    Complete your agent profile
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
                    Submit your personal information and verification documents.
                    Your application will be reviewed by an authorized administrator
                    before your agent account is activated.
                </p>
            </div>

            {/* Progress */}
            <div className="mb-8 rounded-xl border border-slate-200 bg-white p-5">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-bold text-slate-800">
                            Application completion
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                            Step 1 of 3 · Profile and documents
                        </p>
                    </div>

                    <span className="text-sm font-bold text-blue-700">
                        1 / 3
                    </span>
                </div>

                <div className="mt-4 flex gap-2">
                    <div className="h-1.5 flex-1 rounded-full bg-blue-700" />
                    <div className="h-1.5 flex-1 rounded-full bg-slate-200" />
                    <div className="h-1.5 flex-1 rounded-full bg-slate-200" />
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-7">

                {/* Personal information */}
                <section className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
                    <div className="mb-7 flex items-center gap-3">
                        <div className="rounded-lg bg-blue-50 p-3 text-blue-700">
                            <UserRound size={21} />
                        </div>

                        <div>
                            <h2 className="font-bold text-slate-900">
                                Personal information
                            </h2>
                            <p className="mt-1 text-xs text-slate-500">
                                Enter your details as they appear on your identification documents.
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Full legal name *
                            </label>
                            <input
                                name="fullName"
                                required
                                autoComplete="name"
                                placeholder="Enter your full name"
                                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Phone number *
                            </label>
                            <input
                                name="phoneNumber"
                                type="tel"
                                required
                                autoComplete="tel"
                                placeholder="+234..."
                                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Date of birth *
                            </label>
                            <input
                                name="dateOfBirth"
                                type="date"
                                required
                                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Email address *
                            </label>
                            <input
                                name="email"
                                type="email"
                                required
                                autoComplete="email"
                                placeholder="Your registered email"
                                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>
                    </div>
                </section>

                {/* Location */}
                <section className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
                    <div className="mb-7 flex items-center gap-3">
                        <div className="rounded-lg bg-blue-50 p-3 text-blue-700">
                            <MapPin size={21} />
                        </div>

                        <div>
                            <h2 className="font-bold text-slate-900">
                                Location information
                            </h2>
                            <p className="mt-1 text-xs text-slate-500">
                                Provide your preferred area of electoral activity.
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                        {["State", "Local Government Area", "Ward"].map((field) => (
                            <div key={field}>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    {field} *
                                </label>
                                <input
                                    name={field.toLowerCase().replaceAll(" ", "_")}
                                    required
                                    placeholder={`Enter ${field.toLowerCase()}`}
                                    className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>
                        ))}

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Polling unit (if known)
                            </label>
                            <input
                                name="pollingUnit"
                                placeholder="Enter polling unit or code"
                                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>
                    </div>
                </section>

                {/* Organization */}
                <section className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
                    <div className="mb-7 flex items-center gap-3">
                        <div className="rounded-lg bg-blue-50 p-3 text-blue-700">
                            <CreditCard size={21} />
                        </div>

                        <div>
                            <h2 className="font-bold text-slate-900">
                                Affiliation information
                            </h2>
                            <p className="mt-1 text-xs text-slate-500">
                                Provide your party or organization details, where applicable.
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Organization or political party
                            </label>
                            <input
                                name="organization"
                                placeholder="Enter organization name"
                                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Membership number
                            </label>
                            <input
                                name="membershipNumber"
                                placeholder="Enter membership number"
                                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>
                    </div>
                </section>

                {/* Documents */}
                <section className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
                    <div className="mb-7">
                        <h2 className="text-lg font-bold text-slate-900">
                            Verification documents
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-slate-500">
                            Upload clear, readable copies. Documents must belong to the
                            person submitting this application.
                        </p>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                        <DocumentField
                            title="Passport photograph"
                            description="A recent, clear passport photograph."
                            name="passport"
                            required
                            file={documents.passport}
                            onChange={updateDocument}
                        />

                        <DocumentField
                            title="Voter's card (PVC)"
                            description="A clear copy of your voter's card."
                            name="votersCard"
                            required
                            file={documents.votersCard}
                            onChange={updateDocument}
                        />

                        <DocumentField
                            title="Membership card"
                            description="Your political party or organization's membership card, if applicable."
                            name="membershipCard"
                            file={documents.membershipCard}
                            onChange={updateDocument}
                        />

                        <DocumentField
                            title="Additional identification"
                            description="Another approved identity document, if requested."
                            name="additionalId"
                            file={documents.additionalId}
                            onChange={updateDocument}
                        />
                    </div>
                </section>

                {/* Privacy and consent */}
                <section className="rounded-xl border border-blue-100 bg-blue-50/60 p-6">
                    <div className="flex items-start gap-3">
                        <ShieldCheck className="mt-1 shrink-0 text-blue-700" size={22} />

                        <div>
                            <h3 className="font-bold text-slate-900">
                                Document security and consent
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-slate-600">
                                Your documents contain personal information. They should
                                only be accessed by authorized personnel for identity and
                                eligibility verification, in accordance with the platform's
                                privacy policy.
                            </p>
                        </div>
                    </div>

                    <label className="mt-5 flex cursor-pointer items-start gap-3">
                        <input
                            type="checkbox"
                            checked={consent}
                            onChange={(event) => setConsent(event.target.checked)}
                            className="mt-1 h-4 w-4 accent-blue-700"
                        />

                        <span className="text-sm leading-6 text-slate-700">
                            I confirm that the information and documents I have provided
                            are accurate and authorize their use for the stated
                            verification purpose.
                        </span>
                    </label>
                </section>

                {message && (
                    <div
                        role="alert"
                        className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800"
                    >
                        {message}
                    </div>
                )}

                {/* Submit */}
                <div className="flex flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
                    <p className="text-xs leading-5 text-slate-400">
                        You can save your progress and return later once draft saving
                        is connected.
                    </p>

                    <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-700 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? "Submitting application..." : "Submit for verification"}
                        <ChevronRight size={18} />
                    </button>
                </div>
            </form>
        </div>
    );
}
