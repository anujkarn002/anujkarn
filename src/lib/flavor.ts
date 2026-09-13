export const FLAVORS = ["instrument", "deepfield", "workshop"] as const;
export type Flavor = (typeof FLAVORS)[number];

export const DEFAULT_FLAVOR: Flavor = "deepfield";
export const FLAVOR_COOKIE = "design-flavor";

export const FLAVOR_LABELS: Record<Flavor, { short: string; name: string; blurb: string }> = {
  instrument: { short: "A", name: "Instrument", blurb: "Paper, serif, schematic" },
  deepfield: { short: "B", name: "Deep Field", blurb: "Dark, editorial, quiet" },
  workshop: { short: "C", name: "Workshop", blurb: "Charcoal, grid, dense" },
};

export function isFlavor(value: unknown): value is Flavor {
  return typeof value === "string" && (FLAVORS as readonly string[]).includes(value);
}
