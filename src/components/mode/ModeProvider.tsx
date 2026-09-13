"use client";
import { createContext, useCallback, useContext, useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { MODE_COOKIE, MODE_LABELS, type Mode } from "../../lib/mode";
import ModeTransition from "./ModeTransition";

const MIN_OVERLAY_MS = 700;

const ModeContext = createContext<{ mode: Mode; setMode: (m: Mode) => void; switching: boolean } | null>(null);

export function ModeProvider({ initialMode, children }: { initialMode: Mode; children: React.ReactNode }) {
  const [mode, setModeState] = useState<Mode>(initialMode);
  const [switching, setSwitching] = useState(false);
  const [isPending, startTransition] = useTransition();
  const startedAt = useRef(0);
  const router = useRouter();

  const setMode = useCallback(
    (next: Mode) => {
      if (next === mode) return;
      startedAt.current = performance.now();
      setSwitching(true);
      setModeState(next);
      document.documentElement.dataset.mode = next;
      document.cookie = `${MODE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
      startTransition(() => router.refresh());
    },
    [mode, router]
  );

  useEffect(() => {
    if (!switching || isPending) return;
    let cancelled = false;
    const finish = async () => {
      await document.fonts?.ready;
      const remaining = MIN_OVERLAY_MS - (performance.now() - startedAt.current);
      if (remaining > 0) await new Promise((r) => setTimeout(r, remaining));
      if (!cancelled) setSwitching(false);
    };
    finish();
    return () => {
      cancelled = true;
    };
  }, [switching, isPending]);

  return (
    <ModeContext.Provider value={{ mode, setMode, switching }}>
      {children}
      <ModeTransition active={switching} label={MODE_LABELS[mode].name} />
    </ModeContext.Provider>
  );
}

export function useMode() {
  const ctx = useContext(ModeContext);
  if (!ctx) throw new Error("useMode must be used inside ModeProvider");
  return ctx;
}
