<script lang="ts">
	import { page } from '$app/stores';
	import { Games, type Game } from '$lib/types/Games';

	function getGameFromSlug(): Boolean {
		const slug = $page.params.slug;
		const decodedName = slug?.toLocaleLowerCase();

		const target = Games.find((g) => g.slug == decodedName);
		if (target == null) return false;

		initialGame = target;
		return true;
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
			<meta property="og:image" content="https://smallfi.sh/{initialGame.logo}" />
		{/if}
	{/if}
</svelte:head>
