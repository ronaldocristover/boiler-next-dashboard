import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Admin | Create Next App",
};

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}


