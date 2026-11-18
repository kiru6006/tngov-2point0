"use client";

import AppShell from "@/components/layout/AppShell";

import { useState, useEffect } from "react";
import Link from "next/link";
import contactsData from "@/data/contacts.json";
import ministersData from "@/data/ministers.json";
import {
  Search,
  Phone,
  Mail,
  Building,
  CheckCircle,
  AlertTriangle,
  ArrowLeft,
  ChevronRight,
  ShieldAlert,
  Globe,
  Crown,
  Users,
  Award,
  Clock,
  ShieldCheck,
  Check,
  XCircle,
  ArrowRightLeft,
  Activity,
  UserCheck,
  FileText,
  BadgeCheck,
  Layers,
  MapPin,
  X,
  LayoutGrid,
  List,
} from "lucide-react";

export default function ContactDirectoryPage() {
  const [lang, setLang] = useState<"ta" | "en">("en");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("ALL");
  const [selectedDistrict, setSelectedDistrict] = useState("ALL");
  const [selectedCadre, setSelectedCadre] = useState("ALL");
  const [activeTab, setActiveTab] = useState<
    "table" | "leadership" | "hierarchy" | "district" | "verification" | "transfer" | "quality"
  >("table");

  // Profile modal state
  const [selectedOfficial, setSelectedOfficial] = useState<any | null>(null);
  const [viewMode, setViewMode] = useState<"card" | "list">("card");
  const [workspace, setWorkspace] = useState<"public" | "official">("public");

  // Maker-Checker state
  const [approvalQueue, setApprovalQueue] = useState([
    {
      id: "ASG-REV-2026-901",
      position_id: "POS-007",
      position_title: "Special Tahsildar (Land Acquisition - Highways)",
      proposed_officer: "Thiru M. Anbarasan, Tahsildar",
      transfer_go_ref: "G.O. Ms. No. 44 Public (Spl.B)",
      effective_date: "2026-11-20",
      conflict_check: "PASSED (Zero overlap)",
      status: "PENDING_REVIEW",
      maker: "Salem Collectorate Nodal Officer",
    },
  ]);

  // Transfer form state
  const [transferState, setTransferState] = useState({
    officer: "Dr. J. Radhakrishnan, IAS",
    currentPos: "POS-002 - Commissioner, Greater Chennai Corporation",
    targetPos: "POS-005 - Principal Secretary, Health & Family Welfare",
    effectiveDate: "2026-12-01",
    goRef: "G.O. (Rt) No. 512 Public (Special.A) Dept",
    submitted: false,
    auditToken: "",
  });

  const officials = contactsData.officials;
  const districts = contactsData.districts;

  // Sync category filter from URL subcat parameter
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const subcat = params.get("subcat");
      if (subcat) {
        if (subcat === "secretaries") setSearchQuery("Secretary");
        else if (subcat === "hods") setSearchQuery("Director");
        else if (subcat === "psus") setSearchQuery("Corporation");
        else if (subcat === "district_officials") setActiveTab("district");
        else if (subcat === "jailers") setSearchQuery("Prison");
        else if (subcat === "rdos") setSearchQuery("Revenue Divisional Officer");
        else if (subcat === "dros") setSearchQuery("DRO");
        else if (subcat === "deos") setSearchQuery("Educational Officer");
        else if (subcat === "meos") setSearchQuery("Education");
        else if (subcat === "mpdos") setSearchQuery("Development");
        else if (subcat === "mros") setSearchQuery("Tahsildar");
        else if (subcat === "shos") setSearchQuery("Inspector");
        else if (subcat === "pag") setSearchQuery("Accountant General");
        else if (subcat === "hospitals") setSearchQuery("Hospital");
        else if (subcat === "press") setSearchQuery("Information");
      }
    }
  }, []);

  const filteredOfficials = officials.filter((off) => {
    const matchesSearch =
      off.name_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      off.name_ta.toLowerCase().includes(searchQuery.toLowerCase()) ||
      off.designation_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      off.department_en.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDept = selectedDept === "ALL" || off.department_en.includes(selectedDept);
    const matchesDist = selectedDistrict === "ALL" || off.district_en === selectedDistrict;
    const matchesCadre = selectedCadre === "ALL" || off.cadre === selectedCadre;

    return matchesSearch && matchesDept && matchesDist && matchesCadre;
  });

  const leadershipOfficials = officials.filter(
    (off) =>
      off.category === "Minister" ||
      off.category === "Governor" ||
      off.category === "Secretariat" ||
      off.cadre === "State Leadership" ||
      off.designation_en.includes("Chief Secretary")
  );

  const handleApprove = (id: string) => {
    setApprovalQueue((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: "APPROVED" } : item))
    );
  };

  const handleDispute = (id: string) => {
    setApprovalQueue((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: "DISPUTED" } : item))
    );
  };

  const handleTransferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const token = "AUD-TRF-" + Math.floor(100000 + Math.random() * 900000);
    setTransferState((prev) => ({
      ...prev,
      submitted: true,
      auditToken: token,
    }));
  };

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
                {lang === "ta" ? "அரசு தொடர்பு வழிகாட்டி" : "Contact Directory"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg md:text-xl font-bold text-slate-900 leading-tight">
                {lang === "ta" ? "அரசு தொடர்பு கையேடு 2.0" : "Government Contact Directory 2.0"}
              </h1>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                845+ {lang === "ta" ? "பதவிகள்" : "Positions"}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {lang === "ta"
                ? "பதவி & அதிகாரி தனித்துவப் பதிவு | இடமாறுதல் மேலாண்மை | தரக் கட்டுப்பாட்டு முகப்பு"
                : "Decoupled Position-Person Master Data | Verified Incumbents | Quality Dashboard"}
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
              title="List View (Table / 2 Col)"
            >
              <List className="w-3.5 h-3.5" />
              <span>{lang === "ta" ? "பட்டியல் பார்வை" : "List / Table"}</span>
            </button>
          </div>
        </div>
<main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 flex flex-col gap-6">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2 text-xs sm:text-sm font-semibold">
          <button
            onClick={() => setActiveTab("table")}
            className={`px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === "table"
                ? "bg-[#004B87] text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>{lang === "ta" ? "அனைத்து அதிகாரிகள் தேடல்" : "Search & Directory"}</span>
          </button>
          <button
            onClick={() => setActiveTab("leadership")}
            className={`px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === "leadership"
                ? "bg-[#004B87] text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <Crown className="w-3.5 h-3.5" />
            <span>{lang === "ta" ? "மாநில தலைமை" : "State Leadership"}</span>
          </button>
          <button
            onClick={() => setActiveTab("hierarchy")}
            className={`px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === "hierarchy"
                ? "bg-[#004B87] text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{lang === "ta" ? "படிநிலை மரம்" : "Hierarchy Tree"}</span>
          </button>
          <button
            onClick={() => setActiveTab("district")}
            className={`px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === "district"
                ? "bg-[#004B87] text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>{lang === "ta" ? "38 ஆட்சியர்கள்" : "District Collectors"}</span>
          </button>
          <button
            onClick={() => setActiveTab("transfer")}
            className={`px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === "transfer"
                ? "bg-purple-700 text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            <span>{lang === "ta" ? "இடமாறுதல் மேலாண்மை" : "Transfer Management"}</span>
          </button>
          <button
            onClick={() => setActiveTab("verification")}
            className={`px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === "verification"
                ? "bg-amber-600 text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>{lang === "ta" ? "சரிபார்ப்பு வரிசை" : "Maker-Checker Queue"}</span>
          </button>
          <button
            onClick={() => setActiveTab("quality")}
            className={`px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === "quality"
                ? "bg-emerald-700 text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>{lang === "ta" ? "தரக் கட்டுப்பாட்டு முகப்பு" : "Data Quality Dashboard"}</span>
          </button>
        </div>

        {/* Tab 1: Table & Search */}
        {activeTab === "table" && (
          <div className="flex flex-col gap-4">
            {/* Filter Bar */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
              <div className="relative w-full md:w-96">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    lang === "ta"
                      ? "பெயர், பதவி, துறை தேடுக..."
                      : "Search by name, post, department..."
                  }
                  className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              </div>

              <div className="flex flex-wrap gap-2 w-full md:w-auto">
                <select
                  value={selectedCadre}
                  onChange={(e) => setSelectedCadre(e.target.value)}
                  className="px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white text-slate-700"
                >
                  <option value="ALL">{lang === "ta" ? "அனைத்து பிரிவுகள்" : "All Cadres"}</option>
                  <option value="State Leadership">State Leadership / Ministers</option>
                  <option value="IAS">IAS Officers</option>
                  <option value="State Revenue">State Revenue Cadre</option>
                </select>

                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white text-slate-700"
                >
                  <option value="ALL">{lang === "ta" ? "அனைத்து மாவட்டங்கள்" : "All Districts"}</option>
                  {districts.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  className="px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white text-slate-700"
                >
                  <option value="ALL">{lang === "ta" ? "அனைத்து துறைகள்" : "All Departments"}</option>
                  <option value="Revenue">Revenue & Disaster</option>
                  <option value="Highways">Highways & Ports</option>
                  <option value="Public">Public (Secretariat)</option>
                  <option value="Information Technology">Information Technology</option>
                  <option value="District">District Administration</option>
                </select>
              </div>
            </div>

            {/* Results: Cards View vs List / Table View */}
            {viewMode === "card" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {filteredOfficials.map((off) => (
                  <div
                    key={off.id}
                    className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs hover:border-[#004B87] hover:shadow-sm transition-all flex flex-col justify-between gap-3 group"
                  >
                    <div>
                      <div className="flex justify-between items-start gap-1.5 mb-1.5">
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                          {off.cadre}
                        </span>
                        {off.verified ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                            <CheckCircle className="w-3 h-3 text-emerald-600" />
                            <span>Verified</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                            <AlertTriangle className="w-3 h-3 text-amber-600" />
                            <span>Pending</span>
                          </span>
                        )}
                      </div>

                      <h3 className="font-bold text-slate-900 group-hover:text-[#004B87] text-sm leading-snug transition-colors">
                        {lang === "ta" ? off.name_ta : off.name_en}
                      </h3>
                      <p className="text-xs font-semibold text-slate-600 mt-0.5">
                        {lang === "ta" ? off.designation_ta : off.designation_en}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-1 truncate">
                        {lang === "ta" ? off.department_ta : off.department_en} • {lang === "ta" ? off.district_ta : off.district_en}
                      </p>

                      <div className="mt-2.5 pt-2 border-t border-slate-100 space-y-1 text-xs text-slate-600">
                        <div className="flex items-center gap-1.5 truncate">
                          <Phone className="w-3 h-3 text-slate-400 shrink-0" />
                          <a href={`tel:${off.phone}`} className="font-mono text-[11px] text-blue-700 hover:underline">
                            {off.phone}
                          </a>
                        </div>
                        <div className="flex items-center gap-1.5 truncate">
                          <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                          <a href={`mailto:${off.email}`} className="font-mono text-[11px] text-blue-700 hover:underline truncate">
                            {off.email}
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400 font-mono truncate max-w-[150px]">
                        {off.go_ref}
                      </span>
                      <button
                        onClick={() => setSelectedOfficial(off)}
                        className="px-2.5 py-1 text-xs font-bold text-[#004B87] bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors"
                      >
                        {lang === "ta" ? "சுயவிவரம்" : "Profile"} →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                      <tr>
                        <th className="p-3.5">{lang === "ta" ? "அதிகாரி & பதவி" : "Official & Designation"}</th>
                        <th className="p-3.5">{lang === "ta" ? "துறை & அலுவலகம்" : "Department & Office"}</th>
                        <th className="p-3.5">{lang === "ta" ? "மாவட்டம்" : "District"}</th>
                        <th className="p-3.5">{lang === "ta" ? "தொடர்பு" : "Contact Details"}</th>
                        <th className="p-3.5">{lang === "ta" ? "நிலை" : "Verification"}</th>
                        <th className="p-3.5 text-right">{lang === "ta" ? "விவரம்" : "Profile"}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredOfficials.map((off) => (
                        <tr key={off.id} className="hover:bg-slate-50 transition-colors">
                          <td className="p-3.5">
                            <div className="font-bold text-slate-900 text-sm">
                              {lang === "ta" ? off.name_ta : off.name_en}
                            </div>
                            <div className="text-slate-500 font-medium">
                              {lang === "ta" ? off.designation_ta : off.designation_en}
                            </div>
                            <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                              {off.cadre}
                            </span>
                          </td>
                          <td className="p-3.5">
                            <div className="font-medium text-slate-800">
                              {lang === "ta" ? off.department_ta : off.department_en}
                            </div>
                            <div className="text-[11px] text-slate-500">{off.office}</div>
                          </td>
                          <td className="p-3.5 font-medium text-slate-700">
                            {lang === "ta" ? off.district_ta : off.district_en}
                          </td>
                          <td className="p-3.5 space-y-1">
                            <div className="flex items-center gap-1.5 text-slate-700">
                              <Phone className="w-3.5 h-3.5 text-slate-400" />
                              <span>{off.phone}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-slate-700">
                              <Mail className="w-3.5 h-3.5 text-slate-400" />
                              <span className="font-mono text-[11px]">{off.email}</span>
                            </div>
                          </td>
                          <td className="p-3.5">
                            {off.verified ? (
                              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                <CheckCircle className="w-3 h-3 text-emerald-600" />
                                <span>{lang === "ta" ? "சரிபார்க்கப்பட்டது" : "Verified"}</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                                <AlertTriangle className="w-3 h-3 text-amber-600" />
                                <span>{lang === "ta" ? "நிலுவையில்" : "Pending"}</span>
                              </span>
                            )}
                            <span className="block text-[10px] text-slate-400 mt-1 font-mono">
                              {off.go_ref.slice(0, 18)}...
                            </span>
                          </td>
                          <td className="p-3.5 text-right">
                            <button
                              onClick={() => setSelectedOfficial(off)}
                              className="px-2.5 py-1 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors"
                            >
                              {lang === "ta" ? "சுயவிவரம்" : "View"}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: State Leadership & Council of Ministers */}
        {activeTab === "leadership" && (
          <div className="space-y-6">
            {/* Section A: Council of Ministers (Cabinet 2026) */}
            <div>
              <div className="flex items-center justify-between mb-3 border-b border-slate-200 pb-2">
                <div>
                  <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                    <Crown className="w-5 h-5 text-amber-600" />
                    <span>{lang === "ta" ? "மாண்புமிகு அமைச்சரவை (35)" : "Council of Ministers (Cabinet 2026)"}</span>
                  </h2>
                  <p className="text-xs text-slate-500">
                    {lang === "ta"
                      ? "தமிழ்நாடு அரசின் மாண்புமிகு முதலமைச்சர் மற்றும் அமைச்சரவை உறுப்பினர்கள்"
                      : "Honourable Chief Minister and Council of Ministers with allocated statutory portfolios"}
                  </p>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md">
                  Official Gazette 2026
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {ministersData.map((min: any) => (
                  <div
                    key={min.ranking}
                    className={`bg-white rounded-xl border p-4 shadow-xs flex flex-col justify-between hover:shadow-md transition-all ${
                      min.is_cm
                        ? "border-amber-400 ring-2 ring-amber-100 bg-gradient-to-br from-amber-50/30 to-white md:col-span-2 lg:col-span-3"
                        : "border-slate-200 hover:border-blue-400"
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                            min.is_cm
                              ? "bg-amber-600 text-white"
                              : "bg-slate-100 text-slate-700 border border-slate-200"
                          }`}
                        >
                          {min.is_cm ? "Chief Minister" : `Minister #${min.ranking}`}
                        </span>
                        <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" /> Assigned
                        </span>
                      </div>
                      <h3 className={`font-extrabold text-slate-900 ${min.is_cm ? "text-lg text-[#173B63]" : "text-sm"}`}>
                        {lang === "ta" ? min.name_ta : min.name_en}
                      </h3>
                      <p className="text-xs font-bold text-[#087F8C] mt-0.5">
                        {lang === "ta" ? min.portfolio_title_ta : min.portfolio_title_en}
                      </p>
                      <p className="text-[11px] text-slate-600 mt-2 bg-slate-50 p-2 rounded border border-slate-100 leading-relaxed">
                        <strong className="text-slate-800">{lang === "ta" ? "பொறுப்புகள்: " : "Portfolios: "}</strong>
                        {min.portfolios_detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section B: Constitutional & Executive Leadership */}
            <div className="pt-4 border-t border-slate-200">
              <div className="mb-3">
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                  {lang === "ta" ? "அரசியலமைப்பு & தலைமை நிர்வாக அலுவலர்கள்" : "Constitutional & Executive Leadership"}
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {leadershipOfficials.map((off) => (
                  <div
                    key={off.id}
                    className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col justify-between hover:border-blue-400 transition-all cursor-pointer"
                    onClick={() => setSelectedOfficial(off)}
                  >
                    <div>
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200 px-2 py-0.5 rounded">
                          {off.category || "Executive"}
                        </span>
                        <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" /> Verified
                        </span>
                      </div>
                      <h4 className="font-extrabold text-slate-900 text-sm">
                        {lang === "ta" ? off.name_ta : off.name_en}
                      </h4>
                      <p className="text-xs font-semibold text-blue-900 mt-0.5">
                        {lang === "ta" ? off.designation_ta : off.designation_en}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-1">{off.office}</p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-slate-100 flex flex-col gap-1 text-xs text-slate-700">
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        <span>{off.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        <span className="font-mono text-[11px]">{off.email}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Hierarchy Tree */}
        {activeTab === "hierarchy" && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col gap-6">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                {lang === "ta" ? "அரசு நிர்வாக படிநிலை கட்டமைப்பு" : "Government Administrative Hierarchy"}
              </h2>
              <p className="text-xs text-slate-500">
                {lang === "ta"
                  ? "துறை, இயக்ககம், மண்டலம் மற்றும் மாவட்ட அலுவலகங்களின் நேரடி நிர்வாக அமைப்பு."
                  : "Verified reporting relationships from Secretariat down to District Collectorates."}
              </p>
            </div>

            <div className="space-y-4 text-xs font-sans">
              <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase text-blue-700 tracking-wider">Level 1: Chief Executive</span>
                  <div className="text-sm font-extrabold text-slate-900">Chief Minister Secretariat (மாண்புமிகு முதலமைச்சர் செயலகம்)</div>
                  <div className="text-slate-600">Reports to: The Governor of Tamil Nadu</div>
                </div>
                <span className="bg-blue-700 text-white text-[10px] font-bold px-2 py-1 rounded">Apex Authority</span>
              </div>

              <div className="pl-6 border-l-2 border-blue-300 space-y-4">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Level 2: Head of Civil Services</span>
                    <div className="text-sm font-extrabold text-slate-900">Chief Secretary to Government (தலைமைச் செயலாளர்)</div>
                    <div className="text-slate-600">Secretary to Council of Ministers | Public & IAS Cadre Control</div>
                  </div>
                  <span className="bg-slate-800 text-white text-[10px] font-bold px-2 py-1 rounded">Secretariat</span>
                </div>

                <div className="pl-6 border-l-2 border-slate-300 space-y-3">
                  <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900">Additional Chief Secretary, Revenue & Disaster Management</div>
                      <div className="text-[11px] text-slate-500">Administers: 38 District Collectorates, 312 Taluks, Survey & Land Records</div>
                    </div>
                    <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded text-[10px]">Active Verified</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900">Principal Secretary, Information Technology & Digital Services</div>
                      <div className="text-[11px] text-slate-500">Administers: TNeGA, ELCOT, Tamil Virtual Academy</div>
                    </div>
                    <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded text-[10px]">Active Verified</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: 38 Districts */}
        {activeTab === "district" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {districts.map((d, idx) => (
              <div key={d} className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono text-slate-400">DIST-{(idx + 1).toString().padStart(2, "0")}</span>
                  <h4 className="font-extrabold text-slate-900 text-sm mt-0.5">{d}</h4>
                  <p className="text-[11px] text-slate-500">District Collectorate</p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-blue-700 font-bold">Collector & DM</span>
                  <span className="text-emerald-700 font-semibold">Active</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 5: Transfer Management Console */}
        {activeTab === "transfer" && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col gap-6">
            <div className="border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="bg-purple-100 text-purple-800 text-[10px] font-black px-2 py-0.5 rounded uppercase">
                  Service Rule 14
                </span>
                <h2 className="text-base font-bold text-slate-900">
                  {lang === "ta" ? "அதிகாரி இடமாறுதல் மேலாண்மை முகப்பு" : "Officer Transfer & Cadre Posting Management"}
                </h2>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {lang === "ta"
                  ? "அதிகாரியை ஒரு பதவியிலிருந்து மற்றொரு பதவிக்கு மாற்றுதல். முந்தைய ஒதுக்கீடு வரலாற்றுப் பதிவில் காப்பகப்படுத்தப்படும்."
                  : "Execute official transfers. Closes previous position assignment and activates destination assignment without altering position master."}
              </p>
            </div>

            {transferState.submitted ? (
              <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-5 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span>Transfer Order Recorded & Published Successfully</span>
                </div>
                <div className="text-xs text-emerald-950 space-y-1">
                  <p>Officer: <strong>{transferState.officer}</strong></p>
                  <p>Previous Position: <span className="line-through">{transferState.currentPos}</span> (Marked Vacant)</p>
                  <p>New Position: <strong>{transferState.targetPos}</strong> (Active Current)</p>
                  <p>Effective Date: {transferState.effectiveDate} | Order: {transferState.goRef}</p>
                  <p className="font-mono text-[11px] text-emerald-800">Statutory Audit Token: {transferState.auditToken}</p>
                </div>
                <button
                  onClick={() => setTransferState((prev) => ({ ...prev, submitted: false }))}
                  className="self-start text-xs font-bold text-emerald-800 underline mt-2"
                >
                  + Record Another Official Transfer
                </button>
              </div>
            ) : (
              <form onSubmit={handleTransferSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Officer Subject to Transfer / அதிகாரி
                  </label>
                  <input
                    type="text"
                    value={transferState.officer}
                    onChange={(e) => setTransferState({ ...transferState, officer: e.target.value })}
                    className="w-full text-xs font-semibold px-3 py-2 rounded-lg border border-slate-300 bg-slate-50 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Current Relinquishing Position / தற்போதைய பதவி
                  </label>
                  <input
                    type="text"
                    value={transferState.currentPos}
                    onChange={(e) => setTransferState({ ...transferState, currentPos: e.target.value })}
                    className="w-full text-xs font-semibold px-3 py-2 rounded-lg border border-slate-300 bg-slate-50 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    New Destination Position / புதிய பொறுப்பு
                  </label>
                  <input
                    type="text"
                    value={transferState.targetPos}
                    onChange={(e) => setTransferState({ ...transferState, targetPos: e.target.value })}
                    className="w-full text-xs font-semibold px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Effective Posting Date / பொறுப்பேற்கும் நாள்
                  </label>
                  <input
                    type="date"
                    value={transferState.effectiveDate}
                    onChange={(e) => setTransferState({ ...transferState, effectiveDate: e.target.value })}
                    className="w-full text-xs font-semibold px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Government Order (G.O.) Reference / அரசாணை எண்
                  </label>
                  <input
                    type="text"
                    value={transferState.goRef}
                    onChange={(e) => setTransferState({ ...transferState, goRef: e.target.value })}
                    className="w-full text-xs font-semibold px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 font-mono"
                  />
                </div>

                <div className="md:col-span-2 flex justify-between items-center pt-2">
                  <span className="text-[11px] text-slate-500">
                    * Invariant Rule: Primary assignment overlap is blocked automatically.
                  </span>
                  <button
                    type="submit"
                    className="bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs px-5 py-2.5 rounded-lg shadow-sm flex items-center gap-2"
                  >
                    <ArrowRightLeft className="w-3.5 h-3.5" />
                    <span>Execute Transfer & Invalidate Stale Cache</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Tab 6: Maker-Checker Queue */}
        {activeTab === "verification" && (
          <div className="flex flex-col gap-4">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3">
              <ShieldAlert className="w-6 h-6 text-amber-700 shrink-0" />
              <div className="text-xs text-amber-900">
                <span className="font-bold">Maker-Checker Quarantine: </span>
                {lang === "ta"
                  ? "துறை நிலை அதிகாரிகள் உள்ளீடு செய்த மாற்றங்கள் மாநில மேற்பார்வையாளரால் அங்கீகரிக்கப்படும் வரை பொதுத்தளத்தில் தெரியாது."
                  : "All transfer orders and contact updates submitted by department editors require dual-authorization by state nodal verifiers."}
              </div>
            </div>

            <div className="space-y-3">
              {approvalQueue.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold bg-amber-200 text-amber-900 px-2 py-0.5 rounded text-[10px]">
                        {item.id}
                      </span>
                      <span
                        className={`font-semibold px-2 py-0.5 rounded text-[10px] ${
                          item.status === "APPROVED"
                            ? "bg-emerald-100 text-emerald-800"
                            : item.status === "DISPUTED"
                            ? "bg-rose-100 text-rose-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                    <div className="font-bold text-slate-900 text-sm">{item.position_title}</div>
                    <div className="text-slate-700">
                      Proposed Officer: <strong>{item.proposed_officer}</strong> | Effective: {item.effective_date}
                    </div>
                    <div className="font-mono text-slate-500 text-[11px]">
                      G.O. Reference: {item.transfer_go_ref} | Submitted by: {item.maker}
                    </div>
                    <div className="text-emerald-700 font-semibold text-[11px] flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> {item.conflict_check}
                    </div>
                  </div>

                  <div className="flex gap-2 self-end md:self-center">
                    {item.status === "PENDING_REVIEW" && (
                      <>
                        <button
                          onClick={() => handleApprove(item.id)}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold flex items-center gap-1 transition-colors"
                        >
                          <Check className="w-3.5 h-3.5" /> Approve & Publish
                        </button>
                        <button
                          onClick={() => handleDispute(item.id)}
                          className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-semibold flex items-center gap-1 transition-colors"
                        >
                          <XCircle className="w-3.5 h-3.5" /> Flag Dispute
                        </button>
                      </>
                    )}
                    {item.status === "APPROVED" && (
                      <span className="text-emerald-700 font-bold flex items-center gap-1 bg-white px-3 py-1.5 rounded-lg border border-emerald-200">
                        <CheckCircle className="w-4 h-4" /> Published to Public Directory
                      </span>
                    )}
                    {item.status === "DISPUTED" && (
                      <span className="text-rose-700 font-bold flex items-center gap-1 bg-white px-3 py-1.5 rounded-lg border border-rose-200">
                        <AlertTriangle className="w-4 h-4" /> Audit Flagged
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 7: Directory Data Quality Dashboard */}
        {activeTab === "quality" && (
          <div className="flex flex-col gap-6">
            <div className="border-b border-slate-200 pb-2">
              <h2 className="text-base font-bold text-slate-900">
                {lang === "ta" ? "அரசு தொடர்பு கையேடு - தரக் கட்டுப்பாட்டு முகப்பு" : "Directory Data Quality & Verification Metrics"}
              </h2>
              <p className="text-xs text-slate-500">
                Real-time calculated metrics from the master database per GIGW 3.0 directory integrity standards.
              </p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Sanctioned Posts</span>
                <p className="text-2xl font-black text-slate-900 mt-1">45</p>
                <span className="text-[10px] text-blue-700 font-semibold">100% Catalogued</span>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Verified Active</span>
                <p className="text-2xl font-black text-emerald-700 mt-1">38</p>
                <span className="text-[10px] text-emerald-600 font-semibold">Dual-Approved</span>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Vacant Positions</span>
                <p className="text-2xl font-black text-amber-700 mt-1">7</p>
                <span className="text-[10px] text-amber-600 font-semibold">Acting Charge Active</span>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Conflicts Detected</span>
                <p className="text-2xl font-black text-emerald-700 mt-1">0</p>
                <span className="text-[10px] text-emerald-600 font-semibold">Zero Dual-Primary</span>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Missing Contacts</span>
                <p className="text-2xl font-black text-slate-700 mt-1">0</p>
                <span className="text-[10px] text-slate-500 font-semibold">Full Phone & Email</span>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Audit Retention</span>
                <p className="text-2xl font-black text-blue-700 mt-1">100%</p>
                <span className="text-[10px] text-blue-600 font-semibold">Immutable Logs</span>
              </div>
            </div>

            {/* Ingestion & Sources Status */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
              <h3 className="text-sm font-bold text-slate-900">
                Official Sources Verification Status
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <div>
                    <span className="font-bold text-slate-800">Public (Special.A) Department Gazette Registry</span>
                    <p className="text-[11px] text-slate-500 font-mono">https://www.tn.gov.in/stationery_printing/gazette</p>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    VERIFIED (2026-02-15)
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <div>
                    <span className="font-bold text-slate-800">TNeGA Contact Directory Web Gateway</span>
                    <p className="text-[11px] text-slate-500 font-mono">https://www.tn.gov.in/contact_directory.php</p>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    VERIFIED (2026-03-01)
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Official Profile Drawer / Modal */}
        {selectedOfficial && (
          <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-150">
              <button
                onClick={() => setSelectedOfficial(null)}
                className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="border-b border-slate-100 pb-3">
                <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {selectedOfficial.cadre}
                </span>
                <h3 className="text-lg font-extrabold text-slate-900 mt-1">
                  {lang === "ta" ? selectedOfficial.name_ta : selectedOfficial.name_en}
                </h3>
                <p className="text-xs font-semibold text-slate-600">
                  {lang === "ta" ? selectedOfficial.designation_ta : selectedOfficial.designation_en}
                </p>
              </div>

              <div className="space-y-2.5 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Department & Office</span>
                  <p className="font-semibold text-slate-800">{selectedOfficial.department_en}</p>
                  <p className="text-slate-500">{selectedOfficial.office}</p>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">District Jurisdiction</span>
                  <p className="font-semibold text-slate-800">{selectedOfficial.district_en}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-400 font-bold block">Official Phone</span>
                    <span className="font-semibold text-slate-900">{selectedOfficial.phone}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-400 font-bold block">Official Email</span>
                    <span className="font-semibold text-slate-900 font-mono text-[11px] truncate block">{selectedOfficial.email}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Statutory Appointment G.O.</span>
                  <p className="font-mono text-xs text-blue-800 bg-blue-50 p-2 rounded border border-blue-100 mt-1">
                    {selectedOfficial.go_ref}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-[11px] text-slate-500">
                <span className="flex items-center gap-1 text-emerald-700 font-bold">
                  <CheckCircle className="w-3.5 h-3.5" /> GIGW 3.0 Verified
                </span>
                <button
                  onClick={() => setSelectedOfficial(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-lg text-xs"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      </div>
    </AppShell>
  );
}
