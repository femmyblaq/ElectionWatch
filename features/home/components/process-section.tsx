
import Image from "next/image";
import {
  UserCheck,
  MapPinCheck,
  ClipboardList,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: UserCheck,
    title: "Agent Registration",
    description:
      "Eligible election agents register, submit the required information, and complete the necessary verification and approval process.",
    image: "/images/agent-registration.jpeg",
  },
  {
    number: "02",
    icon: MapPinCheck,
    title: "Polling Unit Assignment",
    description:
      "Approved agents are assigned to designated polling units, ensuring organized coverage across electoral locations.",
    image: "/images/polling-assignment.jpeg",
  },
  {
    number: "03",
    icon: ClipboardList,
    title: "Result Submission",
    description:
      "Agents submit structured election information, including supporting documents and relevant polling unit records.",
    image: "/images/result-submission.jpeg",
  },
  {
    number: "04",
    icon: ShieldCheck,
    title: "Verification and Transparency",
    description:
      "Authorized reviewers assess submitted information while preserving reporting history, traceability, and accountability.",
    image: "/images/result-verification.jpeg",
  },
];

export default function ProcessSection() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-white py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">

        {/* Section Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-700">
            How it works
          </span>

          <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            From the polling unit to{" "}
            <span className="text-blue-700">
              public accountability.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-500">
            A transparent, structured process connecting authorized
            election agents, field-level reporting, and independent
            verification to strengthen public access to election information.
          </p>
        </div>

        {/* Process Cards */}
        <div className="relative mt-16 lg:mt-20">

          {/* Connecting Line - Desktop */}
          <div className="absolute left-[12%] right-[12%] top-8 hidden h-px border-t-2 border-dashed border-blue-200 lg:block" />

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="group relative"
                >
                  {/* Step Number */}
                  <div className="relative z-10 mb-6 flex items-center justify-between">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border-4 border-white bg-blue-700 text-white shadow-lg shadow-blue-900/10 transition-transform duration-300 group-hover:scale-110">
                      <Icon size={25} strokeWidth={1.8} />
                    </div>

                    <span className="text-4xl font-black tracking-tight text-slate-100 transition-colors duration-300 group-hover:text-blue-100">
                      {step.number}
                    </span>
                  </div>

                  {/* Card */}
                  <div className="h-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 group-hover:-translate-y-2 group-hover:border-blue-200 group-hover:shadow-xl">

                    {/* Image */}
                    <div className="relative h-52 overflow-hidden">
                      <Image
                        src={step.image}
                        alt={step.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 to-transparent" />

                      <span className="absolute bottom-4 left-5 rounded-lg bg-white/95 px-3 py-1.5 text-xs font-bold tracking-wider text-blue-700 shadow-sm">
                        STEP {step.number}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-lg font-bold leading-snug text-slate-900">
                        {step.title}
                      </h3>

                      <p className="mt-4 min-h-[112px] text-sm leading-7 text-slate-500">
                        {step.description}
                      </p>

                      <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-5 text-xs font-bold uppercase tracking-wider text-blue-700">
                        <span>Process stage</span>
                        <ArrowRight
                          size={15}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Message */}
        <div className="mt-16 rounded-2xl border border-blue-100 bg-blue-50/60 px-6 py-8 text-center sm:px-10">
          <div className="mx-auto max-w-2xl">
            <ShieldCheck
              size={30}
              className="mx-auto text-blue-700"
            />

            <h3 className="mt-4 text-lg font-bold text-slate-900">
              Built around accountability and transparency.
            </h3>

            <p className="mt-3 text-sm leading-7 text-slate-600">
              Every stage contributes to a structured reporting
              process that supports traceability, responsible review,
              and accessible election information.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
