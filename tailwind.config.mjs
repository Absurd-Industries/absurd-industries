/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        kraft: {
          DEFAULT: "#D4B896",
          light: "#E8D5B7",
          dark: "#B8956A",
        },
        ink: {
          DEFAULT: "#1A1A1A",
          light: "#3D3D3D",
          faint: "#4A3D2F",
        },
        stamp: {
          DEFAULT: "#D94800",
          dark: "#CC4700",
        },
        tape: "#F5E6C8",
        paper: "#FAF3E8",
        stencil: "#4A3D2F",
        funded: "#2A5F41",
      },
      fontFamily: {
        serif: ['"Fraunces"', "Georgia", "serif"],
        sans: ['"DM Sans"', "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
