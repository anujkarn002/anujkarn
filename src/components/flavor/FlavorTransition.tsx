"use client";
import { useEffect, useState } from "react";

const BARS: [string, string][] = [
  ["46%", "clamp(40px, 6vw, 88px)"],
  ["72%", "clamp(40px, 6vw, 88px)"],
  ["38%", "18px"],
  ["54%", "18px"],
  ["30%", "18px"],
];

export default function FlavorTransition({ active, label }: { active: boolean; label: string }) {
  const [mounted, setMounted] = useState(active);

  useEffect(() => {
    if (active) {
      setMounted(true);
      return;
    }
    const t = setTimeout(() => setMounted(false), 350);
    return () => clearTimeout(t);
  }, [active]);

  if (!mounted) return null;

  return (
    <div
      aria-live="polite"
      aria-busy={active}
      className="fixed inset-0 z-[100] flex flex-col"
      style={{
        background: "var(--bg)",
        color: "var(--fg)",
        opacity: active ? 1 : 0,
        transition: "opacity 0.35s ease",
        pointerEvents: active ? "auto" : "none",
      }}
    >
      <div className="gutter flex items-center justify-between py-9">
        <span className="skeleton" style={{ width: 64, height: 12 }} />
        <span className="skeleton" style={{ width: 220, height: 12 }} />
      </div>
      <div className="gutter flex flex-col gap-5 pt-16 md:pt-32">
        {BARS.map(([w, h], i) => (
          <span key={i} className="skeleton" style={{ width: w, height: h, animationDelay: `${i * 80}ms` }} />
        ))}
      </div>
      <div className="gutter mt-auto pb-10 flex items-center gap-3">
        <span className="spinner" aria-hidden="true" />
        <span className="label" style={{ color: "var(--fg)" }}>
          Switching to {label}
        </span>
      </div>
    </div>
  );
}
