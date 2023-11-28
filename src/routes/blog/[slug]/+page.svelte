<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import Icon from '@iconify/svelte';

	export let data: PageData;
	type C = $$Generic<typeof SvelteComponentTyped<any, any, any>>;
	$: component = data.component as unknown as C;

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

<div class="w-fullbg-fixed fixed h-full">
	{#if data.frontmatter.thumbnail}
		<img
			class="absolute h-screen w-screen bg-fixed object-cover"
			src={resolvePath(data.frontmatter.thumbnail)}
			alt="background"
		/>
	{/if}
	<div class="h-screen w-screen bg-pixel mix-blend-multiply" />
	<div class="background-fade absolute top-0 flex h-screen w-screen justify-center" />
</div>

<div class="md:px-18 container z-10 mx-auto flex flex-col pt-24 font-poppins lg:px-32 xl:px-64">
	<div class="mb-5 px-5 text-white text-shadow sm:px-0">
		<h1 class="mb-2 text-5xl font-medium">{data.frontmatter.title}</h1>
		{#if data.frontmatter.description}
			<p class="mb-4 text-gray">{data.frontmatter.description}</p>
		{/if}

		{#if data.publisher}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div class="flex items-center justify-between">
				<div
					on:click={() => {
						goto(`/team#${data.publisher?.name}`);
					}}
					class="flex origin-left flex-row items-center gap-1 text-gray transition-all hover:scale-110 hover:cursor-pointer"
				>
					<img
						class="h-[42px] w-[42px] border-2 border-black bg-cover"
						src={data.publisher.avatar == null ? '/team/profiles/none.jpg' : data.publisher.avatar}
						alt="publisher"
						on:error={imageFallback}
					/>
					<p class="font-medium">
						by <span class="font-bold text-gray transition-all hover:text-white"
							>{data.publisher.name}</span
						>
					</p>
				</div>
				<div class="flex items-center text-lg font-medium">
					<Icon
						icon="ic:baseline-calendar-today"
						class="mr-1"
						style="filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5));"
					/>
					<p>
						{new Date(data.frontmatter.date).toLocaleString('en-us', {
							month: 'short',
							day: 'numeric',
							year: 'numeric'
						})}
					</p>
				</div>
			</div>
		{/if}
	</div>

	<article
		class="prose border-2 border-black
		bg-white p-5
		shadow-md lg:prose-xl
		prose-a:text-blue
		hover:prose-a:text-lightblue hover:prose-a:transition-all prose-code:break-words
		md:mb-8 md:p-10"
	>
		<svelte:component this={component} />
	</article>

	{#if data.nextfrontmatter}
		<div
			class="relative overflow-hidden border-2 border-black text-white shadow-sm transition-all text-shadow hover:-translate-y-1 hover:shadow-lg hover:brightness-105 md:mb-8"
		>
			<a rel="external" target="_self" href={data.nextfrontmatter.slug}>
				{#if data.nextfrontmatter.thumbnail}
					<img
						class="absolute w-full bg-no-repeat"
						src={`/blogs/${data.nextfrontmatter.slug}/${data.nextfrontmatter.thumbnail}`}
						alt="thumbnail"
					/>
				{/if}
				<div class="absolute h-full w-full animate-scroll bg-pixel opacity-30" />
				<div class="relative flex w-full flex-col p-10">
					<p class="text-3xl font-bold transition-all">
						{data.nextfrontmatter.title}
					</p>
					{#if data.nextfrontmatter.description}
						<p class="text-md">{data.nextfrontmatter.description}</p>
					{/if}
					{#if data.nextpublisher}
						<p class="pt-4 text-xl font-medium">
							by <span class="font-bold text-gray">{data.nextpublisher.name}</span>
						</p>
					{/if}
				</div>
			</a>
		</div>
	{/if}
</div>

<style>
	.background-fade {
		background: linear-gradient(
			to bottom,
			rgba(36, 70, 247, 0.5) 0%,
			rgba(36, 70, 247, 0.8) 50vh,
			rgb(36, 70, 247) 70vh
		);
	}
</style>
