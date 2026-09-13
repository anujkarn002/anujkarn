"use client";
import { useParams, useRouter } from "next/navigation";
import { useProjects } from "../../../../../hooks/useProjects";
import { FaRegFolderOpen } from "react-icons/fa";

export default function ProjectDetailPage() {
  const { id } = useParams();
  const { projects } = useProjects();
  const router = useRouter();
  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen text-white">
        <div className="text-xl">Project not found.</div>
        <button className="retro-link mt-8" onClick={() => router.back()}>← Back</button>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center font-mono text-white">
      <div className="flex flex-col items-center w-full px-6 pt-24 pb-12" style={{ minHeight: '70vh' }}>
        <div className="hud-panel rounded-lg p-6 flex flex-col items-center max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
            <FaRegFolderOpen className="text-amber/70 text-2xl" />
            <h1 className="text-3xl md:text-5xl font-orbitron font-black text-white tracking-tight retro-shadow glow-text-cyan">{project.title}</h1>
          </div>
          <p className="text-white/70 mb-4 text-base md:text-lg text-center">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-4 justify-center">
            {project.tags && project.tags.map((tag, idx) => (
              <span key={idx} className="inline-block bg-white/10 text-white/60 text-xs px-2 py-0.5 rounded">{tag}</span>
            ))}
          </div>
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="retro-link inline-block mt-2">View Project ↗</a>
          )}
        </div>
      </div>
    </main>
  );
}
