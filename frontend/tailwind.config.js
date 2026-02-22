/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          darkest: '#0F1115',
          dark: '#171A1F',
          base: '#1E2228',
        },
        copper: {
          DEFAULT: '#C47A4A',
          light: '#E09A67',
        },
        text: {
          primary: '#F2F2F2',
          secondary: '#B5B5B5',
        },
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(180deg, #0F1115 0%, #171A1F 40%, #1E2228 100%)',
        'copper-glow': 'radial-gradient(circle at 50% 40%, rgba(196,122,74,0.25) 0%, rgba(196,122,74,0.15) 40%, transparent 70%)',
      },
    },
  },
  plugins: [],
}