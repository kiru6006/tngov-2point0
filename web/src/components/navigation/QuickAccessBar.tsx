"use client";

import Link from "next/link";
import {
  FileText,
  MapPin,
  Clock,
  Award,
  Users,
  FileCheck2,
  PhoneCall,
  Building2,
} from "lucide-react";
import { QUICK_ACCESS_ITEMS } from "@/data/navigation";

const iconMap: Record<string, any> = {
  FileText,
  MapPin,
  Clock,
  Award,
  Users,
  FileCheck2,
  PhoneCall,
  Building2,
};

interface QuickAccessBarProps {
  lang: "ta" | "en";
}

export default function QuickAccessBar({ lang }: QuickAccessBarProps) {
  return (
    <section
      aria-label="Frequently Used Citizen Services Quick Bar"
      className="w-full bg-slate-100 border-b border-slate-200 py-2.5 px-4 sm:px-6 shadow-sm overflow-x-auto"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-start md:justify-center gap-2 sm:gap-3 shrink-0">
        <span className="text-[11px] uppercase tracking-wider font-extrabold text-slate-500 whitespace-nowrap pl-1 pr-2 border-r border-slate-300 hidden lg:inline">
          {lang === "ta" ? "விரைவு சேவைகள்:" : "Quick Access:"}
        </span>
        {QUICK_ACCESS_ITEMS.map((item) => {
          const IconComp = iconMap[item.iconName] || FileText;
          return (
            <Link
              key={item.id}
              href={item.href}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-blue-50 text-slate-700 hover:text-[#004B87] border border-slate-200 hover:border-blue-300 text-xs font-semibold whitespace-nowrap shadow-2xs transition-all focus:outline-none focus:ring-2 focus:ring-[#004B87]"
            >
              <IconComp className="w-3.5 h-3.5 text-[#004B87] shrink-0" />
              <span>{lang === "ta" ? item.title_ta : item.title_en}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
