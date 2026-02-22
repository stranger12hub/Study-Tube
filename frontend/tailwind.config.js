/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          50: '#faf5ff',  // Light lavender
          100: '#f3e8ff',  // Soft purple tint
          200: '#e9d5ff',  // Light purple
          300: '#d8b4fe',  // Soft lavender
          400: '#c084fc',  // Medium purple
          500: '#a855f7',  // Primary purple
          600: '#9333ea',  // Deep purple
          700: '#7e22ce',  // Rich purple
          800: '#6b21a8',  // Dark purple
          900: '#581c87',  // Very dark purple
          950: '#2e1065',  // Almost black purple
        },
        accent: {
          purple: '#a855f7',     // Bright purple
          violet: '#8b5cf6',     // Violet
          lavender: '#c084fc',   // Lavender
          orchid: '#d946ef',     // Orchid
          plum: '#6b21a8',       // Plum
          grape: '#7e22ce',      // Grape
          mauve: '#a78bfa',      // Mauve
        }
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient': 'gradient 8s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'slide-up': 'slide-up 0.4s ease-out',
        'slide-down': 'slide-down 0.3s ease-out',
        'bounce-slow': 'bounce 2.5s infinite',
        'shimmer': 'shimmer 2.5s infinite',
        'glow': 'glow 2.5s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'wave': 'wave 3s ease-in-out infinite',
        'sparkle': 'sparkle 3s ease-in-out infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'slide-up': {
          'from': {
            opacity: '0',
            transform: 'translateY(20px)'
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'slide-down': {
          'from': {
            opacity: '0',
            transform: 'translateY(-10px)'
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'shimmer': {
          '0%': { 'background-position': '-1000px 0' },
          '100%': { 'background-position': '1000px 0' }
        },
        'glow': {
          '0%, 100%': { 
            'box-shadow': '0 0 5px rgba(168, 85, 247, 0.3), 0 0 20px rgba(168, 85, 247, 0.2)'
          },
          '50%': { 
            'box-shadow': '0 0 20px rgba(168, 85, 247, 0.5), 0 0 40px rgba(168, 85, 247, 0.3)'
          }
        },
        'pulse-glow': {
          '0%, 100%': { 
            opacity: 1,
            transform: 'scale(1)',
            'box-shadow': '0 0 0 0 rgba(168, 85, 247, 0.7)'
          },
          '50%': { 
            opacity: 0.9,
            transform: 'scale(1.02)',
            'box-shadow': '0 0 0 10px rgba(168, 85, 247, 0)'
          }
        },
        'wave': {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(2deg)' },
          '75%': { transform: 'rotate(-2deg)' },
        },
        'sparkle': {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.8, transform: 'scale(1.1)' },
        }
      },
      backgroundSize: {
        '200': '200% 200%',
      },
      translate: {
        '100': '100%',
      }
    },
  },
  plugins: [],
}