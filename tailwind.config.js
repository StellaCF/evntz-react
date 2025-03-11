/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
     height: {
      hero: "80vh",
      viewheight: "87vh"
     },
     fontFamily: {
      poppins: ["poppins", "sans-serif"],
      playfair: ["Playfair Display", "serif"]
     },
     backgroundColor: {
      bgColor: "#0d162e"
     },
     borderRadius: {
      half: "10px 10px 0 0",
      down: "0 0 10px 10px"
     }
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none', /* IE and Edge */
          'scrollbar-width': 'none', /* Firefox */
        },
        '.scrollbar-hide::-webkit-scrollbar': {
          display: 'none', /* Chrome, Safari, and Opera */
        },
      });
    },
  ],
}

