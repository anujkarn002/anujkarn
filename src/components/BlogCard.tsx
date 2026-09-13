import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaRegFileAlt } from "react-icons/fa";

interface BlogCardProps {
  slug: string;
  title: string;
  excerpt?: string;
  coverImageUrl?: string | null;
  tags?: string[];
  publishedAt?: string;
}

export default function BlogCard({ slug, title, excerpt, coverImageUrl, tags = [], publishedAt }: BlogCardProps) {
  return (
    <Link href={`/posts/${slug}`} className="block group">
      <div className="hud-panel tilt-card mb-6 rounded-lg overflow-hidden bg-matte-black/60">
        {coverImageUrl && (
          <div className="relative w-full h-40">
            <Image src={coverImageUrl} alt={title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 640px" />
          </div>
        )}
        <div className="p-5">
          <div className="flex items-center gap-2 mb-1">
            <FaRegFileAlt className="text-white/40 text-sm" />
            <h3 className="text-xl font-bold text-white retro-section mb-0 group-hover:underline underline-offset-2">{title}</h3>
          </div>
          {excerpt && <p className="text-white/70 mb-2 text-sm">{excerpt}</p>}
          <div className="flex flex-wrap items-center gap-2">
            {tags.map((tag) => (
              <span key={tag} className="inline-block bg-white/10 text-white/60 text-xs px-2 py-0.5 rounded">{tag}</span>
            ))}
            {publishedAt && (
              <span className="text-xs text-white/30">
                {new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "numeric" }).format(new Date(publishedAt))}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
