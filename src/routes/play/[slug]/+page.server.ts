import { Games, type Game } from '$lib/types/Games';

const cullIdent = (ident: string): string => {
	if (ident.startsWith('fish.')) ident = ident.substring(5);
	return ident;
};

/** @type {import('./$types').EntryGenerator} */
export function entries() {
	return Games.filter((g) => g.sboxIdent != undefined).map(function (g) {
		return { slug: cullIdent(decodeURI(g.sboxIdent ?? 'fuck-you-kid')) };
	});
}

import { error, redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
	const slug = params.slug;
	const decodedName = cullIdent(decodeURI(slug).toLocaleLowerCase());
	const game = Games.find(
		(g) => cullIdent(g.sboxIdent?.toLowerCase() ?? 'fuck-you-kid') === decodedName
	);

	if (!game?.sboxIdent) {
		throw error(404, {
			message: 'Not found'
		});
	}
}

export const prerender = true;
