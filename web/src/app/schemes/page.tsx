"use client";

import { useState } from "react";
import Link from "next/link";
import schemesData from "@/data/schemes.json";
import {
  Search,
  Award,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
  LayoutGrid,
  List,
} from "lucide-react";
import AppShell from "@/components/layout/AppShell";

export default function SchemesPage() {
  const [lang, setLang] = useState<"ta" | "en">("en");
  const [workspace, setWorkspace] = useState<"public" | "official">("public");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [viewMode, setViewMode] = useState<"card" | "list">("card");

  const categories = Array.from(new Set(schemesData.map((s) => s.category)));

  const filteredSchemes = schemesData.filter((sch) => {
    const matchesSearch =
      sch.name_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sch.name_ta.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sch.dept_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sch.benefits.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCat = selectedCategory === "ALL" || sch.category === selectedCategory;
    return matchesSearch && matchesCat;
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
                {lang === "ta" ? "திட்டங்கள் & பயன்கள்" : "Schemes & Benefits"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg md:text-xl font-bold text-slate-900 leading-tight">
                {lang === "ta" ? "அரசு நலத்திட்டங்கள் & பயன்கள்" : "Government Schemes & Welfare Benefits"}
              </h1>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                {filteredSchemes.length} {lang === "ta" ? "திட்டங்கள்" : "Schemes"}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {lang === "ta"
                ? "மகளிர், விவசாயிகள், மாணவர்கள் மற்றும் முதியோர்களுக்கான அரசு நலத்திட்டங்கள்"
                : "Verified Eligibility, Benefits, and Official Application Gateways"}
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
              title="Card View (2 Columns)"
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

        {/* Search & Category Filter */}
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                lang === "ta"
                  ? "திட்டத்தின் பெயர், துறை, பயன்கள் தேடுக..."
                  : "Search schemes by name, department, keyword..."
              }
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#004B87] bg-slate-50 focus:bg-white"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2" />
          </div>

          <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
            <button
              onClick={() => setSelectedCategory("ALL")}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                selectedCategory === "ALL"
                  ? "bg-[#004B87] text-white shadow-xs font-bold"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
              }`}
            >
              {lang === "ta" ? "அனைத்து பிரிவுகள்" : "All Categories"}
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-[#004B87] text-white shadow-xs font-bold"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Schemes Content: Card View vs List View (Two Columns) */}
        {viewMode === "card" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredSchemes.map((sch) => (
              <div
                key={sch.id}
                className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs hover:border-[#004B87] hover:shadow-sm transition-all flex flex-col justify-between gap-3 group"
              >
                <div>
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-800 border border-blue-200 px-2 py-0.5 rounded">
                      {lang === "ta" ? sch.category_ta || sch.category : sch.category}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1 border border-emerald-200">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      Verified Scheme
                    </span>
                  </div>

                  <h3 className="font-extrabold text-slate-900 group-hover:text-[#004B87] text-sm leading-snug transition-colors">
                    {lang === "ta" ? sch.name_ta : sch.name_en}
                  </h3>
                  <p className="text-[11px] font-semibold text-slate-500 mt-0.5 truncate">
                    {lang === "ta" ? sch.dept_ta : sch.dept_en}
                  </p>

                  <div className="mt-2.5 p-2.5 rounded-lg bg-emerald-50/70 border border-emerald-100">
                    <span className="text-[10px] font-bold uppercase text-emerald-800 tracking-wider block mb-0.5">
                      {lang === "ta" ? "வழங்கப்படும் பயன்:" : "Key Benefit:"}
                    </span>
                    <p className="text-xs font-bold text-emerald-950 leading-relaxed">{sch.benefits}</p>
                  </div>

                  <div className="mt-2.5 text-xs text-slate-600 space-y-1">
                    <p className="text-[11px] leading-relaxed">
                      <strong className="text-slate-800">{lang === "ta" ? "தகுதி:" : "Eligibility:"} </strong>
                      {sch.eligibility}
                    </p>
                    <p className="text-[11px] leading-relaxed text-slate-500 truncate">
                      <strong className="text-slate-700">{lang === "ta" ? "ஆவணங்கள்:" : "Docs:"} </strong>
                      {sch.required_docs}
                    </p>
                  </div>
                </div>

                <div className="pt-2.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="text-[10px] text-slate-500 truncate max-w-[200px]">
                    {sch.responsible_office.split(",")[0]}
                  </span>
                  <div className="flex items-center gap-2">
                    <a
                      href={sch.official_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#004B87] hover:text-blue-900 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200"
                    >
                      <span>{lang === "ta" ? "அதிகாரப்பூர்வ தளம்" : "Apply"}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <Link
                      href={`/contact-directory?department=${encodeURIComponent(sch.dept_en.split("&")[0].trim())}`}
                      className="inline-flex items-center gap-0.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 px-2 py-1 rounded-md"
                    >
                      <span>{lang === "ta" ? "அதிகாரி" : "Officer"}</span>
                      <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* List View (Two Columns) */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {filteredSchemes.map((sch) => (
              <div
                key={sch.id}
                className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-xs hover:border-[#004B87] transition-all flex items-center justify-between gap-3 group"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[9px] font-bold uppercase tracking-wider bg-blue-50 text-blue-800 border border-blue-200 px-1.5 py-0.2 rounded shrink-0">
                      {lang === "ta" ? sch.category_ta || sch.category : sch.category}
                    </span>
                    <span className="text-[10px] text-emerald-700 font-semibold truncate">
                      {sch.benefits.slice(0, 40)}...
                    </span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#004B87] truncate">
                    {lang === "ta" ? sch.name_ta : sch.name_en}
                  </h3>
                  <p className="text-[11px] text-slate-500 truncate">
                    {lang === "ta" ? sch.dept_ta : sch.dept_en}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <a
                    href={sch.official_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#004B87] hover:bg-blue-900 text-white font-bold text-xs shadow-xs"
                  >
                    <span>{lang === "ta" ? "விண்ணப்பி" : "Apply"}</span>
                    <ExternalLink className="w-3 h-3" />
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
