<script lang="ts">
	import type { Project } from '$lib/types/Project';
	export let project: Project;

	let className: string;
	export { className as class };
</script>

<div class="font-poppins flex flex-col {className}">
	<div class="w-fit">
		<h1 class="shadow-sm font-medium text-white bg-blue p-4 sm:text-4xl text-3xl mb-4">
			{project.title}
		</h1>
	</div>
	<p class="text-xl w-3/4">{project.description}</p>
	<p class="mt-5 text-xl w-3/4">Contributors</p>
	<div class="flex-row">
		{#each project.contributors as contributor}
			<a href="javascript:;" class="[&:not(:last-child)]:after:content-[','] mr-2 last:mr-0"
				>{contributor}</a
			>
		{/each}
	</div>
</div>

<style>
</style>
