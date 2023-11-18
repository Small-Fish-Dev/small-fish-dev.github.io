<script lang="ts">
	import { Projects } from '$lib/types/Project';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import ImageCollage from '$lib/components/ImageCollage.svelte';
</script>

<div class="shadow h-[60vh]">
	<ImageCollage
		images={[
			'/blogs/frostrial/clothes.png',
			'/blogs/frostrial/props.png',
			'/blogs/goblintide/clothing.png'
		]}
	/>
</div>

<div class="p-5 flex justify-end flex-col">
	{#each Projects as project}
		<ProjectCard
			{project}
			class="w-fit even:self-end even:items-end even:text-end mb-20 last:mb-5 first:mt-5"
		/>
	{/each}
</div>

<style>
	.shadow {
		box-shadow: 0px 8px 8px rgba(0, 0, 0, 0.5);
	}
</style>
