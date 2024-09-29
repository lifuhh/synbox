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
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		colors: {
  			background: '#30011E',
  			primary: '#CA195F',
  			'primary-500': '#B51054',
  			'primary-600': '#9F0048',
  			secondary: '#E74E8A',
  			'secondary-500': '#E43478',
  			'off-white': '#F8F0FB',
  			'dark-1': '#30011E',
  			'dark-2': '#440229',
  			'dark-3': '#560231',
  			'dark-4': '#69023A',
  			'light-1': '#FFEAF4',
  			'light-2': '#FBE9F6',
  			'light-3': '#D05D8F',
  			'light-4': '#E1BEE7',
  			destructive: '#FBE9F6',
  			'destructive-foreground': '#CA195F',
  			accent: ''
  		},
  		screens: {
  			xs: '480px'
  		},
  		width: {
  			'420': '420px',
  			'465': '465px',
  			'9/10': '90%',
  			'80vw': '80vw',
  			'90vw': '90vw'
  		},
  		zIndex: {
  			'100': '100',
  			'990': '990',
  			'999': '999'
  		},
  		height: {
  			'8/10': '80%',
  			'9/10': '90%'
  		},
  		fontFamily: {
  			inter: ['Inter', 'sans-serif']
  		},
  		fontSize: {
  			'2vw': '2vw',
  			'2.4vw': '2.4vw',
  			'3.5vw': '3.5vw',
  			'4.2vw': '4.2vw',
  			'5vw': '5vw'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			spotlight: {
  				'0%': {
  					opacity: '0',
  					transform: 'translate(-72%, -62%) scale(0.5)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translate(-50%,-40%) scale(1)'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			spotlight: 'spotlight 2s ease .75s 1 forwards'
  		}
  	}
  },
  plugins: [require('tailwindcss-animate')],
}
