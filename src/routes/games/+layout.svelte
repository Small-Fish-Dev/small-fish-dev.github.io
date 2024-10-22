<script lang="ts">
	import { page } from '$app/stores';
	import { type Game, Games, Placement } from '$lib/types/Games';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';

	let game: Game;

	$: {
		const slug = $page.params.slug;
		const decodedName = slug?.toLocaleLowerCase();
		game = Games.find((g) => g.slug?.toLowerCase() === decodedName) ?? Games[0];
	}

	onMount(() => {
		window.history.replaceState(null, '', `/games/${game.slug}`);
	});
</script>

<slot />

<svelte:head>
	<title>Games / {game.title}</title>
</svelte:head>

<div class="flex h-screen w-full justify-center font-poppins">
	<!-- Main content -->
	<div class="flex h-full w-full flex-row bg-blue xl:w-[85%]">
		<!-- Media and navigation -->
		<div class="flex w-[65%] flex-shrink flex-col">
			<!-- Navigation -->
			<div class="flex flex-col gap-2 px-10 pt-5">
				<p class="text-lg text-gray">quick fish games navigation:</p>
				<div class="flex h-10 w-full flex-row gap-4 overflow-x-clip">
					{#each Games as game}
						{@const activeClass =
							game.slug == $page.params.slug || (!$page.params.slug && game == Games[0])
								? 'bg-white text-blue'
								: 'text-white'}
						<a
							class="flex flex-shrink-0 items-center border-2 border-white px-4 text-center text-lg font-bold uppercase transition-all {activeClass}"
							href="/games/{game.slug}">{game.title}</a
						>
					{/each}
				</div>
			</div>
		</div>

		<!-- Information container -->
		<div
			class="flex h-full w-[35%] flex-shrink-0 flex-grow flex-col bg-transparentblack1 p-8 backdrop-blur-md"
		>
			<!-- Contest -->
			{#if game.contestDetails}
				{@const placement = Placement[game.contestDetails.placement]}

				<div
					class="flex flex-row items-center gap-8 border-4 border-white p-4 placement-{placement}"
				>
					<Icon class="hidden text-8xl lg:flex" icon="material-symbols:trophy" />
					<div class="flex flex-col gap-1">
						<p class="text-xl font-bold uppercase">{game.contestDetails.title}</p>
						<p class="text-md brightness-90">
							{#if game.contestDetails.placement == Placement.None}
								This game was submitted for a gamejam didn't place :(
							{:else}
								This game was submitted for a gamejam and placed {placement}.
							{/if}
						</p>
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	.placement-1st {
		color: #ffd700;
		border-color: #ffd700;
	}

	.placement-2nd {
		color: #c0c0c0;
		border-color: #c0c0c0;
	}

	.placement-3rd,
	.placement-4th,
	.placement-5th {
		color: #ff5733;
		border-color: #ff5733;
	}
</style>
