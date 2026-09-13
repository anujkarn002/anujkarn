import { notFound } from "next/navigation";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { getPostBySlug } from "../../../../../sanity/lib/queries";
import { urlForImage } from "../../../../../sanity/lib/image";

export default async function PostDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center font-mono text-white">
      <article className="flex flex-col items-center w-full px-6 pt-24 pb-16" style={{ minHeight: '70vh' }}>
        <div className="w-full max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-orbitron font-black text-white mb-4 tracking-tight retro-shadow glow-text-cyan">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-2 mb-6">
            {post.tags?.map((tag) => (
              <span key={tag} className="inline-block bg-white/10 text-white/60 text-xs px-2 py-0.5 rounded">{tag}</span>
            ))}
            <span className="text-xs text-white/30">
              {new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric" }).format(new Date(post.publishedAt))}
            </span>
          </div>
          {post.coverImageUrl && (
            <div className="relative w-full aspect-video mb-8 rounded-lg overflow-hidden hud-panel">
              <Image src={post.coverImageUrl} alt={post.title} fill className="object-cover" sizes="640px" />
            </div>
          )}
          <div className="post-body text-white/80">
            {post.body ? (
              <PortableText
                value={post.body}
                components={{
                  types: {
                    image: ({ value }) => (
                      <div className="relative w-full aspect-video my-6 rounded-lg overflow-hidden">
                        <Image src={urlForImage(value).width(1000).url()} alt="" fill className="object-cover" />
                      </div>
                    ),
                  },
                }}
              />
            ) : (
              <p className="text-white/50">{post.excerpt}</p>
            )}
          </div>
        </div>
      </article>
    </main>
  );
}
