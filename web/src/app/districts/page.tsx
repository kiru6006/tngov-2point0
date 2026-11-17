"use client";

import { useState } from "react";
import Link from "next/link";
import contactsData from "@/data/contacts.json";
import {
  MapPin,
  ArrowLeft,
  Globe,
  Search,
  Phone,
  Mail,
  Building,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

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
  const [lang, setLang] = useState<"ta" | "en">("ta");
  const [searchQuery, setSearchQuery] = useState("");

  const allDistrictNames = contactsData.districts;

  const filteredDistricts = allDistrictNames.filter((d) =>
    d.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-900 bg-blue-50 px-2.5 py-1.5 rounded-lg border border-blue-100"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{lang === "ta" ? "முகப்பு" : "Home"}</span>
            </Link>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                {lang === "ta" ? "தமிழ்நாடு 38 மாவட்டங்கள் (District Administration)" : "Tamil Nadu 38 District Collectorates"}
              </h1>
              <span className="text-[11px] text-slate-500 font-medium">
                {lang === "ta"
                  ? "மாவட்ட ஆட்சித் தலைவர்கள், தொடர்பு விவரங்கள் & இ-சேவை மையங்கள்"
                  : "District Collectors, Official Contacts, Taluks, and Citizen Services"}
              </span>
            </div>
          </div>

          <button
            onClick={() => setLang(lang === "ta" ? "en" : "ta")}
            className="flex items-center gap-1 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg border border-slate-200"
          >
            <Globe className="w-3.5 h-3.5 text-blue-700" />
            <span>{lang === "ta" ? "English" : "தமிழ்"}</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 flex flex-col gap-6">
        {/* Search */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:w-96">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === "ta" ? "மாவட்டத்தின் பெயர் தேடுக..." : "Search district name..."}
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          </div>
          <span className="text-xs text-slate-500 font-semibold">
            {lang === "ta" ? "மொத்தம் 38 வருவாய் மாவட்டங்கள்" : "38 Revenue Districts of Tamil Nadu"}
          </span>
        </div>

        {/* Featured Key Collectorates */}
        <div>
          <h2 className="text-base font-bold text-slate-900 mb-3">
            {lang === "ta" ? "முக்கிய மாவட்ட ஆட்சித் தலைவர் அலுவலகங்கள்" : "Key District Collectorate Contacts"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {DISTRICT_DETAILS.map((dist) => (
              <div
                key={dist.name_en}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:border-blue-400 transition-all flex flex-col justify-between gap-3"
              >
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-base text-slate-900">
                      {lang === "ta" ? dist.name_ta : dist.name_en}
                    </span>
                    <span className="text-[11px] font-mono bg-blue-50 text-blue-800 px-2 py-0.5 rounded border border-blue-100">
                      {dist.taluks_count} {lang === "ta" ? "வட்டங்கள்" : "Taluks"}
                    </span>
                  </div>

                  <div className="text-xs text-slate-700 font-semibold mt-2">
                    {lang === "ta" ? dist.collector_ta : dist.collector_en}
                  </div>
                  <div className="text-[11px] text-slate-500">{dist.address}</div>

                  <div className="mt-3 pt-2.5 border-t border-slate-100 space-y-1 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <a href={`tel:${dist.phone}`} className="font-mono text-blue-700 hover:underline">
                        {dist.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <a href={`mailto:${dist.email}`} className="text-blue-700 hover:underline">
                        {dist.email}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <Link
                    href={`/contact-directory?district=${encodeURIComponent(dist.name_en)}`}
                    className="text-xs font-bold text-blue-700 hover:underline flex items-center justify-between"
                  >
                    <span>{lang === "ta" ? "மாவட்ட அதிகாரிகள் பட்டியல்" : "View District Officers"}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Complete 38 Districts Grid */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-base font-bold text-slate-900 mb-3">
            {lang === "ta" ? "அனைத்து 38 மாவட்டங்கள் அகரவரிசை" : "All 38 Districts Directory"}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 text-xs">
            {filteredDistricts.map((dist) => (
              <Link
                key={dist}
                href={`/contact-directory?district=${encodeURIComponent(dist)}`}
                className="p-3 rounded-lg border border-slate-200 hover:bg-blue-50 hover:border-blue-300 font-medium text-slate-800 transition-colors flex items-center justify-between"
              >
                <span>{dist}</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
