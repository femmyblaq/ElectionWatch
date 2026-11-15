
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

export default function CTASection() {
  return (
    <section className="bg-white px-5 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-blue-700 px-7 py-16 text-center sm:px-14">
        <ShieldCheck className="mx-auto text-blue-200" size={42} />

        <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Transparency starts with participation.
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-blue-100 sm:text-base">
          Be part of a more accountable election reporting
          process. Explore election information and learn how
          authorized agents contribute to the platform.
        </p>

        <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/elections"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-7 py-4 text-sm font-bold text-blue-800 transition hover:bg-blue-50"
          >
            Explore Elections
            <ArrowRight size={18} />
          </Link>

          <Link
            href="/about"
            className="rounded-lg border border-blue-300/50 px-7 py-4 text-sm font-semibold text-white transition hover:bg-blue-600"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}
