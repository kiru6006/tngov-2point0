"use client";

import { useState } from "react";
import Link from "next/link";
import contactsData from "@/data/contacts.json";
import {
  MapPin,
  Search,
  Phone,
  Mail,
  Building,
  ChevronRight,
  ExternalLink,
  LayoutGrid,
  List,
} from "lucide-react";
import AppShell from "@/components/layout/AppShell";

const DISTRICT_DETAILS = [
  {
    name_en: "Chennai",
    name_ta: "சென்னை",
    collector_en: "Ms. Rashmi Siddharth Zagade, IAS",
    collector_ta: "திருமதி. ரஷ்மி சித்தார்த் ஜகடே, இ.ஆ.ப.",
    phone: "+91-44-25268338",
    email: "collrchn@nic.in",
    address: "District Collectorate, Rajaji Salai, Chennai 600001",
    taluks_count: 16,
    population: "71.0 Lakhs",
  },
  {
    name_en: "Coimbatore",
    name_ta: "கோயம்புத்தூர்",
    collector_en: "Thiru Kranthi Kumar Pati, IAS",
    collector_ta: "திரு. கிராந்தி குமார் பதி, இ.ஆ.ப.",
    phone: "+91-422-2301114",
    email: "collrcbe@nic.in",
    address: "Collectorate, State Bank Road, Coimbatore 641018",
    taluks_count: 11,
    population: "34.5 Lakhs",
  },
  {
    name_en: "Madurai",
    name_ta: "மதுரை",
    collector_en: "Dr. M. S. Sangeetha, IAS",
    collector_ta: "முனைவர் மா. சா. சங்கீதா, இ.ஆ.ப.",
    phone: "+91-452-2531110",
    email: "collrmdu@nic.in",
    address: "District Collectorate, Madurai 625020",
    taluks_count: 11,
    population: "30.4 Lakhs",
  },
  {
    name_en: "Salem",
    name_ta: "சேலம்",
    collector_en: "Dr. R. Brindha Devi, IAS",
    collector_ta: "முனைவர் இரா. பிருந்தா தேவி, இ.ஆ.ப.",
    phone: "+91-427-2450100",
    email: "collrslm@nic.in",
    address: "Collectorate, Bretts Road, Salem 636001",
    taluks_count: 10,
    population: "34.8 Lakhs",
  },
  {
    name_en: "Tiruchirappalli",
    name_ta: "திருச்சிராப்பள்ளி",
    collector_en: "Thiru M. Pradeep Kumar, IAS",
    collector_ta: "திரு. மா. பிரதீப் குமார், இ.ஆ.ப.",
    phone: "+91-431-2415358",
    email: "collrtry@nic.in",
    address: "Collectorate, Cantonment, Tiruchirappalli 620001",
    taluks_count: 11,
    population: "27.2 Lakhs",
  },
  {
    name_en: "Tirunelveli",
    name_ta: "திருநெல்வேலி",
    collector_en: "Dr. K.P. Karthikeyan, IAS",
    collector_ta: "முனைவர் கா.ப. கார்த்திகேயன், இ.ஆ.ப.",
    phone: "+91-462-2500828",
    email: "collrtnv@nic.in",
    address: "Collectorate, Kokkirakulam, Tirunelveli 627009",
    taluks_count: 8,
    population: "16.6 Lakhs",
  },
];

export default function DistrictsPage() {
  const [lang, setLang] = useState<"ta" | "en">("en");
  const [workspace, setWorkspace] = useState<"public" | "official">("public");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"card" | "list">("card");

  const allDistrictNames = contactsData.districts;

  const filteredDistricts = allDistrictNames.filter((d) =>
    d.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AppShell
      activeWorkspace={workspace}
      onWorkspaceChange={setWorkspace}
      lang={lang}
      onLanguageChange={setLang}
    >
      <div className="p-4 md:p-5 max-w-7xl mx-auto w-full space-y-4">
        {/* Breadcrumb & Title Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
              <Link href="/" className="hover:text-[#004B87]">
                {lang === "ta" ? "முகப்பு" : "Home"}
              </Link>
              <span>/</span>
              <span className="text-slate-800 font-semibold">
                {lang === "ta" ? "மாவட்டங்கள்" : "Districts (38)"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg md:text-xl font-bold text-slate-900 leading-tight">
                {lang === "ta" ? "தமிழ்நாடு 38 மாவட்டங்கள் (District Administration)" : "Tamil Nadu 38 District Collectorates"}
              </h1>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                38 Districts
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {lang === "ta"
                ? "மாவட்ட ஆட்சித் தலைவர்கள், தொடர்பு விவரங்கள் & இ-சேவை மையங்கள்"
                : "District Collectors, Official Contacts, Taluks, and Citizen Services"}
            </p>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setViewMode("card")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                viewMode === "card"
                  ? "bg-white text-[#004B87] shadow-xs font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              title="Card View (3 Columns)"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>{lang === "ta" ? "அட்டைப் பார்வை" : "Cards View"}</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                viewMode === "list"
                  ? "bg-white text-[#004B87] shadow-xs font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              title="List View (Two Columns)"
            >
              <List className="w-3.5 h-3.5" />
              <span>{lang === "ta" ? "பட்டியல் பார்வை" : "List View (2 Col)"}</span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-3 justify-between items-center">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === "ta" ? "மாவட்டத்தின் பெயர் தேடுக..." : "Search district name..."}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#004B87] bg-slate-50 focus:bg-white"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2" />
          </div>
          <span className="text-xs text-slate-500 font-semibold">
            {lang === "ta" ? "மொத்தம் 38 வருவாய் மாவட்டங்கள்" : "38 Revenue Districts of Tamil Nadu"}
          </span>
        </div>

        {/* Featured Key Collectorates: Card View vs List View (Two Columns) */}
        <div>
          <h2 className="text-sm font-bold text-slate-900 mb-2.5">
            {lang === "ta" ? "முக்கிய மாவட்ட ஆட்சித் தலைவர் அலுவலகங்கள்" : "Key District Collectorate Contacts"}
          </h2>

          {viewMode === "card" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {DISTRICT_DETAILS.map((dist) => (
                <div
                  key={dist.name_en}
                  className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs hover:border-[#004B87] hover:shadow-sm transition-all flex flex-col justify-between gap-3 group"
                >
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-sm text-slate-900 group-hover:text-[#004B87] transition-colors">
                        {lang === "ta" ? dist.name_ta : dist.name_en}
                      </span>
                      <span className="text-[10px] font-mono bg-blue-50 text-blue-800 px-2 py-0.2 rounded border border-blue-100">
                        {dist.taluks_count} {lang === "ta" ? "வட்டங்கள்" : "Taluks"}
                      </span>
                    </div>

                    <div className="text-xs text-slate-700 font-semibold mt-1.5">
                      {lang === "ta" ? dist.collector_ta : dist.collector_en}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5 truncate">{dist.address}</div>

                    <div className="mt-2.5 pt-2 border-t border-slate-100 space-y-1 text-xs text-slate-600">
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        <a href={`tel:${dist.phone}`} className="font-mono text-blue-700 hover:underline">
                          {dist.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        <a href={`mailto:${dist.email}`} className="text-blue-700 hover:underline truncate">
                          {dist.email}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100">
                    <Link
                      href={`/contact-directory?district=${encodeURIComponent(dist.name_en)}`}
                      className="text-xs font-bold text-[#004B87] hover:underline flex items-center justify-between"
                    >
                      <span>{lang === "ta" ? "மாவட்ட அதிகாரிகள் பட்டியல்" : "View District Officers"}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* List View (Two Columns) */
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {DISTRICT_DETAILS.map((dist) => (
                <div
                  key={dist.name_en}
                  className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-xs hover:border-[#004B87] transition-all flex items-center justify-between gap-3 group"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-[#004B87] truncate">
                        {lang === "ta" ? dist.name_ta : dist.name_en}
                      </span>
                      <span className="text-[10px] font-mono text-blue-800 bg-blue-50 px-1.5 py-0.2 rounded border border-blue-100 shrink-0">
                        {dist.taluks_count} Taluks
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 font-medium truncate">
                      {lang === "ta" ? dist.collector_ta : dist.collector_en}
                    </p>
                    <p className="text-[10px] text-slate-400 truncate">
                      {dist.phone} • {dist.email}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Link
                      href={`/contact-directory?district=${encodeURIComponent(dist.name_en)}`}
                      className="text-xs font-bold text-[#004B87] hover:underline whitespace-nowrap"
                    >
                      Officers →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Complete 38 Districts Grid */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <h2 className="text-sm font-bold text-slate-900 mb-2.5">
            {lang === "ta" ? "அனைத்து 38 மாவட்டங்கள் அகரவரிசை" : "All 38 Districts Directory"}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 text-xs">
            {filteredDistricts.map((dist) => (
              <Link
                key={dist}
                href={`/contact-directory?district=${encodeURIComponent(dist)}`}
                className="p-2 rounded-lg border border-slate-200 hover:bg-blue-50 hover:border-blue-300 font-medium text-slate-800 transition-colors flex items-center justify-between"
              >
                <span className="truncate">{dist}</span>
                <ChevronRight className="w-3 h-3 text-slate-400 shrink-0 ml-1" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
