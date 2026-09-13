import { cookies } from "next/headers";
import { DEFAULT_FLAVOR, FLAVOR_COOKIE, isFlavor, type Flavor } from "./flavor";

export async function getFlavor(): Promise<Flavor> {
  const value = (await cookies()).get(FLAVOR_COOKIE)?.value;
  return isFlavor(value) ? value : DEFAULT_FLAVOR;
}
