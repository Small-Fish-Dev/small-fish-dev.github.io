<script lang="ts">
	import '../app.css';
	import '../syntax-highlight.css'; // https://github.com/PrismJS/prism-themes
	import { page } from '$app/stores';
	import { slide } from 'svelte/transition';
	import { navigating } from '$app/stores';
	import NavButton from '$lib/components/Nav-Button.svelte';
	import Icon from '@iconify/svelte';

	const routes: App.Route[] = [
		{
			label: 'team',
			icon: 'ic:sharp-sailing',
			href: '/team'
		},
		{
			label: 'blogs',
			icon: 'material-symbols:newspaper',
			href: '/blog'
		}
		// {
		// 	label: 'projects',
		// 	icon: 'material-symbols:videogame-asset-sharp',
		// 	href: '/projects'
		// }
	];

	let isMenuOpen = false;
	$: if ($navigating) isMenuOpen = false;
</script>

<nav class="sticky top-0 z-50 mx-auto flex w-full flex-col bg-blue p-2 drop-shadow-md">
	<div class="container mx-auto flex flex-row items-center justify-between">
		<a
			href="/"
			class="group pointer-events-auto flex items-center font-poppins text-xl font-bold text-white transition-all hover:scale-105 active:scale-95"
		>
			<img src="/logo-round.png" alt="round logo" class="h-8 pr-2" />
			<p>small fish</p></a
		>
		<div class="hidden flex-row items-center gap-2 md:flex">
			{#each routes as route}
				<div>
					<NavButton
						href={route.href}
						icon={route.icon}
						label={route.label}
						disabled={$page.url.pathname == route.href}
					/>
				</div>
			{/each}
		</div>
		<button
			class="pointer-events-auto scale-100 text-white transition-all md:hidden"
			on:click={() => {
				isMenuOpen = !isMenuOpen;
			}}
		>
			{#if !isMenuOpen}
				<div in:slide={{ axis: 'x', duration: 100 }}>
					<Icon icon="material-symbols:menu" class="text-4xl" />
				</div>
			{:else}
				<div in:slide={{ axis: 'x', duration: 100 }}>
					<Icon icon="material-symbols:close" class="text-4xl" />
				</div>
			{/if}
		</button>
	</div>
	{#if isMenuOpen}
		<div
			class="container mx-auto flex flex-col gap-2 pt-2 font-poppins text-xl font-medium text-white"
			transition:slide={{ duration: 300 }}
		>
			{#each routes as route}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<a href={route.href} class="flex origin-left items-center transition-all active:scale-95">
					<Icon icon={route.icon} class="mr-2" />
					<p>{route.label}</p>
				</a>
			{/each}
		</div>
	{/if}
</nav>

<div class="relative flex flex-col">
	<slot />
</div>

{#if $page.url.pathname != '/team'}
	<footer class="bg-darkblue">
		<div
			class="mx-auto w-full max-w-screen-xl justify-center px-2 py-6 text-center font-poppins text-white md:flex"
		>
			<p>
				<span class="font-bold">2021 - 2024 Small Fish.</span> All rights are extremely reserved and
				protected in a high level security bunker
			</p>
		</div>
	</footer>
{/if}
