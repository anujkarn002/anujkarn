import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { projectId, dataset, isSanityConfigured } from "../../../../sanity/env";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isSanityConfigured || !process.env.SANITY_API_TOKEN) {
    return NextResponse.json({ skipped: true, reason: "Sanity project ID or API token not configured" });
  }

  const exportUrl = `https://${projectId}.api.sanity.io/v1/data/export/${dataset}`;
  const res = await fetch(exportUrl, {
    headers: { Authorization: `Bearer ${process.env.SANITY_API_TOKEN}` },
  });

  if (!res.ok || !res.body) {
    return NextResponse.json({ error: `Sanity export failed with status ${res.status}` }, { status: 502 });
  }

  const date = new Date().toISOString().slice(0, 10);
  const blob = await put(`backups/sanity-${date}.ndjson`, res.body, {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
  });

  return NextResponse.json({ ok: true, url: blob.url });
}
