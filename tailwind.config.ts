import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#0B1F3A",
          royalblue: "#123C69",
          gold: "#D4AF37",
          white: "#FFFFFF",
          lightgrey: "#F8FAFC",
          emerald: "#50C878",
          whatsapp: "#25D366",
        },
      },
    },
  },
  plugins: [],
};
export default config;
