<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import MemberCard from '$lib/components/MemberCard.svelte';
	import Icon from '@iconify/svelte';

	export let data: PageData;

	const imageFallback = (event: any) => {
		if (!event.target) return;
		event.target.src = '/team/profiles/none.jpg';
	};
</script>

<div class="background fixed h-full w-full" />

<div
	class="md:px-18 container z-10 mx-auto mb-20 flex flex-col gap-8 px-2 pt-32 font-poppins sm:px-4 lg:px-32 xl:px-40"
>
	{#each data.posts as post}
		<a href="{$page.url.pathname}/{post.slug}" class="transition-all hover:scale-105">
			<div class="flex flex-col overflow-hidden md:flex-row">
				<div class="relative h-[150px] w-full md:h-auto md:w-1/3">
					{#if post.thumbnail}
						<img
							class="absolute h-full w-full object-cover"
							src={`/blogs/${post.slug}/${post.thumbnail}`}
							alt="thumbnail"
						/>
					{/if}
				</div>
				<div class="flex w-full flex-col justify-center break-words bg-blue p-4 md:w-2/3 md:p-8">
					<div class="flex flex-row justify-between">
						{#if post.member}
							<div class="mb-4 flex origin-left flex-row items-center gap-2 text-gray">
								<img
									class="h-[42px] w-[42px] rounded-lg bg-cover"
									src={post.member.avatar == null ? '/team/profiles/none.jpg' : post.member.avatar}
									alt="publisher"
									on:error={imageFallback}
								/>
								<p class="font-medium">
									by <span class="font-bold text-gray transition-all">{post.member.name}</span>
								</p>
							</div>
						{/if}
					</div>

					<h2 class="text-4xl font-medium text-white">{post.title}</h2>

					{#if post.description}
						<p class="text-white">{post.description}</p>
					{/if}
				</div>
			</div>
		</a>
	{/each}
</div>

<style>
	.background {
		background: url(/home/pixel-overlay-white.png);
		background-size: 14px;
		opacity: 1;
		animation: scroll 120s infinite linear;
	}

	@keyframes scroll {
		0% {
			background-position: 0% 0%;
		}
		50% {
			background-position: 50% 50%;
		}
		100% {
			background-position: 100% 100%;
		}
	}

	.shadow {
		filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5));
	}

	h1,
	p,
	a {
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
	}
</style>
