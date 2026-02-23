/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // DESIGN TOKENS - Complete Design System
      colors: {
        // Brand Colors
        brand: {
          50: '#f5f3f0',
          100: '#e8e2d9',
          200: '#d1c7b8',
          300: '#b9ab97',
          400: '#a28f76',
          500: '#8b7355',  // Primary brand color
          600: '#6f5c44',
          700: '#534433',
          800: '#382d22',
          900: '#1d1711',
        },
        // Primary Action Color
        primary: {
          50: '#fef6f0',
          100: '#fde8db',
          200: '#fbd1b6',
          300: '#f8b98c',
          400: '#f6a267',
          500: '#C47A4A',  // Main primary - Muted Copper
          600: '#b06a3d',
          700: '#9c5a30',
          800: '#884a23',
          900: '#743a16',
        },
        // Surface Colors
        surface: {
          DEFAULT: '#FFFFFF',
          hover: '#F9FAFB',
          active: '#F3F4F6',
          disabled: '#F9FAFB',
          inverse: '#1F2937',
        },
        // Background Colors
        background: {
          primary: '#FFFFFF',
          secondary: '#F9FAFB',
          tertiary: '#F3F4F6',
          inverse: '#111827',
        },
        // Text Colors
        text: {
          primary: '#111827',
          secondary: '#4B5563',
          tertiary: '#9CA3AF',
          inverse: '#FFFFFF',
          link: '#C47A4A',
        },
        // Border Colors
        border: {
          light: '#E5E7EB',
          DEFAULT: '#D1D5DB',
          dark: '#9CA3AF',
          focus: '#C47A4A',
        },
        // Status Colors
        status: {
          success: '#10B981',
          warning: '#F59E0B',
          error: '#EF4444',
          info: '#3B82F6',
        },
      },

      // SPACING SYSTEM - 8px base
      spacing: {
        '0': '0',
        '1': '0.25rem',    // 4px
        '2': '0.5rem',      // 8px
        '3': '0.75rem',     // 12px
        '4': '1rem',        // 16px
        '5': '1.25rem',     // 20px
        '6': '1.5rem',      // 24px
        '8': '2rem',        // 32px
        '10': '2.5rem',     // 40px
        '12': '3rem',       // 48px
        '14': '3.5rem',     // 56px
        '16': '4rem',       // 64px
        '20': '5rem',       // 80px
        '24': '6rem',       // 96px
      },

      // TYPOGRAPHY SYSTEM
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],        // 12px
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],    // 14px
        'base': ['1rem', { lineHeight: '1.5rem' }],       // 16px
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],    // 18px
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],     // 20px
        '2xl': ['1.5rem', { lineHeight: '2rem' }],        // 24px
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],   // 30px
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],     // 36px
        '5xl': ['3rem', { lineHeight: '1.2' }],           // 48px
      },

      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },

      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },

      // BORDER RADIUS
      borderRadius: {
        'none': '0',
        'sm': '0.25rem',     // 4px
        'DEFAULT': '0.5rem',  // 8px
        'md': '0.625rem',     // 10px
        'lg': '0.75rem',      // 12px
        'xl': '1rem',         // 16px
        '2xl': '1.25rem',     // 20px
        'full': '9999px',
      },

      // ELEVATION SYSTEM
      boxShadow: {
        'none': 'none',
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'DEFAULT': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
        'elevated': '0 20px 30px -10px rgba(0, 0, 0, 0.2)',
      },

      // ANIMATIONS
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.2s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'hover-lift': 'hoverLift 0.25s ease-out',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
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
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        hoverLift: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-4px)' },
        },
      },

      // CONTAINER
      maxWidth: {
        'container': '1280px',
        'content': '768px',
      },

      // Z-INDEX
      zIndex: {
        '0': '0',
        '10': '10',
        '20': '20',
        '30': '30',
        '40': '40',
        '50': '50',
        'auto': 'auto',
        'modal': '100',
        'tooltip': '200',
        'dropdown': '300',
      },
    },
  },
  plugins: [],
}