"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Sample data - in a real app, this would come from an API
const sampleUsers = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active", joinDate: "2024-01-15", phone: "+1 (555) 123-4567", department: "Engineering", location: "San Francisco, CA", bio: "Senior software engineer with 8+ years of experience in full-stack development." },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", status: "Active", joinDate: "2024-01-20", phone: "+1 (555) 234-5678", department: "Marketing", location: "New York, NY", bio: "Digital marketing specialist focused on growth and user acquisition." },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "User", status: "Inactive", joinDate: "2024-01-25", phone: "+1 (555) 345-6789", department: "Sales", location: "Chicago, IL", bio: "Sales representative with expertise in B2B software solutions." },
    { id: 4, name: "Alice Brown", email: "alice@example.com", role: "Moderator", status: "Active", joinDate: "2024-02-01", phone: "+1 (555) 456-7890", department: "Support", location: "Austin, TX", bio: "Customer support lead ensuring excellent user experience." },
    { id: 5, name: "Charlie Wilson", email: "charlie@example.com", role: "User", status: "Active", joinDate: "2024-02-05", phone: "+1 (555) 567-8901", department: "Design", location: "Los Angeles, CA", bio: "UX/UI designer passionate about creating intuitive user interfaces." },
];

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

interface EditUserPageProps {
    params: {
        id: string;
    };
}

export default function EditUserPage({ params }: EditUserPageProps) {
    const router = useRouter();
    const userId = parseInt(params.id);
    const user = sampleUsers.find(u => u.id === userId);

    const [formData, setFormData] = useState<UserFormData>({
        name: "",
        email: "",
        phone: "",
        department: "",
        location: "",
        role: "",
        status: "",
        bio: ""
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name,
                email: user.email,
                phone: user.phone,
                department: user.department,
                location: user.location,
                role: user.role,
                status: user.status,
                bio: user.bio
            });
        }
    }, [user]);

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

        setIsSubmitting(true);

        try {
            // In a real app, this would make an API call to update the user
            console.log("Updating user:", { id: userId, ...formData });

            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Redirect to user detail page after successful update
            router.push(`/users/${userId}`);
        } catch (error) {
            console.error("Error updating user:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        router.push(`/users/${userId}`);
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
                <a href={`/users/${userId}`} className="hover:text-foreground transition-colors">
                    {user.name}
                </a>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span className="text-foreground font-medium">Edit</span>
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
                        <h1 className="text-2xl font-semibold tracking-tight">Edit {user.name}</h1>
                        <p className="text-sm text-muted-foreground">
                            Update user information and permissions
                        </p>
                    </div>
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
                                placeholder="Enter a brief bio for the user"
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

                        {/* User Info */}
                        <div className="rounded-lg border bg-card text-card-foreground p-6">
                            <h2 className="text-lg font-semibold mb-4">User Information</h2>
                            <div className="space-y-3 text-sm">
                                <div>
                                    <span className="text-muted-foreground">User ID:</span>
                                    <span className="ml-2 font-medium">#{userId}</span>
                                </div>
                                <div>
                                    <span className="text-muted-foreground">Join Date:</span>
                                    <span className="ml-2 font-medium">
                                        {new Date(user.joinDate).toLocaleDateString()}
                                    </span>
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
                                    {isSubmitting ? "Saving Changes..." : "Save Changes"}
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
        </div>
    );
}