"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import type { GalleryImage } from "../../lib/gallery";

export default function FieldGrid({ images, columns, gap = 8 }: { images: GalleryImage[]; columns: string; gap?: number }) {
  const [active, setActive] = useState<GalleryImage | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <>
      <div className={`grid ${columns}`} style={{ gap }}>
        {images.map((img) => (
          <button
            key={img.id}
            onClick={() => setActive(img)}
            className="relative overflow-hidden group"
            style={{ aspectRatio: "1", background: "var(--surface)" }}
            aria-label={img.caption || "Open image"}
          >
            <Image
              src={img.url}
              alt={img.caption || ""}
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
          style={{ background: "color-mix(in srgb, var(--bg) 92%, transparent)" }}
          onClick={() => setActive(null)}
        >
          <button className="label absolute top-6 right-6" style={{ color: "var(--fg)" }} onClick={() => setActive(null)}>
            Close
          </button>
          <div className="relative w-full max-w-4xl" style={{ aspectRatio: "3 / 2" }} onClick={(e) => e.stopPropagation()}>
            <Image src={active.url} alt={active.caption || ""} fill className="object-contain" sizes="90vw" />
          </div>
          {active.caption && <p className="label absolute bottom-8 left-0 right-0 text-center px-6" style={{ color: "var(--fg)" }}>{active.caption}</p>}
        </div>
      )}
    </>
  );
}
