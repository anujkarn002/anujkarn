export const MODES = ["instrument", "deepfield", "workshop"] as const;
export type Mode = (typeof MODES)[number];

export const DEFAULT_MODE: Mode = "deepfield";
export const MODE_COOKIE = "design-mode";

export const MODE_LABELS: Record<Mode, { short: string; name: string; blurb: string }> = {
  instrument: { short: "A", name: "Instrument", blurb: "Paper, serif, schematic" },
  deepfield: { short: "B", name: "Deep Field", blurb: "Dark, editorial, quiet" },
  workshop: { short: "C", name: "Workshop", blurb: "Charcoal, grid, dense" },
};

export function isMode(value: unknown): value is Mode {
  return typeof value === "string" && (MODES as readonly string[]).includes(value);
}
