"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Clock,
  ExternalLink,
  CheckCircle2,
  LayoutGrid,
  List,
  FileText,
  CreditCard,
  Building2,
  ChevronRight,
} from "lucide-react";
import AppShell from "@/components/layout/AppShell";

interface ServiceItem {
  id: string;
  name_en: string;
  name_ta: string;
  department_en: string;
  department_ta: string;
  category: string;
  category_ta: string;
  sla_days: number;
  fee_inr: number;
  channel: string;
  required_docs: string[];
  action_url: string;
}

const ALL_SERVICES: ServiceItem[] = [
  {
    id: "TN-REV-SRV-0014",
    name_en: "Community Certificate",
    name_ta: "சாதிச் சான்றிதழ்",
    department_en: "Revenue and Disaster Management",
    department_ta: "வருவாய் மற்றும் பேரிடர் மேலாண்மைத் துறை",
    category: "Certificates",
    category_ta: "சான்றிதழ்கள்",
    sla_days: 15,
    fee_inr: 60,
    channel: "Online (e-Sevai)",
    required_docs: ["Aadhaar Card", "Ration Card", "Parent Certificate", "School Certificate"],
    action_url: "https://tnesevai.tn.gov.in/",
  },
  {
    id: "TN-REV-SRV-0015",
    name_en: "Patta Transfer",
    name_ta: "பட்டா மாறுதல்",
    department_en: "Revenue and Disaster Management",
    department_ta: "வருவாய் மற்றும் பேரிடர் மேலாண்மைத் துறை",
    category: "Land & Property",
    category_ta: "நிலம் & சொத்து",
    sla_days: 30,
    fee_inr: 100,
    channel: "Online (e-Sevai)",
    required_docs: ["Sale Deed", "Encumbrance Certificate (EC)", "Aadhaar Card", "Prior Patta Copy"],
    action_url: "https://eservices.tn.gov.in/",
  },
  {
    id: "TN-REV-SRV-0016",
    name_en: "Income Certificate",
    name_ta: "வருமானச் சான்றிதழ்",
    department_en: "Revenue and Disaster Management",
    department_ta: "வருவாய் மற்றும் பேரிடர் மேலாண்மைத் துறை",
    category: "Certificates",
    category_ta: "சான்றிதழ்கள்",
    sla_days: 15,
    fee_inr: 60,
    channel: "Online (e-Sevai)",
    required_docs: ["Salary Slip / Income Proof", "Ration Card", "Aadhaar Card"],
    action_url: "https://tnesevai.tn.gov.in/",
  },
  {
    id: "TN-SOC-SRV-0021",
    name_en: "Old Age Pension (OAP)",
    name_ta: "முதியோர் உதவித்தொகை",
    department_en: "Social Welfare and Women Empowerment",
    department_ta: "சமூக நலம் மற்றும் மகளிர் உரிமைத் துறை",
    category: "Social Welfare",
    category_ta: "சமூக நலம்",
    sla_days: 21,
    fee_inr: 0,
    channel: "Online (e-Sevai)",
    required_docs: ["Age Proof (Aadhaar)", "Destitute Certificate", "Bank Passbook"],
    action_url: "https://tnesevai.tn.gov.in/",
  },
  {
    id: "TN-AGR-SRV-0033",
    name_en: "Uzhavan Fertilizer & Seed Subsidy",
    name_ta: "உழவன் விதை மற்றும் உர மானியம்",
    department_en: "Agriculture and Farmers Welfare",
    department_ta: "வேளாண்மை மற்றும் உழவர் நலத்துறை",
    category: "Agriculture",
    category_ta: "வேளாண்மை",
    sla_days: 7,
    fee_inr: 0,
    channel: "Mobile (Uzhavan App)",
    required_docs: ["Farmer ID / Patta", "Aadhaar Card", "Bank Account Details"],
    action_url: "https://www.tnagrisnet.tn.gov.in/",
  },
  {
    id: "TN-EDU-SRV-0045",
    name_en: "Pudhumai Penn Higher Education Grant",
    name_ta: "புதுமைப் பெண் கல்வி உதவித்தொகை",
    department_en: "Higher Education / Social Welfare",
    department_ta: "உயர்கல்வி / சமூக நலத்துறை",
    category: "Education",
    category_ta: "கல்வி",
    sla_days: 10,
    fee_inr: 0,
    channel: "Online Portal",
    required_docs: ["Government School 6-12 TC", "College Bonafide", "Bank Account", "Aadhaar"],
    action_url: "https://pudhumaipenn.tn.gov.in/",
  },
];

export default function ServicesPage() {
  const [lang, setLang] = useState<"ta" | "en">("en");
  const [workspace, setWorkspace] = useState<"public" | "official">("public");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedDept, setSelectedDept] = useState("ALL");
  const [viewMode, setViewMode] = useState<"card" | "list">("card");

  const categories = [
    { id: "ALL", en: "All Categories", ta: "அனைத்து பிரிவுகள்" },
    { id: "Certificates", en: "Certificates", ta: "சான்றிதழ்கள்" },
    { id: "Land & Property", en: "Land & Property", ta: "நிலம் & சொத்து" },
    { id: "Social Welfare", en: "Social Welfare", ta: "சமூக நலம்" },
    { id: "Agriculture", en: "Agriculture", ta: "வேளாண்மை" },
    { id: "Education", en: "Education", ta: "கல்வி" },
  ];

  const filteredServices = ALL_SERVICES.filter((srv) => {
    const matchesSearch =
      srv.name_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      srv.name_ta.toLowerCase().includes(searchQuery.toLowerCase()) ||
      srv.department_en.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === "ALL" || srv.category === selectedCategory;
    const matchesDept = selectedDept === "ALL" || srv.department_en.includes(selectedDept);

    return matchesSearch && matchesCategory && matchesDept;
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
                {lang === "ta" ? "பொதுமக்கள் சேவைகள்" : "Citizen Services"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg md:text-xl font-bold text-slate-900 leading-tight">
                {lang === "ta" ? "பொதுமக்கள் சேவை கண்டுபிடிப்பான் (Service Finder)" : "Citizen Service Finder"}
              </h1>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                {filteredServices.length} {lang === "ta" ? "சேவைகள்" : "Services"}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {lang === "ta"
                ? "சட்டப்பூர்வ காலக்கெடு (SLA) & ஆவண விவரங்களுடன் கூடிய அதிகாரப்பூர்வ வழிகாட்டி"
                : "Verified Statutory Services with SLAs and Direct Application Gateways"}
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

        {/* Compact Search & Category Filters */}
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-3 justify-between items-center">
          <div className="relative w-full md:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                lang === "ta"
                  ? "சேவை பெயர், துறை, சான்றிதழ் தேடுக..."
                  : "Search services, certificates, schemes..."
              }
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#004B87] bg-slate-50 focus:bg-white"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2" />
          </div>

          <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                  selectedCategory === c.id
                    ? "bg-[#004B87] text-white shadow-xs font-bold"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200"
                }`}
              >
                {lang === "ta" ? c.ta : c.en}
              </button>
            ))}
          </div>
        </div>

        {/* Services Render: Card View vs List View (Two Columns) */}
        {viewMode === "card" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs hover:border-[#004B87] hover:shadow-sm transition-all flex flex-col justify-between gap-3 group"
              >
                <div>
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      {service.channel}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      <Clock className="w-3 h-3" /> SLA: {service.sla_days} {lang === "ta" ? "நாட்கள்" : "Days"}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#004B87] leading-tight transition-colors">
                    {lang === "ta" ? service.name_ta : service.name_en}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium mt-1 truncate">
                    {lang === "ta" ? service.department_ta : service.department_en}
                  </p>

                  <div className="mt-3 p-2.5 rounded-lg bg-slate-50 border border-slate-100 space-y-1.5 text-xs">
                    <div className="flex justify-between items-center text-slate-700">
                      <span className="font-medium text-[11px]">{lang === "ta" ? "அரசு கட்டணம்:" : "Official Fee:"}</span>
                      <span className="font-bold font-mono text-[11px]">
                        {service.fee_inr === 0 ? "FREE / இலவசம்" : `₹${service.fee_inr}`}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-slate-700 block text-[11px] mb-0.5">
                        {lang === "ta" ? "தேவையான ஆவணங்கள்:" : "Required Documents:"}
                      </span>
                      <ul className="list-disc list-inside text-slate-600 text-[10px] space-y-0.5">
                        {service.required_docs.slice(0, 2).map((doc, idx) => (
                          <li key={idx} className="truncate">
                            {doc}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
                  <Link
                    href={`/services/${service.id}`}
                    className="text-xs font-bold text-[#004B87] hover:underline"
                  >
                    {lang === "ta" ? "விவரம்" : "Details"} →
                  </Link>
                  <a
                    href={service.action_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[#004B87] hover:bg-blue-900 text-white font-bold text-xs transition-colors shadow-xs"
                  >
                    <span>{lang === "ta" ? "விண்ணப்பிக்க" : "Apply"}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* List View (Two Columns) */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-xs hover:border-[#004B87] transition-all flex items-center justify-between gap-3 group"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[9px] font-mono font-bold uppercase text-blue-800 bg-blue-50 px-1.5 py-0.2 rounded border border-blue-200 shrink-0">
                      {service.channel}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded shrink-0">
                      SLA: {service.sla_days}d
                    </span>
                    <span className="text-[10px] font-mono font-bold text-slate-600 bg-slate-100 px-1.5 py-0.2 rounded shrink-0">
                      {service.fee_inr === 0 ? "FREE" : `₹${service.fee_inr}`}
                    </span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#004B87] truncate">
                    {lang === "ta" ? service.name_ta : service.name_en}
                  </h3>
                  <p className="text-[11px] text-slate-500 truncate">
                    {lang === "ta" ? service.department_ta : service.department_en}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={`/services/${service.id}`}
                    className="text-xs font-semibold text-slate-600 hover:text-[#004B87] px-2 py-1 rounded hover:bg-slate-100"
                  >
                    {lang === "ta" ? "விவரம்" : "Details"}
                  </Link>
                  <a
                    href={service.action_url}
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
