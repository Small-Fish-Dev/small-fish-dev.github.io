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

	function getGameFromSlug(): boolean {
		const slug = $page.params.slug;
		const decodedName = slug.toLocaleLowerCase();

		const target = Games.find((g) => (g.slug ?? 'fuck-you-kid').toLowerCase() === decodedName);
		if (target == null) return false;

		game = target;
		if (browser) {
			window.location.href = `steam://run/590830//-rungame ${game.sboxIdent}`;
			//goto('/', { replaceState: true });
		}

		return true;
	}

	let game: Game;
</script>

<svelte:head>
	{#if getGameFromSlug()}
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

<div
	class="scroll flex h-screen flex-col items-center justify-center bg-[url('/common/pixel-overlay.png')] font-poppins text-4xl text-white"
>
	<p class="font-bold lowercase">redirecting to {cullIdent(game.sboxIdent ?? 'fuck-you-kid')}...</p>
	<a href="steam://run/590830//-rungame {game.sboxIdent}">
		<p class="mt-5 scale-100 lowercase transition-all hover:scale-[102%]">click to retry</p>
	</a>
</div>

<style>
	@keyframes scroll {
		0% {
			background-position-x: 0%;
			background-position-y: 0%;
		}
		100% {
			background-position-x: 100%;
			background-position-y: 100%;
		}
	}

	.scroll {
		animation: scroll 120s infinite linear;
	}

	p {
		text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
	}
</style>
