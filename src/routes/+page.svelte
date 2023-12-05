<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import SocialButton from '$lib/components/SocialButton.svelte';
	import { Slogans } from '$lib/types/Slogan';
	import { quintOut } from 'svelte/easing';
	import ProjectLink from '$lib/components/ProjectLink.svelte';

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
						class="subtitle text-center text-2xl font-medium text-white text-shadow-heavy hover:animate-wiggle md:text-4xl"
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
			class="absolute z-10 h-full w-auto w-full max-w-none bg-gradient-to-b from-transparentblue from-60% to-navyblue"
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
	<body class="bg-navyblue">
		<div class="flex justify-center px-2 pt-8 text-center">
			<p class="font-poppins text-xl font-bold text-white text-shadow md:w-1/2">
				Small Fish is an independent "award-winning" gamedev team. We're the creators of many s&box
				big hits, such as...
			</p>
		</div>
		<div class="flex flex-wrap justify-center py-8">
			<ProjectLink
				imagePath="/home/goblin-tide.png"
				description="Steal moni. Set whole village afire. Life good."
				buttonText="More about GoblinTide"
				buttonLink="https://www.youtube.com/watch?v=kfTCxoYRMT4"
			/>
			<ProjectLink
				imagePath="/home/inthishouse.png"
				description="This house is said to be haunted by the ghost of a lady..."
				buttonText="More about In This House"
				buttonLink="https://www.youtube.com/watch?v=3-TrbOxmK08"
			/>
		</div>
		<div class="bg-darkblue p-2 py-8 font-poppins text-white text-shadow">
			<div class="container mx-auto flex flex-wrap place-items-center justify-center gap-8">
				<p class="text-center text-2xl font-bold">
					We have other games too! Check out the full collection here
				</p>
				<a
					href="/"
					class="rounded-lg bg-gradient-to-r from-blue to-lightblue p-4 text-xl font-bold drop-shadow-md transition-all hover:-translate-y-2 hover:drop-shadow-hover"
				>
					Small Fish Games
					<img
						src="/home/fishsoy.png"
						class="absolute left-[-30px] top-[30px] w-[80px] hover:animate-wiggle"
					/>
				</a>
			</div>
		</div>
		<div class="h-48 bg-navyblue"></div>
	</body>
</div>
