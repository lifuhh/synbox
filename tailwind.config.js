/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        background: '#30011E',
        primary: '#C2185B',
        'primary-500': '#C2185B', // Magenta shade for primary action items
        'primary-600': '#AD1457', // A darker magenta for hover states or active items
        secondary: '#FF80AB', // A lighter magenta for secondary buttons or highlights
        'secondary-500': '#FF80AB', // A lighter magenta for secondary buttons or highlights
        'off-white': '#F8F0FB', // An off-white with a hint of magenta for backgrounds
        red: '#FF5A5A', // You can keep the red if it's part of your palette or adjust it to fit the magenta theme
        'dark-1': '#30011E', // A very dark magenta for text or backgrounds
        'dark-2': '#440229', // A slightly lighter dark magenta
        'dark-3': '#560231', // Even lighter, for surfaces and components
        'dark-4': '#69023A', // A medium dark magenta for lower-contrast elements
        'light-1': '#FFFFFF', // Pure white for contrast against magenta shades
        'light-2': '#FBE9F6', // Light magenta for subtle backgrounds
        'light-3': '#D05D8F', // A mid-light magenta for less prominent UI elements
        'light-4': '#E1BEE7', // A pale magenta for hover states or disabled elements
      },

      screens: {
        xs: '480px',
      },

      width: {
        '9/10': '90%',
        420: '420px',
        465: '465px',
      },

      height: {
        '8/10': '80%',
        '9/10': '90%',
      },

      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
