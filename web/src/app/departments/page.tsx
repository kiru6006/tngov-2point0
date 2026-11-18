"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Building2,
  ArrowLeft,
  Globe,
  Search,
  ExternalLink,
  Phone,
  Mail,
  UserCheck,
  ChevronRight,
} from "lucide-react";

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
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDepts = DEPARTMENTS_DATA.filter(
    (dept) =>
      dept.name_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dept.name_ta.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dept.minister_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dept.secretary_en.toLowerCase().includes(searchQuery.toLowerCase())
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
                {lang === "ta" ? "அரசு தலைமைச் செயலகத் துறைகள் (45 துறைகள்)" : "Secretariat Departments (45 Departments)"}
              </h1>
              <span className="text-[11px] text-slate-500 font-medium">
                {lang === "ta"
                  ? "அமைச்சர்கள், செயலாளர்கள் & துறை சார்ந்த மக்கள் சேவைகள் பட்டியல்"
                  : "Ministers, Secretaries, Portfolios, and Citizen Services Index"}
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
              placeholder={lang === "ta" ? "துறை, அமைச்சர், செயலாளர் பெயர் தேடுக..." : "Search department, minister, secretary..."}
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          </div>
          <span className="text-xs text-slate-500 font-semibold">
            {lang === "ta" ? `${filteredDepts.length} துறைகள் காட்டப்படுகின்றன` : `Showing ${filteredDepts.length} Departments`}
          </span>
        </div>

        {/* Departments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredDepts.map((dept) => (
            <div
              key={dept.id}
              className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:border-blue-400 transition-all flex flex-col justify-between gap-4"
            >
              <div>
                <div className="flex justify-between items-start gap-2 mb-2">
                  <span className="text-[10px] font-mono font-bold uppercase text-blue-900 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                    {dept.id}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded">
                    {dept.service_count} {lang === "ta" ? "சேவைகள்" : "Services"}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-tight">
                  {lang === "ta" ? dept.name_ta : dept.name_en}
                </h3>

                <div className="mt-4 space-y-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
                    <div className="text-slate-500 font-medium">{lang === "ta" ? "துறை அமைச்சர்:" : "Minister in-charge:"}</div>
                    <div className="font-bold text-slate-800">{lang === "ta" ? dept.minister_ta : dept.minister_en}</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
                    <div className="text-slate-500 font-medium">{lang === "ta" ? "அரசு செயலாளர்:" : "Secretary to Government:"}</div>
                    <div className="font-bold text-slate-800">{lang === "ta" ? dept.secretary_ta : dept.secretary_en}</div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <a href={`tel:${dept.phone}`} className="font-mono text-blue-700 hover:underline">
                      {dept.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <a href={`mailto:${dept.email}`} className="text-blue-700 hover:underline">
                      {dept.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href={`/contact-directory?dept=${encodeURIComponent(dept.name_en)}`}
                  className="text-xs font-bold text-blue-700 hover:underline flex items-center gap-1"
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
      </main>
    </div>
  );
}
