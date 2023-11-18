import { Languages, Software, Countries } from './MemberInfo';
import type { Point } from '$lib/map/PanZoom';

export interface Member {
	name: string;
	country: string;
	avatar?: string;
	point: Point;
	description?: string;
	roles?: Record<string, string[]>;
	socials?: string[];
	classification?: Record<string, string[]>;
}

// todo @ceitine: we probably want to have these in some folder separately.
export const Members: Member[] = [
	// ceitine
	{
		name: 'ceitine',
		description:
			'Hello! This is a test for the about section on the team page! I hope it works nicely!! 😅😅😅',
		avatar: 'https://i.imgur.com/fTkU0Nv.png',
		point: { x: 352, y: 38 },
		country: Countries.Finland,
		roles: {
			Programmer: [
				Languages.CSharp,
				Languages.LUA,
				Languages.JS,
				Languages.HLSL,
				Languages.CSS,
				Languages.CPP,
				Languages.GDScript
			],
			'Voice Actor': [Software.Audacity]
		},
		socials: [
			'https://twitter.com/ceitine',
			'https://steamcommunity.com/id/ceitine/',
			'https://github.com/ceitine',
			'https://ceitine.itch.io/'
		],
		classification: {
			kingdom: ['Animalia', 'https://en.wikipedia.org/wiki/Animal'],
			phylum: ['Chordata', 'https://en.wikipedia.org/wiki/Chordate'],
			class: ['Mammalia', 'https://en.wikipedia.org/wiki/Mammal'],
			order: ['Carnivora', 'https://en.wikipedia.org/wiki/Carnivora'],
			family: ['Felidae', 'https://en.wikipedia.org/wiki/Felidae'],
			species: ['F. catus', 'https://en.wikipedia.org/wiki/Cat']
		}
	},

	// Luke
	{
		name: 'Luke',
		point: { x: 303, y: 64 },
		country: Countries.UK
	},

	// ubre
	{
		name: 'ubre',
		description:
			"I have obesity, I have depression, I have hypertension, I beat my ex-wife, I got no work history, and I'm a felon in the state of Arkansas...",
		avatar: 'https://avatars.githubusercontent.com/u/59583743?v=4',
		point: { x: 338, y: 94 },
		country: Countries.Italy,
		roles: {
			Programmer: [
				Languages.CSharp,
				Languages.LUA,
				Languages.CSS,
				Languages.HTML
			],
			'Multimedia': [
				Software.Photoshop,
				Software.Illustrator,
				Software.AfterEffects,
				Software.Premiere,
				Software.Audition
			],
			'Level Design': [Software.Hammer]
		},
		socials: [
			'https://twitter.com/yuberee',
			'https://steamcommunity.com/id/theubre',
			'https://github.com/yuberee',
		],
		classification: {
			kingdom: ['Animalia', 'https://en.wikipedia.org/wiki/Animal'],
			phylum: ['Hemichordata', 'https://en.wikipedia.org/wiki/Hemichordate'],
			class: ['Enteropneusta', 'https://en.wikipedia.org/wiki/Acorn_worm'],
			order: ['Enteropneusta', 'https://en.wikipedia.org/wiki/Acorn_worm'],
			family: ['Ptychoderidae', 'https://en.wikipedia.org/wiki/Ptychoderidae']
		}
	},

	// Grodbert
	{
		name: 'Grodbert',
		point: { x: 328, y: 85 },
		country: Countries.Italy
	},

	// rndtrash
	{
		name: 'rndtrash',
		point: { x: 389, y: 81 },
		country: Countries.Russia
	},

	// wheatleymf
	{
		name: 'wheatleymf',
		point: { x: 365, y: 45 },
		country: Countries.Russia
	},

	// Mungus
	{
		name: 'Mungus',
		point: { x: 325, y: 55 },
		country: Countries.Denmark
	},

	// matek
	{
		name: 'matek',
		avatar: '/team/profiles/matek.jpg',
		point: { x: 145, y: 82 },
		country: Countries.Poland
	},

	// CyberAgent
	{
		name: 'CyberAgent',
		point: { x: 146, y: 94 },
		country: Countries.US
	},

	// gio
	{
		name: 'gio',
		point: { x: 561, y: 280 },
		country: Countries.Australia
	}
];
