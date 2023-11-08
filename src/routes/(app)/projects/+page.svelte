<script lang="ts">
	// TODO @ceitine: we should probably hook this up with the team page for contributors??!
	interface Project {
		title: string;
		description: string;
		contributors: string[];
	}

	const projects: Project[] = [
		{
			title: 'Deathcard',
			description: 'Bla bla bla bla',
			contributors: ['ceitine', 'shlakoblock']
		}
	];
</script>

<p>Projects</p>
<div>
	{#each projects as project}
		<p>{project.title}</p>
	{/each}
</div>

<style>
</style>
