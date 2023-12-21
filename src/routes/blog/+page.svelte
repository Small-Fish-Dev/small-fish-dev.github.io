<script lang="ts">
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';

	export let data;

	const imageFallback = (event: any) => {
		if (!event.target) return;
		event.target.src = '/team/profiles/none.jpg';
	};

	function groupPostsByMonthYear(posts: App.BlogPost[]) {
		const groupedPosts = new Map<string, App.BlogPost[]>();

		posts.forEach((post) => {
			const key = new Date(post.date).toLocaleString('default', { month: 'long', year: 'numeric' });
			if (!groupedPosts.has(key)) groupedPosts.set(key, []);
			groupedPosts.get(key)?.push(post);
		});

		return groupedPosts;
	}

	const groupedPosts = groupPostsByMonthYear(data.posts);
</script>

<div class="fixed h-full w-full animate-scroll bg-pixel-white bg-pixel-lg" style="z-index: -1" />

<div
	class="md:px-18 container z-10 mx-auto mb-20 flex flex-col gap-4 px-2 pt-6 font-poppins sm:px-4 lg:px-32 xl:px-40"
>
	{#each groupedPosts.entries() as [monthYear, postsInMonthYear]}
		<h1 class="text-4xl font-bold underline decoration-blue">
			{monthYear}
		</h1>
		{#each postsInMonthYear as post, i}
			{#if post.published}
				<a
					href="{$page.url.pathname}/{post.slug}"
					class="drop-shadow-md transition-all text-shadow hover:-translate-y-2 hover:drop-shadow-hover"
				>
					<div class="flex flex-col overflow-hidden rounded-lg md:flex-row">
						<div class="relative h-48 w-full md:h-auto md:basis-1/2">
							{#if post.thumbnail}
								<img
									class="absolute h-full w-full bg-darkblue object-cover"
									src={`/blogs/${post.slug}/${post.thumbnail}`}
									alt="thumbnail"
								/>
							{/if}
						</div>
						<div
							class="flex w-full flex-col justify-center break-words bg-gradient-to-r from-blue to-lightblue p-4 md:p-8"
						>
							<div class="flex flex-row flex-wrap justify-between gap-4 pb-4">
								{#if post.member}
									<div class="flex origin-left flex-row items-center gap-1 text-gray">
										<img
											class="h-[42px] w-[42px] rounded-full bg-cover drop-shadow-md"
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
										icon="material-symbols:calendar-today"
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
			{/if}
		{/each}
	{/each}
</div>
