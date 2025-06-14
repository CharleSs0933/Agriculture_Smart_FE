import type React from "react";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 transition-all duration-200">
          <SidebarTrigger className="-ml-1 hover:bg-accent hover:text-accent-foreground transition-colors" />
        </header>
        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-auto p-4">{children}</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
