import { Languages, Software, Countries } from './MemberInfo';
import type { Point } from '$lib/map/PanZoom';

export interface Member {
	name: string;
	country: string;
	avatar?: string;
	point: Point;
	description?: string;
	skills?: string[];
	socials?: string[];
}

export const Members: Member[] = [
	// ceitine
	{
		name: 'ceitine',
		description:
			'Hello! This is a test for the about section on the team page! I hope it works nicely!! 😅😅😅',
		avatar: 'https://i.imgur.com/fTkU0Nv.png',
		point: { x: 352, y: 38 },
		country: Countries.Finland,
		skills: [
			Languages.CSharp,
			Languages.LUA,
			Languages.JS,
			Languages.HLSL,
			Languages.CSS,
			Languages.CPP,
			Languages.GDScript
		],
		socials: [
			'https://twitter.com/ceitine',
			'https://steamcommunity.com/id/ceitine/',
			'https://github.com/ceitine',
			'https://ceitine.itch.io/'
		]
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
		point: { x: 338, y: 94 },
		country: Countries.Italy
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
