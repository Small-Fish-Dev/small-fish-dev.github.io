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

	let collapsed = false;
</script>

<!-- TODO: Handle invert of colours -->
<nav
	class="absolute w-full justify-end hidden md:flex md:flex-row z-50 md:pt-5 md:pb-5 md:pr-5 gradient"
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

<!-- Hamburger for anything under medium breakpoint. -->
<div class="absolute w-full justify-end flex md:hidden gradient z-50 pt-5 pb-5 pr-5 text-white">
	<button
		class="transition-all pointer-events-auto scale-100 hover:scale-110"
		on:click={() => (collapsed = !collapsed)}
	>
		<Icon icon="mdi:hamburger-menu" class="text-6xl mr-2" />
	</button>
</div>

<!-- Collapsed hamburger menu. -->
{#if collapsed}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		class="absolute h-screen w-screen z-40 bg-black opacity-50"
		in:fade={{ duration: 300, easing: quadInOut }}
		out:fade={{ duration: 300, easing: quadInOut }}
		on:click={() => (collapsed = false)}
	/>

	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		class="absolute pointer-events-auto flex md:hidden right-[0px] top-[0px] w-[300px] h-screen z-50 bg-blue flex-col p-[20px] gap-1 shadow"
		in:fly={{ duration: 300, x: '100%', opacity: 0.5, easing: quadInOut }}
		out:fly={{ duration: 300, x: '100%', opacity: 0.5, easing: quadInOut }}
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
	<div class="bg-darkblue overlay static-background" />
	<div class="overlay moving-background" />
	<div class="absolute font-poppins text-white p-4">
		<p class="text-3xl font-bold">small fish</p>
		<p><span class="font-bold">2021 - 2023</span> All rights are VERY reserved</p>
	</div>
</footer>

<style>
	.gradient {
		background: linear-gradient(to bottom, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 100%);
		pointer-events: none;
	}

	.shadow {
		box-shadow: -8px 0px 12px rgba(0, 0, 0, 0.5);
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
