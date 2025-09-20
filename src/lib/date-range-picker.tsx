"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

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

    const formatDisplayDate = (dateString: string) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return format(date, "MMM dd, yyyy");
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
            return `${formatDisplayDate(value.startDate)} - ${formatDisplayDate(value.endDate)}`;
        } else if (value.startDate) {
            return `${formatDisplayDate(value.startDate)} - Select end date`;
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
        <div className={className}>
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className={cn(
                            "w-full justify-start text-left font-normal",
                            !value.startDate && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {getDisplayText()}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <div className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Quick Ranges */}
                            <div>
                                <h3 className="text-sm font-medium mb-3">Quick Ranges</h3>
                                <div className="space-y-1">
                                    {getQuickRanges().map((quickRange, index) => (
                                        <Button
                                            key={index}
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setTempRange(quickRange.range)}
                                            className="w-full justify-start text-sm"
                                        >
                                            {quickRange.label}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            {/* Custom Range */}
                            <div>
                                <h3 className="text-sm font-medium mb-3">Custom Range</h3>
                                <div className="space-y-3">
                                    <div className="space-y-2">
                                        <Label htmlFor="startDate" className="text-xs">Start Date</Label>
                                        <Input
                                            id="startDate"
                                            type="date"
                                            value={tempRange.startDate}
                                            onChange={(e) => setTempRange(prev => ({ ...prev, startDate: e.target.value }))}
                                            className="text-sm"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="endDate" className="text-xs">End Date</Label>
                                        <Input
                                            id="endDate"
                                            type="date"
                                            value={tempRange.endDate}
                                            onChange={(e) => setTempRange(prev => ({ ...prev, endDate: e.target.value }))}
                                            min={tempRange.startDate}
                                            className="text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleCancel}
                            >
                                Cancel
                            </Button>
                            <Button
                                size="sm"
                                onClick={handleApply}
                            >
                                Apply
                            </Button>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}