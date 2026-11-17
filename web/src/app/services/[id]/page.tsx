import Link from "next/link";
import servicesData from "@/data/services.json";
import { ArrowLeft, Clock, CheckCircle2, ExternalLink } from "lucide-react";

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
      <header className="bg-white border-b border-slate-200 py-4 px-4 sm:px-6 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-900 bg-blue-50 px-2.5 py-1.5 rounded-lg border border-blue-100"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Services</span>
            </Link>
            <Link
              href="/"
              className="text-xs font-semibold text-slate-500 hover:text-slate-800"
            >
              Portal Home
            </Link>
          </div>
          <span className="text-xs font-semibold text-slate-500">Service Specification</span>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8 flex flex-col gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col gap-6">
          <div className="flex flex-wrap justify-between items-start gap-4 pb-6 border-b border-slate-100">
            <div>
              <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
                {service.dept_en}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                {service.title_en}
              </h1>
              <p className="text-sm text-slate-500 font-medium mt-1">
                {service.title_ta}
              </p>
            </div>
            <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-lg text-xs font-bold">
              <Clock className="w-4 h-4 text-emerald-600" />
              <span>Statutory SLA: {service.sla}</span>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
              Available Statutory Services
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.items.map((srv, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center gap-3"
                >
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="text-xs font-bold text-slate-800">{srv}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
              Mandatory Checklist for Applicants
            </h2>
            <ul className="text-xs text-slate-600 space-y-2 list-disc pl-5">
              <li>Aadhaar Card of the applicant or parent for identity verification.</li>
              <li>Proof of residence (Smart Ration Card or Electricity Bill).</li>
              <li>Relevant legal documents (Self-declaration, Family tree, or Land extract).</li>
            </ul>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
            <a
              href="https://tnesevai.tn.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#004B87] hover:bg-blue-900 text-white font-bold text-xs transition-colors shadow-md"
            >
              <span>Apply Online via TNeGA e-Sevai</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <Link
              href="/assisted"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs transition-colors"
            >
              <span>Apply via e-Sevai Operator Kiosk</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
