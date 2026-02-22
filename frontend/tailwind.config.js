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
          50: '#f0fdf4',  // Fresh light green tint
          100: '#dcfce7',  // Light mint
          200: '#bbf7d0',  // Soft green
          300: '#86efac',  // Mint green
          400: '#4ade80',  // Fresh green
          500: '#22c55e',  // Primary green
          600: '#16a34a',  // Deep green
          700: '#15803d',  // Forest green
          800: '#166534',  // Dark green
          900: '#14532d',  // Very dark green
          950: '#052e16',  // Almost black green
        },
        accent: {
          green: '#22c55e',     // Fresh green
          emerald: '#10b981',   // Emerald
          mint: '#34d399',      // Mint
          forest: '#166534',    // Forest green
          lime: '#84cc16',      // Lime green
          sage: '#a7c957',      // Sage green
          spring: '#86efac',    // Spring green
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
        'grow': 'grow 3s ease-in-out infinite',
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
            'box-shadow': '0 0 5px rgba(34, 197, 94, 0.3), 0 0 20px rgba(34, 197, 94, 0.2)'
          },
          '50%': { 
            'box-shadow': '0 0 20px rgba(34, 197, 94, 0.5), 0 0 40px rgba(34, 197, 94, 0.3)'
          }
        },
        'pulse-glow': {
          '0%, 100%': { 
            opacity: 1,
            transform: 'scale(1)',
            'box-shadow': '0 0 0 0 rgba(34, 197, 94, 0.7)'
          },
          '50%': { 
            opacity: 0.9,
            transform: 'scale(1.02)',
            'box-shadow': '0 0 0 10px rgba(34, 197, 94, 0)'
          }
        },
        'wave': {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(2deg)' },
          '75%': { transform: 'rotate(-2deg)' },
        },
        'grow': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
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