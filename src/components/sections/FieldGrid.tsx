"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import type { Photo } from "../../sanity/lib/queries";

export default function FieldGrid({ photos, columns, gap = 8 }: { photos: Photo[]; columns: string; gap?: number }) {
  const [active, setActive] = useState<Photo | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <>
      <div className={`grid ${columns}`} style={{ gap }}>
        {photos.map((p) => (
          <button
            key={p.id}
            onClick={() => setActive(p)}
            className="relative overflow-hidden group"
            style={{ aspectRatio: "1", background: "var(--surface)" }}
            aria-label={p.caption || "Open photograph"}
          >
            <Image
              src={p.url}
              alt={p.caption || ""}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </button>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ background: "color-mix(in srgb, var(--bg) 94%, transparent)" }}
          onClick={() => setActive(null)}
        >
          <button className="label absolute top-6 right-6" style={{ color: "var(--fg)" }} onClick={() => setActive(null)}>
            Close
          </button>
          <div
            className="relative w-full max-h-[85vh]"
            style={{ maxWidth: `min(90vw, ${(85 * active.width) / active.height}vh)`, aspectRatio: `${active.width} / ${active.height}` }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image src={active.url} alt={active.caption || ""} fill className="object-contain" sizes="90vw" priority />
          </div>
          {active.caption && (
            <p className="label absolute bottom-8 left-0 right-0 text-center px-6" style={{ color: "var(--fg)" }}>
              {active.caption}
            </p>
          )}
        </div>
      )}
    </>
  );
}
