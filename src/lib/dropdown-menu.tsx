"use client";

import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface DropdownItem {
    label: string;
    href?: string;
    icon?: React.ReactNode;
    children?: DropdownItem[];
}

interface DropdownMenuProps {
    item: DropdownItem;
    className?: string;
}

export function DropdownMenu({ item, className = "" }: DropdownMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const hasChildren = item.children && item.children.length > 0;

    if (!hasChildren && item.href) {
        return (
            <Button asChild variant="ghost" className={`w-full justify-start gap-2 ${className}`}>
                <Link href={item.href}>
                    {item.icon}
                    <span>{item.label}</span>
                </Link>
            </Button>
        );
    }

    return (
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className={className}>
            <CollapsibleTrigger asChild>
                <Button
                    variant="ghost"
                    className="flex items-center justify-between w-full gap-2"
                >
                    <div className="flex items-center gap-2">
                        {item.icon}
                        <span>{item.label}</span>
                    </div>
                    {hasChildren && (
                        <ChevronDown
                            className={`h-4 w-4 transition-transform duration-200 ${
                                isOpen ? "rotate-180" : ""
                            }`}
                        />
                    )}
                </Button>
            </CollapsibleTrigger>

            {hasChildren && (
                <CollapsibleContent className="overflow-hidden">
                    <div className="ml-4 mt-1 space-y-1">
                        {item.children?.map((child, index) => (
                            <DropdownMenu
                                key={index}
                                item={child}
                                className="text-sm"
                            />
                        ))}
                    </div>
                </CollapsibleContent>
            )}
        </Collapsible>
    );
}

interface SidebarNavigationProps {
    items: DropdownItem[];
}

export function SidebarNavigation({ items }: SidebarNavigationProps) {
    return (
        <nav className="p-2 text-sm space-y-1">
            {items.map((item, index) => (
                <DropdownMenu key={index} item={item} />
            ))}
        </nav>
    );
}