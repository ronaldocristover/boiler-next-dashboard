"use client";

import { lazy, Suspense } from "react";
import { FormSkeleton } from "@/components/common/loading-skeleton";
import { ErrorBoundary } from "@/components/common/error-boundary";

const WysiwygEditor = lazy(() =>
  import("@/lib/wysiwyg-editor").then((module) => ({
    default: module.WysiwygEditor,
  }))
);

interface LazyWysiwygProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function LazyWysiwyg(props: LazyWysiwygProps) {
  return (
    <ErrorBoundary>
      <Suspense fallback={<FormSkeleton />}>
        <WysiwygEditor {...props} />
      </Suspense>
    </ErrorBoundary>
  );
}