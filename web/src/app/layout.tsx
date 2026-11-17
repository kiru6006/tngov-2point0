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
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#004B87] focus:text-white focus:rounded focus:outline-none"
        >
          Skip to main content / முதன்மைப் பகுதிக்குச் செல்க
        </a>
        <main id="main-content" role="main" className="flex-1 flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
