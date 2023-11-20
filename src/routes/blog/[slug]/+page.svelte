<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { Members, type Member } from '$lib/types/Member';
	import type { PageData } from './$types';
	import Icon from '@iconify/svelte';
	import HoverIcon from '$lib/components/HoverIcon.svelte';

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

	function resolvePath(src: string) {
		return src.startsWith('http://') || src.startsWith('https://')
			? src
			: `/blogs/${$page.params.slug}/${src}`;
	}
</script>

<div class="absolute w-full h-screen max-w-none">
	<!-- TODO: replace with good video or image?-->
	{#if data.frontmatter.thumbnail}
		<img
			class="absolute w-full h-full object-cover"
			src={resolvePath(data.frontmatter.thumbnail)}
			alt="background"
		/>
	{:else}
		<video autoplay loop muted class="absolute w-full h-full object-cover"
			><source src="/home/bomb-survival.mp4" type="video/mp4" /></video
		>
	{/if}
	<div class="color-overlay w-full h-full z-10" />
</div>

<div class="w-full flex justify-center background-fade z-20">
	<!-- Page -->
	<div class="flex flex-col items-center container mx-auto pt-32 pb-20 font-poppins">
		<div>
			<!-- Header -->
			<div class="mb-5 text-white px-5 sm:px-0">
				<!-- Title -->
				<div class="flex flex-row items-end gap-4">
					<h1 class="text-5xl font-medium mb-2">{data.frontmatter.title}</h1>
					<button
						class="transition-all text-gray hover:text-white scale-120 hover:scale-150"
						on:click={() => navigator.clipboard.writeText($page.url.href)}
					>
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
			<article class="p-10 mb-20 bg-white prose lg:prose-xl container rounded-lg">
				<svelte:component this={component} />
			</article>

			<!-- Recommended blogpost -->
			{#if data.nextfrontmatter}
				<h1 class="text-5xl text-white font-medium mb-4">next blog:</h1>

				<div class="relative shadow overflow-hidden rounded-lg">
					<a rel="external" href={data.nextfrontmatter.slug}>
						<!-- Background -->
						{#if data.nextfrontmatter.thumbnail}
							<img
								class="absolute w-full bg-no-repeat"
								src={`/blogs/${data.nextfrontmatter.slug}/${data.nextfrontmatter.thumbnail}`}
								alt="thumbnail"
							/>
						{/if}
						<div class="absolute color-overlay w-full h-full" />

						<!-- Text -->
						<div
							class="relative background-fade-right text-gray p-10 w-full text-right flex flex-col gap-3"
						>
							<!-- Title -->
							<p class="text-3xl transition-all font-bold z-10">
								{data.nextfrontmatter.title}
							</p>

							<!-- Publisher -->
							{#if data.nextfrontmatter.publisher}
								<p class="text-xl font-medium text-white z-10">
									article by <a
										href="/team#{data.nextfrontmatter.publisher}"
										class="transition-all text-gray hover:text-white font-bold"
										>{data.nextfrontmatter?.publisher}</a
									>
								</p>
							{/if}
						</div>
					</a>
				</div>
			{/if}
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

	.background-fade-right {
		background: linear-gradient(
			to right,
			transparent 0%,
			rgba(26, 60, 237, 0.4) 20%,
			rgb(26, 60, 237) 90%
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

	img,
	article,
	.shadow {
		filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5));
	}

	h1,
	p,
	a {
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
	}
</style>
