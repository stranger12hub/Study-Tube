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
          50: '#faf7f2',  // Warm off-white
          100: '#f0e9dd',  // Warm cream
          200: '#e1d4c1',  // Warm beige
          300: '#d2bea4',  // Warm tan
          400: '#c3a987',  // Warm brown
          500: '#b4946a',  // Medium warm brown
          600: '#9a7b54',  // Rich brown
          700: '#7f6242',  // Deep brown
          800: '#654a31',  // Espresso
          900: '#4a3120',  // Dark espresso
          950: '#2f1f13',  // Almost black warm
        },
        accent: {
          amber: '#f59e0b',     // Rich amber
          gold: '#d4a373',      // Warm gold
          bronze: '#b17f4a',    // Bronze
          copper: '#b46f4c',    // Copper
          rose: '#f43f5e',      // Deep rose
          wine: '#831843',      // Wine red
          rust: '#b45309',      // Rust orange
          cream: '#fef3c7',     // Soft cream
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
        'flicker': 'flicker 3s infinite',
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
            'box-shadow': '0 0 5px rgba(245, 158, 11, 0.3), 0 0 20px rgba(245, 158, 11, 0.2)'
          },
          '50%': { 
            'box-shadow': '0 0 20px rgba(245, 158, 11, 0.5), 0 0 40px rgba(245, 158, 11, 0.3)'
          }
        },
        'pulse-glow': {
          '0%, 100%': { 
            opacity: 1,
            transform: 'scale(1)',
            'box-shadow': '0 0 0 0 rgba(245, 158, 11, 0.7)'
          },
          '50%': { 
            opacity: 0.9,
            transform: 'scale(1.02)',
            'box-shadow': '0 0 0 10px rgba(245, 158, 11, 0)'
          }
        },
        'wave': {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(2deg)' },
          '75%': { transform: 'rotate(-2deg)' },
        },
        'flicker': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.8 },
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