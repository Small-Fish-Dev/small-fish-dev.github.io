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

<div class="fixed h-full w-full background" />

<div
	class="container mx-auto flex flex-col px-2 sm:px-4 md:px-18 lg:px-32 xl:px-40 pt-32 z-10 font-poppins gap-8 mb-20"
>
	{#each data.posts as post}
		<a href="{$page.url.pathname}/{post.slug}" class="transition-all hover:scale-105">
			<div class="flex flex-col md:flex-row overflow-hidden">
				<div class="relative w-full h-[150px] md:h-auto md:w-1/3">
					{#if post.thumbnail}
						<img
							class="absolute w-full h-full object-cover"
							src={`/blogs/${post.slug}/${post.thumbnail}`}
							alt="thumbnail"
						/>
					{/if}
				</div>
				<div class="w-full break-words md:w-2/3 flex flex-col justify-center bg-blue p-4 md:p-8">
					<div class="flex justify-between flex-row">
						{#if post.member}
							<div class="flex flex-row items-center origin-left gap-2 text-gray mb-4">
								<img
									class="w-[42px] h-[42px] bg-cover rounded-lg"
									src={post.member.avatar == null ? '/team/profiles/none.jpg' : post.member.avatar}
									alt="publisher"
									on:error={imageFallback}
								/>
								<p class="font-medium">
									by <span class="font-bold transition-all text-gray">{post.member.name}</span>
								</p>
							</div>
						{/if}
					</div>

					<h2 class="text-4xl text-white font-medium">{post.title}</h2>

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
