/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep Green Palette - No warm tones
        green: {
          darkest: '#051F20',
          darker: '#0B2B26',
          dark: '#163832',
          medium: '#235347',
          light: '#8EB69B',
          lightest: '#DAF1DE',
        },
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(circle at 30% 40%, #235347 0%, #163832 35%, #0B2B26 65%, #051F20 100%)',
        'glow-green': 'radial-gradient(circle, rgba(142, 182, 155, 0.25) 0%, rgba(142, 182, 155, 0.15) 40%, transparent 70%)',
      },
      animation: {
        'pulse-green': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}