"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";

export default function LoginPage() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false,
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        console.log("Login attempt:", formData);
        setIsLoading(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleRememberMeChange = (checked: boolean) => {
        setFormData(prev => ({
            ...prev,
            rememberMe: checked
        }));
    };

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-2xl font-semibold">Sign In</h2>
                <p className="text-muted-foreground mt-2">Enter your credentials to access your account</p>
            </div>

            <Card>
                <CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
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
                                placeholder="Enter your password"
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="rememberMe"
                                    checked={formData.rememberMe}
                                    onCheckedChange={handleRememberMeChange}
                                />
                                <Label
                                    htmlFor="rememberMe"
                                    className="text-sm font-normal text-muted-foreground cursor-pointer"
                                >
                                    Remember me
                                </Label>
                            </div>
                            <Button asChild variant="link" className="px-0 text-sm">
                                <Link href="/auth/forgot-password">
                                    Forgot password?
                                </Link>
                            </Button>
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full"
                        >
                            {isLoading ? "Signing in..." : "Sign In"}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            <div className="text-center">
                <p className="text-sm text-muted-foreground">
                    Don&apos;t have an account?{" "}
                    <Button asChild variant="link" className="px-0 text-sm font-medium">
                        <Link href="/auth/register">
                            Sign up
                        </Link>
                    </Button>
                </p>
            </div>
        </div>
    );
}
