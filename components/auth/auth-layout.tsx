
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type AuthLayoutProps = {
  title: string;
  description: string;
  children: ReactNode;
  footer: ReactNode;
};

export default function AuthLayout({
  title,
  description,
  children,
  footer,
}: AuthLayoutProps) {
  return (
    <main className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto grid min-h-[calc(100vh-2rem)] max-w-7xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl sm:min-h-[calc(100vh-3rem)] lg:grid-cols-2 lg:min-h-[calc(100vh-4rem)]">

        {/* Left image panel */}
        <section className="relative hidden min-h-[650px] overflow-hidden bg-slate-900 lg:block">
          <Image
            src="/images/ballot-box-photo.png"
            alt="A ballot being placed into a ballot box at a polling station"
            fill
            priority
            sizes="50vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-slate-950/35" />

          <div className="absolute left-10 top-10 z-10">
            <Link href="/" className="text-2xl font-bold tracking-tight text-white">
              Election<span className="text-blue-300">Watch</span>
            </Link>
            <p className="mt-1 text-sm text-slate-200">
              Electoral transparency and accountability
            </p>
          </div>

          <div className="absolute bottom-0 left-0 right-0 z-10 bg-slate-950 px-10 py-10">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
              A stronger democracy
            </p>

            <h1 className="max-w-lg text-4xl font-bold leading-tight text-white xl:text-5xl">
              Your Vote. Your Voice. Our Democracy.
            </h1>

            <p className="mt-5 max-w-lg text-base leading-7 text-slate-300">
              Be part of a transparent electoral process. Stay informed,
              follow election activities, and support accountability
              across every polling unit.
            </p>
          </div>
        </section>

        {/* Right form panel */}
        <section className="flex items-center justify-center px-5 py-10 sm:px-10 lg:px-14 xl:px-20">
          <div className="w-full max-w-md">
            {/* Mobile brand */}
            <Link
              href="/"
              className="mb-10 inline-block text-2xl font-bold tracking-tight text-slate-900 lg:hidden"
            >
              Election<span className="text-blue-700">Watch</span>
            </Link>

            <div className="mb-8">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                {title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                {description}
              </p>
            </div>

            {children}

            <div className="mt-8 text-center text-sm text-slate-500">
              {footer}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
