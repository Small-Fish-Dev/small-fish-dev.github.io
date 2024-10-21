import { Games, type Game } from '$lib/types/Games';

/** @type {import('./$types').EntryGenerator} */
export function entries() {
	return Games.map(function (g) {
		return { slug: decodeURI(g.title) };
	});
}

export const prerender = true;
