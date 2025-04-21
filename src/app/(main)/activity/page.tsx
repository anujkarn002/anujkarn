"use client";
import { useActivities } from "../../../hooks/useActivities";
import { FaRegFileAlt, FaRegFolderOpen } from "react-icons/fa";
import React from "react";
import Link from "next/link";

export default function ActivityPage() {
  const { activities } = useActivities();
  const [sort, setSort] = React.useState<'desc' | 'asc'>("desc");
  const sortedActivities = [...activities].sort((a, b) => sort === 'desc' ? new Date(b.date).getTime() - new Date(a.date).getTime() : new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center z-10 font-mono bg-matte-black text-white">
      <div className="flex flex-col items-center w-full px-6 pt-24 pb-12" style={{minHeight: '70vh'}}>
        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight text-center retro-shadow">Activity</h1>
        <div className="flex gap-4 mb-6">
          <Link href="#" onClick={(e) => { e.preventDefault(); setSort('desc'); }} className={`retro-link px-4 py-1 ${sort === 'desc' ? 'bg-white/10' : ''}`}>Newest First</Link>
          <Link href="#" onClick={(e) => { e.preventDefault(); setSort('asc'); }} className={`retro-link px-4 py-1 ${sort === 'asc' ? 'bg-white/10' : ''}`}>Oldest First</Link>
        </div>
        <div className="flex gap-4 mb-8">
          <Link href="/projects" className="retro-link px-4 py-1">View all projects</Link>
          <Link href="/posts" className="retro-link px-4 py-1">View all posts</Link>
        </div>
        <ul className="w-full max-w-2xl flex flex-col gap-4">
          {sortedActivities.map((item, i) => (
            <li key={i} className="text-base md:text-lg group hover:bg-white/5 transition rounded px-2 -mx-2 py-1 flex flex-col">
              <span className="flex items-center gap-2">
                {item.type === 'Post' ? (
                  <FaRegFileAlt className="text-xs text-white/40" />
                ) : (
                  <FaRegFolderOpen className="text-xs text-white/40" />
                )}
                <Link
                  href={item.type === 'Post' ? `/posts/${item.id}` : `/projects/${item.id}`}
                  className="block text-white underline-offset-2 group-hover:underline transition"
                >
                  {item.title}
                </Link>
              </span>
              <span className="flex items-center gap-2 mt-0.5">
                <span className="inline-block bg-white/10 text-white/60 text-xs px-2 py-0.5 rounded">
                  {item.type}
                </span>
                <span className="text-xs text-white/50">{item.tags && item.tags.join(', ')}</span>
                <span className="text-xs text-white/30">{item.date}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
