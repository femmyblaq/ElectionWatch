
"use client";

import { usePathname } from "next/navigation";
import { ChevronRight, Bell } from "lucide-react";

const pageTitles: Record<string, string> = {
  "/admin": "Overview",
  "/admin/agents": "Agent Applications",
  "/admin/agents/registered": "Registered Agents",
};

export default function AdminHeader() {
  const pathname = usePathname();

  const title =
    pathname.startsWith("/admin/agents/") &&
    pathname !== "/admin/agents/registered"
      ? "Application Review"
      : pageTitles[pathname] || "Administration";

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-5 sm:px-8">
      {/* Page title */}
      <div className="flex min-w-0 items-center gap-2">
        <span className="hidden text-sm text-slate-400 sm:block">
          Admin
        </span>

        <ChevronRight
          size={15}
          className="hidden text-slate-300 sm:block"
        />

        <h2 className="truncate text-sm font-semibold text-slate-800 sm:text-base">
          {title}
        </h2>
      </div>

      {/* Administrator profile */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
        >
          <Bell size={19} />
        </button>

        <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
            AD
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-slate-800">
              Administrator
            </p>

            <p className="text-xs text-slate-500">
              Demo account
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
