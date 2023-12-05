<script lang="ts">
	import type { Project } from '$lib/types/Project';
	import ImageCollage from './ImageCollage.svelte';

	let className: string = '';
	export { className as class };
	export let project: Project;
	export let right: boolean;

	let idName: string = '';
	export { idName as id };
</script>

<div class="relative flex flex flex-col font-poppins {className}" id={idName}>
	<!-- Title -->
	<div class="absolute w-fit {right ? 'right-5' : 'left-5'}">
		<h1 class="mb-4 bg-blue p-2 text-3xl font-medium text-white shadow-sm sm:text-4xl">
			{project.title}
		</h1>
	</div>

	<div class="mt-8 flex flex-col bg-white p-5 pt-10 shadow-md">
		<!-- Description -->
		<p class="text-xl">{project.description}</p>

		<!-- Image collage -->
		{#if project.images}
			<ImageCollage
				class="m-2 aspect-[16/9] max-w-full border-[2px] border-solid shadow-sm"
				images={project.images}
			/>
		{/if}

		<!-- Contributors -->
		<p class="mt-5 text-xl">Contributors</p>
		<div class="flex flex-row flex-wrap font-medium">
			{#if project.contributors}
				{#each project.contributors as contributor, i}
					<a
						href="/team#{contributor}"
						class="mr-2 text-blue underline after:text-black last:mr-0 [&:not(:last-child)]:after:content-[',']"
						>{contributor}</a
					>
				{/each}
			{:else}
				<a class="text-blue underline" href="/team">everyone @ small fish</a>
			{/if}
		</div>

		<!-- Tags -->
		{#if project.tags}
			<div class="mt-2 flex flex-row flex-wrap flex-wrap gap-2">
				{#each project.tags as tag}
					<div
						class="tag rounded pl-1 pr-1 font-medium uppercase text-white"
						style="background-color: {tag[1] == null ? '#42BFEC' : tag[1]}"
					>
						{tag[0]}
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>

<style>
	.tag {
		box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.8);
	}
</style>
