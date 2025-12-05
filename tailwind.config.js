/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        petrol: {
          DEFAULT: '#0F4C5C',
          light: '#166073',
          dark: '#0a3642'
        },
        neon: {
          DEFAULT: '#27A0FF',
          hover: '#5cb8ff',
        },
        graphite: '#2E2E2E',
      }
    },
  },
  plugins: [],
}