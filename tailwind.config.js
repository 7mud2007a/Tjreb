/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        chocolate: "#632709",
        "chocolate-deep": "#3B1605",
        "chocolate-dark": "#241006",
        champagne: "#FFDB94",
        cream: "#FFF7E8",
        muted: "#D8C8AE",
      },
      fontFamily: {
        sans: ["Tajawal", "Readex Pro", "sans-serif"],
      },
    },
  },
  plugins: [],
};
