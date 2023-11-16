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
	}
];
