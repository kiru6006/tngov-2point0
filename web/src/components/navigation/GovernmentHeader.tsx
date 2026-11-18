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
  GraduationCap,
  Briefcase,
  MapPin,
  ExternalLink,
  ShieldAlert,
  Compass,
} from "lucide-react";
import { PRIMARY_NAVIGATION, QUICK_ACCESS_ITEMS } from "@/data/navigation";
import CONTACT_SUBCATEGORIES from "@/data/contacts_subcategories.json";
import DEPARTMENTS_CATALOG from "@/data/departments_catalog.json";

interface GovernmentHeaderProps {
  lang: "ta" | "en";
  highContrast: boolean;
  onSearch?: (query: string) => void;
  isHomepage?: boolean;
}

const quickIconMap: Record<string, any> = {
  FileText,
  MapPin,
  GraduationCap,
  Briefcase,
  Award,
  PhoneCall,
  FileCheck2,
  ShieldAlert,
};

export default function GovernmentHeader({
  lang,
  highContrast,
  onSearch,
  isHomepage = false,
}: GovernmentHeaderProps) {
  const router = useRouter();
  const [headerSearch, setHeaderSearch] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<string | null>(null);
  const [contactsDropdownOpen, setContactsDropdownOpen] = useState(false);
  const [departmentsDropdownOpen, setDepartmentsDropdownOpen] = useState(false);
  const [sectionsDropdownOpen, setSectionsDropdownOpen] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);
  const contactsRef = useRef<HTMLDivElement>(null);
  const departmentsRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement>(null);

  const basePath = process.env.NODE_ENV === "production" ? "/tngov-2point0" : "";

  // Close menus on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (contactsRef.current && !contactsRef.current.contains(event.target as Node)) {
        setContactsDropdownOpen(false);
      }
      if (departmentsRef.current && !departmentsRef.current.contains(event.target as Node)) {
        setDepartmentsDropdownOpen(false);
      }
      if (sectionsRef.current && !sectionsRef.current.contains(event.target as Node)) {
        setSectionsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close menus on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setContactsDropdownOpen(false);
        setDepartmentsDropdownOpen(false);
        setSectionsDropdownOpen(false);
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
          MAIN HEADER: EMBLEM, IDENTITY & DYNAMIC CONTENT AREA
          - Homepage: Shows Quick Access items + Contacts & Departments dropdowns (no duplicate search)
          - Sub-pages: Shows prominent search bar + direct action buttons
          ========================================================================= */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3 flex flex-col lg:flex-row justify-between items-center gap-3 sm:gap-4 max-w-full">
        {/* Government Identity Branding */}
        <div className="flex items-center justify-between w-full lg:w-auto gap-3 min-w-0">
          <Link
            href="/"
            className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none focus:ring-2 focus:ring-[#173B63] rounded-lg p-0.5 min-w-0"
          >
            {/* Official Tamil Nadu Government Emblem */}
            <div className="relative w-11 h-11 sm:w-13 sm:h-13 shrink-0 flex items-center justify-center p-0.5 bg-white rounded-full border border-slate-200 shadow-xs">
              <img
                src={`${basePath}/tn-emblem.png`}
                alt={lang === "ta" ? "தமிழ்நாடு அரசு சின்னம்" : "Government of Tamil Nadu Emblem"}
                className="w-full h-full object-contain transition-transform group-hover:scale-105"
                onError={(e) => {
                  if (!e.currentTarget.src.endsWith("/tn-emblem.png")) {
                    e.currentTarget.src = "/tn-emblem.png";
                  }
                }}
              />
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

          {/* Mobile Drawer Trigger */}
          <div className="flex items-center gap-1.5 sm:gap-2 lg:hidden shrink-0">
            <Link
              href="/services"
              className="px-2.5 py-1 text-xs font-bold rounded bg-[#E9F2F7] text-[#173B63] border border-slate-300"
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

        {/* =========================================================================
            HEADER RIGHT CONTENT AREA:
            HOMEPAGE vs SUBPAGE CONDITIONAL RENDERING
            ========================================================================= */}
        {isHomepage ? (
          /* HOMEPAGE: No duplicate search. Quick Access buttons + Contacts & Departments Dropdowns */
          <div className="w-full lg:w-auto flex-1 flex flex-wrap items-center justify-end gap-2 text-xs">
            {/* Quick Access Menu Items Strip */}
            <div className="hidden xl:flex items-center gap-1.5 mr-1 overflow-x-auto">
              {QUICK_ACCESS_ITEMS.slice(0, 4).map((item) => {
                const IconComp = quickIconMap[item.iconName] || FileText;
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-50 hover:bg-sky-50 text-slate-700 hover:text-[#173B63] border border-slate-200 font-medium text-[11px] whitespace-nowrap transition-colors"
                  >
                    <IconComp className="w-3 h-3 text-[#087F8C]" />
                    <span>{lang === "ta" ? item.title_ta : item.title_en}</span>
                  </Link>
                );
              })}
            </div>

            {/* In-Page Sections Dropdown: Direct Navigation to Homepage Sections */}
            <div ref={sectionsRef} className="relative">
              <button
                type="button"
                onClick={() => {
                  setSectionsDropdownOpen(!sectionsDropdownOpen);
                  setContactsDropdownOpen(false);
                  setDepartmentsDropdownOpen(false);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-300 transition-colors focus:outline-none focus:ring-2 focus:ring-[#173B63]"
                aria-expanded={sectionsDropdownOpen}
                aria-haspopup="true"
              >
                <Compass className="w-3.5 h-3.5 text-slate-600" />
                <span>{lang === "ta" ? "பிரிவுகள்" : "Sections"}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-slate-500 transition-transform ${
                    sectionsDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {sectionsDropdownOpen && (
                <div
                  className="absolute right-0 top-full mt-1.5 w-80 bg-white rounded-lg shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150 max-h-96 overflow-y-auto"
                  role="menu"
                >
                  <div className="px-3 py-1.5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                      {lang === "ta" ? "முகப்பு பக்கப் பிரிவுகள்" : "Homepage Sections Navigation"}
                    </span>
                  </div>
                  <div className="p-2 space-y-2.5 text-xs">
                    {/* Citizen Services Domain */}
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#087F8C] block px-2 pb-1">
                        {lang === "ta" ? "பொதுமக்கள் சேவைகள்" : "Citizen Services"}
                      </span>
                      <div className="space-y-0.5">
                        <a
                          href="#popular-services"
                          onClick={() => setSectionsDropdownOpen(false)}
                          className="flex items-center justify-between px-2.5 py-1 text-slate-700 hover:bg-sky-50 hover:text-[#173B63] rounded font-medium transition-colors"
                        >
                          <span>{lang === "ta" ? "விரைவு சேவைகள்" : "Popular Services"}</span>
                          <span className="text-[10px] text-slate-400 font-mono">#popular-services</span>
                        </a>
                        <a
                          href="#services-by-category"
                          onClick={() => setSectionsDropdownOpen(false)}
                          className="flex items-center justify-between px-2.5 py-1 text-slate-700 hover:bg-sky-50 hover:text-[#173B63] rounded font-medium transition-colors"
                        >
                          <span>{lang === "ta" ? "14 முதன்மை சேவைப் பிரிவுகள்" : "14 Service Categories"}</span>
                          <span className="text-[10px] text-slate-400 font-mono">#services-by-category</span>
                        </a>
                        <a
                          href="#service-action-panel"
                          onClick={() => setSectionsDropdownOpen(false)}
                          className="flex items-center justify-between px-2.5 py-1 text-slate-700 hover:bg-sky-50 hover:text-[#173B63] rounded font-medium transition-colors"
                        >
                          <span>{lang === "ta" ? "நேரடி சேவை பலகை (AP Pattern)" : "Service Action Panel"}</span>
                          <span className="text-[10px] text-slate-400 font-mono">#service-action-panel</span>
                        </a>
                        <a
                          href="#life-situations"
                          onClick={() => setSectionsDropdownOpen(false)}
                          className="flex items-center justify-between px-2.5 py-1 text-slate-700 hover:bg-sky-50 hover:text-[#173B63] rounded font-medium transition-colors"
                        >
                          <span>{lang === "ta" ? "வாழ்க்கை சூழல் சேவைகள்" : "Life Situation Discovery"}</span>
                          <span className="text-[10px] text-slate-400 font-mono">#life-situations</span>
                        </a>
                      </div>
                    </div>

                    {/* Schemes & Portals */}
                    <div className="pt-1 border-t border-slate-100">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#087F8C] block px-2 pb-1">
                        {lang === "ta" ? "நலத்திட்டங்கள் & போர்டல்கள்" : "Schemes & Portals"}
                      </span>
                      <div className="space-y-0.5">
                        <a
                          href="#welfare-schemes"
                          onClick={() => setSectionsDropdownOpen(false)}
                          className="flex items-center justify-between px-2.5 py-1 text-slate-700 hover:bg-sky-50 hover:text-[#173B63] rounded font-medium transition-colors"
                        >
                          <span>{lang === "ta" ? "முக்கிய நலத்திட்டங்கள்" : "Welfare & Benefits"}</span>
                          <span className="text-[10px] text-slate-400 font-mono">#welfare-schemes</span>
                        </a>
                        <a
                          href="#egov-portals"
                          onClick={() => setSectionsDropdownOpen(false)}
                          className="flex items-center justify-between px-2.5 py-1 text-slate-700 hover:bg-sky-50 hover:text-[#173B63] rounded font-medium transition-colors"
                        >
                          <span>{lang === "ta" ? "டிஜிட்டல் மின்-ஆளுமை தளங்கள்" : "e-Gov Portal Directory"}</span>
                          <span className="text-[10px] text-slate-400 font-mono">#egov-portals</span>
                        </a>
                      </div>
                    </div>

                    {/* Administration & Directory */}
                    <div className="pt-1 border-t border-slate-100">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#087F8C] block px-2 pb-1">
                        {lang === "ta" ? "நிர்வாகம் & தொடர்புகள்" : "Administration & Directory"}
                      </span>
                      <div className="space-y-0.5">
                        <a
                          href="#governance-admin"
                          onClick={() => setSectionsDropdownOpen(false)}
                          className="flex items-center justify-between px-2.5 py-1 text-slate-700 hover:bg-sky-50 hover:text-[#173B63] rounded font-medium transition-colors"
                        >
                          <span>{lang === "ta" ? "அரசியலமைப்பு தூண்கள்" : "Constitutional Governance"}</span>
                          <span className="text-[10px] text-slate-400 font-mono">#governance-admin</span>
                        </a>
                        <a
                          href="#contact-directory-preview"
                          onClick={() => setSectionsDropdownOpen(false)}
                          className="flex items-center justify-between px-2.5 py-1 text-slate-700 hover:bg-sky-50 hover:text-[#173B63] rounded font-medium transition-colors"
                        >
                          <span>{lang === "ta" ? "அரசு தொடர்பு கையேடு" : "Contact Directory Preview"}</span>
                          <span className="text-[10px] text-slate-400 font-mono">#contact-directory-preview</span>
                        </a>
                        <a
                          href="#districts-departments"
                          onClick={() => setSectionsDropdownOpen(false)}
                          className="flex items-center justify-between px-2.5 py-1 text-slate-700 hover:bg-sky-50 hover:text-[#173B63] rounded font-medium transition-colors"
                        >
                          <span>{lang === "ta" ? "38 மாவட்டங்கள் வழிகாட்டி" : "38 Districts & Departments"}</span>
                          <span className="text-[10px] text-slate-400 font-mono">#districts-departments</span>
                        </a>
                      </div>
                    </div>

                    {/* Notices & Helplines */}
                    <div className="pt-1 border-t border-slate-100">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#087F8C] block px-2 pb-1">
                        {lang === "ta" ? "அரசாணைகள் & அவசர உதவி" : "Notices & Helplines"}
                      </span>
                      <div className="space-y-0.5">
                        <a
                          href="#orders-notices"
                          onClick={() => setSectionsDropdownOpen(false)}
                          className="flex items-center justify-between px-2.5 py-1 text-slate-700 hover:bg-sky-50 hover:text-[#173B63] rounded font-medium transition-colors"
                        >
                          <span>{lang === "ta" ? "அரசாணைகள் பலகை" : "Government Orders & Notices"}</span>
                          <span className="text-[10px] text-slate-400 font-mono">#orders-notices</span>
                        </a>
                        <a
                          href="#announcements"
                          onClick={() => setSectionsDropdownOpen(false)}
                          className="flex items-center justify-between px-2.5 py-1 text-slate-700 hover:bg-sky-50 hover:text-[#173B63] rounded font-medium transition-colors"
                        >
                          <span>{lang === "ta" ? "ஆட்சேர்ப்பு & செய்திகள்" : "Jobs & Announcements"}</span>
                          <span className="text-[10px] text-slate-400 font-mono">#announcements</span>
                        </a>
                        <a
                          href="#emergency-help"
                          onClick={() => setSectionsDropdownOpen(false)}
                          className="flex items-center justify-between px-2.5 py-1 text-red-700 hover:bg-red-50 rounded font-bold transition-colors"
                        >
                          <span>{lang === "ta" ? "24x7 அவசர உதவி எண்கள்" : "24x7 Emergency Helplines"}</span>
                          <span className="text-[10px] text-red-500 font-mono">#emergency-help</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Contacts Dropdown (Benchmark 16 Subcategories from reference screenshot) */}
            <div ref={contactsRef} className="relative">
              <button
                type="button"
                onClick={() => {
                  setContactsDropdownOpen(!contactsDropdownOpen);
                  setDepartmentsDropdownOpen(false);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#087F8C] hover:bg-[#06626c] text-white font-bold text-xs shadow-2xs border border-[#06626c] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#087F8C]"
                aria-expanded={contactsDropdownOpen}
                aria-haspopup="true"
              >
                <Users className="w-3.5 h-3.5" />
                <span>{lang === "ta" ? "தொடர்புகள்" : "Contacts"}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform ${
                    contactsDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {contactsDropdownOpen && (
                <div
                  className="absolute right-0 top-full mt-1.5 w-72 bg-white rounded-lg shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150 max-h-96 overflow-y-auto"
                  role="menu"
                >
                  <div className="px-3 py-1.5 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      {lang === "ta" ? "அரசு தொடர்பு வழிகாட்டி" : "Official Directory"}
                    </span>
                    <Link
                      href="/contact-directory"
                      onClick={() => setContactsDropdownOpen(false)}
                      className="text-[11px] font-bold text-[#087F8C] hover:underline"
                    >
                      {lang === "ta" ? "அனைத்தும் →" : "View All →"}
                    </Link>
                  </div>
                  <div className="py-1">
                    {CONTACT_SUBCATEGORIES.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/contact-directory?subcat=${cat.id}`}
                        onClick={() => setContactsDropdownOpen(false)}
                        className="flex items-center justify-between px-3.5 py-1.5 text-xs text-[#173B63] hover:bg-sky-50 hover:text-[#087F8C] font-semibold transition-colors"
                        role="menuitem"
                      >
                        <span className="truncate">
                          {lang === "ta" ? cat.label_ta : cat.label_en}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono ml-2 shrink-0">
                          {cat.count}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Departments Dropdown (42 Official Departments Catalog) */}
            <div ref={departmentsRef} className="relative">
              <button
                type="button"
                onClick={() => {
                  setDepartmentsDropdownOpen(!departmentsDropdownOpen);
                  setContactsDropdownOpen(false);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-300 transition-colors focus:outline-none focus:ring-2 focus:ring-[#173B63]"
                aria-expanded={departmentsDropdownOpen}
                aria-haspopup="true"
              >
                <Building2 className="w-3.5 h-3.5 text-slate-600" />
                <span>{lang === "ta" ? "துறைகள்" : "Departments"}</span>
                <span className="text-[10px] px-1 bg-slate-200 text-slate-700 rounded font-mono">
                  42
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-slate-500 transition-transform ${
                    departmentsDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {departmentsDropdownOpen && (
                <div
                  className="absolute right-0 top-full mt-1.5 w-80 bg-white rounded-lg shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150 max-h-96 overflow-y-auto"
                  role="menu"
                >
                  <div className="px-3 py-1.5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                      {lang === "ta" ? "அரசுத் துறைகள் (42)" : "Government Departments (42)"}
                    </span>
                    <Link
                      href="/departments"
                      onClick={() => setDepartmentsDropdownOpen(false)}
                      className="text-[11px] font-bold text-[#087F8C] hover:underline"
                    >
                      {lang === "ta" ? "அனைத்து துறைகள் →" : "All Departments →"}
                    </Link>
                  </div>
                  <div className="py-1 divide-y divide-slate-50">
                    {DEPARTMENTS_CATALOG.map((dept) => (
                      <a
                        key={dept.dep_id}
                        href={`https://www.tn.gov.in/dept_profile.php?dep_id=${dept.dep_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setDepartmentsDropdownOpen(false)}
                        className="flex items-center justify-between px-3.5 py-1.5 text-xs text-slate-700 hover:bg-sky-50 hover:text-[#173B63] transition-colors group"
                        role="menuitem"
                      >
                        <span className="truncate pr-2">{dept.name}</span>
                        <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-[#087F8C] shrink-0" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Direct All Services CTA Button */}
            <Link
              href="/services"
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-white bg-[#173B63] hover:bg-[#102a47] rounded-lg shadow-2xs whitespace-nowrap transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#173B63]"
            >
              <span>{lang === "ta" ? "அனைத்து சேவைகள்" : "All Services"}</span>
            </Link>
          </div>
        ) : (
          /* SUB-PAGES: Top header search box is prominently available */
          <div className="w-full lg:w-auto flex-1 max-w-xl flex items-center gap-2">
            <form
              onSubmit={handleSearchSubmit}
              className="flex-1 relative flex items-center"
              role="search"
            >
              <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
              <input
                type="search"
                value={headerSearch}
                onChange={(e) => setHeaderSearch(e.target.value)}
                placeholder={
                  lang === "ta"
                    ? "சேவை, சான்றிதழ், அரசாணை, அதிகாரி தேடுக..."
                    : "Search service, certificate, G.O., officer..."
                }
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 focus:bg-white border border-slate-300 focus:border-[#173B63] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#173B63] transition-all"
                aria-label="Global Search"
              />
              <button
                type="submit"
                className="absolute right-1 px-2.5 py-1 text-[11px] font-bold text-white bg-[#173B63] hover:bg-[#102a47] rounded transition-colors"
              >
                {lang === "ta" ? "தேடு" : "Search"}
              </button>
            </form>

            <Link
              href="/services"
              className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-white bg-[#087F8C] hover:bg-[#06626c] rounded-lg shadow-2xs whitespace-nowrap transition-colors focus:outline-none focus:ring-2 focus:ring-[#173B63]"
            >
              <span>{lang === "ta" ? "அனைத்து சேவைகள்" : "All Services"}</span>
            </Link>
          </div>
        )}
      </div>

      {/* =========================================================================
          MOBILE NAVIGATION DRAWER
          ========================================================================= */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Drawer"
          className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-start animate-in fade-in duration-150"
        >
          <div className="w-full max-w-sm bg-white h-full shadow-2xl flex flex-col overflow-y-auto">
            {/* Drawer Header */}
            <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white p-0.5 border border-slate-200 flex items-center justify-center">
                  <img
                    src={`${basePath}/tn-emblem.png`}
                    alt="TN Emblem"
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.src = "/tn-emblem.png";
                    }}
                  />
                </div>
                <span className="font-extrabold text-sm text-slate-900">
                  {lang === "ta" ? "தமிழ்நாடு அரசு 2.0" : "Govt of Tamil Nadu 2.0"}
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

            {/* Mobile Category Navigation */}
            <div className="p-4 flex-1 space-y-2">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block p-2.5 font-bold text-sm text-slate-900 hover:bg-slate-100 rounded-lg"
              >
                {lang === "ta" ? "முகப்பு (Home)" : "Home"}
              </Link>

              {/* Canonical Primary Categories Accordion */}
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
