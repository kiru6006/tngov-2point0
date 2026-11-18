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
import AppShell from "@/components/layout/AppShell";

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
    <AppShell activeWorkspace="public" lang="en">
      <div className="p-4 md:p-5 max-w-5xl mx-auto w-full space-y-4">
        {/* Breadcrumbs Navigation */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500 border-b border-slate-200 pb-2.5">
          <Link href="/" className="hover:text-[#004B87]">Home</Link>
          <span>/</span>
          <Link href="/services" className="hover:text-[#004B87]">Citizen Services</Link>
          <span>/</span>
          <span className="text-slate-800 font-semibold truncate max-w-xs">{service.title_en}</span>
        </div>

        {/* Main Service Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col gap-5">
          {/* Header Block: Department, Title, SLA, Fee */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-4 border-b border-slate-100">
            <div className="space-y-1">
              <span className="text-[11px] font-extrabold text-[#173B63] bg-[#E9F2F7] px-2.5 py-0.5 rounded border border-sky-200 inline-block">
                {service.dept_en} | {service.dept_ta}
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-1 tracking-tight">
                {service.title_en}
              </h1>
              <p className="text-sm font-bold text-[#087F8C]">
                {service.title_ta}
              </p>
              <p className="text-xs text-slate-600 max-w-2xl leading-relaxed mt-1">
                {service.short_description_en}
              </p>
            </div>

            <div className="flex flex-col sm:items-end gap-1.5 shrink-0">
              <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-md text-xs font-bold">
                <Clock className="w-3.5 h-3.5 text-emerald-600" />
                <span>Statutory SLA: {service.sla}</span>
              </div>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">
                Fee: {service.fee}
              </span>
            </div>
          </div>

          {/* Action Bar */}
          <div className="p-3.5 bg-sky-50/60 rounded-xl border border-sky-200 flex flex-wrap items-center justify-between gap-3">
            <a
              href={service.official_application_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#004B87] hover:bg-blue-900 text-white font-extrabold text-xs sm:text-sm transition-all shadow-xs"
            >
              <span>APPLY / OPEN OFFICIAL SERVICE</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <div className="flex flex-wrap items-center gap-2">
              {service.application_tracking_link && (
                <a
                  href={service.application_tracking_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-xs"
                >
                  <Search className="w-3 h-3 text-slate-500" />
                  <span>Check Application Status</span>
                </a>
              )}

              <a
                href="#documents-checklist"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-xs"
              >
                <FileText className="w-3 h-3 text-slate-500" />
                <span>View Required Documents</span>
              </a>

              <Link
                href="/districts"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-xs"
              >
                <Building2 className="w-3 h-3 text-slate-500" />
                <span>Find Nearest e-Sevai Kiosk</span>
              </Link>

              <Link
                href="/grievances"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 font-bold text-xs"
              >
                <HelpCircle className="w-3 h-3 text-amber-600" />
                <span>Get Help / Raise Grievance</span>
              </Link>
            </div>
          </div>

          {/* 18-Attribute Specification Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            {/* Who Can Apply & Eligibility */}
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#173B63] mb-1">
                  Who Can Apply / யார் விண்ணப்பிக்கலாம்?
                </h3>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {service.who_can_apply_en}
                </p>
                <p className="text-[11px] text-slate-500 mt-1">
                  {service.who_can_apply_ta}
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#173B63] mb-1">
                  Statutory Eligibility / தகுதி வரம்பு
                </h3>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {service.eligibility_en}
                </p>
                <p className="text-[11px] text-slate-500 mt-1">
                  {service.eligibility_ta}
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#173B63] mb-1">
                  Application Procedure / விண்ணப்பிக்கும் முறை
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
            <div id="documents-checklist" className="space-y-3">
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#173B63] mb-1.5">
                  Required Documents / தேவையான ஆவணங்கள்
                </h3>
                <ul className="space-y-1.5 text-xs">
                  {service.required_documents.map((doc, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="font-medium text-[11px]">{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Delivery Attributes */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-2 text-xs">
                <div>
                  <span className="font-bold text-slate-500 block text-[10px] uppercase">
                    Application Mode
                  </span>
                  <span className="font-semibold text-slate-800 text-[11px]">{service.application_mode}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-500 block text-[10px] uppercase">
                    Statutory Government Order (G.O.)
                  </span>
                  <span className="font-semibold text-slate-800 text-[11px]">{service.related_gos}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-500 block text-[10px] uppercase">
                    Competent Government Office
                  </span>
                  <span className="font-semibold text-slate-800 text-[11px]">{service.related_office}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-500 block text-[10px] uppercase">
                    Citizen Grievance Redressal Channel
                  </span>
                  <span className="font-semibold text-amber-800 text-[11px]">{service.grievance_channel}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Audit Verification Footer */}
          <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center text-[10px] text-slate-400 gap-1.5">
            <span>
              Last Verified Date: <strong>{service.last_verified_date}</strong>
            </span>
            <span>
              Source: <strong>{service.official_source}</strong>
            </span>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
