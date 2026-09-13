import GalleryGrid from "../../../../components/GalleryGrid";
import { getGalleryImages } from "../../../../lib/gallery";
import { isDbConfigured } from "../../../../lib/db";

export default async function GalleryPage() {
  const images = await getGalleryImages();

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center font-mono text-white">
      <div className="flex flex-col items-center w-full px-6 pt-24 pb-12" style={{ minHeight: '70vh' }}>
        <h1 className="text-4xl md:text-6xl font-orbitron font-black text-white mb-6 tracking-tight text-center retro-shadow glow-text-cyan">Gallery</h1>
        {images.length === 0 ? (
          <p className="text-white/50 text-center text-sm hud-panel rounded-lg p-6 max-w-md">
            {isDbConfigured
              ? "No images uploaded yet."
              : "Gallery isn't connected yet. Once Neon + Vercel Blob are configured, images will appear here."}
          </p>
        ) : (
          <GalleryGrid images={images} />
        )}
      </div>
    </main>
  );
}
