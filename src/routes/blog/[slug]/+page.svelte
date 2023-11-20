<script lang="ts">
	import { onMount } from 'svelte';
	import { Members, type Member } from '$lib/types/Member';
	import type { PageData } from './$types';
	import Icon from '@iconify/svelte';

	export let data: PageData;
	let publisher: Member | undefined;

	type C = $$Generic<typeof SvelteComponentTyped<any, any, any>>;
	$: component = data.component as unknown as C;

	onMount(() => {
		publisher = Members.find(
			(m) => m.name.toLocaleLowerCase() == data.frontmatter.publisher?.toLowerCase()
		);
	});

	const imageFallback = (event: any) => {
		if (!event.target) return;
		event.target.src = '/team/profiles/none.jpg';
	};
</script>

<div class="absolute max-w-none">
	<!-- TODO: replace with good video or image?-->
	<video autoplay loop muted class="absolute w-screen h-screen object-cover"
		><source src="/home/bomb-survival.mp4" type="video/mp4" /></video
	>
	<div class="color-overlay w-screen h-screen z-10" />
</div>

<div class="w-full flex justify-center background-fade z-20">
	<!-- Page -->
	<div class="flex flex-col items-center container mx-auto pt-32 font-poppins">
		<div>
			<!-- Header -->
			<div class="mb-5 text-white px-5 sm:px-0">
				<!-- Title -->
				<div class="flex flex-row items-end gap-4">
					<h1 class="text-5xl font-medium mb-2">{data.frontmatter.title}</h1>
					<button class="transition-all text-gray hover:text-white scale-120 hover:scale-150">
						<Icon
							icon="ic:sharp-share"
							style="filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5));"
						/>
					</button>
				</div>

				<!-- Date -->
				<div class="flex items-center text-gray text-lg font-medium mb-4">
					<Icon
						icon="ic:baseline-calendar-today"
						class="mr-2"
						style="filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5));"
					/>
					<p>
						{new Date(data.frontmatter.date).toLocaleString('en-us', {
							month: 'short',
							day: 'numeric',
							year: 'numeric'
						})}
					</p>
				</div>

				<!-- Description -->
				{#if data.frontmatter.description}
					<p class="mb-4 text-gray">{data.frontmatter.description}</p>
				{/if}

				<!-- Publisher -->
				{#if publisher}
					<div class="flex flex-row items-center gap-3 text-gray">
						<img
							class="w-[42px] h-[42px] bg-cover rounded-lg"
							src={publisher.avatar == null ? '/team/profiles/none.jpg' : publisher.avatar}
							alt="publisher"
							on:error={imageFallback}
						/>
						<a class="font-medium" href="/team#{publisher.name}">
							published by <span class="font-bold transition-all text-gray hover:text-white"
								>{publisher.name}</span
							>
						</a>
					</div>
				{/if}
			</div>

			<!-- Article content -->
			<article class="p-10 bg-white prose lg:prose-xl container rounded-lg">
				<svelte:component this={component} />
			</article>
		</div>
	</div>
</div>

<style>
	.color-overlay {
		background: url(/home/pixel-overlay.png);
		background-size: 7px;
		mix-blend-mode: multiply;
		opacity: 1;
		animation: color-overlay-scroll 120s infinite linear;
	}

	.background-fade {
		background: linear-gradient(
			to bottom,
			rgba(36, 70, 247, 0.5) 0%,
			rgba(36, 70, 247, 0.8) 50vh,
			rgb(36, 70, 247) 70vh
		);
	}

	@keyframes color-overlay-scroll {
		0% {
			background-position: 0% 0%;
		}
		50% {
			background-position: 50% 50%;
		}
		100% {
			background-position: 100% 100%;
		}
	}

	.background {
	}

	img {
		filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5));
	}

	h1,
	p,
	a {
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
	}
</style>
