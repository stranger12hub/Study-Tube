/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Clean Black + Ash Palette
        primary: {
          bg: '#0F0F10',      // Primary Background
          secondary: '#17181A', // Secondary Background
        },
        surface: {
          card: '#1F2023',      // Card Background
          elevated: '#25262A',  // Elevated Surface
          hover: '#2A2B2F',     // Hover Surface
        },
        border: {
          DEFAULT: '#2E3035',   // Border Color
        },
        text: {
          primary: '#EAEAEA',   // Primary Text
          secondary: '#A1A1AA', // Secondary Text
        },
        accent: {
          DEFAULT: '#C7C7C7',   // Minimal accent
        }
      },
      // Keep all your existing animations, keyframes, etc.
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'hover-lift': 'hoverLift 0.25s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        hoverLift: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-4px)' },
        },
      },
      boxShadow: {
        'soft': '0 4px 12px rgba(0, 0, 0, 0.2)',
        'card': '0 2px 8px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
}