/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6b7280',     // grey-500
          hover: '#4b5563',        // grey-600
        },
        accent: {
          DEFAULT: '#9ca3af',      // grey-400
          hover: '#6b7280',        // grey-500
        },
      },
      backgroundColor: {
        DEFAULT: '#0d0d0d',
        surface: '#141414',
        card: '#1a1a1a',
      },
      borderColor: {
        DEFAULT: '#2a2a2a',
      },
      textColor: {
        primary: '#ffffff',
        secondary: '#a1a1aa',
      },
      animation: {
        fadeIn: "fadeIn 0.4s ease-out forwards",
        slideUp: "slideUp 0.4s ease-out forwards",
        slideUpDelayed: "slideUp 0.4s ease-out 0.1s forwards",
        slideUpMoreDelayed: "slideUp 0.4s ease-out 0.2s forwards",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      boxShadow: {
        'glow': '0 0 15px rgba(107, 114, 128, 0.3)', // grey glow
      },
    },
  },
  plugins: [],
}