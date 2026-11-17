"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label_en: string;
  label_ta: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  lang: "ta" | "en";
}

export default function Breadcrumbs({ items, lang }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb Navigation"
      className="w-full bg-slate-50 border-b border-slate-200 py-2 px-4 sm:px-6 text-xs text-slate-500"
    >
      <div className="max-w-7xl mx-auto flex items-center flex-wrap gap-1.5">
        <Link
          href="/"
          className="inline-flex items-center gap-1 hover:text-[#004B87] font-medium"
        >
          <Home className="w-3.5 h-3.5" />
          <span>{lang === "ta" ? "முகப்பு" : "Home"}</span>
        </Link>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <div key={index} className="flex items-center gap-1.5">
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              {isLast || !item.href ? (
                <span className="font-bold text-slate-800" aria-current="page">
                  {lang === "ta" ? item.label_ta : item.label_en}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-[#004B87] font-medium"
                >
                  {lang === "ta" ? item.label_ta : item.label_en}
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
