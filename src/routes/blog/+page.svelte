<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';
	import { fly } from 'svelte/transition';

	export let data: PageData;

	const imageFallback = (event: any) => {
		if (!event.target) return;
		event.target.src = '/team/profiles/none.jpg';
	};

	function groupPostsByMonthYear(posts: any[]) {
		const groupedPosts: Record<string, any> = {};

		posts.forEach((post) => {
			const key = new Date(post.date).toLocaleString('default', { month: 'long', year: 'numeric' });

			if (!groupedPosts[key]) {
				groupedPosts[key] = [];
			}

			groupedPosts[key].push(post);
		});

		return groupedPosts;
	}

	const groupedPosts = groupPostsByMonthYear(data.posts);
</script>

<div class="fixed h-full w-full animate-scroll bg-pixel-white bg-pixel-lg" />

<div
	class="md:px-18 container z-10 mx-auto mb-20 flex flex-col gap-4 px-2 pt-6 font-poppins sm:px-4 lg:px-32 xl:px-40"
>
	{#each Object.entries(groupedPosts) as [monthYear, postsInMonthYear]}
		<h1 class="text-4xl font-bold underline decoration-blue">{monthYear}</h1>
		{#each postsInMonthYear as post, i}
			<a
				href="{$page.url.pathname}/{post.slug}"
				class="shadow-sm transition-all text-shadow hover:-translate-y-1 hover:shadow-lg"
			>
				<div class="flex flex-col overflow-hidden md:flex-row">
					<div
						class="relative h-48 w-full border-b-2 border-black md:h-auto md:basis-1/2 md:border-b-0 md:border-r-2"
					>
						{#if post.thumbnail}
							<img
								class="md: absolute h-full w-full bg-black object-cover"
								src={`/blogs/${post.slug}/${post.thumbnail}`}
								alt="thumbnail"
							/>
						{/if}
					</div>
					<div class="gradient flex w-full flex-col justify-center break-words p-4 md:p-8">
						<div class="flex flex-row flex-wrap justify-between gap-4 pb-4">
							{#if post.member}
								<div class="flex origin-left flex-row items-center gap-1 text-gray">
									<img
										class="h-[42px] w-[42px] border-2 border-black bg-cover"
										src={post.member.avatar == null
											? '/team/profiles/none.jpg'
											: post.member.avatar}
										alt="publisher"
										on:error={imageFallback}
									/>
									<p class="font-medium">
										by <span class="font-bold text-gray transition-all">{post.member.name}</span>
									</p>
								</div>
							{/if}
							<div class="flex items-center text-lg font-medium text-white">
								<Icon
									icon="material-symbols:calendar-today-outline-sharp"
									class="mr-1"
									style="filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5));"
								/>
								<p>
									{new Date(post.date).toLocaleString('en-us', {
										month: 'short',
										day: 'numeric',
										year: 'numeric'
									})}
								</p>
							</div>
						</div>

						<h2 class="text-3xl font-medium text-white">{post.title}</h2>

						{#if post.description}
							<p class="text-white">{post.description}</p>
						{/if}
					</div>
				</div>
			</a>
		{/each}
	{/each}
</div>

<style>
	.gradient {
		background: linear-gradient(to bottom, #2446f7 40%, #152a96 100%);
	}
</style>
