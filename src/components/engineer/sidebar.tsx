"use client";
import { BarChart3, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { engineerSidebarItems } from "@/lib/constants";
import { useUser } from "@/hooks/userUser";
import { Skeleton } from "../ui/skeleton";

export function EngineerSidebar() {
  const { user, logout, isLoading, isLogoutLoading } = useUser();
  const pathname = usePathname();

  if (isLoading) {
    return (
      <div className="flex h-full flex-col justify-between border-r bg-sidebar px-2 py-4">
        {/* Sidebar Header */}
        <div className="mb-4 space-y-2">
          <div className="flex items-center gap-2 px-2">
            <Skeleton className="size-8 rounded-lg bg-muted" />
            <div className="flex flex-col gap-1">
              <Skeleton className="h-4 w-24 bg-muted" />
              <Skeleton className="h-3 w-16 bg-muted/80" />
            </div>
          </div>
        </div>

        {/* Sidebar Content */}
        <div className="flex-1 space-y-4 overflow-auto">
          {[...Array(3)].map((_, groupIndex) => (
            <div key={groupIndex} className="space-y-2">
              <Skeleton className="h-4 w-28 bg-muted/70 px-2" />
              {[...Array(3)].map((_, itemIndex) => (
                <div key={itemIndex} className="flex items-center gap-2 px-2">
                  <Skeleton className="size-4 rounded bg-muted" />
                  <Skeleton className="h-3 w-20 bg-muted/60" />
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Sidebar Footer */}
        <div className="mt-4 space-y-2 border-t pt-4 px-2">
          <div className="flex items-center gap-2">
            <Skeleton className="size-8 rounded-lg bg-muted" />
            <div className="flex flex-col gap-1">
              <Skeleton className="h-4 w-24 bg-muted" />
              <Skeleton className="h-3 w-20 bg-muted/80" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/engineer">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <BarChart3 className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Admin Panel</span>
                  <span className="text-xs">Quản lý hệ thống</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {engineerSidebarItems.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={pathname === item.url}>
                      <Link href={item.url}>
                        <item.icon className="size-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      src="/placeholder.svg?height=32&width=32"
                      alt="Admin"
                    />
                    <AvatarFallback className="rounded-lg">AD</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold capitalize">
                      {user?.userName || "Admin"}
                    </span>
                    <span className="truncate text-xs">
                      {user?.email || "admin@gmail.com"}
                    </span>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuItem onClick={logout} disabled={isLogoutLoading}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Đăng xuất
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
