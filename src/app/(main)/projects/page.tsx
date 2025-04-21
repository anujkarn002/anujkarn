"use client";
import BackgroundStars from "../../../components/BackgroundStars";
import ProjectCard from "../../../components/ProjectCard";
import { useProjects } from "../../../hooks/useProjects";

export default function ProjectsPage() {
  const { projects } = useProjects();
  return (
    <>
      <BackgroundStars />
      <main className="relative min-h-screen w-full flex flex-col items-center justify-center z-10 font-mono bg-matte-black text-white">
        <div className="flex flex-col items-center w-full px-6 pt-24 pb-12" style={{minHeight: '70vh'}}>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight text-center retro-shadow">Projects</h1>
          <div className="w-full max-w-2xl">
            {projects.map((project, idx) => (
              <ProjectCard key={project.id || idx} {...project} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
