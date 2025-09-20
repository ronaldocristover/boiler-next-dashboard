"use client"

import { usePathname } from "next/navigation"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/navigation/app-sidebar"
import { MobileNav } from "@/components/navigation/mobile-nav"

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname()

  // Check if current path is an auth page
  const isAuthPage = pathname?.startsWith('/auth')

  if (isAuthPage) {
    // Return children without layout for auth pages
    return <>{children}</>
  }

  // Return children with sidebar layout for all other pages
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-4 md:p-6">
            {children}
          </div>
        </main>
      </SidebarInset>
      <MobileNav />
    </SidebarProvider>
  )
}