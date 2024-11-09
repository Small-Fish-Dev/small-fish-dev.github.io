<script lang="ts">
	import { page } from '$app/stores';

	function resolvePath(src: string) {
		return src.startsWith('http://') || src.startsWith('https://')
			? src
			: `/blogs/${$page.params.slug}/${src}`;
	}

	export let src: string;
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-media-has-caption -->
<video class="mx-auto flex justify-center rounded-lg" controls>
	<source src={resolvePath(src)} />
</video>
