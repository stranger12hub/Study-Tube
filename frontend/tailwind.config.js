/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // DARK GREEN BASE - Primary background
        dark: {
          base: '#051F20',
          secondary: '#0B2B26',
        },
        // CARD SURFACES
        card: {
          DEFAULT: '#163832',
          hover: '#235347',
        },
        // ACCENTS
        accent: {
          primary: '#8EB69B',
          light: '#DAF1DE',
        }
      },
      // Remove all default color utilities by not extending
      // This ensures ONLY our colors are available
    },
  },
  // IMPORTANT: Disable Tailwind's default colors
  corePlugins: {
    // You can keep this empty or add specific plugins
  },
  plugins: [],
}