import type { Metadata } from "next";
import "../globals.css";
import { fontVariables } from "../../fonts";
import { getMode } from "../../lib/mode.server";
import { ModeProvider } from "../../components/mode/ModeProvider";
import Nav from "../../components/sections/Nav";
import { site } from "../../lib/site";

export const metadata: Metadata = {
  title: `${site.name} — ${site.role}`,
  description: "Senior full-stack engineer building software for healthcare, finance and hardware teams.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const mode = await getMode();

  return (
    <html lang="en" data-mode={mode} className={fontVariables}>
      <body>
        <ModeProvider initialMode={mode}>
          <Nav mode={mode} />
          <main>{children}</main>
        </ModeProvider>
      </body>
    </html>
  );
}
