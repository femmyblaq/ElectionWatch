
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

export default function CTASection() {
  return (
    <section className="bg-white px-5 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-2xl bg-[#0B2854] px-7 py-16 text-center sm:px-12 lg:py-20">

          <ShieldCheck
            size={38}
            strokeWidth={1.6}
            className="mx-auto text-blue-200"
          />

          <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Transparency starts with participation.
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-blue-100 sm:text-base">
            Explore election information, discover polling unit
            locations, and understand how our platform supports
            transparent and accountable election reporting in Nigeria.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">

            <Link
              href="/elections"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-7 py-3.5 text-sm font-semibold text-[#0B2854] transition hover:bg-blue-50"
            >
              Explore Elections
              <ArrowRight size={17} />
            </Link>

            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-lg border border-blue-200/50 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Learn More
            </Link>

          </div>
        </div>
      </div>
    </section>
  );
}
