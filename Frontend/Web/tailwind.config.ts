import type { Config } from "tailwindcss";

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#F3A522',
        'navy-blue': '#003366',
      },
      fontFamily: {
        'sofia-pro': ['Sofia Pro', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
