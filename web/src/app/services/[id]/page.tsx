import Link from "next/link";
import servicesData from "@/data/services.json";
import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  ExternalLink,
  FileText,
  Building2,
  PhoneCall,
  Calendar,
  ShieldCheck,
  Search,
  HelpCircle,
  Award,
} from "lucide-react";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";

export function generateStaticParams() {
  return servicesData.map((service) => ({
    id: service.id,
  }));
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = servicesData.find((s) => s.id === id) || servicesData[0];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      {/* Top Standard Navigation Header */}
      <header className="bg-white border-b border-slate-200 py-3.5 px-4 sm:px-6 shadow-xs sticky top-0 z-30">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#173B63] hover:text-[#087F8C] bg-[#E9F2F7] hover:bg-sky-100 px-3 py-1.5 rounded-lg border border-sky-200 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Services / சேவைகள் முகப்பு</span>
          </Link>

          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Statutory Service Specification (GIGW 3.0)
          </span>
        </div>
      </header>

      {/* Accessible Breadcrumbs */}
      <Breadcrumbs
        lang="ta"
        items={[
          { label_en: "Home", label_ta: "முகப்பு", href: "/" },
          { label_en: "Citizen Services", label_ta: "பொதுமக்கள் சேவைகள்", href: "/services" },
          { label_en: service.title_en, label_ta: service.title_ta },
        ]}
      />

      {/* Main Standard Specification Container */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-8 flex flex-col gap-6">
        {/* Main Service Hero Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col gap-6">
          {/* Header Block: Department, Title, SLA, Fee */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b border-slate-100">
            <div className="space-y-1">
              <span className="text-xs font-extrabold text-[#173B63] bg-[#E9F2F7] px-2.5 py-1 rounded border border-sky-200 inline-block">
                {service.dept_en} | {service.dept_ta}
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 tracking-tight">
                {service.title_en}
              </h1>
              <p className="text-base font-bold text-[#087F8C]">
                {service.title_ta}
              </p>
              <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed mt-2">
                {service.short_description_en}
              </p>
            </div>

            <div className="flex flex-col sm:items-end gap-2 shrink-0">
              <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-lg text-xs font-bold">
                <Clock className="w-4 h-4 text-emerald-600" />
                <span>Statutory SLA: {service.sla}</span>
              </div>
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-slate-100 text-slate-800 border border-slate-200">
                Fee: {service.fee}
              </span>
            </div>
          </div>

          {/* Primary & Secondary Action Bar (Mandated AP Pattern) */}
          <div className="p-4 bg-sky-50/60 rounded-xl border border-sky-200 flex flex-wrap items-center justify-between gap-3">
            {/* Primary Action Button */}
            <a
              href={service.official_application_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#173B63] hover:bg-[#0f2844] text-white font-extrabold text-sm transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              <span>APPLY / OPEN OFFICIAL SERVICE</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            {/* Secondary Action Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              {service.application_tracking_link && (
                <a
                  href={service.application_tracking_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white hover:bg-slate-50 text-[#173B63] font-bold text-xs border border-slate-300 shadow-2xs"
                >
                  <Search className="w-3.5 h-3.5 text-[#087F8C]" />
                  <span>Check Application Status</span>
                </a>
              )}
              <a
                href="#documents-checklist"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs border border-slate-300 shadow-2xs"
              >
                <FileText className="w-3.5 h-3.5 text-slate-500" />
                <span>View Required Documents</span>
              </a>
              <Link
                href="/assisted"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs border border-slate-300 shadow-2xs"
              >
                <Building2 className="w-3.5 h-3.5 text-slate-500" />
                <span>Find Nearest e-Sevai Kiosk</span>
              </Link>
              <a
                href="tel:1100"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs border border-amber-300 shadow-2xs"
              >
                <PhoneCall className="w-3.5 h-3.5 text-amber-700" />
                <span>Get Help (1100)</span>
              </a>
            </div>
          </div>

          {/* 18-Attribute Specification Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Who Can Apply & Eligibility */}
            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#173B63] mb-1.5">
                  5. Who Can Apply / யார் விண்ணப்பிக்கலாம்?
                </h3>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {service.who_can_apply_en}
                </p>
                <p className="text-[11px] text-slate-500 mt-1">
                  {service.who_can_apply_ta}
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#173B63] mb-1.5">
                  6. Statutory Eligibility / தகுதி வரம்பு
                </h3>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {service.eligibility_en}
                </p>
                <p className="text-[11px] text-slate-500 mt-1">
                  {service.eligibility_ta}
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#173B63] mb-1.5">
                  8. Application Procedure / விண்ணப்பிக்கும் முறை
                </h3>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {service.application_procedure_en}
                </p>
                <p className="text-[11px] text-slate-500 mt-1">
                  {service.application_procedure_ta}
                </p>
              </div>
            </div>

            {/* Required Documents Checklist */}
            <div id="documents-checklist" className="space-y-4">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#173B63] mb-2">
                  7. Required Documents / தேவையான ஆவணங்கள்
                </h3>
                <ul className="space-y-2 text-xs">
                  {service.required_documents.map((doc, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="font-medium">{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Delivery Attributes */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2.5 text-xs">
                <div>
                  <span className="font-bold text-slate-500 block text-[11px] uppercase">
                    11. Application Mode
                  </span>
                  <span className="font-semibold text-slate-800">{service.application_mode}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-500 block text-[11px] uppercase">
                    14. Statutory Government Order (G.O.)
                  </span>
                  <span className="font-semibold text-slate-800">{service.related_gos}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-500 block text-[11px] uppercase">
                    15. Competent Government Office
                  </span>
                  <span className="font-semibold text-slate-800">{service.related_office}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-500 block text-[11px] uppercase">
                    16. Citizen Grievance Redressal Channel
                  </span>
                  <span className="font-semibold text-amber-800">{service.grievance_channel}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Audit Verification Footer */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center text-[11px] text-slate-400 gap-2">
            <span>
              17. Last Verified Date: <strong>{service.last_verified_date}</strong>
            </span>
            <span>
              18. Source: <strong>{service.official_source}</strong>
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}
