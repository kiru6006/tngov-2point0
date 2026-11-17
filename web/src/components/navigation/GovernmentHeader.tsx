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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Government Identity Branding */}
        <div className="flex items-center justify-between w-full md:w-auto gap-3.5">
          <Link
            href="/"
            className="flex items-center gap-3.5 group focus:outline-none focus:ring-2 focus:ring-[#173B63] rounded-lg p-1"
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center font-black text-white shadow-md text-base shrink-0 tracking-wider transition-transform group-hover:scale-105 border border-slate-200"
              style={{ backgroundColor: navyColor }}
              aria-hidden="true"
            >
              TN
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-extrabold tracking-tight text-slate-900 leading-tight">
                {lang === "ta" ? "தமிழ்நாடு அரசு" : "Government of Tamil Nadu"}
              </h1>
              <p className="text-xs sm:text-sm font-semibold text-[#173B63] leading-snug">
                {lang === "ta" ? "ஒருங்கிணைந்த டிஜிட்டல் தளம் 2.0" : "Unified Digital Portal 2.0"}
              </p>
              <p className="text-[11px] text-slate-500 font-medium">
                {lang === "ta" ? "பொதுமக்கள் சேவை & அரசு தொடர்பு கையேடு" : "Citizen Services & Administrative Directory"}
              </p>
            </div>
          </Link>

          {/* Mobile Drawer Trigger (Explicitly Labelled Button) */}
          <div className="flex items-center gap-2 md:hidden">
            <Link
              href="/services"
              className="px-2.5 py-1 text-xs font-bold rounded bg-[#E9F2F7] text-[#173B63] border border-slate-300"
            >
              {lang === "ta" ? "சேவைகள்" : "Services"}
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-slate-100 text-slate-800 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-[#173B63]"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
              aria-label={lang === "ta" ? "முழு மெனுவை திறக்க" : "Open Navigation Menu"}
            >
              <Menu className="w-5 h-5 text-slate-700" />
              <span className="text-xs font-bold">{lang === "ta" ? "மெனு" : "Menu"}</span>
            </button>
          </div>
        </div>

        {/* Universal Search Bar + All Services Button */}
        <div className="w-full md:w-auto flex-1 max-w-xl flex items-center gap-2">
          <form onSubmit={handleSearchSubmit} className="relative flex-1" role="search">
            <label htmlFor="portal-header-search" className="sr-only">
              {lang === "ta" ? "அரசு சேவைகள் மற்றும் தொடர்பு தேடல்" : "Search government services and directory"}
            </label>
            <input
              id="portal-header-search"
              type="search"
              value={headerSearch}
              onChange={(e) => setHeaderSearch(e.target.value)}
              placeholder={
                lang === "ta"
                  ? "சேவை, சான்றிதழ், அரசாணை அல்லது அதிகாரி பெயர் தேடுக..."
                  : "Search service, certificate, G.O., department or officer..."
              }
              className="w-full pl-9 pr-20 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#173B63] focus:border-transparent transition-all"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
            <button
              type="submit"
              className="absolute right-1 top-1 bottom-1 px-3 bg-[#173B63] hover:bg-[#0f2844] text-white text-xs font-bold rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              {lang === "ta" ? "தேடுக" : "Search"}
            </button>
          </form>

          {/* Direct "All Services" Access Button (Prompt Requirement) */}
          <Link
            href="/services"
            className="hidden sm:inline-flex items-center gap-1 px-3 py-2 text-xs font-bold text-white bg-[#087F8C] hover:bg-[#06626c] rounded-lg shadow-2xs whitespace-nowrap transition-colors focus:outline-none focus:ring-2 focus:ring-[#173B63]"
          >
            <span>{lang === "ta" ? "அனைத்து சேவைகள்" : "All Services"}</span>
          </Link>
        </div>
      </div>

      {/* =========================================================================
          LAYER C: PRIMARY CATEGORY NAVIGATION (9 Canonical Desktop Categories)
          ========================================================================= */}
      <nav
        aria-label="Primary Portal Navigation"
        className="hidden md:block w-full border-t border-slate-200 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <ul className="flex items-center gap-0.5 lg:gap-1 text-xs font-bold text-slate-700 flex-wrap">
            {PRIMARY_NAVIGATION.map((nav) => {
              const hasMega = Boolean(nav.groups && nav.groups.length > 0);
              const isSelected = activeMegaMenu === nav.id;

              return (
                <li key={nav.id} className="relative">
                  {hasMega ? (
                    <button
                      type="button"
                      onClick={() => setActiveMegaMenu(isSelected ? null : nav.id)}
                      onMouseEnter={() => setActiveMegaMenu(nav.id)}
                      className={`flex items-center gap-1 px-2.5 lg:px-3 py-3 rounded-none border-b-2 font-bold text-xs uppercase tracking-wide transition-colors focus:outline-none focus:ring-2 focus:ring-[#173B63] ${
                        isSelected
                          ? "border-[#173B63] text-[#173B63] bg-sky-50/70"
                          : "border-transparent hover:text-[#173B63] hover:border-sky-300"
                      }`}
                      aria-haspopup="true"
                      aria-expanded={isSelected}
                    >
                      <span>{lang === "ta" ? nav.label_ta : nav.label_en}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isSelected ? "rotate-180 text-[#173B63]" : "text-slate-400"
                        }`}
                      />
                    </button>
                  ) : (
                    <Link
                      href={nav.href}
                      className="inline-flex items-center px-2.5 lg:px-3 py-3 border-b-2 border-transparent hover:border-[#173B63] hover:text-[#173B63] font-bold text-xs uppercase tracking-wide transition-colors focus:outline-none focus:ring-2 focus:ring-[#173B63]"
                    >
                      {lang === "ta" ? nav.label_ta : nav.label_en}
                    </Link>
                  )}

                  {/* Accessible Mega Menu Dropdown */}
                  {hasMega && (
                    <AccessibleMegaMenu
                      isOpen={isSelected}
                      onClose={() => setActiveMegaMenu(null)}
                      groups={nav.groups}
                      viewAllHref={nav.href}
                      viewAllText={
                        lang === "ta"
                          ? `${nav.label_ta} முழுப் பட்டியல் காண்க`
                          : `View All ${nav.label_en}`
                      }
                      lang={lang}
                    />
                  )}
                </li>
              );
            })}
          </ul>

          {/* Quick Deep Link to Districts / Departments */}
          <Link
            href="/departments"
            className="hidden xl:inline-flex text-xs font-bold text-[#173B63] hover:text-[#087F8C] bg-[#E9F2F7] hover:bg-sky-100 px-2.5 py-1 rounded-md border border-sky-200 transition-colors shrink-0"
          >
            {lang === "ta" ? "45 துறைகள்" : "45 Departments"} →
          </Link>
        </div>
      </nav>

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

              {PRIMARY_NAVIGATION.filter((n) => n.id !== "nav-home").map((cat) => {
                const isExpanded = expandedMobileCategory === cat.id;
                return (
                  <div key={cat.id} className="border border-slate-200 rounded-lg overflow-hidden">
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedMobileCategory(isExpanded ? null : cat.id)
                      }
                      className="w-full flex justify-between items-center p-3 text-left bg-slate-50 hover:bg-slate-100 font-bold text-xs uppercase tracking-wide text-slate-800"
                      aria-expanded={isExpanded}
                    >
                      <span>{lang === "ta" ? cat.label_ta : cat.label_en}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-500 transition-transform ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isExpanded && cat.groups && (
                      <div className="p-3 bg-white space-y-4 border-t border-slate-200 text-xs">
                        {cat.groups.map((grp) => (
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
                            href={cat.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="font-bold text-xs text-[#087F8C] block"
                          >
                            {lang === "ta"
                              ? `${cat.label_ta} முழு விவரம் →`
                              : `View All ${cat.label_en} →`}
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
