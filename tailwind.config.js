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
          50: '#fef6ee',
          100: '#fdecd7',
          200: '#fad5ae',
          300: '#f7b77a',
          400: '#f38f44',
          500: '#f0701f',
          600: '#e15515',
          700: '#bb3f13',
          800: '#953317',
          900: '#782c16',
        },
        warm: {
          50: '#fefaf5',
          100: '#fef5eb',
          200: '#fde9cd',
          300: '#fbd9a5',
          400: '#f8c06d',
          500: '#f5a742',
          600: '#e68a28',
          700: '#c06d1e',
          800: '#98561e',
          900: '#7a471c',
        }
      },
      fontSize: {
        'xs': ['0.875rem', { lineHeight: '1.5' }],
        'sm': ['1rem', { lineHeight: '1.6' }],
        'base': ['1.125rem', { lineHeight: '1.75' }],
        'lg': ['1.25rem', { lineHeight: '1.75' }],
        'xl': ['1.5rem', { lineHeight: '1.75' }],
        '2xl': ['1.875rem', { lineHeight: '2' }],
        '3xl': ['2.25rem', { lineHeight: '2.25' }],
        '4xl': ['3rem', { lineHeight: '1.2' }],
      }
    },
  },
  plugins: [],
}
