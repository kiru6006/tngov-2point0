"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  Menu,
  X,
  ChevronDown,
  Building2,
  FileText,
  Users,
  Award,
  FileCheck2,
  PhoneCall,
  ExternalLink,
} from "lucide-react";
import { PRIMARY_NAVIGATION, QUICK_ACCESS_ITEMS } from "@/data/navigation";
import AccessibleMegaMenu from "./AccessibleMegaMenu";

interface GovernmentHeaderProps {
  lang: "ta" | "en";
  highContrast: boolean;
  onSearch?: (query: string) => void;
}

export default function GovernmentHeader({
  lang,
  highContrast,
  onSearch,
}: GovernmentHeaderProps) {
  const router = useRouter();
  const [headerSearch, setHeaderSearch] = useState("");
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<string | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // Close menus on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setActiveMegaMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile drawer on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setActiveMegaMenu(null);
        setMobileMenuOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = headerSearch.trim();
    if (!q) return;
    if (onSearch) {
      onSearch(q);
    } else {
      router.push(`/search?q=${encodeURIComponent(q)}`);
    }
  };

  const navyColor = highContrast ? "#000000" : "#173B63";
  const tealColor = highContrast ? "#ffff00" : "#087F8C";

  return (
    <div ref={headerRef} className="w-full relative bg-white border-b border-slate-200 shadow-xs z-30">
      {/* =========================================================================
          LAYER B: MAIN HEADER WITH EMBLEM, BILINGUAL TITLES, SEARCH & ALL SERVICES
          ========================================================================= */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 max-w-full overflow-hidden">
        {/* Government Identity Branding */}
        <div className="flex items-center justify-between w-full md:w-auto gap-2 min-w-0">
          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-3 group focus:outline-none focus:ring-2 focus:ring-[#173B63] rounded-lg p-0.5 min-w-0"
          >
            <div
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-black text-white shadow-md text-sm sm:text-base shrink-0 tracking-wider transition-transform group-hover:scale-105 border border-slate-200"
              style={{ backgroundColor: navyColor }}
              aria-hidden="true"
            >
              TN
            </div>
            <div className="min-w-0">
              <h1 className="text-sm sm:text-base md:text-lg font-extrabold tracking-tight text-slate-900 leading-tight truncate">
                {lang === "ta" ? "தமிழ்நாடு அரசு" : "Government of Tamil Nadu"}
              </h1>
              <p className="text-[11px] sm:text-xs font-semibold text-[#173B63] leading-snug truncate">
                {lang === "ta" ? "ஒருங்கிணைந்த டிஜிட்டல் தளம் 2.0" : "Unified Digital Portal 2.0"}
              </p>
              <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium hidden sm:block truncate">
                {lang === "ta" ? "பொதுமக்கள் சேவை & அரசு தொடர்பு கையேடு" : "Citizen Services & Administrative Directory"}
              </p>
            </div>
          </Link>

          {/* Mobile Drawer Trigger (Explicitly Labelled Button) */}
          <div className="flex items-center gap-1.5 sm:gap-2 md:hidden shrink-0">
            <Link
              href="/services"
              className="hidden sm:inline-flex px-2.5 py-1 text-xs font-bold rounded bg-[#E9F2F7] text-[#173B63] border border-slate-300"
            >
              {lang === "ta" ? "சேவைகள்" : "Services"}
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-300 bg-slate-100 text-slate-800 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-[#173B63]"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
              aria-label={lang === "ta" ? "முழு மெனுவை திறக்க" : "Open Navigation Menu"}
            >
              <Menu className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" />
              <span className="text-xs font-bold">{lang === "ta" ? "மெனு" : "Menu"}</span>
            </button>
          </div>
        </div>

        {/* Single Global Search Shortcut: header button triggers hero search focus */}
        <div className="w-full md:w-auto flex-1 max-w-xl flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById("hero-search-input");
              if (el) {
                el.focus();
                el.scrollIntoView({ behavior: "smooth", block: "center" });
              } else {
                router.push("/search");
              }
            }}
            className="flex-1 flex items-center justify-between px-3 py-2 text-xs bg-slate-50 hover:bg-white border border-slate-300 rounded-lg text-slate-500 shadow-2xs transition-all text-left"
            title="Search government services (Focuses prominent search)"
          >
            <span className="flex items-center gap-2">
              <Search className="w-4 h-4 text-slate-400" />
              <span className="truncate">
                {lang === "ta"
                  ? "சேவை, சான்றிதழ், அரசாணை, அதிகாரி தேடுக..."
                  : "Search service, certificate, G.O., officer..."}
              </span>
            </span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] bg-slate-100 border border-slate-300 rounded text-slate-600 font-mono">
              /
            </kbd>
          </button>

          {/* Direct "All Services" Access Button (Prompt Requirement) */}
          <Link
            href="/services"
            className="hidden sm:inline-flex items-center gap-1 px-3 py-2 text-xs font-bold text-white bg-[#087F8C] hover:bg-[#06626c] rounded-lg shadow-2xs whitespace-nowrap transition-colors focus:outline-none focus:ring-2 focus:ring-[#173B63]"
          >
            <span>{lang === "ta" ? "அனைத்து சேவைகள்" : "All Services"}</span>
          </Link>
        </div>
      </div>

      {/* Horizontal Layer C removed per P0 mandate: replaced by compact Left Sidebar (AppShell) to eliminate multi-row wrapping and overlapping mega-menu */}

      {/* =========================================================================
          MOBILE NAVIGATION DRAWER
          ========================================================================= */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Drawer"
          className="md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-start animate-in fade-in duration-150"
        >
          <div className="w-full max-w-sm bg-white h-full shadow-2xl flex flex-col overflow-y-auto">
            {/* Drawer Header */}
            <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-xs"
                  style={{ backgroundColor: navyColor }}
                >
                  TN
                </div>
                <span className="font-extrabold text-sm text-slate-900">
                  {lang === "ta" ? "வழிசெலுத்தல் மெனு" : "Navigation Menu"}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-[#173B63]"
                aria-label="Close Mobile Menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Category Accordions */}
            <div className="p-4 flex-1 space-y-2">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block p-2.5 font-bold text-sm text-slate-900 hover:bg-slate-100 rounded-lg"
              >
                {lang === "ta" ? "முகப்பு (Home)" : "Home"}
              </Link>

              {PRIMARY_NAVIGATION.filter((n) => n.id !== "nav-home").map((nav) => {
                const isExpanded = expandedMobileCategory === nav.id;
                return (
                  <div key={nav.id} className="border border-slate-200 rounded-lg overflow-hidden">
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedMobileCategory(isExpanded ? null : nav.id)
                      }
                      className="w-full flex justify-between items-center p-3 text-left bg-slate-50 hover:bg-slate-100 font-bold text-xs uppercase tracking-wide text-slate-800"
                      aria-expanded={isExpanded}
                    >
                      <span>{lang === "ta" ? nav.label_ta : nav.label_en}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-500 transition-transform ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isExpanded && nav.groups && (
                      <div className="p-3 bg-white space-y-4 border-t border-slate-200 text-xs">
                        {nav.groups.map((grp) => (
                          <div key={grp.group_id} className="space-y-1.5">
                            <span className="font-bold text-[#173B63] block text-[11px] uppercase tracking-wider">
                              {lang === "ta" ? grp.group_title_ta : grp.group_title_en}
                            </span>
                            <ul className="space-y-1 pl-2 border-l border-slate-200">
                              {grp.items.map((item) => (
                                <li key={item.id}>
                                  <Link
                                    href={item.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block py-1 text-slate-600 hover:text-[#173B63] font-medium"
                                  >
                                    {lang === "ta" ? item.title_ta : item.title_en}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                        <div className="pt-2 border-t border-slate-100">
                          <Link
                            href={nav.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="font-bold text-xs text-[#087F8C] block"
                          >
                            {lang === "ta"
                              ? `${nav.label_ta} முழு விவரம் →`
                              : `View All ${nav.label_en} →`}
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Emergency Numbers Quick Access in Drawer */}
              <div className="mt-6 pt-4 border-t border-slate-200">
                <span className="text-xs font-bold text-slate-500 block mb-2 uppercase">
                  {lang === "ta" ? "அவசர எண்கள் (24x7):" : "Emergency Helplines (24x7):"}
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <a
                    href="tel:1100"
                    className="flex items-center gap-1.5 p-2 rounded bg-amber-50 text-amber-900 border border-amber-200 font-bold"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-amber-700" />
                    <span>CM 1100</span>
                  </a>
                  <a
                    href="tel:108"
                    className="flex items-center gap-1.5 p-2 rounded bg-red-50 text-red-900 border border-red-200 font-bold"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-red-700" />
                    <span>108 Medical</span>
                  </a>
                  <a
                    href="tel:100"
                    className="flex items-center gap-1.5 p-2 rounded bg-blue-50 text-blue-900 border border-blue-200 font-bold"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-blue-700" />
                    <span>100 Police</span>
                  </a>
                  <a
                    href="tel:181"
                    className="flex items-center gap-1.5 p-2 rounded bg-purple-50 text-purple-900 border border-purple-200 font-bold"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-purple-700" />
                    <span>181 Women</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
