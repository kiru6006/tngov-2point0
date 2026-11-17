"use client";

import Link from "next/link";
import { Phone, Mail, ShieldCheck, ExternalLink } from "lucide-react";

interface FooterProps {
  lang: "ta" | "en";
}

export default function FooterSitemap({ lang }: FooterProps) {
  return (
    <footer id="sitemap" className="w-full bg-slate-900 text-slate-300 text-xs pt-12 pb-8 border-t-4 border-[#004B87]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Categorized Sitemap Columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 pb-10 border-b border-slate-800">
          {/* Column 1: Citizen Services */}
          <div>
            <h4 className="text-white font-extrabold text-xs uppercase tracking-wider mb-3">
              {lang === "ta" ? "பொதுமக்கள் சேவைகள்" : "Citizen Services"}
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link href="/services/certificates" className="hover:text-white transition-colors">
                  {lang === "ta" ? "சாதிச் சான்றிதழ்" : "Community Certificate"}
                </Link>
              </li>
              <li>
                <Link href="/services/certificates" className="hover:text-white transition-colors">
                  {lang === "ta" ? "வருமானச் சான்றிதழ்" : "Income Certificate"}
                </Link>
              </li>
              <li>
                <Link href="/services/certificates" className="hover:text-white transition-colors">
                  {lang === "ta" ? "இருப்பிடச் சான்றிதழ்" : "Nativity Certificate"}
                </Link>
              </li>
              <li>
                <Link href="/services/land" className="hover:text-white transition-colors">
                  {lang === "ta" ? "பட்டா சிட்டா விவரம்" : "Patta Chitta Land Records"}
                </Link>
              </li>
              <li>
                <Link href="/services/certificates" className="hover:text-white transition-colors">
                  {lang === "ta" ? "வாரிசுச் சான்றிதழ்" : "Legal Heir Certificate"}
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-amber-400 hover:text-amber-300 font-semibold mt-1 inline-block">
                  {lang === "ta" ? "அனைத்து சேவைகளும் →" : "All Services →"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Welfare Schemes */}
          <div>
            <h4 className="text-white font-extrabold text-xs uppercase tracking-wider mb-3">
              {lang === "ta" ? "அரசு நலத்திட்டங்கள்" : "Welfare Schemes"}
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link href="/schemes" className="hover:text-white transition-colors">
                  {lang === "ta" ? "மகளிர் உரிமைத் திட்டம்" : "Magalir Urimai Thogai"}
                </Link>
              </li>
              <li>
                <Link href="/schemes" className="hover:text-white transition-colors">
                  {lang === "ta" ? "புதுமைப் பெண் திட்டம்" : "Pudhumai Penn Scheme"}
                </Link>
              </li>
              <li>
                <Link href="/schemes" className="hover:text-white transition-colors">
                  {lang === "ta" ? "முதியோர் ஓய்வூதியம்" : "Old Age Pension (OAP)"}
                </Link>
              </li>
              <li>
                <Link href="/schemes" className="hover:text-white transition-colors">
                  {lang === "ta" ? "முதல்வர் மருத்துவக் காப்பீடு" : "CMCHIS Health Insurance"}
                </Link>
              </li>
              <li>
                <Link href="/schemes" className="hover:text-white transition-colors">
                  {lang === "ta" ? "வேளாண் வளர்ச்சித் திட்டம்" : "All Village Agri Scheme"}
                </Link>
              </li>
              <li>
                <Link href="/schemes" className="text-amber-400 hover:text-amber-300 font-semibold mt-1 inline-block">
                  {lang === "ta" ? "அனைத்து திட்டங்களும் →" : "All Schemes →"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Government Contacts */}
          <div>
            <h4 className="text-white font-extrabold text-xs uppercase tracking-wider mb-3">
              {lang === "ta" ? "அரசு தொடர்புகள்" : "Government Contacts"}
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link href="/contact-directory?category=Minister" className="hover:text-white transition-colors">
                  {lang === "ta" ? "அமைச்சரவை" : "Council of Ministers"}
                </Link>
              </li>
              <li>
                <Link href="/contact-directory?cadre=IAS" className="hover:text-white transition-colors">
                  {lang === "ta" ? "அரசுச் செயலாளர்கள்" : "Secretaries to Govt"}
                </Link>
              </li>
              <li>
                <Link href="/contact-directory?designation=Collector" className="hover:text-white transition-colors">
                  {lang === "ta" ? "மாவட்ட ஆட்சித்தலைவர்கள்" : "District Collectors"}
                </Link>
              </li>
              <li>
                <Link href="/contact-directory?category=HoD" className="hover:text-white transition-colors">
                  {lang === "ta" ? "துறைத் தலைவர்கள் (HoD)" : "Heads of Departments"}
                </Link>
              </li>
              <li>
                <Link href="/contact-directory?category=RTI" className="hover:text-white transition-colors">
                  {lang === "ta" ? "RTI தகவல் அலுவலர்கள்" : "RTI Officers"}
                </Link>
              </li>
              <li>
                <Link href="/contact-directory" className="text-amber-400 hover:text-amber-300 font-semibold mt-1 inline-block">
                  {lang === "ta" ? "முழு தொடர்பு கையேடு →" : "Full Directory →"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Departments & Districts */}
          <div>
            <h4 className="text-white font-extrabold text-xs uppercase tracking-wider mb-3">
              {lang === "ta" ? "துறைகள் & மாவட்டங்கள்" : "Depts & Districts"}
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link href="/departments" className="hover:text-white transition-colors">
                  {lang === "ta" ? "வருவாய்த் துறை" : "Revenue Department"}
                </Link>
              </li>
              <li>
                <Link href="/departments" className="hover:text-white transition-colors">
                  {lang === "ta" ? "சமூக நலத்துறை" : "Social Welfare Dept"}
                </Link>
              </li>
              <li>
                <Link href="/departments" className="hover:text-white transition-colors">
                  {lang === "ta" ? "பள்ளிக் கல்வித்துறை" : "School Education Dept"}
                </Link>
              </li>
              <li>
                <Link href="/departments" className="hover:text-white transition-colors">
                  {lang === "ta" ? "அனைத்து 45 துறைகள்" : "All 45 Departments"}
                </Link>
              </li>
              <li>
                <Link href="/districts" className="hover:text-white transition-colors">
                  {lang === "ta" ? "அனைத்து 38 மாவட்டங்கள்" : "All 38 Districts"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Government Documents */}
          <div>
            <h4 className="text-white font-extrabold text-xs uppercase tracking-wider mb-3">
              {lang === "ta" ? "அரசாணைகள் & ஆவணங்கள்" : "Documents & Orders"}
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link href="/documents" className="hover:text-white transition-colors">
                  {lang === "ta" ? "அரசாணைகள் (G.O.s)" : "Government Orders (G.O.)"}
                </Link>
              </li>
              <li>
                <Link href="/documents" className="hover:text-white transition-colors">
                  {lang === "ta" ? "கொள்கை விளக்கக் குறிப்பு" : "Policy Notes"}
                </Link>
              </li>
              <li>
                <Link href="/documents" className="hover:text-white transition-colors">
                  {lang === "ta" ? "அரசிதழ் அறிவிப்புகள்" : "Gazette Notifications"}
                </Link>
              </li>
              <li>
                <Link href="/documents" className="hover:text-white transition-colors">
                  {lang === "ta" ? "குடிமக்கள் சாசனம்" : "Citizen Charters"}
                </Link>
              </li>
              <li>
                <Link href="/documents" className="hover:text-white transition-colors">
                  {lang === "ta" ? "அரசு விண்ணப்பப் படிவங்கள்" : "Official Forms"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 6: Helplines & Assistance */}
          <div>
            <h4 className="text-white font-extrabold text-xs uppercase tracking-wider mb-3">
              {lang === "ta" ? "உதவி & குறைதீர்ப்பு" : "Grievance & Help"}
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="tel:1100" className="text-amber-400 hover:underline font-bold block">
                  CM Helpline: 1100
                </a>
                <span className="text-[10px] text-slate-500">{lang === "ta" ? "24x7 பொதுமக்கள் குறைகேட்பு" : "24/7 Citizen Grievance"}</span>
              </li>
              <li>
                <a href="tel:108" className="text-red-400 hover:underline font-bold block">
                  Medical Emergency: 108
                </a>
              </li>
              <li>
                <a href="tel:181" className="text-purple-400 hover:underline font-bold block">
                  Women Helpline: 181
                </a>
              </li>
              <li>
                <a href="tel:18004251333" className="text-emerald-400 hover:underline font-bold block">
                  e-Sevai: 1800-425-1333
                </a>
              </li>
              <li className="pt-1">
                <Link href="/assisted" className="text-blue-400 hover:underline block font-semibold">
                  {lang === "ta" ? "இ-சேவை உதவியாளர் மையம்" : "Assisted Kiosk Mode"}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Institutional Disclaimer & Legal Policies */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-center md:text-left">
          <div className="space-y-1">
            <p className="font-extrabold text-white text-sm">
              {lang === "ta" ? "தமிழ்நாடு அரசு டிஜிட்டல் போர்டல் 2.0" : "Government of Tamil Nadu Portal 2.0"}
            </p>
            <p className="text-[11px]">
              Designed and developed in accordance with GIGW 3.0 & WCAG 2.2 AA accessibility guidelines.
            </p>
            <p className="text-[11px] text-slate-500">
              Content owned, maintained, and updated by respective Departments of Government of Tamil Nadu.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-[11px] text-slate-300">
            <Link href="/contact-directory?category=RTI" className="hover:text-white underline-offset-2 hover:underline">
              {lang === "ta" ? "தகவல் அறியும் உரிமை (RTI)" : "Right to Information (RTI)"}
            </Link>
            <a href="#" className="hover:text-white underline-offset-2 hover:underline">
              {lang === "ta" ? "தனியுரிமைக் கொள்கை" : "Privacy Policy"}
            </a>
            <a href="#" className="hover:text-white underline-offset-2 hover:underline">
              {lang === "ta" ? "பொறுப்புத் துறப்பு" : "Disclaimer"}
            </a>
            <a href="#" className="hover:text-white underline-offset-2 hover:underline">
              {lang === "ta" ? "பயன்பாட்டு விதிமுறைகள்" : "Terms of Use"}
            </a>
            <a href="#sitemap" className="hover:text-white underline-offset-2 hover:underline">
              {lang === "ta" ? "தள வரைபடம்" : "Sitemap"}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
