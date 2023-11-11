<script lang="ts">
	import { Projects } from '$lib/types/Project';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
</script>

<div class="p-5 flex justify-end flex-col">
	{#each Projects as project}
		<ProjectCard
			{project}
			class="w-fit even:self-end even:items-end even:text-end mb-20 last:mb-5 first:mt-5"
		/>
	{/each}
</div>

<style>
</style>
