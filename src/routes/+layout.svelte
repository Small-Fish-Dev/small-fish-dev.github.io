<script lang="ts">
	import '../app.css';
	import '../syntax-highlight.css'; // https://github.com/PrismJS/prism-themes
	import { page } from '$app/stores';
	import { slide } from 'svelte/transition';
	import { navigating } from '$app/stores';
	import NavButton from '$lib/components/Nav-Button.svelte';
	import Snow from '$lib/components/Snow.svelte';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';

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
		},
		{
			label: 'fish games',
			icon: 'material-symbols:videogame-asset',
			href: '/games'
		}
	];

	let isMenuOpen = false;
	$: if ($navigating) isMenuOpen = false;

	const isDecember = new Date().getMonth() + 1 == 12;
</script>

{#if isDecember}
	<Snow />
{/if}

<nav class="sticky top-0 z-50 mx-auto flex w-full flex-col bg-blue drop-shadow-md">
	<div class="container mx-auto flex h-16 flex-row items-center justify-between px-2">
		<a
			href="/"
			class="group pointer-events-auto flex items-center py-2 font-poppins text-xl font-bold text-white transition-all hover:scale-105 active:scale-95"
		>
			<img src="/common/logo-square.png" alt="square logo" class="h-14 pr-2" />
			<p>small fish</p>
		</a>
		<div class="hidden h-full flex-row items-center gap-2 md:flex">
			{#each routes as route}
				<div class="h-full">
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
			class="container mx-auto flex flex-col gap-2 p-4 pt-2 font-poppins text-xl font-medium text-white md:hidden"
			transition:slide={{ duration: 300 }}
		>
			{#each routes as route}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<a
					href={route.href}
					class="flex origin-left {$page.url.pathname == route.href
						? 'opacity-75'
						: ''} items-center transition-all active:scale-95"
				>
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
