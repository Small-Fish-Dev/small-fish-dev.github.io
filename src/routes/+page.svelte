<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import SocialButton from '$lib/components/SocialButton.svelte';
	import { Slogans } from '$lib/types/Slogan';
	import { quintOut } from 'svelte/easing';

	let ready = false;
	onMount(() => {
		ready = true;
		videos = shuffle(
			Object.keys(import.meta.glob('/static/home/intro_videos/*.mp4')).map((path) => {
				const cut = '/static/';
				return path.substring(cut.length, path.length);
			})
		);

		const v = document.createElement('video');
		v.src = videos[0];
		v.addEventListener('loadeddata', () => {
			firstVideoLoaded = true;
		});
	});

	const socials = [
		'https://twitter.com/SmallFishDev',
		'https://www.youtube.com/@SmallFishDev',
		'https://asset.party/fish',
		'https://discord.gg/rx2qqTqv36'
	];

	const shuffle = (array: string[]) => {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	};

	let index = 0;
	let videos: string[];
	let firstVideoLoaded: boolean = false;
	let nextVideoLoaded: boolean = false;

	async function loadNextvideo() {
		let nextIndex = (index + 1) % videos.length;
		if (nextIndex < 0) nextIndex = videos.length + index;

		await awaitNextVideoLoad();

		index = nextIndex;
	}

	async function cacheNextVideo() {
		nextVideoLoaded = false;

		let nextIndex = (index + 1) % videos.length;
		if (nextIndex < 0) nextIndex = videos.length + index;

		const v = document.createElement('video');
		v.src = videos[nextIndex];
		v.addEventListener('loadeddata', () => {
			nextVideoLoaded = true;
		});
	}

	async function awaitNextVideoLoad() {
		while (!nextVideoLoaded) {
			await new Promise((resolve) => setTimeout(resolve, 100));
		}
		return true;
	}
</script>

<div>
	<header
		class="relative flex h-screen shrink-0 flex-col items-center justify-center gap-8 overflow-hidden p-4 font-poppins md:gap-12"
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
			class="from-transparent absolute z-10 h-full w-auto w-full max-w-none bg-gradient-to-b from-80% to-darkblue"
		/>

		<!-- Background video -->
		{#if videos && firstVideoLoaded}
			<div class="absolute h-full w-full" in:fade={{ duration: 600, easing: quintOut }}>
				{#each [videos[index]] as src (index)}
					<video
						preload="auto"
						autoplay
						muted
						class="z-5 absolute h-full w-full object-cover blur-sm"
						on:loadeddata={() => cacheNextVideo()}
						on:ended={() => loadNextvideo()}
						in:fly={{ duration: 600, y: '100%', opacity: 1, easing: quintOut }}
						out:fly={{ duration: 600, y: '-100%', opacity: 1, easing: quintOut }}
					>
						<source {src} type="video/mp4" />
					</video>
				{/each}
			</div>
		{/if}
	</header>
	<body class="h-96 bg-darkblue"> </body>
</div>
