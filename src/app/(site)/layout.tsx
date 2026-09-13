import type { Metadata } from "next";
import "../globals.css";
import { fontVariables } from "../../fonts";
import { getMode } from "../../lib/mode.server";
import { getSite } from "../../sanity/lib/queries";
import { ModeProvider } from "../../components/mode/ModeProvider";
import Nav from "../../components/sections/Nav";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return {
    title: `${site.name} — ${site.role}`,
    description: site.summary,
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [mode, site] = await Promise.all([getMode(), getSite()]);

  return (
    <html lang="en" data-mode={mode} className={fontVariables}>
      <body>
        <ModeProvider initialMode={mode}>
          <Nav mode={mode} site={site} />
          <main>{children}</main>
        </ModeProvider>
      </body>
    </html>
  );
}
