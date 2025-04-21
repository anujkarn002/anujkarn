import { Orbitron, Exo, Roboto } from 'next/font/google';

export const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  weight: ['600','700','900'],
});

export const exo = Exo({
  subsets: ['latin'],
  variable: '--font-exo',
  weight: ['400','500','700'],
});

export const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  weight: ['400','500'],
});
