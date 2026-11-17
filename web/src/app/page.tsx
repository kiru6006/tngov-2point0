"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FileText,
  MapPin,
  Clock,
  ArrowRight,
  Search,
  Building2,
  Users,
  Award,
  FileCheck2,
  PhoneCall,
  ExternalLink,
  ChevronRight,
  CheckCircle2,
  GraduationCap,
  Briefcase,
  Download,
  ShieldCheck,
  Landmark,
  Compass,
} from "lucide-react";

import GovernmentUtilityBar from "@/components/navigation/GovernmentUtilityBar";
import GovernmentHeader from "@/components/navigation/GovernmentHeader";
import QuickAccessBar from "@/components/navigation/QuickAccessBar";
import FooterSitemap from "@/components/navigation/FooterSitemap";

import {
  MOST_USED_SERVICES,
  INLINE_SERVICE_CATEGORIES,
  LIFE_SITUATIONS_DATA,
  CONSTITUTIONAL_PILLARS,
  E_GOVERNANCE_PORTALS,
  NOTICE_BOARD_DATA,
  TOURISM_HIGHLIGHTS,
  EMERGENCY_HELPLINES,
  TN_DISTRICTS_LIST,
} from "@/data/navigation";

const iconMap: Record<string, any> = {
  FileText,
  MapPin,
  Clock,
  Award,
  Users,
  FileCheck2,
  PhoneCall,
  Building2,
  GraduationCap,
  Briefcase,
  Landmark,
  ShieldCheck,
  Compass,
};

export default function Home() {
  const [lang, setLang] = useState<"ta" | "en">("en");
  const [workspace, setWorkspace] = useState<"public" | "official">("public");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState<"sm" | "base" | "lg">("base");
  const [searchQuery, setSearchQuery] = useState("");
  const [inlineCategoryTab, setInlineCategoryTab] = useState("cat-cert");
  const [selectedNoticeTab, setSelectedNoticeTab] = useState<"gos" | "notifications" | "circulars" | "tenders" | "recruitment" | "announcements">("gos");
  const [selectedDistrict, setSelectedDistrict] = useState("DIS-03"); // Chennai default
  const [dirSearchQuery, setDirSearchQuery] = useState("");

  const [aiResult, setAiResult] = useState<null | {
    title: string;
    answer: string;
    eligibility?: string;
    docs?: string;
    sla?: number;
    url: string;
    citation: string;
    guardrail: string;
  }>(null);

  const handleSearch = (q: string) => {
    const query = q.trim().toLowerCase();
    if (!query) return;

    if (query.includes("patta") || query.includes("பட்டா") || query.includes("chitta")) {
      setAiResult({
        title: lang === "ta" ? "பட்டா மாறுதல் & நில ஆவணங்கள்" : "Patta Transfer & Land Records",
        answer:
          lang === "ta"
            ? "நில உரிமை மாற்றம் மற்றும் பட்டா மாறுதல் விண்ணப்பம் வருவாய்த் துறை இணையதளத்தில் செய்யப்பட வேண்டும்."
            : "Patta transfer application is processed through the Revenue and Disaster Management e-Services portal.",
        eligibility:
          lang === "ta"
            ? "செல்லுபடியாகும் கிரயப் பத்திரம் அல்லது வாரிசு உரிமை ஆவணம்."
            : "Valid registered sale deed or legal heir certificate.",
        docs:
          lang === "ta"
            ? "கிரயப் பத்திரம், வில்லங்கச் சான்று (EC), ஆதார் அட்டை."
            : "Sale deed, Encumbrance Certificate, Aadhaar.",
        sla: 30,
        url: "/services/land",
        citation: "Revenue Dept Statutory Citizen Charter 2026",
        guardrail: "Zero-Generation Service Grounding",
      });
    } else if (query.includes("community") || query.includes("சாதி") || query.includes("income") || query.includes("வருமான")) {
      setAiResult({
        title: lang === "ta" ? "சான்றிதழ் சேவைகள் (இ-சேவை மையம்)" : "Certificate Services (e-Sevai)",
        answer:
          lang === "ta"
            ? "வருமானம் மற்றும் சாதிச் சான்றிதழ்கள் இ-சேவை மையம் அல்லது இணையதளம் வழியாக 15 நாட்களில் வழங்கப்படுகின்றன."
            : "Community and Income certificates are statutory e-Sevai services delivered in 15 working days.",
        eligibility:
          lang === "ta"
            ? "தமிழ்நாட்டில் நிரந்தரமாக வசிக்கும் தகுதிவாய்ந்த குடிமக்கள்."
            : "Permanent resident of Tamil Nadu belonging to eligible category.",
        docs:
          lang === "ta"
            ? "ஆதார் அட்டை, குடும்ப அட்டை (Ration Card), முந்தைய சான்றிதழ்."
            : "Aadhaar Card, Ration Card, Parent/Self prior certificate.",
        sla: 15,
        url: "/services/certificates",
        citation: "G.O. Ms. No. 14 Revenue & Disaster Management",
        guardrail: "Zero-Generation Service Grounding",
      });
    } else {
      setAiResult({
        title: lang === "ta" ? "அரசு தகவல் உதவி (Citizen Search)" : "Citizen Information Search",
        answer:
          lang === "ta"
            ? `"${q}" தொடர்பான சரிபார்க்கப்பட்ட தகவல்கள் அரசு தொடர்பு கையேடு மற்றும் சேவைத் தொகுப்பில் உள்ளன.`
            : `Verified information matching "${q}" is indexed in the official Contact Directory and Service Catalog.`,
        url: `/search?q=${encodeURIComponent(q)}`,
        citation: "Tamil Nadu Government Master Registry",
        guardrail: "Zero-Generation Service Grounding",
      });
    }
  };

  const currentDistrictData =
    TN_DISTRICTS_LIST.find((d) => d.id === selectedDistrict) || TN_DISTRICTS_LIST[2];

  const currentInlineCategory =
    INLINE_SERVICE_CATEGORIES.find((c) => c.id === inlineCategoryTab) ||
    INLINE_SERVICE_CATEGORIES[0];

  const fontSizeClass =
    fontSize === "sm" ? "text-[13px]" : fontSize === "lg" ? "text-[17px]" : "text-[15px]";

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors ${fontSizeClass} ${
        highContrast ? "bg-black text-[#ffff00]" : "bg-slate-50 text-slate-800"
      }`}
    >
      {/* =========================================================================
          SECTION 1 & 2: GOVERNMENT UTILITY HEADER, IDENTITY & NAVIGATION
          ========================================================================= */}
      <header className="sticky top-0 z-40 bg-white shadow-xs">
        {/* 1. Government Utility Header */}
        <GovernmentUtilityBar
          lang={lang}
          setLang={setLang}
          highContrast={highContrast}
          setHighContrast={setHighContrast}
          fontSize={fontSize}
          setFontSize={setFontSize}
        />

        {/* 2. Government Identity & Primary Navigation with Mega Menu */}
        <GovernmentHeader
          lang={lang}
          highContrast={highContrast}
          onSearch={(q) => handleSearch(q)}
        />

        {/* Quick Access Action Strip */}
        <QuickAccessBar lang={lang} />
      </header>

      {/* Main Content Landmark for Screen Readers and Skip-Links */}
      <main id="main-content" className="flex-1 focus:outline-none">
        {/* =========================================================================
            SECTION 3: CITIZEN SEARCH HERO
            ========================================================================= */}
        <section
          aria-label="Citizen Search Hero"
          className="relative bg-gradient-to-b from-[#173B63] to-[#0f2844] text-white py-12 md:py-16 px-4 sm:px-6 shadow-inner"
        >
          <div className="max-w-4xl mx-auto text-center space-y-5">
            <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-white/10 text-emerald-300 border border-emerald-400/30">
              {lang === "ta"
                ? "ஒருங்கிணைந்த தமிழ்நாடு அரசு டிஜிட்டல் நுழைவாயில் 2.0"
                : "Tamil Nadu Unified Citizen Digital Gateway 2.0"}
            </span>

            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              {lang === "ta"
                ? "அனைத்து அரசு சேவைகளும். ஒரே இடத்தில்."
                : "All Government Services. One Place."}
            </h2>

            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto">
              {lang === "ta"
                ? "சான்றிதழ்கள், நில ஆவணங்கள், அரசு நலத்திட்டங்கள், அரசாணைகள் மற்றும் 38 மாவட்டங்களின் சேவைகளை உடனடியாகப் பெறுங்கள்."
                : "Search or browse statutory certificates, land records, welfare benefits, Government Orders, and verified public administration contacts."}
            </p>

            {/* Prominent Large Search Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch(searchQuery);
              }}
              className="relative max-w-2xl mx-auto"
              role="search"
            >
              <label htmlFor="hero-search-input" className="sr-only">
                {lang === "ta" ? "அரசு சேவைகளைத் தேடுக" : "Search government services"}
              </label>
              <input
                id="hero-search-input"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  lang === "ta"
                    ? "உதாரணம்: வருமானச் சான்றிதழ், பட்டா மாறுதல், மகளிர் உரிமைத் தொகை..."
                    : "e.g., Income Certificate, Patta Transfer, Pudhumai Penn, Collector..."
                }
                className="w-full pl-12 pr-28 py-3.5 text-slate-900 bg-white rounded-xl shadow-xl text-sm sm:text-base focus:outline-none focus:ring-4 focus:ring-amber-400/50"
              />
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-4" />
              <button
                type="submit"
                className="absolute right-2 top-2 bottom-2 px-5 bg-[#087F8C] hover:bg-[#06626c] text-white font-bold text-xs sm:text-sm rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                {lang === "ta" ? "தேடுக" : "Search"}
              </button>
            </form>

            {/* Suggested Searches & Quick All Services Link */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs">
              <span className="text-slate-300 font-semibold">
                {lang === "ta" ? "பிரபலமான தேடல்கள்:" : "Popular Searches:"}
              </span>
              {[
                { en: "Community Certificate", ta: "சாதிச் சான்றிதழ்" },
                { en: "Patta Transfer", ta: "பட்டா மாறுதல்" },
                { en: "Magalir Urimai", ta: "மகளிர் உரிமைத் தொகை" },
                { en: "Government Orders", ta: "அரசாணைகள்" },
                { en: "CM Helpline", ta: "முதல்வர் உதவி மையம் 1100" },
              ].map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    const term = lang === "ta" ? item.ta : item.en;
                    setSearchQuery(term);
                    handleSearch(term);
                  }}
                  className="bg-white/10 hover:bg-white/20 text-slate-200 px-2.5 py-1 rounded-md text-xs transition-colors border border-white/10"
                >
                  {lang === "ta" ? item.ta : item.en}
                </button>
              ))}

              <Link
                href="/services"
                className="font-bold text-amber-300 hover:text-amber-200 underline underline-offset-2 ml-2"
              >
                {lang === "ta" ? "அனைத்து சேவைகள் →" : "All Services →"}
              </Link>
            </div>

            {/* AI Grounded Result Card */}
            {aiResult && (
              <div
                role="region"
                aria-label="Citizen Search Results"
                className="max-w-2xl mx-auto text-left bg-white text-slate-900 rounded-xl p-5 shadow-2xl border-2 border-emerald-400 animate-in fade-in duration-200"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
                  <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>{aiResult.title}</span>
                  </div>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                    {aiResult.guardrail}
                  </span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed mb-3">{aiResult.answer}</p>
                {aiResult.eligibility && (
                  <p className="text-[11px] text-slate-600 mb-1">
                    <strong>{lang === "ta" ? "தகுதி:" : "Eligibility:"}</strong> {aiResult.eligibility}
                  </p>
                )}
                {aiResult.docs && (
                  <p className="text-[11px] text-slate-600 mb-2">
                    <strong>{lang === "ta" ? "தேவையான ஆவணங்கள்:" : "Required Documents:"}</strong> {aiResult.docs}
                  </p>
                )}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-500 font-mono">
                    Source: {aiResult.citation}
                  </span>
                  <Link
                    href={aiResult.url}
                    className="inline-flex items-center gap-1 font-bold text-[#173B63] hover:text-[#087F8C]"
                  >
                    <span>{lang === "ta" ? "விண்ணப்பிக்கவும்" : "Proceed to Service"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: POPULAR SERVICES (QUICK ACCESS SERVICES)
            ========================================================================= */}
        <section
          aria-label="Popular Services"
          className="max-w-7xl mx-auto px-4 sm:px-6 py-10"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-2 border-b border-slate-200 gap-2">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#087F8C]">
                {lang === "ta" ? "அடிக்கடி தேவைப்படும் அரசு சேவைகள்" : "High Priority Services"}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {lang === "ta" ? "விரைவு சேவைகள் (Quick Access Services)" : "Popular Citizen Services"}
              </h3>
            </div>
            <Link
              href="/services"
              className="text-xs font-bold text-[#173B63] hover:text-[#087F8C] inline-flex items-center gap-1"
            >
              <span>{lang === "ta" ? "அனைத்து 250+ சேவைகள்" : "View All 250+ Services"}</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {MOST_USED_SERVICES.map((srv) => {
              const IconComp = iconMap[srv.icon] || FileText;
              return (
                <div
                  key={srv.id}
                  className="bg-white rounded-xl border border-slate-200 hover:border-[#173B63] p-4 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="p-2 rounded-lg bg-[#E9F2F7] text-[#173B63] group-hover:bg-[#173B63] group-hover:text-white transition-colors">
                        <IconComp className="w-4 h-4" />
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        {lang === "ta" ? srv.fee_ta : srv.fee_en}
                      </span>
                    </div>

                    <h4 className="font-bold text-sm text-slate-900 group-hover:text-[#173B63] line-clamp-1">
                      {lang === "ta" ? srv.title_ta : srv.title_en}
                    </h4>

                    <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                      {lang === "ta" ? srv.dept_ta : srv.dept_en}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{lang === "ta" ? srv.sla_ta : srv.sla_en}</span>
                    </span>

                    <Link
                      href={srv.href}
                      className="font-bold text-xs text-[#087F8C] group-hover:text-[#173B63] inline-flex items-center gap-1"
                    >
                      <span>{lang === "ta" ? "விவரம்" : "Apply"}</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: BROWSE ALL SERVICES BY CATEGORY
            ========================================================================= */}
        <section
          aria-label="Browse All Services by Category"
          className="bg-white border-y border-slate-200 py-10 px-4 sm:px-6"
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-2 border-b border-slate-200 gap-2">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#087F8C]">
                  {lang === "ta" ? "14 முதன்மை சேவைப் பிரிவுகள்" : "14 Service Domains"}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {lang === "ta" ? "அனைத்து சேவைப் பிரிவுகள் (Directory)" : "Browse All Services by Category"}
                </h3>
              </div>
              <Link
                href="/services"
                className="text-xs font-bold text-[#173B63] hover:text-[#087F8C] inline-flex items-center gap-1"
              >
                <span>{lang === "ta" ? "முழு பட்டியல்" : "Service Master"}</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
              {INLINE_SERVICE_CATEGORIES.map((cat) => {
                const IconComp = iconMap[cat.iconName] || FileText;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setInlineCategoryTab(cat.id);
                      const el = document.getElementById("service-action-panel");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                      inlineCategoryTab === cat.id
                        ? "bg-[#173B63] text-white border-[#173B63] shadow-md"
                        : "bg-slate-50 hover:bg-[#E9F2F7] border-slate-200 text-slate-800"
                    }`}
                  >
                    <IconComp
                      className={`w-5 h-5 mb-2 ${
                        inlineCategoryTab === cat.id ? "text-amber-400" : "text-[#087F8C]"
                      }`}
                    />
                    <div>
                      <span className="font-extrabold text-xs block leading-tight">
                        {lang === "ta" ? cat.label_ta : cat.label_en}
                      </span>
                      <span
                        className={`text-[10px] mt-1 block font-medium ${
                          inlineCategoryTab === cat.id ? "text-slate-300" : "text-slate-500"
                        }`}
                      >
                        {cat.services.length} {lang === "ta" ? "சேவைகள்" : "Services"}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: SERVICE ACTION PANEL (INLINE DISCOVERY - AP BENCHMARK)
            ========================================================================= */}
        <section
          id="service-action-panel"
          aria-label="Service Action Panel"
          className="bg-[#E9F2F7] border-b border-slate-200 py-10 px-4 sm:px-6"
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-2 border-b border-slate-300 gap-2">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#087F8C]">
                  {lang === "ta" ? "நேரடி சேவை நடவடிக்கை பலகை (AP Pattern)" : "Inline Service Action Panel"}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <span>
                    {lang === "ta" ? currentInlineCategory.label_ta : currentInlineCategory.label_en}
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#173B63] text-white">
                    {currentInlineCategory.services.length} {lang === "ta" ? "சேவைகள்" : "Live Services"}
                  </span>
                </h3>
              </div>
              <p className="text-xs text-slate-600 font-medium">
                {lang === "ta"
                  ? "பக்கத்தை விட்டு வெளியேறாமல் நேரடியாக விண்ணப்பிக்கவும் அல்லது நிலையை அறியவும்."
                  : "Apply directly or track application without navigating away."}
              </p>
            </div>

            {/* Inline Service Action Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentInlineCategory.services.map((srv) => (
                <div
                  key={srv.id}
                  className="bg-white rounded-xl border border-slate-200 hover:border-[#173B63] p-4 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                        SLA: {lang === "ta" ? srv.sla_ta : srv.sla_en}
                      </span>
                      <span className="text-[10px] font-mono font-bold text-slate-600">
                        Fee: {lang === "ta" ? srv.fee_ta : srv.fee_en}
                      </span>
                    </div>

                    <h4 className="font-extrabold text-sm text-slate-900 leading-snug">
                      {lang === "ta" ? srv.name_ta : srv.name_en}
                    </h4>

                    <p className="text-[11px] text-slate-500 mt-1">
                      {lang === "ta" ? srv.dept_ta : srv.dept_en}
                    </p>
                  </div>

                  {/* Direct Actions: Apply + Track + Details */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <Link
                      href={srv.detail_url}
                      className="text-xs font-bold text-[#173B63] hover:text-[#087F8C]"
                    >
                      {lang === "ta" ? "விவரக்குறிப்பு" : "Checklist"}
                    </Link>

                    <div className="flex items-center gap-1.5">
                      {srv.track_url && (
                        <a
                          href={srv.track_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 text-xs font-bold rounded border border-slate-300 text-slate-700 hover:bg-slate-50"
                        >
                          {lang === "ta" ? "நிலை" : "Track"}
                        </a>
                      )}
                      <a
                        href={srv.apply_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 bg-[#173B63] hover:bg-[#0f2844] text-white rounded text-xs font-bold inline-flex items-center gap-1 transition-colors"
                      >
                        <span>{lang === "ta" ? "விண்ணப்பிக்க" : "Apply"}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: BROWSE BY LIFE SITUATION (UP BENCHMARK PATTERN)
            ========================================================================= */}
        <section
          aria-label="Browse by Life Situation"
          className="max-w-7xl mx-auto px-4 sm:px-6 py-10"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-2 border-b border-slate-200 gap-2">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#087F8C]">
                {lang === "ta" ? "வாழ்க்கை சூழல் வாரியான தேவைகள்" : "Life Situation Discovery"}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {lang === "ta" ? "குடிமக்கள் சூழல் வாரியாக நலத்திட்டங்கள்" : "Browse by Life Situation"}
              </h3>
            </div>
            <Link
              href="/schemes"
              className="text-xs font-bold text-[#173B63] hover:text-[#087F8C] inline-flex items-center gap-1"
            >
              <span>{lang === "ta" ? "அனைத்து நலத்திட்டங்கள்" : "View All Schemes"}</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {LIFE_SITUATIONS_DATA.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="p-4 rounded-xl border border-slate-200 bg-white hover:border-[#173B63] hover:shadow-sm transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <h4 className="font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-[#173B63]">
                      {lang === "ta" ? item.label_ta : item.label_en}
                    </h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-100 text-[#173B63]">
                      {item.count}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {lang === "ta" ? item.desc_ta : item.desc_en}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 text-xs font-bold text-[#087F8C] group-hover:text-[#173B63] flex items-center justify-between">
                  <span>{lang === "ta" ? "திட்டங்களை காண்க" : "Explore Entitlements"}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* =========================================================================
            SECTION 8: GOVERNMENT CONTACT DIRECTORY (P0 MODULE)
            ========================================================================= */}
        <section
          aria-label="Government Contact Directory"
          className="bg-white border-y border-slate-200 py-10 px-4 sm:px-6"
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-2 border-b border-slate-200 gap-2">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#087F8C]">
                  {lang === "ta" ? "அரசு தொடர்பு கையேடு (P0 Module)" : "Public Administration Directory"}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {lang === "ta" ? "அதிகாரிகள் மற்றும் துறைத் தொடர்புகள்" : "Government Contact Directory"}
                </h3>
              </div>
              <Link
                href="/contact-directory"
                className="text-xs font-bold text-[#173B63] hover:text-[#087F8C] inline-flex items-center gap-1"
              >
                <span>{lang === "ta" ? "முழு கையேடு தேடல்" : "Full Directory Search"}</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Quick Filter Search Input */}
            <div className="max-w-2xl mb-6">
              <div className="relative">
                <input
                  type="text"
                  value={dirSearchQuery}
                  onChange={(e) => setDirSearchQuery(e.target.value)}
                  placeholder={
                    lang === "ta"
                      ? "அதிகாரி பெயர், பதவி, துறை அல்லது மாவட்டத்தை உள்ளிடவும்..."
                      : "Search official by Name, Designation, Department, or District..."
                  }
                  className="w-full pl-10 pr-24 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#173B63]"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                <Link
                  href={`/contact-directory?q=${encodeURIComponent(dirSearchQuery)}`}
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-[#173B63] hover:bg-[#0f2844] text-white text-xs font-bold rounded-md flex items-center justify-center transition-colors"
                >
                  {lang === "ta" ? "தேடுக" : "Find"}
                </Link>
              </div>
            </div>

            {/* Quick Category Buttons for Directory */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { title_en: "Ministers", title_ta: "அமைச்சர்கள்", href: "/contact-directory?role=minister", icon: Users },
                { title_en: "Secretaries", title_ta: "அரசுச் செயலாளர்கள்", href: "/contact-directory?role=secretary", icon: Building2 },
                { title_en: "HoDs & Directors", title_ta: "துறைத் தலைவர்கள்", href: "/contact-directory?role=hod", icon: Award },
                { title_en: "District Collectors", title_ta: "மாவட்ட ஆட்சியர்கள்", href: "/contact-directory?designation=Collector", icon: MapPin },
                { title_en: "RTI Officers", title_ta: "RTI அலுவலர்கள்", href: "/contact-directory?role=rti", icon: FileText },
                { title_en: "Helplines", title_ta: "அவசர எண்கள்", href: "#emergency-help", icon: PhoneCall },
              ].map((item, idx) => {
                const IconComp = item.icon;
                return (
                  <Link
                    key={idx}
                    href={item.href}
                    className="p-3 bg-slate-50 hover:bg-sky-50 rounded-lg border border-slate-200 hover:border-[#173B63] transition-all flex items-center gap-2.5 shadow-2xs group"
                  >
                    <IconComp className="w-4 h-4 text-[#087F8C] group-hover:text-[#173B63] shrink-0" />
                    <span className="text-xs font-bold text-slate-800 group-hover:text-[#173B63] line-clamp-1">
                      {lang === "ta" ? item.title_ta : item.title_en}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 9: GOVERNMENT & ADMINISTRATION (THREE CONSTITUTIONAL PILLARS)
            ========================================================================= */}
        <section
          aria-label="Government and Administration"
          className="max-w-7xl mx-auto px-4 sm:px-6 py-10"
        >
          <div className="mb-6 pb-2 border-b border-slate-200">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#087F8C]">
              {lang === "ta" ? "அரசியலமைப்பு தூண்கள் (Telangana Pattern)" : "Constitutional Governance"}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {lang === "ta" ? "அரசு மற்றும் நிர்வாகக் கட்டமைப்பு" : "Government and Administration"}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CONSTITUTIONAL_PILLARS.map((pillar) => (
              <div
                key={pillar.id}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <h4 className="font-black text-base text-[#173B63] mb-2 border-b border-slate-100 pb-2">
                    {lang === "ta" ? pillar.title_ta : pillar.title_en}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {lang === "ta" ? pillar.desc_ta : pillar.desc_en}
                  </p>

                  <div className="space-y-2">
                    {pillar.leadership.map((lead, idx) => (
                      <div key={idx} className="p-2 rounded bg-slate-50 border border-slate-100 text-xs">
                        <span className="text-[10px] uppercase font-bold text-[#087F8C] block">
                          {lang === "ta" ? lead.role_ta : lead.role_en}
                        </span>
                        <span className="font-bold text-slate-800">
                          {lang === "ta" ? lead.name_ta : lead.name_en}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100">
                  <Link
                    href={pillar.link}
                    className="text-xs font-bold text-[#173B63] hover:text-[#087F8C] inline-flex items-center gap-1"
                  >
                    <span>{lang === "ta" ? "முழு கட்டமைப்பு" : "View Details"}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            SECTION 10: DEPARTMENTS AND DISTRICTS (38 DISTRICTS INTERACTIVE EXPLORER)
            ========================================================================= */}
        <section
          aria-label="Departments and Districts"
          className="bg-white border-y border-slate-200 py-10 px-4 sm:px-6"
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-2 border-b border-slate-200 gap-2">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#087F8C]">
                  {lang === "ta" ? "38 மாவட்டங்கள் & 45 துறைகள்" : "District Administration"}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {lang === "ta" ? "மாவட்டங்கள் மற்றும் நிர்வாக வழிகாட்டி" : "Departments and Districts Explorer"}
                </h3>
              </div>
              <Link
                href="/districts"
                className="text-xs font-bold text-[#173B63] hover:text-[#087F8C] inline-flex items-center gap-1"
              >
                <span>{lang === "ta" ? "அனைத்து மாவட்ட பக்கங்கள்" : "All District Portals"}</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-slate-50 rounded-xl border border-slate-200 p-5 shadow-2xs grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              {/* District Selector Dropdown */}
              <div className="space-y-2">
                <label htmlFor="final-district-select" className="block text-xs font-bold text-slate-700">
                  {lang === "ta" ? "உங்கள் மாவட்டத்தைத் தேர்ந்தெடுக்கவும்:" : "Select your District:"}
                </label>
                <select
                  id="final-district-select"
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#173B63]"
                >
                  {TN_DISTRICTS_LIST.map((dist) => (
                    <option key={dist.id} value={dist.id}>
                      {lang === "ta" ? dist.name_ta : dist.name_en}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-slate-500">
                  {lang === "ta"
                    ? "மாவட்ட ஆட்சியரக தொடர்பு மற்றும் இணையதள விவரங்களை உடனடியாக அறியலாம்."
                    : "Instant Collectorate phone, email, and NIC portal access."}
                </p>
              </div>

              {/* District Live Details Card */}
              <div className="md:col-span-2 p-4 bg-white rounded-lg border border-sky-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#173B63] text-white">
                    {currentDistrictData.id}
                  </span>
                  <h4 className="text-base sm:text-lg font-black text-slate-900">
                    {lang === "ta" ? currentDistrictData.name_ta : currentDistrictData.name_en}{" "}
                    <span className="text-xs font-semibold text-slate-600">
                      ({lang === "ta" ? currentDistrictData.hq_ta : currentDistrictData.hq_en} HQ)
                    </span>
                  </h4>
                  <p className="text-xs text-slate-700 font-medium">{currentDistrictData.collector_en}</p>
                  <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
                    <span className="flex items-center gap-1 font-mono font-bold text-[#173B63]">
                      <PhoneCall className="w-3.5 h-3.5 text-[#087F8C]" />
                      <a href={`tel:${currentDistrictData.phone}`}>{currentDistrictData.phone}</a>
                    </span>
                    <span className="text-slate-400">|</span>
                    <span className="font-mono text-slate-600">{currentDistrictData.email}</span>
                  </div>
                </div>

                <a
                  href={currentDistrictData.portal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#173B63] hover:bg-[#0f2844] text-white font-bold text-xs rounded-lg transition-colors inline-flex items-center gap-1 shrink-0"
                >
                  <span>{lang === "ta" ? "மாவட்ட இணையதளம்" : "District Portal"}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: GOVERNMENT ORDERS AND DOCUMENTS
            ========================================================================= */}
        <section
          aria-label="Government Orders and Documents"
          className="max-w-7xl mx-auto px-4 sm:px-6 py-10"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-2 border-b border-slate-200 gap-2">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#087F8C]">
                {lang === "ta" ? "அரசாணைகள் & அறிவிப்புகள்" : "Orders & Notice Board"}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {lang === "ta" ? "சமீபத்திய அரசாணைகள் & ஆவணங்கள்" : "Government Orders and Documents"}
              </h3>
            </div>
            <Link
              href="/documents"
              className="text-xs font-bold text-[#173B63] hover:text-[#087F8C] inline-flex items-center gap-1"
            >
              <span>{lang === "ta" ? "அனைத்து ஆவணங்கள்" : "Document Archive"}</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Notice Board Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto border-b border-slate-200 pb-2 mb-4">
            {[
              { id: "gos", label_en: "Government Orders", label_ta: "அரசாணைகள் (G.O.)" },
              { id: "notifications", label_en: "Notifications", label_ta: "அறிவிக்கைகள்" },
              { id: "circulars", label_en: "Circulars", label_ta: "சுற்றறிக்கைகள்" },
              { id: "tenders", label_en: "Tenders", label_ta: "ஒப்பந்தப்புள்ளிகள்" },
              { id: "recruitment", label_en: "Recruitment", label_ta: "வேலைவாய்ப்பு அறிவிப்புகள்" },
              { id: "announcements", label_en: "Announcements", label_ta: "செய்திக்குறிப்புகள்" },
            ].map((tab) => {
              const isSelected = selectedNoticeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedNoticeTab(tab.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors border ${
                    isSelected
                      ? "bg-[#173B63] text-white border-[#173B63]"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {lang === "ta" ? tab.label_ta : tab.label_en}
                </button>
              );
            })}
          </div>

          {/* Tab Content Display */}
          <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl bg-slate-50/50 overflow-hidden">
            {NOTICE_BOARD_DATA[selectedNoticeTab].map((item: any) => (
              <div
                key={item.id}
                className="p-4 bg-white hover:bg-sky-50/40 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-sky-100 text-[#173B63]">
                      {item.number}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      {lang === "ta" ? item.dept_ta : item.dept_en}
                    </span>
                  </div>
                  <p className="font-bold text-xs sm:text-sm text-slate-900 leading-snug">
                    {lang === "ta" ? item.title_ta : item.title_en}
                  </p>
                </div>

                <div className="flex items-center gap-4 shrink-0 text-xs">
                  <span className="text-slate-400 font-mono text-[11px]">{item.date}</span>
                  {item.isExternal ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#E9F2F7] hover:bg-[#173B63] text-[#173B63] hover:text-white font-bold transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{item.size || "Portal"}</span>
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#E9F2F7] hover:bg-[#173B63] text-[#173B63] hover:text-white font-bold transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{item.size || "Download"}</span>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            SECTION 12: E-GOVERNANCE PORTAL DIRECTORY
            ========================================================================= */}
        <section
          id="egov-portals"
          aria-label="e-Governance Portal Directory"
          className="bg-[#E9F2F7] border-y border-slate-200 py-10 px-4 sm:px-6"
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-2 border-b border-slate-300 gap-2">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#087F8C]">
                  {lang === "ta" ? "டிஜிட்டல் தமிழ்நாடு" : "Digital Tamil Nadu"}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {lang === "ta" ? "முக்கிய மின்-ஆளுமை இணையதளங்கள்" : "e-Governance Portal Directory"}
                </h3>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                {lang === "ta" ? "சரிபார்க்கப்பட்ட அதிகாரப்பூர்வ தளங்கள்" : "Verified Official Gateways"}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {E_GOVERNANCE_PORTALS.map((portal) => (
                <div
                  key={portal.id}
                  className="bg-white rounded-xl border border-slate-200 hover:border-[#173B63] p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-100 text-[#173B63]">
                        {lang === "ta" ? portal.category_ta : portal.category_en}
                      </span>
                      <span className="text-[10px] text-slate-400 font-semibold">TNeGA / NIC</span>
                    </div>

                    <h4 className="font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-[#173B63]">
                      {lang === "ta" ? portal.name_ta : portal.name_en}
                    </h4>

                    <p className="text-[11px] font-medium text-[#087F8C] mt-0.5">
                      {lang === "ta" ? portal.dept_ta : portal.dept_en}
                    </p>

                    <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                      {lang === "ta" ? portal.description_ta : portal.description_en}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-slate-400">
                      {new URL(portal.url).hostname}
                    </span>
                    <a
                      href={portal.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1 bg-[#E9F2F7] hover:bg-[#173B63] text-[#173B63] hover:text-white rounded-md text-xs font-bold transition-colors"
                    >
                      <span>{lang === "ta" ? "தளத்திற்கு செல்க" : "Visit Portal"}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 13: SCHEMES AND BENEFITS
            ========================================================================= */}
        <section
          aria-label="Schemes and Benefits"
          className="max-w-7xl mx-auto px-4 sm:px-6 py-10"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-2 border-b border-slate-200 gap-2">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#087F8C]">
                {lang === "ta" ? "அரசு நலத்திட்டங்கள் & உதவிகள்" : "Welfare & Social Security"}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {lang === "ta" ? "முக்கிய அரசு நலத்திட்டங்கள்" : "Schemes and Benefits"}
              </h3>
            </div>
            <Link
              href="/schemes"
              className="text-xs font-bold text-[#173B63] hover:text-[#087F8C] inline-flex items-center gap-1"
            >
              <span>{lang === "ta" ? "அனைத்து திட்டங்கள்" : "All Welfare Schemes"}</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title_en: "Kalaignar Magalir Urimai Thittam", title_ta: "கலைஞர் மகளிர் உரிமைத் திட்டம்", amount: "₹1,000 / month", dept: "Special Programme Impl.", href: "/schemes" },
              { title_en: "Pudhumai Penn Scheme", title_ta: "புதுமைப் பெண் திட்டம்", amount: "₹1,000 / month", dept: "Higher Education", href: "/schemes" },
              { title_en: "Tamil Pudhalvan Thittam", title_ta: "தமிழ்ப் புதல்வன் திட்டம்", amount: "₹1,000 / month", dept: "Social Welfare", href: "/schemes" },
              { title_en: "Chief Minister Comprehensive Health Insurance", title_ta: "முதலமைச்சர் விரிவான மருத்துவக் காப்பீடு", amount: "₹5 Lakhs / year", dept: "Health & Family Welfare", href: "/schemes" },
            ].map((sch, idx) => (
              <div key={idx} className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 mb-2 inline-block">
                    {sch.amount}
                  </span>
                  <h4 className="font-extrabold text-sm text-slate-900">
                    {lang === "ta" ? sch.title_ta : sch.title_en}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1">{sch.dept}</p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-100">
                  <Link href={sch.href} className="text-xs font-bold text-[#173B63] hover:text-[#087F8C] inline-flex items-center gap-1">
                    <span>{lang === "ta" ? "விவரம்" : "Eligibility"}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            SECTION 14: ANNOUNCEMENTS AND RECRUITMENT
            ========================================================================= */}
        <section
          id="announcements"
          aria-label="Announcements and Recruitment"
          className="bg-white border-y border-slate-200 py-10 px-4 sm:px-6"
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-2 border-b border-slate-200 gap-2">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#087F8C]">
                  {lang === "ta" ? "செய்திகள் & ஆட்சேர்ப்பு" : "Updates & Jobs"}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {lang === "ta" ? "அரசு செய்திகள் மற்றும் வேலைவாய்ப்பு அறிவிப்புகள்" : "Announcements and Recruitment"}
                </h3>
              </div>
              <a
                href="https://www.tnpsc.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-[#173B63] hover:text-[#087F8C] inline-flex items-center gap-1"
              >
                <span>{lang === "ta" ? "டிஎன்பிஎஸ்சி தளம்" : "TNPSC Portal"}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-[#173B63]">
                  TNPSC Recruitment
                </span>
                <h4 className="font-bold text-sm text-slate-900">
                  Combined Civil Services Examination - Group II & IIA (1,240 Posts)
                </h4>
                <p className="text-xs text-slate-600">
                  Online applications invited for Assistant Section Officer, Sub-Registrar, and Municipal Executive Officer posts.
                </p>
                <div className="pt-2 text-xs">
                  <a href="https://www.tnpsc.gov.in/" target="_blank" rel="noopener noreferrer" className="font-bold text-[#173B63] hover:underline">
                    View Recruitment Notification →
                  </a>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                  DIPR Press Release
                </span>
                <h4 className="font-bold text-sm text-slate-900">
                  State Disaster Relief Authority weather alert and advisory for coastal districts
                </h4>
                <p className="text-xs text-slate-600">
                  Fishermen advised not to venture into deep sea. 24x7 district control rooms established.
                </p>
                <div className="pt-2 text-xs">
                  <a href="/documents" className="font-bold text-[#173B63] hover:underline">
                    Read Official Advisory →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 15: TOURISM AND CULTURE
            ========================================================================= */}
        <section
          id="tourism"
          aria-label="Tourism and Culture"
          className="max-w-7xl mx-auto px-4 sm:px-6 py-10"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-2 border-b border-slate-200 gap-2">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#087F8C]">
                {lang === "ta" ? "கலாச்சாரம் & பாரம்பரியம்" : "Heritage & Tourism"}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {lang === "ta" ? "தமிழ்நாடு சுற்றுலா & வரலாற்றுச் சிறப்புமிக்க இடங்கள்" : "Tourism and Culture"}
              </h3>
            </div>
            <a
              href="https://www.tamilnadutourism.tn.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-[#173B63] hover:text-[#087F8C] inline-flex items-center gap-1"
            >
              <span>{lang === "ta" ? "TTDC சுற்றுலா தளம்" : "Official TTDC Portal"}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TOURISM_HIGHLIGHTS.map((spot) => (
              <div
                key={spot.id}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200 mb-2 inline-block">
                    {spot.badge}
                  </span>
                  <h4 className="font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-[#173B63]">
                    {lang === "ta" ? spot.title_ta : spot.title_en}
                  </h4>
                  <p className="text-[11px] font-semibold text-[#087F8C] mt-0.5">
                    {lang === "ta" ? spot.location_ta : spot.location_en}
                  </p>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    {lang === "ta" ? spot.description_ta : spot.description_en}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200">
                  <a
                    href={spot.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-[#173B63] hover:text-[#087F8C] inline-flex items-center gap-1"
                  >
                    <span>{lang === "ta" ? "சுற்றுலா விவரம்" : "Explore Spot"}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            SECTION 16: EMERGENCY AND GRIEVANCE HELP (24x7 HELPLINES)
            ========================================================================= */}
        <section
          id="emergency-help"
          aria-label="Emergency and Grievance Help"
          className="bg-white border-t border-slate-200 py-10 px-4 sm:px-6"
        >
          <div className="max-w-7xl mx-auto">
            <div className="mb-6 pb-2 border-b border-slate-200">
              <span className="text-xs font-extrabold uppercase tracking-wider text-red-600">
                {lang === "ta" ? "அவசர உதவி & குறைதீர்ப்பு" : "24x7 Assistance"}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {lang === "ta" ? "அரசு அவசர உதவி எண்கள் & பொது மக்கள் குறைதீர்ப்பு" : "Emergency and Grievance Help"}
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {EMERGENCY_HELPLINES.map((hl) => {
                const IconComp = iconMap[hl.icon] || PhoneCall;
                return (
                  <div
                    key={hl.id}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <IconComp className="w-5 h-5 text-red-600" />
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-100 text-red-700">
                          24x7
                        </span>
                      </div>
                      <h4 className="font-extrabold text-xs sm:text-sm text-slate-900">
                        {lang === "ta" ? hl.title_ta : hl.title_en}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {lang === "ta" ? hl.desc_ta : hl.desc_en}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-200">
                      <a
                        href={`tel:${hl.number}`}
                        className="font-mono text-base font-black text-[#173B63] hover:text-red-700 block tracking-wider"
                      >
                        {hl.number}
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* =========================================================================
          SECTION 17: COMPREHENSIVE FOOTER & SITEMAP
          ========================================================================= */}
      <FooterSitemap lang={lang} />
    </div>
  );
}
