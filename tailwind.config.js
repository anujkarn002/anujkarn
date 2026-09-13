/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#5ee7ff', // Futuristic electric blue
          strong: '#00baff',
        },
        amber: {
          DEFAULT: '#ffb02e', // Mechanical / warning-light accent
          strong: '#ff8c00',
        },
        'matte-black': '#181818',
        background: '#0a0a0a',
        foreground: '#ededed',
        white: '#fff',
      },
      boxShadow: {
        'accent-glow': '0 0 8px 2px #5ee7ff80',
        'amber-glow': '0 0 8px 2px #ffb02e80',
        'lg': '0 0 24px 2px rgba(255,255,255,0.15)',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
        orbitron: ['var(--font-orbitron)', 'sans-serif'],
        exo: ['var(--font-exo)', 'sans-serif'],
        robotic: ['var(--font-roboto)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
