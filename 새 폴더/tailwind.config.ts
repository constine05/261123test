import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ue: {
          bg: "#0B0E14",
          card: "#121721",
          cardHover: "#18202F",
          border: "#1E293B",
          primary: "#0EA5E9", // Unreal Sky Blue
          primaryGlow: "#38BDF8",
          blueprint: "#F59E0B", // Blueprint Orange/Amber
          cpp: "#8B5CF6", // C++ Violet
          lumen: "#10B981", // Lumen Emerald
          accent: "#6366F1",
          muted: "#94A3B8",
          dark: "#080A0F"
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"]
      }
    },
  },
  plugins: [],
};
export default config;
