
import {
  UserCheck,
  MapPinCheck,
  ClipboardList,
  ShieldCheck,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: UserCheck,
    title: "Agent Registration",
    description:
      "Eligible election agents register and complete the required verification and approval process.",
  },
  {
    number: "02",
    icon: MapPinCheck,
    title: "Polling Unit Assignment",
    description:
      "Authorized agents receive assignments to designated polling units.",
  },
  {
    number: "03",
    icon: ClipboardList,
    title: "Result Submission",
    description:
      "Agents submit structured election information with supporting documentation.",
  },
  {
    number: "04",
    icon: ShieldCheck,
    title: "Verification and Transparency",
    description:
      "Authorized reviewers assess submissions while maintaining traceability and accountability.",
  },
];

export default function ProcessSection() {
  return (
    <section id="how-it-works" className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">

        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-700">
            Our process
          </p>

          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            From the polling unit to public accountability.
          </h2>

          <p className="mt-5 leading-8 text-slate-500">
            A structured reporting process designed to connect
            field-level observations with transparent review and
            accountability.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div key={step.number} className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-700 text-white shadow-lg shadow-blue-700/20">
                  <Icon size={25} />
                </div>

                <p className="mt-7 text-xs font-bold tracking-widest text-blue-700">
                  STEP {step.number}
                </p>

                <h3 className="mt-3 text-lg font-bold text-slate-900">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
