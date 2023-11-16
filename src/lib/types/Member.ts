import { Languages, Software, Countries } from './MemberInfo';
import type { Point } from '$lib/map/PanZoom';

export interface Member {
	name: string;
	country: string;
	pin: Point;
	description?: string;
	skills?: string[];
	socials?: string[];
}

export const Members: Member[] = [
	// ceitine
	{
		name: 'ceitine',
		pin: { x: 352, y: 38 },
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
			'https://github.com/ceitine'
		]
	},

	// Luke
	{
		name: 'Luke',
		pin: { x: 303, y: 64 },
		country: Countries.UK
	},

	// ubre
	{
		name: 'ubre',
		pin: { x: 338, y: 94 },
		country: Countries.Italy
	},

	// Grodbert
	{
		name: 'Grodbert',
		pin: { x: 328, y: 85 },
		country: Countries.Italy
	},

	// rndtrash
	{
		name: 'rndtrash',
		pin: { x: 389, y: 81 },
		country: Countries.Russia
	},

	// wheatleymf
	{
		name: 'wheatleymf',
		pin: { x: 365, y: 45 },
		country: Countries.Russia
	},

	// Mungus
	{
		name: 'Mungus',
		pin: { x: 325, y: 55 },
		country: Countries.Denmark
	},

	// matek
	{
		name: 'matek',
		pin: { x: 145, y: 82 },
		country: Countries.Poland
	},

	// CyberAgent
	{
		name: 'CyberAgent',
		pin: { x: 146, y: 94 },
		country: Countries.US
	},

	// gio
	{
		name: 'gio',
		pin: { x: 561, y: 280 },
		country: Countries.Australia
	}
];
