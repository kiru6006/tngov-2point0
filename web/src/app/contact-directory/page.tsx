"use client";

import { useState } from "react";
import Link from "next/link";
import contactsData from "@/data/contacts.json";
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
} from "lucide-react";

export default function ContactDirectoryPage() {
  const [lang, setLang] = useState<"ta" | "en">("ta");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("ALL");
  const [selectedDistrict, setSelectedDistrict] = useState("ALL");
  const [selectedCadre, setSelectedCadre] = useState("ALL");
  const [activeTab, setActiveTab] = useState<
    "table" | "leadership" | "hierarchy" | "district" | "verification"
  >("table");

  // Maker-Checker state simulation for demonstration
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

  const officials = contactsData.officials;
  const districts = contactsData.districts;

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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      {/* Top Header */}
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
                {lang === "ta" ? "அரசு தொடர்பு கையேடு (P0)" : "Government Contact Directory (P0)"}
              </h1>
              <span className="text-[11px] text-slate-500 font-medium">
                {lang === "ta"
                  ? "சரிபார்க்கப்பட்ட அதிகாரப்பூர்வ தகவல் தளம்"
                  : "Verified Statutory Administrative Directory"}
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
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 flex flex-col gap-6">
        {/* Navigation Tabs (PRD Section 4.4 Mandate) */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2 text-xs sm:text-sm font-semibold">
          <button
            onClick={() => setActiveTab("table")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === "table"
                ? "bg-[#004B87] text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            {lang === "ta" ? "அனைத்து அதிகாரிகள் தேடல்" : "Search & Directory Table"}
          </button>
          <button
            onClick={() => setActiveTab("leadership")}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === "leadership"
                ? "bg-[#004B87] text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <Crown className="w-3.5 h-3.5" />
            {lang === "ta" ? "அரசு தலைமை & அமைச்சர்கள்" : "State Leadership"}
          </button>
          <button
            onClick={() => setActiveTab("hierarchy")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === "hierarchy"
                ? "bg-[#004B87] text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            {lang === "ta" ? "நிர்வாக படிநிலை மரம்" : "Administrative Hierarchy"}
          </button>
          <button
            onClick={() => setActiveTab("district")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === "district"
                ? "bg-[#004B87] text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            {lang === "ta" ? "38 மாவட்ட ஆட்சியர்கள்" : "38 District Collectorates"}
          </button>
          <button
            onClick={() => setActiveTab("verification")}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === "verification"
                ? "bg-amber-600 text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            {lang === "ta" ? "சரிபார்ப்பு & ஒப்புதல் வரிசை" : "Maker-Checker Queue"}
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

            {/* Results Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-3.5">{lang === "ta" ? "அதிகாரி & பதவி" : "Official & Designation"}</th>
                      <th className="p-3.5">{lang === "ta" ? "துறை & அலுவலகம்" : "Department & Office"}</th>
                      <th className="p-3.5">{lang === "ta" ? "மாவட்டம்" : "District"}</th>
                      <th className="p-3.5">{lang === "ta" ? "தொடர்பு விவரம்" : "Contact Channels"}</th>
                      <th className="p-3.5">{lang === "ta" ? "நிலை & சான்று" : "Status & Evidence"}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredOfficials.map((off) => (
                      <tr key={off.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-3.5 align-top">
                          <div className="font-bold text-slate-900">
                            {lang === "ta" ? off.name_ta : off.name_en}
                          </div>
                          <div className="text-slate-600 font-medium text-[11px]">
                            {lang === "ta" ? off.designation_ta : off.designation_en}
                          </div>
                          <span className="inline-block mt-1 px-1.5 py-0.5 rounded text-[10px] bg-slate-100 text-slate-600 font-mono">
                            {off.cadre}
                          </span>
                        </td>
                        <td className="p-3.5 align-top">
                          <div className="font-medium text-slate-800">
                            {lang === "ta" ? off.department_ta : off.department_en}
                          </div>
                          <div className="text-slate-500 text-[11px] truncate max-w-xs">{off.office}</div>
                        </td>
                        <td className="p-3.5 align-top text-slate-700 font-medium">
                          {lang === "ta" ? off.district_ta : off.district_en}
                        </td>
                        <td className="p-3.5 align-top">
                          <div className="flex flex-col gap-1">
                            {off.phone !== "Pending Assignment" ? (
                              <a
                                href={`tel:${off.phone}`}
                                className="inline-flex items-center gap-1.5 text-blue-700 hover:underline font-mono font-semibold"
                              >
                                <Phone className="w-3 h-3 text-slate-400" /> {off.phone}
                              </a>
                            ) : (
                              <span className="text-slate-400 italic">No phone</span>
                            )}
                            <a
                              href={`mailto:${off.email}`}
                              className="inline-flex items-center gap-1.5 text-slate-600 hover:underline text-[11px]"
                            >
                              <Mail className="w-3 h-3 text-slate-400" /> {off.email}
                            </a>
                          </div>
                        </td>
                        <td className="p-3.5 align-top">
                          {off.status === "Active" ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              <CheckCircle className="w-3 h-3" /> Verified
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                              <AlertTriangle className="w-3 h-3" /> Vacant
                            </span>
                          )}
                          <div className="text-[10px] text-slate-400 font-mono mt-1">{off.go_ref}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: State Leadership Directory */}
        {activeTab === "leadership" && (
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                {lang === "ta" ? "தமிழ்நாடு அரசு உயர்மட்ட தலைமை" : "State Leadership & Council of Ministers"}
              </h2>
              <p className="text-xs text-slate-500">
                {lang === "ta"
                  ? "ஆளுநர், முதலமைச்சர், அமைச்சரவை மற்றும் தலைமைச் செயலக மூத்த செயலாளர்கள் விவரம்"
                  : "Constitutional heads, Ministerial portfolios, and Secretariat leadership"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {leadershipOfficials.map((leader) => (
                <div
                  key={leader.id}
                  className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:border-blue-400 transition-all flex flex-col justify-between gap-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 shrink-0 font-bold text-sm">
                      {leader.name_en.substring(0, 2)}
                    </div>
                    <div className="flex-1">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 inline-block mb-1">
                        {leader.category || leader.cadre}
                      </span>
                      <h3 className="font-bold text-sm text-slate-900">
                        {lang === "ta" ? leader.name_ta : leader.name_en}
                      </h3>
                      <p className="text-xs text-slate-600 font-medium">
                        {lang === "ta" ? leader.designation_ta : leader.designation_en}
                      </p>
                    </div>
                  </div>

                  <div className="text-xs border-t border-slate-100 pt-3 space-y-1.5 text-slate-600">
                    <div className="flex items-start gap-2">
                      <Building className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{leader.office}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <a href={`tel:${leader.phone}`} className="font-mono text-blue-700 hover:underline">
                        {leader.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <a href={`mailto:${leader.email}`} className="text-blue-700 hover:underline">
                        {leader.email}
                      </a>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-2 rounded text-[11px] font-mono text-slate-500 border border-slate-100">
                    {leader.go_ref}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Hierarchy Tree */}
        {activeTab === "hierarchy" && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-base font-bold text-slate-900 mb-1">
              {lang === "ta" ? "அரசு நிர்வாக படிநிலை அறிக்கை" : "Statutory Administrative Reporting Tree"}
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              {lang === "ta"
                ? "பதவி மற்றும் பொறுப்புகள் மாற்றங்களின் போது மாறாது; அதிகாரிகள் மட்டுமே மாற்றப்படுவர்."
                : "Positions and reporting nodes are permanent statutory entities. Individuals transition via assignment orders."}
            </p>

            <div className="font-mono text-xs space-y-3 bg-slate-50 p-5 rounded-lg border border-slate-200">
              <div className="text-blue-900 font-bold flex items-center gap-2">
                <Building className="w-4 h-4 text-blue-700" />
                <span>Government of Tamil Nadu (Apex Secretariat)</span>
              </div>
              <div className="pl-6 border-l-2 border-blue-200 space-y-3">
                <div className="font-semibold text-slate-800">
                  ├── Chief Secretary (N. Muruganandam, IAS)
                </div>
                <div className="pl-6 border-l-2 border-slate-300 space-y-2">
                  <div>
                    ├── <strong>Revenue & Disaster Management Dept</strong>
                    <div className="pl-6 text-slate-600">
                      ├── Principal Secretary (Dr. P. Senthil Kumar, IAS)
                      <br />
                      ├── Commissioner of Revenue Administration (S. Sivarasu, IAS)
                      <br />
                      └── District Collectors (38 Districts)
                    </div>
                  </div>
                  <div>
                    ├── <strong>Highways and Minor Ports Dept</strong>
                    <div className="pl-6 text-slate-600">
                      ├── Additional Chief Secretary (Dr. K. Gopal, IAS)
                      <br />
                      ├── Chief Engineer (Construction & Maintenance)
                      <br />
                      └── Special Tahsildars (Land Acquisition)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: District Collectorates */}
        {activeTab === "district" && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-base font-bold text-slate-900 mb-2">
              {lang === "ta" ? "38 மாவட்ட ஆட்சித் தலைவர் அலுவலகங்கள்" : "38 District Collectorate Gateways"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {districts.map((dist) => (
                <div
                  key={dist}
                  className="p-3 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 transition-colors flex justify-between items-center text-xs"
                >
                  <span className="font-semibold text-slate-800">{dist} Collectorate</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Maker-Checker Queue (P0 Directory Governance) */}
        {activeTab === "verification" && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-700">
                <ShieldAlert className="w-5 h-5" />
                <h2 className="text-base font-bold text-slate-900">
                  {lang === "ta"
                    ? "கள சரிபார்ப்பு & ஒப்புதல் வரிசை (Maker-Checker)"
                    : "Nodal Maker-Checker Verification Queue"}
                </h2>
              </div>
              <span className="text-xs bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-200 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Automated Conflict Engine Active
              </span>
            </div>

            <p className="text-xs text-slate-600">
              {lang === "ta"
                ? "இப்பகுதி துறை சார்ந்த தொடர்பு அலுவலர்களுக்கானது. மாறுதல் அரசாணைகளின் அடிப்படையில் புதிய அதிகாரிகளை நியமிக்க மற்றும் ஒப்புதல் அளிக்க."
                : "Department Nodal Maker submits transfer assignments. Joint Secretary / District DRO signs off before public activation."}
            </p>

            <div className="space-y-4">
              {approvalQueue.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs"
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

            <div className="p-4 rounded-lg bg-slate-100 border border-slate-200 text-xs text-slate-600">
              <strong>Statutory Audit Guarantee:</strong> Transferred officials never overwrite position definitions. Position histories remain archived in immutable audit records per GIGW 3.0 governance guidelines.
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
