<script lang="ts">
	import { page } from '$app/stores';

	export let src: string;
	export let caption: string;
	export let alt: string = '';

	function resolvePath(src: string) {
		return src.startsWith('http://') || src.startsWith('https://')
			? src
			: `/blogs/${$page.params.slug}/${src}`;
	}
</script>

<div>
	<img
		class="mb-0 flex mx-auto justify-center"
		class:caption-img={caption}
		src={resolvePath(src)}
		alt={alt ? alt : src}
	/>
	{#if caption}
		<p style="margin-top: 0px;">{caption}</p>
	{/if}
</div>

<style>
	.caption-img {
		margin-bottom: 0px;
	}
</style>
