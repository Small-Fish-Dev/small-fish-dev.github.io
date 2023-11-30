<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import SocialButton from '$lib/components/SocialButton.svelte';
	import { Slogans } from '$lib/types/Slogan';

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
		class="relative flex h-screen shrink-0 flex-col items-center justify-center gap-8 p-4 font-poppins md:gap-12"
	>
		{#if ready}
			<div transition:fly={{ y: 100, duration: 1000 }} class="relative z-30 max-w-3xl">
				<img src="home/header-logo.png" alt="Small Fish Logo" class="logo" />
				<div class="flex flex-wrap justify-center pb-8 pt-4">
					<p class="subtitle subtitle text-4xl font-medium text-white text-shadow">
						{Slogans[Math.floor(Math.random() * Slogans.length)]}
					</p>
				</div>
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

	.logo {
		-webkit-filter: drop-shadow(5px 5px 5px #222);
		filter: drop-shadow(5px 5px 5px #222);
	}

	.subtitle {
		animation: zoom-in-zoom-out 2s ease-in-out infinite;
	}

	@keyframes zoom-in-zoom-out {
		0% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.1);
		}
		100% {
			transform: scale(1);
		}
	}
</style>
