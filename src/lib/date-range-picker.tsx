"use client";

import { useState } from "react";

interface DateRange {
    startDate: string;
    endDate: string;
}

interface DateRangePickerProps {
    value: DateRange;
    onChange: (range: DateRange) => void;
    className?: string;
}

export function DateRangePicker({ value, onChange, className = "" }: DateRangePickerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [tempRange, setTempRange] = useState(value);

    const formatDate = (dateString: string) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
        });
    };

    const handleApply = () => {
        onChange(tempRange);
        setIsOpen(false);
    };

    const handleCancel = () => {
        setTempRange(value);
        setIsOpen(false);
    };

    const getDisplayText = () => {
        if (value.startDate && value.endDate) {
            return `${formatDate(value.startDate)} - ${formatDate(value.endDate)}`;
        } else if (value.startDate) {
            return `${formatDate(value.startDate)} - Select end date`;
        }
        return "Select date range";
    };

    const getQuickRanges = () => {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        const lastWeek = new Date(today);
        lastWeek.setDate(lastWeek.getDate() - 7);

        const lastMonth = new Date(today);
        lastMonth.setMonth(lastMonth.getMonth() - 1);

        const lastYear = new Date(today);
        lastYear.setFullYear(lastYear.getFullYear() - 1);

        return [
            {
                label: "Today",
                range: {
                    startDate: today.toISOString().split('T')[0],
                    endDate: today.toISOString().split('T')[0]
                }
            },
            {
                label: "Yesterday",
                range: {
                    startDate: yesterday.toISOString().split('T')[0],
                    endDate: yesterday.toISOString().split('T')[0]
                }
            },
            {
                label: "Last 7 days",
                range: {
                    startDate: lastWeek.toISOString().split('T')[0],
                    endDate: today.toISOString().split('T')[0]
                }
            },
            {
                label: "Last 30 days",
                range: {
                    startDate: lastMonth.toISOString().split('T')[0],
                    endDate: today.toISOString().split('T')[0]
                }
            },
            {
                label: "Last year",
                range: {
                    startDate: lastYear.toISOString().split('T')[0],
                    endDate: today.toISOString().split('T')[0]
                }
            }
        ];
    };

    return (
        <div className={`relative ${className}`}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-left flex items-center justify-between"
            >
                <span className={value.startDate ? "" : "text-muted-foreground"}>
                    {getDisplayText()}
                </span>
                <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-1 w-full min-w-[400px] bg-popover border rounded-md shadow-lg z-50">
                    <div className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Quick Ranges */}
                            <div>
                                <h3 className="text-sm font-medium mb-3">Quick Ranges</h3>
                                <div className="space-y-1">
                                    {getQuickRanges().map((quickRange, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            onClick={() => setTempRange(quickRange.range)}
                                            className="w-full text-left px-3 py-2 text-sm rounded hover:bg-accent transition-colors"
                                        >
                                            {quickRange.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Custom Range */}
                            <div>
                                <h3 className="text-sm font-medium mb-3">Custom Range</h3>
                                <div className="space-y-3">
                                    <div>
                                        <label className="block text-xs font-medium mb-1">Start Date</label>
                                        <input
                                            type="date"
                                            value={tempRange.startDate}
                                            onChange={(e) => setTempRange(prev => ({ ...prev, startDate: e.target.value }))}
                                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium mb-1">End Date</label>
                                        <input
                                            type="date"
                                            value={tempRange.endDate}
                                            onChange={(e) => setTempRange(prev => ({ ...prev, endDate: e.target.value }))}
                                            min={tempRange.startDate}
                                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="px-3 py-1 text-sm border rounded hover:bg-accent transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleApply}
                                className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}