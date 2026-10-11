/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Roboto Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
      colors: {
        kurio: {
          bg: "#140D0A",
          surface: "#241612",
          cream: "#F5F1EB",
          gold: "#B39463",
          sand: "#CFB28C",
          accent: "#D28A4C",
          "accent-hover": "#E89B55",
        },
      },
    },
  },
  plugins: [],
};