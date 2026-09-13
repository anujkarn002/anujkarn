import { cookies } from "next/headers";
import { DEFAULT_MODE, MODE_COOKIE, isMode, type Mode } from "./mode";

export async function getMode(): Promise<Mode> {
  const value = (await cookies()).get(MODE_COOKIE)?.value;
  return isMode(value) ? value : DEFAULT_MODE;
}
