export interface Game {
	title: string;
	summary: string;
	logo?: string;
	contributors?: string[];
	media?: string[];
	date?: Date;
	state?: GameState;
	contestDetails?: ContestDetails;
	sboxIdent?: string;
	slug?: string;
}

export interface ContestDetails {
	title: string;
	url?: string;
	placement: Placement;
}

export enum Placement {
	'1st',
	'2nd',
	'3rd',
	'4th',
	'5th',
	None
}

export enum GameState {
	'In Development',
	'Finished',
	'Dead Till Revival'
}

export const Games: Game[] = [
	{
		title: 'Blocks & Bullets',
		summary:
			'A first-person shooter where you can destroy everything that surrounds you. Inspired by the classic hit game Ace of Spades.',
		date: new Date(2024, 9, 1),
		logo: '/games/snb_logo.png',
		contributors: [
			'ceitine',
			'rndtrash',
			'Grodbert',
			'wheatleymf',
			'yart',
			'ubre',
			'matek',
			'CyberAgent'
		],
		state: GameState['In Development'],
		sboxIdent: 'fish.blocks_and_bullets'
	},
	{
		title: 'Death Card',
		summary:
			'A dungeon crawler where the levels are procedurally generated voxel worlds! You and your party of daring adventurers are thrust into the world of Death Card where no dungeon is ever the same.',
		date: new Date(2023, 8, 1),
		logo: '/games/deathcard_logo.png',
		contributors: [
			'ceitine',
			'rndtrash',
			'Grodbert',
			'wheatleymf',
			'Mungus',
			'ubre',
			'matek',
			'Luke',
			'CyberAgent',
			'gio'
		],
		state: GameState['In Development'],
		contestDetails: {
			url: 'https://sbox.game/c/gamejam2',
			placement: Placement['2nd'],
			title: 'Facepunch Game Contest II'
		},
		sboxIdent: 'fish.deathcard'
	},

	{
		title: 'In This House',
		summary:
			'Spooky Robathon with 3 levels and 3 monsters trying to kick you out. 1st Place winner of the Mighty Brick Game Jam.',
		media: [
			'/blogs/example/ex.png',
			'/blogs/example/ex.png',
			'/blogs/example/ex.png',
			'/blogs/frostrial/clothes.png'
		],
		contributors: ['ubre', 'Grodbert', 'ceitine', 'gio', 'rndtrash', 'Luke', 'CyberAgent'],
		date: new Date(2023, 10, 20),
		state: GameState['Dead Till Revival'],
		contestDetails: {
			title: 'Mighty Brick jam',
			url: 'https://mighty-brick.github.io',
			placement: Placement['1st']
		}
	},
	{
		title: 'My Summer Cottage',
		summary: 'A social simulator game where you play as the average Finnish man!',
		contributors: [
			'ceitine',
			'matek',
			'rndtrash',
			'wheatleymf',
			'Grodbert',
			'ubre',
			'gio',
			'CyberAgent',
			'Luke'
		]
	},
	{
		title: 'Goblintide',
		summary: 'Steal moni. Set whole village afire. Life good. (is this even used anywhere?)',
		contributors: ['ceitine', 'ubre', 'Grodbert', 'wheatleymf', 'Luke', 'gio']
	},
	{
		title: 'Bomb Survival',
		summary:
			'Clone of the infamous Little Big Planet gamemode where you had to survive from bombs.',
		contributors: ['ubre', 'Grodbert', 'ceitine']
	},
	{
		title: 'Cryptid Hunt',
		summary: 'Wacky Poland simulator'
	},
	{
		title: 'Hamsteria',
		summary:
			'Restaurant simulator inspired by Citizen Burger Disorder where you micromanage and automate every crazy part of your business.',
		contributors: ['ubre', 'Grodbert', 'Luke']
	},
	{
		title: 'Frostrial',
		summary: 'Collect fish, avoid yeti, do something else. I dont remember anything else.',
		contributors: ['ubre', 'Grodbert', 'ceitine', 'Luke', 'rndtrash', 'Mungus']
	}
];

// Give all games a slug!
Games.forEach((game) => {
	if (game.slug) return;
	game.slug = game.sboxIdent?.toLowerCase()?.substring('fish.'.length);
});
