import BlogCard from "../../../../components/BlogCard";
import { getAllPosts } from "../../../../sanity/lib/queries";
import { isSanityConfigured } from "../../../../sanity/env";

export default async function PostsPage() {
  const posts = await getAllPosts();

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center font-mono text-white">
      <div className="flex flex-col items-center w-full px-6 pt-24 pb-12" style={{ minHeight: '70vh' }}>
        <h1 className="text-4xl md:text-6xl font-orbitron font-black text-white mb-6 tracking-tight text-center retro-shadow glow-text-cyan">Posts</h1>
        <div className="w-full max-w-2xl">
          {posts.length === 0 && (
            <p className="text-white/50 text-center text-sm hud-panel rounded-lg p-6">
              {isSanityConfigured
                ? "No posts published yet — check back soon."
                : "Blog isn't connected yet. Once Sanity is configured, posts will appear here."}
            </p>
          )}
          {posts.map((post) => (
            <BlogCard
              key={post._id}
              slug={post.slug}
              title={post.title}
              excerpt={post.excerpt}
              coverImageUrl={post.coverImageUrl}
              tags={post.tags}
              publishedAt={post.publishedAt}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
