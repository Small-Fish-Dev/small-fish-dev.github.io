<script lang="ts">
	export let h: string = 'h2';
	export let title: string;
	export let caption: string;
</script>

<div>
	<a href={`#${title}`}>
		<svelte:element this={h} id={title} class:caption>{title}</svelte:element></a
	>
	{#if caption}
		<p>{caption}</p>
	{/if}
</div>

<style>
	.caption {
		margin-bottom: 0px;
	}

	p {
		margin-top: 0px;
	}
</style>
