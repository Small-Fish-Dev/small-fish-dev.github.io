<script lang="ts">
	import { Projects } from '$lib/types/Project';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import ImageCollage from '$lib/components/ImageCollage.svelte';
</script>

<div class="shadow h-[70vh] z-20">
	<ImageCollage
		class="h-full"
		images={[
			'/blogs/frostrial/clothes.png',
			'/blogs/frostrial/props.png',
			'/blogs/goblintide/clothing.png'
		]}
	/>
</div>

<div class="p-5 flex flex-col scroll bg-[url('/projects/pxgrid_orange.png')]">
	{#each Projects as project, i}
		<ProjectCard
			id={project.title}
			right={i % 2 == 1}
			{project}
			class="max-w-[700px] self-center mb-10 last:mb-5 first:mt-5 {i % 2 == 1 ? 'sm:ml-24' : ''}"
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
