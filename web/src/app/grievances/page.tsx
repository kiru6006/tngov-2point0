"use client";

import { useState } from "react";
import Link from "next/link";
import AppShell from "@/components/layout/AppShell";
import {
  ShieldAlert,
  Search,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileText,
  User,
  Building,
  Calendar,
  ArrowRight,
  RefreshCw,
  PhoneCall,
  CheckCircle,
  FileCheck,
  Send,
  HelpCircle,
  AlertCircle,
  ChevronRight,
  Filter,
} from "lucide-react";

// Grievance Lifecycle Status Enum
type GrievanceStage =
  | "SUBMITTED"
  | "ACKNOWLEDGED"
  | "ASSIGNED"
  | "IN PROGRESS"
  | "AWAITING INFORMATION"
  | "RESOLVED"
  | "CLOSED"
  | "REOPENED";

interface TimelineEvent {
  stage: GrievanceStage;
  label_en: string;
  label_ta: string;
  timestamp: string;
  officer: string;
  department: string;
  remarks_en: string;
  remarks_ta: string;
  isCompleted: boolean;
  isCurrent: boolean;
}

interface GrievanceRecord {
  grievance_id: string;
  citizen_name: string;
  district: string;
  department: string;
  category: string;
  subject_en: string;
  subject_ta: string;
  submission_date: string;
  sla_target_days: number;
  sla_due_date: string;
  current_stage: GrievanceStage;
  handling_officer: string;
  handling_office: string;
  priority: "HIGH" | "MEDIUM" | "STANDARD";
  timeline: TimelineEvent[];
}

const SAMPLE_GRIEVANCES: Record<string, GrievanceRecord> = {
  "GRV-TN-2026-08912": {
    grievance_id: "GRV-TN-2026-08912",
    citizen_name: "K. R. Murugan",
    district: "Salem",
    department: "Revenue and Disaster Management",
    category: "Patta / Chitta Name Rectification",
    subject_en: "Delay in Sub-Division Patta Transfer beyond 30 days statutory SLA",
    subject_ta: "30 நாட்களுக்கு மேல் உட்பிரிவு பட்டா மாறுதல் தாமதம்",
    submission_date: "2026-11-02",
    sla_target_days: 15,
    sla_due_date: "2026-11-17",
    current_stage: "IN PROGRESS",
    handling_officer: "Thiru M. Anbarasan, Tahsildar",
    handling_office: "Taluk Office, Salem West",
    priority: "HIGH",
    timeline: [
      {
        stage: "SUBMITTED",
        label_en: "Grievance Registered",
        label_ta: "மனு பதிவு செய்யப்பட்டது",
        timestamp: "2026-11-02 09:30 AM",
        officer: "1100 Helpline Operator (TNCM Cell)",
        department: "CM Special Cell",
        remarks_en: "Registered via CM Helpline 1100 portal with Aadhaar e-KYC.",
        remarks_ta: "1100 போர்ட்டல் மூலம் பதிவு செய்யப்பட்டது.",
        isCompleted: true,
        isCurrent: false,
      },
      {
        stage: "ACKNOWLEDGED",
        label_en: "Official Acknowledgment Issued",
        label_ta: "அதிகாரப்பூர்வ ஒப்புதல் அளிக்கப்பட்டது",
        timestamp: "2026-11-02 11:15 AM",
        officer: "Salem Collectorate Nodal Desk",
        department: "Revenue Department",
        remarks_en: "SMS and WhatsApp notification dispatched to registered mobile.",
        remarks_ta: "பதிவுசெய்த கைபேசிக்கு குறுஞ்செய்தி அனுப்பப்பட்டது.",
        isCompleted: true,
        isCurrent: false,
      },
      {
        stage: "ASSIGNED",
        label_en: "Assigned to Competent Officer",
        label_ta: "துறை அதிகாரியிடம் ஒப்படைக்கப்பட்டது",
        timestamp: "2026-11-04 02:45 PM",
        officer: "Revenue Divisional Officer (RDO), Salem",
        department: "Revenue Administration",
        remarks_en: "Forwarded to Tahsildar, Salem West for ground verification.",
        remarks_ta: "நேரடி கள ஆய்விற்காக வட்டாட்சியருக்கு அனுப்பப்பட்டது.",
        isCompleted: true,
        isCurrent: false,
      },
      {
        stage: "IN PROGRESS",
        label_en: "Field Inquiry & Verification",
        label_ta: "கள ஆய்வு & ஆவண சரிபார்ப்பு",
        timestamp: "2026-11-10 10:00 AM",
        officer: "Thiru M. Anbarasan, Tahsildar",
        department: "Taluk Office, Salem West",
        remarks_en: "Village Administrative Officer (VAO) report completed. Survey pending.",
        remarks_ta: "கிராம நிர்வாக அலுவலர் அறிக்கை பெறப்பட்டது. நில அளவை நிலுவையில் உள்ளது.",
        isCompleted: false,
        isCurrent: true,
      },
      {
        stage: "RESOLVED",
        label_en: "Redressal & Disposal Order",
        label_ta: "மனு மீதான இறுதி ஆணை",
        timestamp: "Pending",
        officer: "Tahsildar / RDO",
        department: "Revenue Department",
        remarks_en: "Action taken report (ATR) to be uploaded with sign-off.",
        remarks_ta: "நடவடிக்கை அறிக்கை சமர்ப்பிக்கப்பட வேண்டும்.",
        isCompleted: false,
        isCurrent: false,
      },
      {
        stage: "CLOSED",
        label_en: "Citizen Feedback & Case Closed",
        label_ta: "மனுதாரர் திருப்தி & முடிவு",
        timestamp: "Pending",
        officer: "Automated IVRS Desk (1100)",
        department: "Quality Assurance",
        remarks_en: "Case closed upon citizen confirmation via OTP or IVRS.",
        remarks_ta: "மனுதாரரின் ஒப்புதலுக்குப் பின் முடிக்கப்படும்.",
        isCompleted: false,
        isCurrent: false,
      },
    ],
  },
  "GRV-TN-2026-07419": {
    grievance_id: "GRV-TN-2026-07419",
    citizen_name: "S. Vasanthi",
    district: "Madurai",
    department: "Social Welfare and Women Empowerment",
    category: "Pudhumai Penn Financial Assistance",
    subject_en: "Monthly incentive ₹1000 bank account credit failure",
    subject_ta: "புதுமைப் பெண் திட்ட வங்கி வரவு சிக்கல்",
    submission_date: "2026-10-25",
    sla_target_days: 10,
    sla_due_date: "2026-11-04",
    current_stage: "RESOLVED",
    handling_officer: "District Social Welfare Officer",
    handling_office: "Collectorate Complex, Madurai",
    priority: "STANDARD",
    timeline: [
      {
        stage: "SUBMITTED",
        label_en: "Grievance Registered",
        label_ta: "மனு பதிவு செய்யப்பட்டது",
        timestamp: "2026-10-25 10:00 AM",
        officer: "Self-Service Portal",
        department: "Social Welfare",
        remarks_en: "Submitted online with college bonafide certificate.",
        remarks_ta: "இணையதளம் மூலம் சமர்ப்பிக்கப்பட்டது.",
        isCompleted: true,
        isCurrent: false,
      },
      {
        stage: "ASSIGNED",
        label_en: "Assigned to DSWO",
        label_ta: "மாவட்ட அலுவலரிடம் ஒப்படைப்பு",
        timestamp: "2026-10-26 11:30 AM",
        officer: "Nodal Officer",
        department: "Social Welfare",
        remarks_en: "Transferred to PFMS integration team.",
        remarks_ta: "வங்கி சரிபார்ப்பு குழுவிற்கு அனுப்பப்பட்டது.",
        isCompleted: true,
        isCurrent: false,
      },
      {
        stage: "RESOLVED",
        label_en: "Resolved & Account Credited",
        label_ta: "தீர்வு காணப்பட்டு வரவு வைக்கப்பட்டது",
        timestamp: "2026-11-02 04:15 PM",
        officer: "DSWO, Madurai",
        department: "Social Welfare",
        remarks_en: "IFSC error corrected in treasury portal. Arrears credited to Canara Bank account.",
        remarks_ta: "வங்கி குறியீட்டு பிழை சரிசெய்யப்பட்டு நிலுவைத் தொகை வரவு வைக்கப்பட்டது.",
        isCompleted: true,
        isCurrent: true,
      },
      {
        stage: "CLOSED",
        label_en: "Closed with Positive Feedback",
        label_ta: "மனுதாரர் ஏற்புடன் நிறைவுற்றது",
        timestamp: "2026-11-03 09:00 AM",
        officer: "1100 IVRS Verification",
        department: "CM Special Cell",
        remarks_en: "Citizen rated service 5/5 on IVRS follow-up call.",
        remarks_ta: "மனுதாரர் திருப்தி தெரிவித்துள்ளார்.",
        isCompleted: true,
        isCurrent: false,
      },
    ],
  },
};

export default function GrievanceTrackingPage() {
  const [lang, setLang] = useState<"en" | "ta">("en");
  const [workspace, setWorkspace] = useState<"public" | "official">("public");
  const [searchInput, setSearchInput] = useState("GRV-TN-2026-08912");
  const [searchedId, setSearchedId] = useState("GRV-TN-2026-08912");
  const [selectedRecord, setSelectedRecord] = useState<GrievanceRecord | null>(
    SAMPLE_GRIEVANCES["GRV-TN-2026-08912"]
  );
  const [filterDepartment, setFilterDepartment] = useState("ALL");
  const [filterStage, setFilterStage] = useState("ALL");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchInput.trim().toUpperCase();
    setSearchedId(query);
    if (SAMPLE_GRIEVANCES[query]) {
      setSelectedRecord(SAMPLE_GRIEVANCES[query]);
    } else {
      setSelectedRecord(null);
    }
  };

  const getStageColor = (stage: GrievanceStage) => {
    switch (stage) {
      case "SUBMITTED":
        return "bg-slate-100 text-slate-800 border-slate-300";
      case "ACKNOWLEDGED":
        return "bg-blue-50 text-blue-800 border-blue-200";
      case "ASSIGNED":
        return "bg-purple-50 text-purple-800 border-purple-200";
      case "IN PROGRESS":
        return "bg-amber-50 text-amber-800 border-amber-300";
      case "AWAITING INFORMATION":
        return "bg-orange-50 text-orange-800 border-orange-300";
      case "RESOLVED":
        return "bg-emerald-50 text-emerald-800 border-emerald-300";
      case "CLOSED":
        return "bg-slate-200 text-slate-700 border-slate-400";
      case "REOPENED":
        return "bg-red-50 text-red-800 border-red-300";
      default:
        return "bg-slate-100 text-slate-800 border-slate-300";
    }
  };

  return (
    <AppShell
      activeWorkspace={workspace}
      onWorkspaceChange={setWorkspace}
      lang={lang}
      onLanguageChange={setLang}
    >
      <div className="p-4 md:p-5 max-w-7xl mx-auto w-full space-y-4">
        {/* Header Breadcrumbs & Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
              <Link href="/" className="hover:text-[#004B87]">
                {lang === "ta" ? "முகப்பு" : "Home"}
              </Link>
              <span>/</span>
              <span className="text-slate-800 font-semibold">
                {lang === "ta" ? "குறைதீர்ப்பு கண்காணிப்பு" : "Grievance Redressal (1100)"}
              </span>
            </div>
            <h1 className="text-lg md:text-xl font-bold text-slate-900 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-[#004B87]" />
              <span>
                {lang === "ta"
                  ? "முதலமைச்சரின் உதவி மையம் & குறைதீர்ப்பு மேலாண்மை"
                  : "CM Helpline 1100 & Grievance Tracking Lifecycle"}
              </span>
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              {lang === "ta"
                ? "சட்டப்பூர்வ சேவை உத்தரவாதக் காலம் மற்றும் நிலை வாரியான வெளிப்படையான கண்காணிப்பு"
                : "Transparent statutory SLA tracking across 8 institutional lifecycle stages."}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="tel:1100"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-md shadow-xs transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{lang === "ta" ? "1100 டயல் செய்" : "Dial 1100 Helpline"}</span>
            </a>
          </div>
        </div>

        {/* 1. CITIZEN SEARCH / LOOKUP FORM */}
        <div className="bg-white p-3 md:p-4 rounded-lg border border-slate-200 shadow-xs">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-2">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder={
                  lang === "ta"
                    ? "மனு குறிப்பு எண் (எ.கா: GRV-TN-2026-08912)..."
                    : "Enter Grievance Reference (e.g., GRV-TN-2026-08912)..."
                }
                className="w-full pl-9 pr-3 py-2 text-xs md:text-sm bg-slate-50 focus:bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#004B87] uppercase font-mono"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-4 py-2 bg-[#004B87] hover:bg-[#003366] text-white text-xs md:text-sm font-semibold rounded-md shadow-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <Search className="w-4 h-4" />
              <span>{lang === "ta" ? "மனு நிலையை அறி" : "Track Status"}</span>
            </button>
          </form>

          {/* Quick Examples Pill */}
          <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-100 text-xs text-slate-500">
            <span className="font-semibold text-[11px] text-slate-400">
              {lang === "ta" ? "மாதிரி மனுக்கள்:" : "Sample Grievances:"}
            </span>
            <button
              type="button"
              onClick={() => {
                setSearchInput("GRV-TN-2026-08912");
                setSelectedRecord(SAMPLE_GRIEVANCES["GRV-TN-2026-08912"]);
              }}
              className="px-2 py-0.5 bg-blue-50 hover:bg-blue-100 text-[#004B87] rounded font-mono text-[11px] font-semibold transition-colors"
            >
              GRV-TN-2026-08912 (Revenue)
            </button>
            <button
              type="button"
              onClick={() => {
                setSearchInput("GRV-TN-2026-07419");
                setSelectedRecord(SAMPLE_GRIEVANCES["GRV-TN-2026-07419"]);
              }}
              className="px-2 py-0.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded font-mono text-[11px] font-semibold transition-colors"
            >
              GRV-TN-2026-07419 (Social Welfare)
            </button>
          </div>
        </div>

        {/* 2. RECORD DETAIL & VISUAL TIMELINE */}
        {selectedRecord ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Left: Summary Card */}
            <div className="lg:col-span-1 bg-white p-4 rounded-lg border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="font-mono text-xs font-bold text-slate-500">
                  {selectedRecord.grievance_id}
                </span>
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full font-bold border ${getStageColor(
                    selectedRecord.current_stage
                  )}`}
                >
                  {selectedRecord.current_stage}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-sm text-slate-900 leading-snug">
                  {lang === "ta" ? selectedRecord.subject_ta : selectedRecord.subject_en}
                </h3>
                <span className="inline-block mt-1 text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  {selectedRecord.category}
                </span>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">{lang === "ta" ? "மனுதாரர்:" : "Petitioner:"}</span>
                  <span className="font-semibold text-slate-800">{selectedRecord.citizen_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">{lang === "ta" ? "மாவட்டம்:" : "District:"}</span>
                  <span className="font-semibold text-slate-800">{selectedRecord.district}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">{lang === "ta" ? "துறை:" : "Department:"}</span>
                  <span className="font-semibold text-slate-800">{selectedRecord.department}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">{lang === "ta" ? "பதிவு தேதி:" : "Registered On:"}</span>
                  <span className="font-mono text-slate-700">{selectedRecord.submission_date}</span>
                </div>
                <div className="flex justify-between items-center bg-amber-50 p-2 rounded border border-amber-200">
                  <span className="font-bold text-amber-900">
                    {lang === "ta" ? "SLA கால வரம்பு:" : "Statutory SLA Due:"}
                  </span>
                  <span className="font-mono font-bold text-amber-900">
                    {selectedRecord.sla_due_date} ({selectedRecord.sla_target_days} Days)
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 text-xs space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  {lang === "ta" ? "தற்போதைய பொறுப்பாளர்" : "Current Handling Officer"}
                </span>
                <p className="font-semibold text-slate-800">{selectedRecord.handling_officer}</p>
                <p className="text-slate-500 text-[11px]">{selectedRecord.handling_office}</p>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => alert("Escalation flag logged with District Collector Nodal Cell.")}
                  className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded transition-colors flex items-center justify-center gap-1.5"
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  <span>{lang === "ta" ? "தீவிர கவனத்திற்கு கொண்டுசெல்" : "Request Urgent Escalation"}</span>
                </button>
              </div>
            </div>

            {/* Right: Visual Progress Timeline (8 Stages) */}
            <div className="lg:col-span-2 bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h2 className="font-bold text-sm text-slate-800 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#004B87]" />
                  <span>
                    {lang === "ta"
                      ? "நிலை வாரியான காலவரிசை & தணிக்கைப் பதிவு"
                      : "Stage-by-Stage Lifecycle Timeline & Action Log"}
                  </span>
                </h2>
                <span className="text-[11px] text-slate-400">
                  {selectedRecord.timeline.filter((t) => t.isCompleted).length} / {selectedRecord.timeline.length} {lang === "ta" ? "நிலைகள் முடிவுற்றன" : "Stages Complete"}
                </span>
              </div>

              <div className="mt-4 relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                {selectedRecord.timeline.map((step, idx) => (
                  <div key={idx} className="relative group">
                    {/* Circle Node */}
                    <div
                      className={`absolute -left-6 top-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-transform ${
                        step.isCompleted
                          ? "bg-emerald-600 border-white text-white shadow-xs"
                          : step.isCurrent
                          ? "bg-amber-500 border-white text-white ring-4 ring-amber-100 animate-pulse"
                          : "bg-slate-100 border-slate-300 text-slate-400"
                      }`}
                    >
                      {step.isCompleted ? (
                        <CheckCircle className="w-3.5 h-3.5" />
                      ) : step.isCurrent ? (
                        <RefreshCw className="w-3 h-3 animate-spin" />
                      ) : (
                        idx + 1
                      )}
                    </div>

                    {/* Step Card */}
                    <div
                      className={`p-3 rounded-md border text-xs ${
                        step.isCurrent
                          ? "bg-amber-50/50 border-amber-300 ring-1 ring-amber-200"
                          : step.isCompleted
                          ? "bg-slate-50 border-slate-200"
                          : "bg-white border-dashed border-slate-200 opacity-60"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">
                            {lang === "ta" ? step.label_ta : step.label_en}
                          </span>
                          <span
                            className={`text-[10px] px-1.5 py-0.2 rounded font-mono font-semibold ${getStageColor(
                              step.stage
                            )}`}
                          >
                            {step.stage}
                          </span>
                        </div>
                        <span className="font-mono text-[11px] text-slate-500">
                          {step.timestamp}
                        </span>
                      </div>

                      <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-600">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3 text-slate-400" />
                          <strong className="font-semibold">{step.officer}</strong>
                        </span>
                        <span className="flex items-center gap-1">
                          <Building className="w-3 h-3 text-slate-400" />
                          <span>{step.department}</span>
                        </span>
                      </div>

                      <p className="mt-1.5 text-slate-700 bg-white/70 p-2 rounded border border-slate-200/50 text-[11px]">
                        {lang === "ta" ? step.remarks_ta : step.remarks_en}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg border border-slate-200 text-center space-y-3">
            <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">
              {lang === "ta" ? "மனு கண்டுபிடிக்கப்படவில்லை" : "Grievance Record Not Found"}
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              {lang === "ta"
                ? `மனு எண் '${searchedId}' போர்ட்டலில் காணப்படவில்லை. தயவுசெய்து சரியான குறிப்பு எண்ணை உள்ளிடவும் அல்லது 1100 என்ற எண்ணை அழைக்கவும்.`
                : `Reference '${searchedId}' did not match active registry. Check your SMS confirmation or dial 1100.`}
            </p>
          </div>
        )}

        {/* 3. OFFICIAL WORKSPACE QUEUE VIEW */}
        {workspace === "official" && (
          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs space-y-3 mt-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-amber-600" />
                  <span>
                    {lang === "ta"
                      ? "துறைவாரி நிலுவை மனுக்கள் (அதிகாரப்பூர்வ பணிப்பட்டியல்)"
                      : "Department Grievance Worklist (Official Queue)"}
                  </span>
                </h3>
                <p className="text-xs text-slate-500">
                  {lang === "ta"
                    ? "SLA தாமதங்களை முன்னுரிமைப்படுத்தி தீர்வு காணவும்"
                    : "Prioritize pending and overdue items based on statutory SLA countdown."}
                </p>
              </div>

              {/* Filters */}
              <div className="flex items-center gap-2">
                <select
                  value={filterStage}
                  onChange={(e) => setFilterStage(e.target.value)}
                  className="text-xs bg-slate-50 border border-slate-300 rounded px-2 py-1 focus:ring-1 focus:ring-[#004B87]"
                >
                  <option value="ALL">All Stages / அனைத்து நிலைகள்</option>
                  <option value="ASSIGNED">ASSIGNED (ஒப்படைக்கப்பட்டது)</option>
                  <option value="IN PROGRESS">IN PROGRESS (ஆய்வில்)</option>
                  <option value="RESOLVED">RESOLVED (முடிவுற்றது)</option>
                </select>
              </div>
            </div>

            {/* Table of Queued Grievances */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600">
                    <th className="py-2 px-3 font-semibold">Grievance ID</th>
                    <th className="py-2 px-3 font-semibold">Petitioner & District</th>
                    <th className="py-2 px-3 font-semibold">Subject & Category</th>
                    <th className="py-2 px-3 font-semibold">SLA Status</th>
                    <th className="py-2 px-3 font-semibold">Current Stage</th>
                    <th className="py-2 px-3 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-mono font-bold text-[#004B87]">
                      GRV-TN-2026-08912
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="font-semibold text-slate-800">K. R. Murugan</div>
                      <div className="text-[11px] text-slate-500">Salem West</div>
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="text-slate-800">Delay in Sub-Division Patta Transfer</div>
                      <div className="text-[11px] text-slate-500">Revenue / Patta Chitta</div>
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-800">
                        OVERDUE (2 Days)
                      </span>
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-300">
                        IN PROGRESS
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedRecord(SAMPLE_GRIEVANCES["GRV-TN-2026-08912"])}
                        className="px-2.5 py-1 bg-[#004B87] hover:bg-[#003366] text-white rounded text-[11px] font-semibold"
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-mono font-bold text-[#004B87]">
                      GRV-TN-2026-07419
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="font-semibold text-slate-800">S. Vasanthi</div>
                      <div className="text-[11px] text-slate-500">Madurai North</div>
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="text-slate-800">Pudhumai Penn Monthly Incentive Credit</div>
                      <div className="text-[11px] text-slate-500">Social Welfare / Direct Benefit</div>
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        COMPLIANT (Within SLA)
                      </span>
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-300">
                        RESOLVED
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedRecord(SAMPLE_GRIEVANCES["GRV-TN-2026-07419"])}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[11px] font-semibold"
                      >
                        Inspect ATR
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
