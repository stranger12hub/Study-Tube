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
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        accent: {
          teal: '#2dd4bf',
          cyan: '#22d3ee',
          indigo: '#818cf8',
          violet: '#a78bfa',
          fuchsia: '#f0abfc',
          rose: '#fb7185',
          amber: '#fbbf24',
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
        'spin-slow': 'spin 4s linear infinite',
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
            'box-shadow': '0 0 5px rgba(45, 212, 191, 0.3), 0 0 20px rgba(45, 212, 191, 0.2)'
          },
          '50%': { 
            'box-shadow': '0 0 20px rgba(45, 212, 191, 0.5), 0 0 40px rgba(45, 212, 191, 0.3)'
          }
        },
        'pulse-glow': {
          '0%, 100%': { 
            opacity: 1,
            transform: 'scale(1)',
            'box-shadow': '0 0 0 0 rgba(45, 212, 191, 0.7)'
          },
          '50%': { 
            opacity: 0.9,
            transform: 'scale(1.02)',
            'box-shadow': '0 0 0 10px rgba(45, 212, 191, 0)'
          }
        },
        'wave': {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(2deg)' },
          '75%': { transform: 'rotate(-2deg)' },
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