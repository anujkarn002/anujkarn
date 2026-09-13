import { cookies } from "next/headers";
import { THEME_COOKIE, isTheme, type Theme } from "./theme";

export async function getThemeChoice(): Promise<Theme | null> {
  const value = (await cookies()).get(THEME_COOKIE)?.value;
  return isTheme(value) ? value : null;
}
