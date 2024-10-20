<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import SocialButton from '$lib/components/SocialButton.svelte';
	import { Slogans } from '$lib/types/Slogan';
	import { quintOut } from 'svelte/easing';
	import ProjectLink from '$lib/components/ProjectLink.svelte';
	import Icon from '@iconify/svelte';
	import StatCard from '$lib/components/StatCard.svelte';
	import { BlogAsNews, FetchNewsAsync, NewsAsNews, type NewsEntry } from '$lib/types/News';
	import NewsCard from '$lib/components/NewsCard.svelte';

	let ready = false;
	let posts: NewsEntry[] = [];
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

		FetchNewsAsync()
			.then((res) => {
				// Fetch news posts.
				if (res == null) {
					console.log('Failed to fetch sbox.game news posts');
					return;
				}

				posts = res.map((n) => NewsAsNews(n));
			})
			.then(async () => {
				// Get blog posts.
				const response = await fetch(`/api/posts`);
				const blogPosts: App.BlogPost[] = (await response.json()).filter(
					(post: App.BlogPost) => post.published ?? true
				);

				const blogs = blogPosts.map((b) => BlogAsNews(b));
				posts = [...posts, ...blogs];
				posts = posts.slice(0, 3);
				posts = posts.sort((a, b) => (b.date as any) - (a.date as any));
			});
	});

	const socials = [
		'https://twitter.com/SmallFishDev',
		'https://www.youtube.com/@SmallFishDev',
		'https://sbox.game/fish',
		'https://discord.gg/rx2qqTqv36',
		'https://github.com/Small-Fish-Dev/',
		'mailto:info@smallfi.sh'
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

<svelte:head>
	<meta property="og:title" content="Small Fish" />
	<meta property="og:image" content="https://smallfi.sh/common/logo-round.png" />
	<meta property="og:description" content="The greatest developer group of all time!" />

	<title>Small Fish</title>
</svelte:head>

<div>
	<header
		class="relative flex h-screen shrink-0 flex-col items-center justify-center gap-8 overflow-hidden p-4 font-poppins md:gap-12"
	>
		{#if ready}
			<div transition:fly={{ y: 100, duration: 1000 }} class="relative z-30 max-w-3xl">
				<img src="/home/header-logo.png" alt="Small Fish Logo" />
				<div class="flex flex-wrap justify-center pb-8 pt-4">
					<p
						class="subtitle text-center text-2xl font-medium text-white text-shadow-heavy hover:animate-wiggle md:text-4xl"
					>
						"{Slogans[Math.floor(Math.random() * Slogans.length)]}"
					</p>
				</div>
				<div class="flex justify-center gap-4 flex-wrap">
					{#each socials as social}
						<SocialButton href={social} showHoverTop={false} class="w-12" />
					{/each}
				</div>
			</div>
		{/if}

		<div
			class="absolute z-10 h-full w-full max-w-none bg-gradient-to-b from-transparentblue from-60% to-navyblue"
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
		{:else}
			<div class="absolute h-full w-full animate-scroll bg-pixel-large" />
		{/if}
	</header>
	<body class="bg-navyblue">
		{#if posts}
			<div class="mb-20 flex justify-center px-2 pt-8 text-center">
				<p class="font-poppins text-sm font-bold text-white text-shadow sm:text-2xl md:w-1/2">
					Latest Small Fish fishy news!
				</p>
			</div>

			<div
				class="flex flex-row items-center md:px-20 px-5 gap-10 mb-20 w-full justify-center flex-wrap"
			>
				{#each posts as post, i}
					<NewsCard {post} class="w-[30rem]" />
				{/each}
			</div>
		{/if}

		<div class="mb-20 flex justify-center px-2 pt-8 text-center">
			<p class="font-poppins text-sm font-bold text-white text-shadow sm:text-2xl md:w-1/2">
				Small Fish is an independent "award-winning" gamedev team. We're the creators of many s&box
				big hits, such as...
			</p>
		</div>

		<div
			class="text-1xl flex flex-col items-center px-0 text-center font-poppins text-white text-shadow sm:flex-col sm:text-3xl"
		>
			<div
				class="h-auto w-[90%] items-center bg-[url('/home/msc_cottage.jpg')] bg-cover shadow-[inset_0px_0px_80px_rgba(0,0,0,1)] md:w-[65%]"
			>
				<img
					src="/home/msc_title.png"
					class="-rotate-[3deg] scale-[100%] duration-200 ease-in-out hover:scale-[105%]"
					alt="my summer cottage thumbnail"
				/>
				<div class="flex flex-col items-center gap-2 p-2 sm:py-10">
					<p class="font-bold">Latest game from Small Fish, now available in s&box!</p>
					<a
						target="_blank"
						href="https://sbox.game/fish/sauna"
						class="m-3 w-full rounded-lg bg-gradient-to-r from-blue to-lightblue p-4 text-sm font-bold drop-shadow-md transition-all hover:-translate-y-2 hover:drop-shadow-hover sm:w-1/2 sm:text-xl md:p-6"
					>
						VISIT ON SBOX.GAME</a
					>
				</div>
			</div>
		</div>
		<div class="flex flex-wrap justify-center gap-4 py-8">
			<ProjectLink
				imagePath="/home/goblin-tide.png"
				description="Steal moni. Set whole village afire. Life good."
				buttonText="More about Goblin Tide"
				buttonLink="https://www.youtube.com/watch?v=kfTCxoYRMT4"
			/>
			<ProjectLink
				imagePath="/home/inthishouse.png"
				description="A dangerous dive into a strange house to extract mysterious valuable artifacts..."
				buttonText="More about In This House"
				buttonLink="https://www.youtube.com/watch?v=3-TrbOxmK08"
			/>
		</div>
		<div class="bg-darkblue p-2 py-8 font-poppins text-white text-shadow">
			<div class="container mx-auto flex flex-wrap place-items-center justify-center gap-8">
				<p class="text-center text-2xl font-bold md:w-1/2 md:pr-4">
					We teach you how to make games. Graduate from our Fish School program!
				</p>
				<a
					href="https://www.youtube.com/watch?v=ijju9rbeN1A&list=PLIcPBTNc7_9oFEEoHSCuPrdGQnU27yLuj"
					class="flex items-center rounded-lg bg-gradient-to-r from-blue to-lightblue p-4 text-xl font-bold drop-shadow-md transition-all hover:-translate-y-2 hover:drop-shadow-hover"
				>
					<Icon icon="fluent:hat-graduation-12-filled" class="mr-2" />
					Fish School
					<img
						src="/home/fishsoy.png"
						alt="soy fish"
						class="absolute left-[-40px] top-[30px] w-[80px] hover:animate-wiggle"
					/>
				</a>
			</div>
		</div>
		<div class="flex w-full flex-wrap justify-center gap-4 py-8">
			<StatCard
				count="23+"
				countType="videos"
				description="of Fish School & Fish Bites"
				link="https://www.youtube.com/watch?v=z3VGIuZaGnI&list=PLIcPBTNc7_9qJi73IXO2fUCZG4aIdo8sk"
			/>
			<StatCard
				count="180+"
				countType="models"
				description="uploaded to sbox.game"
				link="https://sbox.game/fish"
			/>
			<StatCard
				count="200+"
				countType="banned"
				description="from the Small Fish discord"
				link="https://discord.gg/rx2qqTqv36"
			/>
		</div>
		<div class="flex w-full flex-wrap justify-center gap-4 pb-8 pt-4">
			<img
				src="/home/concretefree.png"
				alt="poop tavern"
				class="h-20 rounded-lg hover:animate-wiggle"
			/>
			<img src="/home/pegi.png" alt="pegi 12" class="h-20 rounded-lg hover:animate-wiggle" />
			<img
				src="/home/trustpilot.png"
				alt="poop tavern"
				class="h-20 rounded-lg hover:animate-wiggle"
			/>
		</div>
	</body>
</div>
