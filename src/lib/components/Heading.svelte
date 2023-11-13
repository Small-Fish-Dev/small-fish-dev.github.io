<script lang="ts">
	export let h: string = 'h2';
	export let title: string;
	export let caption: string;
</script>

<div>
	<svelte:element this={h} class:caption>{title}</svelte:element>
	{#if caption}
		<p>{caption}</p>
	{/if}
</div>

<style>
	.caption {
		margin-bottom: 0px;
	}
</style>
