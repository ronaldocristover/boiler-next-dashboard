"use client";

import { usePathname } from "next/navigation";
import { SidebarNavigation } from "@/lib/dropdown-menu";

interface ConditionalLayoutProps {
  children: React.ReactNode;
  navigationItems: Array<{
    label: string;
    href?: string;
    icon: React.ReactNode;
    children?: Array<{
      label: string;
      href?: string;
      icon?: React.ReactNode;
      children?: Array<{
        label: string;
        href?: string;
      }>;
    }>;
  }>;
}

export function ConditionalLayout({ children, navigationItems }: ConditionalLayoutProps) {
  const pathname = usePathname();

  // Check if current path is an auth page
  const isAuthPage = pathname?.startsWith('/auth');

  if (isAuthPage) {
    // Return children without admin layout for auth pages
    return <>{children}</>;
  }

  // Return children with admin layout for all other pages
  return (
    <div className="flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 border-r bg-sidebar text-sidebar-foreground fixed h-full z-30">
        <div className="h-full flex flex-col">
          {/* Logo/Brand Header */}
          <div className="px-4 py-6 border-b flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-green-600 flex items-center justify-center">
              </div>
              <span className="font-semibold text-lg">DueDash</span>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto">
            <SidebarNavigation items={navigationItems} />
          </div>

          {/* Language Selector in Footer */}
          <div className="p-4 border-t">
            <div className="relative group">
              <button className="w-full flex items-center justify-between px-3 py-2 text-sm rounded hover:bg-sidebar-accent transition-colors">
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>English</span>
                </div>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {/* Language Dropdown */}
              <div className="absolute bottom-full left-0 mb-2 w-full bg-popover border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-1">
                  <a href="#" className="block px-4 py-2 text-sm hover:bg-accent">English</a>
                  <a href="#" className="block px-4 py-2 text-sm hover:bg-accent">Español</a>
                  <a href="#" className="block px-4 py-2 text-sm hover:bg-accent">Français</a>
                  <a href="#" className="block px-4 py-2 text-sm hover:bg-accent">Deutsch</a>
                  <a href="#" className="block px-4 py-2 text-sm hover:bg-accent">日本語</a>
                  <a href="#" className="block px-4 py-2 text-sm hover:bg-accent">中文</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t z-40">
        <nav className="flex items-center justify-around px-2 py-2">
          <a href="/" className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg hover:bg-accent transition-colors">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
            </svg>
            <span className="text-xs">Dashboard</span>
          </a>
          <a href="/users" className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg hover:bg-accent transition-colors">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
            <span className="text-xs">Users</span>
          </a>
          <a href="/admin" className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg hover:bg-accent transition-colors">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-xs">Admin</span>
          </a>
          <a href="/sample-forms" className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg hover:bg-accent transition-colors">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span className="text-xs">Forms</span>
          </a>
          <button className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg hover:bg-accent transition-colors">
            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white text-xs font-medium">J</span>
            </div>
            <span className="text-xs">Profile</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 min-h-screen">
        <div className="p-4 md:p-6 pb-20 lg:pb-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}