"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  ArrowLeft,
  Globe,
  Clock,
  FileCheck,
  Building2,
  ExternalLink,
  Filter,
  CheckCircle2,
  CreditCard,
} from "lucide-react";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedDept, setSelectedDept] = useState("ALL");

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
                {lang === "ta" ? "பொதுமக்கள் சேவை கண்டுபிடிப்பான் (Service Finder)" : "Citizen Service Finder"}
              </h1>
              <span className="text-[11px] text-slate-500 font-medium">
                {lang === "ta"
                  ? "சட்டப்பூர்வ காலக்கெடு & ஆவண விவரங்களுடன் கூடிய அதிகாரப்பூர்வ வழிகாட்டி"
                  : "Verified Statutory Services with SLAs and Direct Application Gateways"}
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
        {/* Search & Filter Bar */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                lang === "ta"
                  ? "சேவை பெயர், துறை, சான்றிதழ் தேடுக..."
                  : "Search services, certificates, schemes..."
              }
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          </div>

          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  selectedCategory === c.id
                    ? "bg-[#004B87] text-white shadow-sm"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200"
                }`}
              >
                {lang === "ta" ? c.ta : c.en}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between gap-4"
            >
              <div>
                <div className="flex justify-between items-start gap-2 mb-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-800 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                    {service.channel}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    <Clock className="w-3 h-3" /> SLA: {service.sla_days} {lang === "ta" ? "நாட்கள்" : "Days"}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-tight">
                  {lang === "ta" ? service.name_ta : service.name_en}
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  {lang === "ta" ? service.department_ta : service.department_en}
                </p>

                <div className="mt-4 p-3 rounded-lg bg-slate-50 border border-slate-100 space-y-2 text-xs">
                  <div className="flex justify-between items-center text-slate-700">
                    <span className="font-medium">{lang === "ta" ? "அரசு கட்டணம்:" : "Official Fee:"}</span>
                    <span className="font-bold font-mono">
                      {service.fee_inr === 0 ? "FREE / இலவசம்" : `₹${service.fee_inr}`}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-slate-700 block mb-1">
                      {lang === "ta" ? "தேவையான ஆவணங்கள்:" : "Required Documents:"}
                    </span>
                    <ul className="list-disc list-inside text-slate-600 text-[11px] space-y-0.5">
                      {service.required_docs.slice(0, 3).map((doc, idx) => (
                        <li key={idx} className="truncate">
                          {doc}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                <Link
                  href={`/services/${service.id}`}
                  className="text-xs font-bold text-blue-700 hover:underline"
                >
                  {lang === "ta" ? "முழு விவரம்" : "View Details"} →
                </Link>
                <a
                  href={service.action_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#004B87] hover:bg-blue-900 text-white font-bold text-xs transition-colors shadow-sm"
                >
                  <span>{lang === "ta" ? "விண்ணப்பிக்க" : "Apply Online"}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
