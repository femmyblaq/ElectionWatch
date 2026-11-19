
"use client";

import { Bell, ChevronDown } from "lucide-react";

type Props = {
  fullName: string;
  email: string;
};

export default function AgentHeader({ fullName, email }: Props) {
  const initials = fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-5 sm:px-8">
      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
          Agent workspace
        </p>
        <p className="mt-1 text-sm font-semibold text-slate-800">
          Election monitoring portal
        </p>
      </div>

      <div className="flex items-center gap-3 sm:gap-5">
        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-xl p-2.5 text-slate-500 transition hover:bg-slate-100"
        >
          <Bell size={20} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-600 ring-2 ring-white" />
        </button>

        <div className="flex items-center gap-3 border-l border-slate-200 pl-3 sm:pl-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
            {initials || "AG"}
          </div>

          <div className="hidden sm:block">
            <p className="max-w-40 truncate text-sm font-semibold text-slate-900">
              {fullName}
            </p>
            <p className="max-w-40 truncate text-xs text-slate-500">
              {email}
            </p>
          </div>

          <ChevronDown
            size={16}
            className="hidden text-slate-400 sm:block"
          />
        </div>
      </div>
    </header>
  );
}
