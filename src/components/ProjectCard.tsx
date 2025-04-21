import React from "react";
import { FaRegFolderOpen } from "react-icons/fa";
import Link from "next/link";

interface ProjectCardProps {
  id?: string;
  title: string;
  description: string;
  link?: string;
  tags?: string[];
  featured?: boolean;
}

export default function ProjectCard({ id, title, description, link, tags = [], featured }: ProjectCardProps) {
  return (
    <div className={`mb-8 p-5 bg-matte-black border border-white/10 rounded-lg shadow-none hover:bg-white/5 transition group ${featured ? 'border-white/30' : ''}`}>
      <div className="flex items-center gap-2 mb-2">
        <FaRegFolderOpen className="text-white/40 text-lg" />
        <Link href={`/projects/${id}`} className="text-xl font-bold text-white retro-section mb-0 underline-offset-2 hover:underline">
          {title}
        </Link>
        {featured && (
          <span className="ml-2 px-2 py-0.5 rounded-full bg-white/10 text-white/80 text-xs font-semibold tracking-wide border border-white/30">Featured</span>
        )}
      </div>
      <p className="text-white/70 mb-2 text-sm">{description}</p>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((tag, idx) => (
            <span key={idx} className="inline-block bg-white/10 text-white/60 text-xs px-2 py-0.5 rounded">{tag}</span>
          ))}
        </div>
      )}
      {link && (
        <a href={link} target="_blank" rel="noopener noreferrer" className="retro-link inline-block mt-2">View Project ↗</a>
      )}
    </div>
  );
}
