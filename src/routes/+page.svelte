<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import SocialButton from '$lib/components/SocialButton.svelte';
	import { Slogans } from '$lib/types/Slogan';
	import { quintOut } from 'svelte/easing';

	let ready = false;
	onMount(() => (ready = true));

	const socials = [
		'https://twitter.com/SmallFishDev',
		'https://www.youtube.com/@SmallFishDev',
		'https://asset.party/fish',
		'https://discord.gg/rx2qqTqv36'
	];

	let index = 0;
	const videos = Object.keys(import.meta.glob("/static/home/intro_videos/*.mp4"))
		.map((path) => {
			const cut = "/static/";
			return path.substring(cut.length, path.length);	
		})
		.sort(() => Math.random() - 0.5);

	const moveVideo = (amount: number) => {
		index = (index + amount) % videos.length;
		if (index < 0) index = videos.length + index;
	};
</script>

<div>
	<header
		class="relative  overflow-hidden flex h-screen shrink-0 flex-col items-center justify-center gap-8 p-4 font-poppins md:gap-12"
	>
		{#if ready}
			<div transition:fly={{ y: 100, duration: 1000 }} class="relative z-30 max-w-3xl">
				<img src="home/header-logo.png" alt="Small Fish Logo" />
				<div class="flex flex-wrap justify-center pb-8 pt-4">
					<p
						class="subtitle text-center text-2xl font-medium text-white text-shadow-heavy md:text-4xl"
					>
						"{Slogans[Math.floor(Math.random() * Slogans.length)]}"
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
			
		<!-- Background video -->
		{#each [videos[index]] as src (index)}
			<video  preload="auto" autoplay muted class="z-5 absolute h-full w-full object-cover" 
			on:ended={() => moveVideo(1)}
			in:fly={{ duration: 600, y: '100%', opacity: 1, easing: quintOut }}
			out:fly={{ duration: 600, y: '-100%', opacity: 1, easing: quintOut  }}
			>
				<source {src} type="video/mp4" />
			</video>
		{/each}
	</header>
</div>

<style>
	.background-fade {
		background: linear-gradient(0deg, #0e1233 0%, transparent 50%);
	}
</style>
