import {
  Instrument_Serif,
  Instrument_Sans,
  IBM_Plex_Mono,
  Newsreader,
  JetBrains_Mono,
  Archivo,
  Space_Mono,
} from "next/font/google";

export const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
});

export const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-instrument-sans",
});

export const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
});

export const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-jetbrains-mono",
});

export const archivo = Archivo({
  subsets: ["latin"],
  weight: ["500", "800", "900"],
  variable: "--font-archivo",
});

export const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
});

export const fontVariables = [
  instrumentSerif.variable,
  instrumentSans.variable,
  plexMono.variable,
  newsreader.variable,
  jetbrainsMono.variable,
  archivo.variable,
  spaceMono.variable,
].join(" ");
