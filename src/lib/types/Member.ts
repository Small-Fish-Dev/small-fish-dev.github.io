import { Languages, Software, Countries } from './MemberInfo';

export interface Member {
	name: string;
	country: string;
	pin: [number, number];
	description?: string;
	skills?: string[];
	socials?: string[];
}

export const Members: Member[] = [
	// ceitine
	{
		name: 'ceitine',
		pin: [352, 38],
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
