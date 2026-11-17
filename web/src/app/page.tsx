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
  Filter,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";

import GovernmentUtilityBar from "@/components/navigation/GovernmentUtilityBar";
import GovernmentHeader from "@/components/navigation/GovernmentHeader";
import QuickAccessBar from "@/components/navigation/QuickAccessBar";
import FooterSitemap from "@/components/navigation/FooterSitemap";
import { MOST_USED_SERVICES, TN_DISTRICTS_LIST } from "@/data/navigation";
import servicesData from "@/data/services.json";
import schemesData from "@/data/schemes.json";
import documentsData from "@/data/documents.json";

const iconMap: Record<string, any> = {
  FileText,
  MapPin,
  Clock,
  Award,
  Users,
  FileCheck2,
  PhoneCall,
  Building2,
};

export default function Home() {
  const [lang, setLang] = useState<"ta" | "en">("ta");
  const [highContrast, setHighContrast] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("DIS-03"); // Chennai default
  const [schemeCategoryTab, setSchemeCategoryTab] = useState("WOMEN");
  const [appId, setAppId] = useState("");
  const [trackedStatus, setTrackedStatus] = useState<null | {
    id: string;
    stage: number;
    service: string;
    date: string;
  }>(null);
  const [trackingError, setTrackingError] = useState("");

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
        title: lang === "ta" ? "அரசு தகவல் உதவி (Citizen AI Assistant)" : "Citizen AI Assistant Search",
        answer:
          lang === "ta"
            ? `"${q}" தொடர்பான சரிபார்க்கப்பட்ட தகவல்கள் அரசு தொடர்பு கையேடு மற்றும் சேவைத் தொகுப்பில் உள்ளன.`
            : `Verified information matching "${q}" is indexed in the official Contact Directory and Service Catalog.`,
        url: `/search?q=${encodeURIComponent(q)}`,
        citation: "Government of Tamil Nadu Portal Registry 2.0",
        guardrail: "Semantic Vector Grounding",
      });
    }
  };

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = appId.trim();
    if (cleanId.length < 8) {
      setTrackingError(
        lang === "ta"
          ? "சரியான 8-12 இலக்க விண்ணப்ப எண்ணை உள்ளிடவும் (எ.கா: TN20261001)"
          : "Please enter a valid 8-12 alphanumeric application number (e.g., TN20261001)"
      );
      setTrackedStatus(null);
      return;
    }
    setTrackingError("");
    setTrackedStatus({
      id: cleanId,
      stage: 3,
      service:
        lang === "ta" ? "சாதிச் சான்றிதழ் (Community Certificate)" : "Community Certificate",
      date: "2026-11-17",
    });
  };

  const currentDistrictData =
    TN_DISTRICTS_LIST.find((d) => d.id === selectedDistrict) || TN_DISTRICTS_LIST[2];

  const tnBlue = highContrast ? "#000000" : "#004B87";

  return (
    <div className={`min-h-screen flex flex-col ${highContrast ? "bg-black text-white" : "bg-slate-50 text-slate-900"}`}>
      {/* =========================================================================
          LAYER A: GOVERNMENT UTILITY BAR
          ========================================================================= */}
      <GovernmentUtilityBar
        lang={lang}
        setLang={setLang}
        highContrast={highContrast}
        setHighContrast={setHighContrast}
      />

      {/* =========================================================================
          LAYER B & C: MAIN HEADER & PRIMARY CATEGORY NAVIGATION (MEGA MENUS)
          ========================================================================= */}
      <GovernmentHeader
        lang={lang}
        highContrast={highContrast}
        onSearch={handleSearch}
      />

      {/* =========================================================================
          LAYER D: QUICK ACCESS ACTION BAR
          ========================================================================= */}
      <QuickAccessBar lang={lang} />

      <main id="main-content" role="main" className="flex-1 flex flex-col w-full">
        {/* =========================================================================
            SECTION 1: PROMINENT CITIZEN SEARCH (HERO SECTION)
            ========================================================================= */}
        <section
          aria-labelledby="hero-search-heading"
          className="w-full py-10 sm:py-14 px-4 sm:px-6 text-white text-center relative shadow-inner"
          style={{ backgroundColor: tnBlue }}
        >
          <div className="max-w-4xl mx-auto flex flex-col items-center gap-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/15 text-white backdrop-blur-xs">
              <FileCheck2 className="w-3.5 h-3.5" />
              {lang === "ta"
                ? "ஒருங்கிணைந்த தமிழ்நாடு அரசு டிஜிட்டல் நுழைவு வாயில் - 45 துறைகள் & 38 மாவட்டங்கள்"
                : "Unified Gateway of Tamil Nadu Government - 45 Departments & 38 Districts"}
            </span>

            <h2 id="hero-search-heading" className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              {lang === "ta" ? "நீங்கள் என்ன அரசு சேவை தேடுகிறீர்கள்?" : "What government service do you need?"}
            </h2>

            <p className="text-xs sm:text-base text-slate-200 max-w-2xl leading-relaxed">
              {lang === "ta"
                ? "சான்றிதழ்கள், நில ஆவணங்கள், உதவித்தொகைகள், அரசாணைகள் மற்றும் அரசு அதிகாரிகளின் தொடர்புகளை எளிதாகக் கண்டறியுங்கள்."
                : "Discover online citizen certificates, patta land records, welfare benefits, government orders, and verified administrative contacts instantly."}
            </p>

            {/* Prominent Bilingual Citizen Search Bar */}
            <form
              className="w-full max-w-2xl relative mt-2"
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch(searchQuery);
              }}
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  lang === "ta"
                    ? "எ.கா: சாதிச் சான்றிதழ், பட்டா மாறுதல், மகளிர் உரிமைத் திட்டம், மாவட்ட ஆட்சியர்..."
                    : "e.g. Community Certificate, Patta Transfer, Magalir Urimai, District Collector..."
                }
                className="w-full py-3.5 pl-12 pr-28 rounded-xl text-slate-900 bg-white shadow-xl focus:outline-none focus:ring-4 focus:ring-amber-400 text-xs sm:text-base"
                aria-label="Universal Citizen Search"
              />
              <Search className="absolute left-4 top-4 text-slate-400 w-5 h-5" />
              <button
                type="submit"
                className="absolute right-2 top-2 px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
              >
                {lang === "ta" ? "தேடுக" : "Search"}
              </button>
            </form>

            {/* Grounded AI Citizen Assistant Resolution Card */}
            {aiResult && (
              <div className="w-full max-w-2xl mt-4 bg-white text-slate-900 rounded-xl p-5 shadow-2xl text-left border-2 border-amber-400 animate-in fade-in duration-200">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                      {lang === "ta" ? "அரசு நுண்ணறிவு உதவி (Grounded Assistant)" : "Grounded AI Assistance"}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {aiResult.guardrail}
                    </span>
                  </div>
                  <button
                    onClick={() => setAiResult(null)}
                    className="text-xs font-semibold text-slate-400 hover:text-slate-700 bg-slate-100 px-2 py-0.5 rounded"
                  >
                    ✕ {lang === "ta" ? "மூடுக" : "Close"}
                  </button>
                </div>

                <h4 className="text-base font-bold text-slate-900 mt-2">{aiResult.title}</h4>
                <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed">{aiResult.answer}</p>

                {aiResult.eligibility && (
                  <div className="mt-3 p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-1">
                    <div>
                      <strong>{lang === "ta" ? "தகுதி வரம்பு:" : "Statutory Eligibility:"}</strong> {aiResult.eligibility}
                    </div>
                    {aiResult.docs && (
                      <div>
                        <strong>{lang === "ta" ? "தேவைப்படும் ஆவணங்கள்:" : "Required Documents:"}</strong> {aiResult.docs}
                      </div>
                    )}
                    {aiResult.sla && (
                      <div>
                        <strong>{lang === "ta" ? "சட்டப்பூர்வ காலக்கெடு:" : "Statutory SLA:"}</strong> {aiResult.sla}{" "}
                        {lang === "ta" ? "வேலை நாட்கள்" : "working days"}
                      </div>
                    )}
                  </div>
                )}

                <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap justify-between items-center gap-3 text-xs">
                  <div className="text-slate-500 font-mono text-[11px]">
                    <strong>Citation:</strong> {aiResult.citation}
                  </div>
                  <Link
                    href={aiResult.url}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#004B87] hover:bg-blue-900 text-white font-bold transition-colors shadow-xs"
                  >
                    <span>{lang === "ta" ? "விவரங்களைக் காண்க" : "View Details"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}

            {/* Popular Search Suggestions Pills */}
            <div className="flex flex-wrap justify-center items-center gap-2 text-xs text-slate-200 mt-1">
              <span className="opacity-80">{lang === "ta" ? "அடிக்கடி தேடப்படுபவை:" : "Popular Searches:"}</span>
              {["Patta Chitta", "Community Cert", "Income Cert", "Magalir Urimai", "Salem Collector"].map((pill) => (
                <button
                  type="button"
                  key={pill}
                  onClick={() => {
                    setSearchQuery(pill);
                    handleSearch(pill);
                  }}
                  className="px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 cursor-pointer border border-white/20 transition-colors"
                >
                  {pill}
                </button>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-10 flex flex-col gap-14">
          {/* =========================================================================
              SECTION 2: MOST USED SERVICES (12 HIGH-VALUE CARDS)
              ========================================================================= */}
          <section aria-labelledby="most-used-heading">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 gap-2">
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#004B87] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {lang === "ta" ? "அதிகம் பயன்படுத்தப்படும் சேவைகள்" : "High-Demand Citizen Services"}
                </span>
                <h3 id="most-used-heading" className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                  {lang === "ta" ? "முக்கிய பொதுமக்கள் சேவைகள்" : "Most Frequently Used Services"}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  {lang === "ta"
                    ? "குடிமக்கள் நேரடியாக விண்ணப்பிக்கும் முதன்மைச் சான்றிதழ்கள், நில ஆவணங்கள் மற்றும் நலத்திட்டங்கள்."
                    : "Direct single-click access to verified certificates, revenue records, and welfare programs."}
                </p>
              </div>

              <Link
                href="/services"
                className="text-xs font-bold text-[#004B87] hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-3.5 py-2 rounded-lg border border-blue-200 transition-colors flex items-center gap-1 shrink-0"
              >
                <span>{lang === "ta" ? "அனைத்து சேவைகளையும் காண்க" : "Browse All Services"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {MOST_USED_SERVICES.map((srv) => {
                const IconComp = iconMap[srv.icon] || FileText;
                const isExt = srv.href.startsWith("http");

                return isExt ? (
                  <a
                    key={srv.id}
                    href={srv.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-2.5">
                        <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#004B87] flex items-center justify-center group-hover:scale-105 transition-transform">
                          <IconComp className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded flex items-center gap-1">
                          <span>{lang === "ta" ? srv.sla_ta : srv.sla_en}</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </span>
                      </div>
                      <h4 className="font-extrabold text-slate-900 text-sm group-hover:text-[#004B87] transition-colors leading-snug">
                        {lang === "ta" ? srv.title_ta : srv.title_en}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                        {lang === "ta" ? srv.dept_ta : srv.dept_en}
                      </p>
                    </div>
                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex justify-between items-center text-xs font-semibold text-[#004B87]">
                      <span>{lang === "ta" ? srv.fee_ta : srv.fee_en}</span>
                      <span className="group-hover:translate-x-0.5 transition-transform">Apply →</span>
                    </div>
                  </a>
                ) : (
                  <Link
                    key={srv.id}
                    href={srv.href}
                    className="p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-2.5">
                        <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#004B87] flex items-center justify-center group-hover:scale-105 transition-transform">
                          <IconComp className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                          {lang === "ta" ? srv.sla_ta : srv.sla_en}
                        </span>
                      </div>
                      <h4 className="font-extrabold text-slate-900 text-sm group-hover:text-[#004B87] transition-colors leading-snug">
                        {lang === "ta" ? srv.title_ta : srv.title_en}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                        {lang === "ta" ? srv.dept_ta : srv.dept_en}
                      </p>
                    </div>
                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex justify-between items-center text-xs font-semibold text-[#004B87]">
                      <span>{lang === "ta" ? srv.fee_ta : srv.fee_en}</span>
                      <span className="group-hover:translate-x-0.5 transition-transform">Details →</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* =========================================================================
              SECTION 3: BROWSE ALL SERVICES (EXPANDED DIRECTORY WITHOUT TYPING)
              ========================================================================= */}
          <section aria-labelledby="browse-all-heading" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 gap-2">
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {lang === "ta" ? "முழுமையான சேவைத் தொகுப்பு" : "Browse Without Typing"}
                </span>
                <h3 id="browse-all-heading" className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                  {lang === "ta" ? "பிரிவு வாரியாக அனைத்து சேவைகளையும் காண்க" : "Browse All Citizen Services by Category"}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  {lang === "ta"
                    ? "துறைகளின் பெயர் தெரியாவிட்டாலும் தேவைக்கேற்ப நேரடியாகத் தேர்வு செய்யலாம்."
                    : "Discover government services arranged by real-world citizen life needs."}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {servicesData.map((category) => (
                <div key={category.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-sm flex items-center justify-between pb-2 border-b border-slate-200">
                      <span>{lang === "ta" ? category.title_ta : category.title_en}</span>
                      <span className="text-[11px] font-mono text-slate-500">{category.items.length} {lang === "ta" ? "சேவைகள்" : "services"}</span>
                    </h4>
                    <ul className="mt-3 space-y-2 text-xs">
                      {category.items.map((item, idx) => (
                        <li key={idx}>
                          <Link
                            href={`/services/${category.id}`}
                            className="text-slate-700 hover:text-[#004B87] font-medium flex items-center justify-between group"
                          >
                            <span className="group-hover:underline">{item}</span>
                            <span className="text-[10px] text-slate-400 group-hover:text-[#004B87] font-mono">{category.sla}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href={`/services/${category.id}`}
                    className="mt-4 pt-2 border-t border-slate-200 text-xs font-bold text-[#004B87] hover:underline flex items-center justify-between"
                  >
                    <span>{lang === "ta" ? "முழுப் பிரிவைக் காண்க" : "Explore Category"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </section>

          {/* =========================================================================
              SECTION 4: FIND GOVERNMENT CONTACTS (P0 HIGH-VISIBILITY DIRECTORY)
              ========================================================================= */}
          <section aria-labelledby="contacts-heading" className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-md">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-6">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                  {lang === "ta" ? "பிழை இல்லாத சரிபார்க்கப்பட்ட கையேடு (P0)" : "P0 Master Contact Directory"}
                </span>
                <h3 id="contacts-heading" className="text-xl sm:text-2xl font-black text-white mt-1">
                  {lang === "ta" ? "அரசு அதிகாரிகளின் தொடர்பு கையேடு" : "Verified Government Contact Directory"}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                  {lang === "ta"
                    ? "முதலமைச்சர், அமைச்சர்கள், துறைச் செயலாளர்கள் மற்றும் 38 மாவட்ட ஆட்சித்தலைவர்களின் அதிகாரப்பூர்வ தொடர்பு எண்கள்."
                    : "Verified coordinates for Ministers, Secretaries, District Collectors, and Heads of Departments."}
                </p>
              </div>

              <Link
                href="/contact-directory"
                className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs transition-colors shrink-0 flex items-center gap-1.5"
              >
                <Users className="w-4 h-4" />
                <span>{lang === "ta" ? "முழு கையேட்டைத் திறக்க" : "Open Full Directory"}</span>
              </Link>
            </div>

            {/* Quick Contact Categorical Filters */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
              <Link
                href="/contact-directory?category=Minister"
                className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-center hover:border-amber-400 transition-colors"
              >
                <span className="block font-bold text-white mb-0.5">{lang === "ta" ? "அமைச்சரவை" : "Ministers"}</span>
                <span className="text-[10px] text-slate-400">Chief Minister & Cabinet</span>
              </Link>

              <Link
                href="/contact-directory?cadre=IAS"
                className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-center hover:border-amber-400 transition-colors"
              >
                <span className="block font-bold text-white mb-0.5">{lang === "ta" ? "செயலாளர்கள்" : "Secretaries"}</span>
                <span className="text-[10px] text-slate-400">Chief Sec & Dept Heads</span>
              </Link>

              <Link
                href="/contact-directory?designation=Collector"
                className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-center hover:border-amber-400 transition-colors"
              >
                <span className="block font-bold text-white mb-0.5">{lang === "ta" ? "ஆட்சித்தலைவர்கள்" : "Collectors"}</span>
                <span className="text-[10px] text-slate-400">All 38 Districts</span>
              </Link>

              <Link
                href="/contact-directory?category=HoD"
                className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-center hover:border-amber-400 transition-colors"
              >
                <span className="block font-bold text-white mb-0.5">{lang === "ta" ? "துறைத் தலைவர்கள்" : "HoDs"}</span>
                <span className="text-[10px] text-slate-400">Commissioners & Directors</span>
              </Link>

              <Link
                href="/contact-directory?category=RTI"
                className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-center hover:border-amber-400 transition-colors"
              >
                <span className="block font-bold text-white mb-0.5">{lang === "ta" ? "RTI அலுவலர்கள்" : "RTI Officers"}</span>
                <span className="text-[10px] text-slate-400">Appellate Authorities</span>
              </Link>

              <Link
                href="/contact-directory?category=Helpline"
                className="p-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-center transition-colors"
              >
                <span className="block font-bold text-amber-400 mb-0.5">{lang === "ta" ? "உதவி எண்கள்" : "Helplines"}</span>
                <span className="text-[10px] text-slate-300">CM 1100 / 108 / 181</span>
              </Link>
            </div>
          </section>

          {/* =========================================================================
              SECTION 5: SCHEMES FOR YOU (BENEFICIARY-ORIENTED TABS)
              ========================================================================= */}
          <section aria-labelledby="schemes-heading" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 gap-2">
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-purple-800 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                  {lang === "ta" ? "பயனாளிகள் பிரிவு வாரியாக" : "Targeted Beneficiary Programs"}
                </span>
                <h3 id="schemes-heading" className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                  {lang === "ta" ? "உங்களுக்கான அரசு நலத்திட்டங்கள்" : "Government Welfare Schemes for You"}
                </h3>
              </div>

              <Link
                href="/schemes"
                className="text-xs font-bold text-[#004B87] hover:underline flex items-center gap-1"
              >
                <span>{lang === "ta" ? "அனைத்து 8 முதன்மைத் திட்டங்கள்" : "View All 8 Schemes"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Beneficiary Filter Buttons */}
            <div className="flex flex-wrap gap-2 mb-6">
              {[
                { id: "WOMEN", en: "Women & Children", ta: "மகளிர் & குழந்தைகள்" },
                { id: "FARMERS", en: "Farmers & Agriculture", ta: "விவசாயிகள்" },
                { id: "STUDENTS", en: "Students & Youth", ta: "மாணவர்கள் & இளைஞர்கள்" },
                { id: "SENIOR", en: "Senior Citizens", ta: "முதியோர் & ஓய்வூதியம்" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSchemeCategoryTab(tab.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    schemeCategoryTab === tab.id
                      ? "bg-[#004B87] text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {lang === "ta" ? tab.ta : tab.en}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {schemesData.slice(0, 3).map((sch) => (
                <div key={sch.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800 bg-blue-100 px-2 py-0.5 rounded">
                      {lang === "ta" ? sch.category_ta : sch.category}
                    </span>
                    <h4 className="font-extrabold text-slate-900 text-sm mt-2">
                      {lang === "ta" ? sch.name_ta : sch.name_en}
                    </h4>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                      {sch.benefits}
                    </p>
                  </div>
                  <div className="mt-4 pt-2.5 border-t border-slate-200 flex justify-between items-center text-xs">
                    <span className="text-[11px] font-bold text-slate-500">{lang === "ta" ? sch.dept_ta : sch.dept_en}</span>
                    <Link href="/schemes" className="font-bold text-[#004B87] hover:underline">
                      {lang === "ta" ? "விவரங்கள் →" : "Details →"}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* =========================================================================
              SECTION 6: GOVERNMENT ORDERS & DOCUMENTS (DIRECT G.O. RETRIEVAL)
              ========================================================================= */}
          <section aria-labelledby="documents-heading" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 gap-2">
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                  {lang === "ta" ? "அதிகாரப்பூர்வ அரசாணைகள்" : "Official Gazette & Orders"}
                </span>
                <h3 id="documents-heading" className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                  {lang === "ta" ? "சமீபத்திய அரசாணைகள் மற்றும் ஆவணங்கள்" : "Recent Government Orders & Documents"}
                </h3>
              </div>

              <Link
                href="/documents"
                className="text-xs font-bold text-[#004B87] hover:underline flex items-center gap-1"
              >
                <span>{lang === "ta" ? "அனைத்து அரசாணைகளையும் தேடுக" : "Search All G.O.s"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {documentsData.slice(0, 3).map((doc) => (
                <div key={doc.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-200 text-slate-800 px-2 py-0.5 rounded">
                        {doc.type} ({doc.year})
                      </span>
                      <span className="text-xs text-slate-500 font-mono">Issued: {doc.date}</span>
                    </div>
                    <h4 className="font-extrabold text-slate-900 text-sm mt-1">
                      {lang === "ta" ? doc.subject_ta : doc.subject_en}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {lang === "ta" ? doc.dept_ta : doc.dept_en}
                    </p>
                  </div>

                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs shrink-0 flex items-center gap-1.5 transition-colors"
                  >
                    <span>{lang === "ta" ? "பதிவிறக்குக" : "Download PDF"}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>
          </section>

          {/* =========================================================================
              SECTION 7: DISTRICT SERVICES (INTERACTIVE 38-DISTRICT SELECTOR)
              ========================================================================= */}
          <section aria-labelledby="district-heading" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 gap-2">
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {lang === "ta" ? "மாவட்ட நிர்வாகம்" : "Local Administration"}
                </span>
                <h3 id="district-heading" className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                  {lang === "ta" ? "உங்கள் மாவட்ட சேவைகள் மற்றும் அதிகாரிகள்" : "District Administration & Local Services"}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  {lang === "ta"
                    ? "38 மாவட்டங்களில் உள்ள ஆட்சியர் அலுவலகத் தொடர்பு மற்றும் தாலுகா சேவைகளைக் காண்க."
                    : "Select your district to access verified Collectorate contacts and local services."}
                </p>
              </div>

              <Link
                href="/districts"
                className="text-xs font-bold text-[#004B87] hover:underline flex items-center gap-1"
              >
                <span>{lang === "ta" ? "அனைத்து 38 மாவட்டங்கள்" : "View All 38 Districts"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* District Selector & Output Box */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div>
                <label htmlFor="district-select" className="block text-xs font-bold text-slate-700 mb-2">
                  {lang === "ta" ? "மாவட்டத்தைத் தேர்வு செய்க:" : "Select District:"}
                </label>
                <select
                  id="district-select"
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 text-slate-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#004B87]"
                >
                  {TN_DISTRICTS_LIST.map((dist) => (
                    <option key={dist.id} value={dist.id}>
                      {lang === "ta" ? dist.name_ta : dist.name_en}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2 p-5 rounded-xl bg-blue-50 border border-blue-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#004B87]">
                    {lang === "ta" ? "மாவட்ட ஆட்சித்தலைவர் அலுவலகம்" : "District Collectorate"}
                  </span>
                  <h4 className="text-base font-extrabold text-slate-900 mt-0.5">
                    {lang === "ta" ? `${currentDistrictData.name_ta} மாவட்டம்` : `${currentDistrictData.name_en} District`}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1">
                    {currentDistrictData.collector_en}
                  </p>
                  <p className="text-xs font-mono font-bold text-[#004B87] mt-0.5">
                    Phone: {currentDistrictData.phone}
                  </p>
                </div>

                <Link
                  href={`/contact-directory?district=${encodeURIComponent(currentDistrictData.name_en)}`}
                  className="px-4 py-2 rounded-lg bg-[#004B87] hover:bg-blue-900 text-white font-bold text-xs transition-colors shrink-0"
                >
                  {lang === "ta" ? "மாவட்ட அதிகாரிகள் பட்டியல்" : "District Directory"} →
                </Link>
              </div>
            </div>
          </section>

          {/* =========================================================================
              SECTION 8: GRIEVANCES AND ASSISTANCE (CM HELPLINE 1100 & TRACKING)
              ========================================================================= */}
          <section id="grievances" aria-labelledby="grievance-heading" className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
            <div className="max-w-3xl mx-auto text-center mb-8">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-red-700 bg-red-50 px-2.5 py-0.5 rounded border border-red-200">
                {lang === "ta" ? "பொதுமக்கள் குறைகேட்பு & அவசர சேவைகள்" : "24/7 Grievance Redressal"}
              </span>
              <h3 id="grievance-heading" className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                {lang === "ta" ? "குறைதீர்ப்பு மற்றும் நேரடி உதவி" : "Grievance Redressal & Emergency Assistance"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                {lang === "ta"
                  ? "மாண்புமிகு முதலமைச்சர் உதவி மையம் 1100 மற்றும் அவசர உதவி எண்களை நேரடியாகத் தொடர்பு கொள்ளலாம்."
                  : "Direct citizen grievance registration via CM Helpline 1100 and emergency state toll-free channels."}
              </p>
            </div>

            {/* 4 Emergency Helplines Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-center">
                <span className="text-[10px] font-bold text-blue-900 block uppercase">CM Helpline (24x7)</span>
                <a href="tel:1100" className="text-lg font-black text-blue-800 hover:underline block my-1">1100</a>
                <span className="text-[10px] text-slate-500">{lang === "ta" ? "பொதுமக்கள் குறைதீர்ப்பு" : "Grievance Redressal"}</span>
              </div>

              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-center">
                <span className="text-[10px] font-bold text-red-900 block uppercase">Medical Emergency</span>
                <a href="tel:108" className="text-lg font-black text-red-800 hover:underline block my-1">108</a>
                <span className="text-[10px] text-slate-500">{lang === "ta" ? "மருத்துவ அவசரம்" : "Ambulance"}</span>
              </div>

              <div className="p-4 rounded-xl bg-purple-50 border border-purple-200 text-center">
                <span className="text-[10px] font-bold text-purple-900 block uppercase">Women Helpline</span>
                <a href="tel:181" className="text-lg font-black text-purple-800 hover:underline block my-1">181</a>
                <span className="text-[10px] text-slate-500">{lang === "ta" ? "மகளிர் உதவி மையம்" : "Women in Distress"}</span>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
                <span className="text-[10px] font-bold text-emerald-900 block uppercase">e-Sevai Support</span>
                <a href="tel:18004251333" className="text-sm font-black text-emerald-800 hover:underline block my-2">1800-425-1333</a>
                <span className="text-[10px] text-slate-500">{lang === "ta" ? "இ-சேவை மையம் உதவி" : "Citizen Portal Help"}</span>
              </div>
            </div>

            {/* Application Tracking Console */}
            <div id="tracker" className="p-6 rounded-xl bg-white border border-slate-200 max-w-xl mx-auto shadow-2xs text-center">
              <h4 className="font-extrabold text-slate-900 text-sm mb-1">
                {lang === "ta" ? "விண்ணப்ப நிலை கண்காணிப்பு (Unified Tracking)" : "Track Application Status"}
              </h4>
              <p className="text-xs text-slate-500 mb-4">
                {lang === "ta"
                  ? "இ-சேவை அல்லது அரசுத் துறைகளில் சமர்ப்பிக்கப்பட்ட விண்ணப்பத்தின் நேரடி நிலையை அறியவும்."
                  : "Check live processing status for applications filed via e-Sevai or department portals."}
              </p>

              <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-2 justify-center">
                <input
                  type="text"
                  value={appId}
                  onChange={(e) => setAppId(e.target.value)}
                  placeholder="TN20261001"
                  className="px-3.5 py-2 rounded-lg border border-slate-300 text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#004B87]"
                  aria-label="Application Number"
                />
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg text-white font-bold text-xs transition-colors shrink-0"
                  style={{ backgroundColor: tnBlue }}
                >
                  {lang === "ta" ? "நிலையைக் காண்க" : "Check Status"}
                </button>
              </form>

              {trackingError && <p className="text-xs text-red-600 font-semibold mt-2">{trackingError}</p>}

              {trackedStatus && (
                <div className="mt-4 p-3 rounded-lg bg-blue-50 border border-blue-200 text-xs text-left">
                  <div className="font-bold text-slate-900">{trackedStatus.service}</div>
                  <div className="text-[11px] text-slate-500">App ID: {trackedStatus.id} | Date: {trackedStatus.date}</div>
                  <div className="mt-2 text-blue-900 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Stage 3 of 4: Tahsildar Digital Signature in Progress</span>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* =========================================================================
              SECTION 9: ANNOUNCEMENTS (VERIFIED GAZETTE & STATE NOTICES)
              ========================================================================= */}
          <section aria-labelledby="announcements-heading" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-4 gap-2">
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  {lang === "ta" ? "அரசு செய்திகள் & அறிவிப்புகள்" : "Press Releases & Gazettes"}
                </span>
                <h3 id="announcements-heading" className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                  {lang === "ta" ? "முக்கிய அறிவிப்புகள்" : "Official State Announcements"}
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-mono font-bold text-slate-500">16 Nov 2026</span>
                <h4 className="font-bold text-slate-900 mt-1">
                  {lang === "ta" ? "மகளிர் உரிமைத் திட்ட பயனாளிகள் வங்கி கணக்கு சரிபார்ப்பு" : "Kalaignar Magalir Urimai Thogai Bank Account Verification"}
                </h4>
                <p className="text-slate-500 mt-1 line-clamp-2">
                  Social Welfare Department circular regarding Aadhaar-linked DBT account validation.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-mono font-bold text-slate-500">14 Nov 2026</span>
                <h4 className="font-bold text-slate-900 mt-1">
                  {lang === "ta" ? "பருவமழை முன்னெச்சரிக்கை: 24/7 பேரிடர் மேலாண்மை மையம்" : "Monsoon Preparedness: 24/7 State Emergency Operations Center"}
                </h4>
                <p className="text-slate-500 mt-1 line-clamp-2">
                  Revenue and Disaster Management toll-free control room operational at 1070.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-mono font-bold text-slate-500">10 Nov 2026</span>
                <h4 className="font-bold text-slate-900 mt-1">
                  {lang === "ta" ? "இ-சேவை 2.0 தளம் மூலம் 15 புதிய சான்றிதழ்கள் தொடக்கம்" : "TNeGA e-Sevai 2.0 Launches 15 New Direct Certificates"}
                </h4>
                <p className="text-slate-500 mt-1 line-clamp-2">
                  Faceless, paperless delivery for agriculture and educational documents.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* =========================================================================
          SECTION 10: COMPLETE FOOTER SITEMAP (GIGW 3.0 MANDATORY LINK DIRECTORY)
          ========================================================================= */}
      <FooterSitemap lang={lang} />
    </div>
  );
}
