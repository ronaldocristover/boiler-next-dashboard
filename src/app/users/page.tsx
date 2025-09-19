"use client";

import { useState } from "react";
import { useConfirmationModal } from "@/lib/confirmation-modal";

// Sample data
const sampleUsers = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active", joinDate: "2024-01-15" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", status: "Active", joinDate: "2024-01-20" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "User", status: "Inactive", joinDate: "2024-01-25" },
    { id: 4, name: "Alice Brown", email: "alice@example.com", role: "Moderator", status: "Active", joinDate: "2024-02-01" },
    { id: 5, name: "Charlie Wilson", email: "charlie@example.com", role: "User", status: "Active", joinDate: "2024-02-05" },
    { id: 6, name: "Diana Davis", email: "diana@example.com", role: "User", status: "Active", joinDate: "2024-02-10" },
    { id: 7, name: "Eve Miller", email: "eve@example.com", role: "Admin", status: "Active", joinDate: "2024-02-15" },
    { id: 8, name: "Frank Garcia", email: "frank@example.com", role: "User", status: "Inactive", joinDate: "2024-02-20" },
    { id: 9, name: "Grace Lee", email: "grace@example.com", role: "User", status: "Active", joinDate: "2024-02-25" },
    { id: 10, name: "Henry Taylor", email: "henry@example.com", role: "Moderator", status: "Active", joinDate: "2024-03-01" },
    { id: 11, name: "Ivy Chen", email: "ivy@example.com", role: "User", status: "Active", joinDate: "2024-03-05" },
    { id: 12, name: "Jack Anderson", email: "jack@example.com", role: "User", status: "Active", joinDate: "2024-03-10" },
    { id: 13, name: "Kate White", email: "kate@example.com", role: "User", status: "Inactive", joinDate: "2024-03-15" },
    { id: 14, name: "Liam Martinez", email: "liam@example.com", role: "User", status: "Active", joinDate: "2024-03-20" },
    { id: 15, name: "Maya Thompson", email: "maya@example.com", role: "Admin", status: "Active", joinDate: "2024-03-25" },
];

const ITEMS_PER_PAGE = 5;

export default function UsersPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const { showModal, ModalComponent } = useConfirmationModal();

    // Filter users based on search term
    const filteredUsers = sampleUsers.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Calculate pagination
    const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentUsers = filteredUsers.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const getStatusBadge = (status: string) => {
        const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
        if (status === "Active") {
            return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200`;
        }
        return `${baseClasses} bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200`;
    };

    const getRoleBadge = (role: string) => {
        const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
        if (role === "Admin") {
            return `${baseClasses} bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200`;
        }
        if (role === "Moderator") {
            return `${baseClasses} bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200`;
        }
        return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200`;
    };

    const handleDeleteUser = (user: { id: number; name: string; email: string; role: string; status: string; joinDate: string }) => {
        showModal({
            title: "Delete User",
            message: `Are you sure you want to delete ${user.name}? This action cannot be undone.`,
            confirmText: "Delete",
            cancelText: "Cancel",
            variant: "destructive",
            onConfirm: async () => {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000));
                console.log(`Deleting user: ${user.name}`);
                // Here you would make the actual API call to delete the user
                // and then update the UI accordingly
            }
        });
    };

    return (
        <div className="space-y-6">
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-1 text-sm text-muted-foreground">
                <a href="/" className="hover:text-foreground transition-colors">
                    Dashboard
                </a>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span className="text-foreground font-medium">Users</span>
            </nav>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">Users</h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Manage your users and their permissions
                    </p>
                </div>
                <a
                    href="/users/new"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium py-2 px-4 rounded-md transition-colors inline-block"
                >
                    Add User
                </a>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col gap-4">
                <div className="w-full">
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1); // Reset to first page when searching
                        }}
                        className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                    />
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                    <select className="flex-1 px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent">
                        <option value="">All Roles</option>
                        <option value="Admin">Admin</option>
                        <option value="Moderator">Moderator</option>
                        <option value="User">User</option>
                    </select>
                    <select className="flex-1 px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent">
                        <option value="">All Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>
            </div>

            {/* Table - Desktop View */}
            <div className="hidden md:block border border-border rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-muted/50">
                            <tr>
                                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Name</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Email</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Role</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Join Date</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {currentUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-muted/50 transition-colors">
                                    <td className="px-4 py-3">
                                        <a href={`/users/${user.id}`} className="font-medium hover:text-primary transition-colors">
                                            {user.name}
                                        </a>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-muted-foreground">
                                        {user.email}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={getRoleBadge(user.role)}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={getStatusBadge(user.status)}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-muted-foreground">
                                        {new Date(user.joinDate).toLocaleDateString()}
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex gap-2">
                                            <a href={`/users/${user.id}`} className="text-sm text-primary hover:underline">
                                                View
                                            </a>
                                            <a href={`/users/${user.id}/edit`} className="text-sm text-primary hover:underline">
                                                Edit
                                            </a>
                                            <button
                                                onClick={() => handleDeleteUser(user)}
                                                className="text-sm text-destructive hover:underline"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Card View - Mobile */}
            <div className="md:hidden space-y-4">
                {currentUsers.map((user) => (
                    <div key={user.id} className="border border-border rounded-lg p-4 bg-card">
                        <div className="flex flex-col space-y-3">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <a href={`/users/${user.id}`} className="font-medium text-lg hover:text-primary transition-colors block">
                                        {user.name}
                                    </a>
                                    <p className="text-sm text-muted-foreground mt-1">{user.email}</p>
                                </div>
                                <div className="flex flex-col gap-1 items-end">
                                    <span className={getRoleBadge(user.role)}>
                                        {user.role}
                                    </span>
                                    <span className={getStatusBadge(user.status)}>
                                        {user.status}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">
                                    Joined {new Date(user.joinDate).toLocaleDateString()}
                                </span>
                                <div className="flex gap-3">
                                    <a href={`/users/${user.id}`} className="text-sm text-primary hover:underline">
                                        View
                                    </a>
                                    <a href={`/users/${user.id}/edit`} className="text-sm text-primary hover:underline">
                                        Edit
                                    </a>
                                    <button
                                        onClick={() => handleDeleteUser(user)}
                                        className="text-sm text-destructive hover:underline"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex flex-col items-center gap-4">
                <div className="text-sm text-muted-foreground">
                    Showing {startIndex + 1} to {Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length} users
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-2 text-sm border border-input rounded-md hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Previous
                    </button>

                    {/* Mobile pagination - show fewer pages */}
                    <div className="flex gap-1">
                        {totalPages <= 5 ? (
                            // Show all pages if 5 or fewer
                            Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className={`px-3 py-2 text-sm border rounded-md transition-colors ${page === currentPage
                                            ? "bg-primary text-primary-foreground border-primary"
                                            : "border-input hover:bg-accent"
                                        }`}
                                >
                                    {page}
                                </button>
                            ))
                        ) : (
                            // Show simplified pagination for many pages
                            <>
                                {currentPage > 2 && (
                                    <>
                                        <button
                                            onClick={() => handlePageChange(1)}
                                            className="px-3 py-2 text-sm border border-input rounded-md hover:bg-accent transition-colors"
                                        >
                                            1
                                        </button>
                                        {currentPage > 3 && <span className="px-2 text-sm text-muted-foreground">...</span>}
                                    </>
                                )}

                                {[currentPage - 1, currentPage, currentPage + 1]
                                    .filter(page => page >= 1 && page <= totalPages)
                                    .map((page) => (
                                        <button
                                            key={page}
                                            onClick={() => handlePageChange(page)}
                                            className={`px-3 py-2 text-sm border rounded-md transition-colors ${page === currentPage
                                                    ? "bg-primary text-primary-foreground border-primary"
                                                    : "border-input hover:bg-accent"
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    ))}

                                {currentPage < totalPages - 1 && (
                                    <>
                                        {currentPage < totalPages - 2 && <span className="px-2 text-sm text-muted-foreground">...</span>}
                                        <button
                                            onClick={() => handlePageChange(totalPages)}
                                            className="px-3 py-2 text-sm border border-input rounded-md hover:bg-accent transition-colors"
                                        >
                                            {totalPages}
                                        </button>
                                    </>
                                )}
                            </>
                        )}
                    </div>

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-2 text-sm border border-input rounded-md hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Next
                    </button>
                </div>
            </div>
            <ModalComponent />
        </div>
    );
}
