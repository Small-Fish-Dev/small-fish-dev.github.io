import { Games, type Game } from '$lib/types/Games';

/** @type {import('./$types').EntryGenerator} */
export function entries() {
	return Games.map(function (g) {
		return { slug: g.slug ?? 'fuck-you-kid' };
	});
}

export const prerender = true;
