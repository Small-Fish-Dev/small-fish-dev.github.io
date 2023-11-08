export interface Location {
	label: string;
	icon: string;
	href: string;
}

// You can use icons from https://icones.js.org/
export const Locations: Location[] = [
	{
		label: 'our team',
		icon: 'ic:sharp-sailing',
		href: '/team'
	},
	{
		label: 'blogs',
		icon: 'ic:sharp-newspaper',
		href: '/blogs'
	},
	{
		label: 'projects',
		icon: 'material-symbols:videogame-asset',
		href: '/projects'
	}
];
