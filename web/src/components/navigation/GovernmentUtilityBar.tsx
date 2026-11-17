"use client";

import Link from "next/link";
import { Sun, Globe, HelpCircle, FileText, ZoomIn, ZoomOut } from "lucide-react";

interface UtilityBarProps {
  lang: "ta" | "en";
  setLang: (lang: "ta" | "en") => void;
  highContrast: boolean;
  setHighContrast: (val: boolean) => void;
  fontSize?: "sm" | "base" | "lg";
  setFontSize?: (size: "sm" | "base" | "lg") => void;
}

export default function GovernmentUtilityBar({
  lang,
  setLang,
  highContrast,
  setHighContrast,
  fontSize = "base",
  setFontSize,
}: UtilityBarProps) {
  return (
    <nav
      aria-label="Government Utility Navigation"
      className="w-full border-b border-slate-700 bg-slate-900 text-slate-200 text-xs px-4 py-1.5 flex flex-wrap justify-between items-center gap-2 z-40"
    >
      <div className="flex items-center gap-3">
        <span className="font-semibold text-slate-100 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" aria-hidden="true"></span>
          {lang === "ta" ? "தமிழ்நாடு அரசு | Government of Tamil Nadu" : "Government of Tamil Nadu | தமிழ்நாடு அரசு"}
        </span>
        <span className="hidden md:inline text-slate-500">|</span>
        <a
          href="#main-content"
          className="hover:text-white underline underline-offset-2 hidden sm:inline focus:outline-none focus:ring-2 focus:ring-amber-400"
        >
          {lang === "ta" ? "முதன்மை பகுதிக்கு செல்க" : "Skip to main content"}
        </a>
      </div>

      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* Text Size Resizer: A- / A / A+ (GIGW & UP Pattern) */}
        {setFontSize && (
          <div
            className="flex items-center border border-slate-700 rounded overflow-hidden text-[11px]"
            role="group"
            aria-label="Text size adjustment"
          >
            <button
              onClick={() => setFontSize("sm")}
              className={`px-1.5 py-0.5 hover:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-400 ${
                fontSize === "sm" ? "bg-slate-700 text-amber-400 font-bold" : "text-slate-300"
              }`}
              title="Decrease text size (A-)"
              aria-label="Decrease text size"
            >
              A-
            </button>
            <button
              onClick={() => setFontSize("base")}
              className={`px-1.5 py-0.5 border-x border-slate-700 hover:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-400 ${
                fontSize === "base" ? "bg-slate-700 text-amber-400 font-bold" : "text-slate-300"
              }`}
              title="Standard text size (A)"
              aria-label="Standard text size"
            >
              A
            </button>
            <button
              onClick={() => setFontSize("lg")}
              className={`px-1.5 py-0.5 hover:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-400 ${
                fontSize === "lg" ? "bg-slate-700 text-amber-400 font-bold" : "text-slate-300"
              }`}
              title="Increase text size (A+)"
              aria-label="Increase text size"
            >
              A+
            </button>
          </div>
        )}

        {/* Contrast Switch (Normal / High Contrast) */}
        <button
          onClick={() => setHighContrast(!highContrast)}
          className={`flex items-center gap-1 px-2 py-0.5 rounded border focus:outline-none focus:ring-2 focus:ring-amber-400 transition-colors ${
            highContrast
              ? "bg-amber-400 text-slate-950 border-amber-400 font-bold"
              : "border-slate-700 hover:text-white"
          }`}
          aria-label="Toggle High Contrast Mode"
        >
          <Sun className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{highContrast ? "Normal" : "High Contrast"}</span>
        </button>

        {/* Language Switch: English / தமிழ் */}
        <button
          onClick={() => setLang(lang === "ta" ? "en" : "ta")}
          className="flex items-center gap-1 font-semibold text-amber-400 hover:text-amber-300 px-2 py-0.5 rounded border border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-400"
          aria-label="Switch Language / மொழியை மாற்றுக"
        >
          <Globe className="w-3.5 h-3.5" />
          <span>{lang === "ta" ? "English" : "தமிழ்"}</span>
        </button>

        {/* e-Sevai Kiosk Assisted Mode */}
        <Link
          href="/assisted"
          className="hidden sm:flex items-center gap-1 text-emerald-400 hover:text-emerald-300 px-2 py-0.5 rounded border border-emerald-800/80 focus:outline-none focus:ring-2 focus:ring-amber-400"
          aria-label="Assisted Access Kiosk Mode"
        >
          <span>{lang === "ta" ? "இ-சேவை உதவியாளர்" : "e-Sevai Kiosk"}</span>
        </Link>

        {/* Help & Support Link */}
        <a
          href="#emergency-help"
          className="flex items-center gap-1 hover:text-white px-2 py-0.5 text-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
          aria-label="Citizen Help and Helplines"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span className="hidden md:inline">{lang === "ta" ? "உதவி" : "Help"}</span>
        </a>

        {/* Footer Sitemap Shortcut */}
        <a
          href="#sitemap"
          className="hidden md:flex items-center gap-1 hover:text-white px-2 py-0.5 text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
          aria-label="Go to Sitemap in footer"
        >
          <FileText className="w-3 h-3" />
          <span>{lang === "ta" ? "தள வரைபடம்" : "Sitemap"}</span>
        </a>
      </div>
    </nav>
  );
}
