<script lang="ts">
	import { page } from '$app/stores';
	import '../../app.css';
	import { Locations } from '$lib/types/Location';
	import NavButton from '$lib/components/Nav-Button.svelte';
</script>

<nav class="bg-blue flex flex-col p-2 justify-center md:flex-row">
	<NavButton href={'/'} icon={'dashicons:admin-home'} label={'home'} disabled={false} />
	{#each Locations as location}
		<NavButton
			href={location.href}
			icon={location.icon}
			label={location.label}
			disabled={$page.url.pathname == location.href}
		/>
	{/each}
</nav>

<style>
</style>
