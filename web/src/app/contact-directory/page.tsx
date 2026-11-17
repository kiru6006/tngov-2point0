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
  Filter,
} from "lucide-react";

export default function ContactDirectoryPage() {
  const [lang, setLang] = useState<"ta" | "en">("ta");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("ALL");
  const [selectedDistrict, setSelectedDistrict] = useState("ALL");
  const [activeTab, setActiveTab] = useState<"table" | "hierarchy" | "district" | "verification">("table");

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

    return matchesSearch && matchesDept && matchesDist;
  });

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
                {lang === "ta" ? "சரிபார்க்கப்பட்ட அதிகாரப்பூர்வ தகவல் தளம்" : "Verified Statutory Administrative Directory"}
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
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2 text-xs sm:text-sm font-semibold">
          <button
            onClick={() => setActiveTab("table")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === "table" ? "bg-[#004B87] text-white shadow-sm" : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            {lang === "ta" ? "அனைத்து அதிகாரிகள் பட்டியல்" : "Directory Search & Table"}
          </button>
          <button
            onClick={() => setActiveTab("hierarchy")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === "hierarchy" ? "bg-[#004B87] text-white shadow-sm" : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            {lang === "ta" ? "நிர்வாக படிநிலை மரம்" : "Administrative Hierarchy"}
          </button>
          <button
            onClick={() => setActiveTab("district")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === "district" ? "bg-[#004B87] text-white shadow-sm" : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            {lang === "ta" ? "38 மாவட்ட ஆட்சியர்கள்" : "38 District Collectorates"}
          </button>
          <button
            onClick={() => setActiveTab("verification")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === "verification" ? "bg-amber-600 text-white shadow-sm" : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            {lang === "ta" ? "சரிபார்ப்பு & காலியிடங்கள்" : "Verification & Vacancies"}
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
                  placeholder={lang === "ta" ? "பெயர், பதவி, துறை தேடுக..." : "Search by name, post, department..."}
                  className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              </div>

              <div className="flex flex-wrap gap-2 w-full md:w-auto">
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white text-slate-700"
                >
                  <option value="ALL">{lang === "ta" ? "அனைத்து மாவட்டங்கள்" : "All Districts"}</option>
                  {districts.map((d) => (
                    <option key={d} value={d}>{d}</option>
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
                          <div className="text-slate-500 text-[11px] truncate max-w-xs">
                            {off.office}
                          </div>
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
                          <div className="text-[10px] text-slate-400 font-mono mt-1">
                            {off.go_ref}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Hierarchy Tree */}
        {activeTab === "hierarchy" && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-1">
              {lang === "ta" ? "அரசு நிர்வாக படிநிலை அறிக்கை" : "Statutory Administrative Reporting Tree"}
            </h3>
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
                      ├── Principal Secretary (Dr. P. Senthil Kumar, IAS)<br/>
                      ├── Commissioner of Revenue Administration (S. Sivarasu, IAS)<br/>
                      └── District Collectors (38 Districts)
                    </div>
                  </div>
                  <div>
                    ├── <strong>Highways and Minor Ports Dept</strong>
                    <div className="pl-6 text-slate-600">
                      ├── Additional Chief Secretary (Dr. K. Gopal, IAS)<br/>
                      ├── Chief Engineer (Construction & Maintenance)<br/>
                      └── Special Tahsildars (Land Acquisition)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: District Collectorates */}
        {activeTab === "district" && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-2">
              {lang === "ta" ? "38 மாவட்ட ஆட்சித் தலைவர் அலுவலகங்கள்" : "38 District Collectorate Gateways"}
            </h3>
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

        {/* Tab 4: Verification & Vacancies */}
        {activeTab === "verification" && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col gap-4">
            <div className="flex items-center gap-2 text-amber-700">
              <ShieldAlert className="w-5 h-5" />
              <h3 className="text-base font-bold">
                {lang === "ta" ? "கள சரிபார்ப்பு & காலியிடங்கள் கண்காணிப்பு" : "Nodal Maker-Checker Verification Queue"}
              </h3>
            </div>
            <p className="text-xs text-slate-600">
              {lang === "ta"
                ? "இப்பகுதி துறை சார்ந்த தொடர்பு அலுவலர்களுக்கு மட்டுமே உரியது. காலியிடங்கள் மற்றும் மாற்றப்பட்ட அலுவலர்கள் விவரம்."
                : "Restricted administrative view for department nodal officers. Highlights vacancies, unverified telephone channels, and pending transfer orders."}
            </p>

            <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900">
              <strong>Active Alert:</strong> 1 position currently flagged as <code>Vacant</code> in Salem District (Special Tahsildar - Land Acquisition). Requires nodal assignment upload with statutory G.O. reference.
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
