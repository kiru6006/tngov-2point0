"use client";

import { useState } from "react";
import Link from "next/link";
import AppShell from "@/components/layout/AppShell";
import {
  Landmark,
  MapPin,
  Building2,
  Users,
  Award,
  Calendar,
  FileCheck2,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

export default function AboutTamilNaduPage() {
  const [lang, setLang] = useState<"en" | "ta">("en");
  const [workspace, setWorkspace] = useState<"public" | "official">("public");

  const stateSymbols = [
    { label_en: "State Animal", label_ta: "மாநில விலங்கு", value_en: "Nilgiri Tahr", value_ta: "வரையாடு" },
    { label_en: "State Bird", label_ta: "மாநிலப் பறவை", value_en: "Emerald Dove", value_ta: "மரகதப்புறா" },
    { label_en: "State Flower", label_ta: "மாநில மலர்", value_en: "Gloriosa Lily (Kanthal)", value_ta: "செங்காந்தள் மலர்" },
    { label_en: "State Tree", label_ta: "மாநில மரம்", value_en: "Palmyra Palm", value_ta: "பனை மரம்" },
    { label_en: "State Fruit", label_ta: "மாநில கனி", value_en: "Jackfruit", value_ta: "பலாப்பழம்" },
    { label_en: "State Song", label_ta: "தமிழ்த்தாய் வாழ்த்து", value_en: "Tamil Thai Valthu (Manonmaniam Sundaram Pillai)", value_ta: "நீராருங் கடலுடுத்த (மனோன்மணீயம் சுந்தரனார்)" },
    { label_en: "State Emblem", label_ta: "மாநில சின்னம்", value_en: "Srivilliputhur Andal Temple Gopuram", value_ta: "ஸ்ரீவில்லிபுத்தூர் ஆண்டாள் கோவில் கோபுரம்" },
    { label_en: "State Motto", label_ta: "மாநில குறிக்கோள்", value_en: "Voice of Truth Alone Triumphs (Vaimaye Vellum)", value_ta: "வாய்மையே வெல்லும்" },
  ];

  const economicFacts = [
    { metric_en: "GSDP (Nominal)", metric_ta: "மாநில மொத்த உற்பத்தி", value: "₹31.55 Lakh Crore ($380B+)" },
    { metric_en: "Economic Rank", metric_ta: "பொருளாதார நிலை", value: "2nd Largest Economy in India" },
    { metric_en: "Industrial Output", metric_ta: "தொழில்துறை உற்பத்தி", value: "#1 in Factory Count & Auto Hub" },
    { metric_en: "Urbanization Rate", metric_ta: "நகரமயமாக்கல் விகிதம்", value: "48.4% (Most Urbanized Major State)" },
    { metric_en: "Human Development Index (HDI)", metric_ta: "மனித வளர்ச்சி குறியீடு", value: "0.708 (High HDI Category)" },
    { metric_en: "Renewable Energy Capacity", metric_ta: "புதுப்பிக்கத்தக்க எரிசக்தி", value: "Over 20 GW (Wind & Solar Leader)" },
  ];

  const publicHolidays2026 = [
    { date: "15 Jan 2026", occasion_en: "Pongal", occasion_ta: "பொங்கல் திருநாள்" },
    { date: "16 Jan 2026", occasion_en: "Thiruvalluvar Day", occasion_ta: "திருவள்ளுவர் தினம்" },
    { date: "17 Jan 2026", occasion_en: "Uzhavar Thirunal", occasion_ta: "உழவர் திருநாள்" },
    { date: "26 Jan 2026", occasion_en: "Republic Day", occasion_ta: "குடியரசு தினம்" },
    { date: "14 Apr 2026", occasion_en: "Tamil New Year & Dr. B.R. Ambedkar Jayanti", occasion_ta: "தமிழ்ப் புத்தாண்டு & அம்பேத்கர் ஜெயந்தி" },
    { date: "01 May 2026", occasion_en: "May Day", occasion_ta: "மே தினம்" },
    { date: "15 Aug 2026", occasion_en: "Independence Day", occasion_ta: "சுதந்திர தினம்" },
    { date: "02 Oct 2026", occasion_en: "Gandhi Jayanti", occasion_ta: "காந்தி ஜெயந்தி" },
  ];

  return (
    <AppShell
      activeWorkspace={workspace}
      onWorkspaceChange={setWorkspace}
      lang={lang}
      onLanguageChange={setLang}
    >
      <div className="p-4 md:p-5 max-w-7xl mx-auto w-full space-y-5">
        {/* Breadcrumb & Title */}
        <div className="border-b border-slate-200 pb-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
            <Link href="/" className="hover:text-[#004B87]">
              {lang === "ta" ? "முகப்பு" : "Home"}
            </Link>
            <span>/</span>
            <span className="text-slate-800 font-semibold">
              {lang === "ta" ? "தமிழ்நாடு பற்றி" : "About Tamil Nadu"}
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Landmark className="w-6 h-6 text-[#004B87]" />
            <span>
              {lang === "ta"
                ? "தமிழ்நாடு மாநில அதிகாரப்பூர்வ விவரக்குறிப்பு"
                : "Profile of Tamil Nadu | State Profile & Heritage"}
            </span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {lang === "ta"
              ? "தொன்மை வரலாறு, திராவிட கலை கலாச்சாரம், வலுவான சமூக நீதி மற்றும் தொழில் துறை வளர்ச்சி"
              : "Cradle of Dravidian culture, industrial powerhouse, progressive social justice, and constitutional federalism."}
          </p>
        </div>

        {/* 1. STATE PROFILE OVERVIEW */}
        <div className="bg-white p-4 md:p-5 rounded-lg border border-slate-200 shadow-xs grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="md:col-span-2 space-y-3">
            <h2 className="text-base font-bold text-slate-900">
              {lang === "ta" ? "மாநிலத்தின் சிறப்புகள்" : "Land of Heritage & Innovation"}
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              {lang === "ta"
                ? "தமிழ்நாடு இந்தியாவின் தென்கோடியில் அமைந்துள்ள முன்னணி மாநிலமாகும். சங்க இலக்கியம், சோழர் கால சிற்பக்கலை, மாமல்லபுரம் கடற்கரை சிற்பங்கள் மற்றும் தஞ்சைப் பெருவுடையார் கோவில் உள்ளிட்ட யுனெஸ்கோ உலக பாரம்பரியத் தளங்களை தன்னகத்தே கொண்டுள்ளது. சென்னை மாநகரம் மாநிலத்தின் தலைநகரமாகவும் இந்தியாவின் சுகாதாரத் தலைநகராகவும் விளங்குகிறது."
                : "Tamil Nadu, located in the southernmost part of the Indian peninsula, is renowned for its ancient literary tradition dating back over two millennia, world-famous temple architecture, UNESCO World Heritage monuments in Mamallapuram and Thanjavur, and an unyielding commitment to social justice and human development. Chennai serves as the state capital and is widely recognized as the healthcare and automotive manufacturing capital of India."}
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              {lang === "ta"
                ? "38 வருவாய் மாவட்டங்கள், 312 வட்டங்கள் மற்றும் 12,525 கிராம ஊராட்சிகளுடன் வலுவான உள்ளாட்சி அமைப்புகளை தமிழ்நாடு கொண்டுள்ளது."
                : "Administratively organized into 38 districts, 312 taluks, and 12,525 village panchayats, the state operates with deep decentralization and citizen-centric e-governance."}
            </p>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 space-y-2 text-xs">
            <h3 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] pb-1 border-b border-slate-200">
              {lang === "ta" ? "முக்கிய விவரங்கள்" : "Key Quick Facts"}
            </h3>
            <div className="flex justify-between">
              <span className="text-slate-500">Capital:</span>
              <span className="font-semibold text-slate-800">Chennai (மெட்ராஸ்)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Population (est.):</span>
              <span className="font-semibold text-slate-800">7.64+ Crores</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Total Area:</span>
              <span className="font-semibold text-slate-800">130,058 km²</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Official Language:</span>
              <span className="font-semibold text-slate-800">Tamil (தமிழ்)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Literacy Rate:</span>
              <span className="font-semibold text-slate-800">80.09% (National 74%)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Coastline:</span>
              <span className="font-semibold text-slate-800">1,076 km (Coromandel)</span>
            </div>
          </div>
        </div>

        {/* 2. OFFICIAL STATE SYMBOLS */}
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs space-y-3">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
            <Award className="w-4 h-4 text-[#004B87]" />
            <span>{lang === "ta" ? "அரசு அங்கீகரித்த மாநில சின்னங்கள்" : "Official State Symbols of Tamil Nadu"}</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {stateSymbols.map((item, idx) => (
              <div key={idx} className="bg-slate-50 p-2.5 rounded border border-slate-200 text-xs">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  {lang === "ta" ? item.label_ta : item.label_en}
                </span>
                <span className="font-bold text-slate-900 mt-0.5 block">
                  {lang === "ta" ? item.value_ta : item.value_en}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 3. ECONOMIC PROFILE & INDUSTRIAL HUBS */}
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs space-y-3">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
            <TrendingUp className="w-4 h-4 text-[#004B87]" />
            <span>{lang === "ta" ? "பொருளாதார பலம் & தொழில் கட்டமைப்பு" : "Economic Powerhouse & Growth Metrics"}</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {economicFacts.map((fact, idx) => (
              <div key={idx} className="p-3 bg-blue-50/50 rounded border border-blue-100 text-xs">
                <span className="text-[11px] font-semibold text-slate-600 block">
                  {lang === "ta" ? fact.metric_ta : fact.metric_en}
                </span>
                <span className="font-bold text-sm text-[#004B87] mt-1 block">
                  {fact.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 4. PUBLIC HOLIDAYS CALENDAR (2026) */}
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs space-y-3">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
            <Calendar className="w-4 h-4 text-[#004B87]" />
            <span>{lang === "ta" ? "அரசு பொது விடுமுறை நாட்கள் (2026)" : "Public Holidays Calendar (2026)"}</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {publicHolidays2026.map((h, idx) => (
              <div key={idx} className="flex items-center gap-2.5 p-2 rounded bg-slate-50 border border-slate-200 text-xs">
                <div className="w-12 h-10 rounded bg-[#004B87] text-white flex flex-col items-center justify-center font-mono font-bold text-[10px] flex-shrink-0">
                  <span>{h.date.split(" ")[0]}</span>
                  <span>{h.date.split(" ")[1]}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-800 block">
                    {lang === "ta" ? h.occasion_ta : h.occasion_en}
                  </span>
                  <span className="text-[10px] text-slate-400">Gazetted Public Holiday</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
