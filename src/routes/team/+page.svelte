<script lang="ts">
	import { page } from '$app/stores';
</script>

<svelte:head>
	{#if !$page.params.slug}
		<meta property="og:title" content="Small Fish - Team" />
		<meta property="og:image" content="https://smallfi.sh/common/logo-round.png" />
		<meta property="og:description" content="Take a look at our talented developers!" />
	{/if}
</svelte:head>
