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
		label: 'devblogs',
		icon: 'ic:sharp-newspaper',
		href: '/dev-blogs'
	},
	{
		label: 'projects',
		icon: 'ic:sharp-newspaper',
		href: '/projects'
	}
];
