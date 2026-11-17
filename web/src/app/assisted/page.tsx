"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Search,
  UserCheck,
  CheckCircle,
  Printer,
  Shield,
  FileText,
  CreditCard,
  Building,
  Clock,
  AlertTriangle,
  QrCode,
  Globe,
  PhoneCall,
} from "lucide-react";
import servicesData from "@/data/services.json";

export default function AssistedAccessPage() {
  const [lang, setLang] = useState<"ta" | "en">("ta");
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form states
  const [citizenId, setCitizenId] = useState("3304 8812 9014");
  const [citizenName, setCitizenName] = useState("முத்துக்கருப்பன் பழனிவேல் (P. Muthukaruppan)");
  const [citizenMobile, setCitizenMobile] = useState("98410 12345");
  const [citizenDistrict, setCitizenDistrict] = useState("Madurai (மதுரை)");
  const [selectedService, setSelectedService] = useState(servicesData[0].items[0]);
  const [selectedDept, setSelectedDept] = useState(servicesData[0].dept_en);
  const [sla, setSla] = useState(servicesData[0].sla);
  const [fee, setFee] = useState("₹60");
  const [receiptNumber, setReceiptNumber] = useState("TN-ESEVAI-2026-89421");
  const [submissionDate, setSubmissionDate] = useState("17-11-2026 11:30 AM");

  const handleNextStep = () => {
    if (step === 3) {
      const randomToken = "TN-ESEVAI-2026-" + Math.floor(10000 + Math.random() * 90000);
      setReceiptNumber(randomToken);
      const now = new Date();
      setSubmissionDate(now.toLocaleString("en-IN", { dateStyle: "short", timeStyle: "short" }));
    }
    setStep((prev) => Math.min(4, prev + 1) as 1 | 2 | 3 | 4);
  };

  const handleReset = () => {
    setStep(1);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans flex flex-col antialiased">
      {/* Top Banner / Operator Identity */}
      <header className="bg-[#002B49] text-white py-3 px-4 sm:px-6 shadow-md border-b-4 border-amber-500">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 hover:text-white bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{lang === "ta" ? "பொது முகப்பு" : "Main Portal"}</span>
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-amber-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
                  e-Sevai Kiosk Mode
                </span>
                <h1 className="text-sm sm:text-base font-bold tracking-tight">
                  {lang === "ta" ? "உதவி பெறும் சேவை மையம் (இ-சேவை முகப்பு)" : "Assisted Access Operator Console"}
                </h1>
              </div>
              <p className="text-[11px] text-slate-300">
                {lang === "ta"
                  ? "மையம்: TN-ESEVAI-CHE-042 (கிண்டி மையம்) | ஆபரேட்டர்: எம். செந்தில்குமார் (நிலை: செயலில்)"
                  : "Center: TN-ESEVAI-CHE-042 (Guindy Kiosk) | Operator: M. Senthilkumar (Active)"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(lang === "ta" ? "en" : "ta")}
              className="flex items-center gap-1 text-xs font-bold text-white bg-blue-900/60 hover:bg-blue-800 px-3 py-1.5 rounded-lg border border-blue-400/40"
            >
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === "ta" ? "English View" : "தமிழ் பார்வை"}</span>
            </button>
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-800 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>TNeGA Gateway Connected</span>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Flow Steps */}
      <nav aria-label="Assisted workflow progress" className="bg-white border-b border-slate-200 py-3 px-4 shadow-sm">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          {[
            { num: 1, ta: "1. குடிமக்கள் சரிபார்ப்பு", en: "1. Citizen Verification" },
            { num: 2, ta: "2. சேவை தேர்வு", en: "2. Service Selection" },
            { num: 3, ta: "3. ஆவண சரிபார்ப்பு", en: "3. Doc Sighting" },
            { num: 4, ta: "4. ஒப்புதல் ரசீது", en: "4. Acknowledgement" },
          ].map((s) => (
            <div
              key={s.num}
              className={`flex items-center gap-2 text-xs font-bold ${
                step === s.num
                  ? "text-blue-800 border-b-2 border-blue-700 pb-1"
                  : step > s.num
                  ? "text-emerald-700"
                  : "text-slate-400"
              }`}
            >
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                  step === s.num
                    ? "bg-blue-700 text-white"
                    : step > s.num
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-200 text-slate-600"
                }`}
              >
                {step > s.num ? "✓" : s.num}
              </span>
              <span className="hidden sm:inline">{lang === "ta" ? s.ta : s.en}</span>
            </div>
          ))}
        </div>
      </nav>

      {/* Main Form Work Area */}
      <main className="flex-1 max-w-4xl mx-auto w-full p-4 sm:p-6 flex flex-col gap-6">
        {/* Step 1: Citizen ID Verification */}
        {step === 1 && (
          <div className="bg-white rounded-2xl border border-slate-300 p-6 shadow-sm flex flex-col gap-5">
            <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  {lang === "ta" ? "படி 1: குடிமக்கள் விபரம் மற்றும் ஆதார் சரிபார்ப்பு" : "Step 1: Citizen Profile & Identity Verification"}
                </h2>
                <p className="text-xs text-slate-500">
                  {lang === "ta"
                    ? "ஆதார் அட்டை, ஸ்மார்ட் குடும்ப அட்டை அல்லது மொபைல் எண் மூலம் விபரங்களை உள்ளிடுக."
                    : "Enter Aadhaar, Smart Ration Card, or Citizen Mobile number to fetch profile."}
                </p>
              </div>
              <Shield className="w-8 h-8 text-blue-700 opacity-80" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === "ta" ? "ஆதார் எண் / குடும்ப அட்டை எண்" : "Aadhaar No / Smart Card ID"}
                </label>
                <input
                  type="text"
                  value={citizenId}
                  onChange={(e) => setCitizenId(e.target.value)}
                  className="w-full text-base font-semibold px-3 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === "ta" ? "குடிமகன் பெயர் (முழு பெயர்)" : "Citizen Full Name"}
                </label>
                <input
                  type="text"
                  value={citizenName}
                  onChange={(e) => setCitizenName(e.target.value)}
                  className="w-full text-base font-semibold px-3 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === "ta" ? "தொடர்பு மொபைல் எண் (SMS கண்காணிப்புக்கு)" : "Citizen Mobile (For SMS Alerts)"}
                </label>
                <input
                  type="text"
                  value={citizenMobile}
                  onChange={(e) => setCitizenMobile(e.target.value)}
                  className="w-full text-base font-semibold px-3 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === "ta" ? "வருவாய் மாவட்டம்" : "Revenue District"}
                </label>
                <input
                  type="text"
                  value={citizenDistrict}
                  onChange={(e) => setCitizenDistrict(e.target.value)}
                  className="w-full text-base font-semibold px-3 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center gap-3">
              <UserCheck className="w-5 h-5 text-amber-700 shrink-0" />
              <div className="text-xs text-amber-900">
                <span className="font-bold">{lang === "ta" ? "ஆபரேட்டர் சான்றளிப்பு: " : "Operator Attestation: "}</span>
                {lang === "ta"
                  ? "விண்ணப்பதாரரின் அசல் ஆதார் அடையாள ஆவணத்தை நேரில் சரிபார்த்துள்ளேன்."
                  : "I confirm that I have physically verified the applicant's original identity card."}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={handleNextStep}
                className="bg-[#004B87] hover:bg-blue-900 text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-2"
              >
                <span>{lang === "ta" ? "அடுத்த படி: சேவை தேர்வு" : "Next: Service Selection"}</span>
                <span>→</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Service Selection */}
        {step === 2 && (
          <div className="bg-white rounded-2xl border border-slate-300 p-6 shadow-sm flex flex-col gap-5">
            <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  {lang === "ta" ? "படி 2: அரசு சேவை மற்றும் சான்றிதழ் தேர்வு" : "Step 2: Choose Statutory Service"}
                </h2>
                <p className="text-xs text-slate-500">
                  {lang === "ta"
                    ? "விண்ணப்பதாரருக்கு தேவையான சேவையை பட்டியலிலிருந்து தேர்ந்தெடுக்கவும்."
                    : "Select the specific government statutory certificate or service requested."}
                </p>
              </div>
              <FileText className="w-8 h-8 text-blue-700 opacity-80" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {servicesData.map((cat) => (
                <div key={cat.id} className="border border-slate-200 rounded-xl p-3 bg-slate-50">
                  <div className="text-xs font-bold text-blue-900 mb-1 flex items-center justify-between">
                    <span>{lang === "ta" ? cat.title_ta : cat.title_en}</span>
                    <span className="text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded font-mono">
                      SLA: {cat.sla}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1.5 mt-2">
                    {cat.items.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSelectedService(item);
                          setSelectedDept(cat.dept_en);
                          setSla(cat.sla);
                          setFee(item.includes("Patta") || item.includes("Crop") ? "₹0 (Free)" : "₹60");
                        }}
                        className={`text-left text-xs font-medium px-3 py-2 rounded-lg border transition-all ${
                          selectedService === item
                            ? "bg-blue-700 text-white border-blue-800 font-bold shadow-sm"
                            : "bg-white text-slate-800 border-slate-200 hover:border-blue-400"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs text-emerald-800 font-semibold uppercase">{lang === "ta" ? "தேர்ந்தெடுக்கப்பட்ட சேவை" : "Selected Service"}:</span>
                <p className="text-sm font-extrabold text-emerald-950">{selectedService}</p>
                <p className="text-[11px] text-emerald-700 font-medium">Department: {selectedDept} | SLA: {sla}</p>
              </div>
              <div className="text-right">
                <span className="text-xs text-emerald-800 font-semibold">{lang === "ta" ? "அரசு கட்டணம்" : "Statutory Fee"}:</span>
                <p className="text-base font-black text-emerald-900">{fee}</p>
              </div>
            </div>

            <div className="flex justify-between pt-2">
              <button
                onClick={() => setStep(1)}
                className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs px-4 py-2.5 rounded-xl"
              >
                ← {lang === "ta" ? "பின்செல்" : "Back"}
              </button>
              <button
                onClick={handleNextStep}
                className="bg-[#004B87] hover:bg-blue-900 text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-2"
              >
                <span>{lang === "ta" ? "அடுத்த படி: ஆவண சரிபார்ப்பு" : "Next: Document Sighting"}</span>
                <span>→</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Document Verification Checklist */}
        {step === 3 && (
          <div className="bg-white rounded-2xl border border-slate-300 p-6 shadow-sm flex flex-col gap-5">
            <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  {lang === "ta" ? "படி 3: அசல் ஆவணங்கள் சரிபார்ப்பு பட்டியல்" : "Step 3: Original Documents Sighting Checklist"}
                </h2>
                <p className="text-xs text-slate-500">
                  {lang === "ta"
                    ? "விண்ணப்பத்துடன் இணைக்கப்பட வேண்டிய கட்டாய ஆவணங்களை சரிபார்க்கவும்."
                    : "Check off required physical documents presented by citizen at the kiosk."}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-emerald-600 opacity-80" />
            </div>

            <div className="space-y-3">
              {[
                { label_ta: "அசல் ஆதார் அட்டை சமர்ப்பிக்கப்பட்டு பயோமெட்ரிக் சரிபார்க்கப்பட்டது", label_en: "Original Aadhaar Card presented & verified" },
                { label_ta: "முகவரி சான்று (ஸ்மார்ட் குடும்ப அட்டை / மின் கட்டண ரசீது)", label_en: "Proof of Residence (Smart Card / TANGEDCO EB Bill)" },
                { label_ta: "வருமான சான்று / சுய அறிவிப்பு படிவம் பூர்த்தி செய்யப்பட்டு கையொப்பமிடப்பட்டது", label_en: "Income self-declaration signed by applicant" },
                { label_ta: "பாஸ்போர்ட் அளவு புகைப்படம் பெறப்பட்டு ஸ்கேன் செய்யப்பட்டது", label_en: "Applicant passport photograph scanned" },
              ].map((doc, idx) => (
                <label
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 mt-0.5 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                  />
                  <div className="text-xs font-semibold text-slate-800">
                    <p>{lang === "ta" ? doc.label_ta : doc.label_en}</p>
                    <span className="text-[10px] text-emerald-700 font-bold">✓ Sighted in Original</span>
                  </div>
                </label>
              ))}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-blue-700" />
                <span className="text-xs font-bold text-blue-900">
                  {lang === "ta" ? "கட்டணம் செலுத்தும் முறை: ரொக்கம் / UPI (₹60 பெறப்பட்டது)" : "Payment Mode: Cash / UPI (₹60 Received)"}
                </span>
              </div>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                Paid Verified
              </span>
            </div>

            <div className="flex justify-between pt-2">
              <button
                onClick={() => setStep(2)}
                className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs px-4 py-2.5 rounded-xl"
              >
                ← {lang === "ta" ? "பின்செல்" : "Back"}
              </button>
              <button
                onClick={handleNextStep}
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                <span>{lang === "ta" ? "விண்ணப்பத்தை சமர்ப்பித்து ரசீது உருவாக்குக" : "Submit & Generate Official Receipt"}</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Official Acknowledgement Receipt */}
        {step === 4 && (
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-2xl border-2 border-slate-800 p-6 sm:p-8 shadow-lg flex flex-col gap-6 print:border-none print:shadow-none">
              {/* Receipt Header */}
              <div className="border-b-2 border-slate-800 pb-4 flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full border-2 border-slate-800 flex items-center justify-center font-black text-xs text-slate-900">
                    TN GOV
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-slate-950 uppercase tracking-tight">
                      தமிழ்நாடு மின் ஆளுமை முகமை (TNeGA)
                    </h3>
                    <p className="text-xs font-bold text-slate-700">
                      Tamil Nadu e-Governance Agency - e-Sevai Kiosk Acknowledgment
                    </p>
                    <p className="text-[11px] text-slate-500 font-mono">
                      Center: Guindy Kiosk (TN-ESEVAI-CHE-042) | Operator: M. Senthilkumar
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="inline-block bg-slate-900 text-white text-[10px] font-black px-2.5 py-1 rounded font-mono">
                    OFFICIAL STATUTORY RECEIPT
                  </span>
                  <p className="text-xs font-extrabold text-slate-900 mt-1 font-mono">{receiptNumber}</p>
                  <p className="text-[10px] text-slate-500">{submissionDate}</p>
                </div>
              </div>

              {/* Receipt Body */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-500">Applicant Details / விண்ணப்பதாரர்:</span>
                  <p className="font-extrabold text-slate-900 text-sm">{citizenName}</p>
                  <p className="text-slate-600 font-mono">ID / Aadhaar: {citizenId}</p>
                  <p className="text-slate-600">Mobile: {citizenMobile}</p>
                  <p className="text-slate-600">District: {citizenDistrict}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-500">Service Particulars / சேவை விவரம்:</span>
                  <p className="font-extrabold text-blue-900 text-sm">{selectedService}</p>
                  <p className="text-slate-600">Department: {selectedDept}</p>
                  <p className="text-slate-600">Statutory SLA Target: <span className="font-bold text-emerald-800">{sla}</span></p>
                  <p className="text-slate-600">Fee Received: <span className="font-bold">{fee} (Receipt #{receiptNumber.slice(-5)})</span></p>
                </div>
              </div>

              {/* QR and Security Seal */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <QrCode className="w-14 h-14 text-slate-900" />
                  <div className="text-xs">
                    <p className="font-bold text-slate-900">QR Code for Instant SMS & Portal Tracking</p>
                    <p className="text-[11px] text-slate-500">
                      Scan or visit <span className="font-mono text-blue-700">tngov.tn.gov.in/status</span> with application number
                    </p>
                    <p className="text-[10px] text-emerald-700 font-bold mt-0.5">
                      ✓ Digital Token Signature Validated
                    </p>
                  </div>
                </div>

                <div className="text-right border-l border-slate-300 pl-4">
                  <span className="text-[10px] text-slate-400 font-bold block mb-4">Authorized Operator Seal:</span>
                  <div className="text-xs font-mono font-bold text-slate-800 border-b border-dashed border-slate-400 pb-1">
                    [TNeGA-DIGITAL-SIGN]
                  </div>
                  <span className="text-[9px] text-slate-500">e-Sevai Officer TN-042</span>
                </div>
              </div>

              {/* Notice */}
              <p className="text-[10px] text-slate-500 italic text-center border-t border-slate-200 pt-3">
                * Note: This is an official digital acknowledgment receipt under the Tamil Nadu Right to Services Act. The competent authority will process the request within the stipulated statutory period.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                onClick={handleReset}
                className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs px-4 py-2.5 rounded-xl"
              >
                + {lang === "ta" ? "புதிய விண்ணப்பம் தொடங்குக" : "Process Another Citizen Application"}
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="bg-blue-800 hover:bg-blue-900 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md flex items-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  <span>{lang === "ta" ? "ரசீதை அச்சிடுக (Print Receipt)" : "Print Acknowledgement Receipt"}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
