<script lang="ts">
	import type { Project } from '$lib/types/Project';
	import ImageCollage from './ImageCollage.svelte';

	let className: string = '';
	export { className as class };
	export let project: Project;
</script>

<div class="font-poppins bg-red flex flex-col {className}">
	<!-- Title -->
	<div class="w-fit">
		<h1 class="shadow-sm font-medium text-white bg-blue p-2 sm:text-4xl text-3xl mb-4">
			{project.title}
		</h1>
	</div>

	<!-- Description -->
	<p class="text-xl w-3/4">{project.description}</p>

	<!-- Image collage -->
	{#if project.images}
		<ImageCollage
			class="w-[300px] md:w-[500px] aspect-[16/9] m-2 shadow-sm border-solid border-[2px]"
			images={project.images}
		/>
	{/if}

	<!-- Contributors -->
	<p class="mt-5 text-xl w-3/4">Contributors</p>
	<div class="flex flex-row flex-wrap font-medium">
		{#if project.contributors}
			{#each project.contributors as contributor, i}
				<a
					href="/team#{contributor}"
					class="[&:not(:last-child)]:after:content-[','] mr-2 last:mr-0 after:text-black text-blue underline"
					>{contributor}</a
				>
			{/each}
		{:else}
			<a class="text-blue underline" href="/team">everyone @ small fish</a>
		{/if}
	</div>

	<!-- Tags -->
	{#if project.tags}
		<div class="flex flex-wrap flex-row gap-2 flex-wrap mt-2">
			{#each project.tags as tag}
				<div
					class="rounded pl-1 pr-1 text-white font-medium tag uppercase"
					style="background-color: {tag[1] == null ? '#42BFEC' : tag[1]}"
				>
					{tag[0]}
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.tag {
		box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.8);
	}
</style>
