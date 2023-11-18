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

export const shrimplifyPath = (path: string) => {
	let split = path.split('/');
	return split[split.length - 1].split('.')[0];
};

// todo @ceitine: we probably want to have these in some folder separately.
export const Members: Member[] = [
	// ceitine
	{
		name: 'ceitine',
		description:
			'Hello! This is a test for the about section on the team page! I hope it works nicely!! 😅😅😅, You got to be ceitine me!!!',
		avatar: 'team/profiles/ceitine.jpg',
		point: { x: 352, y: 31 },
		country: Countries.Finland,
		roles: {
			Programmer: [
				Languages.CSharp,
				Languages.LUA,
				Languages.JS,
				Languages.HLSL,
				Languages.CPP,
				Languages.GDScript
			],
			'Web Developer': [Languages.HTML, Languages.CSS],
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
		description:
			'A man of many talents... A master of none... Professionally useless...',
		avatar: 'team/profiles/luke.jpg',
		point: { x: 303, y: 57 },
		country: Countries.UK,
		roles: {
			Programmer: [Languages.CSharp, Languages.HLSL, Languages.JS, Languages.Python],
			'3D Art': [Software.Blender, Software.Marmoset, Software.Painter, Software.Designer, Software.Hammer ],
			Multimedia: [Software.Audacity]
		},
		socials: [
			'https://www.artstation.com/notgaylien',
			'https://github.com/NotGaylien',
			'https://steamcommunity.com/id/NotGaylien/'
		],
		classification: {
			kingdom: ['Animalia', 'https://en.wikipedia.org/wiki/Animal'],
			phylum: ['Chordata', 'https://en.wikipedia.org/wiki/Chordate'],
			class: ['Mammalia', 'https://en.wikipedia.org/wiki/Mammal'],
			order: ['Primates', 'https://en.wikipedia.org/wiki/Primate'],
			family: ['Cercopithecidae', 'https://en.wikipedia.org/wiki/Old_World_monkey'],
			species: ['N. larvatus', 'https://en.wikipedia.org/wiki/Proboscis_monkey']
		}
	},

	// ubre
	{
		name: 'ubre',
		description:
			"I have obesity, I have depression, I have hypertension, I beat my ex-wife, I got no work history, and I'm a felon in the state of Arkansas...",
		avatar: 'https://avatars.githubusercontent.com/u/59583743?v=4',
		point: { x: 338, y: 87 },
		country: Countries.Italy,
		roles: {
			Programmer: [Languages.CSharp, Languages.LUA, Languages.CSS, Languages.HTML],
			Multimedia: [
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
			'https://github.com/yuberee'
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
		description:
			"I love bugs so much it's unreal /an/ros.",
		avatar: 'team/profiles/grodbert.jpg',
		point: { x: 328, y: 78 },
		country: Countries.Italy
		roles: {
			'3D Artist': [Software.Blender, Software.Painter, Software.Designer],
			Multimedia: [
				Software.Photoshop,
				Software.Premiere,
			],
		},
		socials: [
			'https://grodbert.artstation.com/',
			'https://twitter.com/Grodbort',
			'https://steamcommunity.com/id/Grodbert/',
			'https://github.com/Grodbert'
		],
		classification: {
			kingdom: ['Animalia', 'https://en.wikipedia.org/wiki/Animal'],
			phylum: ['Arthropoda', 'https://en.wikipedia.org/wiki/Arthropoda'],
			class: ['Insecta', 'https://en.wikipedia.org/wiki/Insecta'],
			order: ['Diptera', 'https://en.wikipedia.org/wiki/Diptera'],
			family: ['Bombyliidae', 'https://en.wikipedia.org/wiki/Bombyliidae']
			subfamily: ['Bombyliinae', 'https://en.wikipedia.org/wiki/Bombyliinae']
			tribe: [['Bombyliini', 'https://en.wikipedia.org/wiki/Bombyliini']
			genus: [['Anastoechus', 'https://en.wikipedia.org/wiki/Anastoechus']
	},

	// rndtrash
	{
		name: 'rndtrash',
		point: { x: 389, y: 74 },
		country: Countries.Russia
	},

	// wheatleymf
	{
		name: 'wheatleymf',
		point: { x: 365, y: 38 },
		country: Countries.Russia
	},

	// Mungus
	{
		name: 'Mungus',
		point: { x: 325, y: 48 },
		country: Countries.Denmark
	},

	// matek
	{
		name: 'matek',
		avatar: '/team/profiles/matek.jpg',
		description: 'I wrote my own fucking compiler',
		point: { x: 145, y: 75 },
		country: Countries.Poland,
		roles: {
			Programmer: [Languages.CPP, Languages.CSharp, Languages.JS, Languages.Java, Languages.Python],
			'Web Developer': [Languages.HTML, Languages.CSS],
			Multimedia: [Software.Photoshop, Software.Audacity]
		},
		socials: ['https://twitter.com/matekdev', 'https://github.com/matekdev', 'https://matek.dev/'],
		classification: {
			kingdom: ['Animalia', 'https://en.wikipedia.org/wiki/Animal'],
			phylum: ['Chordata', 'https://en.wikipedia.org/wiki/Chordate'],
			class: ['Mammalia', 'https://en.wikipedia.org/wiki/Mammal'],
			order: ['Carnivora', 'https://en.wikipedia.org/wiki/Carnivora'],
			family: ['Ursidae', 'https://en.wikipedia.org/wiki/Brown_bear'],
			species: ['U. a. syriacus', 'https://en.wikipedia.org/wiki/Syrian_brown_bear']
		}
	},

	// CyberAgent
	{
		name: 'CyberAgent',
		avatar: '/team/profiles/cyber.jpg',
		description: 'She make me cyber till I agent.',
		point: { x: 146, y: 86 },
		country: Countries.US,
		roles: {
			'3D Artist': [Software.Blender, Software.Painter],
			'Level Design': [Software.Hammer]
		},
		socials: ['https://twitter.com/cyberagentz', 'https://github.com/CyberAgentz'],
		classification: {
			kingdom: ['Animalia', 'https://en.wikipedia.org/wiki/Animal'],
			phylum: ['Chordata', 'https://en.wikipedia.org/wiki/Chordate'],
			class: ['Mammalia', 'https://en.wikipedia.org/wiki/Mammal'],
			order: ['Rodentia', 'https://en.wikipedia.org/wiki/Rodent'],
			family: ['Muridae', 'https://en.wikipedia.org/wiki/Muridae'],
			species: ['R. rattus', 'https://en.wikipedia.org/wiki/Black_Cat']
		}
	},

	// gio
	{
		name: 'gio',
		point: { x: 561, y: 273 },
		country: Countries.Australia
	}
];
