"use client"

import * as React from "react"
import { ChevronRight, Globe, Users, Settings, BarChart3, FileText, BookOpen, AlertCircle } from "lucide-react"

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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

const navigationData = {
  main: [
    {
      title: "Dashboard",
      url: "/",
      icon: BarChart3,
    },
    {
      title: "User Management",
      icon: Users,
      items: [
        {
          title: "All Users",
          url: "/users",
        },
        {
          title: "Add New User",
          url: "/users/new",
        },
        {
          title: "User Roles",
          items: [
            {
              title: "Admin Roles",
              url: "/users/roles/admin",
            },
            {
              title: "Moderator Roles",
              url: "/users/roles/moderator",
            },
            {
              title: "User Permissions",
              url: "/users/roles/permissions",
            },
          ],
        },
        {
          title: "User Analytics",
          url: "/users/analytics",
        },
      ],
    },
    {
      title: "Administration",
      icon: Settings,
      items: [
        {
          title: "System Settings",
          url: "/admin",
        },
        {
          title: "Security",
          items: [
            {
              title: "Authentication",
              url: "/auth/login",
            },
            {
              title: "Access Control",
              url: "/admin/security/access",
            },
            {
              title: "Audit Logs",
              url: "/admin/security/logs",
            },
            {
              title: "Two-Factor Auth",
              url: "/admin/security/2fa",
            },
          ],
        },
        {
          title: "Database",
          items: [
            {
              title: "Backup & Restore",
              url: "/admin/database/backup",
            },
            {
              title: "Migrations",
              url: "/admin/database/migrations",
            },
            {
              title: "Performance",
              url: "/admin/database/performance",
            },
          ],
        },
        {
          title: "Monitoring",
          url: "/admin/monitoring",
        },
      ],
    },
    {
      title: "Content Management",
      icon: BookOpen,
      items: [
        {
          title: "Posts",
          url: "/content/posts",
        },
        {
          title: "Media Library",
          url: "/content/media",
        },
        {
          title: "Categories",
          url: "/content/categories",
        },
      ],
    },
    {
      title: "Sample Forms",
      url: "/sample-forms",
      icon: FileText,
    },
    {
      title: "Reports & Analytics",
      icon: BarChart3,
      items: [
        {
          title: "User Analytics",
          url: "/reports/users",
        },
        {
          title: "Performance Metrics",
          url: "/reports/performance",
        },
        {
          title: "Financial Reports",
          items: [
            {
              title: "Revenue Reports",
              url: "/reports/financial/revenue",
            },
            {
              title: "Expense Tracking",
              url: "/reports/financial/expenses",
            },
            {
              title: "Profit & Loss",
              url: "/reports/financial/pl",
            },
            {
              title: "Budget Analysis",
              url: "/reports/financial/budget",
            },
          ],
        },
        {
          title: "Export Data",
          url: "/reports/export",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <AlertCircle className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">DueDash</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationData.main.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.items ? (
                    <Collapsible asChild className="group/collapsible">
                      <div>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton tooltip={item.title}>
                            {item.icon && <item.icon />}
                            <span>{item.title}</span>
                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items?.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                {subItem.items ? (
                                  <Collapsible asChild className="group/nested">
                                    <div>
                                      <CollapsibleTrigger asChild>
                                        <SidebarMenuSubButton>
                                          <span>{subItem.title}</span>
                                          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/nested:rotate-90" />
                                        </SidebarMenuSubButton>
                                      </CollapsibleTrigger>
                                      <CollapsibleContent>
                                        <SidebarMenuSub>
                                          {subItem.items?.map((nestedItem) => (
                                            <SidebarMenuSubItem key={nestedItem.title}>
                                              <SidebarMenuSubButton asChild>
                                                <a href={nestedItem.url}>
                                                  <span>{nestedItem.title}</span>
                                                </a>
                                              </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                          ))}
                                        </SidebarMenuSub>
                                      </CollapsibleContent>
                                    </div>
                                  </Collapsible>
                                ) : (
                                  <SidebarMenuSubButton asChild>
                                    <a href={subItem.url}>
                                      <span>{subItem.title}</span>
                                    </a>
                                  </SidebarMenuSubButton>
                                )}
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </div>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton asChild tooltip={item.title}>
                      <a href={item.url}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
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
                  <Globe className="size-4" />
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Language</span>
                    <span className="truncate text-xs">English</span>
                  </div>
                  <ChevronRight className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuItem>
                  <span>English</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Español</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Français</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Deutsch</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>日本語</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>中文</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}