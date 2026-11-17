import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tamil Nadu Government Digital Portal 2.0 | தமிழ்நாடு அரசு",
  description: "Official Digital Gateway of Government of Tamil Nadu - Services, Information, and Contact Directory",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ta" className="h-full">
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
