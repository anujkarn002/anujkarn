"use client";
import React from "react";
import Link from "next/link";
import { FaRegFileAlt, FaRegFolderOpen } from "react-icons/fa";

export interface ActivityItem {
  type: "Post" | "Project";
  id: string;
  title: string;
  date: string;
  tags?: string[];
}

export default function ActivityList({ activities }: { activities: ActivityItem[] }) {
  const [sort, setSort] = React.useState<"desc" | "asc">("desc");
  const sorted = [...activities].sort((a, b) =>
    sort === "desc" ? new Date(b.date).getTime() - new Date(a.date).getTime() : new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <>
      <div className="flex gap-4 mb-6">
        <button onClick={() => setSort("desc")} className={`retro-link px-4 py-1 ${sort === "desc" ? "bg-white/10" : ""}`}>Newest First</button>
        <button onClick={() => setSort("asc")} className={`retro-link px-4 py-1 ${sort === "asc" ? "bg-white/10" : ""}`}>Oldest First</button>
      </div>
      <div className="flex gap-4 mb-8">
        <Link href="/projects" className="retro-link px-4 py-1">View all projects</Link>
        <Link href="/posts" className="retro-link px-4 py-1">View all posts</Link>
      </div>
      <ul className="w-full max-w-2xl flex flex-col gap-4">
        {sorted.map((item, i) => (
          <li key={`${item.type}-${item.id}-${i}`} className="hud-panel rounded px-4 py-3 flex flex-col group hover:bg-white/5 transition">
            <span className="flex items-center gap-2">
              {item.type === "Post" ? (
                <FaRegFileAlt className="text-xs text-accent/70" />
              ) : (
                <FaRegFolderOpen className="text-xs text-amber/70" />
              )}
              <Link
                href={item.type === "Post" ? `/posts/${item.id}` : `/projects/${item.id}`}
                className="block text-white underline-offset-2 group-hover:underline transition"
              >
                {item.title}
              </Link>
            </span>
            <span className="flex items-center gap-2 mt-0.5">
              <span className="inline-block bg-white/10 text-white/60 text-xs px-2 py-0.5 rounded">{item.type}</span>
              <span className="text-xs text-white/50">{item.tags && item.tags.join(", ")}</span>
              <span className="text-xs text-white/30">{item.date}</span>
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}
