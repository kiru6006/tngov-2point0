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
  ArrowLeft,
  Calendar,
  Building,
  Globe,
} from "lucide-react";

export default function DocumentsPage() {
  const [lang, setLang] = useState<"ta" | "en">("ta");
  const [search, setSearch] = useState("");
  const [selectedYear, setSelectedYear] = useState("ALL");
  const [selectedType, setSelectedType] = useState("ALL");

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
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
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
              <h1 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                {lang === "ta" ? "அரசு ஆணைகள் & ஆவணங்கள் களஞ்சியம்" : "Government Orders & Publications Repository"}
              </h1>
              <span className="text-[11px] text-slate-500 font-medium">
                {lang === "ta" ? "டிஜிட்டல் ஆவணங்கள் தேடல் மற்றும் பதிவிறக்கம்" : "Centralized Document Intelligence Registry"}
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

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 flex flex-col gap-6">
        {/* Filters */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:w-96">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={lang === "ta" ? "கோரிக்கை எண் 21, அரசாணை எண், துறை..." : "Search by G.O. No, subject, Demand 21..."}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </div>

          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white text-slate-700"
            >
              <option value="ALL">{lang === "ta" ? "அனைத்து ஆண்டுகள்" : "All Years"}</option>
              <option value="2026">2026</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
            </select>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white text-slate-700"
            >
              <option value="ALL">{lang === "ta" ? "அனைத்து ஆவண வகைகள்" : "All Document Types"}</option>
              <option value="Policy Note">Policy Note</option>
              <option value="Government Order">Government Order (G.O.)</option>
              <option value="Act">Act / Statute</option>
            </select>
          </div>
        </div>

        {/* Document Cards */}
        <div className="grid grid-cols-1 gap-4">
          {filtered.map((doc) => (
            <article
              key={doc.id}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:border-blue-300 transition-colors flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 border border-blue-100">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      {doc.id}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                      {doc.type}
                    </span>
                    {doc.is_machine_readable ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                        <CheckCircle className="w-3 h-3" /> OCR Indexed (Searchable)
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                        <AlertCircle className="w-3 h-3" /> Scanned Image (Pending OCR)
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                    {lang === "ta" ? doc.subject_ta : doc.subject_en}
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-2 font-medium">
                    <span className="flex items-center gap-1">
                      <Building className="w-3.5 h-3.5 text-slate-400" />
                      {lang === "ta" ? doc.dept_ta : doc.dept_en}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {doc.date}
                    </span>
                    <span>Size: {doc.file_size}</span>
                  </div>
                </div>
              </div>

              <div className="shrink-0 w-full md:w-auto flex md:flex-col items-center justify-end gap-2">
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#004B87] hover:bg-blue-900 text-white font-semibold text-xs transition-colors shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
