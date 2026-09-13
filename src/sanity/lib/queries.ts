import type { PortableTextBlock } from "@portabletext/react";
import { getClient } from "./client";
import { isSanityConfigured } from "../env";
import { urlForImage } from "./image";
import { defaultSite, defaultExperience, type SiteContent, type ExperienceItem } from "../../lib/site";
import { defaultProjects, type Project } from "../../lib/projects";

// Every fetcher falls back to the code defaults when Sanity is unreachable or
// the document doesn't exist, so the site never renders empty because of a
// missing CMS entry.
async function fetchOr<T>(query: string, params: Record<string, unknown>, fallback: T): Promise<T> {
  if (!isSanityConfigured) return fallback;
  try {
    const result = await getClient().fetch<T | null>(query, params);
    return result ?? fallback;
  } catch {
    return fallback;
  }
}

/* ---------- Site settings ---------- */

export async function getSite(): Promise<SiteContent> {
  const doc = await fetchOr<Partial<SiteContent> & { resumeUrl?: string | null } | null>(
    `*[_type == "settings" && _id == "settings"][0]{
      ..., "resumeUrl": resume.asset->url
    }`,
    {},
    null
  );
  if (!doc) return defaultSite;
  const merged: SiteContent = { ...defaultSite };
  for (const key of Object.keys(defaultSite) as (keyof SiteContent)[]) {
    const value = doc[key];
    if (key === "stack") {
      if (Array.isArray(value) && value.length) merged.stack = value as string[];
    } else if (typeof value === "string" && value.trim()) {
      (merged as unknown as Record<string, unknown>)[key] = value;
    }
  }
  if (doc.resumeUrl) merged.resume = doc.resumeUrl;
  return merged;
}

/* ---------- Experience ---------- */

export async function getExperience(): Promise<ExperienceItem[]> {
  const docs = await fetchOr<ExperienceItem[]>(
    `*[_type == "experience"] | order(order asc, _createdAt asc){
      role, company, where, from, to, "current": coalesce(current, false), "note": coalesce(note, "")
    }`,
    {},
    []
  );
  return docs.length ? docs : defaultExperience;
}

/* ---------- Projects ---------- */

const PROJECT_PROJECTION = `{
  "id": slug.current, title, description,
  "detail": coalesce(detail, []), "client": coalesce(client, ""),
  "stack": coalesce(stack, []), "year": coalesce(year, ""), link, image
}`;

function mapProject(doc: any): Project {
  return {
    ...doc,
    imageUrl: doc.image ? urlForImage(doc.image).width(1400).fit("max").url() : null,
  };
}

export async function getProjects(): Promise<Project[]> {
  const docs = await fetchOr<any[]>(
    `*[_type == "project" && defined(slug.current)] | order(order asc, _createdAt asc) ${PROJECT_PROJECTION}`,
    {},
    []
  );
  return docs.length ? docs.map(mapProject) : defaultProjects;
}

export async function getProject(id: string): Promise<Project | null> {
  const projects = await getProjects();
  return projects.find((p) => p.id === id) ?? null;
}

/* ---------- Photographs ---------- */

export interface Photo {
  id: string;
  url: string;
  width: number;
  height: number;
  caption: string | null;
  tags: string[];
}

export async function getPhotos(): Promise<Photo[]> {
  const docs = await fetchOr<any[]>(
    `*[_type == "photo" && defined(image.asset)] | order(order asc, _createdAt desc){
      _id, image, caption, "tags": coalesce(tags, []),
      "dims": image.asset->metadata.dimensions
    }`,
    {},
    []
  );
  return docs.map((d) => ({
    id: d._id,
    url: urlForImage(d.image).width(1600).fit("max").auto("format").url(),
    width: d.dims?.width ?? 1600,
    height: d.dims?.height ?? 1200,
    caption: d.caption ?? null,
    tags: d.tags,
  }));
}

/* ---------- Posts ---------- */

export interface PostImageAsset {
  url: string;
  width: number;
  height: number;
  extension: string;
}

export interface Post {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  tags?: string[];
  publishedAt: string;
  coverImageUrl?: string | null;
  cover?: { asset: PostImageAsset; alt?: string; caption?: string } | null;
  body?: PortableTextBlock[];
}

const IMAGE_ASSET = `"asset": asset->{ _id, url, extension, "width": metadata.dimensions.width, "height": metadata.dimensions.height }`;

const POST_PROJECTION = `{
  _id, title, "slug": slug.current, excerpt, tags, publishedAt,
  mainImage{ ..., ${IMAGE_ASSET} }
}`;

const POST_BODY = `body[]{ ..., _type == "image" => { ..., ${IMAGE_ASSET} } }`;

function mapPost(doc: any): Post {
  return {
    _id: doc._id,
    title: doc.title,
    slug: doc.slug,
    excerpt: doc.excerpt,
    tags: doc.tags,
    publishedAt: doc.publishedAt,
    coverImageUrl: doc.mainImage?.asset ? urlForImage(doc.mainImage).width(1600).fit("max").auto("format").url() : null,
    cover: doc.mainImage?.asset ? { asset: doc.mainImage.asset, alt: doc.mainImage.alt, caption: doc.mainImage.caption } : null,
    body: doc.body,
  };
}

export async function getAllPosts(): Promise<Post[]> {
  const docs = await fetchOr<any[]>(
    `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) ${POST_PROJECTION}`,
    {},
    []
  );
  return docs.map(mapPost);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const doc = await fetchOr<any | null>(
    `*[_type == "post" && slug.current == $slug][0]${POST_PROJECTION.replace(/\}$/, `, ${POST_BODY} }`)}`,
    { slug },
    null
  );
  return doc ? mapPost(doc) : null;
}
