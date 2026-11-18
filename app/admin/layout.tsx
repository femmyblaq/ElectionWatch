
import type { ReactNode } from "react";

import AdminSidebar from "@/components/admin/admin-sidebar";
import AdminHeader from "@/components/admin/admin-header";

type AdminLayoutProps = {
  children: ReactNode;
};

export default function AdminLayout({
  children,
}: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 lg:flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main content */}
      <div className="min-w-0 flex-1">
        <AdminHeader />

        <main className="p-5 sm:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
