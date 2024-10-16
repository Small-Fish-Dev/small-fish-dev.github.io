// TODO @ceitine: we should probably hook this up with the team page for contributors??!
export interface Project {
	title: string;
	description: string;
	contributors?: string[];
	images?: string[];
	tags?: [string, string?][];
}

const tags: Record<string, [string, string?]> = {
	sbox: ['📦 s&box', '#3B74ED'],
	finished: ['✅ finished', '#0CB34C'],
	featured: ['🔗 featured'],
	in_progress: ['🛑 in progress', '#C7BC24'],
	jam: ['⌛ gamejam', '#B30C65']
};

export const Projects: Project[] = [
	{
		title: 'In This House',
		description:
			'Spooky Robathon with 3 levels and 3 monsters trying to kick you out. 1st Place winner of the Mighty Brick Game Jam.',
		images: ['/blogs/example/ex.png', '/blogs/frostrial/clothes.png'],
		contributors: ['ubre', 'Grodbert', 'ceitine', 'gio', 'rndtrash', 'Luke', 'CyberAgent'],
		tags: [tags.featured, tags.sbox, tags.jam, tags.finished]
	},
	{
		title: 'Death Card',
		description: 'A dungeon crawler where the levels are procedurally generated voxel worlds!',
		contributors: ['ceitine', 'rndtrash', 'Grodbert', 'wheatleymf', 'Mungus', 'ubre', 'matek', 'Luke', 'CyberAgent', 'gio'],
		tags: [tags.featured, tags.sbox, tags.in_progress]
	},
	{
		title: 'My Summer Cottage',
		description: 'A social simulator game where you play as the average Finnish man!',
		contributors: ['ceitine', 'matek', 'rndtrash', 'wheatleymf', 'Grodbert', 'ubre', 'gio', 'CyberAgent', 'Luke'],
		tags: [tags.featured, tags.sbox, tags.finished]
	},
	{
		title: 'Goblintide',
		description: 'Steal moni. Set whole village afire. Life good. (is this even used anywhere?)',
		contributors: ['ceitine', 'ubre', 'Grodbert', 'wheatleymf', 'Luke', 'gio'],
		tags: [tags.featured, tags.sbox, tags.finished]
	},
	{
		title: 'Bomb Survival',
		description:
			'Clone of the infamous Little Big Planet gamemode where you had to survive from bombs.',
		contributors: ['ubre', 'Grodbert', 'ceitine'],
		tags: [tags.featured, tags.sbox]
	},
	{
		title: 'Cryptid Hunt',
		description: 'Wacky Poland simulator',
		contributors: ['ubre', 'rndtrash', 'ceitine', 'Luke', 'wheatleymf', 'Grodbert']
	},
	{
		title: 'Hamsteria',
		description:
			'Restaurant simulator inspired by Citizen Burger Disorder where you micromanage and automate every crazy part of your business.',
		contributors: ['ubre', 'Grodbert', 'Luke'],
		tags: [tags.featured, tags.sbox]
	}
];
