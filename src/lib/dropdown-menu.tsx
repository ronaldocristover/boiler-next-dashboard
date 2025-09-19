"use client";

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

    const toggleOpen = () => setIsOpen(!isOpen);

    const hasChildren = item.children && item.children.length > 0;

    if (!hasChildren && item.href) {
        return (
            <a
                href={item.href}
                className={`flex items-center gap-2 px-3 py-2 rounded hover:bg-sidebar-accent transition-colors ${className}`}
            >
                {item.icon}
                <span>{item.label}</span>
            </a>
        );
    }

    return (
        <div className={className}>
            <button
                onClick={toggleOpen}
                className="flex items-center justify-between w-full px-3 py-2 rounded hover:bg-sidebar-accent transition-colors"
            >
                <div className="flex items-center gap-2">
                    {item.icon}
                    <span>{item.label}</span>
                </div>
                {hasChildren && (
                    <svg
                        className={`h-4 w-4 transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                )}
            </button>

            {hasChildren && (
                <div
                    className={`overflow-hidden transition-all duration-200 ease-in-out ${
                        isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                >
                    <div className="ml-4 mt-1 space-y-1">
                        {item.children?.map((child, index) => (
                            <DropdownMenu
                                key={index}
                                item={child}
                                className="text-sm"
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
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