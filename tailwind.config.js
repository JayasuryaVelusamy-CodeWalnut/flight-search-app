/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#667eea',
          DEFAULT: '#5a67d8',
          dark: '#4c51bf',
        },
        secondary: {
          light: '#a3bffa',
          DEFAULT: '#7f9cf5',
          dark: '#667eea',
        },
        accent: {
          light: '#f6ad55',
          DEFAULT: '#ed8936',
          dark: '#dd6b20',
        },
        success: {
          light: '#48bb78',
          DEFAULT: '#38a169',
          dark: '#2f855a',
        },
        danger: {
          light: '#f56565',
          DEFAULT: '#e53e3e',
          dark: '#c53030',
        },
        gray: {
          100: '#f7fafc',
          200: '#edf2f7',
          300: '#e2e8f0',
          400: '#cbd5e0',
          500: '#a0aec0',
          600: '#718096',
          700: '#4a5568',
          800: '#2d3748',
          900: '#1a202c',
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      },
      animation: {
        'skeleton': 'skeleton 1.5s ease-in-out infinite',
      },
      keyframes: {
        skeleton: {
          '0%, 100%': { opacity: 0.5 },
          '50%': { opacity: 1 },
        },
      },
      backdropBlur: {
        'custom': '0.625rem',
      },
    },
  },
  plugins: [],
}
