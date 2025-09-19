"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useConfirmationModal } from "@/lib/confirmation-modal";

interface UserFormData {
    name: string;
    email: string;
    phone: string;
    department: string;
    location: string;
    role: string;
    status: string;
    bio: string;
}

export default function NewUserPage() {
    const router = useRouter();
    const [formData, setFormData] = useState<UserFormData>({
        name: "",
        email: "",
        phone: "",
        department: "Engineering",
        location: "",
        role: "User",
        status: "Active",
        bio: ""
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { showModal, ModalComponent } = useConfirmationModal();

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (!formData.location.trim()) {
            newErrors.location = "Location is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        showModal({
            title: "Create New User",
            message: `Are you sure you want to create a new user account for ${formData.name}? This will send them an invitation email to set up their account.`,
            confirmText: "Create User",
            cancelText: "Cancel",
            variant: "default",
            onConfirm: async () => {
                setIsSubmitting(true);

                try {
                    // In a real app, this would make an API call
                    console.log("Creating new user:", formData);

                    // Simulate API delay
                    await new Promise(resolve => setTimeout(resolve, 1000));

                    // Redirect to users list after successful creation
                    router.push("/users");
                } catch (error) {
                    console.error("Error creating user:", error);
                } finally {
                    setIsSubmitting(false);
                }
            }
        });
    };

    const handleCancel = () => {
        router.push("/users");
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
                <span className="text-foreground font-medium">Add New User</span>
            </nav>

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">Add New User</h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Create a new user account with the required information
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Form */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Basic Information */}
                        <div className="rounded-lg border bg-card text-card-foreground p-6">
                            <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Full Name <span className="text-destructive">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background ${
                                            errors.name ? 'border-destructive' : 'border-input'
                                        }`}
                                        placeholder="Enter full name"
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-destructive mt-1">{errors.name}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Email <span className="text-destructive">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background ${
                                            errors.email ? 'border-destructive' : 'border-input'
                                        }`}
                                        placeholder="Enter email address"
                                    />
                                    {errors.email && (
                                        <p className="text-sm text-destructive mt-1">{errors.email}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Phone</label>
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                        className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background"
                                        placeholder="Enter phone number"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Department <span className="text-destructive">*</span>
                                    </label>
                                    <select
                                        value={formData.department}
                                        onChange={(e) => setFormData({...formData, department: e.target.value})}
                                        className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background"
                                    >
                                        <option value="Engineering">Engineering</option>
                                        <option value="Marketing">Marketing</option>
                                        <option value="Sales">Sales</option>
                                        <option value="Support">Support</option>
                                        <option value="Design">Design</option>
                                        <option value="Operations">Operations</option>
                                        <option value="HR">HR</option>
                                        <option value="Finance">Finance</option>
                                    </select>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium mb-2">
                                        Location <span className="text-destructive">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.location}
                                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background ${
                                            errors.location ? 'border-destructive' : 'border-input'
                                        }`}
                                        placeholder="Enter location (e.g., San Francisco, CA)"
                                    />
                                    {errors.location && (
                                        <p className="text-sm text-destructive mt-1">{errors.location}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Bio Section */}
                        <div className="rounded-lg border bg-card text-card-foreground p-6">
                            <h2 className="text-lg font-semibold mb-4">Bio</h2>
                            <textarea
                                value={formData.bio}
                                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                                rows={4}
                                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background"
                                placeholder="Enter a brief bio for the user (optional)"
                            />
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Status & Role */}
                        <div className="rounded-lg border bg-card text-card-foreground p-6">
                            <h2 className="text-lg font-semibold mb-4">Status & Role</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Status</label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) => setFormData({...formData, status: e.target.value})}
                                        className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background"
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Role</label>
                                    <select
                                        value={formData.role}
                                        onChange={(e) => setFormData({...formData, role: e.target.value})}
                                        className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background"
                                    >
                                        <option value="User">User</option>
                                        <option value="Moderator">Moderator</option>
                                        <option value="Admin">Admin</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="rounded-lg border bg-card text-card-foreground p-6">
                            <div className="space-y-3">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed font-medium py-2 px-4 rounded-md transition-colors"
                                >
                                    {isSubmitting ? "Creating User..." : "Create User"}
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    disabled={isSubmitting}
                                    className="w-full border border-input hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed font-medium py-2 px-4 rounded-md transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <ModalComponent />
        </div>
    );
}