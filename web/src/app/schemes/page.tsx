"use client";

import { useState } from "react";
import Link from "next/link";
import schemesData from "@/data/schemes.json";
import {
  Search,
  ArrowLeft,
  Globe,
  Award,
  CheckCircle2,
  FileText,
  Building,
  ExternalLink,
  Users,
  ShieldCheck,
  ChevronRight,
  Filter,
} from "lucide-react";

export default function SchemesPage() {
  const [lang, setLang] = useState<"ta" | "en">("en");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedScheme, setSelectedScheme] = useState<any | null>(null);

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
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col antialiased">
      {/* Header */}
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
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                  Official Welfare Registry
                </span>
                <h1 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                  {lang === "ta" ? "அரசு நலத்திட்டங்கள் & பயன்கள்" : "Government Schemes & Welfare Benefits"}
                </h1>
              </div>
              <span className="text-[11px] text-slate-500 font-medium">
                {lang === "ta"
                  ? "மகளிர், விவசாயிகள், மாணவர்கள் மற்றும் முதியோர்களுக்கான அரசு நலத்திட்டங்கள்"
                  : "Verified Eligibility, Benefits, and Official Application Gateways"}
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
        {/* Search & Category Filter */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                lang === "ta"
                  ? "திட்டத்தின் பெயர், துறை, பயன்கள் தேடுக..."
                  : "Search schemes by name, department, keyword..."
              }
              className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-slate-50 focus:bg-white"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          </div>

          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            <button
              onClick={() => setSelectedCategory("ALL")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedCategory === "ALL"
                  ? "bg-[#004B87] text-white shadow-sm"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {lang === "ta" ? "அனைத்து பிரிவுகள்" : "All Categories"}
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? "bg-[#004B87] text-white shadow-sm"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Schemes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredSchemes.map((sch) => (
            <div
              key={sch.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:border-blue-400 transition-all flex flex-col justify-between gap-4"
            >
              <div>
                <div className="flex justify-between items-start gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-800 border border-blue-200 px-2.5 py-0.5 rounded">
                    {lang === "ta" ? sch.category_ta || sch.category : sch.category}
                  </span>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1 border border-emerald-200">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    Verified Scheme
                  </span>
                </div>

                <h3 className="font-extrabold text-slate-900 text-base leading-snug">
                  {lang === "ta" ? sch.name_ta : sch.name_en}
                </h3>
                <p className="text-xs font-semibold text-slate-500 mt-1">
                  {lang === "ta" ? sch.dept_ta : sch.dept_en}
                </p>

                <div className="mt-3 p-3 rounded-xl bg-emerald-50/60 border border-emerald-100">
                  <span className="text-[10px] font-bold uppercase text-emerald-800 tracking-wider block mb-0.5">
                    {lang === "ta" ? "வழங்கப்படும் பயன்:" : "Key Benefit:"}
                  </span>
                  <p className="text-xs font-bold text-emerald-950">{sch.benefits}</p>
                </div>

                <div className="mt-3 text-xs text-slate-600 space-y-1">
                  <p>
                    <strong className="text-slate-800">{lang === "ta" ? "தகுதி:" : "Eligibility:"} </strong>
                    {sch.eligibility}
                  </p>
                  <p>
                    <strong className="text-slate-800">{lang === "ta" ? "தேவையான ஆவணங்கள்:" : "Documents:"} </strong>
                    {sch.required_docs}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="text-[11px] text-slate-500">
                  Responsible: {sch.responsible_office.split(",")[0]}
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href={sch.official_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 hover:text-blue-900 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200"
                  >
                    <span>{lang === "ta" ? "அதிகாரப்பூர்வ தளம்" : "Apply Online"}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <Link
                    href={`/contact-directory?department=${encodeURIComponent(sch.dept_en.split("&")[0].trim())}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 px-3 py-1.5 rounded-lg"
                  >
                    <span>{lang === "ta" ? "துறை அதிகாரிகள்" : "View Nodal Officer"}</span>
                    <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
