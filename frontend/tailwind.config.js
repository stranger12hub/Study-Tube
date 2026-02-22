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
          bg: '#051F20',
          secondary: '#0B2B26',
        },
        card: {
          DEFAULT: '#163832',
          hover: '#235347',
        },
        accent: {
          DEFAULT: '#8EB69B',
          light: '#DAF1DE',
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-up': 'slide-up 0.3s ease-out',
        'slide-down': 'slide-down 0.2s ease-out',
        'glow': 'glow 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        'slide-up': {
          'from': {
            opacity: '0',
            transform: 'translateY(10px)'
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
        'glow': {
          '0%, 100%': {
            'box-shadow': '0 0 5px rgba(142, 182, 155, 0.3), 0 0 20px rgba(142, 182, 155, 0.2)'
          },
          '50%': {
            'box-shadow': '0 0 20px rgba(142, 182, 155, 0.5), 0 0 40px rgba(142, 182, 155, 0.3)'
          }
        },
        'shimmer': {
          '0%': { 'background-position': '-1000px 0' },
          '100%': { 'background-position': '1000px 0' }
        }
      },
      fontFamily: {
        'sans': ['Inter', 'Poppins', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'card': '1rem',
        'xl': '1rem',
        '2xl': '1.25rem',
      },
      boxShadow: {
        'card': '0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.2)',
        'card-hover': '0 20px 30px -10px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(142, 182, 155, 0.2)',
        'glow': '0 0 15px rgba(142, 182, 155, 0.3)',
      }
    },
  },
  plugins: [],
}