
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Users,
  ClipboardCheck,
  ClipboardList,
  ShieldCheck,
  LogOut,
} from "lucide-react";

const navigation = [
  {
    label: "Overview",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Agent Applications",
    href: "/admin/agents",
    icon: ClipboardCheck,
  },
  {
    label: "Registered Agents",
    href: "/admin/agents/registered",
    icon: Users,
  },
  {
  label: "Polling Unit Assignments",
  href: "/admin/assignments",
  icon: ClipboardList,
},
];

export default function AdminSidebar() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/admin") {
      return pathname === "/admin";
    }

    if (href === "/admin/agents") {
      return (
        pathname === "/admin/agents" ||
        (pathname.startsWith("/admin/agents/") &&
          pathname !== "/admin/agents/registered")
      );
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <aside className="flex w-full shrink-0 flex-col border-b border-slate-200 bg-white lg:sticky lg:top-0 lg:h-screen lg:w-64 lg:border-b-0 lg:border-r">
      {/* Brand */}
      <div className="flex h-16 shrink-0 items-center gap-3 border-b border-slate-200 px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-700 text-white">
          <ShieldCheck size={20} />
        </div>

        <div>
          <h1 className="font-bold text-slate-900">
            ElectionWatch
          </h1>
          <p className="text-xs text-slate-500">
            Administration
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav
        aria-label="Admin navigation"
        className="flex gap-2 overflow-x-auto p-3 lg:flex-1 lg:flex-col lg:overflow-y-auto lg:p-4"
      >
        <p className="hidden px-4 pb-2 pt-3 text-xs font-semibold uppercase tracking-wider text-slate-400 lg:block">
          Workspace
        </p>

        {navigation.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`flex shrink-0 items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
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

              {active && (
                <span className="ml-auto hidden h-2 w-2 rounded-full bg-blue-700 lg:block" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="hidden shrink-0 border-t border-slate-200 p-4 lg:block">
        <Link
          href="/signin"
          className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-slate-500 transition hover:bg-red-50 hover:text-red-600"
        >
          <LogOut size={18} />
          Exit admin demo
        </Link>
      </div>
    </aside>
  );
}
