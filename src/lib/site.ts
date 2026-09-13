// Fallback content, used only when the matching Sanity document is missing.
// The live values are edited in the Studio (/studio → Site settings).

export interface SiteContent {
  name: string;
  role: string;
  company: string;
  location: string;
  coordinates: string;
  summary: string;
  stack: string[];
  headlineInstrument: string;
  headlineDeepfield: string;
  headlineWorkshop: string;
  contactInstrument: string;
  contactInstrumentLink: string;
  contactDeepfield: string;
  contactDeepfieldEmphasis: string;
  email: string;
  github: string;
  linkedin: string;
  resume: string;
  school: string;
  degree: string;
  educationYears: string;
}

export const defaultSite: SiteContent = {
  name: "Anuj Karn",
  role: "Lead Full Stack Engineer",
  company: "PivotX Advisors",
  location: "New Delhi",
  coordinates: "28.6139° N, 77.2090° E",
  summary:
    "Six-plus years across React Native, React/TypeScript, and Python/Go/Node backends — now building agentic AI and data platforms on Databricks, GCP and Azure.",
  stack: ["python", "go", "typescript", "react native", "react", "next.js", "databricks", "gcp", "azure"],
  headlineInstrument: "Software that has to survive contact with the real world.",
  headlineDeepfield: "I build the quiet software behind loud machines.",
  headlineWorkshop: "Build it.\nShip it.\nKeep it running.",
  contactInstrument: "Working on something with atoms in it?",
  contactInstrumentLink: "Write to me.",
  contactDeepfield: "I read everything.",
  contactDeepfieldEmphasis: "Say hello.",
  email: "hello@anujkarn.dev",
  github: "https://github.com/anujkarn002",
  linkedin: "https://linkedin.com/in/anujkarn002",
  resume: "/resume/Anuj_Karn_Resume.pdf",
  school: "University of London",
  degree: "B.Sc. (Hons) Computer Science, Data Science",
  educationYears: "2020 — 2025",
};

export interface ExperienceItem {
  role: string;
  company: string;
  where: string;
  from: string;
  to: string;
  current: boolean;
  note: string;
}

export const defaultExperience: ExperienceItem[] = [
  {
    role: "Lead Full Stack Engineer",
    company: "PivotX Advisors",
    where: "New Delhi, India",
    from: "Apr 2025",
    to: "Present",
    current: true,
    note: "Architecture, AI engineering and delivery for an agentic data platform on Databricks and GCP; SSO and Unity Catalog access control; ISO 27001 / SOC 2-aligned lifecycle; leading engineers across front end, backend and data.",
  },
  {
    role: "Senior Software Engineer (Contract)",
    company: "Upstem Technologies",
    where: "Sydney, Australia · Remote",
    from: "Aug 2023",
    to: "Dec 2025",
    current: false,
    note: "Architected a sports social app in React Native and led five mobile developers; white-label platform serving multiple brands from one codebase; Stripe, Fastlane and GitHub Actions CI/CD.",
  },
  {
    role: "Software Engineer",
    company: "Leapfrog Technology",
    where: "Kathmandu, Nepal",
    from: "Sep 2021",
    to: "Aug 2023",
    current: false,
    note: "Offline-first inventory tracking in React Native and Go; a HIPAA-compliant booking app for a US healthcare provider; Mapbox integration for last-mile logistics.",
  },
  {
    role: "Software Engineer",
    company: "Sunya Health Solutions",
    where: "Kathmandu, Nepal",
    from: "Nov 2019",
    to: "Sep 2021",
    current: false,
    note: "OpenCV bridged into React Native over JSI for on-device diagnostics; an offline sync engine for rural health screening; regional wallet and subscription payments.",
  },
];
