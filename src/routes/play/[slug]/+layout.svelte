<script lang="ts">
	import { page } from '$app/stores';
	import { Games, type Game } from '$lib/types/Games';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';

	const cullIdent = (ident: string): string => {
		if (ident.startsWith('fish.')) ident = ident.substring(5);
		return ident;
	};

	function getGameFromIdent(): boolean {
		const slug = $page.params.slug;
		const decodedName = decodeURI(slug);

		const target = Games.find(
			(g) =>
				cullIdent(g.sboxIdent ?? 'fuck-you-kid').toLowerCase() === decodedName.toLocaleLowerCase()
		);
		if (target == null) return false;

		game = target;
		if (browser) {
			window.location.href = `steam://run/590830//-rungame ${game.sboxIdent}`;
			goto('/');
		}

		return true;
	}

	let game: Game;
</script>

<svelte:head>
	{#if getGameFromIdent()}
		<meta property="og:title" content="Play {game.title}" />
		{#if game.summary}
			<meta property="og:description" content={game.summary} />
		{/if}

		{#if game.logo}
			<meta property="og:image" content="https://smallfi.sh/{game.logo}" />
		{/if}
	{/if}
</svelte:head>

<slot />
