/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#242424",
        light: "#ffffff",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false
  }
};
