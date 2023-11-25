<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import SocialButton from '$lib/components/SocialButton.svelte';

	let ready = false;
	onMount(() => (ready = true));

	const socials = [
		'https://twitter.com/SmallFishDev',
		'https://www.youtube.com/@SmallFishDev',
		'https://asset.party/fish',
		'https://discord.gg/rx2qqTqv36'
	];
</script>

<div>
	<header
		class="font-display relative flex h-screen shrink-0 flex-col items-center justify-center gap-8 p-4 md:gap-12"
	>
		{#if ready}
			<div transition:fly={{ y: 100, duration: 1000 }} class="relative z-30 max-w-3xl">
				<img src="home/header-logo.png" alt="Small Fish Logo" />
				<div class="flex flex-wrap justify-center gap-2 p-4"></div>
				<div class="flex justify-center gap-4">
					{#each socials as social}
						<SocialButton href={social} showHoverTop={false} class="w-12" />
					{/each}
				</div>
			</div>
		{/if}

		<div
			class="absolute z-20 h-full w-auto w-full max-w-none animate-scroll bg-pixel mix-blend-multiply"
		/>
		<div class="background-fade absolute z-10 h-full w-auto w-full max-w-none" />
		<video autoplay loop muted class="z-5 absolute h-full w-full object-cover"
			><source src="home/smallfishtrailer.mp4" type="video/mp4" /></video
		>
	</header>
</div>

<style>
	.background-fade {
		background: linear-gradient(0deg, #0e1233 0%, transparent 50%);
	}
</style>
