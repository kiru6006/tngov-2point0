"use client";

import { useState } from "react";
import Link from "next/link";
import AppShell from "@/components/layout/AppShell";
import {
  BarChart3,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Building2,
  Calendar,
  Filter,
  Download,
  LayoutGrid,
  Table as TableIcon,
  ChevronDown,
  ArrowUpRight,
  ShieldCheck,
  Search,
} from "lucide-react";

interface DepartmentKPI {
  dept_id: string;
  name_en: string;
  name_ta: string;
  total_received: number;
  total_resolved: number;
  total_pending: number;
  total_overdue: number;
  median_resolution_days: number;
  sla_compliance_pct: number;
  top_service: string;
  trend: "+2.4%" | "-1.2%" | "+5.1%" | "0.0%";
}

const DEPARTMENT_METRICS: DepartmentKPI[] = [
  {
    dept_id: "DEP-REV",
    name_en: "Revenue and Disaster Management",
    name_ta: "வருவாய் மற்றும் பேரிடர் மேலாண்மைத் துறை",
    total_received: 245080,
    total_resolved: 231400,
    total_pending: 13680,
    total_overdue: 1420,
    median_resolution_days: 7.2,
    sla_compliance_pct: 94.4,
    top_service: "Patta / Chitta Sub-division & Certificates",
    trend: "+2.4%",
  },
  {
    dept_id: "DEP-SOC",
    name_en: "Social Welfare and Women Empowerment",
    name_ta: "சமூக நலம் மற்றும் மகளிர் உரிமைத் துறை",
    total_received: 182300,
    total_resolved: 177900,
    total_pending: 4400,
    total_overdue: 320,
    median_resolution_days: 4.8,
    sla_compliance_pct: 97.6,
    top_service: "Pudhumai Penn & Marriage Assistance",
    trend: "+5.1%",
  },
  {
    dept_id: "DEP-MAWS",
    name_en: "Municipal Administration and Water Supply",
    name_ta: "நகராட்சி நிர்வாகம் மற்றும் குடிநீர் வழங்கல் துறை",
    total_received: 198400,
    total_resolved: 183200,
    total_pending: 15200,
    total_overdue: 2150,
    median_resolution_days: 9.1,
    sla_compliance_pct: 92.3,
    top_service: "Drinking Water & Property Tax Assessment",
    trend: "-1.2%",
  },
  {
    dept_id: "DEP-HEALTH",
    name_en: "Health and Family Welfare",
    name_ta: "மக்கள் நல்வாழ்வு மற்றும் குடும்ப நலத்துறை",
    total_received: 142600,
    total_resolved: 139800,
    total_pending: 2800,
    total_overdue: 180,
    median_resolution_days: 3.5,
    sla_compliance_pct: 98.1,
    top_service: "CMCHIS Cashless Treatments & Makkalai Thedi Maruthuvam",
    trend: "+2.4%",
  },
  {
    dept_id: "DEP-TNEB",
    name_en: "Energy / TANGEDCO",
    name_ta: "மின்சார வாரியம் (டான்ஜெட்கோ)",
    total_received: 167500,
    total_resolved: 159200,
    total_pending: 8300,
    total_overdue: 980,
    median_resolution_days: 5.6,
    sla_compliance_pct: 95.0,
    top_service: "New LT Connection & Transformer Faults",
    trend: "0.0%",
  },
  {
    dept_id: "DEP-RURAL",
    name_en: "Rural Development and Panchayat Raj",
    name_ta: "ஊரக வளர்ச்சி மற்றும் ஊராட்சித் துறை",
    total_received: 124300,
    total_resolved: 118400,
    total_pending: 5900,
    total_overdue: 620,
    median_resolution_days: 8.4,
    sla_compliance_pct: 93.8,
    top_service: "MGNREGS Job Cards & Rural Housing",
    trend: "+2.4%",
  },
  {
    dept_id: "DEP-EDU",
    name_en: "School Education Department",
    name_ta: "பள்ளிக் கல்வித் துறை",
    total_received: 89400,
    total_resolved: 87100,
    total_pending: 2300,
    total_overdue: 140,
    median_resolution_days: 4.1,
    sla_compliance_pct: 97.4,
    top_service: "Chief Minister Breakfast Scheme & Admission",
    trend: "+5.1%",
  },
  {
    dept_id: "DEP-POLICE",
    name_en: "Home, Prohibition and Excise (Police)",
    name_ta: "உள்துறை (காவல்துறை)",
    total_received: 112000,
    total_resolved: 106500,
    total_pending: 5500,
    total_overdue: 510,
    median_resolution_days: 6.0,
    sla_compliance_pct: 96.2,
    top_service: "Lost Document Report (LDR) & FIR Status",
    trend: "+2.4%",
  },
];

export default function PerformanceReportPage() {
  const [lang, setLang] = useState<"en" | "ta">("en");
  const [workspace, setWorkspace] = useState<"public" | "official">("public");
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");
  const [searchFilter, setSearchFilter] = useState("");
  const [selectedSort, setSelectedSort] = useState<"sla" | "received" | "overdue">("sla");

  // Filtered and sorted list
  const filteredMetrics = DEPARTMENT_METRICS.filter((item) => {
    const q = searchFilter.toLowerCase();
    return (
      item.name_en.toLowerCase().includes(q) ||
      item.name_ta.toLowerCase().includes(q) ||
      item.top_service.toLowerCase().includes(q)
    );
  }).sort((a, b) => {
    if (selectedSort === "sla") return b.sla_compliance_pct - a.sla_compliance_pct;
    if (selectedSort === "received") return b.total_received - a.total_received;
    return b.total_overdue - a.total_overdue;
  });

  // Statewide Totals
  const totalReceived = DEPARTMENT_METRICS.reduce((acc, i) => acc + i.total_received, 0);
  const totalResolved = DEPARTMENT_METRICS.reduce((acc, i) => acc + i.total_resolved, 0);
  const totalPending = DEPARTMENT_METRICS.reduce((acc, i) => acc + i.total_pending, 0);
  const totalOverdue = DEPARTMENT_METRICS.reduce((acc, i) => acc + i.total_overdue, 0);
  const overallCompliance = (
    DEPARTMENT_METRICS.reduce((acc, i) => acc + i.sla_compliance_pct, 0) /
    DEPARTMENT_METRICS.length
  ).toFixed(1);

  return (
    <AppShell
      activeWorkspace={workspace}
      onWorkspaceChange={setWorkspace}
      lang={lang}
      onLanguageChange={setLang}
    >
      <div className="p-4 md:p-5 max-w-7xl mx-auto w-full space-y-4">
        {/* Breadcrumb & Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
              <Link href="/" className="hover:text-[#004B87]">
                {lang === "ta" ? "முகப்பு" : "Home"}
              </Link>
              <span>/</span>
              <span className="text-slate-800 font-semibold">
                {lang === "ta" ? "செயல்திறன் அறிக்கை" : "Government Performance"}
              </span>
            </div>
            <h1 className="text-lg md:text-xl font-bold text-slate-900 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#004B87]" />
              <span>
                {lang === "ta"
                  ? "துறைவாரியான சேவை & குறைதீர்ப்பு செயல்திறன் அறிக்கை"
                  : "Department-wise Service Delivery & SLA Performance Scorecard"}
              </span>
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              {lang === "ta"
                ? "38 மாவட்டங்கள் மற்றும் தலைமைச் செயலக துறைகளின் மாதாந்திர நேரடி செயல்திறன் தரவு"
                : "Real-time key performance indicators (KPIs) verified by CM Dashboard across 38 districts."}
            </p>
          </div>

          {/* View Toggles & Export */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-slate-100 p-0.5 rounded border border-slate-200">
              <button
                type="button"
                onClick={() => setViewMode("cards")}
                className={`p-1.5 rounded text-xs font-semibold flex items-center gap-1 ${
                  viewMode === "cards"
                    ? "bg-white text-[#004B87] shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                title="Card View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Cards</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("table")}
                className={`p-1.5 rounded text-xs font-semibold flex items-center gap-1 ${
                  viewMode === "table"
                    ? "bg-white text-[#004B87] shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                title="Table View"
              >
                <TableIcon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Table</span>
              </button>
            </div>
            <button
              type="button"
              onClick={() => alert("Exporting official CSV performance audit ledger...")}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded border border-slate-300 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">CSV Export</span>
            </button>
          </div>
        </div>

        {/* 1. STATEWIDE KPI SUMMARY CARDS (6 Metrics) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5">
          <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-xs">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
              {lang === "ta" ? "மொத்த மனுக்கள்" : "Received"}
            </span>
            <div className="text-lg md:text-xl font-bold font-mono text-slate-900 mt-1">
              {totalReceived.toLocaleString("en-IN")}
            </div>
            <span className="text-[10px] text-emerald-600 font-semibold mt-1 inline-block">
              +3.8% MoM
            </span>
          </div>

          <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-xs">
            <span className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider block">
              {lang === "ta" ? "தீர்வு காணப்பட்டவை" : "Resolved"}
            </span>
            <div className="text-lg md:text-xl font-bold font-mono text-emerald-700 mt-1">
              {totalResolved.toLocaleString("en-IN")}
            </div>
            <span className="text-[10px] text-slate-500 mt-1 inline-block">
              95.1% Disposal Rate
            </span>
          </div>

          <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-xs">
            <span className="text-[11px] font-semibold text-amber-700 uppercase tracking-wider block">
              {lang === "ta" ? "நிலுவையில் உள்ளவை" : "Pending Queue"}
            </span>
            <div className="text-lg md:text-xl font-bold font-mono text-amber-700 mt-1">
              {totalPending.toLocaleString("en-IN")}
            </div>
            <span className="text-[10px] text-slate-500 mt-1 inline-block">
              Within SLA window
            </span>
          </div>

          <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-xs">
            <span className="text-[11px] font-semibold text-red-700 uppercase tracking-wider block">
              {lang === "ta" ? "தாமதமானவை" : "SLA Overdue"}
            </span>
            <div className="text-lg md:text-xl font-bold font-mono text-red-700 mt-1">
              {totalOverdue.toLocaleString("en-IN")}
            </div>
            <span className="text-[10px] text-red-600 font-semibold mt-1 inline-block">
              -12.4% Reductions
            </span>
          </div>

          <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-xs">
            <span className="text-[11px] font-semibold text-blue-700 uppercase tracking-wider block">
              {lang === "ta" ? "சராசரி தீர்வு காலம்" : "Median SLA Time"}
            </span>
            <div className="text-lg md:text-xl font-bold font-mono text-blue-800 mt-1">
              6.1 <span className="text-xs font-normal text-slate-500">Days</span>
            </div>
            <span className="text-[10px] text-slate-500 mt-1 inline-block">
              Benchmark: 15 Days
            </span>
          </div>

          <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-xs">
            <span className="text-[11px] font-semibold text-purple-700 uppercase tracking-wider block">
              {lang === "ta" ? "SLA இணக்கம்" : "Statewide SLA %"}
            </span>
            <div className="text-lg md:text-xl font-bold font-mono text-purple-800 mt-1">
              {overallCompliance}%
            </div>
            <span className="text-[10px] text-emerald-600 font-semibold mt-1 inline-block">
              Tier-1 National Rank
            </span>
          </div>
        </div>

        {/* 2. SEARCH & SORT TOOLBAR */}
        <div className="bg-white p-2.5 rounded-lg border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <div className="relative w-full sm:w-80">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder={
                lang === "ta" ? "துறையை தேடுக..." : "Filter by department or service..."
              }
              className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-[#004B87] focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <span className="text-slate-500 font-medium">Sort By:</span>
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value as any)}
              className="bg-slate-50 border border-slate-300 rounded px-2 py-1 text-xs font-medium focus:ring-1 focus:ring-[#004B87]"
            >
              <option value="sla">SLA Compliance % (Highest First)</option>
              <option value="received">Volume Received</option>
              <option value="overdue">Overdue Count</option>
            </select>
          </div>
        </div>

        {/* 3. CARD VIEW */}
        {viewMode === "cards" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {filteredMetrics.map((dept) => (
              <div
                key={dept.dept_id}
                className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs hover:border-[#004B87] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-100">
                    <span className="font-mono text-[10px] font-bold text-slate-400">
                      {dept.dept_id}
                    </span>
                    <span
                      className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                        dept.sla_compliance_pct >= 95
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {dept.sla_compliance_pct}% SLA
                    </span>
                  </div>

                  <h3 className="font-bold text-xs text-slate-900 mt-2 leading-snug line-clamp-2">
                    {lang === "ta" ? dept.name_ta : dept.name_en}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                    {dept.top_service}
                  </p>

                  {/* Numbers Grid */}
                  <div className="grid grid-cols-2 gap-2 mt-3 pt-2.5 border-t border-slate-100 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Received</span>
                      <span className="font-mono font-bold text-slate-800">
                        {dept.total_received.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Resolved</span>
                      <span className="font-mono font-bold text-emerald-700">
                        {dept.total_resolved.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Pending</span>
                      <span className="font-mono font-bold text-amber-700">
                        {dept.total_pending.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Median Days</span>
                      <span className="font-mono font-bold text-blue-700">
                        {dept.median_resolution_days} Days
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">
                    Overdue: <strong className="text-red-700">{dept.total_overdue}</strong>
                  </span>
                  <Link
                    href={`/services?dept=${encodeURIComponent(dept.name_en)}`}
                    className="text-[#004B87] hover:underline font-semibold flex items-center gap-0.5"
                  >
                    <span>Services</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 4. TABLE VIEW */}
        {viewMode === "table" && (
          <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600">
                    <th className="py-2.5 px-3 font-semibold">Department ID & Name</th>
                    <th className="py-2.5 px-3 font-semibold text-right">Received</th>
                    <th className="py-2.5 px-3 font-semibold text-right">Resolved</th>
                    <th className="py-2.5 px-3 font-semibold text-right">Pending</th>
                    <th className="py-2.5 px-3 font-semibold text-right">Overdue</th>
                    <th className="py-2.5 px-3 font-semibold text-right">Median Time</th>
                    <th className="py-2.5 px-3 font-semibold text-right">SLA %</th>
                    <th className="py-2.5 px-3 font-semibold text-center">Trend</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {filteredMetrics.map((dept) => (
                    <tr key={dept.dept_id} className="hover:bg-slate-50/80">
                      <td className="py-2 px-3 font-sans">
                        <div className="font-bold text-slate-900">
                          {lang === "ta" ? dept.name_ta : dept.name_en}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          {dept.dept_id} • {dept.top_service}
                        </div>
                      </td>
                      <td className="py-2 px-3 text-right font-bold text-slate-800">
                        {dept.total_received.toLocaleString("en-IN")}
                      </td>
                      <td className="py-2 px-3 text-right text-emerald-700 font-semibold">
                        {dept.total_resolved.toLocaleString("en-IN")}
                      </td>
                      <td className="py-2 px-3 text-right text-amber-700 font-semibold">
                        {dept.total_pending.toLocaleString("en-IN")}
                      </td>
                      <td className="py-2 px-3 text-right text-red-700 font-semibold">
                        {dept.total_overdue.toLocaleString("en-IN")}
                      </td>
                      <td className="py-2 px-3 text-right text-blue-700 font-semibold font-sans">
                        {dept.median_resolution_days} d
                      </td>
                      <td className="py-2 px-3 text-right font-bold">
                        <span
                          className={`px-1.5 py-0.5 rounded text-[11px] ${
                            dept.sla_compliance_pct >= 95
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {dept.sla_compliance_pct}%
                        </span>
                      </td>
                      <td className="py-2 px-3 text-center text-[11px] font-sans">
                        <span
                          className={
                            dept.trend.startsWith("+")
                              ? "text-emerald-600 font-bold"
                              : dept.trend.startsWith("-")
                              ? "text-red-600 font-bold"
                              : "text-slate-400"
                          }
                        >
                          {dept.trend}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
