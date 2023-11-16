<script lang="ts">
	import { Members } from '$lib/types/Member';

	export let h: string = 'h2';
	export let title: string;
	export let caption: string;

	function embedHyperlinks(text: string) {
		for (let i = 0; i < Members.length; ++i) {
			const member = Members[i];
			const regex = new RegExp(member.name, 'gi');
			text = text.replace(regex, `<a href="/team#${member.name}">${member.name}</a>`);
		}

		return text;
	}
</script>

<div>
	<a href={`#${title}`}>
		<svelte:element this={h} id={title} class:caption>{title}</svelte:element></a
	>
	{#if caption}
		<p>{@html embedHyperlinks(caption)}</p>
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
