import { sql, isDbConfigured } from "./db";

export interface GalleryImage {
  id: number;
  url: string;
  caption: string | null;
  tags: string[];
  sort_order: number;
  created_at: string;
}

export async function getGalleryImages(): Promise<GalleryImage[]> {
  if (!isDbConfigured) return [];
  try {
    const rows = await sql!`
      select id, url, caption, tags, sort_order, created_at
      from gallery_images
      order by sort_order asc, created_at desc
    `;
    return rows as unknown as GalleryImage[];
  } catch {
    // Table not migrated yet (see sql/schema.sql) — treat as empty gallery.
    return [];
  }
}
