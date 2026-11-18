"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  FileText,
  Award,
  Users,
  Building2,
  MapPin,
  FileCheck2,
  BarChart3,
  Landmark,
  PhoneCall,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Search,
  Globe,
  Sun,
  Moon,
  ShieldAlert,
  LayoutDashboard,
  CheckCircle,
  HelpCircle,
  UserCheck,
  Bell,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

interface AppShellProps {
  children: React.ReactNode;
  activeWorkspace?: "public" | "official";
  onWorkspaceChange?: (mode: "public" | "official") => void;
  lang?: "en" | "ta";
  onLanguageChange?: (lang: "en" | "ta") => void;
}

export default function AppShell({
  children,
  activeWorkspace: propWorkspace,
  onWorkspaceChange,
  lang: propLang,
  onLanguageChange,
}: AppShellProps) {
  const pathname = usePathname();
  const router = useRouter();

  // Workspace Mode (public citizen vs authenticated official)
  const [workspace, setWorkspace] = useState<"public" | "official">(
    propWorkspace || "public"
  );
  // Default language English per P0 specifications
  const [lang, setLang] = useState<"en" | "ta">(propLang || "en");
  // Left sidebar state: expanded (224px) vs collapsed (64px)
  const [collapsed, setCollapsed] = useState(false);
  // Mobile drawer open state
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  // High contrast mode
  const [highContrast, setHighContrast] = useState(false);
  // Font scale: 'normal' | 'large' | 'xlarge'
  const [fontScale, setFontScale] = useState<"normal" | "large" | "xlarge">(
    "normal"
  );
  // Global search input
  const [globalSearch, setGlobalSearch] = useState("");

  const basePath = process.env.NODE_ENV === "production" ? "/tngov-2point0" : "";

  // Sync workspace if prop changes
  useEffect(() => {
    if (propWorkspace) setWorkspace(propWorkspace);
  }, [propWorkspace]);

  // Sync lang if prop changes
  useEffect(() => {
    if (propLang) setLang(propLang);
  }, [propLang]);

  // Persist sidebar collapsed state
  useEffect(() => {
    const saved = localStorage.getItem("tngov_sidebar_collapsed");
    if (saved !== null) {
      setCollapsed(saved === "true");
    }
  }, []);

  const toggleSidebar = () => {
    const next = !collapsed;
    setCollapsed(next);
    localStorage.setItem("tngov_sidebar_collapsed", String(next));
  };

  const handleWorkspaceToggle = (mode: "public" | "official") => {
    setWorkspace(mode);
    if (onWorkspaceChange) onWorkspaceChange(mode);
  };

  const handleLanguageToggle = (nextLang: "en" | "ta") => {
    setLang(nextLang);
    if (onLanguageChange) onLanguageChange(nextLang);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (globalSearch.trim()) {
      router.push(`/search?q=${encodeURIComponent(globalSearch.trim())}`);
    }
  };

  // Close mobile drawer on route change or Escape
  useEffect(() => {
    setMobileDrawerOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileDrawerOpen(false);
      // Shortcut Ctrl+B or Cmd+B to toggle sidebar
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "b") {
        e.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [collapsed]);

  // Public Left Navigation Items (11 items)
  const publicNavItems = [
    {
      href: "/",
      label_en: "Home",
      label_ta: "முகப்பு",
      icon: Home,
      exact: true,
    },
    {
      href: "/services",
      label_en: "Citizen Services",
      label_ta: "பொதுமக்கள் சேவைகள்",
      icon: FileText,
      badge: "64+",
    },
    {
      href: "/schemes",
      label_en: "Schemes & Benefits",
      label_ta: "திட்டங்கள் & பயன்கள்",
      icon: Award,
    },
    {
      href: "/grievances",
      label_en: "Grievances (1100)",
      label_ta: "குறைதீர்ப்பு (1100)",
      icon: ShieldAlert,
      badge: "Track",
    },
    {
      href: "/contact-directory",
      label_en: "Contact Directory",
      label_ta: "அரசு தொடர்பு வழிகாட்டி",
      icon: Users,
      badge: "845+",
    },
    {
      href: "/departments",
      label_en: "Departments",
      label_ta: "அரசுத் துறைகள்",
      icon: Building2,
    },
    {
      href: "/districts",
      label_en: "Districts",
      label_ta: "மாவட்டங்கள் (38)",
      icon: MapPin,
    },
    {
      href: "/documents",
      label_en: "Government Orders",
      label_ta: "அரசாணைகள் (G.O.)",
      icon: FileCheck2,
    },
    {
      href: "/performance",
      label_en: "Govt Performance",
      label_ta: "செயல்திறன் அறிக்கை",
      icon: BarChart3,
    },
    {
      href: "/about",
      label_en: "About Tamil Nadu",
      label_ta: "தமிழ்நாடு பற்றி",
      icon: Landmark,
    },
    {
      href: "/#emergency-help",
      label_en: "Emergency & Help",
      label_ta: "அவசர உதவி எண்கள்",
      icon: PhoneCall,
    },
  ];

  // Official Workspace Navigation Items (10 items)
  const officialNavItems = [
    {
      href: "/",
      label_en: "Overview Dashboard",
      label_ta: "கண்காணிப்பு பலகை",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      href: "/grievances",
      label_en: "Grievance Queue",
      label_ta: "மனு மேலாண்மை வரிசை",
      icon: ShieldAlert,
      badge: "Active",
    },
    {
      href: "/performance",
      label_en: "Department KPIs",
      label_ta: "செயல்திறன் குறிகாட்டிகள்",
      icon: BarChart3,
    },
    {
      href: "/services",
      label_en: "Service Catalogs",
      label_ta: "சேவை அட்டவணை",
      icon: FileText,
    },
    {
      href: "/schemes",
      label_en: "Scheme Sanctions",
      label_ta: "திட்ட ஒப்புதல்கள்",
      icon: Award,
    },
    {
      href: "/contact-directory",
      label_en: "Officer Directory",
      label_ta: "அலுவலர் வழிகாட்டி",
      icon: Users,
    },
    {
      href: "/departments",
      label_en: "Line Departments",
      label_ta: "இணைப்புத் துறைகள்",
      icon: Building2,
    },
    {
      href: "/documents",
      label_en: "Gazette & G.O. Repository",
      label_ta: "அரசாணை ஆவணங்கள்",
      icon: FileCheck2,
    },
    {
      href: "/contact-directory#approval-queue",
      label_en: "Maker-Checker Queue",
      label_ta: "ஒப்புதல் சரிபார்ப்பு",
      icon: CheckCircle,
      badge: "Audit",
    },
    {
      href: "/about",
      label_en: "Administrative Manual",
      label_ta: "நிர்வாகக் குறிப்பேடு",
      icon: Landmark,
    },
  ];

  const currentNav = workspace === "official" ? officialNavItems : publicNavItems;

  const isRouteActive = (itemHref: string, exact?: boolean) => {
    if (exact) {
      return pathname === itemHref;
    }
    if (itemHref.startsWith("/#") || itemHref.startsWith("#")) {
      return false;
    }
    return pathname.startsWith(itemHref);
  };

  // Font scale class
  const fontClass =
    fontScale === "large"
      ? "text-base"
      : fontScale === "xlarge"
      ? "text-lg"
      : "text-sm";

  return (
    <div
      className={`min-h-screen flex flex-col ${
        highContrast ? "bg-black text-yellow-300" : "bg-slate-50 text-slate-900"
      } ${fontClass}`}
    >
      {/* 1. TOP UTILITY BAR (No duplicate primary menu) */}
      <header
        role="banner"
        className={`sticky top-0 z-40 border-b flex items-center justify-between px-3 md:px-4 py-2 select-none ${
          highContrast
            ? "bg-black border-yellow-400 text-yellow-300"
            : "bg-white border-slate-200 text-slate-800 shadow-sm"
        }`}
      >
        <div className="flex items-center gap-2 md:gap-3">
          {/* Mobile Drawer Toggle */}
          <button
            type="button"
            onClick={() => setMobileDrawerOpen(true)}
            aria-label="Open navigation menu"
            className="md:hidden p-1.5 rounded-md hover:bg-slate-100 text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#004B87]"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Desktop Sidebar Collapse Toggle */}
          <button
            type="button"
            onClick={toggleSidebar}
            title={`Toggle sidebar (Ctrl+B) - Currently ${
              collapsed ? "Collapsed" : "Expanded"
            }`}
            aria-label={`Toggle left sidebar - currently ${
              collapsed ? "collapsed" : "expanded"
            }`}
            className="hidden md:flex items-center justify-center w-8 h-8 rounded-md hover:bg-slate-100 text-slate-600 focus:outline-none focus:ring-2 focus:ring-[#004B87]"
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>

          {/* Emblem & Portal Branding */}
          <Link
            href="/"
            className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#004B87] rounded"
          >
            <div className="w-8 h-8 rounded-full bg-white border border-slate-200 p-0.5 flex items-center justify-center shadow-xs flex-shrink-0">
              <img
                src={`${basePath}/tn-emblem.png`}
                alt="TN Emblem"
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.currentTarget.src = "/tn-emblem.png";
                }}
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xs md:text-sm text-[#004B87] leading-tight">
                {lang === "ta" ? "தமிழ்நாடு அரசு" : "Government of Tamil Nadu"}
              </span>
              <span className="text-[10px] text-slate-500 hidden sm:inline leading-tight">
                {lang === "ta"
                  ? "டிஜிட்டல் பொது சேவை தளம் 2.0"
                  : "Digital Portal 2.0 | GIGW 3.0 Verified"}
              </span>
            </div>
          </Link>
        </div>

        {/* Global Compact Search */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden lg:flex items-center relative w-64 xl:w-80"
          role="search"
        >
          <Search className="w-4 h-4 text-slate-400 absolute left-2.5 pointer-events-none" />
          <input
            type="search"
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
            placeholder={
              lang === "ta"
                ? "சேவைகள், G.O., தொடர்புகள்..."
                : "Search services, G.O., officials..."
            }
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-100 hover:bg-slate-50 focus:bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#004B87] text-slate-800 placeholder-slate-400"
          />
        </form>

        {/* Utility Controls: Workspace, Language, Accessibility */}
        <div className="flex items-center gap-1.5 md:gap-2">
          {/* Workspace Switcher */}
          <div className="flex items-center bg-slate-100 rounded-md p-0.5 border border-slate-200">
            <button
              type="button"
              onClick={() => handleWorkspaceToggle("public")}
              className={`px-2 py-1 text-[11px] font-medium rounded transition-colors ${
                workspace === "public"
                  ? "bg-white text-[#004B87] shadow-xs font-semibold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {lang === "ta" ? "பொதுமக்கள்" : "Citizen"}
            </button>
            <button
              type="button"
              onClick={() => handleWorkspaceToggle("official")}
              className={`px-2 py-1 text-[11px] font-medium rounded transition-colors ${
                workspace === "official"
                  ? "bg-[#004B87] text-white shadow-xs font-semibold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {lang === "ta" ? "அரசு அலுவலர்" : "Official"}
            </button>
          </div>

          {/* Language Toggle (English default per P0) */}
          <div className="flex items-center bg-slate-100 rounded-md p-0.5 border border-slate-200">
            <button
              type="button"
              onClick={() => handleLanguageToggle("en")}
              className={`px-2 py-1 text-[11px] font-bold rounded transition-colors ${
                lang === "en"
                  ? "bg-[#004B87] text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => handleLanguageToggle("ta")}
              className={`px-2 py-1 text-[11px] font-bold rounded transition-colors ${
                lang === "ta"
                  ? "bg-[#004B87] text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              தமிழ்
            </button>
          </div>

          {/* Font Size Adjustments */}
          <div className="hidden sm:flex items-center gap-0.5 bg-slate-100 rounded-md p-0.5 border border-slate-200">
            <button
              type="button"
              onClick={() => setFontScale("normal")}
              title="Standard font size"
              className={`w-6 h-6 flex items-center justify-center text-[11px] font-bold rounded ${
                fontScale === "normal"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              A
            </button>
            <button
              type="button"
              onClick={() => setFontScale("large")}
              title="Larger font size (+10%)"
              className={`w-6 h-6 flex items-center justify-center text-[11px] font-bold rounded ${
                fontScale === "large"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              A+
            </button>
            <button
              type="button"
              onClick={() => setFontScale("xlarge")}
              title="Extra large font size (+20%)"
              className={`w-6 h-6 flex items-center justify-center text-[11px] font-bold rounded ${
                fontScale === "xlarge"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              A++
            </button>
          </div>

          {/* High Contrast Toggle */}
          <button
            type="button"
            onClick={() => setHighContrast(!highContrast)}
            title="Toggle High Contrast Mode"
            aria-label="High contrast toggle"
            className="w-7 h-7 flex items-center justify-center rounded-md text-slate-600 hover:bg-slate-100 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#004B87]"
          >
            {highContrast ? (
              <Sun className="w-3.5 h-3.5 text-yellow-400" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-slate-600" />
            )}
          </button>

          {/* Emergency 1100 Pill */}
          <a
            href="tel:1100"
            className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold rounded-md border border-red-200 transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>1100 CM Helpline</span>
          </a>
        </div>
      </header>

      {/* 2. BODY SHELL: Left Sidebar + Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* DESKTOP COMPACT LEFT SIDEBAR */}
        <aside
          aria-label="Main Navigation"
          className={`hidden md:flex flex-col flex-shrink-0 transition-all duration-200 border-r select-none ${
            collapsed ? "w-[64px]" : "w-[224px]"
          } ${
            highContrast
              ? "bg-black border-yellow-400 text-yellow-300"
              : "bg-white border-slate-200 text-slate-700"
          }`}
        >
          {/* Workspace Indicator Badge */}
          <div
            className={`px-3 py-2 border-b border-slate-100 flex items-center ${
              collapsed ? "justify-center" : "justify-between"
            }`}
          >
            {!collapsed ? (
              <div className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    workspace === "official" ? "bg-amber-500" : "bg-emerald-500"
                  }`}
                />
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  {workspace === "official"
                    ? lang === "ta"
                      ? "அரசு பணியகம்"
                      : "Official Space"
                    : lang === "ta"
                    ? "மக்கள் தளம்"
                    : "Citizen Portal"}
                </span>
              </div>
            ) : (
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  workspace === "official" ? "bg-amber-500" : "bg-emerald-500"
                }`}
                title={workspace === "official" ? "Official" : "Citizen"}
              />
            )}
          </div>

          {/* Navigation Links List */}
          <nav className="flex-1 overflow-y-auto py-2 px-1.5 space-y-1">
            {currentNav.map((item) => {
              const active = isRouteActive(item.href, item.exact);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={collapsed ? (lang === "ta" ? item.label_ta : item.label_en) : undefined}
                  className={`flex items-center rounded-md px-2.5 py-2 text-xs font-medium transition-colors group relative ${
                    active
                      ? highContrast
                        ? "bg-yellow-400 text-black font-bold"
                        : "bg-blue-50 text-[#004B87] font-semibold border-l-4 border-[#004B87]"
                      : highContrast
                      ? "hover:bg-slate-900 text-yellow-200"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  } ${collapsed ? "justify-center" : "gap-3"}`}
                >
                  <Icon
                    className={`w-4 h-4 flex-shrink-0 ${
                      active
                        ? highContrast
                          ? "text-black"
                          : "text-[#004B87]"
                        : "text-slate-400 group-hover:text-slate-600"
                    }`}
                  />
                  {!collapsed && (
                    <span className="flex-1 truncate">
                      {lang === "ta" ? item.label_ta : item.label_en}
                    </span>
                  )}
                  {!collapsed && item.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                        active
                          ? "bg-[#004B87] text-white"
                          : "bg-slate-200 text-slate-700"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Sidebar Footer Info */}
          {!collapsed ? (
            <div className="p-3 border-t border-slate-100 text-[11px] text-slate-400 bg-slate-50/50">
              <p className="font-semibold text-slate-600">
                {lang === "ta" ? "அரசு உதவி எண்" : "Government Helpline"}
              </p>
              <p className="font-mono text-slate-700 font-bold mt-0.5">
                1800-425-1333 / 1100
              </p>
              <p className="text-[10px] text-slate-400 mt-1">
                TNeGA & NIC Standards
              </p>
            </div>
          ) : (
            <div className="p-2 border-t border-slate-100 flex justify-center text-slate-400">
              <HelpCircle className="w-4 h-4" />
            </div>
          )}
        </aside>

        {/* MOBILE SLIDE-OUT DRAWER */}
        {mobileDrawerOpen && (
          <div
            className="fixed inset-0 z-50 md:hidden flex"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation drawer"
          >
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
              onClick={() => setMobileDrawerOpen(false)}
            />
            {/* Drawer Panel */}
            <div className="relative w-72 max-w-[80vw] bg-white h-full flex flex-col z-10 shadow-xl">
              {/* Header */}
              <div className="flex items-center justify-between p-3 border-b border-slate-200 bg-slate-50">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-white border border-slate-200 p-0.5 flex items-center justify-center">
                    <img
                      src={`${basePath}/tn-emblem.png`}
                      alt="TN Emblem"
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.src = "/tn-emblem.png";
                      }}
                    />
                  </div>
                  <span className="font-bold text-sm text-[#004B87]">
                    {lang === "ta" ? "தமிழ்நாடு அரசு 2.0" : "Govt of Tamil Nadu 2.0"}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileDrawerOpen(false)}
                  className="p-1.5 rounded-md hover:bg-slate-200 text-slate-600 focus:outline-none"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Workspace Toggle */}
              <div className="p-3 border-b border-slate-100 bg-slate-50/50">
                <div className="flex items-center bg-slate-200 rounded-md p-0.5">
                  <button
                    type="button"
                    onClick={() => handleWorkspaceToggle("public")}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded ${
                      workspace === "public"
                        ? "bg-white text-[#004B87] shadow-xs"
                        : "text-slate-600"
                    }`}
                  >
                    {lang === "ta" ? "பொதுமக்கள்" : "Citizen"}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleWorkspaceToggle("official")}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded ${
                      workspace === "official"
                        ? "bg-[#004B87] text-white shadow-xs"
                        : "text-slate-600"
                    }`}
                  >
                    {lang === "ta" ? "அரசு பணியகம்" : "Official"}
                  </button>
                </div>
              </div>

              {/* Mobile Search Input */}
              <form onSubmit={handleSearchSubmit} className="p-3 border-b border-slate-100">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
                  <input
                    type="search"
                    value={globalSearch}
                    onChange={(e) => setGlobalSearch(e.target.value)}
                    placeholder={
                      lang === "ta" ? "தேடுக..." : "Search portal..."
                    }
                    className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-100 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#004B87]"
                  />
                </div>
              </form>

              {/* Nav Links */}
              <nav className="flex-1 overflow-y-auto p-2 space-y-1">
                {currentNav.map((item) => {
                  const active = isRouteActive(item.href, item.exact);
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-medium ${
                        active
                          ? "bg-blue-50 text-[#004B87] font-bold border-l-4 border-[#004B87]"
                          : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4 text-slate-500" />
                        <span>{lang === "ta" ? item.label_ta : item.label_en}</span>
                      </div>
                      {item.badge && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded font-bold bg-slate-200 text-slate-700">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>

              {/* Drawer Footer */}
              <div className="p-3 border-t border-slate-200 bg-slate-50 text-xs">
                <a
                  href="tel:1100"
                  className="flex items-center justify-center gap-2 w-full py-2 bg-red-600 text-white font-bold rounded-md"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>{lang === "ta" ? "1100 உதவி எண்" : "Call 1100 Helpline"}</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* 3. MAIN CONTENT CONTAINER (Compact padding, zero excessive whitespace) */}
        <main
          id="main-content"
          role="main"
          className="flex-1 overflow-y-auto flex flex-col focus:outline-none"
        >
          {children}

          {/* Unified Footer */}
          <footer
            role="contentinfo"
            className={`border-t mt-auto px-4 py-6 md:px-6 md:py-8 ${
              highContrast
                ? "bg-black border-yellow-400 text-yellow-300"
                : "bg-slate-900 border-slate-800 text-slate-300"
            }`}
          >
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 text-xs">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-white p-0.5 flex items-center justify-center">
                    <img
                      src={`${basePath}/tn-emblem.png`}
                      alt="TN Emblem"
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.src = "/tn-emblem.png";
                      }}
                    />
                  </div>
                  <span className="font-bold text-sm text-white">
                    {lang === "ta" ? "தமிழ்நாடு அரசு" : "Government of Tamil Nadu"}
                  </span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  {lang === "ta"
                    ? "அதிகாரப்பூர்வ டிஜிட்டல் போர்டல் 2.0. குடிமக்கள் சேவைகள், அரசாணைகள் மற்றும் தொடர்பு வழிகாட்டி."
                    : "Official Digital Gateway of Government of Tamil Nadu. Integrated citizen services, official G.O. repository, and public grievance redressal."}
                </p>
                <p className="text-[10px] text-slate-500">
                  Last Updated: 17 November 2026 | Version 2.0.4-P0
                </p>
              </div>

              <div>
                <h4 className="font-bold text-white mb-2 uppercase tracking-wider text-[11px]">
                  {lang === "ta" ? "முக்கிய சேவைகள்" : "Essential Services"}
                </h4>
                <ul className="space-y-1.5 text-slate-400">
                  <li>
                    <Link href="/services" className="hover:text-white transition-colors">
                      {lang === "ta" ? "சான்றிதழ்கள் (Community / Income)" : "Certificates (Community / Income)"}
                    </Link>
                  </li>
                  <li>
                    <Link href="/services" className="hover:text-white transition-colors">
                      {lang === "ta" ? "நில ஆவணங்கள் (Patta / Chitta)" : "Land Records (Patta / Chitta)"}
                    </Link>
                  </li>
                  <li>
                    <Link href="/schemes" className="hover:text-white transition-colors">
                      {lang === "ta" ? "அரசு நலத்திட்டங்கள் (CMCHIS, Pudhumai Penn)" : "Social Schemes (CMCHIS, Pudhumai Penn)"}
                    </Link>
                  </li>
                  <li>
                    <Link href="/grievances" className="hover:text-white transition-colors">
                      {lang === "ta" ? "முதலமைச்சரின் உதவி மையம் (1100)" : "CM Grievance Redressal (1100)"}
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-white mb-2 uppercase tracking-wider text-[11px]">
                  {lang === "ta" ? "அரசு நிர்வாகம்" : "State Administration"}
                </h4>
                <ul className="space-y-1.5 text-slate-400">
                  <li>
                    <Link href="/contact-directory" className="hover:text-white transition-colors">
                      {lang === "ta" ? "அமைச்சரவை & தலைமைச் செயலகம்" : "Council of Ministers & Secretaries"}
                    </Link>
                  </li>
                  <li>
                    <Link href="/districts" className="hover:text-white transition-colors">
                      {lang === "ta" ? "38 மாவட்ட ஆட்சியர்கள்" : "38 District Collectors"}
                    </Link>
                  </li>
                  <li>
                    <Link href="/documents" className="hover:text-white transition-colors">
                      {lang === "ta" ? "அரசாணைகள் & அரசிதழ்" : "Government Orders & Gazettes"}
                    </Link>
                  </li>
                  <li>
                    <Link href="/performance" className="hover:text-white transition-colors">
                      {lang === "ta" ? "துறைவாரியான செயல்திறன்" : "Department Performance & SLAs"}
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-white mb-2 uppercase tracking-wider text-[11px]">
                  {lang === "ta" ? "அவசர எண்கள்" : "Emergency Numbers"}
                </h4>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="bg-slate-800 p-2 rounded border border-slate-700">
                    <span className="text-slate-400 block">CM Helpline</span>
                    <span className="font-bold text-white text-sm">1100</span>
                  </div>
                  <div className="bg-slate-800 p-2 rounded border border-slate-700">
                    <span className="text-slate-400 block">Police</span>
                    <span className="font-bold text-white text-sm">100 / 112</span>
                  </div>
                  <div className="bg-slate-800 p-2 rounded border border-slate-700">
                    <span className="text-slate-400 block">Fire & Rescue</span>
                    <span className="font-bold text-white text-sm">101</span>
                  </div>
                  <div className="bg-slate-800 p-2 rounded border border-slate-700">
                    <span className="text-slate-400 block">Ambulance</span>
                    <span className="font-bold text-white text-sm">108</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="max-w-7xl mx-auto mt-6 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
              <p>
                © 2026 Government of Tamil Nadu. All Rights Reserved. Designed & Developed per GIGW 3.0 & WCAG 2.2 AAA Guidelines.
              </p>
              <div className="flex items-center gap-3">
                <Link href="/about" className="hover:text-slate-300">Privacy Policy</Link>
                <span>•</span>
                <Link href="/about" className="hover:text-slate-300">Terms of Use</Link>
                <span>•</span>
                <Link href="/about" className="hover:text-slate-300">Accessibility Statement</Link>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
