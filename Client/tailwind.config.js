/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        dyslexic: ["OpenDyslexic", "Arial", "sans-serif"], 
        nunito: ["Nunito","sans-serif"],
        notosansthai:["noto-sans-thai","sans-serif"]// Ensure proper reference
      },
    },
  },
  plugins: [],
}
