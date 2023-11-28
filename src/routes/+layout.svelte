<script lang="ts">
	import '../app.css';
	import '../syntax-highlight.css'; // https://github.com/PrismJS/prism-themes
	import { page } from '$app/stores';
	import NavButton from '$lib/components/Nav-Button.svelte';
	import { fly } from 'svelte/transition';
	import { swipeable } from '@react2svelte/swipeable';
	import type { SwipeEventData } from '@react2svelte/swipeable';
	import Icon from '@iconify/svelte';

	const routes: App.Route[] = [
		{
			label: 'team',
			icon: 'ic:sharp-sailing',
			href: '/team'
		},
		{
			label: 'blogs',
			icon: 'ic:sharp-newspaper',
			href: '/blog'
		}
		// {
		// 	label: 'projects',
		// 	icon: 'material-symbols:videogame-asset-sharp',
		// 	href: '/projects'
		// }
	];

	let isMenuOpen = false;

	function swipeHandler(event: CustomEvent<SwipeEventData>) {
		if (event.detail.dir === 'Right') isMenuOpen = false;
	}
</script>

<nav class="fixed z-50 mx-auto flex w-full border-b-2 border-black bg-blue p-2">
	<div class="container mx-auto flex flex-row items-center justify-between">
		<a
			href="/"
			class="group pointer-events-auto flex items-center font-poppins text-xl font-bold text-white transition-all hover:scale-105 active:scale-95"
		>
			<img src="/logo.png" class="group-hover:animate-wiggle h-8 pr-2" />
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
			<Icon icon="material-symbols:menu" class="text-4xl" />
		</button>
	</div>
</nav>

<!-- Hamburger menu. -->
{#if isMenuOpen}
	<div class="relative z-50 w-full">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			on:click={() => {
				isMenuOpen = false;
			}}
			class="fixed z-0 h-screen w-screen bg-black bg-opacity-50"
		/>
		<nav
			use:swipeable
			on:swiped={swipeHandler}
			in:fly={{ duration: 100, x: '100%' }}
			out:fly={{ duration: 100, x: '100%' }}
			class="blue-gradient fixed right-0 z-50 flex h-full w-5/6 max-w-sm flex-col overflow-y-auto border-l-2 border-black px-6 py-6"
		>
			<img src="/home/header-logo.png" alt="poop fish logo" />
			<div class="flex flex-col gap-4 pt-8">
				{#each routes as route}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-no-static-element-interactions -->
					<div
						on:click={() => {
							isMenuOpen = false;
						}}
					>
						<NavButton
							href={route.href}
							icon={route.icon}
							label={route.label}
							disabled={false}
							large={true}
						/>
					</div>
				{/each}
			</div>
		</nav>
	</div>
{/if}

<div class="flex min-h-screen flex-col">
	<slot />
</div>

<style>
	.blue-gradient {
		background: linear-gradient(
			to bottom,
			rgba(36, 70, 247, 1) 0%,
			rgba(36, 70, 247, 1) 50vh,
			rgb(21, 42, 145) 70vh
		);
	}
</style>
