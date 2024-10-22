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
	hidden?: boolean;
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
		description: "you've gyatt to be ceitine me,,,",
		avatar: '/team/profiles/ceitine.jpg',
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
		description: 'A man of many talents... A master of none... Professionally useless...',
		avatar: '/team/profiles/luke.jpg',
		point: { x: 303, y: 52 },
		country: Countries.UK,
		roles: {
			Programmer: [Languages.CSharp, Languages.HLSL, Languages.JS, Languages.Python],
			'3D Artist': [
				Software.Blender,
				Software.Marmoset,
				Software.Painter,
				Software.Designer,
				Software.Hammer
			],
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
			suborder: ['Halplorhini', 'https://en.wikipedia.org/wiki/Haplorhini'],
			infraorder: ['Simiiformes', 'https://en.wikipedia.org/wiki/Simiiformes'],
			family: ['Cercopithecidae', 'https://en.wikipedia.org/wiki/Old_World_monkey'],
			subfamily: ['Colobinae', 'https://en.wikipedia.org/wiki/Colobinae'],
			tribe: ['Presbytini', 'https://en.wikipedia.org/wiki/Presbytini'],
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
		description: "I love bugs so much it's unreal /an/ros.",
		avatar: '/team/profiles/grodbert.jpg',
		point: { x: 328, y: 78 },
		country: Countries.Italy,
		roles: {
			'3D Artist': [Software.Blender, Software.Painter, Software.Designer],
			Multimedia: [Software.Photoshop, Software.Premiere]
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
			family: ['Bombyliidae', 'https://en.wikipedia.org/wiki/Bombyliidae'],
			subfamily: ['Bombyliinae', 'https://en.wikipedia.org/wiki/Bombyliinae'],
			tribe: ['Bombyliini', 'https://en.wikipedia.org/wiki/Bombyliini'],
			genus: ['Anastoechus', 'https://en.wikipedia.org/wiki/Anastoechus']
		}
	},

	// rndtrash
	{
		name: 'rndtrash',
		avatar: '/team/profiles/rndtrash.jpg',
		description: 'I like rodents they are cool.',
		point: { x: 389, y: 74 },
		country: Countries.Russia,
		roles: {
			Programmer: [
				Languages.C,
				Languages.CPP,
				Languages.CSharp,
				Languages.JS,
				Languages.Python,
				Languages.Java,
				Languages.GDScript,
				Languages.HTML,
				Languages.CSS,
				Languages.HLSL
			],
			'Sound Design': [Software.Audacity]
		},
		classification: {
			kingdom: ['Animalia', 'https://en.wikipedia.org/wiki/Animal'],
			phylum: ['Chordata', 'https://en.wikipedia.org/wiki/Chordate'],
			class: ['Mammalia', 'https://en.wikipedia.org/wiki/Mammal'],
			order: ['Rodentia', 'https://en.wikipedia.org/wiki/Rodent'],
			family: ['Muridae', 'https://en.wikipedia.org/wiki/Muridae'],
			subfamily: ['Cricetinae', 'https://en.wikipedia.org/wiki/Hamster'],
			genus: ['Phodopus', 'https://en.wikipedia.org/wiki/Phodopus'],
			species: ['P. sungorus', 'https://en.wikipedia.org/wiki/Winter_white_dwarf_hamster']
		},
		socials: [
			'https://github.com/rndtrash',
			'https://twitter.com/rndtrash',
			'https://randomtrash.itch.io'
		]
	},

	// wheatleymf
	{
		name: 'wheatleymf',
		avatar: '/team/profiles/wheatleymf.jpg',
		description: 'Your local fartist with a messed up sleep schedule.',
		roles: {
			Programming: [Languages.CSharp, Languages.HLSL],
			Webdev: [Languages.JS, Languages.HTML, Languages.CSS, Languages.PHP],
			'3D Artist': [
				Software.Blender,
				Software.Designer,
				Software.Marmoset,
				Software.SpeedTree,
				Software.Topogun
			],
			'Graphics Design': [Software.Photoshop, Software.Illustrator, Software.Figma],
			'Level Design': [Software.Hammer]
		},
		classification: {
			kingdom: ['Animalia', 'https://en.wikipedia.org/wiki/Animal'],
			phylum: ['Chordata', 'https://en.wikipedia.org/wiki/Chordate'],
			class: ['Mammalia', 'https://en.wikipedia.org/wiki/Mammal'],
			order: ['Carnivora', 'https://en.wikipedia.org/wiki/Carnivora'],
			family: ['Phocidae', 'https://en.wikipedia.org/wiki/Earless_seal'],
			genus: ['Pusa', 'https://en.wikipedia.org/wiki/Pusa'],
			species: ['P. sibirica', 'https://en.wikipedia.org/wiki/Baikal_seal']
		},
		point: { x: 365, y: 38 },
		country: Countries.Russia,
		socials: [
			'https://www.artstation.com/wheatleymf',
			'https://wheatleymf.net',
			'https://twitter.com/wheatleymf'
		]
	},

	// Mungus
	{
		name: 'Mungus',
		avatar: '/team/profiles/mungus.jpg',
		description: 'My name Fungus, I mean Fungus, I mean Fungus, I mean Fungus, I mean Fungus..',
		roles: {
			Musician: [Software.Mixcraft]
		},
		classification: {
			kingdom: ['Animalia', 'https://en.wikipedia.org/wiki/Animal'],
			phylum: ['Chordata', 'https://en.wikipedia.org/wiki/Chordate'],
			class: ['Mammalia', 'https://en.wikipedia.org/wiki/Mammal'],
			order: ['Carnivora', 'https://en.wikipedia.org/wiki/Carnivora'],
			family: ['Felidae', 'https://en.wikipedia.org/wiki/Felidae'],
			species: ['F. catus', 'https://en.wikipedia.org/wiki/Cat'],
			breed: ['Maine Coon', 'https://en.wikipedia.org/wiki/Maine_Coon']
		},
		point: { x: 325, y: 48 },
		country: Countries.Denmark,
		socials: ['https://www.youtube.com/@MungusBox', 'https://soundcloud.com/mungussbox']
	},

	// matek
	{
		name: 'matek',
		avatar: '/team/profiles/matek.jpg',
		description: 'I wrote my own fucking compiler',
		point: { x: 62, y: 65 },
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
		point: { x: 47, y: 105 },
		country: Countries.US,
		roles: {
			'3D Artist': [Software.Blender, Software.Painter],
			'Level Design': [Software.Hammer],
			'Game Design': []
		},
		socials: ['https://twitter.com/cyberagentz', 'https://github.com/CyberAgentz'],
		classification: {
			kingdom: ['Animalia', 'https://en.wikipedia.org/wiki/Animal'],
			phylum: ['Chordata', 'https://en.wikipedia.org/wiki/Chordate'],
			class: ['Mammalia', 'https://en.wikipedia.org/wiki/Mammal'],
			order: ['Rodentia', 'https://en.wikipedia.org/wiki/Rodent'],
			family: ['Muridae', 'https://en.wikipedia.org/wiki/Muridae'],
			species: ['R. rattus', 'https://en.wikipedia.org/wiki/Black_rat']
		}
	},

	// gio
	{
		name: 'gio',
		avatar: '/team/profiles/gio.jpg',
		description: 'hello everyone',
		point: { x: 561, y: 273 },
		country: Countries.Australia,
		roles: {
			Programmer: [Languages.CPP, Languages.CSharp, Languages.C, Languages.GDScript]
		},
		socials: ['https://github.com/gio3k'],
		classification: {
			kingdom: ['Animalia', 'https://en.wikipedia.org/wiki/Animal'],
			phylum: ['Chordata', 'https://en.wikipedia.org/wiki/Chordate'],
			class: ['Mammalia', 'https://en.wikipedia.org/wiki/Mammal'],
			order: ['Rodentia', 'https://en.wikipedia.org/wiki/Rodent'],
			family: ['Muridae', 'https://en.wikipedia.org/wiki/Muridae'],
			species: ['R. rattus', 'https://en.wikipedia.org/wiki/Black_rat']
		}
	},

	// Pukes
	{
		name: 'PUKES',
		description:
			'Creator of the soon to be released "PUKES\' Submarine Game" (currently delayed indefinitely)',
		avatar: '/team/profiles/pukes.jpg',
		point: { x: 300, y: 62 },
		country: Countries.UK,
		roles: {
			Programmer: [Languages.CSharp],
			'3D Artist': [Software.Blender, Software.Marmoset, Software.Painter, Software.ZBrush],
			Multimedia: [Software.Audacity, Software.Photoshop]
		},
		socials: [
			'https://twitter.com/ImPukes',
			'https://github.com/TheNameIsMatt',
			'https://steamcommunity.com/id/imPukes/'
		],
		classification: {
			domain: ['Eukaryota', 'https://en.wikipedia.org/wiki/Eukaryote'],
			kingdom: ['Animalia', 'https://en.wikipedia.org/wiki/Animal'],
			phylum: ['Chordata', 'https://en.wikipedia.org/wiki/Chordate'],
			class: ['Actinopterygii', 'https://en.wikipedia.org/wiki/Actinopterygii'],
			order: ['Lophiiformes', 'https://en.wikipedia.org/wiki/Anglerfish'],
			family: ['Centrophrynidae', 'https://en.wikipedia.org/wiki/Horned_lantern_fish'],
			genus: ['Centrophryne', 'https://en.wikipedia.org/wiki/Horned_lantern_fish'],
			species: ['C. spinulosa', 'https://en.wikipedia.org/wiki/Horned_lantern_fish']
		}
	},

	// yart
	{
		name: 'yart',
		description: 'You are reading this.',
		avatar: '/team/profiles/yart.png',
		point: { x: 100, y: 80 },
		country: Countries.US,
		roles: {
			Programmer: [Languages.CSharp, Languages.LUA]
		},
		socials: ['https://github.com/youarereadingthis'],
		classification: {
			domain: ['Eukaryota', 'https://en.wikipedia.org/wiki/Eukaryote'],
			kingdom: ['Animalia', 'https://en.wikipedia.org/wiki/Animal'],
			phylum: ['Chordata', 'https://en.wikipedia.org/wiki/Chordate'],
			class: ['Chondrichthyes', 'https://en.wikipedia.org/wiki/Chondrichthyes'],
			order: ['Squatiniformes', 'https://en.wikipedia.org/wiki/Squatiniformes'],
			family: ['Squatinidae', 'https://en.wikipedia.org/wiki/Squatiniformes'],
			genus: ['Squatina', 'https://en.wikipedia.org/wiki/Angelshark'],
			species: ['S. squatina', 'https://en.wikipedia.org/wiki/Angelshark']
		}
	},

	// Cool looking jellyfish
	{
		name: 'Cool Looking Jellyfish',
		avatar: '/team/profiles/cool_jellyfish.jpg',
		description: 'A cool looking jellyfish wearing sunglasses',
		point: { x: 23, y: 157 },
		country: Countries.Pirate,
		classification: {
			kingdom: ['Animalia', 'https://en.wikipedia.org/wiki/Animal'],
			phylum: ['Cnidaria', 'https://en.wikipedia.org/wiki/Cnidaria'],
			class: ['Hydrozoa', 'https://en.wikipedia.org/wiki/Hydrozoa'],
			order: ['Siphonophorae', 'https://en.wikipedia.org/wiki/Siphonophorae'],
			family: ['Physaliidae', 'https://en.wikipedia.org/wiki/Physalia'],
			species: ['P. physalis', 'https://en.wikipedia.org/wiki/Portuguese_man_o%27_war']
		}
	}
];
