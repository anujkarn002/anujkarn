import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { orbitron, exo, roboto } from "../fonts";
import "./globals.css";
import { ThemeProvider } from "../components/ui/ThemeProvider";
import { SiteLayout } from "../components/layout/SiteLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anuj Karn | Portfolio",
  description: "Portfolio of Anuj Karn - Software Engineer, Space & Technology Enthusiast. Projects, posts, activities, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={[
          geistSans.variable,
          geistMono.variable,
          orbitron.variable,
          exo.variable,
          roboto.variable,
          "antialiased"
        ].join(" ")}
      >
        <ThemeProvider>
          {/* Removed Cosmic3DScene and all celestial objects for now */}
          <SiteLayout>
            {children}
          </SiteLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
