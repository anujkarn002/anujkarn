import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getFlavor } from "../../../../../lib/flavor.server";
import { getPostBySlug, getSite } from "../../../../../sanity/lib/queries";
import Contact from "../../../../../components/sections/Contact";
import PostBody, { PostFigure } from "../../../../../components/sections/PostBody";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Anuj Karn`,
    description: post.excerpt,
    openGraph: post.coverImageUrl ? { images: [{ url: post.coverImageUrl }] } : undefined,
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [flavor, site, post] = await Promise.all([getFlavor(), getSite(), getPostBySlug(slug)]);
  if (!post) notFound();

  const date = new Intl.DateTimeFormat("en", { year: "numeric", month: "long", day: "numeric" }).format(new Date(post.publishedAt));

  return (
    <>
      <article className={`${flavor === "workshop" ? "px-6" : "gutter"} pt-16 md:pt-24 pb-8`}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-8">
          <div className="md:col-span-3 flex flex-col gap-1.5">
            <div className="label">{date}</div>
            {post.tags && post.tags.length > 0 && <div className="label">{post.tags.join(" · ")}</div>}
            <Link href="/writing" className="label mt-4" style={{ color: "var(--fg)" }}>
              ← All writing
            </Link>
          </div>
          <div className="md:col-start-4 md:col-span-7 flex flex-col gap-6">
            <h1
              className={`display m-0 ${flavor === "workshop" ? "uppercase" : ""}`}
              style={{
                fontSize: "clamp(40px, 5.5vw, 76px)",
                lineHeight: 0.98,
                letterSpacing: flavor === "workshop" ? "-0.04em" : "-0.025em",
                textWrap: "balance",
              }}
            >
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="m-0" style={{ fontSize: 21, lineHeight: 1.45, color: "var(--muted)", fontWeight: flavor === "deepfield" ? 300 : undefined }}>
                {post.excerpt}
              </p>
            )}
            {post.cover && <PostFigure value={post.cover} priority />}
            {post.body ? <PostBody value={post.body} /> : null}
          </div>
        </div>
      </article>
      <Contact flavor={flavor} site={site} />
    </>
  );
}
