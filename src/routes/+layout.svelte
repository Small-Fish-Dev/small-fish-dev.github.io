<script lang="ts">
	import '../app.css';
	import '../syntax-highlight.css'; // https://github.com/PrismJS/prism-themes
	import { page } from '$app/stores';
	import NavButton from '$lib/components/Nav-Button.svelte';
	import { fly, fade } from 'svelte/transition';
	import { quadInOut } from 'svelte/easing';
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
		},
		{
			label: 'projects',
			icon: 'material-symbols:videogame-asset',
			href: '/projects'
		}
	];

	let isMenuOpen = false;

	function swipeHandler(event: CustomEvent<SwipeEventData>) {
		if (event.detail.dir === 'Right') isMenuOpen = false;
	}
</script>

<nav class="absolute w-full flex justify-between z-50 gradient p-4">
	<a href="/" class="logo left-4 top-4 pointer-events-auto">
		<img class="image h-20 md:h-28 aspect-square" src="/logo.png" alt="logo" />
	</a>
	<div class="hidden md:flex flex-row items-center mt-1">
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
		class="md:hidden text-white transition-all pointer-events-auto scale-100 hover:scale-110"
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
			class="fixed w-screen h-screen z-0 bg-black bg-opacity-50"
			out:fade={{ duration: 200, easing: quadInOut }}
		/>
		<nav
			use:swipeable
			on:swiped={swipeHandler}
			in:fly={{ duration: 200, x: '100%', opacity: 0.5, easing: quadInOut }}
			out:fly={{ duration: 200, x: '100%', opacity: 0.5, easing: quadInOut }}
			class="fixed z-50 right-0 h-full flex flex-col w-5/6 max-w-sm py-6 px-6 bg-blue shadow overflow-y-auto"
		>
			<img src="home/header-logo.png" alt="poop fish logo" />
			<div class="bg-white bg-opacity-75 h-[2px] mt-4" />
			<div class="flex flex-col gap-4 pt-2">
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
		</nav>
	</div>
{/if}

<div class="flex flex-col min-h-screen">
	<slot />
</div>

<!-- Footer -->
<!-- Don't show footer for the team page. -->
{#if $page.url.pathname !== routes[0].href}
	<footer class="mt-auto">
		<div class="bg-darkblue overlay static-background">
			<img
				class="absolute bottom-0 right-0 h-full bg-cover z-10 p-[20px]"
				src="/footer/concretefree.png"
				alt="concretefree"
			/>
		</div>
		<div class="overlay moving-background" />
		<div class="absolute font-poppins text-white p-4">
			<p class="text-3xl font-bold">small fish</p>
			<p><span class="font-bold">2021 - 2023</span> All rights are VERY reserved</p>
		</div>
	</footer>
{/if}

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

	.shadow {
		box-shadow: -8px 0px 12px rgba(0, 0, 0, 0.5);
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
