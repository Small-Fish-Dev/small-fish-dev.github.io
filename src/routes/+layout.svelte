<script lang="ts">
	import '../app.css';
	import '../syntax-highlight.css'; // https://github.com/PrismJS/prism-themes
	import { page } from '$app/stores';
	import NavButton from '$lib/components/Nav-Button.svelte';
	import { fade, fly } from 'svelte/transition';
	import { quadInOut } from 'svelte/easing';
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

	let collapsed = true;
</script>

<nav class="absolute w-full justify-end hidden md:flex z-50 gradient p-4">
	<a href="/" class="absolute md:max-lg:hidden visible left-4 top-4 pointer-events-auto">
		<img class="image w-[64px] h-[64px]" src="/logo.png" alt="logo" />
	</a>
	<div class="flex flex-row mt-1">
		{#each routes as route}
			<NavButton
				href={route.href}
				icon={route.icon}
				label={route.label}
				disabled={$page.url.pathname == route.href}
			/>
		{/each}
	</div>
</nav>

<!-- Hamburger for anything under medium breakpoint. -->
<div class="absolute w-full justify-end flex md:hidden gradient z-50 p-4 text-white">
	<a href="/" class="absolute left-4 top-4 pointer-events-auto">
		<img class="image w-[64px] h-[64px]" src="/logo.png" alt="logo" />
	</a>
	<button
		class="transition-all pointer-events-auto scale-100 hover:scale-110"
		on:pointerdown={() => {
			collapsed = !collapsed;
		}}
	>
		<Icon
			icon="mdi:hamburger-menu"
			class="text-6xl"
			style="filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))"
		/>
	</button>
</div>

<!-- Hamburger menu. -->
{#if !collapsed}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		class="absolute h-full w-screen z-40 bg-black opacity-50 md:hidden visible"
		in:fade={{ duration: 225, easing: quadInOut }}
		out:fade={{ duration: 225, easing: quadInOut }}
		on:pointerdown={() => {
			collapsed = !collapsed;
		}}
	/>

	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		class="absolute pointer-events-auto flex md:hidden right-[0px] top-[0px] w-[300px] h-screen z-50 bg-blue flex-col p-[20px] gap-2 shadow"
		in:fly={{ duration: 225, x: '100%', opacity: 0.5, easing: quadInOut }}
		out:fly={{ duration: 225, x: '100%', opacity: 0.5, easing: quadInOut }}
		on:click={() => (collapsed = false)}
	>
		{#each routes as route}
			<NavButton
				href={route.href}
				icon={route.icon}
				label={route.label}
				disabled={$page.url.pathname == route.href}
			/>
		{/each}
	</div>
{/if}

<div class="flex flex-col min-h-screen">
	<slot />
</div>

<footer class="mt-auto">
	<div class="bg-darkblue overlay static-background">
		<img
			class="absolute bottom-0 right-0 h-full bg-cover z-50 p-[20px]"
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
</style>
