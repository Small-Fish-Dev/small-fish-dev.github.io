<script lang="ts">
	import { page } from '$app/stores';
	import { Games, type Game } from '$lib/types/Games';

	function getGameFromSlug(): Boolean {
		let slug = $page.params.slug;
		const decodedName = decodeURI(slug);

		let target = Games.find((g) => g.title.toLowerCase() === decodedName.toLocaleLowerCase());
		if (target == null) return false;

		initialGame = target;
		return true;
	}

	function resolvePath(src: string) {
		return src.startsWith('http://') || src.startsWith('https://')
			? src
			: `/blogs/${$page.params.slug}/${src}`;
	}

	let initialGame: Game;
</script>

<svelte:head>
	{#if getGameFromSlug()}
		<meta property="og:title" content={initialGame.title} />
		{#if initialGame.summary}
			<meta property="og:description" content={initialGame.summary} />
		{/if}

		{#if initialGame.logo}
			<meta property="og:image" content="https://smallfi.sh/{resolvePath(initialGame.logo)}" />
		{/if}
	{/if}
</svelte:head>
