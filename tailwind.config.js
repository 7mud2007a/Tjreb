/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        chocolate: {
          dark: "#1A0F0B",
          deep: "#2A1810",
          medium: "#3D2318",
          light: "#5A3826",
        },
        cocoa: {
          deep: "#140A07",
          warm: "#23120B",
        },
        gold: {
          champagne: "#D4AF37",
          bright: "#F3E5AB",
          soft: "#E6CA65",
          dark: "#997A15",
        },
        cream: {
          warm: "#FAF6EE",
          soft: "#F3ECE1",
          gold: "#EFE8D8",
        },
      },
      fontFamily: {
        arabic: ['Tajawal', 'Readex Pro', 'sans-serif'],
      },
      backgroundImage: {
        'radial-gold': 'radial-gradient(circle, rgba(212,175,55,0.15) 0%, rgba(26,15,11,0) 70%)',
        'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #F3E5AB 50%, #997A15 100%)',
      },
    },
  },
  plugins: [],
};
