// tailwind.config.js
import preline from 'preline/plugin';
import forms from '@tailwindcss/forms';

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', // Include all your React components
    'node_modules/preline/dist/*.js', // Include Preline's JS files
  ],
  theme: {
    extend: {
      keyframes: {
  			marquee: {
  				from: {
  					transform: 'translateX(0)'
  				},
  				to: {
  					transform: 'translateX(calc(-100% - var(--gap)))'
  				}	
  			},
  			'marquee-vertical': {
  				from: {
  					transform: 'translateY(0)'
  				},
  				to: {
  					transform: 'translateY(calc(-100% - var(--gap)))'
  				}
  			}
  		},
  		animation: {
  			marquee: 'marquee var(--duration) infinite linear',
  			'marquee-vertical': 'marquee-vertical var(--duration) linear infinite'
  		}
	  },
  },
  plugins: [
	preline, forms // Add Preline as a plugin
  ],
}