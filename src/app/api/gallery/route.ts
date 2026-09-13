import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { sql, isDbConfigured } from "../../../lib/db";
import { getGalleryImages } from "../../../lib/gallery";

export async function GET() {
  const images = await getGalleryImages();
  return NextResponse.json({ images });
}

export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-upload-secret");
  if (!process.env.GALLERY_UPLOAD_SECRET || secret !== process.env.GALLERY_UPLOAD_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isDbConfigured) {
    return NextResponse.json({ error: "Gallery database is not configured" }, { status: 503 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const caption = (formData.get("caption") as string) || null;
  const tagsRaw = (formData.get("tags") as string) || "";
  const tags = tagsRaw.split(",").map((t) => t.trim()).filter(Boolean);
  const sortOrder = Number(formData.get("sortOrder") || 0);

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  }

  const blob = await put(`gallery/${Date.now()}-${file.name}`, file, {
    access: "public",
    addRandomSuffix: true,
  });

  const [row] = await sql!`
    insert into gallery_images (url, caption, tags, sort_order)
    values (${blob.url}, ${caption}, ${tags}, ${sortOrder})
    returning id, url, caption, tags, sort_order, created_at
  `;

  return NextResponse.json({ image: row }, { status: 201 });
}
