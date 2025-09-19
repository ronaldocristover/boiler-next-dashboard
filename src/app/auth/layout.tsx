import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Authentication | Create Next App",
};

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen font-sans bg-background text-foreground flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="mx-auto w-12 h-12 rounded-lg bg-primary flex items-center justify-center mb-4">
                        <span className="text-primary-foreground font-bold text-xl">D</span>
                    </div>
                    <h1 className="text-2xl font-semibold">Welcome to DueDash</h1>
                    <p className="text-muted-foreground mt-2">Sign in to your account or create a new one</p>
                </div>
                {children}
            </div>
        </div>
    );
}
