<script lang="ts">
	import { type NewsEntry } from '$lib/types/News';
	import { SinceDate } from '$lib/types/Utils';
	import SocialButton from './SocialButton.svelte';

	let className: string = '';

	export { className as class };
	export let post: NewsEntry;
</script>

{#if post}
	<a
		href={post.url}
		class="relative aspect-video transition-all hover:scale-[102%] hover:cursor-pointer {className} flex font-poppins"
		target="_blank"
	>
		<!-- Background -->
		<img src={post.thumbnail} class="absolute w-full h-full rounded-md" alt="thumbnail" />
		<div
			class="absolute w-full h-full bg-gradient-to-b from-transparentblack0 to-transparentblack1 rounded-md"
		/>

		<!-- Inner content -->
		<div class="relative flex w-full h-full p-5 justify-between flex-col">
			<div class="flex flex-row items-center gap-4">
				<SocialButton href={post.url} clickDisabled={true} class="w-12 aspect-square" />
				<div class="gap-2 text-white">
					<p class="font-bold text-1xl">{post.source}</p>
					<p class="text-md">{SinceDate(post.date)}</p>
				</div>
			</div>

			<div class="flex flex-col">
				{#if post.package}
					<p class="font-bold text-md hidden sm:flex text-blue uppercase">
						{post.package}
					</p>
				{/if}

				<p class="font-bold text-1xl text-white mb-1 text-center sm:text-start">{post.title}</p>
				<p class="text-md hidden sm:flex text-white">{post.summary}</p>
			</div>
		</div>
	</a>
{/if}
