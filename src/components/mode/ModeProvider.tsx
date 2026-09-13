"use client";
import { createContext, useCallback, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { MODE_COOKIE, type Mode } from "../../lib/mode";

const ModeContext = createContext<{ mode: Mode; setMode: (m: Mode) => void } | null>(null);

export function ModeProvider({ initialMode, children }: { initialMode: Mode; children: React.ReactNode }) {
  const [mode, setModeState] = useState<Mode>(initialMode);
  const router = useRouter();

  const setMode = useCallback(
    (next: Mode) => {
      setModeState(next);
      document.documentElement.dataset.mode = next;
      document.cookie = `${MODE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
      router.refresh();
    },
    [router]
  );

  return <ModeContext.Provider value={{ mode, setMode }}>{children}</ModeContext.Provider>;
}

export function useMode() {
  const ctx = useContext(ModeContext);
  if (!ctx) throw new Error("useMode must be used inside ModeProvider");
  return ctx;
}
