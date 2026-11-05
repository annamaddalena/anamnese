import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "pure-white": "#FFFFFF",
        "deep-forest": "#192715",
        "warm-cream": "#F2E2CB",
        "earth-brown": "#4C3926",
        error: "#B42318",
      },
      maxWidth: {
        content: "45rem",
        layout: "80rem",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
