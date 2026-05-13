/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0E0E10',
          surface: '#1A1A1F',
        },
        bone: {
          DEFAULT: '#FAFAF7',
          text: '#0E0E10',
        },
        warmth: {
          DEFAULT: '#F5B642',
          dark: '#D89A24',
        },
        electric: {
          DEFAULT: '#3DD9D6',
          dark: '#2BBFBC',
        },
        muted: '#6B6B6B',
        textdark: '#F5F5F0',
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      maxWidth: {
        container: '1200px',
      },
      letterSpacing: {
        tightish: '-0.02em',
        eyebrow: '0.14em',
      },
      keyframes: {
        colorCycle: {
          '0%':   { color: '#F5B642' },
          '25%':  { color: '#3DD9D6' },
          '50%':  { color: '#E04B5F' },
          '75%':  { color: '#A668F0' },
          '100%': { color: '#F5B642' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'color-cycle': 'colorCycle 14s linear infinite',
        'fade-up': 'fadeUp 700ms cubic-bezier(.2,.7,.2,1) both',
      },
    },
  },
  plugins: [],
};
