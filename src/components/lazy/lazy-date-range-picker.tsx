"use client";

import { lazy, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorBoundary } from "@/components/common/error-boundary";

const DateRangePicker = lazy(() =>
  import("@/lib/date-range-picker").then((module) => ({
    default: module.DateRangePicker,
  }))
);

interface DateRange {
  startDate: string;
  endDate: string;
}

interface LazyDateRangePickerProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
  className?: string;
}

function DateRangePickerSkeleton() {
  return <Skeleton className="h-10 w-full" />;
}

export function LazyDateRangePicker(props: LazyDateRangePickerProps) {
  return (
    <ErrorBoundary>
      <Suspense fallback={<DateRangePickerSkeleton />}>
        <DateRangePicker {...props} />
      </Suspense>
    </ErrorBoundary>
  );
}