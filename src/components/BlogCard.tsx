import React from "react";

interface BlogCardProps {
  title: string;
  description: string;
  link?: string;
}

export default function BlogCard({ title, description, link }: BlogCardProps) {
  return (
    <div className="mb-6 p-5 bg-matte-black border border-white/10 rounded-lg shadow-none hover:shadow-lg transition">
      <h3 className="text-xl font-bold text-white mb-1 retro-section">{title}</h3>
      <p className="text-white/70 mb-2 text-sm">{description}</p>
      {link && (
        <a href={link} target="_blank" rel="noopener noreferrer" className="retro-link inline-block mt-2">Read Blog</a>
      )}
    </div>
  );
}
