import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { getMode } from "../../../../../lib/mode.server";
import { getPostBySlug } from "../../../../../sanity/lib/queries";
import { urlForImage } from "../../../../../sanity/lib/image";
import Contact from "../../../../../components/sections/Contact";

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [mode, post] = await Promise.all([getMode(), getPostBySlug(slug)]);
  if (!post) notFound();

  const date = new Intl.DateTimeFormat("en", { year: "numeric", month: "long", day: "numeric" }).format(new Date(post.publishedAt));

  return (
    <>
      <article className={`${mode === "workshop" ? "px-6" : "gutter"} pt-16 md:pt-24`}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-8">
          <div className="md:col-span-3 flex flex-col gap-1.5">
            <div className="label">{date}</div>
            {post.tags && post.tags.length > 0 && <div className="label">{post.tags.join(" · ")}</div>}
            <Link href="/writing" className="label mt-4" style={{ color: "var(--fg)" }}>
              ← All writing
            </Link>
          </div>
          <div className="md:col-start-4 md:col-span-7 flex flex-col gap-10">
            <h1
              className={`display m-0 ${mode === "workshop" ? "uppercase" : ""}`}
              style={{ fontSize: "clamp(40px, 5.5vw, 76px)", lineHeight: 0.98, letterSpacing: mode === "workshop" ? "-0.04em" : "-0.025em", textWrap: "balance" }}
            >
              {post.title}
            </h1>
            {post.coverImageUrl && (
              <div className="relative w-full" style={{ aspectRatio: "16 / 9", background: "var(--surface)" }}>
                <Image src={post.coverImageUrl} alt="" fill className="object-cover" sizes="(max-width: 768px) 100vw, 800px" priority />
              </div>
            )}
            <div className="post-body">
              {post.body ? (
                <PortableText
                  value={post.body}
                  components={{
                    types: {
                      image: ({ value }) => (
                        <div className="relative w-full my-8" style={{ aspectRatio: "16 / 9", background: "var(--surface)" }}>
                          <Image src={urlForImage(value).width(1200).url()} alt="" fill className="object-cover" sizes="800px" />
                        </div>
                      ),
                    },
                  }}
                />
              ) : (
                <p>{post.excerpt}</p>
              )}
            </div>
          </div>
        </div>
      </article>
      <Contact mode={mode} />
    </>
  );
}
