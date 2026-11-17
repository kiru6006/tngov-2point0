"use client";

import Link from "next/link";
import { ExternalLink, ArrowRight } from "lucide-react";
import { NavCategoryGroup } from "@/data/navigation";

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  groups?: NavCategoryGroup[];
  viewAllHref: string;
  viewAllText: string;
  lang: "ta" | "en";
}

export default function AccessibleMegaMenu({
  isOpen,
  onClose,
  groups,
  viewAllHref,
  viewAllText,
  lang,
}: MegaMenuProps) {
  if (!isOpen || !groups || groups.length === 0) return null;

  return (
    <div
      role="menu"
      aria-orientation="vertical"
      className="absolute top-full left-0 w-full bg-white border-b-2 border-[#004B87] shadow-2xl py-6 px-4 sm:px-8 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          onClose();
        }
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {groups.map((grp) => (
            <div key={grp.group_id} className="space-y-3">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#004B87] border-b border-slate-200 pb-1.5">
                {lang === "ta" ? grp.group_title_ta : grp.group_title_en}
              </h4>
              <ul className="space-y-2 text-xs">
                {grp.items.map((item) => (
                  <li key={item.id}>
                    {item.isExternal ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={onClose}
                        className="group flex flex-col p-1.5 rounded hover:bg-slate-50 transition-colors"
                      >
                        <div className="font-bold text-slate-800 group-hover:text-[#004B87] flex items-center justify-between">
                          <span>{lang === "ta" ? item.title_ta : item.title_en}</span>
                          <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-[#004B87]" />
                        </div>
                        {item.description_en && (
                          <span className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                            {lang === "ta" ? item.description_ta : item.description_en}
                          </span>
                        )}
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="group flex flex-col p-1.5 rounded hover:bg-slate-50 transition-colors"
                      >
                        <div className="font-bold text-slate-800 group-hover:text-[#004B87] flex items-center justify-between">
                          <span>{lang === "ta" ? item.title_ta : item.title_en}</span>
                          {item.badge_en && (
                            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 font-semibold">
                              {lang === "ta" ? item.badge_ta : item.badge_en}
                            </span>
                          )}
                        </div>
                        {item.description_en && (
                          <span className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                            {lang === "ta" ? item.description_ta : item.description_en}
                          </span>
                        )}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
          <span className="text-slate-500">
            {lang === "ta"
              ? "அரசாங்கத் துறைகள் மற்றும் சேவைகள் சரிபார்க்கப்பட்ட அதிகாரப்பூர்வ இணைப்புகள்"
              : "Official verified government services and department portals"}
          </span>
          <Link
            href={viewAllHref}
            onClick={onClose}
            className="inline-flex items-center gap-1.5 font-bold text-[#004B87] hover:underline"
          >
            <span>{viewAllText}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
