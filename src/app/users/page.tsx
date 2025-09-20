"use client";

import { useState } from "react";
import Link from "next/link";
import { useConfirmationModal } from "@/lib/confirmation-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

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

export default function UsersPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const { showModal, ModalComponent } = useConfirmationModal();

    // Filter users based on search term
    const filteredUsers = sampleUsers.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Calculate pagination
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentUsers = filteredUsers.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleItemsPerPageChange = (value: string) => {
        setItemsPerPage(value === "all" ? filteredUsers.length : parseInt(value));
        setCurrentPage(1); // Reset to first page when changing items per page
    };

    const getStatusBadge = (status: string) => {
        if (status === "Active") {
            return (
                <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    {status}
                </Badge>
            );
        }
        return (
            <Badge variant="destructive" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                {status}
            </Badge>
        );
    };

    const getRoleBadge = (role: string) => {
        if (role === "Admin") {
            return (
                <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                    {role}
                </Badge>
            );
        }
        if (role === "Moderator") {
            return (
                <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {role}
                </Badge>
            );
        }
        return (
            <Badge variant="secondary">
                {role}
            </Badge>
        );
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
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/">Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Users</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">Users</h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Manage your users and their permissions
                    </p>
                </div>
                <Button asChild>
                    <Link href="/users/new">
                        Add User
                    </Link>
                </Button>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col gap-4">
                <div className="w-full">
                    <Input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1); // Reset to first page when searching
                        }}
                    />
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                    <Select defaultValue="all-roles">
                        <SelectTrigger className="flex-1">
                            <SelectValue placeholder="All Roles" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all-roles">All Roles</SelectItem>
                            <SelectItem value="Admin">Admin</SelectItem>
                            <SelectItem value="Moderator">Moderator</SelectItem>
                            <SelectItem value="User">User</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select defaultValue="all-status">
                        <SelectTrigger className="flex-1">
                            <SelectValue placeholder="All Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all-status">All Status</SelectItem>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Inactive">Inactive</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Table - Desktop View */}
            <div className="hidden md:block">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Join Date</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentUsers.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>
                                    <Button asChild variant="link" className="p-0 h-auto font-medium">
                                        <Link href={`/users/${user.id}`}>
                                            {user.name}
                                        </Link>
                                    </Button>
                                </TableCell>
                                <TableCell className="text-muted-foreground">
                                    {user.email}
                                </TableCell>
                                <TableCell>
                                    {getRoleBadge(user.role)}
                                </TableCell>
                                <TableCell>
                                    {getStatusBadge(user.status)}
                                </TableCell>
                                <TableCell className="text-muted-foreground">
                                    {new Date(user.joinDate).toLocaleDateString()}
                                </TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        <Button asChild variant="link" size="sm" className="p-0 h-auto">
                                            <Link href={`/users/${user.id}`}>View</Link>
                                        </Button>
                                        <Button asChild variant="link" size="sm" className="p-0 h-auto">
                                            <Link href={`/users/${user.id}/edit`}>Edit</Link>
                                        </Button>
                                        <Button
                                            variant="link"
                                            size="sm"
                                            className="p-0 h-auto text-destructive"
                                            onClick={() => handleDeleteUser(user)}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Card View - Mobile */}
            <div className="md:hidden space-y-4">
                {currentUsers.map((user) => (
                    <Card key={user.id}>
                        <CardContent className="p-4">
                            <div className="flex flex-col space-y-3">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <Button asChild variant="link" className="p-0 h-auto font-medium text-lg">
                                            <Link href={`/users/${user.id}`}>
                                                {user.name}
                                            </Link>
                                        </Button>
                                        <p className="text-sm text-muted-foreground mt-1">{user.email}</p>
                                    </div>
                                    <div className="flex flex-col gap-1 items-end">
                                        {getRoleBadge(user.role)}
                                        {getStatusBadge(user.status)}
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">
                                        Joined {new Date(user.joinDate).toLocaleDateString()}
                                    </span>
                                    <div className="flex gap-3">
                                        <Button asChild variant="link" size="sm" className="p-0 h-auto">
                                            <Link href={`/users/${user.id}`}>View</Link>
                                        </Button>
                                        <Button asChild variant="link" size="sm" className="p-0 h-auto">
                                            <Link href={`/users/${user.id}/edit`}>Edit</Link>
                                        </Button>
                                        <Button
                                            variant="link"
                                            size="sm"
                                            className="p-0 h-auto text-destructive"
                                            onClick={() => handleDeleteUser(user)}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Show:</span>
                    <Select value={itemsPerPage.toString()} onValueChange={handleItemsPerPageChange}>
                        <SelectTrigger className="w-20">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="25">25</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                            <SelectItem value="100">100</SelectItem>
                            <SelectItem value="all">All</SelectItem>
                        </SelectContent>
                    </Select>
                    <span className="text-sm text-muted-foreground">entries</span>
                </div>

                <div className="flex flex-col lg:items-end gap-4">
                    <div className="text-sm text-muted-foreground">
                        Showing {startIndex + 1} to {Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length} users
                    </div>

                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (currentPage > 1) handlePageChange(currentPage - 1);
                                    }}
                                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                                />
                            </PaginationItem>

                            {totalPages <= 5 ? (
                                // Show all pages if 5 or fewer
                                Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <PaginationItem key={page}>
                                        <PaginationLink
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handlePageChange(page);
                                            }}
                                            isActive={page === currentPage}
                                        >
                                            {page}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))
                            ) : (
                                // Show simplified pagination for many pages
                                <>
                                    {currentPage > 2 && (
                                        <>
                                            <PaginationItem>
                                                <PaginationLink
                                                    href="#"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handlePageChange(1);
                                                    }}
                                                >
                                                    1
                                                </PaginationLink>
                                            </PaginationItem>
                                            {currentPage > 3 && (
                                                <PaginationItem>
                                                    <PaginationEllipsis />
                                                </PaginationItem>
                                            )}
                                        </>
                                    )}

                                    {[currentPage - 1, currentPage, currentPage + 1]
                                        .filter(page => page >= 1 && page <= totalPages)
                                        .map((page) => (
                                            <PaginationItem key={page}>
                                                <PaginationLink
                                                    href="#"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handlePageChange(page);
                                                    }}
                                                    isActive={page === currentPage}
                                                >
                                                    {page}
                                                </PaginationLink>
                                            </PaginationItem>
                                        ))}

                                    {currentPage < totalPages - 1 && (
                                        <>
                                            {currentPage < totalPages - 2 && (
                                                <PaginationItem>
                                                    <PaginationEllipsis />
                                                </PaginationItem>
                                            )}
                                            <PaginationItem>
                                                <PaginationLink
                                                    href="#"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handlePageChange(totalPages);
                                                    }}
                                                >
                                                    {totalPages}
                                                </PaginationLink>
                                            </PaginationItem>
                                        </>
                                    )}
                                </>
                            )}

                            <PaginationItem>
                                <PaginationNext
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (currentPage < totalPages) handlePageChange(currentPage + 1);
                                    }}
                                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
            <ModalComponent />
        </div>
    );
}
