<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import Icon from '@iconify/svelte';

	export let data: PageData;

	const imageFallback = (event: any) => {
		if (!event.target) return;
		event.target.src = '/team/profiles/none.jpg';
	};

	function resolvePath(src: string) {
		return src.startsWith('http://') || src.startsWith('https://')
			? src
			: `/blogs/${$page.params.slug}/${src}`;
	}
</script>

<!-- Hacky way to make hyperlinks automatically target blank :D -->
<base target="_blank" />

<svelte:head>
	<title>Blog / {data.blogPost.title}</title>

	<meta property="og:title" content="Small Fish - {data.blogPost.title}" />
	<meta property="og:description" content={data.blogPost.description} />
	<meta property="og:image" content="https://smallfi.sh/{resolvePath(data.blogPost.thumbnail)}" />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="w-fullbg-fixed fixed h-full" style="z-index: -1">
	{#if data.blogPost.thumbnail}
		<img
			class="absolute h-screen w-screen bg-fixed object-cover"
			src={resolvePath(data.blogPost.thumbnail)}
			alt="background"
		/>
	{/if}
	<div class="h-screen w-screen bg-pixel-dark mix-blend-multiply" />
	<div class="background-fade absolute top-0 flex h-screen w-screen justify-center" />
</div>

<div class="md:px-18 container z-10 mx-auto flex flex-col pt-16 font-poppins lg:px-32 xl:px-64">
	<div class="mb-5 px-5 text-white sm:px-0">
		<h1 class="mb-2 text-5xl font-bold">{data.blogPost.title}</h1>
		{#if data.blogPost.description}
			<p class="mb-4 text-gray mb-12">{data.blogPost.description}</p>
		{/if}

		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div class="flex items-center">
			{#if data.blogPost.member}
				<div
					on:click={() => {
						goto(`/team/${data.blogPost.member?.name}`);
					}}
					class="flex origin-left flex-row items-center gap-3 text-gray transition-all hover:scale-110 hover:cursor-pointer"
				>
					<img
						class="h-[42px] w-[42px] rounded-[2px] bg-cover"
						src={data.blogPost.member.avatar == null
							? '/team/profiles/none.jpg'
							: data.blogPost.member.avatar}
						alt="publisher"
						on:error={imageFallback}
					/>
					<p class="font-bold">
						by <span class="font-bold text-gray transition-all hover:text-white"
							>{data.blogPost.member.name}</span
						>
					</p>
				</div>
			{/if}
			<div class="flex items-center text-gray font-bold ml-10">
				<Icon
					icon="material-symbols:calendar-today"
					class="mr-3"
					style="transform: scale( 1.4 )"
				/>
				<p>
					{new Date(data.blogPost.date).toLocaleString('en-us', {
						month: 'short',
						day: 'numeric',
						year: 'numeric'
					})}
				</p>
			</div>
		</div>
	</div>

	<article
		class="prose
		rounded-t-lg
		bg-white
		p-5
		drop-shadow-md
		lg:prose-lg
		prose-a:text-blue
		prose-a:decoration-2
		prose-a:underline-offset-2
		hover:prose-a:text-lightblue
		hover:prose-a:transition-all
		prose-code:break-words prose-pre:drop-shadow-md md:mb-8
		md:rounded-lg md:p-20"
	>
		<svelte:component this={data.content} />
	</article>
</div>

<style>
	.background-fade {
		background: linear-gradient(
			to bottom,
			rgba(22, 42, 151, 0.5) 0%,
			rgba(22, 42, 151, 0.8) 50vh,
			rgb(22 42 151) 70vh
		);
	}
</style>
