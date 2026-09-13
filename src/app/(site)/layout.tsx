import type { Metadata } from "next";
import "../globals.css";
import { fontVariables } from "../../fonts";
import { getFlavor } from "../../lib/flavor.server";
import { getThemeChoice } from "../../lib/theme.server";
import { resolveTheme } from "../../lib/theme";
import { getSite } from "../../sanity/lib/queries";
import { FlavorProvider } from "../../components/flavor/FlavorProvider";
import Nav from "../../components/sections/Nav";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return {
    title: `${site.name} — ${site.role}`,
    description: site.summary,
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [flavor, themeChoice, site] = await Promise.all([getFlavor(), getThemeChoice(), getSite()]);
  const theme = resolveTheme(flavor, themeChoice);

  return (
    <html lang="en" data-flavor={flavor} data-theme={theme} className={fontVariables}>
      <body>
        <FlavorProvider initialFlavor={flavor} initialThemeChoice={themeChoice}>
          <Nav flavor={flavor} site={site} />
          <main>{children}</main>
        </FlavorProvider>
      </body>
    </html>
  );
}
