"use client";
import { createContext, useCallback, useContext, useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { FLAVOR_COOKIE, FLAVOR_LABELS, type Flavor } from "../../lib/flavor";
import { THEME_COOKIE, resolveTheme, type Theme } from "../../lib/theme";
import FlavorTransition from "./FlavorTransition";

const MIN_OVERLAY_MS = 700;
const COOKIE_OPTS = "path=/; max-age=31536000; samesite=lax";

interface FlavorContextValue {
  flavor: Flavor;
  setFlavor: (f: Flavor) => void;
  switching: boolean;
  theme: Theme;
  setTheme: (t: Theme) => void;
}

const FlavorContext = createContext<FlavorContextValue | null>(null);

export function FlavorProvider({
  initialFlavor,
  initialThemeChoice,
  children,
}: {
  initialFlavor: Flavor;
  initialThemeChoice: Theme | null;
  children: React.ReactNode;
}) {
  const [flavor, setFlavorState] = useState<Flavor>(initialFlavor);
  const [themeChoice, setThemeChoice] = useState<Theme | null>(initialThemeChoice);
  const [switching, setSwitching] = useState(false);
  const [isPending, startTransition] = useTransition();
  const startedAt = useRef(0);
  const router = useRouter();

  const theme = resolveTheme(flavor, themeChoice);

  const setFlavor = useCallback(
    (next: Flavor) => {
      if (next === flavor) return;
      startedAt.current = performance.now();
      setSwitching(true);
      setFlavorState(next);
      document.documentElement.dataset.flavor = next;
      document.documentElement.dataset.theme = resolveTheme(next, themeChoice);
      document.cookie = `${FLAVOR_COOKIE}=${next}; ${COOKIE_OPTS}`;
      startTransition(() => router.refresh());
    },
    [flavor, themeChoice, router]
  );

  const setTheme = useCallback((next: Theme) => {
    setThemeChoice(next);
    document.documentElement.dataset.theme = next;
    document.cookie = `${THEME_COOKIE}=${next}; ${COOKIE_OPTS}`;
  }, []);

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
    <FlavorContext.Provider value={{ flavor, setFlavor, switching, theme, setTheme }}>
      {children}
      <FlavorTransition active={switching} label={FLAVOR_LABELS[flavor].name} />
    </FlavorContext.Provider>
  );
}

export function useFlavor() {
  const ctx = useContext(FlavorContext);
  if (!ctx) throw new Error("useFlavor must be used inside FlavorProvider");
  return ctx;
}
