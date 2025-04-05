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
        nunito: ["Nunito", "sans-serif"],
        notosansthai: ["noto-sans-thai", "sans-serif"],
      },
      animation: {
        'fade-in': 'fade-in 0.4s ease-out'
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
