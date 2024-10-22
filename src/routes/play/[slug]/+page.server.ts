import { Games, type Game } from '$lib/types/Games';

/** @type {import('./$types').EntryGenerator} */
export function entries() {
	return Games.filter((g) => g.sboxIdent != undefined).map(function (g) {
		return { slug: g.slug ?? 'fuck-you-kid' };
	});
}

import { error, redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
	const slug = params.slug;
	const decodedName = slug.toLocaleLowerCase();
	const game = Games.find((g) => (g.slug?.toLowerCase() ?? 'fuck-you-kid') === decodedName);

	if (!game?.sboxIdent) {
		throw error(404, {
			message: 'Not found'
		});
	}
}

export const prerender = true;
