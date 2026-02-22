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
          bg: '#0F0F10',
          secondary: '#17181A',
        },
        card: {
          DEFAULT: '#1F2023',
          elevated: '#25262A',
          hover: '#2A2B2F',
        },
        border: '#2E3035',
        text: {
          primary: '#EAEAEA',
          secondary: '#A1A1AA',
        },
        accent: '#C7C7C7',
      },
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
        'soft': '0 4px 12px rgba(0, 0, 0, 0.1)',
        'hover': '0 8px 20px rgba(0, 0, 0, 0.15)',
        'card': '0 2px 8px rgba(0, 0, 0, 0.2)',
      },
      spacing: {
        'section': '32px',
        'grid': '24px',
      },
      maxWidth: {
        'content': '1200px',
      },
      width: {
        'sidebar': '240px',
      },
      borderRadius: {
        'card': '16px',
      },
    },
  },
  plugins: [],
}