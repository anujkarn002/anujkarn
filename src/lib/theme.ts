import type { Flavor } from "./flavor";

export const THEMES = ["light", "dark"] as const;
export type Theme = (typeof THEMES)[number];

export const THEME_COOKIE = "theme";

// The look each flavor was designed in; used until a visitor chooses otherwise.
export const NATIVE_THEME: Record<Flavor, Theme> = {
  instrument: "light",
  deepfield: "dark",
  workshop: "dark",
};

export function isTheme(value: unknown): value is Theme {
  return typeof value === "string" && (THEMES as readonly string[]).includes(value);
}

export function resolveTheme(flavor: Flavor, choice: Theme | null): Theme {
  return choice ?? NATIVE_THEME[flavor];
}
