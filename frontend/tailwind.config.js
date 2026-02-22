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
          50: '#f5f3f0',  // Warm off-white
          100: '#e8e2d9',  // Warm light
          200: '#d1c7b8',  // Warm medium
          300: '#b9ab97',  // Warm tan
          400: '#a28f76',  // Warm brown
          500: '#8b7355',  // Rich brown
          600: '#6f5c44',  // Dark brown
          700: '#534433',  // Deep brown
          800: '#382d22',  // Espresso
          900: '#1d1711',  // Dark espresso
          950: '#0f0c09',  // Almost black warm
        },
        elegant: {
          gold: '#c6a15b',     // Rich gold
          bronze: '#b17f4a',   // Warm bronze
          copper: '#b46f4c',   // Copper accent
          plum: '#5d3a4f',     // Deep plum
          wine: '#6b3e4f',     // Wine red
          forest: '#2d4f3e',   // Deep forest green
          charcoal: '#2a2a2a', // Rich charcoal
          cream: '#f5e6d3',    // Cream accent
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient': 'gradient 6s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'slide-up': 'slide-up 0.3s ease-out',
        'slide-down': 'slide-down 0.2s ease-out',
        'bounce-slow': 'bounce 2s infinite',
        'shimmer': 'shimmer 2s infinite',
        'glow': 'glow 2s ease-in-out infinite',
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
          '50%': { transform: 'translateY(-10px)' },
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
            'box-shadow': '0 0 5px rgba(198, 161, 91, 0.3), 0 0 20px rgba(198, 161, 91, 0.2)'
          },
          '50%': { 
            'box-shadow': '0 0 20px rgba(198, 161, 91, 0.5), 0 0 40px rgba(198, 161, 91, 0.3)'
          }
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