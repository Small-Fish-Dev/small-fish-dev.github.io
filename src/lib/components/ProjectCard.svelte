<script lang="ts">
	import type { Project } from '$lib/types/Project';
	import HoverIcon from './HoverIcon.svelte';
	export let project: Project;

	let className: string;
	export { className as class };
</script>

<div class="font-poppins bg-red flex flex-col {className}">
	<div class="w-fit">
		<h1 class="shadow-sm font-medium text-white bg-blue p-4 sm:text-4xl text-3xl mb-4">
			{project.title}
		</h1>
	</div>
	{#if project.tags}
		<div class="flex flex-wrap flex-row gap-2 flex-wrap mb-1">
			{#each project.tags as tag}
				<div
					class="rounded pl-1 pr-1 text-white font-medium tag"
					style="background-color: {tag[1] == null ? '#42BFEC' : tag[1]}"
				>
					{tag[0]}
				</div>
			{/each}
		</div>
	{/if}
	<p class="text-xl w-3/4">{project.description}</p>
	<p class="mt-5 text-xl w-3/4">Contributors</p>
	<div class="flex-row">
		{#if project.contributors}
			{#each project.contributors as contributor}
				<a
					href="/team#{contributor}"
					class="[&:not(:last-child)]:after:content-[','] mr-2 last:mr-0">{contributor}</a
				>
			{/each}
		{:else}
			<a href="/team">everyone @ small fish</a>
		{/if}
	</div>
</div>

<style>
	.tag {
		box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.8);
	}
</style>
