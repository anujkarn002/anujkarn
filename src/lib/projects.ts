export interface Project {
  id: string;
  title: string;
  description: string;
  detail: string[];
  client: string;
  stack: string[];
  year: string;
  link?: string;
}

// Drawn from the CV. Employer work — no public links unless one is added.
export const projects: Project[] = [
  {
    id: "agentic-data-platform",
    title: "Agentic AI Data Platform",
    description: "Architecture and delivery of an LLM-driven data platform on Databricks and GCP.",
    detail: [
      "End-to-end architecture: React front end, Python and Go microservices on Cloud Run, Databricks Apps. Defined the service boundaries and request flows the whole engineering team builds against.",
      "LLM agent workflows and tool-use pipelines on Vertex AI and Claude, including automated code-review agents, plus the SOP governing how agents are built, evaluated and released.",
      "SSO with Unity Catalog row- and column-level access control, IAM-private service auth, Terraform-provisioned environments, and an ISO 27001 / SOC 2-aligned delivery lifecycle.",
    ],
    client: "PivotX Advisors",
    stack: ["Databricks", "GCP", "Python", "Go", "React"],
    year: "2025",
  },
  {
    id: "sports-social",
    title: "Sports Social Platform",
    description: "A React Native social app for sport, built from scratch and led through launch.",
    detail: [
      "Architected the app and led five mobile developers. Fastlane and GitHub Actions CI/CD halved App Store submission time.",
      "High-frequency highlights feed on AWS MediaConvert with custom video players — load times down 60%, 60fps sustained on low-end devices.",
    ],
    client: "Upstem Technologies",
    stack: ["React Native", "AWS MediaConvert", "Fastlane"],
    year: "2024",
  },
  {
    id: "white-label-community",
    title: "White-Label Community App",
    description: "One codebase serving multiple nonprofit and enterprise brands.",
    detail: [
      "Refactored a community-engagement app into a white-label platform using Android flavors and iOS schemes, so each brand ships from a single repository.",
      "Multi-currency Stripe and property-based theming for a PropTech rental product on the same foundation; Kotlin and Java bridges kept legacy background services alive through the native-to-React Native migration.",
    ],
    client: "Upstem Technologies",
    stack: ["React Native", "Stripe", "Redux Toolkit", "Kotlin"],
    year: "2024",
  },
  {
    id: "offline-inventory",
    title: "Offline Inventory Tracking",
    description: "Bulk material scanning for construction sites with no signal.",
    detail: [
      "React Native app with a Go backend for a construction-materials client; an offline queue lets crews scan in bulk in low-connectivity zones and reconcile later.",
      "Mapbox address suggestion and last-mile tracking for a sibling logistics app; trimmed API payloads cut field workers' mobile data use by 30%.",
    ],
    client: "Leapfrog Technology",
    stack: ["React Native", "Go", "Mapbox"],
    year: "2022",
  },
  {
    id: "hipaa-booking",
    title: "HIPAA Appointment Booking",
    description: "Appointment scheduling for a US healthcare provider.",
    detail: [
      "HIPAA-compliant booking app with a custom component library and multilingual form handling — user friction down 40%.",
    ],
    client: "Leapfrog Technology",
    stack: ["React Native", "TypeScript"],
    year: "2022",
  },
  {
    id: "point-of-care-diagnostics",
    title: "Point-of-Care Diagnostics",
    description: "On-device computer vision for reading urine test strips.",
    detail: [
      "Bridged OpenCV into React Native over JSI so test strips are analysed on the phone, no upload — diagnostic accuracy up 15%.",
      "A sync engine for the companion rural health-screening app reconciles local SQLite/Realm stores with a remote Django backend; regional wallet SDKs and in-app subscriptions lifted recurring revenue 25%.",
    ],
    client: "Sunya Health Solutions",
    stack: ["React Native", "OpenCV", "JSI", "Django"],
    year: "2021",
  },
];

export function getProject(id: string) {
  return projects.find((p) => p.id === id) ?? null;
}
