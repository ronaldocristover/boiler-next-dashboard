"use client";

import { useState } from "react";
import { useConfirmationModal } from "@/lib/confirmation-modal";

// Sample data - in a real app, this would come from an API
const sampleUsers = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active", joinDate: "2024-01-15", phone: "+1 (555) 123-4567", department: "Engineering", location: "San Francisco, CA", bio: "Senior software engineer with 8+ years of experience in full-stack development." },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", status: "Active", joinDate: "2024-01-20", phone: "+1 (555) 234-5678", department: "Marketing", location: "New York, NY", bio: "Digital marketing specialist focused on growth and user acquisition." },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "User", status: "Inactive", joinDate: "2024-01-25", phone: "+1 (555) 345-6789", department: "Sales", location: "Chicago, IL", bio: "Sales representative with expertise in B2B software solutions." },
    { id: 4, name: "Alice Brown", email: "alice@example.com", role: "Moderator", status: "Active", joinDate: "2024-02-01", phone: "+1 (555) 456-7890", department: "Support", location: "Austin, TX", bio: "Customer support lead ensuring excellent user experience." },
    { id: 5, name: "Charlie Wilson", email: "charlie@example.com", role: "User", status: "Active", joinDate: "2024-02-05", phone: "+1 (555) 567-8901", department: "Design", location: "Los Angeles, CA", bio: "UX/UI designer passionate about creating intuitive user interfaces." },
];

interface UserDetailPageProps {
    params: {
        id: string;
    };
}

export default function UserDetailPage({ params }: UserDetailPageProps) {
    const userId = parseInt(params.id);
    const user = sampleUsers.find(u => u.id === userId);

    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState(user || {});
    const { showModal, ModalComponent } = useConfirmationModal();

    if (!user) {
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
                    <a href="/users" className="hover:text-foreground transition-colors">
                        Users
                    </a>
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span className="text-foreground font-medium">User Not Found</span>
                </nav>

                <div className="rounded-lg border bg-card text-card-foreground p-8 text-center">
                    <div className="mx-auto w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
                        <svg className="h-6 w-6 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.232 14.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-semibold mb-2">User Not Found</h2>
                    <p className="text-muted-foreground mb-4">The user with ID {params.id} could not be found.</p>
                    <a
                        href="/users"
                        className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 font-medium py-2 px-4 rounded-md transition-colors"
                    >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Users
                    </a>
                </div>
            </div>
        );
    }

    const getStatusBadge = (status: string) => {
        const baseClasses = "px-3 py-1 rounded-full text-sm font-medium";
        if (status === "Active") {
            return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200`;
        }
        return `${baseClasses} bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200`;
    };

    const getRoleBadge = (role: string) => {
        const baseClasses = "px-3 py-1 rounded-full text-sm font-medium";
        if (role === "Admin") {
            return `${baseClasses} bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200`;
        }
        if (role === "Moderator") {
            return `${baseClasses} bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200`;
        }
        return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200`;
    };

    const handleSave = () => {
        showModal({
            title: "Update User",
            message: `Are you sure you want to save changes for ${user.name}?`,
            confirmText: "Save Changes",
            cancelText: "Cancel",
            variant: "default",
            onConfirm: async () => {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000));
                console.log("Saving user data:", editData);
                setIsEditing(false);
                // In a real app, this would make an API call to update the user
                // You would typically update the user data in your state management or refetch from API
            }
        });
    };

    const handleCancel = () => {
        setEditData(user);
        setIsEditing(false);
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
                <a href="/users" className="hover:text-foreground transition-colors">
                    Users
                </a>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span className="text-foreground font-medium">{user.name}</span>
            </nav>

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-2xl font-semibold text-primary">
                            {user.name.split(' ').map(n => n[0]).join('')}
                        </span>
                    </div>
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">{user.name}</h1>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    {!isEditing ? (
                        <>
                            <a
                                href={`/users/${userId}/edit`}
                                className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium py-2 px-4 rounded-md transition-colors inline-block"
                            >
                                Edit User
                            </a>
                            <button className="border border-input hover:bg-accent font-medium py-2 px-4 rounded-md transition-colors">
                                Deactivate
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={handleSave}
                                className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium py-2 px-4 rounded-md transition-colors"
                            >
                                Save Changes
                            </button>
                            <button
                                onClick={handleCancel}
                                className="border border-input hover:bg-accent font-medium py-2 px-4 rounded-md transition-colors"
                            >
                                Cancel
                            </button>
                        </>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Info */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Basic Information */}
                    <div className="rounded-lg border bg-card text-card-foreground p-6">
                        <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
                        {!isEditing ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                                    <p className="mt-1">{user.name}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Email</label>
                                    <p className="mt-1">{user.email}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Phone</label>
                                    <p className="mt-1">{user.phone}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Department</label>
                                    <p className="mt-1">{user.department}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Location</label>
                                    <p className="mt-1">{user.location}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Join Date</label>
                                    <p className="mt-1">{new Date(user.joinDate).toLocaleDateString()}</p>
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        value={editData.name || ''}
                                        onChange={(e) => setEditData({...editData, name: e.target.value})}
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Email</label>
                                    <input
                                        type="email"
                                        value={editData.email || ''}
                                        onChange={(e) => setEditData({...editData, email: e.target.value})}
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Phone</label>
                                    <input
                                        type="tel"
                                        value={editData.phone || ''}
                                        onChange={(e) => setEditData({...editData, phone: e.target.value})}
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Department</label>
                                    <select
                                        value={editData.department || ''}
                                        onChange={(e) => setEditData({...editData, department: e.target.value})}
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background"
                                    >
                                        <option value="Engineering">Engineering</option>
                                        <option value="Marketing">Marketing</option>
                                        <option value="Sales">Sales</option>
                                        <option value="Support">Support</option>
                                        <option value="Design">Design</option>
                                        <option value="Operations">Operations</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Location</label>
                                    <input
                                        type="text"
                                        value={editData.location || ''}
                                        onChange={(e) => setEditData({...editData, location: e.target.value})}
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Bio Section */}
                    <div className="rounded-lg border bg-card text-card-foreground p-6">
                        <h2 className="text-lg font-semibold mb-4">Bio</h2>
                        {!isEditing ? (
                            <p className="text-muted-foreground">{user.bio}</p>
                        ) : (
                            <textarea
                                value={editData.bio || ''}
                                onChange={(e) => setEditData({...editData, bio: e.target.value})}
                                rows={4}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background"
                                placeholder="Enter user bio..."
                            />
                        )}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Status & Role */}
                    <div className="rounded-lg border bg-card text-card-foreground p-6">
                        <h2 className="text-lg font-semibold mb-4">Status & Role</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Status</label>
                                <div className="mt-1">
                                    {!isEditing ? (
                                        <span className={getStatusBadge(user.status)}>
                                            {user.status}
                                        </span>
                                    ) : (
                                        <select
                                            value={editData.status || ''}
                                            onChange={(e) => setEditData({...editData, status: e.target.value})}
                                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background"
                                        >
                                            <option value="Active">Active</option>
                                            <option value="Inactive">Inactive</option>
                                        </select>
                                    )}
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Role</label>
                                <div className="mt-1">
                                    {!isEditing ? (
                                        <span className={getRoleBadge(user.role)}>
                                            {user.role}
                                        </span>
                                    ) : (
                                        <select
                                            value={editData.role || ''}
                                            onChange={(e) => setEditData({...editData, role: e.target.value})}
                                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background"
                                        >
                                            <option value="User">User</option>
                                            <option value="Moderator">Moderator</option>
                                            <option value="Admin">Admin</option>
                                        </select>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="rounded-lg border bg-card text-card-foreground p-6">
                        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
                        <div className="space-y-2">
                            <button className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors">
                                Reset Password
                            </button>
                            <button className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors">
                                Send Email
                            </button>
                            <button className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors">
                                View Activity Log
                            </button>
                            <button className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors text-destructive">
                                Delete User
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <ModalComponent />
        </div>
    );
}