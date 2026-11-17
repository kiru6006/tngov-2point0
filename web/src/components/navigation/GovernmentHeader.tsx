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

  const tnBlue = highContrast ? "#000000" : "#004B87";

  return (
    <div ref={headerRef} className="w-full relative bg-white border-b border-slate-200 shadow-xs z-30">
      {/* =========================================================================
          LAYER B: MAIN HEADER WITH EMBLEM, BILINGUAL TITLES, SEARCH & MENU
          ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Government Identity Branding */}
        <div className="flex items-center justify-between w-full md:w-auto gap-3.5">
          <Link href="/" className="flex items-center gap-3.5 group focus:outline-none focus:ring-2 focus:ring-[#004B87] rounded-lg p-1">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center font-black text-white shadow-md text-base shrink-0 tracking-wider transition-transform group-hover:scale-105"
              style={{ backgroundColor: tnBlue }}
              aria-hidden="true"
            >
              TN
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-extrabold tracking-tight text-slate-900 leading-tight">
                {lang === "ta" ? "தமிழ்நாடு அரசு" : "Government of Tamil Nadu"}
              </h1>
              <p className="text-xs sm:text-sm font-semibold text-[#004B87] leading-snug">
                {lang === "ta" ? "ஒருங்கிணைந்த டிஜிட்டல் போர்டல் 2.0" : "Digital Portal 2.0"}
              </p>
              <p className="text-[11px] text-slate-500 font-medium">
                {lang === "ta" ? "பொதுமக்கள் சேவை & அரசு தொடர்பு கையேடு" : "Citizen Services & Administrative Directory"}
              </p>
            </div>
          </Link>

          {/* Mobile Menu Button with Visible Text Label */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#004B87]"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            <span>{lang === "ta" ? "மெனு" : "Menu"}</span>
          </button>
        </div>

        {/* Universal Citizen Search Input (Layer B) */}
        <div className="w-full md:max-w-md lg:max-w-lg">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <input
              type="text"
              value={headerSearch}
              onChange={(e) => setHeaderSearch(e.target.value)}
              placeholder={
                lang === "ta"
                  ? "சேவை, சான்றிதழ், அரசாணை அல்லது அதிகாரி பெயர்..."
                  : "Search service, certificate, G.O. or official name..."
              }
              className="w-full py-2.5 pl-10 pr-24 rounded-xl text-slate-900 bg-slate-50 border border-slate-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#004B87] text-xs sm:text-sm transition-all"
              aria-label="Universal Citizen Search Input"
            />
            <Search className="absolute left-3 top-3 text-slate-400 w-4 h-4" />
            <button
              type="submit"
              className="absolute right-1.5 top-1.5 px-3.5 py-1.5 rounded-lg text-white font-bold text-xs transition-colors shadow-xs"
              style={{ backgroundColor: tnBlue }}
            >
              {lang === "ta" ? "தேடுக" : "Search"}
            </button>
          </form>
        </div>
      </div>

      {/* =========================================================================
          LAYER C: PRIMARY CATEGORY NAVIGATION (DESKTOP MEGA MENUS)
          ========================================================================= */}
      <nav
        aria-label="Primary Category Navigation"
        className="hidden md:block w-full border-t border-slate-200 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <ul className="flex items-center gap-1 lg:gap-2 text-xs font-bold text-slate-700">
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
                      className={`flex items-center gap-1 px-3 py-3 rounded-none border-b-2 font-bold text-xs uppercase tracking-wider transition-colors focus:outline-none focus:ring-2 focus:ring-[#004B87] ${
                        isSelected
                          ? "border-[#004B87] text-[#004B87] bg-blue-50/50"
                          : "border-transparent hover:text-[#004B87] hover:border-blue-200"
                      }`}
                      aria-haspopup="true"
                      aria-expanded={isSelected}
                    >
                      <span>{lang === "ta" ? nav.label_ta : nav.label_en}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isSelected ? "rotate-180 text-[#004B87]" : "text-slate-400"
                        }`}
                      />
                    </button>
                  ) : (
                    <Link
                      href={nav.href}
                      className="inline-flex items-center px-3 py-3 border-b-2 border-transparent hover:border-[#004B87] hover:text-[#004B87] font-bold text-xs uppercase tracking-wider transition-colors focus:outline-none focus:ring-2 focus:ring-[#004B87]"
                    >
                      {lang === "ta" ? nav.label_ta : nav.label_en}
                    </Link>
                  )}

                  {/* Desktop Mega Menu Dropdown */}
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

          {/* Quick Deep Link to All 45 Departments */}
          <Link
            href="/departments"
            className="text-xs font-bold text-[#004B87] hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg border border-blue-200 transition-colors shrink-0"
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
                  style={{ backgroundColor: tnBlue }}
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
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-[#004B87]"
                aria-label="Close Mobile Menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Actions Shortcuts in Drawer */}
            <div className="p-3 bg-blue-50/60 border-b border-blue-100 grid grid-cols-2 gap-2 text-xs font-semibold">
              <Link
                href="/services/certificates"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 bg-white rounded border border-blue-200 text-slate-800 text-center flex flex-col items-center gap-1"
              >
                <FileText className="w-4 h-4 text-[#004B87]" />
                <span>{lang === "ta" ? "சான்றிதழ்கள்" : "Certificates"}</span>
              </Link>
              <Link
                href="/services/land"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 bg-white rounded border border-blue-200 text-slate-800 text-center flex flex-col items-center gap-1"
              >
                <Building2 className="w-4 h-4 text-[#004B87]" />
                <span>{lang === "ta" ? "பட்டா சிட்டா" : "Patta Chitta"}</span>
              </Link>
              <Link
                href="/contact-directory"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 bg-white rounded border border-blue-200 text-slate-800 text-center flex flex-col items-center gap-1"
              >
                <Users className="w-4 h-4 text-[#004B87]" />
                <span>{lang === "ta" ? "அரசு தொடர்புகள்" : "Contacts"}</span>
              </Link>
              <Link
                href="/schemes"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 bg-white rounded border border-blue-200 text-slate-800 text-center flex flex-col items-center gap-1"
              >
                <Award className="w-4 h-4 text-[#004B87]" />
                <span>{lang === "ta" ? "நலத்திட்டங்கள்" : "Schemes"}</span>
              </Link>
            </div>

            {/* Category Navigation Accordions */}
            <div className="flex-1 p-4 space-y-2 text-xs">
              {PRIMARY_NAVIGATION.map((nav) => {
                const hasGroups = Boolean(nav.groups && nav.groups.length > 0);
                const isExpanded = expandedMobileCategory === nav.id;

                return (
                  <div key={nav.id} className="border-b border-slate-100 pb-2">
                    {hasGroups ? (
                      <div>
                        <button
                          type="button"
                          onClick={() => setExpandedMobileCategory(isExpanded ? null : nav.id)}
                          className="w-full flex justify-between items-center py-2 text-left font-bold text-slate-900 text-sm hover:text-[#004B87]"
                          aria-expanded={isExpanded}
                        >
                          <span>{lang === "ta" ? nav.label_ta : nav.label_en}</span>
                          <ChevronDown
                            className={`w-4 h-4 text-slate-400 transition-transform ${
                              isExpanded ? "rotate-180 text-[#004B87]" : ""
                            }`}
                          />
                        </button>
                        {isExpanded && nav.groups && (
                          <div className="pl-3 py-1 space-y-3">
                            {nav.groups.map((grp) => (
                              <div key={grp.group_id} className="space-y-1">
                                <span className="text-[10px] uppercase font-bold text-[#004B87] tracking-wider block">
                                  {lang === "ta" ? grp.group_title_ta : grp.group_title_en}
                                </span>
                                <ul className="space-y-1.5 pl-1">
                                  {grp.items.map((item) => (
                                    <li key={item.id}>
                                      {item.isExternal ? (
                                        <a
                                          href={item.href}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          onClick={() => setMobileMenuOpen(false)}
                                          className="text-slate-600 hover:text-slate-900 flex items-center justify-between py-1"
                                        >
                                          <span>{lang === "ta" ? item.title_ta : item.title_en}</span>
                                          <ExternalLink className="w-3 h-3 text-slate-400" />
                                        </a>
                                      ) : (
                                        <Link
                                          href={item.href}
                                          onClick={() => setMobileMenuOpen(false)}
                                          className="text-slate-600 hover:text-slate-900 block py-1"
                                        >
                                          {lang === "ta" ? item.title_ta : item.title_en}
                                        </Link>
                                      )}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                            <Link
                              href={nav.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="text-xs font-bold text-[#004B87] block pt-1"
                            >
                              {lang === "ta" ? "முழுப் பக்கத்தைக் காண்க →" : "View Full Section →"}
                            </Link>
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        href={nav.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-2 font-bold text-slate-900 text-sm hover:text-[#004B87]"
                      >
                        {lang === "ta" ? nav.label_ta : nav.label_en}
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Drawer Footer Emergency Call */}
            <div className="p-4 bg-slate-900 text-white text-xs space-y-2 mt-auto">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">CM Helpline:</span>
                <a href="tel:1100" className="font-bold text-amber-400">1100 (24x7)</a>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">e-Sevai Support:</span>
                <a href="tel:18004251333" className="font-bold text-emerald-400">1800-425-1333</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
