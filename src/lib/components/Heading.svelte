<script lang="ts">
	import { Members } from '$lib/types/Member';

	export let h: string = 'h2';
	export let title: string;
	export let caption: string;

	function embedHyperlinks(text: string) {
		for (let i = 0; i < Members.length; ++i) {
			const member = Members[i];
			const regex = new RegExp(member.name, 'gi');
			text = text.replace(
				regex,
				`<a class="transition-all text-blue no-underline font-bold hover:text-lightblue" href="/team/${member.name}">${member.name}</a>`
			);
		}

		return text;
	}
</script>

<div>
	<a class="no-underline" href={`#${title}`} target="_self">
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

	h3,
	h4 {
		color: #2446f7;
	}

	h2 {
		text-decoration: underline;
		text-decoration-color: #2446f7;
		text-decoration-thickness: 6px;
		text-underline-offset: 4px;
		font-size: 2.3em;
	}

	p {
		margin-top: 0px;
	}
</style>
