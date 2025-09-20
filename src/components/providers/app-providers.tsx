"use client";

import { Toaster } from "@/components/ui/sonner";
import { ErrorBoundary } from "@/components/common/error-boundary";

interface AppProvidersProps {
  children: React.ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ErrorBoundary>
      {children}
      <Toaster position="top-right" />
    </ErrorBoundary>
  );
}