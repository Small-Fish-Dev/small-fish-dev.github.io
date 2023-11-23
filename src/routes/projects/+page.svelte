<script lang="ts">
	import { Projects } from '$lib/types/Project';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import ImageCollage from '$lib/components/ImageCollage.svelte';
</script>

<div class="z-20 h-[70vh] shadow">
	<ImageCollage
		class="h-full"
		images={[
			'/blogs/frostrial/clothes.png',
			'/blogs/frostrial/props.png',
			'/blogs/goblintide/clothing.png'
		]}
	/>
</div>

<div class="scroll flex flex-col bg-[url('/projects/pxgrid_orange.png')] p-5">
	{#each Projects as project, i}
		<ProjectCard
			id={project.title}
			right={i % 2 == 1}
			{project}
			class="mb-10 max-w-[700px] self-center first:mt-5 last:mb-5 {i % 2 == 1 ? 'sm:ml-24' : ''}"
		/>
	{/each}
</div>

<style>
	.shadow {
		box-shadow: 0px 8px 8px rgba(0, 0, 0, 0.5);
	}

	@keyframes scroll {
		0% {
			background-position-x: 0%;
			background-position-y: 0%;
		}
		100% {
			background-position-x: 100%;
			background-position-y: 100%;
		}
	}

	.scroll {
		animation: scroll 120s infinite linear;
	}
</style>
