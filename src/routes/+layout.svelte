<script lang="ts">
	import '../app.css';
	import '../syntax-highlight.css'; // https://github.com/PrismJS/prism-themes
	import { page } from '$app/stores';
	import NavButton from '$lib/components/Nav-Button.svelte';
	import { fly, fade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
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

<nav class="gradient absolute z-50 flex w-full justify-between p-4">
	<a href="/" class="logo pointer-events-auto left-6 top-4">
		<img class="image aspect-square h-16 md:h-24" src="/logo.png" alt="logo" />
	</a>
	<div class="mr-6 hidden flex-row items-center md:flex">
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
		class="pointer-events-auto scale-100 text-white transition-all hover:scale-110 md:hidden"
		on:click={() => {
			isMenuOpen = !isMenuOpen;
		}}
	>
		<Icon
			icon="mdi:hamburger-menu"
			class="text-6xl"
			style="filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))"
		/>
	</button>
</nav>

<!-- Hamburger menu. -->
{#if isMenuOpen}
	<div class="relative z-50 w-full">
		<div
			on:click={() => {
				isMenuOpen = false;
			}}
			class="fixed z-0 h-screen w-screen bg-black bg-opacity-50"
			out:fade={{ duration: 100, easing: quintOut }}
		/>
		<nav
			use:swipeable
			on:swiped={swipeHandler}
			in:fly={{ duration: 200, x: '100%', easing: quintOut }}
			out:fly={{ duration: 200, x: '100%' }}
			class="fixed right-0 z-50 flex h-full w-5/6 max-w-sm flex-col overflow-y-auto bg-blue px-6 py-6"
		>
			<img src="/home/header-logo.png" alt="poop fish logo" />
			<div class="flex flex-col gap-4 pt-8">
				{#each routes as route}
					<div
						on:click={() => {
							isMenuOpen = false;
						}}
					>
						<NavButton
							href={route.href}
							icon={route.icon}
							label={route.label}
							disabled={$page.url.pathname == route.href}
						/>
					</div>
				{/each}
			</div>
			<div class="grow" />
			<div class="text-center font-poppins text-white">
				<p class="text-2xl font-medium">made with ❤️</p>
				<p>even an inconvenient rock can't stop us</p>
				<img src="/home/rock.gif" alt="rock" class="px-28" />
			</div>
		</nav>
	</div>
{/if}

<div class="flex min-h-screen flex-col">
	<slot />
</div>

<style>
	.gradient {
		background: linear-gradient(
			to bottom,
			rgba(0, 0, 0, 0.7) 0%,
			rgba(0, 0, 0, 0.1) 80%,
			rgba(0, 0, 0, 0) 100%
		);
		pointer-events: none;
	}

	.image {
		filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5));
	}

	.overlay {
		position: absolute;
		height: 180px;
		width: 100%;
		background-repeat: repeat-x;
		background-size: 800px 100%;
	}

	.static-background {
		background-image: url('/footer/fbg_static.png');
	}

	.moving-background {
		background-image: url('/footer/fbg_moving.png');
		animation-name: swim;
		animation-duration: 4s;
		animation-iteration-count: infinite;
		transform: translateX(0px) translateY(0px);
		overflow: hidden;
		height: 170px;
		width: 100%;
	}

	@keyframes swim {
		0% {
			transform: translateX(0px) translateY(0px);
		}
		50% {
			transform: translateX(-5px) translateY(10px);
		}
		100% {
			transform: translateX(0px) translateY(0px);
		}
	}

	.logo:hover {
		animation-name: wiggle;
		animation-duration: 1500ms;
		animation-iteration-count: infinite;
		transform: rotate(0deg);
		transition-timing-function: ease-in-out;
	}

	@keyframes wiggle {
		20% {
			transform: rotate(5deg);
		}
		40% {
			transform: rotate(-5deg);
		}
		60% {
			transform: rotate(5deg);
		}
		80% {
			transform: rotate(-5deg);
		}
		100% {
			transform: rotate(0deg);
		}
	}
</style>
