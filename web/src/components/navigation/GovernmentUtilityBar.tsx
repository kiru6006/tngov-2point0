"use client";

import Link from "next/link";
import { Sun, Globe, HelpCircle, FileText } from "lucide-react";

interface UtilityBarProps {
  lang: "ta" | "en";
  setLang: (lang: "ta" | "en") => void;
  highContrast: boolean;
  setHighContrast: (val: boolean) => void;
}

export default function GovernmentUtilityBar({
  lang,
  setLang,
  highContrast,
  setHighContrast,
}: UtilityBarProps) {
  return (
    <nav
      aria-label="Government Utility Navigation"
      className="w-full border-b border-slate-700 bg-slate-900 text-slate-200 text-xs px-4 py-1.5 flex flex-wrap justify-between items-center gap-2 z-40"
    >
      <div className="flex items-center gap-3">
        <span className="font-medium">
          {lang === "ta" ? "தமிழ்நாடு அரசு அதிகாரப்பூர்வ தளம்" : "Official Portal of Government of Tamil Nadu"}
        </span>
        <span className="hidden md:inline text-slate-500">|</span>
        <a
          href="#main-content"
          className="hover:text-white underline underline-offset-2 hidden sm:inline focus:outline-none focus:ring-2 focus:ring-amber-400"
        >
          {lang === "ta" ? "முதன்மை பகுதிக்கு செல்க" : "Skip to main content"}
        </a>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {/* Contrast Switch */}
        <button
          onClick={() => setHighContrast(!highContrast)}
          className="flex items-center gap-1 hover:text-white px-2 py-0.5 rounded border border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-400"
          aria-label="Toggle High Contrast Mode"
        >
          <Sun className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{highContrast ? "Normal" : "High Contrast"}</span>
        </button>

        {/* Language Switch */}
        <button
          onClick={() => setLang(lang === "ta" ? "en" : "ta")}
          className="flex items-center gap-1 font-semibold text-amber-400 hover:text-amber-300 px-2 py-0.5 rounded border border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-400"
          aria-label="Switch Language"
        >
          <Globe className="w-3.5 h-3.5" />
          <span>{lang === "ta" ? "English" : "தமிழ்"}</span>
        </button>

        {/* e-Sevai Kiosk Assisted Mode */}
        <Link
          href="/assisted"
          className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 px-2 py-0.5 rounded border border-emerald-800/80 focus:outline-none focus:ring-2 focus:ring-amber-400"
          aria-label="Assisted Access Kiosk Mode"
        >
          <span>{lang === "ta" ? "இ-சேவை உதவியாளர்" : "e-Sevai Kiosk"}</span>
        </Link>

        {/* Footer Sitemap Shortcut */}
        <a
          href="#sitemap"
          className="hidden md:flex items-center gap-1 hover:text-white px-2 py-0.5 text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
        >
          <FileText className="w-3 h-3" />
          <span>{lang === "ta" ? "தள வரைபடம்" : "Sitemap"}</span>
        </a>
      </div>
    </nav>
  );
}
