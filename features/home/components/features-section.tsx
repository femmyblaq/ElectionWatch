
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  BarChart3,
  Map,
  FileSearch,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Election Information",
    description:
      "Access election information, official documentation, and relevant electoral resources.",
    image: "/images/election-information.jpeg",
    href: "/elections",
  },
  {
    icon: Map,
    title: "Polling Unit Visibility",
    description:
      "Explore Nigeria's electoral structure across states, LGAs, wards, and polling units.",
    image: "/images/polling-units.jpeg",
    href: "/polling-units",
  },
  {
    icon: BarChart3,
    title: "Results and Analytics",
    description:
      "Explore published election results and access relevant reporting and analytical information.",
    image: "/images/election-analytics.jpeg",
    href: "/results",
  },
  {
    icon: FileSearch,
    title: "Submission Traceability",
    description:
      "Understand how election information is submitted, reviewed, and tracked throughout the process.",
    image: "/images/submission-tracking.jpeg",
    href: "/transparency",
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-slate-50 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">

        {/* Section Heading */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-700">
              Platform capabilities
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Making election information more accessible.
            </h2>

            <p className="mt-5 max-w-xl text-base leading-8 text-slate-500">
              Discover the tools and resources designed to improve
              access to election information and support transparent
              reporting across Nigeria.
            </p>
          </div>

          <Link
            href="/elections"
            className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-blue-700 transition-colors hover:text-blue-900"
          >
            Explore elections
            <ArrowRight size={17} />
          </Link>
        </div>

        {/* Feature Cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <Link
                key={feature.title}
                href={feature.href}
                className="group overflow-hidden rounded-xl border border-slate-200 bg-white transition-colors duration-300 hover:border-blue-300"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>

                {/* Content */}
                <div className="flex min-h-[245px] flex-col p-6">

                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                    <Icon size={21} strokeWidth={1.8} />
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-slate-900">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-500">
                    {feature.description}
                  </p>

                  <div className="mt-auto flex items-center gap-2 pt-6 text-sm font-semibold text-blue-700">
                    Explore feature
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
