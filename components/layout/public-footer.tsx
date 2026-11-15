
import Link from "next/link";
import { ShieldCheck, Mail, ArrowUpRight } from "lucide-react";

const now = new Date().getFullYear() 
export default function PublicFooter() {
  return (
    <footer className="bg-[#08152e] text-white">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600">
                <ShieldCheck size={25} />
              </div>

              <div>
                <p className="font-extrabold">
                  Election<span className="text-blue-400">Watch</span>
                </p>
                <p className="text-[10px] uppercase tracking-widest text-slate-400">
                  Transparency Platform
                </p>
              </div>
            </Link>

            <p className="mt-6 max-w-md text-sm leading-7 text-slate-400">
              Supporting transparent election monitoring,
              structured reporting and public accountability
              through technology.
            </p>
          </div>

          <div>
            <h3 className="font-bold">Explore</h3>

            <div className="mt-5 flex flex-col gap-4 text-sm text-slate-400">
              <Link href="/" className="hover:text-white">Home</Link>
              <Link href="/elections" className="hover:text-white">Elections</Link>
              <Link href="/about" className="hover:text-white">About Us</Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold">Get Started</h3>

            <div className="mt-5 flex flex-col gap-4 text-sm text-slate-400">
              <Link href="/login" className="hover:text-white">Sign In</Link>
              <Link href="/register" className="hover:text-white">Agent Registration</Link>
              <Link href="/about" className="hover:text-white">How It Works</Link>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col justify-between gap-5 border-t border-white/10 pt-7 text-xs text-slate-500 sm:flex-row">
          <p>
            © {now} ElectionWatch. All rights reserved.
          </p>

          <p>
            Built to support transparency and accountability.
          </p>
        </div>
      </div>
    </footer>
  );
}
