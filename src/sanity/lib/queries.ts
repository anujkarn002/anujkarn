import { getClient } from "./client";
import { isSanityConfigured } from "../env";
import { urlForImage } from "./image";
import type { PortableTextBlock } from "@portabletext/react";

export interface Post {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  tags?: string[];
  publishedAt: string;
  coverImageUrl?: string | null;
  body?: PortableTextBlock[];
}

const POST_LIST_PROJECTION = `{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  tags,
  publishedAt,
  mainImage
}`;

function mapPost(doc: any): Post {
  return {
    _id: doc._id,
    title: doc.title,
    slug: doc.slug,
    excerpt: doc.excerpt,
    tags: doc.tags,
    publishedAt: doc.publishedAt,
    coverImageUrl: doc.mainImage ? urlForImage(doc.mainImage).width(800).height(450).fit("crop").url() : null,
    body: doc.body,
  };
}

export async function getAllPosts(): Promise<Post[]> {
  if (!isSanityConfigured) return [];
  const docs = await getClient().fetch(
    `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) ${POST_LIST_PROJECTION}`
  );
  return docs.map(mapPost);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (!isSanityConfigured) return null;
  const doc = await getClient().fetch(
    `*[_type == "post" && slug.current == $slug][0]${POST_LIST_PROJECTION.replace("}", ", body }")}`,
    { slug }
  );
  return doc ? mapPost(doc) : null;
}
