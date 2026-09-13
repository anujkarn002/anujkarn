"use client";
import { useState } from "react";
import Image from "next/image";
import { FaTimes } from "react-icons/fa";
import type { GalleryImage } from "../lib/gallery";

export default function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [active, setActive] = useState<GalleryImage | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full max-w-4xl">
        {images.map((img) => (
          <button
            key={img.id}
            onClick={() => setActive(img)}
            className="hud-panel tilt-card relative aspect-square rounded-lg overflow-hidden group"
          >
            <Image
              src={img.url}
              alt={img.caption || "Gallery image"}
              fill
              className="object-cover transition group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          </button>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-6"
          onClick={() => setActive(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/70 hover:text-white text-2xl"
            onClick={() => setActive(null)}
            aria-label="Close"
          >
            <FaTimes />
          </button>
          <div className="relative max-w-3xl w-full aspect-video" onClick={(e) => e.stopPropagation()}>
            <Image src={active.url} alt={active.caption || "Gallery image"} fill className="object-contain" sizes="90vw" />
          </div>
          {active.caption && (
            <p className="absolute bottom-8 text-white/70 text-sm text-center w-full px-6">{active.caption}</p>
          )}
        </div>
      )}
    </>
  );
}
