<script lang="ts">
	import Icon from '@iconify/svelte';
	import { swipeable, type SwipeEventData } from '@react2svelte/swipeable';
	import { cubicInOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	let className: string = '';
	export { className as class };
	export let images: string[] = [];
	export let delay: number = 10;

	const move = (amount: number = 1) => {
		current = (current + amount) % images.length;
		if (current < 0) current = images.length + current;

		// timer
		if (timer) clearTimeout(timer);
		timer = setTimeout(move, delay * 1000);
	};

	let current: number = 0;
	let timer: number | null = setTimeout(move, delay * 1000);

	function swipeHandler(event: CustomEvent<SwipeEventData>) {
		if (event.detail.dir === 'Right') move(-1);
		else if (event.detail.dir === 'Left') move(1);
	}
</script>

<div
	use:swipeable
	on:swiped={swipeHandler}
	class="relative flex justify-center bg-blue font-poppins text-sm overflow-hidden {className}"
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
			src={images[current]}
			alt=""
			loading="lazy"
		/>
		<img
			in:fly={{ duration: 300, x: '100%', easing: cubicInOut }}
			class="h-full image z-10 aspect object-contain"
			src={images[current]}
			alt={`image ${current}`}
			loading="lazy"
		/>
	{/each}

	<!-- Buttons -->
	<div
		class="absolute z-10 top-0 left-0 pointer-events-auto flex w-full h-full justify-between items-center text-6xl text-white"
	>
		<button class="transition-all hover:scale-110" on:click={() => move(-1)}>
			<Icon icon="material-symbols:arrow-back-ios-new" />
		</button>
		<button class="transition-all hover:scale-110" on:click={() => move(1)}>
			<Icon icon="material-symbols:arrow-forward-ios" />
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

	.image {
		box-shadow: 0px 0px 16px black;
	}

	button {
		filter: drop-shadow(2px 2px 2px black);
	}

	.image-bg {
		filter: blur(5px) brightness(0.5);
		transform: scale(1.2);
	}
</style>
