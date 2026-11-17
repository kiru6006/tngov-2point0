"use client";

import Link from "next/link";
import { Phone, Mail, ShieldCheck, ExternalLink, HelpCircle, FileText } from "lucide-react";

interface FooterProps {
  lang: "ta" | "en";
}

export default function FooterSitemap({ lang }: FooterProps) {
  return (
    <footer id="sitemap" className="w-full bg-[#0c1e33] text-slate-300 text-xs pt-12 pb-8 border-t-4 border-[#173B63]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Categorized Sitemap Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 pb-10 border-b border-slate-800">
          {/* Column 1: Government & Administration */}
          <div>
            <h4 className="text-white font-extrabold text-xs uppercase tracking-wider mb-3 border-b border-slate-700 pb-1">
              {lang === "ta" ? "அரசு நிர்வாகம்" : "Government"}
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link href="/contact-directory?role=governor" className="hover:text-white transition-colors">
                  {lang === "ta" ? "ஆளுநர் மாளிகை" : "Governor's Secretariat"}
                </Link>
              </li>
              <li>
                <Link href="/contact-directory?role=cm" className="hover:text-white transition-colors">
                  {lang === "ta" ? "முதலமைச்சர் அலுவலகம்" : "Chief Minister's Office"}
                </Link>
              </li>
              <li>
                <Link href="/contact-directory?role=minister" className="hover:text-white transition-colors">
                  {lang === "ta" ? "அமைச்சரவை" : "Council of Ministers"}
                </Link>
              </li>
              <li>
                <Link href="/contact-directory?role=cs" className="hover:text-white transition-colors">
                  {lang === "ta" ? "தலைமைச் செயலர்" : "Chief Secretary"}
                </Link>
              </li>
              <li>
                <Link href="/departments" className="hover:text-white transition-colors">
                  {lang === "ta" ? "அனைத்து 45 துறைகள்" : "Secretariat Departments"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Citizen Services */}
          <div>
            <h4 className="text-white font-extrabold text-xs uppercase tracking-wider mb-3 border-b border-slate-700 pb-1">
              {lang === "ta" ? "பொதுமக்கள் சேவைகள்" : "Citizen Services"}
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link href="/services/certificates" className="hover:text-white transition-colors">
                  {lang === "ta" ? "சாதி / வருமான சான்றிதழ்" : "Community & Income Cert"}
                </Link>
              </li>
              <li>
                <Link href="/services/land" className="hover:text-white transition-colors">
                  {lang === "ta" ? "பட்டா சிட்டா / நில ஆவணம்" : "Patta Chitta & Land"}
                </Link>
              </li>
              <li>
                <Link href="/services/certificates" className="hover:text-white transition-colors">
                  {lang === "ta" ? "இருப்பிட & வாரிசுச் சான்று" : "Nativity & Legal Heir"}
                </Link>
              </li>
              <li>
                <a href="https://www.tnpds.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  {lang === "ta" ? "ஸ்மார்ட் குடும்ப அட்டை" : "TNPDS Smart Ration Card"}
                </a>
              </li>
              <li>
                <Link href="/services" className="text-amber-400 hover:text-amber-300 font-semibold mt-1 inline-block">
                  {lang === "ta" ? "அனைத்து சேவைகளும் →" : "All Services →"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Schemes & Benefits */}
          <div>
            <h4 className="text-white font-extrabold text-xs uppercase tracking-wider mb-3 border-b border-slate-700 pb-1">
              {lang === "ta" ? "அரசு நலத்திட்டங்கள்" : "Schemes & Benefits"}
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link href="/schemes" className="hover:text-white transition-colors">
                  {lang === "ta" ? "கலைஞர் மகளிர் உரிமை" : "Magalir Urimai Thogai"}
                </Link>
              </li>
              <li>
                <Link href="/schemes" className="hover:text-white transition-colors">
                  {lang === "ta" ? "புதுமைப் பெண் & தமிழ்ப் புதல்வன்" : "Pudhumai Penn / Pudhalvan"}
                </Link>
              </li>
              <li>
                <Link href="/schemes" className="hover:text-white transition-colors">
                  {lang === "ta" ? "முதியோர் ஓய்வூதியம் (OAP)" : "Old Age Pension (OAP)"}
                </Link>
              </li>
              <li>
                <Link href="/schemes" className="hover:text-white transition-colors">
                  {lang === "ta" ? "முதல்வர் விரிவான காப்பீடு" : "CMCHIS Health Insurance"}
                </Link>
              </li>
              <li>
                <Link href="/schemes" className="text-amber-400 hover:text-amber-300 font-semibold mt-1 inline-block">
                  {lang === "ta" ? "அனைத்து திட்டங்களும் →" : "All Schemes →"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Districts & Documents */}
          <div>
            <h4 className="text-white font-extrabold text-xs uppercase tracking-wider mb-3 border-b border-slate-700 pb-1">
              {lang === "ta" ? "மாவட்டங்கள் & ஆவணங்கள்" : "Districts & Docs"}
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link href="/districts" className="hover:text-white transition-colors">
                  {lang === "ta" ? "அனைத்து 38 மாவட்டங்கள்" : "All 38 Districts"}
                </Link>
              </li>
              <li>
                <Link href="/contact-directory?designation=Collector" className="hover:text-white transition-colors">
                  {lang === "ta" ? "மாவட்ட ஆட்சியர்கள்" : "District Collectors"}
                </Link>
              </li>
              <li>
                <Link href="/documents" className="hover:text-white transition-colors">
                  {lang === "ta" ? "அரசாணைகள் (G.O.s)" : "Government Orders (G.O.)"}
                </Link>
              </li>
              <li>
                <Link href="/documents" className="hover:text-white transition-colors">
                  {lang === "ta" ? "அரசிதழ் (Gazette)" : "Tamil Nadu Gazette"}
                </Link>
              </li>
              <li>
                <a href="https://tntenders.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  {lang === "ta" ? "ஒப்பந்தப்புள்ளிகள் (Tenders)" : "TNTenders Portal"}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5: Contacts & Directory */}
          <div>
            <h4 className="text-white font-extrabold text-xs uppercase tracking-wider mb-3 border-b border-slate-700 pb-1">
              {lang === "ta" ? "தொடர்பு & தகவல்" : "Contacts & RTI"}
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link href="/contact-directory" className="hover:text-white transition-colors">
                  {lang === "ta" ? "அரசு தொலைபேசி கையேடு" : "Contact Directory"}
                </Link>
              </li>
              <li>
                <Link href="/contact-directory?category=RTI" className="hover:text-white transition-colors">
                  {lang === "ta" ? "தகவல் அறியும் உரிமை (RTI)" : "RTI Officers"}
                </Link>
              </li>
              <li>
                <Link href="/contact-directory?role=grievance" className="hover:text-white transition-colors">
                  {lang === "ta" ? "குறைதீர்க்கும் அலுவலர்கள்" : "Grievance Officers"}
                </Link>
              </li>
              <li>
                <Link href="/contact-directory?role=hod" className="hover:text-white transition-colors">
                  {lang === "ta" ? "இயக்குநரகங்கள் & ஆணையரகங்கள்" : "Heads of Departments"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 6: Helplines & Assistance */}
          <div>
            <h4 className="text-white font-extrabold text-xs uppercase tracking-wider mb-3 border-b border-slate-700 pb-1">
              {lang === "ta" ? "அவசர உதவி (24x7)" : "Helplines & Help"}
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="tel:1100" className="text-amber-400 hover:underline font-bold block">
                  CM Helpline: 1100
                </a>
                <span className="text-[10px] text-slate-400">{lang === "ta" ? "24x7 பொதுமக்கள் குறைகேட்பு" : "24/7 Citizen Grievance"}</span>
              </li>
              <li>
                <a href="tel:108" className="text-red-400 hover:underline font-bold block">
                  Emergency Ambulance: 108
                </a>
              </li>
              <li>
                <a href="tel:100" className="text-sky-400 hover:underline font-bold block">
                  Police Control: 100
                </a>
              </li>
              <li>
                <a href="tel:181" className="text-purple-400 hover:underline font-bold block">
                  Women Helpline: 181
                </a>
              </li>
              <li>
                <Link href="/assisted" className="text-emerald-400 hover:underline block font-semibold pt-1">
                  {lang === "ta" ? "இ-சேவை உதவியாளர் மையம் →" : "e-Sevai Kiosk Mode →"}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Institutional Disclaimer & Legal Policies */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-center md:text-left">
          <div className="space-y-1">
            <p className="font-extrabold text-white text-sm">
              {lang === "ta" ? "தமிழ்நாடு அரசு ஒருங்கிணைந்த டிஜிட்டல் போர்டல் 2.0" : "Government of Tamil Nadu Unified Digital Portal 2.0"}
            </p>
            <p className="text-[11px]">
              Designed and developed in accordance with GIGW 3.0 & WCAG 2.2 AA accessibility guidelines.
            </p>
            <p className="text-[11px] text-slate-500">
              Content owned, maintained, and verified by respective Departments of Government of Tamil Nadu.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-[11px] text-slate-300">
            <Link href="/contact-directory?category=RTI" className="hover:text-white underline-offset-2 hover:underline">
              {lang === "ta" ? "தகவல் அறியும் உரிமை (RTI)" : "Right to Information"}
            </Link>
            <a href="#policies" className="hover:text-white underline-offset-2 hover:underline">
              {lang === "ta" ? "தனியுரிமைக் கொள்கை" : "Privacy Policy"}
            </a>
            <a href="#disclaimer" className="hover:text-white underline-offset-2 hover:underline">
              {lang === "ta" ? "பொறுப்புத் துறப்பு" : "Disclaimer"}
            </a>
            <a href="#accessibility" className="hover:text-white underline-offset-2 hover:underline">
              {lang === "ta" ? "அணுகல் கொள்கை" : "Accessibility Statement"}
            </a>
            <a href="#sitemap" className="hover:text-white underline-offset-2 hover:underline">
              {lang === "ta" ? "தள வரைபடம்" : "Sitemap"}
            </a>
            <a href="#emergency-help" className="hover:text-white underline-offset-2 hover:underline">
              {lang === "ta" ? "உதவி" : "Help"}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
