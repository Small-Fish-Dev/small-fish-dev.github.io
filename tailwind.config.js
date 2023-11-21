/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		colors: {
			white: '#FFFFFF',
			blue: '#2446f7',
			black: '#000000',
			darkblue: '#181c4c',
			gray: '#e2e2e2',
			lightblue: '#6a81f8'
		},
		extend: {
			fontFamily: {
				poppins: ['Poppins', 'sans-serif']
			},
			boxShadow: {
				sm: '4px 4px black',
				md: '8px 8px black'
			},
			typography: {
				DEFAULT: {
					css: {
						maxWidth: '100%'
					}
				}
			}
		}
	},
	plugins: [require('@tailwindcss/typography')]
};
