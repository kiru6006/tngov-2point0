"use client";

import { useState } from "react";
import servicesData from "@/data/services.json";
import {
  FileText,
  Tractor,
  MapPin,
  GraduationCap,
  ShieldCheck,
  Briefcase,
  Search,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sun,
  Globe,
  HelpCircle,
  Building2,
  FileCheck2,
} from "lucide-react";

const iconMap: Record<string, any> = {
  FileText,
  Tractor,
  MapPin,
  GraduationCap,
  ShieldCheck,
  Briefcase,
};

export default function Home() {
  const [lang, setLang] = useState<"ta" | "en">("ta");
  const [highContrast, setHighContrast] = useState(false);
  const [appId, setAppId] = useState("");
  const [trackedStatus, setTrackedStatus] = useState<null | {
    id: string;
    stage: number;
    service: string;
    date: string;
  }>(null);
  const [trackingError, setTrackingError] = useState("");

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = appId.trim();
    if (cleanId.length < 8) {
      setTrackingError(
        lang === "ta"
          ? "சரியான 8-12 இலக்க விண்ணப்ப எண்ணை உள்ளிடவும் (எ.கா: TN20261001)"
          : "Please enter a valid application number (e.g., TN20261001)"
      );
      setTrackedStatus(null);
      return;
    }
    setTrackingError("");
    setTrackedStatus({
      id: cleanId,
      stage: 3,
      service:
        lang === "ta" ? "சாதிச் சான்றிதழ் (Community Certificate)" : "Community Certificate",
      date: "2026-11-17",
    });
  };

  const tnBlue = highContrast ? "#000000" : "#004B87";

  return (
    <div className={`min-h-screen flex flex-col ${highContrast ? "bg-black text-white" : "bg-slate-50 text-slate-900"}`}>
      {/* 1. Global Accessibility & GIGW Utility Top Bar */}
      <nav
        aria-label="Accessibility Bar"
        className="w-full border-b border-slate-200 bg-slate-900 text-slate-200 text-xs px-4 py-1.5 flex flex-wrap justify-between items-center gap-2"
      >
        <div className="flex items-center gap-3">
          <span>{lang === "ta" ? "தமிழ்நாடு அரசு அதிகாரப்பூர்வ தளம்" : "Official Portal of Govt of Tamil Nadu"}</span>
          <span className="hidden sm:inline text-slate-400">|</span>
          <a href="#main-content" className="hover:underline hidden sm:inline">
            {lang === "ta" ? "முதன்மை உள்ளடக்கத்திற்கு செல்க" : "Skip to main content"}
          </a>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setHighContrast(!highContrast)}
            className="flex items-center gap-1 hover:text-white px-2 py-0.5 rounded border border-slate-700"
            aria-label="Toggle High Contrast Mode"
          >
            <Sun className="w-3.5 h-3.5" />
            <span>{highContrast ? "Normal Mode" : "High Contrast"}</span>
          </button>
          <button
            onClick={() => setLang(lang === "ta" ? "en" : "ta")}
            className="flex items-center gap-1 font-semibold text-amber-400 hover:text-amber-300 px-2 py-0.5 rounded border border-slate-700"
            aria-label="Switch Language"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{lang === "ta" ? "English" : "தமிழ்"}</span>
          </button>
        </div>
      </nav>

      {/* 2. Main Branding Header */}
      <header className="w-full bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3.5">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white shadow-md text-sm shrink-0"
              style={{ backgroundColor: tnBlue }}
            >
              TN
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 leading-tight">
                {lang === "ta" ? "தமிழ்நாடு அரசு டிஜிட்டல் போர்டல் 2.0" : "Government of Tamil Nadu Digital Portal 2.0"}
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                {lang === "ta"
                  ? "பொதுமக்கள் சேவை & அரசு தொடர்பு கையேடு"
                  : "Citizen Services & Administrative Directory"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-600">
            <div className="text-right hidden md:block">
              <div className="font-semibold text-slate-800">CM Helpline: 1100</div>
              <div>TNeGA e-Sevai Support: 1800-425-1333</div>
            </div>
          </div>
        </div>
      </header>

      {/* 3. Hero Section with Prominent Semantic Search */}
      <section
        className="w-full py-12 px-4 sm:px-6 text-white text-center relative shadow-inner"
        style={{ backgroundColor: tnBlue }}
      >
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/15 text-white backdrop-blur-sm">
            <FileCheck2 className="w-3.5 h-3.5" />
            {lang === "ta" ? "ஒரே நுழைவு வாயில் - 45 துறைகள் & 38 மாவட்டங்கள்" : "Single Gateway - 45 Departments & 38 Districts"}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            {lang === "ta" ? "நீங்கள் என்ன சேவை தேடுகிறீர்கள்?" : "How can the Government assist you today?"}
          </h2>
          <p className="text-sm sm:text-base text-slate-200 max-w-xl">
            {lang === "ta"
              ? "சான்றிதழ்கள், நில ஆவணங்கள், அரசு ஆணைகள் மற்றும் திட்டங்களை நேரடியாகத் தேடுங்கள்."
              : "Discover online services, schemes, government orders, and administrative contacts instantly."}
          </p>

          {/* Bilingual Semantic Search Bar */}
          <form className="w-full relative mt-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder={
                lang === "ta"
                  ? "எ.கா: சாதிச் சான்றிதழ், பட்டா மாறுதல், மகளிர் உரிமைத் திட்டம்..."
                  : "Search by service name, scheme, G.O. number, or department..."
              }
              className="w-full py-3.5 pl-12 pr-28 rounded-xl text-slate-900 bg-white shadow-xl focus:outline-none focus:ring-4 focus:ring-amber-400 text-sm sm:text-base"
              aria-label="Universal Citizen Search"
            />
            <Search className="absolute left-4 top-4 text-slate-400 w-5 h-5" />
            <button
              type="submit"
              className="absolute right-2 top-2 px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs sm:text-sm transition-colors"
            >
              {lang === "ta" ? "தேடுக" : "Search"}
            </button>
          </form>

          {/* Search Pills */}
          <div className="flex flex-wrap justify-center items-center gap-2 text-xs text-slate-200 mt-1">
            <span className="opacity-80">{lang === "ta" ? "அடிக்கடி தேடப்படுபவை:" : "Popular Searches:"}</span>
            {["Patta Chitta", "Community Cert", "Old Age Pension", "Demand No. 21"].map((pill) => (
              <span
                key={pill}
                className="px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 cursor-pointer border border-white/20"
              >
                {pill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Main Content Area */}
      <main id="main-content" className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-10 flex flex-col gap-12">
        {/* Section A: 6 Life-Event Service Cards Grid */}
        <section aria-labelledby="services-heading">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 gap-2">
            <div>
              <h3 id="services-heading" className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                {lang === "ta" ? "முக்கிய மக்கள் சேவைகள் (Life Events)" : "Citizen Services by Life Events"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                {lang === "ta"
                  ? "துறை சார்ந்த சிக்கல்களின்றி தேவையான சேவைகளை எளிதாகப் பெறுங்கள்"
                  : "Access essential government services grouped by life events without departmental confusion"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesData.map((item) => {
              const IconComp = iconMap[item.icon] || FileText;
              return (
                <article
                  key={item.id}
                  className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-white shrink-0"
                        style={{ backgroundColor: tnBlue }}
                      >
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded flex items-center gap-1 border border-slate-200">
                        <Clock className="w-3 h-3 text-slate-500" /> SLA: {item.sla}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                      {lang === "ta" ? item.title_ta : item.title_en}
                    </h4>
                    <p className="text-xs text-slate-500 mb-3 font-medium">
                      {lang === "ta" ? item.dept_ta : item.dept_en}
                    </p>

                    <ul className="text-xs text-slate-600 space-y-1.5 border-t border-slate-100 pt-3 mb-4">
                      {item.items.map((srv, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                          <span className="truncate">{srv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href="#"
                    className="inline-flex items-center justify-between text-xs font-bold text-blue-700 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-lg transition-colors"
                    aria-label={`View all services under ${lang === "ta" ? item.title_ta : item.title_en}`}
                  >
                    <span>{lang === "ta" ? "அனைத்து சேவைகள்" : "View All Services"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </article>
              );
            })}
          </div>
        </section>

        {/* Section B: Unified Application Tracking Component */}
        <section
          aria-labelledby="tracker-heading"
          className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm"
        >
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-800 mb-3">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <h3 id="tracker-heading" className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">
              {lang === "ta" ? "விண்ணப்ப நிலை கண்காணிப்பு (Unified Tracking)" : "Track Application Status"}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mb-6">
              {lang === "ta"
                ? "இ-சேவை அல்லது அரசுத் துறைகளில் சமர்ப்பிக்கப்பட்ட விண்ணப்ப நிலையை அறியவும்"
                : "Check the live statutory processing stage for applications filed through e-Sevai or department portals"}
            </p>

            <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
              <input
                type="text"
                value={appId}
                onChange={(e) => setAppId(e.target.value)}
                placeholder="TN20261001 (8-12 alphanumeric)"
                className="w-full sm:w-80 px-4 py-2.5 rounded-lg border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                aria-label="Application Tracking Number"
              />
              <button
                type="submit"
                className="px-6 py-2.5 rounded-lg text-white font-semibold text-sm transition-colors shadow-sm shrink-0"
                style={{ backgroundColor: tnBlue }}
              >
                {lang === "ta" ? "நிலையைக் காண்க" : "Check Status"}
              </button>
            </form>

            {trackingError && <p className="text-xs text-red-600 font-medium mb-4">{trackingError}</p>}

            {/* Simulated Live Progress Bar */}
            {trackedStatus && (
              <div
                role="region"
                aria-live="polite"
                className="mt-6 p-5 rounded-xl bg-slate-50 border border-slate-200 text-left animate-fadeIn"
              >
                <div className="flex flex-wrap justify-between items-center text-xs text-slate-600 pb-3 border-b border-slate-200 mb-4 gap-2">
                  <div>
                    <span className="font-bold text-slate-900">{lang === "ta" ? "விண்ணப்ப எண்:" : "Application ID:"}</span>{" "}
                    <code className="font-mono bg-white px-2 py-0.5 rounded border border-slate-300">{trackedStatus.id}</code>
                  </div>
                  <div>
                    <span className="font-bold text-slate-900">{lang === "ta" ? "சேவை:" : "Service:"}</span> {trackedStatus.service}
                  </div>
                  <div>
                    <span className="font-bold text-slate-900">{lang === "ta" ? "தேதி:" : "Filed Date:"}</span> {trackedStatus.date}
                  </div>
                </div>

                <div className="relative py-2">
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-slate-200">
                    <div
                      style={{ width: "75%" }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600 transition-all duration-500"
                    />
                  </div>

                  <div className="grid grid-cols-4 text-center text-[10px] sm:text-xs font-medium text-slate-600 gap-1">
                    <div className="text-blue-700 font-bold flex flex-col items-center gap-1">
                      <CheckCircle2 className="w-4 h-4 text-blue-600" />
                      <span>{lang === "ta" ? "சமர்ப்பிக்கப்பட்டது" : "Submitted"}</span>
                    </div>
                    <div className="text-blue-700 font-bold flex flex-col items-center gap-1">
                      <CheckCircle2 className="w-4 h-4 text-blue-600" />
                      <span>{lang === "ta" ? "ஆவண சரிபார்ப்பு" : "VAO / RI Verification"}</span>
                    </div>
                    <div className="text-blue-700 font-bold flex flex-col items-center gap-1">
                      <Clock className="w-4 h-4 text-amber-500 animate-pulse" />
                      <span>{lang === "ta" ? "வட்டாட்சியர் ஒப்புதல் நிலை" : "Tahsildar Review"}</span>
                    </div>
                    <div className="text-slate-400 flex flex-col items-center gap-1">
                      <div className="w-4 h-4 rounded-full border border-slate-300" />
                      <span>{lang === "ta" ? "சான்றிதழ் வழங்கல்" : "Certificate Ready"}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* 5. GIGW Standard Footer */}
      <footer className="w-full bg-slate-900 text-slate-400 text-xs py-8 px-4 border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <div>
            <p className="text-slate-200 font-bold text-sm mb-1">
              {lang === "ta" ? "தமிழ்நாடு அரசு டிஜிட்டல் போர்டல் 2.0" : "Government of Tamil Nadu Portal 2.0"}
            </p>
            <p>Designed as per GIGW 3.0 & WCAG 2.2 AA accessibility standards.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-slate-300">
            <a href="#" className="hover:underline">RTI</a>
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Contact Directory (P0)</a>
            <a href="#" className="hover:underline">Disclaimer</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
