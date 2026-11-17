/**
 * Centralized Navigation Configuration for Tamil Nadu Government Portal 2.0
 * P0 Single-Source-of-Truth for Desktop Nav, Mega Menus, Mobile Drawer,
 * Quick Access Bar, Breadcrumbs, and Footer Sitemap.
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
    title_en: "Apply for Certificate",
    title_ta: "சான்றிதழ் விண்ணப்பம்",
    href: "/services/certificates",
    iconName: "FileText",
  },
  {
    id: "qa-land",
    title_en: "Land Records / Patta",
    title_ta: "பட்டா / நில ஆவணங்கள்",
    href: "/services/land",
    iconName: "MapPin",
  },
  {
    id: "qa-track",
    title_en: "Track Application",
    title_ta: "விண்ணப்ப நிலை",
    href: "#tracker",
    iconName: "Clock",
  },
  {
    id: "qa-schemes",
    title_en: "Welfare Schemes",
    title_ta: "அரசு நலத்திட்டங்கள்",
    href: "/schemes",
    iconName: "Award",
  },
  {
    id: "qa-contacts",
    title_en: "Government Contacts",
    title_ta: "அரசு தொடர்பு கையேடு",
    href: "/contact-directory",
    iconName: "Users",
  },
  {
    id: "qa-docs",
    title_en: "Government Orders (G.O.)",
    title_ta: "அரசாணைகள்",
    href: "/documents",
    iconName: "FileCheck2",
  },
  {
    id: "qa-grievance",
    title_en: "Raise Grievance (1100)",
    title_ta: "குறைதீர்ப்பு (1100)",
    href: "#grievances",
    iconName: "PhoneCall",
  },
  {
    id: "qa-kiosk",
    title_en: "e-Sevai Kiosk Mode",
    title_ta: "இ-சேவை உதவியாளர்",
    href: "/assisted",
    iconName: "Building2",
  },
];

// 2. Layer C: Primary Category Navigation with Accessible Mega Menus
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
        group_id: "grp-cert",
        group_title_en: "Certificates",
        group_title_ta: "சான்றிதழ்கள்",
        items: [
          {
            id: "srv-comm",
            title_en: "Community Certificate",
            title_ta: "சாதிச் சான்றிதழ்",
            href: "/services/certificates",
            description_en: "SC/ST/OBC/BC status proof (15 days SLA)",
            description_ta: "15 வேலை நாட்களில் வழங்கப்படும்",
          },
          {
            id: "srv-inc",
            title_en: "Income Certificate",
            title_ta: "வருமானச் சான்றிதழ்",
            href: "/services/certificates",
            description_en: "Annual household income verification",
            description_ta: "ஆண்டு வருமானச் சான்று",
          },
          {
            id: "srv-nat",
            title_en: "Nativity / Residence Certificate",
            title_ta: "இருப்பிடச் சான்றிதழ்",
            href: "/services/certificates",
            description_en: "Proof of permanent domicile in TN",
            description_ta: "நிரந்தர குடியிருப்பு சான்று",
          },
          {
            id: "srv-heir",
            title_en: "Legal Heir Certificate",
            title_ta: "வாரிசுச் சான்றிதழ்",
            href: "/services/certificates",
            description_en: "Succession certificate for heirs",
            description_ta: "சட்டப்பூர்வ வாரிசு ஆவணம்",
          },
        ],
      },
      {
        group_id: "grp-land",
        group_title_en: "Land & Property",
        group_title_ta: "நிலம் & சொத்து",
        items: [
          {
            id: "srv-patta",
            title_en: "Patta Chitta Extract",
            title_ta: "பட்டா சிட்டா விவரம்",
            href: "/services/land",
            description_en: "View and download verified land ownership record",
            description_ta: "நில உரிமை ஆவண பதிவிறக்கம்",
          },
          {
            id: "srv-patta-tr",
            title_en: "Patta Transfer Application",
            title_ta: "பட்டா மாறுதல் விண்ணப்பம்",
            href: "/services/land",
            description_en: "Online ownership transfer for sub-divisions",
            description_ta: "உட்பிரிவு / முழுப் புல மாறுதல்",
          },
          {
            id: "srv-ec",
            title_en: "Encumbrance Certificate (EC)",
            title_ta: "வில்லங்கச் சான்றிதழ் (EC)",
            href: "https://tnreginet.gov.in/",
            description_en: "Registration Dept encumbrance search",
            description_ta: "பதிவுத்துறை வில்லங்க தேடல்",
            isExternal: true,
          },
        ],
      },
      {
        group_id: "grp-edu-emp",
        group_title_en: "Education & Employment",
        group_title_ta: "கல்வி & வேலைவாய்ப்பு",
        items: [
          {
            id: "srv-schol",
            title_en: "Post-Matric Scholarships",
            title_ta: "கல்வி உதவித்தொகை",
            href: "/schemes",
            description_en: "Direct benefit transfer for college students",
            description_ta: "கல்லூரி மாணவர் கல்வி உதவி",
          },
          {
            id: "srv-emp-reg",
            title_en: "Employment Exchange Renewal",
            title_ta: "வேலைவாய்ப்பு பதிவு புதுப்பித்தல்",
            href: "https://tnvelaivaaippu.gov.in/",
            description_en: "State employment registration & seniority",
            description_ta: "வேலைவாய்ப்பு seniority புதுப்பித்தல்",
            isExternal: true,
          },
        ],
      },
      {
        group_id: "grp-util-trans",
        group_title_en: "Utilities & Transport",
        group_title_ta: "பயன்பாடுகள் & போக்குவரத்து",
        items: [
          {
            id: "srv-tneb",
            title_en: "TANGEDCO Electricity Bill Payment",
            title_ta: "மின் கட்டண செலுத்துதல்",
            href: "https://www.tnebnet.org/",
            description_en: "Domestic & commercial power payment",
            description_ta: "மின் கட்டண விவரம் மற்றும் செலுத்துதல்",
            isExternal: true,
          },
          {
            id: "srv-dl",
            title_en: "Driving Licence & Vehicle Services",
            title_ta: "ஓட்டுநர் உரிமம் & வாகன சேவைகள்",
            href: "https://parivahan.gov.in/",
            description_en: "LLR, Driving Licence renewal and RC transfer",
            description_ta: "சாரதி / பரிவாகன் சேவைகள்",
            isExternal: true,
          },
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
        group_id: "grp-women",
        group_title_en: "Women & Children",
        group_title_ta: "பெண்கள் & குழந்தைகள்",
        items: [
          {
            id: "sch-kmut",
            title_en: "Kalaignar Magalir Urimai Thogai",
            title_ta: "கலைஞர் மகளிர் உரிமைத் திட்டம்",
            href: "/schemes",
            description_en: "₹1,000/month basic income for women heads of household",
            description_ta: "குடும்பத் தலைவிகளுக்கு மாதம் ₹1,000",
            badge_en: "Flagship",
            badge_ta: "முக்கிய திட்டம்",
          },
          {
            id: "sch-pudhu",
            title_en: "Pudhumai Penn Scheme",
            title_ta: "புதுமைப் பெண் திட்டம்",
            href: "/schemes",
            description_en: "₹1,000/month for girls pursuing higher education",
            description_ta: "அரசுப் பள்ளி மாணவிகளுக்கு உயர்கல்வி உதவி",
          },
        ],
      },
      {
        group_id: "grp-farmers-students",
        group_title_en: "Farmers & Senior Citizens",
        group_title_ta: "விவசாயிகள் & முதியோர்",
        items: [
          {
            id: "sch-agri",
            title_en: "Kalaignarin All Village Integrated Agri Dev",
            title_ta: "அனைத்து கிராம ஒருங்கிணைந்த வேளாண் வளர்ச்சி",
            href: "/schemes",
            description_en: "Farm inputs, solar pumps, and soil health cards",
            description_ta: "விவசாயிகளுக்கு வேளாண் இடுபொருட்கள்",
          },
          {
            id: "sch-oap",
            title_en: "Old Age Pension (OAP)",
            title_ta: "முதியோர் ஓய்வூதியத் திட்டம்",
            href: "/schemes",
            description_en: "₹1,200/month social security pension",
            description_ta: "மாதம் ₹1,200 சமூகப் பாதுகாப்பு உதவித்தொகை",
          },
          {
            id: "sch-cmchis",
            title_en: "CM Comprehensive Health Insurance (CMCHIS)",
            title_ta: "முதலமைச்சரின் விரிவான மருத்துவக் காப்பீடு",
            href: "/schemes",
            description_en: "Cashless hospital treatment up to ₹5 Lakh/year",
            description_ta: "ஆண்டுக்கு ₹5 லட்சம் வரை கட்டணமில்லா சிகிச்சை",
            badge_en: "Health",
            badge_ta: "மருத்துவம்",
          },
        ],
      },
    ],
  },
  {
    id: "nav-contacts",
    label_en: "Government Contacts",
    label_ta: "அரசு தொடர்பு கையேடு",
    href: "/contact-directory",
    groups: [
      {
        group_id: "grp-leadership",
        group_title_en: "State Leadership & Administration",
        group_title_ta: "மாநில தலைமை & அரசு நிர்வாகம்",
        items: [
          {
            id: "dir-cm",
            title_en: "Council of Ministers",
            title_ta: "மாண்புமிகு அமைச்சரவை",
            href: "/contact-directory?category=Minister",
            description_en: "Hon'ble Chief Minister & Cabinet Ministers",
            description_ta: "முதலமைச்சர் மற்றும் அமைச்சர்கள்",
          },
          {
            id: "dir-sec",
            title_en: "Secretaries to Government",
            title_ta: "அரசுச் செயலாளர்கள்",
            href: "/contact-directory?cadre=IAS",
            description_en: "Chief Secretary & Department Secretaries",
            description_ta: "தலைமைச் செயலாளர் மற்றும் முதன்மைச் செயலாளர்கள்",
          },
          {
            id: "dir-hod",
            title_en: "Heads of Departments (HoD)",
            title_ta: "துறைத் தலைவர்கள் (HoD)",
            href: "/contact-directory?category=HoD",
            description_en: "Directors, Commissioners & Managing Directors",
            description_ta: "இயக்குநர்கள் மற்றும் ஆணையர்கள்",
          },
        ],
      },
      {
        group_id: "grp-district-rti",
        group_title_en: "Districts & Transparency",
        group_title_ta: "மாவட்டங்கள் & தகவல் அறியும் உரிமை",
        items: [
          {
            id: "dir-coll",
            title_en: "District Collectors",
            title_ta: "மாவட்ட ஆட்சித்தலைவர்கள்",
            href: "/contact-directory?designation=Collector",
            description_en: "All 38 District Collectors & Magistrates",
            description_ta: "38 மாவட்ட ஆட்சித்தலைவர்கள் தொடர்பு விவரம்",
            badge_en: "38 Districts",
            badge_ta: "38 மாவட்டங்கள்",
          },
          {
            id: "dir-rti",
            title_en: "RTI Appellate Authorities",
            title_ta: "RTI மேல்முறையீட்டு அலுவலர்கள்",
            href: "/contact-directory?category=RTI",
            description_en: "Public Information Officers (PIO) & FAA",
            description_ta: "தகவல் அறியும் உரிமை அலுவலர்கள்",
          },
          {
            id: "dir-helplines",
            title_en: "Emergency Helplines (24/7)",
            title_ta: "அவசர கால உதவி எண்கள்",
            href: "/contact-directory?category=Helpline",
            description_en: "CM Helpline 1100, Emergency 108, Women 181",
            description_ta: "முதலமைச்சர் உதவி எண் 1100, 108, 181",
          },
        ],
      },
    ],
  },
  {
    id: "nav-dept-dist",
    label_en: "Departments & Districts",
    label_ta: "துறைகள் & மாவட்டங்கள்",
    href: "/departments",
    groups: [
      {
        group_id: "grp-departments",
        group_title_en: "Government Departments",
        group_title_ta: "அரசுத் துறைகள்",
        items: [
          {
            id: "dep-rev",
            title_en: "Revenue & Disaster Management",
            title_ta: "வருவாய் மற்றும் பேரிடர் மேலாண்மைத் துறை",
            href: "/departments",
            description_en: "Certificates, patta transfer, land administration",
            description_ta: "சான்றிதழ்கள், நில நிர்வாகம்",
          },
          {
            id: "dep-soc",
            title_en: "Social Welfare & Women Empowerment",
            title_ta: "சமூக நலன் மற்றும் மகளிர் உரிமைத் துறை",
            href: "/departments",
            description_en: "Women welfare, pensions, child care",
            description_ta: "மகளிர் உரிமை, ஓய்வூதியங்கள்",
          },
          {
            id: "dep-all",
            title_en: "Browse All 45 Departments",
            title_ta: "அனைத்து 45 துறைகளையும் காண்க",
            href: "/departments",
            description_en: "Complete Secretariat & Executive Department registry",
            description_ta: "முழுமையான தலைமைச் செயலகத் துறைகள்",
            badge_en: "45 Departments",
            badge_ta: "45 துறைகள்",
          },
        ],
      },
      {
        group_id: "grp-districts",
        group_title_en: "District Collectorates",
        group_title_ta: "மாவட்ட ஆட்சியர் அலுவலகங்கள்",
        items: [
          {
            id: "dist-all",
            title_en: "Browse All 38 Districts",
            title_ta: "அனைத்து 38 மாவட்டங்களையும் காண்க",
            href: "/districts",
            description_en: "District Collectorates, Taluk offices, and local contacts",
            description_ta: "மாவட்ட ஆட்சித்தலைவர் அலுவலகங்கள்",
            badge_en: "38 Districts",
            badge_ta: "38 மாவட்டங்கள்",
          },
        ],
      },
    ],
  },
  {
    id: "nav-documents",
    label_en: "Government Documents",
    label_ta: "அரசாணைகள் & ஆவணங்கள்",
    href: "/documents",
    groups: [
      {
        group_id: "grp-docs-cat",
        group_title_en: "Document Categories",
        group_title_ta: "ஆவண வகைகள்",
        items: [
          {
            id: "doc-go",
            title_en: "Government Orders (G.O.s)",
            title_ta: "அரசாணைகள் (G.O.)",
            href: "/documents?doc_type=Government%20Order",
            description_en: "Policy, personnel orders, financial sanctions",
            description_ta: "துறை வாரியான அரசாணைகள்",
          },
          {
            id: "doc-pn",
            title_en: "Budget & Policy Notes",
            title_ta: "கொள்கை விளக்கக் குறிப்புகள்",
            href: "/documents?doc_type=Policy%20Note",
            description_en: "Annual legislative demand statements",
            description_ta: "சட்டமன்ற மானியக் கோரிக்கைகள்",
          },
          {
            id: "doc-acts",
            title_en: "Gazette Notifications, Acts & Rules",
            title_ta: "அரசிதழ் & சட்ட விதிகள்",
            href: "/documents?doc_type=Gazette",
            description_en: "Statutory notifications and gazette publications",
            description_ta: "தமிழ்நாடு அரசிதழ் அறிவிப்புகள்",
          },
        ],
      },
    ],
  },
  {
    id: "nav-grievance",
    label_en: "Grievances & Help",
    label_ta: "குறைதீர்ப்பு & உதவி",
    href: "#grievances",
    groups: [
      {
        group_id: "grp-help-channels",
        group_title_en: "Helplines & Grievance Portals",
        group_title_ta: "உதவி எண்கள் & குறைதீர்ப்பு தளங்கள்",
        items: [
          {
            id: "hl-cm",
            title_en: "CM Helpline (Toll-Free 1100)",
            title_ta: "முதலமைச்சர் உதவி மையம் (1100)",
            href: "tel:1100",
            description_en: "24/7 Citizen Grievance Redressal Helpline",
            description_ta: "24/7 பொதுமக்கள் குறைகேட்பு உதவி எண்",
            badge_en: "24x7",
            badge_ta: "24x7",
          },
          {
            id: "hl-esevai",
            title_en: "TNeGA e-Sevai Helpdesk (1800-425-1333)",
            title_ta: "இ-சேவை உதவி மையம் (1800-425-1333)",
            href: "tel:18004251333",
            description_en: "Citizen service technical support",
            description_ta: "இணைய சேவை மற்றும் விண்ணப்ப உதவி",
          },
          {
            id: "hl-kiosk",
            title_en: "e-Sevai Kiosk Assisted Mode",
            title_ta: "இ-சேவை உதவியாளர் சேவை",
            href: "/assisted",
            description_en: "Kiosk operator console with receipt printing",
            description_ta: "இ-சேவை மையங்களுக்கான வழிகாட்டி",
          },
        ],
      },
    ],
  },
];

// 3. Section 2: Most Used Services (12 High-Value Services)
export const MOST_USED_SERVICES = [
  {
    id: "mus-comm",
    title_en: "Community Certificate",
    title_ta: "சாதிச் சான்றிதழ்",
    dept_en: "Revenue Department",
    dept_ta: "வருவாய்த் துறை",
    href: "/services/certificates",
    sla_en: "15 Days",
    sla_ta: "15 நாட்கள்",
    fee_en: "₹60",
    fee_ta: "₹60",
    icon: "FileText",
  },
  {
    id: "mus-inc",
    title_en: "Income Certificate",
    title_ta: "வருமானச் சான்றிதழ்",
    dept_en: "Revenue Department",
    dept_ta: "வருவாய்த் துறை",
    href: "/services/certificates",
    sla_en: "15 Days",
    sla_ta: "15 நாட்கள்",
    fee_en: "₹60",
    fee_ta: "₹60",
    icon: "FileText",
  },
  {
    id: "mus-patta",
    title_en: "Patta Chitta & Land Records",
    title_ta: "பட்டா சிட்டா / நில ஆவணம்",
    dept_en: "Survey and Settlement",
    dept_ta: "நில அளவைத்துறை",
    href: "/services/land",
    sla_en: "Instant",
    sla_ta: "உடனடி",
    fee_en: "Free",
    fee_ta: "இலவசம்",
    icon: "MapPin",
  },
  {
    id: "mus-kmut",
    title_en: "Magalir Urimai Thogai",
    title_ta: "மகளிர் உரிமைத் திட்டம்",
    dept_en: "Social Welfare Dept",
    dept_ta: "சமூக நலத்துறை",
    href: "/schemes",
    sla_en: "Monthly DBT",
    sla_ta: "மாதாந்திர உதவி",
    fee_en: "₹1,000/mo",
    fee_ta: "மாதம் ₹1,000",
    icon: "Award",
  },
  {
    id: "mus-nat",
    title_en: "Nativity Certificate",
    title_ta: "இருப்பிடச் சான்றிதழ்",
    dept_en: "Revenue Department",
    dept_ta: "வருவாய்த் துறை",
    href: "/services/certificates",
    sla_en: "15 Days",
    sla_ta: "15 நாட்கள்",
    fee_en: "₹60",
    fee_ta: "₹60",
    icon: "FileText",
  },
  {
    id: "mus-heir",
    title_en: "Legal Heir Certificate",
    title_ta: "வாரிசுச் சான்றிதழ்",
    dept_en: "Revenue Department",
    dept_ta: "வருவாய்த் துறை",
    href: "/services/certificates",
    sla_en: "15 Days",
    sla_ta: "15 நாட்கள்",
    fee_en: "₹60",
    fee_ta: "₹60",
    icon: "FileText",
  },
  {
    id: "mus-pudhu",
    title_en: "Pudhumai Penn Scheme",
    title_ta: "புதுமைப் பெண் திட்டம்",
    dept_en: "Higher Education",
    dept_ta: "உயர்கல்வித் துறை",
    href: "/schemes",
    sla_en: "College DBT",
    sla_ta: "கல்லூரி உதவி",
    fee_en: "₹1,000/mo",
    fee_ta: "மாதம் ₹1,000",
    icon: "GraduationCap",
  },
  {
    id: "mus-oap",
    title_en: "Old Age Pension (OAP)",
    title_ta: "முதியோர் ஓய்வூதியம்",
    dept_en: "Revenue (Social Security)",
    dept_ta: "சமூகப் பாதுகாப்பு",
    href: "/schemes",
    sla_en: "Monthly DBT",
    sla_ta: "மாதாந்திர ஓய்வூதியம்",
    fee_en: "₹1,200/mo",
    fee_ta: "மாதம் ₹1,200",
    icon: "ShieldCheck",
  },
  {
    id: "mus-tneb",
    title_en: "Electricity Bill (TANGEDCO)",
    title_ta: "மின் கட்டண செலுத்துதல்",
    dept_en: "Energy Department",
    dept_ta: "மின்சாரத் துறை",
    href: "https://www.tnebnet.org/",
    sla_en: "Instant",
    sla_ta: "உடனடி",
    fee_en: "As per Bill",
    fee_ta: "கட்டண விவரப்படி",
    icon: "Tractor",
  },
  {
    id: "mus-dl",
    title_en: "Driving Licence / LLR",
    title_ta: "ஓட்டுநர் உரிமம் (LLR)",
    dept_en: "Transport Department",
    dept_ta: "போக்குவரத்துத் துறை",
    href: "https://parivahan.gov.in/",
    sla_en: "3 Days",
    sla_ta: "3 நாட்கள்",
    fee_en: "Statutory",
    fee_ta: "அரசு கட்டணம்",
    icon: "Briefcase",
  },
  {
    id: "mus-colls",
    title_en: "Find District Collector",
    title_ta: "மாவட்ட ஆட்சியர் தொடர்பு",
    dept_en: "District Administration",
    dept_ta: "மாவட்ட நிர்வாகம்",
    href: "/contact-directory?designation=Collector",
    sla_en: "Verified",
    sla_ta: "சரிபார்க்கப்பட்டது",
    fee_en: "Public Directory",
    fee_ta: "பொது கையேடு",
    icon: "Users",
  },
  {
    id: "mus-go",
    title_en: "Search Government Orders (G.O.)",
    title_ta: "அரசாணை தேடல் (G.O.)",
    dept_en: "Secretariat Departments",
    dept_ta: "தலைமைச் செயலகத் துறைகள்",
    href: "/documents",
    sla_en: "Machine Readable",
    sla_ta: "பதிவிறக்கம்",
    fee_en: "Free Access",
    fee_ta: "கட்டணமில்லை",
    icon: "FileCheck2",
  },
];

// 4. Section 7: 38 Districts Directory Mapping
export const TN_DISTRICTS_LIST = [
  { id: "DIS-01", name_en: "Ariyalur", name_ta: "அரியலூர்", collector_en: "District Collector, Ariyalur", phone: "04329-228200" },
  { id: "DIS-02", name_en: "Chengalpattu", name_ta: "செங்கல்பட்டு", collector_en: "District Collector, Chengalpattu", phone: "044-27427412" },
  { id: "DIS-03", name_en: "Chennai", name_ta: "சென்னை", collector_en: "District Collector, Chennai", phone: "044-25268320" },
  { id: "DIS-04", name_en: "Coimbatore", name_ta: "கோயம்புத்தூர்", collector_en: "District Collector, Coimbatore", phone: "0422-2301114" },
  { id: "DIS-05", name_en: "Cuddalore", name_ta: "கடலூர்", collector_en: "District Collector, Cuddalore", phone: "04142-230001" },
  { id: "DIS-06", name_en: "Dharmapuri", name_ta: "தருமபுரி", collector_en: "District Collector, Dharmapuri", phone: "04342-230500" },
  { id: "DIS-07", name_en: "Dindigul", name_ta: "திண்டுக்கல்", collector_en: "District Collector, Dindigul", phone: "0451-2461199" },
  { id: "DIS-08", name_en: "Erode", name_ta: "ஈரோடு", collector_en: "District Collector, Erode", phone: "0424-2266700" },
  { id: "DIS-09", name_en: "Kallakurichi", name_ta: "கள்ளக்குறிச்சி", collector_en: "District Collector, Kallakurichi", phone: "04151-226222" },
  { id: "DIS-10", name_en: "Kancheepuram", name_ta: "காஞ்சிபுரம்", collector_en: "District Collector, Kancheepuram", phone: "044-27237433" },
  { id: "DIS-11", name_en: "Kanniyakumari", name_ta: "கன்னியாகுமரி", collector_en: "District Collector, Nagercoil", phone: "04652-279555" },
  { id: "DIS-12", name_en: "Karur", name_ta: "கரூர்", collector_en: "District Collector, Karur", phone: "04324-257500" },
  { id: "DIS-13", name_en: "Krishnagiri", name_ta: "கிருஷ்ணகிரி", collector_en: "District Collector, Krishnagiri", phone: "04343-239500" },
  { id: "DIS-14", name_en: "Madurai", name_ta: "மதுரை", collector_en: "District Collector, Madurai", phone: "0452-2531110" },
  { id: "DIS-15", name_en: "Mayiladuthurai", name_ta: "மயிலாடுதுறை", collector_en: "District Collector, Mayiladuthurai", phone: "04364-222222" },
  { id: "DIS-16", name_en: "Nagapattinam", name_ta: "நாகப்பட்டினம்", collector_en: "District Collector, Nagapattinam", phone: "04365-252500" },
  { id: "DIS-17", name_en: "Namakkal", name_ta: "நாமக்கல்", collector_en: "District Collector, Namakkal", phone: "04286-281101" },
  { id: "DIS-18", name_en: "Nilgiris", name_ta: "நீலகிரி", collector_en: "District Collector, Udhagamandalam", phone: "0423-2442344" },
  { id: "DIS-19", name_en: "Perambalur", name_ta: "பெரம்பலூர்", collector_en: "District Collector, Perambalur", phone: "04328-225500" },
  { id: "DIS-20", name_en: "Pudukkottai", name_ta: "புதுக்கோட்டை", collector_en: "District Collector, Pudukkottai", phone: "04322-222222" },
  { id: "DIS-21", name_en: "Ramanathapuram", name_ta: "ராமநாதபுரம்", collector_en: "District Collector, Ramanathapuram", phone: "04567-230001" },
  { id: "DIS-22", name_en: "Ranipet", name_ta: "ராணிப்பேட்டை", collector_en: "District Collector, Ranipet", phone: "04172-273111" },
  { id: "DIS-23", name_en: "Salem", name_ta: "சேலம்", collector_en: "District Collector, Salem", phone: "0427-2452244" },
  { id: "DIS-24", name_en: "Sivaganga", name_ta: "சிவகங்கை", collector_en: "District Collector, Sivaganga", phone: "04575-240401" },
  { id: "DIS-25", name_en: "Tenkasi", name_ta: "தென்காசி", collector_en: "District Collector, Tenkasi", phone: "04633-290001" },
  { id: "DIS-26", name_en: "Thanjavur", name_ta: "தஞ்சாவூர்", collector_en: "District Collector, Thanjavur", phone: "04362-230101" },
  { id: "DIS-27", name_en: "Theni", name_ta: "தேனி", collector_en: "District Collector, Theni", phone: "04546-253627" },
  { id: "DIS-28", name_en: "Thoothukudi", name_ta: "தூத்துக்குடி", collector_en: "District Collector, Thoothukudi", phone: "0461-2340600" },
  { id: "DIS-29", name_en: "Tiruchirappalli", name_ta: "திருச்சிராப்பள்ளி", collector_en: "District Collector, Tiruchirappalli", phone: "0431-2415358" },
  { id: "DIS-30", name_en: "Tirunelveli", name_ta: "திருநெல்வேலி", collector_en: "District Collector, Tirunelveli", phone: "0462-2500828" },
  { id: "DIS-31", name_en: "Tirupathur", name_ta: "திருப்பத்தூர்", collector_en: "District Collector, Tirupathur", phone: "04179-222111" },
  { id: "DIS-32", name_en: "Tiruppur", name_ta: "திருப்பூர்", collector_en: "District Collector, Tiruppur", phone: "0421-2971100" },
  { id: "DIS-33", name_en: "Tiruvallur", name_ta: "திருவள்ளூர்", collector_en: "District Collector, Tiruvallur", phone: "044-27661600" },
  { id: "DIS-34", name_en: "Tiruvannamalai", name_ta: "திருவண்ணாமலை", collector_en: "District Collector, Tiruvannamalai", phone: "04175-233333" },
  { id: "DIS-35", name_en: "Tiruvarur", name_ta: "திருவாரூர்", collector_en: "District Collector, Tiruvarur", phone: "04366-223344" },
  { id: "DIS-36", name_en: "Vellore", name_ta: "வேலூர்", collector_en: "District Collector, Vellore", phone: "0416-2252501" },
  { id: "DIS-37", name_en: "Viluppuram", name_ta: "விழுப்புரம்", collector_en: "District Collector, Viluppuram", phone: "04146-222450" },
  { id: "DIS-38", name_en: "Virudhunagar", name_ta: "விருதுநகர்", collector_en: "District Collector, Virudhunagar", phone: "04562-252525" },
];
