<script lang="ts">
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';
	import { swipeable, type SwipeEventData } from '@react2svelte/swipeable';
	import { onMount } from 'svelte';
	import { cubicInOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	let className: string = '';
	export { className as class };
	export let images: string[] = [];
	export let delay: number = 10;
	export let direction: number = 1;

	const move = (amount: number = 1) => {
		current = (current + amount) % images.length;
		if (current < 0) current = images.length + current;
		direction = Math.min(Math.max(amount, -1), 1);

		// timer
		if (timer) clearTimeout(timer);
		timer = setTimeout(move, delay * 1000);
	};

	let current: number = 0;
	let timer: number | null = setTimeout(move, delay * 1000);

	function resolvePath(src: string) {
		if ($page.route.id != '/blog/[slug]') return src;
		return src.startsWith('http://') || src.startsWith('https://')
			? src
			: `/blogs/${$page.params.slug}/${src}`;
	}

	function swipeHandler(event: CustomEvent<SwipeEventData>) {
		if (event.detail.dir === 'Right') move(-1);
		else if (event.detail.dir === 'Left') move(1);
	}

	onMount(() => {
		images.forEach((img) => {
			new Image().src = img;
		});
	});
</script>

<div
	use:swipeable
	on:swiped={swipeHandler}
	class="relative flex justify-center bg-white font-poppins text-sm overflow-hidden
		{$page.route.id == '/blog/[slug]' ? 'blog rounded-lg' : ''} {className}"
>
	<!-- Current image-->
	<p
		class="absolute pointer-events-none opacity-0 sm:opacity-20 font-bold text-white m-2 p-1 top-0 right-0 z-20 bg-black break-all"
	>
		{current}: {images[current]}
	</p>

	<!-- Image -->
	{#each [images[current]] as src (current)}
		<img
			class="absolute image-bg overflow-hidden h-full w-full"
			src={resolvePath(images[current])}
			alt=""
			loading="lazy"
		/>
		<img
			transition:fly={{ duration: 100, x: `${direction * 100}%`, opacity: 0.5, easing: cubicInOut }}
			class="!m-0 image z-10 object-contain w-full h-full"
			src={resolvePath(images[current])}
			alt={`image ${current}`}
			loading="lazy"
		/>
	{/each}

	<!-- Buttons -->
	<div
		class="absolute z-10 top-0 left-0 pointer-events-auto flex w-full h-full justify-between items-center text-6xl text-white"
	>
		<button class="transition-all hover:scale-110" on:click={() => move(-1)}>
			<Icon icon="material-symbols:arrow-back-ios-new-rounded" />
		</button>
		<button class="transition-all hover:scale-110" on:click={() => move(1)}>
			<Icon icon="material-symbols:arrow-forward-ios-rounded" />
		</button>
	</div>

	<!-- Image dots -->
	<div class="absolute bottom-0 z-20 left-0 w-full pb-4 flex justify-center items-center gap-3">
		{#each images as image, i}
			<button
				class="transition-all rounded-full bg-white {i == current
					? 'opacity-80'
					: 'opacity-50'} w-[8px] h-[8px] hover:scale-150"
				on:click={() => (current = i)}
			/>
		{/each}
	</div>
</div>

<style>
	.tag {
		box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.8);
	}

	button {
		filter: drop-shadow(2px 2px 2px black);
	}

	.image-bg {
		filter: blur(5px) brightness(0.5);
		transform: scale(1.2);
	}

	.blog {
		height: 50vh;
		margin-bottom: 2em;
	}
</style>
