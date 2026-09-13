"use client";
import { useRouter } from "next/navigation";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <div className="relative min-h-screen w-full font-mono text-white">
      <button
        className="fixed top-20 left-6 retro-link text-xs px-4 py-1 z-40"
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
