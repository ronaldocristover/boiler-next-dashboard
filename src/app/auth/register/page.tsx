"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        acceptTerms: false,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrors({});

        // Basic validation
        const newErrors: Record<string, string> = {};

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        if (!formData.acceptTerms) {
            newErrors.acceptTerms = "You must accept the terms and conditions";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setIsLoading(false);
            return;
        }

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        console.log("Registration attempt:", formData);
        setIsLoading(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));

        // Clear error when user starts typing
        if (errors[e.target.name]) {
            setErrors(prev => ({
                ...prev,
                [e.target.name]: ""
            }));
        }
    };

    const handleAcceptTermsChange = (checked: boolean) => {
        setFormData(prev => ({
            ...prev,
            acceptTerms: checked
        }));

        if (errors.acceptTerms) {
            setErrors(prev => ({
                ...prev,
                acceptTerms: ""
            }));
        }
    };

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-2xl font-semibold">Create Account</h2>
                <p className="text-muted-foreground mt-2">Sign up to get started with your account</p>
            </div>

            <Card>
                <CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Create a password"
                                className={cn(errors.password && "border-destructive")}
                            />
                            {errors.password && (
                                <p className="text-sm text-destructive">{errors.password}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                required
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm your password"
                                className={cn(errors.confirmPassword && "border-destructive")}
                            />
                            {errors.confirmPassword && (
                                <p className="text-sm text-destructive">{errors.confirmPassword}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-start space-x-2">
                                <Checkbox
                                    id="terms"
                                    checked={formData.acceptTerms}
                                    onCheckedChange={handleAcceptTermsChange}
                                    className="mt-0.5"
                                />
                                <Label htmlFor="terms" className="text-sm font-normal text-muted-foreground cursor-pointer leading-5">
                                    I agree to the{" "}
                                    <Button asChild variant="link" className="px-0 h-auto text-sm underline">
                                        <Link href="/terms">Terms of Service</Link>
                                    </Button>{" "}
                                    and{" "}
                                    <Button asChild variant="link" className="px-0 h-auto text-sm underline">
                                        <Link href="/privacy">Privacy Policy</Link>
                                    </Button>
                                </Label>
                            </div>
                            {errors.acceptTerms && (
                                <p className="text-sm text-destructive">{errors.acceptTerms}</p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full"
                        >
                            {isLoading ? "Creating account..." : "Create Account"}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            <div className="text-center">
                <p className="text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Button asChild variant="link" className="px-0 text-sm font-medium">
                        <Link href="/auth/login">
                            Sign in
                        </Link>
                    </Button>
                </p>
            </div>
        </div>
    );
}
