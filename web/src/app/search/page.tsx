"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Search,
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
  LayoutGrid,
  List,
} from "lucide-react";

import servicesData from "@/data/services.json";
import schemesData from "@/data/schemes.json";
import documentsData from "@/data/documents.json";
import contactsData from "@/data/contacts.json";
import AppShell from "@/components/layout/AppShell";

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [lang, setLang] = useState<"ta" | "en">("en");
  const [workspace, setWorkspace] = useState<"public" | "official">("public");
  const [query, setQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState<
    "ALL" | "SERVICE" | "SCHEME" | "DOCUMENT" | "CONTACT" | "DISTRICT"
  >("ALL");
  const [viewMode, setViewMode] = useState<"card" | "list">("card");

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
    (doc) =>
      !q ||
      doc.id.toLowerCase().includes(q) ||
      doc.subject_en.toLowerCase().includes(q) ||
      doc.subject_ta.toLowerCase().includes(q) ||
      doc.dept_en.toLowerCase().includes(q)
  );

  const matchedContacts = contactsData.officials.filter(
    (off) =>
      !q ||
      off.name_en.toLowerCase().includes(q) ||
      off.name_ta.toLowerCase().includes(q) ||
      off.designation_en.toLowerCase().includes(q) ||
      off.department_en.toLowerCase().includes(q) ||
      off.district_en.toLowerCase().includes(q)
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
                {lang === "ta" ? "ஒருங்கிணைந்த தேடல்" : "Unified Search"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg md:text-xl font-bold text-slate-900 leading-tight">
                {lang === "ta" ? "ஒருங்கிணைந்த அரசுத் தேடல்" : "Unified Citizen Search"}
              </h1>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                {totalResults} {lang === "ta" ? "முடிவுகள்" : "Results"}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {lang === "ta"
                ? "சேவைகள், திட்டங்கள், அரசாணைகள், அதிகாரிகள் மற்றும் மாவட்டங்கள்"
                : "Federated Search Across Services, Schemes, Documents & Directory"}
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
              title="Card View"
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

        {/* Search Bar Input */}
        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                lang === "ta"
                  ? "சாதிச் சான்றிதழ், உதவித்தொகை, அரசாணை எண், மாவட்ட ஆட்சியர்..."
                  : "Search anything: Community Certificate, Patta, CMCHIS, Collector..."
              }
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#004B87] bg-slate-50 focus:bg-white"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </div>
        </div>

        {/* Search Scope Filter Tabs */}
        <div className="flex flex-wrap gap-1.5 border-b border-slate-200 pb-2 text-xs font-semibold">
          {[
            { id: "ALL", label: lang === "ta" ? "அனைத்தும்" : "All Results", count: totalResults },
            { id: "SERVICE", label: lang === "ta" ? "சேவைகள்" : "Services", count: matchedServices.length },
            { id: "SCHEME", label: lang === "ta" ? "திட்டங்கள்" : "Schemes", count: matchedSchemes.length },
            { id: "DOCUMENT", label: lang === "ta" ? "அரசாணைகள்" : "Government Orders", count: matchedDocs.length },
            { id: "CONTACT", label: lang === "ta" ? "அதிகாரிகள்" : "Contacts", count: matchedContacts.length },
            { id: "DISTRICT", label: lang === "ta" ? "மாவட்டங்கள்" : "Districts", count: matchedDistricts.length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? "bg-[#004B87] text-white shadow-xs font-bold"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  activeTab === tab.id ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Results Sections: Card vs List View */}
        <div className="space-y-4">
          {/* Services Section */}
          {(activeTab === "ALL" || activeTab === "SERVICE") && matchedServices.length > 0 && (
            <div className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {lang === "ta" ? "அரசு சேவைகள்" : "Citizen Services"} ({matchedServices.length})
              </h2>
              <div className={viewMode === "card" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3" : "grid grid-cols-1 lg:grid-cols-2 gap-2.5"}>
                {matchedServices.map((srv) => (
                  <div key={srv.id} className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-xs hover:border-[#004B87] transition-all flex flex-col justify-between gap-2 group">
                    <div>
                      <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
                        <span className="font-mono bg-blue-50 text-blue-800 px-1.5 py-0.2 rounded">{srv.id}</span>
                        <span className="font-bold text-emerald-700">SLA: {srv.sla}</span>
                      </div>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#004B87] transition-colors truncate">
                        {lang === "ta" ? srv.title_ta : srv.title_en}
                      </h3>
                      <p className="text-[11px] text-slate-500 truncate">{lang === "ta" ? srv.dept_ta : srv.dept_en}</p>
                    </div>
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] font-mono text-slate-600 font-bold">{srv.fee}</span>
                      <Link href={`/services/${srv.id}`} className="text-xs font-bold text-[#004B87] hover:underline">
                        Apply →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Schemes Section */}
          {(activeTab === "ALL" || activeTab === "SCHEME") && matchedSchemes.length > 0 && (
            <div className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {lang === "ta" ? "அரசு திட்டங்கள்" : "Government Schemes"} ({matchedSchemes.length})
              </h2>
              <div className={viewMode === "card" ? "grid grid-cols-1 md:grid-cols-2 gap-3" : "grid grid-cols-1 lg:grid-cols-2 gap-2.5"}>
                {matchedSchemes.map((sch) => (
                  <div key={sch.id} className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-xs hover:border-[#004B87] transition-all flex items-center justify-between gap-3 group">
                    <div className="min-w-0 flex-1">
                      <span className="text-[9px] font-bold uppercase tracking-wider bg-blue-50 text-blue-800 px-1.5 py-0.2 rounded">
                        {sch.category}
                      </span>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#004B87] truncate mt-1">
                        {lang === "ta" ? sch.name_ta : sch.name_en}
                      </h3>
                      <p className="text-[11px] text-slate-500 truncate">{sch.benefits}</p>
                    </div>
                    <a href={sch.official_url} target="_blank" rel="noopener noreferrer" className="px-2.5 py-1 rounded bg-[#004B87] text-white text-xs font-bold shrink-0">
                      Apply
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Documents Section */}
          {(activeTab === "ALL" || activeTab === "DOCUMENT") && matchedDocs.length > 0 && (
            <div className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {lang === "ta" ? "அரசாணைகள்" : "Government Orders"} ({matchedDocs.length})
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2.5">
                {matchedDocs.map((doc) => (
                  <div key={doc.id} className="bg-white rounded-xl border border-slate-200 p-3 shadow-xs hover:border-[#004B87] transition-all flex items-center justify-between gap-3 group">
                    <div className="min-w-0 flex-1">
                      <span className="font-mono text-[9px] font-bold text-blue-800 bg-blue-50 px-1.5 py-0.2 rounded">
                        {doc.id}
                      </span>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#004B87] truncate mt-0.5">
                        {lang === "ta" ? doc.subject_ta : doc.subject_en}
                      </h3>
                      <p className="text-[11px] text-slate-500 truncate">{doc.dept_en} • {doc.date}</p>
                    </div>
                    <a href={doc.url} className="px-2 py-1 rounded bg-[#004B87] text-white text-xs font-bold shrink-0">
                      PDF
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contacts Section */}
          {(activeTab === "ALL" || activeTab === "CONTACT") && matchedContacts.length > 0 && (
            <div className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {lang === "ta" ? "அதிகாரிகள் தொடர்பு" : "Government Contacts"} ({matchedContacts.length})
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2.5">
                {matchedContacts.slice(0, 20).map((off) => (
                  <div key={off.id} className="bg-white rounded-xl border border-slate-200 p-3 shadow-xs hover:border-[#004B87] transition-all flex items-center justify-between gap-3 group">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#004B87] truncate">
                        {lang === "ta" ? off.name_ta : off.name_en}
                      </h3>
                      <p className="text-[11px] text-slate-600 font-medium truncate">
                        {lang === "ta" ? off.designation_ta : off.designation_en}
                      </p>
                      <p className="text-[10px] text-slate-400 truncate">
                        {off.department_en} • {off.phone}
                      </p>
                    </div>
                    <Link href={`/contact-directory?q=${encodeURIComponent(off.name_en)}`} className="text-xs font-bold text-[#004B87] hover:underline shrink-0">
                      View →
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Districts Section */}
          {(activeTab === "ALL" || activeTab === "DISTRICT") && matchedDistricts.length > 0 && (
            <div className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {lang === "ta" ? "மாவட்டங்கள்" : "Districts"} ({matchedDistricts.length})
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
                {matchedDistricts.map((dist) => (
                  <Link
                    key={dist}
                    href={`/contact-directory?district=${encodeURIComponent(dist)}`}
                    className="p-2.5 rounded-lg border border-slate-200 bg-white hover:bg-blue-50 hover:border-blue-300 font-medium text-slate-800 transition-colors flex items-center justify-between text-xs"
                  >
                    <span className="truncate">{dist}</span>
                    <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8 text-slate-500 font-medium text-sm">
          Loading Search Portal...
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
