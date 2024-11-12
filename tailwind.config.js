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
      center: 'true',
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    variants: {
      extend: {
        backgroundColor: ['data-[state=on]'],
        opacity: ['data-[state=on]'],
      },
    },
    extend: {
      fontFamily: {
        inter: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      stroke: (theme) => ({
        'primary-foreground': 'hsl(var(--primary-foreground))',
      }),
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: {
          DEFAULT: 'hsl(var(--ring))',
          foreground: 'hsl(var(--ring-foreground))',
        },
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          light: 'hsl(var(--primary-light))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        borderRadius: {
          lg: 'var(--radius)',
          md: 'calc(var(--radius) - 2px)',
          sm: 'calc(var(--radius) - 4px)',
        },
        boxShadow: {
          primary: '0 4px 14px 0 hsl(var(--primary))',
          'primary-lg': '0 10px 25px -3px hsl(var(--primary))',
          'primary-bright': '0 4px 14px 0 hsl(var(--primary-bright))',
          secondary: '0 4px 14px 0 hsl(var(--secondary))',
          accent: '0 4px 14px 0 hsl(var(--accent))',
          destructive: '0 4px 14px 0 hsl(var(--destructive))',
          ring: '0 4px 14px 0 hsl(var(--ring))',
        },
      },
      borderColor: ({ theme }) => ({
        // This inherits from your color configurations
        ...theme('colors'),
        // You can also add specific border colors if needed
        DEFAULT: 'hsl(var(--border))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          bright: 'hsl(var(--primary-bright))',
        },
        secondary: 'hsl(var(--secondary))',
        muted: 'hsl(var(--muted))',
        accent: 'hsl(var(--accent))',
        destructive: 'hsl(var(--destructive))',
      }),
      screens: {
        xs: '480px',
      },
      width: {
        420: '420px',
        465: '465px',
        '9/10': '90%',
        '80vw': '80vw',
        '90vw': '90vw',
      },
      zIndex: {
        100: '100',
        990: '990',
        999: '999',
      },
      height: {
        '8/10': '80%',
        '9/10': '90%',
      },
      fontSize: {
        '2vw': '2vw',
        '2.4vw': '2.4vw',
        '3.5vw': '3.5vw',
        '4.2vw': '4.2vw',
        '5vw': '5vw',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        spotlight: {
          '0%': {
            opacity: '0',
            transform: 'translate(-72%, -62%) scale(0.5)',
          },
          '100%': {
            opacity: '1',
            transform: 'translate(-50%,-40%) scale(1)',
          },
        },
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        spotlight: 'spotlight 2s ease .75s 1 forwards',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
