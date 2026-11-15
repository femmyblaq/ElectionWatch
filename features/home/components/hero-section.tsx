import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  FileCheck2,
  MapPin,
  Eye,
} from "lucide-react";

/**
 * HOW TO ADD YOUR IMAGE
 * 1. Copy your image into the /public/images folder of your project
 *    (create the folder if it doesn't exist), e.g. /public/images/ballot.jpg
 * 2. Make sure the filename matches the `src` below. Paths start with "/"
 *    and do NOT include "public", so /public/images/ballot.jpg -> "/images/ballot.jpg"
 * 3. Use a portrait or square image, about 1000 x 1200px, under ~300KB.
 */
const HERO_IMAGE = "/images/ballot-box-photo.png";

const trustPillars = [
  {
    icon: MapPin,
    title: "Reported from the polling unit",
    text: "Trained agents submit results from where the votes are counted.",
  },
  {
    icon: FileCheck2,
    title: "Every submission is traceable",
    text: "Each result is reviewed and linked to who submitted it and when.",
  },
  {
    icon: Eye,
    title: "Open to everyone",
    text: "Verified results are published for citizens to see and compare.",
  },
];

export default function HeroSection() {
  return (
    <section aria-labelledby="hero-heading" className="text-slate-950">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-16 lg:min-h-[calc(100svh-5rem)] lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-20">
        {/* Left: content */}
        <div>
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700">
            <ShieldCheck size={16} className="text-blue-700" />
            Independent election monitoring for Nigeria
          </p>

          <h1
  id="hero-heading"
  className="max-w-2xl text-balance text-5xl font-black leading-[1.05] tracking-tighter sm:text-6xl lg:text-6xl"
>
  Every vote counted. Every result you can check.
</h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
            Millions of Nigerians wait in line to be heard. We make sure what
            happens next is open to see: results are reported from each
            polling unit, reviewed, and published for anyone to verify.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/how-it-works"
              className="group inline-flex items-center justify-center gap-3 rounded-lg bg-blue-700 px-7 py-4 text-sm font-semibold text-white transition hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700"
            >
              See how we verify results
              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/elections"
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-7 py-4 text-sm font-semibold text-slate-700 transition hover:border-blue-700 hover:text-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700"
            >
              Browse election results
            </Link>
          </div>

          {/* Trust points */}
          <ul className="mt-12 grid gap-6 border-t border-slate-200 pt-8 sm:grid-cols-3">
            {trustPillars.map(({ icon: Icon, title, text }) => (
              <li key={title}>
                <Icon size={20} className="text-blue-700" />
                <h2 className="mt-3 text-sm font-semibold">{title}</h2>
                <p className="mt-1 text-sm leading-6 text-slate-600">{text}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: ballot image */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl">
            <Image
              src={HERO_IMAGE}
              alt="A voter casting a ballot into a ballot box"
              fill
              priority
              sizes="(min-width: 1024px) 560px, 90vw"
              className="object-cover"
            />
          </div>

          {/* Caption chip */}
          <div className="absolute -bottom-5 left-5 flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-lg sm:left-8">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-700 text-white">
              <ShieldCheck size={18} />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Cast. Counted. Published.
              </p>
              <p className="text-xs text-slate-500">
                Follow your vote from unit to result
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
