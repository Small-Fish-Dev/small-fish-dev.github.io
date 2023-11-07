/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		colors: {
			white: '#FFFFFF',
			blue: '#2446f7',
			black: '#000000'
		},
		extend: {
			fontFamily: {
				poppins: ['Poppins', 'sans-serif']
			}
		}
	},
	plugins: []
};
