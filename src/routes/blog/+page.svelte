<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';

	export let data: PageData;

	const imageFallback = (event: any) => {
		if (!event.target) return;
		event.target.src = '/team/profiles/none.jpg';
	};
</script>

<div class="fixed h-full w-full background" />

<div
	class="container mx-auto flex flex-col md:px-18 lg:px-32 xl:px-40 pt-32 z-10 font-poppins gap-8"
>
	{#each data.posts as post}
		<a href="{$page.url.pathname}/{post.slug}">
			<div class="flex flex-col md:flex-row overflow-hidden justify-center rounded">
				<div class="w-full md:w-1/3 h-48 bg-gray">
					{#if post.thumbnail}
						<img
							class="h-full w-full object-cover"
							src={`/blogs/${post.slug}/${post.thumbnail}`}
							alt="thumbnail"
						/>
					{/if}
				</div>
				<div class="w-full md:w-2/3 flex flex-col justify-center bg-blue p-4">
					{#if post.publisher}
						<div class="flex flex-row items-center origin-left gap-2 text-gray pb-2">
							<img
								class="w-[42px] h-[42px] bg-cover rounded-lg"
								src={'/team/profiles/none.jpg'}
								alt="publisher"
								on:error={imageFallback}
							/>
							<p class="font-medium">
								by <span class="font-bold transition-all text-gray">{post.publisher}</span>
							</p>
						</div>
					{/if}
					<h2 class="text-4xl text-white font-medium mb-2">{post.title}</h2>
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
</style>
