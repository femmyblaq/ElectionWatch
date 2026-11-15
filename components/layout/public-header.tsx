
import Link from "next/link";
import {
  ShieldCheck,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Elections", href: "/elections" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "About", href: "/about" },
];

export default function PublicHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">

        {/* Brand */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-700 text-white shadow-lg shadow-blue-700/20">
            <ShieldCheck size={25} />
          </div>

          <div>
            <p className="text-base font-extrabold tracking-tight text-slate-900">
              Election<span className="text-blue-700">Watch</span>
            </p>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              Transparency Platform
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-slate-600 transition hover:text-blue-700"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-4 lg:flex">
          <Link
            href="/login"
            className="text-sm font-semibold text-slate-700 transition hover:text-blue-700"
          >
            Sign in
          </Link>

          <Link
            href="/register"
            className="rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800"
          >
            Become an Agent
          </Link>
        </div>

        {/* Mobile Navigation */}
        <details className="group relative lg:hidden">
          <summary
            aria-label="Toggle navigation"
            className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-lg border border-slate-200 text-slate-700 [&::-webkit-details-marker]:hidden"
          >
            <Menu className="group-open:hidden" size={22} />
            <X className="hidden group-open:block" size={22} />
          </summary>

          <div className="absolute right-0 top-14 w-[min(90vw,320px)] rounded-xl border border-slate-200 bg-white p-5 shadow-xl">
            <nav className="flex flex-col gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="rounded-lg px-3 py-3 text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mt-4 flex flex-col gap-3 border-t border-slate-100 pt-4">
              <Link
                href="/signin"
                className="rounded-lg border border-slate-200 px-4 py-3 text-center text-sm font-semibold text-slate-700"
              >
                Sign in
              </Link>

              <Link
                href="/signup"
                className="rounded-lg bg-blue-700 px-4 py-3 text-center text-sm font-semibold text-white"
              >
                Become an Agent
              </Link>
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}
