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
			(m) => m.name.toLocaleLowerCase() == data.frontmatter.publisher.toLowerCase()
		);
	});

	const imageFallback = (event: any) => {
		if (!event.target) return;
		event.target.src = '/team/profiles/none.jpg';
	};
</script>

<div class="w-full flex justify-center bg-blue">
	<!-- Page -->
	<div class="w-full sm:w-3/4 xl:w-1/2 pt-32 font-poppins">
		<!-- Header -->
		<div class="mb-5 text-white px-5 sm:px-0">
			<!-- Title -->
			<h1 class="text-5xl font-medium mb-2">{data.frontmatter.title}</h1>

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

<style>
	img {
		filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5));
	}

	h1,
	p,
	a {
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
	}
</style>
