"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Building2,
  Search,
  ExternalLink,
  Phone,
  Mail,
  UserCheck,
  ChevronRight,
  LayoutGrid,
  List,
} from "lucide-react";
import AppShell from "@/components/layout/AppShell";

interface DepartmentInfo {
  id: string;
  name_en: string;
  name_ta: string;
  minister_en: string;
  minister_ta: string;
  secretary_en: string;
  secretary_ta: string;
  office: string;
  phone: string;
  email: string;
  service_count: number;
}

const DEPARTMENTS_DATA: DepartmentInfo[] = [
  {
    id: "DEP-REV",
    name_en: "Revenue and Disaster Management Department",
    name_ta: "வருவாய் மற்றும் பேரிடர் மேலாண்மைத் துறை",
    minister_en: "Thiru K A. Sengottaiyan",
    minister_ta: "திரு. கே. ஏ. செங்கோட்டையன்",
    secretary_en: "Dr. P. Senthil Kumar, IAS (Principal Secretary)",
    secretary_ta: "முனைவர் பா. செந்தில்குமார், இ.ஆ.ப.",
    office: "Main Secretariat, Fort St. George, Chennai 600009",
    phone: "+91-44-25670845",
    email: "revsec@tn.gov.in",
    service_count: 32,
  },
  {
    id: "DEP-HWY",
    name_en: "Highways and Minor Ports Department",
    name_ta: "நெடுஞ்சாலைகள் மற்றும் சிறு துறைமுகங்கள் துறை",
    minister_en: "Thiru Aadhav Arjuna",
    minister_ta: "திரு. ஆதவ் அர்ஜுனா",
    secretary_en: "Dr. K. Gopal, IAS (Additional Chief Secretary)",
    secretary_ta: "முனைவர் கே. கோபால், இ.ஆ.ப.",
    office: "Secretariat, Fort St. George, Chennai 600009",
    phone: "+91-44-25671802",
    email: "hwaysec@tn.gov.in",
    service_count: 14,
  },
  {
    id: "DEP-PUB",
    name_en: "Public Department (General Administration)",
    name_ta: "பொதுத் துறை (தலைமைச் செயலகம்)",
    minister_en: "Thiru C. Joseph Vijay (Hon'ble Chief Minister)",
    minister_ta: "திரு. சி. ஜோசப் விஜய் (முதலமைச்சர்)",
    secretary_en: "Dr. M. Sai Kumar, IAS (Chief Secretary)",
    secretary_ta: "டாக்டர் எம். சாய்குமார், இ.ஆ.ப. (தலைமைச் செயலாளர்)",
    office: "Secretariat, Fort St. George, Chennai 600009",
    phone: "+91-44-25671555",
    email: "cs@tn.gov.in",
    service_count: 18,
  },
  {
    id: "DEP-IT",
    name_en: "Information Technology and Digital Services",
    name_ta: "தகவல் தொழில்நுட்பவியல் மற்றும் டிஜிட்டல் சேவைகள் துறை",
    minister_en: "Dr Kumar. R",
    minister_ta: "டாக்டர் குமார். ஆர்",
    secretary_en: "Dr. Kumar Jayant, IAS (Principal Secretary)",
    secretary_ta: "முனைவர் குமார் ஜெயந்த், இ.ஆ.ப.",
    office: "Secretariat, Fort St. George, Chennai 600009",
    phone: "+91-44-25670788",
    email: "itsec@tn.gov.in",
    service_count: 24,
  },
  {
    id: "DEP-AGR",
    name_en: "Agriculture and Farmers Welfare Department",
    name_ta: "வேளாண்மை மற்றும் உழவர் நலத்துறை",
    minister_en: "Thiru R. Vinoth",
    minister_ta: "திரு. ஆர். வினோத்",
    secretary_en: "Thiru Apoorva, IAS (Principal Secretary)",
    secretary_ta: "திருமதி. அபூர்வா, இ.ஆ.ப.",
    office: "Secretariat, Fort St. George, Chennai 600009",
    phone: "+91-44-25671345",
    email: "agrisec@tn.gov.in",
    service_count: 28,
  },
  {
    id: "DEP-SOC",
    name_en: "Social Welfare and Women Empowerment",
    name_ta: "சமூக நலம் மற்றும் மகளிர் உரிமைத் துறை",
    minister_en: "Tmt Jagadeshwari. K",
    minister_ta: "திருமதி ஜெகதீஸ்வரி. கே",
    secretary_en: "Tmt. Jayashree Muralidharan, IAS",
    secretary_ta: "திருமதி. ஜெயஸ்ரீ முரளிதரன், இ.ஆ.ப.",
    office: "Secretariat, Fort St. George, Chennai 600009",
    phone: "+91-44-25671600",
    email: "swsec@tn.gov.in",
    service_count: 22,
  },
];

export default function DepartmentsPage() {
  const [lang, setLang] = useState<"ta" | "en">("en");
  const [workspace, setWorkspace] = useState<"public" | "official">("public");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"card" | "list">("card");

  const filteredDepts = DEPARTMENTS_DATA.filter(
    (dept) =>
      dept.name_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dept.name_ta.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dept.minister_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dept.secretary_en.toLowerCase().includes(searchQuery.toLowerCase())
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
                {lang === "ta" ? "தலைமைச் செயலகத் துறைகள்" : "Departments"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg md:text-xl font-bold text-slate-900 leading-tight">
                {lang === "ta" ? "அரசு தலைமைச் செயலகத் துறைகள் (45 துறைகள்)" : "Secretariat Departments (45 Departments)"}
              </h1>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                {filteredDepts.length} {lang === "ta" ? "துறைகள்" : "Departments"}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {lang === "ta"
                ? "அமைச்சர்கள், செயலாளர்கள் & துறை சார்ந்த மக்கள் சேவைகள் பட்டியல்"
                : "Ministers, Secretaries, Portfolios, and Citizen Services Index"}
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

        {/* Search Bar */}
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-3 justify-between items-center">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === "ta" ? "துறை, அமைச்சர், செயலாளர் பெயர் தேடுக..." : "Search department, minister, secretary..."}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#004B87] bg-slate-50 focus:bg-white"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2" />
          </div>
          <span className="text-xs text-slate-500 font-semibold">
            {lang === "ta" ? `${filteredDepts.length} துறைகள் காட்டப்படுகின்றன` : `Showing ${filteredDepts.length} Departments`}
          </span>
        </div>

        {/* Departments Content: Card View vs List View (Two Columns) */}
        {viewMode === "card" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredDepts.map((dept) => (
              <div
                key={dept.id}
                className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs hover:border-[#004B87] hover:shadow-sm transition-all flex flex-col justify-between gap-3 group"
              >
                <div>
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      {dept.id}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {dept.service_count} {lang === "ta" ? "சேவைகள்" : "Services"}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#004B87] leading-tight transition-colors">
                    {lang === "ta" ? dept.name_ta : dept.name_en}
                  </h3>

                  <div className="mt-3 space-y-2 text-xs">
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 space-y-0.5">
                      <div className="text-slate-500 font-medium text-[10px] uppercase">
                        {lang === "ta" ? "துறை அமைச்சர்:" : "Minister in-charge:"}
                      </div>
                      <div className="font-bold text-slate-800 text-xs">{lang === "ta" ? dept.minister_ta : dept.minister_en}</div>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 space-y-0.5">
                      <div className="text-slate-500 font-medium text-[10px] uppercase">
                        {lang === "ta" ? "அரசு செயலாளர்:" : "Secretary to Government:"}
                      </div>
                      <div className="font-bold text-slate-800 text-xs">{lang === "ta" ? dept.secretary_ta : dept.secretary_en}</div>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-100 space-y-1 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <a href={`tel:${dept.phone}`} className="font-mono text-blue-700 hover:underline">
                        {dept.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <a href={`mailto:${dept.email}`} className="text-blue-700 hover:underline truncate">
                        {dept.email}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={`/contact-directory?dept=${encodeURIComponent(dept.name_en)}`}
                    className="text-xs font-bold text-[#004B87] hover:underline flex items-center gap-1"
                  >
                    <span>{lang === "ta" ? "அதிகாரிகள் பட்டியல்" : "View Officers"}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href={`/services?dept=${encodeURIComponent(dept.name_en)}`}
                    className="text-xs font-bold text-slate-700 hover:underline flex items-center gap-1"
                  >
                    <span>{lang === "ta" ? "துறை சேவைகள்" : "View Services"}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* List View (Two Columns) */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {filteredDepts.map((dept) => (
              <div
                key={dept.id}
                className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-xs hover:border-[#004B87] transition-all flex items-center justify-between gap-3 group"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[9px] font-mono font-bold text-blue-800 bg-blue-50 border border-blue-200 px-1.5 py-0.2 rounded shrink-0">
                      {dept.id}
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold shrink-0">
                      {dept.service_count} services
                    </span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#004B87] truncate">
                    {lang === "ta" ? dept.name_ta : dept.name_en}
                  </h3>
                  <p className="text-[11px] text-slate-500 truncate">
                    {lang === "ta" ? dept.minister_ta : dept.minister_en} | {lang === "ta" ? dept.secretary_ta : dept.secretary_en}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={`/contact-directory?dept=${encodeURIComponent(dept.name_en)}`}
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
    </AppShell>
  );
}
