import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        mono:    ['"DM Mono"', '"Courier New"', 'monospace'],
      },
      colors: {
        ink:   '#080604',
        parch: '#EDE0C8',
        amber: '#B8813E',
        roast: '#3D2A14',
        umber: '#6B5240',
      },
    },
  },
  plugins: [],
};

export default config;
