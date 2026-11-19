
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MapPin,
  Video,
  FileText,
  ShieldCheck,
  LogOut,
} from "lucide-react";

const navigation = [
  {
    label: "Overview",
    href: "/agent/dashboard#overview",
    icon: LayoutDashboard,
  },
  {
    label: "My Assignments",
    href: "/agent/dashboard#assignments",
    icon: MapPin,
  },
  {
    label: "Video Evidence",
    href: "/agent/dashboard#video-evidence",
    icon: Video,
  },
  {
    label: "My Reports",
    href: "/agent/dashboard#reports",
    icon: FileText,
  },
];

export default function AgentSidebar() {
  const pathname = usePathname();

  function signOut() {
    sessionStorage.removeItem("electionwatch_demo_agent");
    window.location.href = "/signin";
  }

  return (
    <aside className="flex w-full shrink-0 flex-col border-b border-slate-200 bg-white lg:sticky lg:top-0 lg:h-screen lg:w-64 lg:border-b-0 lg:border-r">
      <div className="flex h-20 items-center gap-3 border-b border-slate-200 px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-700 text-white">
          <ShieldCheck size={22} />
        </div>

        <div>
          <h1 className="font-bold tracking-tight text-slate-900">
            ElectionWatch
          </h1>
          <p className="text-xs text-slate-500">Agent Portal</p>
        </div>
      </div>

      <nav
        aria-label="Agent navigation"
        className="flex gap-2 overflow-x-auto p-3 lg:flex-1 lg:flex-col lg:overflow-visible lg:p-4"
      >
        <p className="hidden px-3 pb-2 pt-4 text-xs font-semibold uppercase tracking-wider text-slate-400 lg:block">
          Workspace
        </p>

        {navigation.map((item, index) => {
          const Icon = item.icon;
          const active = index === 0 && pathname === "/agent/dashboard";

          return (
            <Link
              key={item.label}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                active
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Icon
                size={19}
                className={active ? "text-blue-700" : "text-slate-400"}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="hidden border-t border-slate-200 p-4 lg:block">
        <button
          type="button"
          onClick={signOut}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-500 transition hover:bg-red-50 hover:text-red-600"
        >
          <LogOut size={18} />
          Sign out
        </button>
      </div>
    </aside>
  );
}
