<script lang="ts">
	export let src: string;
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<video class="flex mx-auto justify-center" controls>
	<source {src} />
</video>
