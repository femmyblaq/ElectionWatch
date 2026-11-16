import AgentVerificationForm from "@/features/agents/components/agent-verification-form";

export default function AgentVerificationPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto mb-8 max-w-5xl">
        <p className="text-sm font-bold tracking-wide text-blue-700">
          ELECTIONWATCH / AGENT PORTAL
        </p>
      </div>

      <AgentVerificationForm />
    </main>
  );
}