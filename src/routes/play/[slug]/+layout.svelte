<script lang="ts">
	import { page } from '$app/stores';
	import { Games, type Game } from '$lib/types/Games';

	function getGameFromIdent(): Boolean {
		const slug = $page.params.slug;
		const decodedName = decodeURI(slug);

		const target = Games.find(
			(g) => g.sboxIdent?.toLowerCase() === decodedName.toLocaleLowerCase()
		);
		if (target == null) return false;

		game = target;
		return true;
	}

	function resolvePath(src: string) {
		return src.startsWith('http://') || src.startsWith('https://')
			? src
			: `/blogs/${$page.params.slug}/${src}`;
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
			<meta property="og:image" content="https://smallfi.sh/{resolvePath(game.logo)}" />
		{/if}
	{/if}
</svelte:head>
