"use client";
import Image from "next/image";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Vote, Menu, X, ArrowRight } from "lucide-react";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Elections", href: "/elections" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "About", href: "/about" },
];

export default function PublicHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add a soft shadow once the page scrolls
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu after navigating
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // A link is "active" when its page matches. Hash links (e.g. /#how-it-works)
  // can't be detected from the pathname, so they never show as active.
  const isActive = (href: string) => {
    if (href.includes("#")) return false;
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-white/90 backdrop-blur-xl transition-shadow ${
        scrolled
          ? "border-slate-200 shadow-sm shadow-slate-900/5"
          : "border-slate-200/70"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        {/* Brand */}
        
        <Link href="/" className="group inline-flex items-center gap-3">

              {/* <div className="relative h-14 w-14 overflow-hidden rounded-xl border border-white/15 bg-white">
                <Image
                  src="/images/ballot-box-photo.png"
                  alt="ElectionWatch ballot box"
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div> */}

              <div>
                <p className="text-xl font-extrabold tracking-tight">
                  Election<span className="">watch</span>
                </p>

                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Electoral Transparency Platform
                </p>
              </div>

            </Link>

        {/* Desktop navigation */}
        <nav
          aria-label="Main"
          className="hidden items-center gap-1 rounded-full border border-slate-200 bg-slate-50/80 p-1 lg:flex"
        >
          {navigation.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-5 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-700 ${
                  active
                    ? "bg-white text-blue-700 shadow-sm ring-1 ring-slate-200"
                    : "text-slate-600 hover:bg-white hover:text-slate-900"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/signin"
            className="rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-700"
          >
            Sign in
          </Link>

          <Link
            href="/signup"
            className="group inline-flex items-center gap-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-700/25 transition hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          >
            Become an Agent
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-700 lg:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-menu"
          className="border-t border-slate-200 bg-white lg:hidden"
        >
          <div className="mx-auto max-w-7xl px-5 py-5">
            <nav aria-label="Mobile" className="flex flex-col gap-1">
              {navigation.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`rounded-lg px-4 py-3 text-base font-medium transition ${
                      active
                        ? "bg-blue-50 text-blue-700"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-4 grid gap-3 border-t border-slate-100 pt-4 sm:grid-cols-2">
              <Link
                href="/login"
                className="rounded-lg border border-slate-300 px-4 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Sign in
              </Link>

              <Link
                href="/register"
                className="rounded-lg bg-blue-700 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-800"
              >
                Become an Agent
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
