"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Search,
  ArrowLeft,
  Globe,
  FileText,
  Award,
  Users,
  Building,
  MapPin,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  CheckCircle,
  Filter,
} from "lucide-react";

import servicesData from "@/data/services.json";
import schemesData from "@/data/schemes.json";
import documentsData from "@/data/documents.json";
import contactsData from "@/data/contacts.json";

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [lang, setLang] = useState<"ta" | "en">("ta");
  const [query, setQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState<
    "ALL" | "SERVICE" | "SCHEME" | "DOCUMENT" | "CONTACT" | "DISTRICT"
  >("ALL");

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
    }
  }, [initialQuery]);

  const q = query.trim().toLowerCase();

  // Unified Search Execution across 4 primary static master datasets
  const matchedServices = servicesData.filter(
    (s) =>
      !q ||
      s.title_en.toLowerCase().includes(q) ||
      s.title_ta.toLowerCase().includes(q) ||
      s.items.some((item) => item.toLowerCase().includes(q))
  );

  const matchedSchemes = schemesData.filter(
    (sch) =>
      !q ||
      sch.name_en.toLowerCase().includes(q) ||
      sch.name_ta.toLowerCase().includes(q) ||
      sch.benefits.toLowerCase().includes(q) ||
      sch.dept_en.toLowerCase().includes(q)
  );

  const matchedDocs = documentsData.filter(
    (d) =>
      !q ||
      d.subject_en.toLowerCase().includes(q) ||
      d.subject_ta.toLowerCase().includes(q) ||
      d.id.toLowerCase().includes(q)
  );

  const matchedContacts = contactsData.officials.filter(
    (c) =>
      !q ||
      c.name_en.toLowerCase().includes(q) ||
      c.name_ta.toLowerCase().includes(q) ||
      c.designation_en.toLowerCase().includes(q) ||
      c.department_en.toLowerCase().includes(q)
  );

  const matchedDistricts = contactsData.districts.filter(
    (dist) => !q || dist.toLowerCase().includes(q)
  );

  const totalResults =
    matchedServices.length +
    matchedSchemes.length +
    matchedDocs.length +
    matchedContacts.length +
    matchedDistricts.length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col antialiased">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-900 bg-blue-50 px-2.5 py-1.5 rounded-lg border border-blue-100"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{lang === "ta" ? "முகப்பு" : "Back to Home"}</span>
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded">
                  Unified Search
                </span>
                <h1 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                  {lang === "ta" ? "ஒருங்கிணைந்த அரசுத் தேடல்" : "Unified Citizen Search"}
                </h1>
              </div>
              <span className="text-[11px] text-slate-500 font-medium">
                {lang === "ta"
                  ? "சேவைகள், திட்டங்கள், அரசாணைகள், அதிகாரிகள் மற்றும் மாவட்டங்கள்"
                  : "Federated Search Across Services, Schemes, Documents & Directory"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang(lang === "ta" ? "en" : "ta")}
              className="flex items-center gap-1 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg border border-slate-200"
            >
              <Globe className="w-3.5 h-3.5 text-blue-700" />
              <span>{lang === "ta" ? "English" : "தமிழ்"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 flex flex-col gap-6">
        {/* Search Bar Input */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                lang === "ta"
                  ? "சான்றிதழ், மகளிர் உரிமை, அரசாணை, ஆட்சியர் தேடுக..."
                  : "Search services, welfare schemes, G.O. orders, officials..."
              }
              className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-slate-50 focus:bg-white font-medium"
            />
            <Search className="w-5 h-5 text-slate-400 absolute left-3 top-3.5" />
          </div>
        </div>

        {/* Entity Facet Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2 text-xs sm:text-sm font-semibold">
          <button
            onClick={() => setActiveTab("ALL")}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              activeTab === "ALL"
                ? "bg-[#004B87] text-white shadow-sm"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            {lang === "ta" ? "அனைத்தும்" : "All Results"} ({totalResults})
          </button>
          <button
            onClick={() => setActiveTab("SERVICE")}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              activeTab === "SERVICE"
                ? "bg-[#004B87] text-white shadow-sm"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            {lang === "ta" ? "சேவைகள்" : "Services"} ({matchedServices.length})
          </button>
          <button
            onClick={() => setActiveTab("SCHEME")}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              activeTab === "SCHEME"
                ? "bg-[#004B87] text-white shadow-sm"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            {lang === "ta" ? "நலத்திட்டங்கள்" : "Schemes"} ({matchedSchemes.length})
          </button>
          <button
            onClick={() => setActiveTab("DOCUMENT")}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              activeTab === "DOCUMENT"
                ? "bg-[#004B87] text-white shadow-sm"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            {lang === "ta" ? "அரசாணைகள்" : "Documents"} ({matchedDocs.length})
          </button>
          <button
            onClick={() => setActiveTab("CONTACT")}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              activeTab === "CONTACT"
                ? "bg-[#004B87] text-white shadow-sm"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            {lang === "ta" ? "அதிகாரிகள்" : "Officials"} ({matchedContacts.length})
          </button>
        </div>

        {/* Results Container */}
        <div className="space-y-4">
          {/* Services Results */}
          {(activeTab === "ALL" || activeTab === "SERVICE") &&
            matchedServices.map((srv) => (
              <div
                key={srv.id}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-blue-400 transition-all"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-800 border border-blue-200 px-2 py-0.5 rounded">
                    Citizen Service
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-base mt-1">
                    {lang === "ta" ? srv.title_ta : srv.title_en}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {lang === "ta" ? srv.dept_ta : srv.dept_en} | SLA: {srv.sla}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {srv.items.map((item, idx) => (
                      <span
                        key={idx}
                        className="bg-slate-100 text-slate-700 text-[11px] font-medium px-2 py-0.5 rounded"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  href={`/services/${srv.id}`}
                  className="bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs px-4 py-2 rounded-xl shrink-0 flex items-center gap-1.5"
                >
                  <span>{lang === "ta" ? "விண்ணப்பிக்க" : "View Service"}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}

          {/* Schemes Results */}
          {(activeTab === "ALL" || activeTab === "SCHEME") &&
            matchedSchemes.map((sch) => (
              <div
                key={sch.id}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-emerald-400 transition-all"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded">
                    Government Scheme
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-base mt-1">
                    {lang === "ta" ? sch.name_ta : sch.name_en}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {lang === "ta" ? sch.dept_ta : sch.dept_en} | Category: {sch.category}
                  </p>
                  <p className="text-xs font-semibold text-emerald-900 mt-2 bg-emerald-50 p-2 rounded-lg">
                    {sch.benefits}
                  </p>
                </div>

                <Link
                  href="/schemes"
                  className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-4 py-2 rounded-xl shrink-0 flex items-center gap-1.5"
                >
                  <span>{lang === "ta" ? "திட்ட விவரம்" : "Scheme Details"}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}

          {/* Documents Results */}
          {(activeTab === "ALL" || activeTab === "DOCUMENT") &&
            matchedDocs.map((doc) => (
              <div
                key={doc.id}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-slate-400 transition-all"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-800 border border-slate-200 px-2 py-0.5 rounded">
                    {doc.type} ({doc.year})
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-sm mt-1">
                    {lang === "ta" ? doc.subject_ta : doc.subject_en}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {lang === "ta" ? doc.dept_ta : doc.dept_en} | Issued: {doc.date}
                  </p>
                </div>

                <Link
                  href="/documents"
                  className="bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs px-4 py-2 rounded-xl shrink-0 flex items-center gap-1.5"
                >
                  <span>{lang === "ta" ? "பதிவிறக்குக" : "View Document"}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}

          {/* Contacts Results */}
          {(activeTab === "ALL" || activeTab === "CONTACT") &&
            matchedContacts.map((c) => (
              <div
                key={c.id}
                className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex justify-between items-center gap-4 hover:border-blue-400"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    Official Directory
                  </span>
                  <div className="font-extrabold text-slate-900 text-sm mt-0.5">
                    {lang === "ta" ? c.name_ta : c.name_en}
                  </div>
                  <div className="text-xs text-slate-600">
                    {lang === "ta" ? c.designation_ta : c.designation_en} - {c.department_en}
                  </div>
                </div>

                <Link
                  href={`/contact-directory?query=${encodeURIComponent(c.name_en)}`}
                  className="text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg border border-blue-200"
                >
                  Contact Info →
                </Link>
              </div>
            ))}

          {totalResults === 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
              <Search className="w-10 h-10 mx-auto text-slate-300 mb-3" />
              <h3 className="font-bold text-slate-800 text-base">
                {lang === "ta" ? "முடிவுகள் ஏதும் கிடைக்கவில்லை" : "No Matching Results Found"}
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                {lang === "ta"
                  ? "வேறு சொற்களைப் பயன்படுத்தி அல்லது துறை வாரியாகத் தேட முயற்சிக்கவும்."
                  : "Try searching with broader terms or browse directly by department or service category."}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default function UnifiedSearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center p-8 text-slate-500 font-medium">Loading search...</div>}>
      <SearchContent />
    </Suspense>
  );
}
