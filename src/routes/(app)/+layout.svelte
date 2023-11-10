<script lang="ts">
	import { page } from '$app/stores';
	import NavButton from '$lib/components/Nav-Button.svelte';

	const routes: App.Route[] = [
		{
			label: 'home',
			icon: 'dashicons:admin-home',
			href: '/'
		},
		{
			label: 'our team',
			icon: 'ic:sharp-sailing',
			href: '/team'
		},
		{
			label: 'blogs',
			icon: 'ic:sharp-newspaper',
			href: '/blog'
		},
		{
			label: 'projects',
			icon: 'material-symbols:videogame-asset',
			href: '/projects'
		}
	];
</script>

<nav
	class="sticky top-0 width w-screen bg-blue flex flex-col p-2 justify-center md:flex-row shadow-[0_4px_20px_0px_#181c4c]"
>
	{#each routes as route}
		<NavButton
			href={route.href}
			icon={route.icon}
			label={route.label}
			disabled={$page.url.pathname == route.href}
		/>
	{/each}
</nav>

<slot />

<style>
</style>
