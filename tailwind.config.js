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
     },
     fontFamily: {
      poppins: ["poppins", "sans-serif"]
     },
     backgroundColor: {
      bgColor: "#0d162e"
     }
    },
  },
  plugins: [],
}

