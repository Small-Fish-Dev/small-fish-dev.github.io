<script lang="ts">
	import { page } from '$app/stores';
	import { type Game, Games, GameState, Placement } from '$lib/types/Games';
	import { Members } from '$lib/types/Member';
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

	let mediaIndex: number = 0;
</script>

<slot />

<svelte:head>
	<title>Games / {game.title}</title>
</svelte:head>

<div class="flex h-screen w-full justify-center overflow-x-hidden bg-[#222222] font-poppins">
	<!-- Main content -->
	<div class="flex h-full w-full flex-row xl:w-[85%]">
		<!-- Media and navigation -->
		<div class="flex w-[65%] flex-shrink flex-col gap-10">
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

			<!-- Active media -->
			<div class="relative flex h-full w-full pb-40">
				{#if game.media && game.media[mediaIndex]}
					{@const src = game.media[mediaIndex]}

					<div class="relative flex w-full justify-center bg-black">
						{#if src.endsWith('mp4')}
							<video {src} />
						{:else}
							<div
								class="absolute left-0 -ml-60 h-full w-[110vw] overflow-x-hidden blur-md brightness-50"
							>
								<img class="h-full w-full" {src} loading="lazy" />
							</div>
							<img
								class="z-20 h-full object-contain"
								{src}
								alt={`image ${mediaIndex}`}
								loading="lazy"
							/>
						{/if}
					</div>

					<div
						class="absolute bottom-0 z-30 flex h-40 w-full -translate-y-[20%] flex-row items-start justify-center gap-8 px-4 drop-shadow-sm"
					>
						{#each game.media as media, i}
							{@const activeClass = i == mediaIndex ? '-translate-y-4' : 'brightness-50'}
							<button
								class="flex aspect-video flex-grow basis-0 justify-center bg-black transition-all hover:-translate-y-2 hover:cursor-pointer hover:brightness-110 {activeClass}"
								on:click={() => (mediaIndex = i)}
							>
								<img src={media} class="h-full" alt="media" />
							</button>
						{/each}
					</div>
				{/if}
			</div>
		</div>

		<!-- Information container -->
		<div
			class="flex h-full w-[35%] flex-shrink-0 flex-grow flex-col gap-12 bg-transparentblack1 p-8 backdrop-blur-md xl:px-14"
		>
			<!-- Contest -->
			{#if game.contestDetails}
				{@const placement = Placement[game.contestDetails.placement]}

				<div
					class="flex flex-row items-center gap-8 border-2 border-white p-2 px-2 xl:px-8 placement-{placement}"
				>
					<Icon class="hidden text-8xl lg:flex" icon="material-symbols:trophy" />
					<div class="flex flex-col gap-1">
						<p class="text-lg font-bold uppercase">{game.contestDetails.title}</p>
						<p class="text-md brightness-90">
							{#if game.contestDetails.placement == Placement.None}
								This game was submitted for a gamejam didn't place :(
							{:else}
								This game was submitted for a gamejam and placed {placement}.
							{/if}
						</p>
					</div>
				</div>
			{:else}
				<div class="h-[7.25rem]" />
			{/if}

			<!-- Title and summary -->
			<div class="flex flex-col gap-4">
				<p class="text-4xl font-bold text-white">{game.title}</p>

				<div class="flex flex-row flex-wrap gap-4 text-lg text-white">
					{#if game.date}
						<p class="flex items-center justify-center bg-blue px-6">
							{game.date.toLocaleString('default', { month: 'long', year: 'numeric' })}
						</p>
					{/if}
					{#if game.state}
						<p class="flex items-center justify-center bg-blue px-6">
							{GameState[game.state]}
						</p>
					{/if}
				</div>

				<div class="h-60 overflow-y-auto">
					<p class="text-lg text-gray">{game.summary}</p>
				</div>
			</div>

			<!-- Developers -->
			{#if game.contributors}
				<div class="flex flex-col gap-2">
					<p class="text-lg font-bold text-white">DEVELOPED BY</p>
					<div class="flex flex-row flex-wrap gap-1">
						{#each game.contributors as memberName}
							{@const member = Members.find(
								(m) => m.name.toLowerCase() == memberName.toLowerCase()
							)}
							{#if member}
								<a
									class="flex h-8 w-[32%] flex-row items-center gap-2 bg-white bg-opacity-10 transition-all hover:scale-[102%] hover:brightness-125"
									href="/team/{member.name}"
									target="_blank"
								>
									<img src={member.avatar} class="aspect-square h-full" alt="avatar" />
									<p
										class="inline-block overflow-hidden text-ellipsis whitespace-nowrap pr-2 text-sm text-gray"
									>
										{member.name}
									</p>
								</a>
							{/if}
						{/each}
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
