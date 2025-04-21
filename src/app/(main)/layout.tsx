"use client";
import { useRouter } from "next/navigation";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <div className="relative min-h-screen w-full font-mono bg-matte-black text-white">
      <button
        className="absolute top-8 left-8 retro-link text-xs px-4 py-1 z-20"
        onClick={() => {
          if (window.history.length > 1) router.back();
          else router.push("/");
        }}
      >
        ← Back
      </button>
      {children}
    </div>
  );
}
