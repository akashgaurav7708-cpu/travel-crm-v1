import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#0D3B66", // Deep Royal Blue
          emerald: "#2E8B57", // Emerald Green
          gold: "#D4AF37", // Luxury Gold
          white: "#FFFFFF",
          dark: "#222222", // Dark Charcoal
        },
        luxury: {
          blue: "#0D3B66",
          emerald: "#2E8B57",
          gold: "#D4AF37",
          dark: "#222222",
        }
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "serif"], // Headings
        sans: ["var(--font-poppins)", "sans-serif"], // Body
        display: ["var(--font-montserrat)", "sans-serif"], // Buttons
      }
    },
  },
  plugins: [],
};
export default config;
