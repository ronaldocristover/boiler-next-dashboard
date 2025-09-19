import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sample Forms | Create Next App",
};

export default function SampleFormsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}