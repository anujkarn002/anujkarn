"use client";
import { usePosts } from "../../../hooks/usePosts";
import { FaRegFileAlt } from "react-icons/fa";
import Link from "next/link";

export default function PostsPage() {
  const { posts } = usePosts();
  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center z-10 font-mono bg-matte-black text-white">
      <div className="flex flex-col items-center w-full px-6 pt-24 pb-12" style={{minHeight: '70vh'}}>
        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight text-center retro-shadow">Posts</h1>
        <div className="w-full max-w-2xl">
          {posts.map((post, idx) => (
            <div key={post.id || idx} className="mb-8 p-5 bg-matte-black border border-white/10 rounded-lg hover:bg-white/5 transition group">
              <div className="flex items-center gap-2 mb-2">
                <FaRegFileAlt className="text-white/40 text-lg" />
                <Link href={`/posts/${post.id}`} className="text-xl font-bold text-white retro-section mb-0 underline-offset-2 hover:underline">
                  {post.title}
                </Link>
              </div>
              <p className="text-white/70 mb-2 text-sm">{post.description}</p>
              <div className="flex flex-wrap gap-2 mb-2">
                {post.tags && post.tags.map((tag, idx) => (
                  <span key={idx} className="inline-block bg-white/10 text-white/60 text-xs px-2 py-0.5 rounded">{tag}</span>
                ))}
                <span className="text-xs text-white/30">{post.date}</span>
              </div>
              {post.link && (
                <a href={post.link} target="_blank" rel="noopener noreferrer" className="retro-link inline-block mt-2">Read Post ↗</a>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
