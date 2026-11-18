"use client";

import { useState } from "react";
import Link from "next/link";
import docsData from "@/data/documents.json";
import {
  Search,
  FileText,
  Download,
  CheckCircle,
  AlertCircle,
  Calendar,
  Building,
  LayoutGrid,
  List,
} from "lucide-react";
import AppShell from "@/components/layout/AppShell";

export default function DocumentsPage() {
  const [lang, setLang] = useState<"ta" | "en">("en");
  const [workspace, setWorkspace] = useState<"public" | "official">("public");
  const [search, setSearch] = useState("");
  const [selectedYear, setSelectedYear] = useState("ALL");
  const [selectedType, setSelectedType] = useState("ALL");
  const [viewMode, setViewMode] = useState<"card" | "list">("card");

  const filtered = docsData.filter((doc) => {
    const matchesSearch =
      doc.subject_en.toLowerCase().includes(search.toLowerCase()) ||
      doc.subject_ta.toLowerCase().includes(search.toLowerCase()) ||
      doc.id.toLowerCase().includes(search.toLowerCase());
    const matchesYear = selectedYear === "ALL" || doc.year === selectedYear;
    const matchesType = selectedType === "ALL" || doc.type.includes(selectedType);

    return matchesSearch && matchesYear && matchesType;
  });

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
                {lang === "ta" ? "அரசாணைகள்" : "Government Orders"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg md:text-xl font-bold text-slate-900 leading-tight">
                {lang === "ta" ? "அரசு ஆணைகள் & ஆவணங்கள் களஞ்சியம்" : "Government Orders & Publications Repository"}
              </h1>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                {filtered.length} {lang === "ta" ? "ஆவணங்கள்" : "Documents"}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {lang === "ta"
                ? "டிஜிட்டல் ஆவணங்கள் தேடல் மற்றும் பதிவிறக்கம் (G.O. Ms, Gazettes, Policy Notes)"
                : "Centralized Document Intelligence Registry with OCR Indexing"}
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

        {/* Filters */}
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:w-80">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={lang === "ta" ? "கோரிக்கை எண் 21, அரசாணை எண், துறை..." : "Search by G.O. No, subject, Demand 21..."}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#004B87] bg-slate-50 focus:bg-white"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2" />
          </div>

          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-2.5 py-1.5 text-xs rounded-md border border-slate-300 bg-white text-slate-700"
            >
              <option value="ALL">{lang === "ta" ? "அனைத்து ஆண்டுகள்" : "All Years"}</option>
              <option value="2026">2026</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
            </select>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-2.5 py-1.5 text-xs rounded-md border border-slate-300 bg-white text-slate-700"
            >
              <option value="ALL">{lang === "ta" ? "அனைத்து ஆவண வகைகள்" : "All Document Types"}</option>
              <option value="Policy Note">Policy Note</option>
              <option value="Government Order">Government Order (G.O.)</option>
              <option value="Act">Act / Statute</option>
            </select>
          </div>
        </div>

        {/* Documents Content: Card View vs List View (Two Columns) */}
        {viewMode === "card" ? (
          <div className="grid grid-cols-1 gap-3">
            {filtered.map((doc) => (
              <article
                key={doc.id}
                className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs hover:border-[#004B87] transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-3 group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#004B87] flex items-center justify-center shrink-0 border border-blue-100">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-1.5 mb-1">
                      <span className="font-mono text-[10px] font-bold text-blue-800 bg-blue-50 px-2 py-0.2 rounded border border-blue-200">
                        {doc.id}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.2 rounded">
                        {doc.type}
                      </span>
                      {doc.is_machine_readable ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                          <CheckCircle className="w-3 h-3" /> OCR Indexed
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                          <AlertCircle className="w-3 h-3" /> Scanned
                        </span>
                      )}
                    </div>

                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#004B87] leading-snug transition-colors">
                      {lang === "ta" ? doc.subject_ta : doc.subject_en}
                    </h3>

                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 mt-1 font-medium">
                      <span className="flex items-center gap-1">
                        <Building className="w-3 h-3 text-slate-400" />
                        {lang === "ta" ? doc.dept_ta : doc.dept_en}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        {doc.date}
                      </span>
                      <span>Size: {doc.file_size}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                  <a
                    href={doc.url}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#004B87] hover:bg-blue-900 text-white font-bold text-xs transition-colors shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{lang === "ta" ? "பதிவிறக்கு" : "Download PDF"}</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* List View (Two Columns) */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {filtered.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-xl border border-slate-200 p-3 shadow-xs hover:border-[#004B87] transition-all flex items-center justify-between gap-3 group"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-[9px] font-bold text-blue-800 bg-blue-50 px-1.5 py-0.2 rounded border border-blue-200 shrink-0">
                      {doc.id}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium shrink-0">
                      {doc.date}
                    </span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#004B87] truncate">
                    {lang === "ta" ? doc.subject_ta : doc.subject_en}
                  </h3>
                  <p className="text-[11px] text-slate-500 truncate">
                    {lang === "ta" ? doc.dept_ta : doc.dept_en} • {doc.file_size}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <a
                    href={doc.url}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#004B87] hover:bg-blue-900 text-white font-bold text-xs shadow-xs"
                  >
                    <Download className="w-3 h-3" />
                    <span>PDF</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
