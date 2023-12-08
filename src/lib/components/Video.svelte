<script lang="ts">
	import { page } from '$app/stores';

	export let src: string;
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-media-has-caption -->
<video class="mx-auto flex justify-center rounded-lg drop-shadow-md" controls>
	<source src="/blogs/{$page.params.slug}/{src}" />
</video>
