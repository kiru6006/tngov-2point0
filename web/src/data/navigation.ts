/**
 * Consolidated Centralized Navigation & Master Data Configuration for Tamil Nadu Government Portal 2.0
 * Modernized based on AP + Telangana + UP benchmarks:
 * - 8 Canonical Primary Nav Items with 14-Category Citizen Services Mega Menu
 * - Inline Service Action Panel (AP Pattern)
 * - Three Constitutional Pillars: Executive, Legislature, Judiciary (Telangana Pattern)
 * - Life Situations & Emergency Helplines (UP Pattern)
 * - GIGW 3.0 & WCAG 2.2 AAA Accessibility
 */

export interface NavLinkItem {
  id: string;
  title_en: string;
  title_ta: string;
  href: string;
  description_en?: string;
  description_ta?: string;
  badge_en?: string;
  badge_ta?: string;
  isExternal?: boolean;
}

export interface NavCategoryGroup {
  group_id: string;
  group_title_en: string;
  group_title_ta: string;
  items: NavLinkItem[];
}

export interface PrimaryNavSection {
  id: string;
  label_en: string;
  label_ta: string;
  href: string;
  groups?: NavCategoryGroup[];
}

export interface QuickAccessItem {
  id: string;
  title_en: string;
  title_ta: string;
  href: string;
  iconName: string;
  isExternal?: boolean;
}

// 1. Layer D: Quick Access Action Items
export const QUICK_ACCESS_ITEMS: QuickAccessItem[] = [
  {
    id: "qa-cert",
    title_en: "Certificates",
    title_ta: "சான்றிதழ்கள்",
    href: "/services/certificates",
    iconName: "FileText",
  },
  {
    id: "qa-land",
    title_en: "Land Records",
    title_ta: "நில ஆவணங்கள் / பட்டா",
    href: "/services/land",
    iconName: "MapPin",
  },
  {
    id: "qa-scholarships",
    title_en: "Scholarships",
    title_ta: "கல்வி உதவித்தொகை",
    href: "/schemes",
    iconName: "GraduationCap",
  },
  {
    id: "qa-employment",
    title_en: "Employment",
    title_ta: "வேலைவாய்ப்பு",
    href: "/services/certificates",
    iconName: "Briefcase",
  },
  {
    id: "qa-pensions",
    title_en: "Pensions",
    title_ta: "ஓய்வூதியங்கள்",
    href: "/schemes",
    iconName: "Award",
  },
  {
    id: "qa-grievances",
    title_en: "Grievances",
    title_ta: "குறைதீர்ப்பு (1100)",
    href: "#emergency-help",
    iconName: "PhoneCall",
  },
  {
    id: "qa-gos",
    title_en: "Government Orders",
    title_ta: "அரசாணைகள் (G.O.)",
    href: "/documents",
    iconName: "FileCheck2",
  },
  {
    id: "qa-helplines",
    title_en: "Helplines",
    title_ta: "அவசர எண்கள்",
    href: "#emergency-help",
    iconName: "Building2",
  },
];

// 2. Layer C: Desktop Primary Navigation (8 Canonical Items per Benchmark Section 4)
export const PRIMARY_NAVIGATION: PrimaryNavSection[] = [
  {
    id: "nav-home",
    label_en: "Home",
    label_ta: "முகப்பு",
    href: "/",
  },
  {
    id: "nav-services",
    label_en: "Citizen Services",
    label_ta: "பொதுமக்கள் சேவைகள்",
    href: "/services",
    groups: [
      {
        group_id: "grp-cert-land",
        group_title_en: "Certificates, Land & Property",
        group_title_ta: "சான்றிதழ்கள் & நிலம்",
        items: [
          { id: "srv-comm", title_en: "Community Certificate", title_ta: "சாதிச் சான்றிதழ்", href: "/services/certificates", description_en: "15 Days SLA proof of caste" },
          { id: "srv-inc", title_en: "Income Certificate", title_ta: "வருமானச் சான்றிதழ்", href: "/services/certificates", description_en: "Annual income proof" },
          { id: "srv-patta", title_en: "Patta / Chitta Transfer", title_ta: "பட்டா மாறுதல் / சிட்டா", href: "/services/land", description_en: "Land records online transfer" },
          { id: "srv-ec", title_en: "Encumbrance Certificate (EC)", title_ta: "வில்லங்கச் சான்று", href: "/services/land", description_en: "TNREGINET registration search" },
        ],
      },
      {
        group_id: "grp-edu-emp",
        group_title_en: "Education & Employment",
        group_title_ta: "கல்வி & வேலைவாய்ப்பு",
        items: [
          { id: "srv-sch", title_en: "Scholarships Portal", title_ta: "கல்வி உதவித்தொகை", href: "/schemes", description_en: "Pre/Post matric assistance" },
          { id: "srv-emp", title_en: "Employment Exchange", title_ta: "வேலைவாய்ப்பு பதிவு", href: "/services/certificates", description_en: "Renew employment card" },
          { id: "srv-tnpsc", title_en: "TNPSC Direct Recruitment", title_ta: "டிஎன்பிஎஸ்சி தேர்வுகள்", href: "/documents", description_en: "Group I, II, IV notices" },
        ],
      },
      {
        group_id: "grp-health-util",
        group_title_en: "Health, Utilities & Transport",
        group_title_ta: "சுகாதாரம் & பொதுப் பயன்பாடுகள்",
        items: [
          { id: "srv-cmchis", title_en: "CMCHIS Health Insurance", title_ta: "முதலமைச்சர் மருத்துவக் காப்பீடு", href: "/schemes", description_en: "₹5 Lakhs cashless health coverage" },
          { id: "srv-tneb", title_en: "Electricity Bill (TANGEDCO)", title_ta: "மின் கட்டண செலுத்துதல்", href: "https://www.tnebnet.org/", isExternal: true },
          { id: "srv-dl", title_en: "Driving Licence (Parivahan)", title_ta: "ஓட்டுநர் உரிமம் (LLR)", href: "https://parivahan.gov.in/", isExternal: true },
        ],
      },
      {
        group_id: "grp-biz-welf",
        group_title_en: "Business, Housing & Welfare",
        group_title_ta: "தொழில், வீட்டுவசதி & நலம்",
        items: [
          { id: "srv-guidance", title_en: "Guidance Single Window", title_ta: "தொழில் ஒற்றைச் சாளர அனுமதி", href: "https://easybusiness.tn.gov.in/", isExternal: true },
          { id: "srv-tnhb", title_en: "Housing Board & TN-RERA", title_ta: "வீட்டுவசதி வாரியம் & ரெரா", href: "/services" },
          { id: "srv-kmu", title_en: "Kalaignar Magalir Urimai", title_ta: "கலைஞர் மகளிர் உரிமைத் திட்டம்", href: "/schemes" },
        ],
      },
    ],
  },
  {
    id: "nav-schemes",
    label_en: "Schemes & Benefits",
    label_ta: "அரசு நலத்திட்டங்கள்",
    href: "/schemes",
    groups: [
      {
        group_id: "grp-sch-all",
        group_title_en: "Target Beneficiaries",
        group_title_ta: "பயனாளிகள் பிரிவு",
        items: [
          { id: "sch-women", title_en: "Women & Families", title_ta: "பெண்கள் & குடும்பங்கள்", href: "/schemes#women", description_en: "₹1,000 monthly entitlement & marriage aid" },
          { id: "sch-farmers", title_en: "Farmers & Agriculture", title_ta: "விவசாயிகள்", href: "/schemes#farmers", description_en: "Free power, crop insurance, subsidies" },
          { id: "sch-students", title_en: "Students & Youth", title_ta: "மாணவர்கள் & இளைஞர்கள்", href: "/schemes#students", description_en: "Pudhumai Penn, Tamil Pudhalvan DBT" },
          { id: "sch-seniors", title_en: "Senior Citizens & PwD", title_ta: "முதியோர் & மாற்றுத்திறனாளிகள்", href: "/schemes#seniors", description_en: "Monthly pension & assistive devices" },
        ],
      },
    ],
  },
  {
    id: "nav-government",
    label_en: "Government",
    label_ta: "அரசு நிர்வாகம்",
    href: "/departments",
    groups: [
      {
        group_id: "grp-constitutional-pillars",
        group_title_en: "Three Constitutional Pillars",
        group_title_ta: "மூன்று அரசியலமைப்புத் தூண்கள்",
        items: [
          { id: "gov-exec", title_en: "Executive (Governor, CM & Council)", title_ta: "செயலாட்சி (ஆளுநர், முதல்வர் & அமைச்சரவை)", href: "/departments#executive" },
          { id: "gov-leg", title_en: "Legislature (TN Legislative Assembly)", title_ta: "சட்டப்பேரவை (சட்டமன்றம் & உறுப்பினர்கள்)", href: "/departments#legislature" },
          { id: "gov-jud", title_en: "Judiciary (Madras High Court)", title_ta: "நீதித்துறை (சென்னை உயர் நீதிமன்றம்)", href: "/departments#judiciary" },
          { id: "gov-sec", title_en: "Secretariat & Chief Secretary", title_ta: "தலைமைச் செயலகம் & தலைமைச் செயலாளர்", href: "/departments#secretariat" },
        ],
      },
    ],
  },
  {
    id: "nav-dept-dist",
    label_en: "Departments & Districts",
    label_ta: "துறைகள் & மாவட்டங்கள்",
    href: "/districts",
    groups: [
      {
        group_id: "grp-depts",
        group_title_en: "Administration",
        group_title_ta: "நிர்வாகப் பிரிவுகள்",
        items: [
          { id: "nav-45depts", title_en: "All 45 Secretariat Departments", title_ta: "அனைத்து 45 தலைமைச் செயலகத் துறைகள்", href: "/departments" },
          { id: "nav-38dist", title_en: "All 38 District Collectorates", title_ta: "அனைத்து 38 மாவட்ட ஆட்சியரகங்கள்", href: "/districts" },
          { id: "nav-hods", title_en: "Heads of Departments (Directorates)", title_ta: "துறைத் தலைவர்கள் & இயக்குநரகங்கள்", href: "/contact-directory?role=hod" },
        ],
      },
    ],
  },
  {
    id: "nav-contacts",
    label_en: "Contact Directory",
    label_ta: "அரசு தொடர்பு கையேடு",
    href: "/contact-directory",
    groups: [
      {
        group_id: "grp-dir-search",
        group_title_en: "Verified Government Directory",
        group_title_ta: "சரிபார்க்கப்பட்ட தொலைபேசி கையேடு",
        items: [
          { id: "dir-min", title_en: "Council of Ministers", title_ta: "அமைச்சரவை தொடர்புகள்", href: "/contact-directory?role=minister" },
          { id: "dir-sec", title_en: "Secretaries to Government", title_ta: "அரசுச் செயலாளர்கள்", href: "/contact-directory?role=secretary" },
          { id: "dir-col", title_en: "38 District Collectors", title_ta: "38 மாவட்ட ஆட்சியர்கள்", href: "/contact-directory?designation=Collector" },
          { id: "dir-rti", title_en: "RTI Information Officers", title_ta: "RTI தகவல் அலுவலர்கள்", href: "/contact-directory?role=rti" },
          { id: "dir-grv", title_en: "Grievance Redressal Officers", title_ta: "குறைதீர்க்கும் அலுவலர்கள்", href: "/contact-directory?role=grievance" },
        ],
      },
    ],
  },
  {
    id: "nav-documents",
    label_en: "Government Documents",
    label_ta: "அரசு ஆவணங்கள்",
    href: "/documents",
    groups: [
      {
        group_id: "grp-docs-all",
        group_title_en: "Orders, Gazettes & Tenders",
        group_title_ta: "அரசாணைகள் & அரசிதழ்கள்",
        items: [
          { id: "doc-gos", title_en: "Government Orders (G.O.s)", title_ta: "அரசாணைகள் (G.O.)", href: "/documents" },
          { id: "doc-gaz", title_en: "Government Gazette", title_ta: "அரசு அரசிதழ்", href: "/documents" },
          { id: "doc-pol", title_en: "Policy Notes & State Budget", title_ta: "கொள்கை விளக்கக் குறிப்புகள் & பட்ஜெட்", href: "/documents" },
          { id: "doc-tnd", title_en: "Tenders (TNTenders)", title_ta: "ஒப்பந்தப்புள்ளிகள்", href: "https://tntenders.gov.in/", isExternal: true },
        ],
      },
    ],
  },
  {
    id: "nav-more",
    label_en: "More",
    label_ta: "கூடுதல் தகவல்கள்",
    href: "/more",
    groups: [
      {
        group_id: "grp-more-items",
        group_title_en: "State Portals & Support",
        group_title_ta: "மாநில போர்ட்டல்கள் & ஆதரவு",
        items: [
          { id: "more-about", title_en: "About Tamil Nadu", title_ta: "தமிழ்நாடு பற்றி", href: "/about" },
          { id: "more-tourism", title_en: "Tourism & Heritage (TTDC)", title_ta: "சுற்றுலா & கலாச்சாரம்", href: "#tourism" },
          { id: "more-investment", title_en: "Invest in Tamil Nadu", title_ta: "முதலீடுகள் (Guidance)", href: "https://easybusiness.tn.gov.in/", isExternal: true },
          { id: "more-egov", title_en: "e-Governance Projects (TNeGA)", title_ta: "மின்-ஆளுமைத் திட்டங்கள்", href: "#egov-portals" },
          { id: "more-help", title_en: "Emergency & Grievances (1100)", title_ta: "அவசர உதவி & குறைதீர்ப்பு (1100)", href: "#emergency-help" },
        ],
      },
    ],
  },
];

// 3. Section 4: 12 Popular Services (Quick Access Services)
export const MOST_USED_SERVICES = [
  { id: "mus-comm", title_en: "Community Certificate", title_ta: "சாதிச் சான்றிதழ்", dept_en: "Revenue Department", dept_ta: "வருவாய்த் துறை", href: "/services/certificates", sla_en: "15 Days", sla_ta: "15 நாட்கள்", fee_en: "₹60 (e-Sevai)", fee_ta: "₹60 (இ-சேவை)", icon: "FileText" },
  { id: "mus-inc", title_en: "Income Certificate", title_ta: "வருமானச் சான்றிதழ்", dept_en: "Revenue Department", dept_ta: "வருவாய்த் துறை", href: "/services/certificates", sla_en: "15 Days", sla_ta: "15 நாட்கள்", fee_en: "₹60 (e-Sevai)", fee_ta: "₹60 (இ-சேவை)", icon: "FileText" },
  { id: "mus-patta", title_en: "Patta / Chitta Transfer", title_ta: "பட்டா மாறுதல் / சிட்டா", dept_en: "Survey & Settlement", dept_ta: "நில அளவைத் துறை", href: "/services/land", sla_en: "30 Days", sla_ta: "30 நாட்கள்", fee_en: "₹60 (e-Sevai)", fee_ta: "₹60 (இ-சேவை)", icon: "MapPin" },
  { id: "mus-ration", title_en: "Smart Ration Card Services", title_ta: "மின்னணு குடும்ப அட்டை", dept_en: "Civil Supplies", dept_ta: "உணவுப் பொருள் வழங்கல்", href: "https://www.tnpds.gov.in/", sla_en: "15 Days", sla_ta: "15 நாட்கள்", fee_en: "Free", fee_ta: "இலவசம்", icon: "Building2" },
  { id: "mus-ec", title_en: "Encumbrance Certificate (EC)", title_ta: "வில்லங்கச் சான்று (EC)", dept_en: "Registration Department", dept_ta: "பதிவுத்துறை", href: "/services/land", sla_en: "Instant Online", sla_ta: "உடனடி பதிவிறக்கம்", fee_en: "Statutory", fee_ta: "அரசு கட்டணம்", icon: "FileCheck2" },
  { id: "mus-birth", title_en: "Birth / Death Certificate", title_ta: "பிறப்பு / இறப்பு சான்றிதழ்", dept_en: "Municipal Administration", dept_ta: "நகராட்சி நிர்வாகம்", href: "/services/certificates", sla_en: "7 Days", sla_ta: "7 நாட்கள்", fee_en: "Free", fee_ta: "இலவசம்", icon: "FileText" },
  { id: "mus-kmu", title_en: "Kalaignar Magalir Urimai", title_ta: "கலைஞர் மகளிர் உரிமைத் திட்டம்", dept_en: "Special Programme Impl.", dept_ta: "சிறப்புத் திட்ட செயலாக்கம்", href: "/schemes", sla_en: "Monthly DBT", sla_ta: "மாதாந்திர வங்கி வரவு", fee_en: "₹1,000/mo", fee_ta: "மாதம் ₹1,000", icon: "Award" },
  { id: "mus-pudhumai", title_en: "Pudhumai Penn Scheme", title_ta: "புதுமைப் பெண் திட்டம்", dept_en: "Higher Education", dept_ta: "உயர்கல்வித் துறை", href: "/schemes", sla_en: "College DBT", sla_ta: "கல்லூரி உதவித்தொகை", fee_en: "₹1,000/mo", fee_ta: "மாதம் ₹1,000", icon: "GraduationCap" },
  { id: "mus-oap", title_en: "Old Age Pension (OAP)", title_ta: "முதியோர் ஓய்வூதியம்", dept_en: "Social Security Schemes", dept_ta: "சமூகப் பாதுகாப்பு", href: "/schemes", sla_en: "Monthly DBT", sla_ta: "மாதாந்திர ஓய்வூதியம்", fee_en: "₹1,200/mo", fee_ta: "மாதம் ₹1,200", icon: "Award" },
  { id: "mus-tneb", title_en: "Electricity Bill (TANGEDCO)", title_ta: "மின் கட்டண செலுத்துதல்", dept_en: "Energy Department", dept_ta: "மின்சாரத் துறை", href: "https://www.tnebnet.org/", sla_en: "Instant", sla_ta: "உடனடி", fee_en: "As per Bill", fee_ta: "கட்டண விவரப்படி", icon: "Building2" },
  { id: "mus-dl", title_en: "Driving Licence / LLR", title_ta: "ஓட்டுநர் உரிமம் (LLR)", dept_en: "Transport Department", dept_ta: "போக்குவரத்துத் துறை", href: "https://parivahan.gov.in/", sla_en: "3 Days", sla_ta: "3 நாட்கள்", fee_en: "Statutory", fee_ta: "அரசு கட்டணம்", icon: "Briefcase" },
  { id: "mus-go", title_en: "Government Orders (G.O.)", title_ta: "அரசாணை தேடல் (G.O.)", dept_en: "Secretariat Departments", dept_ta: "தலைமைச் செயலகத் துறைகள்", href: "/documents", sla_en: "Downloadable", sla_ta: "பதிவிறக்கம்", fee_en: "Free Access", fee_ta: "கட்டணமில்லை", icon: "FileCheck2" },
];

// 4. Section 6: INLINE SERVICE DISCOVERY ACTION PANEL (AP BENCHMARK INNOVATION)
// 14 Canonical Service Categories with immediate service actions, SLAs, fees, and tracking
export interface InlineServiceItem {
  id: string;
  name_en: string;
  name_ta: string;
  sla_en: string;
  sla_ta: string;
  fee_en: string;
  fee_ta: string;
  dept_en: string;
  dept_ta: string;
  detail_url: string;
  apply_url: string;
  track_url?: string;
  isExternal?: boolean;
}

export interface InlineServiceCategory {
  id: string;
  label_en: string;
  label_ta: string;
  iconName: string;
  services: InlineServiceItem[];
}

export const INLINE_SERVICE_CATEGORIES: InlineServiceCategory[] = [
  {
    id: "cat-cert",
    label_en: "1. Certificates",
    label_ta: "1. சான்றிதழ்கள்",
    iconName: "FileText",
    services: [
      { id: "s-comm", name_en: "Community Certificate (SC/ST/OBC/BC)", name_ta: "சாதிச் சான்றிதழ்", sla_en: "15 Days", sla_ta: "15 நாட்கள்", fee_en: "₹60", fee_ta: "₹60", dept_en: "Revenue Department", dept_ta: "வருவாய்த் துறை", detail_url: "/services/certificates", apply_url: "https://www.tnesevai.tn.gov.in/", track_url: "https://edistricts.tn.gov.in:8443/certificates/" },
      { id: "s-inc", name_en: "Income Certificate (Annual Earning Proof)", name_ta: "வருமானச் சான்றிதழ்", sla_en: "15 Days", sla_ta: "15 நாட்கள்", fee_en: "₹60", fee_ta: "₹60", dept_en: "Revenue Department", dept_ta: "வருவாய்த் துறை", detail_url: "/services/certificates", apply_url: "https://www.tnesevai.tn.gov.in/", track_url: "https://edistricts.tn.gov.in:8443/certificates/" },
      { id: "s-nat", name_en: "Nativity / Domicile Certificate", name_ta: "இருப்பிடச் சான்றிதழ்", sla_en: "15 Days", sla_ta: "15 நாட்கள்", fee_en: "₹60", fee_ta: "₹60", dept_en: "Revenue Department", dept_ta: "வருவாய்த் துறை", detail_url: "/services/certificates", apply_url: "https://www.tnesevai.tn.gov.in/", track_url: "https://edistricts.tn.gov.in:8443/certificates/" },
      { id: "s-heir", name_en: "Legal Heir Certificate", name_ta: "வாரிசுச் சான்றிதழ்", sla_en: "21 Days", sla_ta: "21 நாட்கள்", fee_en: "₹60", fee_ta: "₹60", dept_en: "Revenue Department", dept_ta: "வருவாய்த் துறை", detail_url: "/services/certificates", apply_url: "https://www.tnesevai.tn.gov.in/", track_url: "https://edistricts.tn.gov.in:8443/certificates/" },
      { id: "s-bd", name_en: "Birth & Death Registration Extract", name_ta: "பிறப்பு & இறப்பு சான்றிதழ்", sla_en: "7 Days", sla_ta: "7 நாட்கள்", fee_en: "Free", fee_ta: "இலவசம்", dept_en: "Municipal Administration", dept_ta: "நகராட்சி நிர்வாகம்", detail_url: "/services/certificates", apply_url: "https://crstn.org/birth_death_tn/", track_url: "https://crstn.org/birth_death_tn/" },
    ],
  },
  {
    id: "cat-land",
    label_en: "2. Land and Property",
    label_ta: "2. நிலம் & சொத்து",
    iconName: "MapPin",
    services: [
      { id: "s-patta", name_en: "View Patta / Chitta & FMB Sketch", name_ta: "பட்டா / சிட்டா பார்வையிடுதல்", sla_en: "Instant PDF", sla_ta: "உடனடி பிடிஎஃப்", fee_en: "Free", fee_ta: "இலவசம்", dept_en: "Survey & Settlement", dept_ta: "நில அளவைத் துறை", detail_url: "/services/land", apply_url: "https://eservices.tn.gov.in/", track_url: "https://eservices.tn.gov.in/" },
      { id: "s-trans", name_en: "Application for Patta Transfer (e-Services)", name_ta: "பட்டா மாறுதல் இணையவழி விண்ணப்பம்", sla_en: "30 Days", sla_ta: "30 நாட்கள்", fee_en: "₹60-460", fee_ta: "₹60-460", dept_en: "Revenue Administration", dept_ta: "வருவாய் நிர்வாகம்", detail_url: "/services/land", apply_url: "https://eservices.tn.gov.in/", track_url: "https://eservices.tn.gov.in/" },
      { id: "s-ec", name_en: "Encumbrance Certificate (TNREGINET EC)", name_ta: "வில்லங்கச் சான்று (EC)", sla_en: "Instant Download", sla_ta: "உடனடி பதிவிறக்கம்", fee_en: "Statutory", fee_ta: "அரசு கட்டணம்", dept_en: "Registration Department", dept_ta: "பதிவுத்துறை", detail_url: "/services/land", apply_url: "https://tnreginet.gov.in/", track_url: "https://tnreginet.gov.in/" },
      { id: "s-guide", name_en: "Guideline Value Street-Level Search", name_ta: "வழிகாட்டி மதிப்பு தேடல்", sla_en: "Instant", sla_ta: "உடனடி", fee_en: "Free", fee_ta: "இலவசம்", dept_en: "Registration Department", dept_ta: "பதிவுத்துறை", detail_url: "/services/land", apply_url: "https://tnreginet.gov.in/" },
    ],
  },
  {
    id: "cat-edu",
    label_en: "3. Education",
    label_ta: "3. கல்வி",
    iconName: "GraduationCap",
    services: [
      { id: "s-pudhumai", name_en: "Pudhumai Penn Scheme (Higher Education)", name_ta: "புதுமைப் பெண் திட்டம்", sla_en: "Monthly DBT", sla_ta: "மாதாந்திர உதவி", fee_en: "₹1,000/mo", fee_ta: "மாதம் ₹1,000", dept_en: "Higher Education", dept_ta: "உயர்கல்வித் துறை", detail_url: "/services/education", apply_url: "https://www.pudhumaipenn.tn.gov.in/" },
      { id: "s-pudhalvan", name_en: "Tamil Pudhalvan Thittam (College Boys)", name_ta: "தமிழ்ப் புதல்வன் திட்டம்", sla_en: "Monthly DBT", sla_ta: "மாதாந்திர உதவி", fee_en: "₹1,000/mo", fee_ta: "மாதம் ₹1,000", dept_en: "Social Welfare", dept_ta: "சமூக நலத்துறை", detail_url: "/services/education", apply_url: "https://www.pudhumaipenn.tn.gov.in/" },
      { id: "s-emis", name_en: "School Education EMIS Portal Access", name_ta: "பள்ளி மாணவர் EMIS தளம்", sla_en: "Online Portal", sla_ta: "இணைய தளம்", fee_en: "Free", fee_ta: "இலவசம்", dept_en: "School Education", dept_ta: "பள்ளிக் கல்வித்துறை", detail_url: "/services/education", apply_url: "https://emis.tnschools.gov.in/", isExternal: true },
    ],
  },
  {
    id: "cat-emp",
    label_en: "4. Employment",
    label_ta: "4. வேலைவாய்ப்பு",
    iconName: "Briefcase",
    services: [
      { id: "s-exreg", name_en: "Employment Exchange Registration / Renewal", name_ta: "வேலைவாய்ப்பு பதிவு & புதுப்பித்தல்", sla_en: "Instant Card", sla_ta: "உடனடி அட்டை", fee_en: "Free", fee_ta: "இலவசம்", dept_en: "Employment & Training", dept_ta: "வேலைவாய்ப்புத் துறை", detail_url: "/services/certificates", apply_url: "https://tnvelaivaaippu.gov.in/" },
      { id: "s-naan", name_en: "Naan Mudhalvan Youth Skill Platform", name_ta: "நான் முதல்வன் திறன் தளம்", sla_en: "Direct Enrolment", sla_ta: "நேரடிப் பயிற்சி", fee_en: "Free Courses", fee_ta: "இலவசப் பயிற்சிகள்", dept_en: "TNSDC", dept_ta: "திறன் மேம்பாட்டுக் கழகம்", detail_url: "/services/certificates", apply_url: "https://www.naanmudhalvan.tn.gov.in/", isExternal: true },
      { id: "s-tnpsc", name_en: "TNPSC Direct Recruitment Notifications", name_ta: "டிஎன்பிஎஸ்சி தேர்வு அறிவிப்புகள்", sla_en: "Calendar Based", sla_ta: "அட்டவணைப்படி", fee_en: "Exam Specific", fee_ta: "தேர்வு கட்டணம்", dept_en: "TNPSC", dept_ta: "டிஎன்பிஎஸ்சி", detail_url: "/documents", apply_url: "https://www.tnpsc.gov.in/", isExternal: true },
    ],
  },
  {
    id: "cat-health",
    label_en: "5. Health",
    label_ta: "5. சுகாதாரம்",
    iconName: "Building2",
    services: [
      { id: "s-cmchis", name_en: "Chief Minister's Comprehensive Health Insurance", name_ta: "முதலமைச்சர் விரிவான காப்பீடு", sla_en: "₹5 Lakhs/yr", sla_ta: "ஆண்டுக்கு ₹5 லட்சம்", fee_en: "Free for Eligible", fee_ta: "இலவசம்", dept_en: "Health & Family Welfare", dept_ta: "மக்கள் நல்வாழ்வுத்துறை", detail_url: "/schemes", apply_url: "https://www.cmchistn.com/" },
      { id: "s-makkal", name_en: "Makkalai Thedi Maruthuvam Doorstep Care", name_ta: "மக்களைத் தேடி மருத்துவம்", sla_en: "At Home", sla_ta: "வீட்டு வாசலில்", fee_en: "Free", fee_ta: "இலவசம்", dept_en: "Public Health", dept_ta: "பொது சுகாதாரத்துறை", detail_url: "/schemes", apply_url: "https://stopdiarrhea.tn.gov.in/" },
    ],
  },
  {
    id: "cat-agri",
    label_en: "6. Agriculture",
    label_ta: "6. வேளாண்மை",
    iconName: "Building2",
    services: [
      { id: "s-uzhavan", name_en: "Uzhavan App Integrated Farmer Services", name_ta: "உழவன் செயலி அரசு சேவைகள்", sla_en: "Direct Access", sla_ta: "நேரடி சேவை", fee_en: "Free", fee_ta: "இலவசம்", dept_en: "Agriculture Department", dept_ta: "வேளாண்மைத் துறை", detail_url: "/services/agriculture", apply_url: "https://agritech.tnau.ac.in/" },
      { id: "s-pmfby", name_en: "Crop Insurance Scheme (PMFBY)", name_ta: "பயிர் காப்பீட்டுத் திட்டம்", sla_en: "Crop Cycle", sla_ta: "பயிர் பருவம்", fee_en: "Subsidized Premium", fee_ta: "மானிய பிரீமியம்", dept_en: "Agriculture Department", dept_ta: "வேளாண்மைத் துறை", detail_url: "/services/agriculture", apply_url: "https://agritech.tnau.ac.in/" },
    ],
  },
  {
    id: "cat-util",
    label_en: "7. Electricity & Utilities",
    label_ta: "7. மின்சாரம் & பயன்பாடுகள்",
    iconName: "FileCheck2",
    services: [
      { id: "s-tneb", name_en: "TANGEDCO Electricity Bill Payment", name_ta: "மின் கட்டணம் செலுத்துதல்", sla_en: "Instant Receipt", sla_ta: "உடனடி ரசீது", fee_en: "As per Bill", fee_ta: "பில் கட்டணம்", dept_en: "Energy Department", dept_ta: "மின்சாரத் துறை", detail_url: "/services", apply_url: "https://www.tnebnet.org/", isExternal: true },
      { id: "s-water", name_en: "Metro Water & Sewerage Tax Payment", name_ta: "குடிநீர் & கழிவுநீர் வரி", sla_en: "Online Portal", sla_ta: "இணைய தளம்", fee_en: "Tax Specific", fee_ta: "வரி விவரப்படி", dept_en: "Municipal Administration", dept_ta: "நகராட்சி நிர்வாகம்", detail_url: "/services", apply_url: "https://chennaimetrowater.tn.gov.in/", isExternal: true },
    ],
  },
  {
    id: "cat-trans",
    label_en: "8. Transport",
    label_ta: "8. போக்குவரத்து",
    iconName: "Briefcase",
    services: [
      { id: "s-llr", name_en: "Learner's Licence (LLR) Online Application", name_ta: "பழகுநர் உரிமம் (LLR)", sla_en: "Aadhaar e-KYC", sla_ta: "உடனடி அனுமதி", fee_en: "Statutory", fee_ta: "அரசு கட்டணம்", dept_en: "Transport Department", dept_ta: "போக்குவரத்துத் துறை", detail_url: "/services", apply_url: "https://parivahan.gov.in/", isExternal: true },
      { id: "s-bus", name_en: "TNSTC Government Bus Online Reservation", name_ta: "அரசுப் பேருந்து முன்பதிவு", sla_en: "Instant Ticket", sla_ta: "உடனடி பயணச்சீட்டு", fee_en: "Fare Specific", fee_ta: "கட்டணப்படி", dept_en: "Transport Department", dept_ta: "போக்குவரத்துத் துறை", detail_url: "/services", apply_url: "https://www.tnstc.in/", isExternal: true },
    ],
  },
  {
    id: "cat-house",
    label_en: "9. Housing",
    label_ta: "9. வீட்டுவசதி",
    iconName: "Building2",
    services: [
      { id: "s-tnhb", name_en: "Tamil Nadu Housing Board (TNHB) Allotments", name_ta: "வீட்டுவசதி வாரிய மனை ஒதுக்கீடு", sla_en: "Scheme Based", sla_ta: "திட்டப்படி", fee_en: "EMD / Allotment", fee_ta: "ஒதுக்கீட்டுக் கட்டணம்", dept_en: "Housing Department", dept_ta: "வீட்டுவசதித் துறை", detail_url: "/services", apply_url: "https://www.tnhb.tn.gov.in/", isExternal: true },
      { id: "s-rera", name_en: "TN-RERA Registered Projects Verification", name_ta: "ரெரா அங்கீகரிக்கப்பட்ட திட்டங்கள்", sla_en: "Public Directory", sla_ta: "பொதுத் தகவல்", fee_en: "Free", fee_ta: "இலவசம்", dept_en: "Housing Department", dept_ta: "வீட்டுவசதித் துறை", detail_url: "/services", apply_url: "https://rera.tn.gov.in/", isExternal: true },
    ],
  },
  {
    id: "cat-biz",
    label_en: "10. Business & Industry",
    label_ta: "10. தொழில் & வணிகம்",
    iconName: "Award",
    services: [
      { id: "s-guidance", name_en: "Guidance Single Window 2.0 Clearances", name_ta: "வழிகாட்டி ஒற்றைச் சாளர அனுமதி", sla_en: "30 Days Deemed", sla_ta: "30 நாட்கள்", fee_en: "Statutory", fee_ta: "அரசு கட்டணம்", dept_en: "Industries Department", dept_ta: "தொழில்துறை", detail_url: "/services/business", apply_url: "https://easybusiness.tn.gov.in/", isExternal: true },
      { id: "s-msme", name_en: "MSME Capital Subsidy & Schemes", name_ta: "சிறு குறு தொழில் மானியம்", sla_en: "Sanction SLA", sla_ta: "மானியம்", fee_en: "Free", fee_ta: "இலவசம்", dept_en: "MSME Department", dept_ta: "சிறு குறு தொழில்துறை", detail_url: "/services/business", apply_url: "https://msmeonline.tn.gov.in/" },
    ],
  },
  {
    id: "cat-welf",
    label_en: "11. Social Welfare",
    label_ta: "11. சமூக நலம்",
    iconName: "Award",
    services: [
      { id: "s-kmu", name_en: "Kalaignar Magalir Urimai Thittam", name_ta: "கலைஞர் மகளிர் உரிமைத் தொகை", sla_en: "Monthly DBT", sla_ta: "மாதாந்திர வங்கி வரவு", fee_en: "₹1,000/mo", fee_ta: "மாதம் ₹1,000", dept_en: "Special Programme Impl.", dept_ta: "சிறப்புத் திட்ட செயலாக்கம்", detail_url: "/services/social-welfare", apply_url: "/schemes" },
      { id: "s-oap", name_en: "Old Age Pension (OAP) Destitute Aid", name_ta: "முதியோர் ஓய்வூதியம்", sla_en: "21 Days", sla_ta: "21 நாட்கள்", fee_en: "₹1,200/mo", fee_ta: "மாதம் ₹1,200", dept_en: "Social Security Schemes", dept_ta: "சமூகப் பாதுகாப்பு", detail_url: "/services/social-welfare", apply_url: "/schemes" },
    ],
  },
  {
    id: "cat-safety",
    label_en: "12. Public Safety",
    label_ta: "12. பொதுப் பாதுகாப்பு",
    iconName: "PhoneCall",
    services: [
      { id: "s-cctns", name_en: "Tamil Nadu Police CCTNS Online Complaint", name_ta: "காவல்துறை இணையவழி புகார் பதிவு", sla_en: "Instant CSR", sla_ta: "உடனடி CSR", fee_en: "Free", fee_ta: "இலவசம்", dept_en: "Home (Police) Department", dept_ta: "காவல்துறை", detail_url: "/services", apply_url: "https://eservices.tnpolice.gov.in/", isExternal: true },
      { id: "s-kavalan", name_en: "Kavalan SOS Emergency Response", name_ta: "காவலன் எஸ்ஓஎஸ் அவசர உதவி", sla_en: "Instant Dispatch", sla_ta: "உடனடி உதவி", fee_en: "Free", fee_ta: "இலவசம்", dept_en: "Tamil Nadu Police", dept_ta: "காவல்துறை", detail_url: "/services", apply_url: "#emergency-help" },
    ],
  },
  {
    id: "cat-grv",
    label_en: "13. Grievances",
    label_ta: "13. குறைதீர்ப்பு",
    iconName: "PhoneCall",
    services: [
      { id: "s-cm1100", name_en: "CM Helpline 1100 (Mudhalvar Mugavari)", name_ta: "முதல்வரின் முகவரி 1100", sla_en: "Time-bound Redressal", sla_ta: "காலவரையறை தீர்வு", fee_en: "Free", fee_ta: "இலவசம்", dept_en: "CM Special Cell", dept_ta: "முதலமைச்சரின் தனிப்பிரிவு", detail_url: "/services", apply_url: "tel:1100" },
      { id: "s-rti", name_en: "Online Right to Information (RTI)", name_ta: "தகவல் அறியும் உரிமை (RTI)", sla_en: "30 Days SLA", sla_ta: "30 நாட்கள்", fee_en: "₹10 Statutory", fee_ta: "₹10 கட்டணம்", dept_en: "Personnel & Reforms", dept_ta: "மனிதவள மேலாண்மை", detail_url: "/contact-directory?role=rti", apply_url: "https://rtionline.tn.gov.in/", isExternal: true },
    ],
  },
  {
    id: "cat-local",
    label_en: "14. Local Body Services",
    label_ta: "14. உள்ளாட்சி அமைப்புகள்",
    iconName: "Building2",
    services: [
      { id: "s-urbanpay", name_en: "Urban Property Tax & Trade License", name_ta: "சொத்து வரி & தொழில் உரிமம்", sla_en: "Instant Confirmation", sla_ta: "உடனடி உறுதி", fee_en: "Tax Specific", fee_ta: "வரிப்படி", dept_en: "Municipal Administration", dept_ta: "நகராட்சி நிர்வாகம்", detail_url: "/services", apply_url: "https://tnurbanepay.tn.gov.in/", isExternal: true },
      { id: "s-panchayat", name_en: "Rural Panchayat Citizen Certificate Verification", name_ta: "ஊராட்சி மன்ற சான்றிதழ் சரிபார்ப்பு", sla_en: "Local Body", sla_ta: "உள்ளாட்சி தளம்", fee_en: "Free", fee_ta: "இலவசம்", dept_en: "Rural Development", dept_ta: "ஊரக வளர்ச்சித் துறை", detail_url: "/services", apply_url: "/assisted" },
    ],
  },
];

// 5. Section 7: BROWSE BY LIFE SITUATION (UP BENCHMARK PATTERN)
export const LIFE_SITUATIONS_DATA = [
  { id: "life-students", label_en: "Students & Youth", label_ta: "மாணவர்கள் & இளைஞர்கள்", count: "12 Schemes", desc_en: "Scholarships, Pudhumai Penn, Tamil Pudhalvan & Naan Mudhalvan skills", desc_ta: "கல்வி உதவித்தொகை, புதுமைப் பெண் மற்றும் நான் முதல்வன் பயிற்சிகள்", href: "/schemes#students" },
  { id: "life-farmers", label_en: "Farmers & Cultivators", label_ta: "விவசாயிகள்", count: "8 Schemes", desc_en: "Free farm electricity, crop insurance, Uzhavan app & seed subsidies", desc_ta: "இலவச விவசாய மின்சாரம், பயிர் காப்பீடு மற்றும் உழவர் நலன்கள்", href: "/schemes#farmers" },
  { id: "life-women", label_en: "Women & Family Heads", label_ta: "பெண்கள் & குடும்பத் தலைவிகள்", count: "10 Schemes", desc_en: "₹1,000 monthly entitlement, marriage assistance & maternal nutrition", desc_ta: "கலைஞர் மகளிர் உரிமைத் தொகை, திருமண உதவி மற்றும் மகப்பேறு நலன்", href: "/schemes#women" },
  { id: "life-seniors", label_en: "Senior Citizens", label_ta: "முதியோர்", count: "6 Schemes", desc_en: "Old age monthly pension, healthcare card & social protection", desc_ta: "மாதாந்திர ஓய்வூதியம், மருத்துவ காப்பீடு மற்றும் சமூகப் பாதுகாப்பு", href: "/schemes#seniors" },
  { id: "life-pwd", label_en: "Persons with Disabilities", label_ta: "மாற்றுத்திறனாளிகள்", count: "5 Schemes", desc_en: "Maintenance allowance, motorized vehicles & assisted living aid", desc_ta: "பராமரிப்பு உதவித்தொகை மற்றும் இணைப்பு சக்கர வாகனம்", href: "/schemes#disability" },
  { id: "life-entrepreneurs", label_en: "Entrepreneurs & MSME", label_ta: "தொழில்முனைவோர்", count: "9 Schemes", desc_en: "Single window clearances, capital subsidy & industrial land allotment", desc_ta: "ஒற்றைச் சாளர அனுமதி, மூலதன மானியம் மற்றும் சிப்காட் மனை", href: "/services/business" },
];

// 6. Section 9: THREE CONSTITUTIONAL PILLARS (TELANGANA BENCHMARK PATTERN)
export const CONSTITUTIONAL_PILLARS = [
  {
    id: "pillar-exec",
    title_en: "Executive Administration",
    title_ta: "செயலாட்சி நிர்வாகம்",
    desc_en: "Governor, Chief Minister, Council of Ministers, Chief Secretary, and 45 Secretariat Departments executing state governance.",
    desc_ta: "மாண்புமிகு ஆளுநர், முதலமைச்சர், அமைச்சரவை, தலைமைச் செயலாளர் மற்றும் 45 தலைமைச் செயலகத் துறைகள்.",
    leadership: [
      { role_en: "Governor", role_ta: "ஆளுநர்", name_en: "Thiru R. N. Ravi", name_ta: "திரு. ஆர். என். ரவி" },
      { role_en: "Chief Minister", role_ta: "முதலமைச்சர்", name_en: "Thiru M. K. Stalin", name_ta: "திரு. மு. க. ஸ்டாலின்" },
      { role_en: "Deputy Chief Minister", role_ta: "துணை முதலமைச்சர்", name_en: "Thiru Udhayanidhi Stalin", name_ta: "திரு. உதயநிதி ஸ்டாலின்" },
      { role_en: "Chief Secretary", role_ta: "தலைமைச் செயலாளர்", name_en: "Thiru N. Muruganandam, IAS", name_ta: "திரு. நா. முருகானந்தம், இ.ஆ.ப." },
    ],
    link: "/departments#executive",
  },
  {
    id: "pillar-leg",
    title_en: "Legislative Assembly",
    title_ta: "சட்டப்பேரவை",
    desc_en: "Tamil Nadu Legislative Assembly enacting state legislation, budget appropriations, and democratic oversight.",
    desc_ta: "தமிழ்நாடு சட்டப்பேரவை, சட்டவாக்கம், நிதிநிலை அறிக்கை ஒப்புதல் மற்றும் ஜனநாயகக் கண்காணிப்பு.",
    leadership: [
      { role_en: "Speaker", role_ta: "சபாநாயகர்", name_en: "Thiru M. Appavu", name_ta: "திரு. மு. அப்பாவு" },
      { role_en: "Total Constituencies", role_ta: "தொகுதிகள்", name_en: "234 Assembly Seats", name_ta: "234 சட்டமன்றத் தொகுதிகள்" },
    ],
    link: "/contact-directory?role=legislative",
  },
  {
    id: "pillar-jud",
    title_en: "Judicial Administration",
    title_ta: "நீதித்துறை நிர்வாகம்",
    desc_en: "High Court of Judicature at Madras and District Subordinate Courts upholding rule of law and constitutional justice.",
    desc_ta: "சென்னை உயர் நீதிமன்றம் மற்றும் மாவட்ட அமர்வு நீதிமன்றங்கள்.",
    leadership: [
      { role_en: "Principal Seat", role_ta: "முதன்மை அமர்வு", name_en: "Madras High Court, Chennai", name_ta: "சென்னை உயர் நீதிமன்றம்" },
      { role_en: "Bench", role_ta: "கிளை அமர்வு", name_en: "Madurai Bench of Madras High Court", name_ta: "மதுரை உயர் நீதிமன்றக் கிளை" },
    ],
    link: "/departments#judiciary",
  },
];

// 7. Section 12: Key e-Governance Portals
export const E_GOVERNANCE_PORTALS = [
  { id: "egov-esevai", name_en: "Tamil Nadu e-Sevai Portal", name_ta: "தமிழ்நாடு இ-சேவை இணையதளம்", category_en: "Citizen Services", category_ta: "குடிமக்கள் சேவைகள்", dept_en: "TNeGA", dept_ta: "மின்-ஆளுமை முகமை", description_en: "Single gateway for 250+ revenue, municipal, and welfare certificates.", description_ta: "250-க்கும் மேற்பட்ட அரசு சான்றிதழ்களுக்கான ஒருங்கிணைந்த தளம்.", url: "https://www.tnesevai.tn.gov.in/" },
  { id: "egov-patta", name_en: "AnyWhere Patta / Chitta", name_ta: "எங்கும் எப்போதும் பட்டா / சிட்டா", category_en: "Land Records", category_ta: "நில ஆவணங்கள்", dept_en: "Revenue Administration", dept_ta: "வருவாய் நிர்வாகத் துறை", description_en: "Download digitally signed Patta, Chitta extracts, and track rural/urban land transfer.", description_ta: "மின் கையொப்பமிடப்பட்ட பட்டா, சிட்டா பதிவிறக்கம்.", url: "https://eservices.tn.gov.in/" },
  { id: "egov-tnpds", name_en: "TNPDS Public Distribution System", name_ta: "பொது விநியோகத் திட்டம் (TNPDS)", category_en: "Civil Supplies", category_ta: "உணவுப் பொருள் வழங்கல்", dept_en: "Civil Supplies", dept_ta: "உணவுப் பொருள் வழங்கல் துறை", description_en: "Manage smart ration cards, add members, update addresses, and fair price shops.", description_ta: "ஸ்மார்ட் குடும்ப அட்டை மேலாண்மை மற்றும் நியாயவிலைக் கடைகள்.", url: "https://www.tnpds.gov.in/" },
  { id: "egov-guidance", name_en: "Guidance Single Window 2.0", name_ta: "வழிகாட்டி ஒற்றைச் சாளர அனுமதி", category_en: "Industry & Business", category_ta: "தொழில் & முதலீடு", dept_en: "Industries Department", dept_ta: "தொழில்துறை", description_en: "Time-bound statutory approvals and investor clearances.", description_ta: "தொழில் முதலீடுகளுக்கான காலவரையறை அனுமதிகள்.", url: "https://easybusiness.tn.gov.in/" },
  { id: "egov-cctns", name_en: "Tamil Nadu Police CCTNS", name_ta: "காவல்துறை மின்-சேவைகள் (CCTNS)", category_en: "Public Safety", category_ta: "பொதுப் பாதுகாப்பு", dept_en: "Home (Police) Department", dept_ta: "உள்துறை (காவல்துறை)", description_en: "Online complaint filing, FIR status, and lost document reports.", description_ta: "இணையவழி புகார் பதிவு மற்றும் சரிபார்ப்பு சேவைகள்.", url: "https://eservices.tnpolice.gov.in/" },
  { id: "egov-cmda", name_en: "CMDA Citizen Planning Portal", name_ta: "சிஎம்டிஏ திட்ட அனுமதி தளம்", category_en: "Urban Development", category_ta: "நகர்ப்புற வளர்ச்சி", dept_en: "CMDA", dept_ta: "சென்னை பெருநகர வளர்ச்சிக் குழுமம்", description_en: "Online building permissions, layout sanctions, and land use zoning.", description_ta: "கட்டிடத் திட்ட அனுமதி மற்றும் மனைப்பிரிவு அனுமதி.", url: "https://onlineppa.tn.gov.in/" },
];

// 8. Section 11: Government Orders & Notice Board Tabs
export const NOTICE_BOARD_DATA = {
  gos: [
    { id: "go-1", number: "G.O. Ms. No. 124", dept_en: "Finance (Pay Cell) Department", dept_ta: "நிதித் துறை", title_en: "Dearness Allowance revision for State Government Employees effective from Jan 2026", title_ta: "அரசு ஊழியர்களுக்கான அகவிலைப்படி உயர்வு அரசாணை", date: "14 Feb 2026", size: "245 KB", href: "/documents" },
    { id: "go-2", number: "G.O. Ms. No. 45", dept_en: "Revenue and Disaster Management", dept_ta: "வருவாய்த் துறை", title_en: "Guidelines for issuance of Computerized Nativity and Legal Heir Certificates", title_ta: "இ-சேவை மையங்கள் மூலம் வாரிசுச் சான்றிதழ் வழிகாட்டுதல்கள்", date: "02 Feb 2026", size: "312 KB", href: "/documents" },
    { id: "go-3", number: "G.O. Ms. No. 89", dept_en: "Social Welfare and Women Empowerment", dept_ta: "சமூக நலத்துறை", title_en: "Expansion of Pudhumai Penn and Tamil Pudhalvan Higher Education coverage", title_ta: "புதுமைப் பெண் & தமிழ்ப் புதல்வன் திட்ட விரிவாக்க நெறிமுறைகள்", date: "28 Jan 2026", size: "188 KB", href: "/documents" },
  ],
  notifications: [
    { id: "notif-1", number: "Notification No. 04/2026", dept_en: "Public (Elections) Department", dept_ta: "பொதுத் (தேர்தல்) துறை", title_en: "Special Summary Revision of Electoral Rolls and Voter Awareness", title_ta: "வாக்காளர் பட்டியல் சிறப்பு சுருக்கத் திருத்தம்", date: "10 Feb 2026", size: "156 KB", href: "/documents" },
  ],
  circulars: [
    { id: "circ-1", number: "Circular No. 18/ADM/2026", dept_en: "Human Resources Management", dept_ta: "மனிதவள மேலாண்மைத் துறை", title_en: "Timely disposal of Citizen Grievances submitted through CM Helpline 1100", title_ta: "முதல்வரின் தனிப்பிரிவு மனுக்கள் மீது காலவரையறைக்குள் தீர்வு காண அறிவுரை", date: "12 Feb 2026", size: "120 KB", href: "/documents" },
  ],
  tenders: [
    { id: "tnd-1", number: "Tender Ref: TNEGA/2026/08", dept_en: "TNeGA", dept_ta: "மின்-ஆளுமை முகமை", title_en: "Request for Proposal for Next-Gen Citizen Cloud Infrastructure", title_ta: "அரசு கிளவுட் தரவுப் பாதுகாப்பு உள்கட்டமைப்பு ஒப்பந்தப்புள்ளி", date: "11 Feb 2026", size: "820 KB", href: "https://tntenders.gov.in/", isExternal: true },
  ],
  recruitment: [
    { id: "rec-1", number: "Advt No. 02/2026", dept_en: "TNPSC", dept_ta: "டிஎன்பிஎஸ்சி", title_en: "Combined Civil Services Examination - Group II & IIA (1,240 Posts)", title_ta: "ஒருங்கிணைந்த குடிமைப் பணிகள் தேர்வு - குரூப் II & IIA நேரடித் தேர்வு", date: "08 Feb 2026", size: "450 KB", href: "https://www.tnpsc.gov.in/", isExternal: true },
  ],
  announcements: [
    { id: "ann-1", number: "Press Release No. 340", dept_en: "Information & Public Relations (DIPR)", dept_ta: "செய்தி மக்கள் தொடர்பு", title_en: "State Disaster Relief Authority issues coastal weather advisory", title_ta: "கடலோர மாவட்டங்களுக்கான வானிலை முன்னெச்சரிக்கை", date: "15 Feb 2026", size: "110 KB", href: "#announcements" },
  ],
};

// 9. Section 15: Tourism and Culture
export const TOURISM_HIGHLIGHTS = [
  { id: "tour-chola", title_en: "Great Living Chola Temples", title_ta: "மாபெரும் சோழர் கோயில்கள்", location_en: "Thanjavur, Gangaikonda Cholapuram, Darasuram", location_ta: "தஞ்சாவூர், கங்கைகொண்ட சோழபுரம்", description_en: "UNESCO World Heritage site showcasing thousand-year-old Dravidian engineering.", description_ta: "ஆயிரம் ஆண்டுகள் பழமையான திராவிடக் கட்டிடக்கலைச் சான்று.", badge: "UNESCO Heritage", link: "https://www.tamilnadutourism.tn.gov.in/" },
  { id: "tour-mamallapuram", title_en: "Mamallapuram Coastal Monuments", title_ta: "மாமல்லபுரம் கடற்கரை சிற்பங்கள்", location_en: "Chengalpattu District", location_ta: "செங்கல்பட்டு மாவட்டம்", description_en: "7th-century rock-cut monolithic caves and shore temple.", description_ta: "பல்லவர் கால பாறை குடைவரை கோயில்கள்.", badge: "UNESCO Heritage", link: "https://www.tamilnadutourism.tn.gov.in/" },
  { id: "tour-nilgiris", title_en: "Nilgiris Mountain Railway", title_ta: "நீலகிரி மலை ரயில்", location_en: "Ooty & Coonoor", location_ta: "உதகமண்டலம் & குன்னூர்", description_en: "Scenic heritage mountain steam railway running through Western Ghats.", description_ta: "மேற்குத் தொடர்ச்சி மலை எழில் கொஞ்சும் நீராவி மலை ரயில்.", badge: "Mountain Heritage", link: "https://www.tamilnadutourism.tn.gov.in/" },
  { id: "tour-madurai", title_en: "Madurai Meenakshi Temple", title_ta: "மதுரை மீனாட்சி சுந்தரேசுவரர் கோயில்", location_en: "Madurai City", location_ta: "மதுரை மாநகரம்", description_en: "Historic architectural wonder with 14 gopurams and thousand-pillared hall.", description_ta: "14 கம்பீரமான கோபுரங்கள் மற்றும் ஆயிரங்கால் மண்டபம்.", badge: "Spiritual Culture", link: "https://www.tamilnadutourism.tn.gov.in/" },
];

// 10. Section 16: Emergency and Grievance Help (24x7 Helplines)
export const EMERGENCY_HELPLINES = [
  { id: "hl-1100", title_en: "CM Helpline 1100 (Grievance)", title_ta: "முதல்வரின் உதவி மையம்", number: "1100", icon: "PhoneCall", desc_en: "24x7 Unified Citizen Redressal", desc_ta: "24x7 உடனடி குறைதீர்ப்பு" },
  { id: "hl-108", title_en: "Emergency Ambulance & Medical", title_ta: "அவசர மருத்துவ ஊர்தி", number: "108", icon: "Building2", desc_en: "Free 24x7 Life Support", desc_ta: "இலவச அவசர மருத்துவ சிகிச்சை" },
  { id: "hl-100", title_en: "Police Emergency Control", title_ta: "காவல்துறை அவசர உதவி", number: "100", icon: "PhoneCall", desc_en: "State Police Rapid Response", desc_ta: "விரைவு காவல் படை நடவடிக்கை" },
  { id: "hl-101", title_en: "Fire & Rescue Services", title_ta: "தீயணைப்பு மற்றும் மீட்புப் பணி", number: "101", icon: "PhoneCall", desc_en: "Fire accident rescue", desc_ta: "தீ விபத்து மற்றும் மீட்பு" },
  { id: "hl-181", title_en: "Women Helpline (Safe TN)", title_ta: "பெண்கள் அவசர உதவி", number: "181", icon: "PhoneCall", desc_en: "24x7 Crisis Support", desc_ta: "பெண்கள் பாதுகாப்பு மற்றும் உதவி" },
  { id: "hl-1098", title_en: "Childline (Child Protection)", title_ta: "குழந்தைகள் உதவி எண்", number: "1098", icon: "PhoneCall", desc_en: "Care and protection for children", desc_ta: "குழந்தைகள் நலன் மற்றும் பாதுகாப்பு" },
  { id: "hl-1077", title_en: "State Disaster Control Room", title_ta: "பேரிடர் கட்டுப்பாட்டு மையம்", number: "1077", icon: "Building2", desc_en: "Cyclone and natural hazard alerts", desc_ta: "புயல், வெள்ளம் பேரிடர் எச்சரிக்கை" },
  { id: "hl-1930", title_en: "Cyber Crime Financial Fraud", title_ta: "சைபர் குற்றங்கள் புகார் எண்", number: "1930", icon: "PhoneCall", desc_en: "Instant banking fraud block", desc_ta: "நிதி மோசடி உடனடி தடுப்பு" },
];

// 11. Section 10: 38 Districts Directory Mapping
export const TN_DISTRICTS_LIST = [
  { id: "DIS-01", name_en: "Ariyalur", name_ta: "அரியலூர்", collector_en: "District Collector, Ariyalur", phone: "04329-228200", email: "collrari@nic.in", hq_en: "Ariyalur", hq_ta: "அரியலூர்", portal: "https://ariyalur.nic.in/" },
  { id: "DIS-02", name_en: "Chengalpattu", name_ta: "செங்கல்பட்டு", collector_en: "District Collector, Chengalpattu", phone: "044-27427412", email: "collrcpt@nic.in", hq_en: "Chengalpattu", hq_ta: "செங்கல்பட்டு", portal: "https://chengalpattu.nic.in/" },
  { id: "DIS-03", name_en: "Chennai", name_ta: "சென்னை", collector_en: "District Collector, Chennai", phone: "044-25268320", email: "collrchn@nic.in", hq_en: "Chennai", hq_ta: "சென்னை", portal: "https://chennai.nic.in/" },
  { id: "DIS-04", name_en: "Coimbatore", name_ta: "கோயம்புத்தூர்", collector_en: "District Collector, Coimbatore", phone: "0422-2301114", email: "collrcbe@nic.in", hq_en: "Coimbatore", hq_ta: "கோயம்புத்தூர்", portal: "https://coimbatore.nic.in/" },
  { id: "DIS-05", name_en: "Cuddalore", name_ta: "கடலூர்", collector_en: "District Collector, Cuddalore", phone: "04142-230001", email: "collrcud@nic.in", hq_en: "Cuddalore", hq_ta: "கடலூர்", portal: "https://cuddalore.nic.in/" },
  { id: "DIS-06", name_en: "Dharmapuri", name_ta: "தருமபுரி", collector_en: "District Collector, Dharmapuri", phone: "04342-230500", email: "collrdpi@nic.in", hq_en: "Dharmapuri", hq_ta: "தருமபுரி", portal: "https://dharmapuri.nic.in/" },
  { id: "DIS-07", name_en: "Dindigul", name_ta: "திண்டுக்கல்", collector_en: "District Collector, Dindigul", phone: "0451-2461199", email: "collrdgl@nic.in", hq_en: "Dindigul", hq_ta: "திண்டுக்கல்", portal: "https://dindigul.nic.in/" },
  { id: "DIS-08", name_en: "Erode", name_ta: "ஈரோடு", collector_en: "District Collector, Erode", phone: "0424-2266700", email: "collrerd@nic.in", hq_en: "Erode", hq_ta: "ஈரோடு", portal: "https://erode.nic.in/" },
  { id: "DIS-09", name_en: "Kallakurichi", name_ta: "கள்ளக்குறிச்சி", collector_en: "District Collector, Kallakurichi", phone: "04151-226222", email: "collrklk@nic.in", hq_en: "Kallakurichi", hq_ta: "கள்ளக்குறிச்சி", portal: "https://kallakurichi.nic.in/" },
  { id: "DIS-10", name_en: "Kancheepuram", name_ta: "காஞ்சிபுரம்", collector_en: "District Collector, Kancheepuram", phone: "044-27237433", email: "collrkpm@nic.in", hq_en: "Kancheepuram", hq_ta: "காஞ்சிபுரம்", portal: "https://kancheepuram.nic.in/" },
  { id: "DIS-11", name_en: "Kanniyakumari", name_ta: "கன்னியாகுமரி", collector_en: "District Collector, Nagercoil", phone: "04652-279555", email: "collrkkm@nic.in", hq_en: "Nagercoil", hq_ta: "நாகர்கோவில்", portal: "https://kanniyakumari.nic.in/" },
  { id: "DIS-12", name_en: "Karur", name_ta: "கரூர்", collector_en: "District Collector, Karur", phone: "04324-257500", email: "collrkar@nic.in", hq_en: "Karur", hq_ta: "கரூர்", portal: "https://karur.nic.in/" },
  { id: "DIS-13", name_en: "Krishnagiri", name_ta: "கிருஷ்ணகிரி", collector_en: "District Collector, Krishnagiri", phone: "04343-239500", email: "collrkrg@nic.in", hq_en: "Krishnagiri", hq_ta: "கிருஷ்ணகிரி", portal: "https://krishnagiri.nic.in/" },
  { id: "DIS-14", name_en: "Madurai", name_ta: "மதுரை", collector_en: "District Collector, Madurai", phone: "0452-2531110", email: "collrmdu@nic.in", hq_en: "Madurai", hq_ta: "மதுரை", portal: "https://madurai.nic.in/" },
  { id: "DIS-15", name_en: "Mayiladuthurai", name_ta: "மயிலாடுதுறை", collector_en: "District Collector, Mayiladuthurai", phone: "04364-222222", email: "collrmyd@nic.in", hq_en: "Mayiladuthurai", hq_ta: "மயிலாடுதுறை", portal: "https://mayiladuthurai.nic.in/" },
  { id: "DIS-16", name_en: "Nagapattinam", name_ta: "நாகப்பட்டினம்", collector_en: "District Collector, Nagapattinam", phone: "04365-252500", email: "collrngp@nic.in", hq_en: "Nagapattinam", hq_ta: "நாகப்பட்டினம்", portal: "https://nagapattinam.nic.in/" },
  { id: "DIS-17", name_en: "Namakkal", name_ta: "நாமக்கல்", collector_en: "District Collector, Namakkal", phone: "04286-281101", email: "collrnkl@nic.in", hq_en: "Namakkal", hq_ta: "நாமக்கல்", portal: "https://namakkal.nic.in/" },
  { id: "DIS-18", name_en: "Nilgiris", name_ta: "நீலகிரி", collector_en: "District Collector, Udhagamandalam", phone: "0423-2442344", email: "collrnil@nic.in", hq_en: "Udhagamandalam", hq_ta: "உதகமண்டலம்", portal: "https://nilgiris.nic.in/" },
  { id: "DIS-19", name_en: "Perambalur", name_ta: "பெரம்பலூர்", collector_en: "District Collector, Perambalur", phone: "04328-225500", email: "collrper@nic.in", hq_en: "Perambalur", hq_ta: "பெரம்பலூர்", portal: "https://perambalur.nic.in/" },
  { id: "DIS-20", name_en: "Pudukkottai", name_ta: "புதுக்கோட்டை", collector_en: "District Collector, Pudukkottai", phone: "04322-222222", email: "collrpdk@nic.in", hq_en: "Pudukkottai", hq_ta: "புதுக்கோட்டை", portal: "https://pudukkottai.nic.in/" },
  { id: "DIS-21", name_en: "Ramanathapuram", name_ta: "ராமநாதபுரம்", collector_en: "District Collector, Ramanathapuram", phone: "04567-230001", email: "collrrmd@nic.in", hq_en: "Ramanathapuram", hq_ta: "ராமநாதபுரம்", portal: "https://ramanathapuram.nic.in/" },
  { id: "DIS-22", name_en: "Ranipet", name_ta: "ராணிப்பேட்டை", collector_en: "District Collector, Ranipet", phone: "04172-273111", email: "collrrpt@nic.in", hq_en: "Ranipet", hq_ta: "ராணிப்பேட்டை", portal: "https://ranipet.nic.in/" },
  { id: "DIS-23", name_en: "Salem", name_ta: "சேலம்", collector_en: "District Collector, Salem", phone: "0427-2452244", email: "collrslm@nic.in", hq_en: "Salem", hq_ta: "சேலம்", portal: "https://salem.nic.in/" },
  { id: "DIS-24", name_en: "Sivaganga", name_ta: "சிவகங்கை", collector_en: "District Collector, Sivaganga", phone: "04575-240401", email: "collrsvg@nic.in", hq_en: "Sivaganga", hq_ta: "சிவகங்கை", portal: "https://sivaganga.nic.in/" },
  { id: "DIS-25", name_en: "Tenkasi", name_ta: "தென்காசி", collector_en: "District Collector, Tenkasi", phone: "04633-290001", email: "collrtks@nic.in", hq_en: "Tenkasi", hq_ta: "தென்காசி", portal: "https://tenkasi.nic.in/" },
  { id: "DIS-26", name_en: "Thanjavur", name_ta: "தஞ்சாவூர்", collector_en: "District Collector, Thanjavur", phone: "04362-230101", email: "collrtnj@nic.in", hq_en: "Thanjavur", hq_ta: "தஞ்சாவூர்", portal: "https://thanjavur.nic.in/" },
  { id: "DIS-27", name_en: "Theni", name_ta: "தேனி", collector_en: "District Collector, Theni", phone: "04546-253627", email: "collrthn@nic.in", hq_en: "Theni", hq_ta: "தேனி", portal: "https://theni.nic.in/" },
  { id: "DIS-28", name_en: "Thoothukudi", name_ta: "தூத்துக்குடி", collector_en: "District Collector, Thoothukudi", phone: "0461-2340600", email: "collrtut@nic.in", hq_en: "Thoothukudi", hq_ta: "தூத்துக்குடி", portal: "https://thoothukudi.nic.in/" },
  { id: "DIS-29", name_en: "Tiruchirappalli", name_ta: "திருச்சிராப்பள்ளி", collector_en: "District Collector, Tiruchirappalli", phone: "0431-2415358", email: "collrtry@nic.in", hq_en: "Tiruchirappalli", hq_ta: "திருச்சிராப்பள்ளி", portal: "https://tiruchirappalli.nic.in/" },
  { id: "DIS-30", name_en: "Tirunelveli", name_ta: "திருநெல்வேலி", collector_en: "District Collector, Tirunelveli", phone: "0462-2500828", email: "collrtnv@nic.in", hq_en: "Tirunelveli", hq_ta: "திருநெல்வேலி", portal: "https://tirunelveli.nic.in/" },
  { id: "DIS-31", name_en: "Tirupathur", name_ta: "திருப்பத்தூர்", collector_en: "District Collector, Tirupathur", phone: "04179-222111", email: "collrtpr@nic.in", hq_en: "Tirupathur", hq_ta: "திருப்பத்தூர்", portal: "https://tirupathur.nic.in/" },
  { id: "DIS-32", name_en: "Tiruppur", name_ta: "திருப்பூர்", collector_en: "District Collector, Tiruppur", phone: "0421-2971100", email: "collrtpr2@nic.in", hq_en: "Tiruppur", hq_ta: "திருப்பூர்", portal: "https://tiruppur.nic.in/" },
  { id: "DIS-33", name_en: "Tiruvallur", name_ta: "திருவள்ளூர்", collector_en: "District Collector, Tiruvallur", phone: "044-27661600", email: "collrtlr@nic.in", hq_en: "Tiruvallur", hq_ta: "திருவள்ளூர்", portal: "https://tiruvallur.nic.in/" },
  { id: "DIS-34", name_en: "Tiruvannamalai", name_ta: "திருவண்ணாமலை", collector_en: "District Collector, Tiruvannamalai", phone: "04175-233333", email: "collrtvm@nic.in", hq_en: "Tiruvannamalai", hq_ta: "திருவண்ணாமலை", portal: "https://tiruvannamalai.nic.in/" },
  { id: "DIS-35", name_en: "Tiruvarur", name_ta: "திருவாரூர்", collector_en: "District Collector, Tiruvarur", phone: "04366-223344", email: "collrtvr@nic.in", hq_en: "Tiruvarur", hq_ta: "திருவாரூர்", portal: "https://tiruvarur.nic.in/" },
  { id: "DIS-36", name_en: "Vellore", name_ta: "வேலூர்", collector_en: "District Collector, Vellore", phone: "0416-2252501", email: "collrvel@nic.in", hq_en: "Vellore", hq_ta: "வேலூர்", portal: "https://vellore.nic.in/" },
  { id: "DIS-37", name_en: "Viluppuram", name_ta: "விழுப்புரம்", collector_en: "District Collector, Viluppuram", phone: "04146-222450", email: "collrvpm@nic.in", hq_en: "Viluppuram", hq_ta: "விழுப்புரம்", portal: "https://viluppuram.nic.in/" },
  { id: "DIS-38", name_en: "Virudhunagar", name_ta: "விருதுநகர்", collector_en: "District Collector, Virudhunagar", phone: "04562-252525", email: "collrvnr@nic.in", hq_en: "Virudhunagar", hq_ta: "விருதுநகர்", portal: "https://virudhunagar.nic.in/" },
];
