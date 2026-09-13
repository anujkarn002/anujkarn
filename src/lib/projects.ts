export interface Project {
  id: string;
  title: string;
  description: string;
  link?: string;
  stack: string[];
  year: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: "healthsync",
    title: "HealthSync",
    description: "HIPAA-compliant health screening app for remote areas.",
    link: "https://github.com/anujkarn/healthsync",
    stack: ["Android", "Django", "React"],
    year: "2023",
    featured: true,
  },
  {
    id: "space-visualizer",
    title: "Space Visualizer",
    description: "An interactive tool to visualize astronomical data and orbital mechanics.",
    link: "https://github.com/anujkarn/space-visualizer",
    stack: ["TypeScript", "Three.js"],
    year: "2023",
    featured: true,
  },
  {
    id: "ai-chatbot",
    title: "AI Chatbot",
    description: "Conversational assistant for developers, built on FastAPI and OpenAI APIs.",
    link: "https://github.com/anujkarn/ai-chatbot",
    stack: ["Python", "FastAPI", "OpenAI"],
    year: "2024",
  },
  {
    id: "blog-platform",
    title: "Blog Platform",
    description: "A markdown-powered blogging engine with a minimalist UI and fast search.",
    link: "https://github.com/anujkarn/blog-platform",
    stack: ["React", "Node.js"],
    year: "2023",
  },
];

export function getProject(id: string) {
  return projects.find((p) => p.id === id) ?? null;
}
