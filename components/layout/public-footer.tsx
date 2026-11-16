
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight} from "lucide-react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin
} from "react-icons/fa";

const currentYear = new Date().getFullYear();

const footerLinks = {
  platform: [
    { label: "Home", href: "/" },
    { label: "Elections", href: "/elections" },
    { label: "About Us", href: "/about" },
  ],
  account: [
    { label: "Sign In", href: "/signin" },
    { label: "Create Account", href: "/signup" },
    { label: "Agent Registration", href: "/signup" },
  ],
  resources: [
    { label: "How It Works", href: "/about" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export default function PublicFooter() {
  return (
    <footer className="bg-[#08152e] text-white">

      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">

        <div className="grid gap-12 border-b border-white/10 pb-14 md:grid-cols-2 lg:grid-cols-5">

          {/* Brand section */}
          <div className="lg:col-span-2">

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

            <p className="mt-7 max-w-md text-sm leading-7 text-slate-400">
              Building confidence in Nigeria's electoral process through
              transparent election monitoring, structured reporting,
              reliable information and public accountability.
            </p>

            {/* Social links */}
            <div className="mt-7 flex items-center gap-3">
              <p className="mr-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Follow us
              </p>

              <Link
                href="#"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-slate-400 transition hover:border-blue-400 hover:bg-blue-500/10 hover:text-white"
              >
                <FaFacebook size={17} />
              </Link>

              <Link
                href="#"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-slate-400 transition hover:border-blue-400 hover:bg-blue-500/10 hover:text-white"
              >
                <FaInstagram size={17} />
              </Link>

              <Link
                href="#"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-slate-400 transition hover:border-blue-400 hover:bg-blue-500/10 hover:text-white"
              >
                <FaLinkedin size={17} />
              </Link>
            </div>
          </div>

          {/* Platform links */}
          <div>
            <h3 className="text-sm font-bold tracking-wide text-white">
              Platform
            </h3>

            <ul className="mt-6 space-y-4">
              {footerLinks.platform.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 transition hover:text-blue-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account links */}
          <div>
            <h3 className="text-sm font-bold tracking-wide text-white">
              Get Started
            </h3>

            <ul className="mt-6 space-y-4">
              {footerLinks.account.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 transition hover:text-blue-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-bold tracking-wide text-white">
              Resources
            </h3>

            <ul className="mt-6 space-y-4">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 transition hover:text-blue-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom footer */}
        <div className="flex flex-col justify-between gap-6 pt-8 sm:flex-row sm:items-center">

          <p className="text-xs leading-6 text-slate-500">
            © {currentYear} ElectionWatch. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-5 text-xs text-slate-500">
            <Link href="/privacy" className="transition hover:text-white">
              Privacy
            </Link>

            <Link href="/terms" className="transition hover:text-white">
              Terms
            </Link>

            <Link
              href="/about"
              className="inline-flex items-center gap-1 transition hover:text-white"
            >
              About ElectionWatch
              <ArrowUpRight size={13} />
            </Link>
          </div>

        </div>

      </div>
    </footer>
  );
}
