<script lang="ts">
	import { page } from '$app/stores';
	import { type Game, Games } from '$lib/types/Games';
	import { onMount } from 'svelte';

	let game: Game;

	$: {
		const slug = $page.params.slug;
		const decodedName = decodeURI(slug).toLocaleLowerCase();
		game = Games.find((g) => g.title.toLowerCase() === decodedName) ?? Games[0];
	}

	onMount(() => {
		window.history.replaceState(null, '', `/games/${decodeURI(game.title).toLocaleLowerCase()}`);
	});
</script>

<slot />

<p>{game.title}</p>
